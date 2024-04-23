import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from '@opentelemetry/core';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
import { BatchSpanProcessor, TraceIdRatioBasedSampler } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import {
  LoggerProvider,
  BatchLogRecordProcessor,
} from '@opentelemetry/sdk-logs';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';
import { v4 as uuidv4 } from 'uuid';

const resource = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: 'next-app-browser',
  'session.instance.id': uuidv4(),
});

const traceExporter = new OTLPTraceExporter();
const logExporter = new OTLPLogExporter();

const tracerProvider = new WebTracerProvider({
  resource,
  // sampling disabled for the demo in order to show all traces
  // sampler: new TraceIdRatioBasedSampler(0.6),
});

tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));

tracerProvider.register({
  contextManager: new ZoneContextManager(),
  propagator: new CompositePropagator({
    propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()],
  }),
});

const loggerProvider = new LoggerProvider({
  resource,
});

loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(logExporter));

registerInstrumentations({
  tracerProvider: tracerProvider,
  loggerProvider,
  instrumentations: [
    getWebAutoInstrumentations({
      '@opentelemetry/instrumentation-fetch': {
        propagateTraceHeaderCorsUrls: /.*/,
        clearTimingResources: true,
        applyCustomAttributesOnSpan(span) {
          span.setAttribute('app.synthetic_request', 'false');
        },
      },
      '@opentelemetry/instrumentation-xml-http-request': {
        propagateTraceHeaderCorsUrls: /.*/,
        clearTimingResources: true,
        applyCustomAttributesOnSpan(span) {
          span.setAttribute('app.synthetic_request', 'false');
        },
      },
    }),
  ],
});
