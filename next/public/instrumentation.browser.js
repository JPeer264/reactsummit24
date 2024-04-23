"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/.pnpm/shimmer@1.2.1/node_modules/shimmer/index.js
  var require_shimmer = __commonJS({
    "node_modules/.pnpm/shimmer@1.2.1/node_modules/shimmer/index.js"(exports2, module2) {
      "use strict";
      function isFunction2(funktion) {
        return typeof funktion === "function";
      }
      var logger = console.error.bind(console);
      function defineProperty(obj, name, value) {
        var enumerable = !!obj[name] && obj.propertyIsEnumerable(name);
        Object.defineProperty(obj, name, {
          configurable: true,
          enumerable,
          writable: true,
          value
        });
      }
      function shimmer2(options) {
        if (options && options.logger) {
          if (!isFunction2(options.logger))
            logger("new logger isn't a function, not replacing");
          else
            logger = options.logger;
        }
      }
      function wrap2(nodule, name, wrapper) {
        if (!nodule || !nodule[name]) {
          logger("no original function " + name + " to wrap");
          return;
        }
        if (!wrapper) {
          logger("no wrapper function");
          logger(new Error().stack);
          return;
        }
        if (!isFunction2(nodule[name]) || !isFunction2(wrapper)) {
          logger("original object and wrapper must be functions");
          return;
        }
        var original = nodule[name];
        var wrapped = wrapper(original, name);
        defineProperty(wrapped, "__original", original);
        defineProperty(wrapped, "__unwrap", function() {
          if (nodule[name] === wrapped)
            defineProperty(nodule, name, original);
        });
        defineProperty(wrapped, "__wrapped", true);
        defineProperty(nodule, name, wrapped);
        return wrapped;
      }
      function massWrap2(nodules, names, wrapper) {
        if (!nodules) {
          logger("must provide one or more modules to patch");
          logger(new Error().stack);
          return;
        } else if (!Array.isArray(nodules)) {
          nodules = [nodules];
        }
        if (!(names && Array.isArray(names))) {
          logger("must provide one or more functions to wrap on modules");
          return;
        }
        nodules.forEach(function(nodule) {
          names.forEach(function(name) {
            wrap2(nodule, name, wrapper);
          });
        });
      }
      function unwrap2(nodule, name) {
        if (!nodule || !nodule[name]) {
          logger("no function to unwrap.");
          logger(new Error().stack);
          return;
        }
        if (!nodule[name].__unwrap) {
          logger("no original to unwrap to -- has " + name + " already been unwrapped?");
        } else {
          return nodule[name].__unwrap();
        }
      }
      function massUnwrap2(nodules, names) {
        if (!nodules) {
          logger("must provide one or more modules to patch");
          logger(new Error().stack);
          return;
        } else if (!Array.isArray(nodules)) {
          nodules = [nodules];
        }
        if (!(names && Array.isArray(names))) {
          logger("must provide one or more functions to unwrap on modules");
          return;
        }
        nodules.forEach(function(nodule) {
          names.forEach(function(name) {
            unwrap2(nodule, name);
          });
        });
      }
      shimmer2.wrap = wrap2;
      shimmer2.massWrap = massWrap2;
      shimmer2.unwrap = unwrap2;
      shimmer2.massUnwrap = massUnwrap2;
      module2.exports = shimmer2;
    }
  });

  // node_modules/.pnpm/@protobufjs+aspromise@1.1.2/node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/.pnpm/@protobufjs+aspromise@1.1.2/node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }
  });

  // node_modules/.pnpm/@protobufjs+base64@1.1.2/node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/.pnpm/@protobufjs+base64@1.1.2/node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      var base64 = exports2;
      base64.length = function length(string) {
        var p = string.length;
        if (!p)
          return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }
  });

  // node_modules/.pnpm/@protobufjs+eventemitter@1.1.0/node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/.pnpm/@protobufjs+eventemitter@1.1.0/node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    }
  });

  // node_modules/.pnpm/@protobufjs+float@1.0.2/node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/.pnpm/@protobufjs+float@1.0.2/node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined")
          (function() {
            var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
            function writeFloat_f32_cpy(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
            }
            function writeFloat_f32_rev(val, buf, pos) {
              f32[0] = val;
              buf[pos] = f8b[3];
              buf[pos + 1] = f8b[2];
              buf[pos + 2] = f8b[1];
              buf[pos + 3] = f8b[0];
            }
            exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
            exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
            function readFloat_f32_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              return f32[0];
            }
            function readFloat_f32_rev(buf, pos) {
              f8b[3] = buf[pos];
              f8b[2] = buf[pos + 1];
              f8b[1] = buf[pos + 2];
              f8b[0] = buf[pos + 3];
              return f32[0];
            }
            exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
            exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
          })();
        else
          (function() {
            function writeFloat_ieee754(writeUint, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign)
                val = -val;
              if (val === 0)
                writeUint(1 / val > 0 ? (
                  /* positive */
                  0
                ) : (
                  /* negative 0 */
                  2147483648
                ), buf, pos);
              else if (isNaN(val))
                writeUint(2143289344, buf, pos);
              else if (val > 34028234663852886e22)
                writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
              else if (val < 11754943508222875e-54)
                writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
              else {
                var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
                writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
              }
            }
            exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
            exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
            function readFloat_ieee754(readUint, buf, pos) {
              var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
              return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
            }
            exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
            exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
          })();
        if (typeof Float64Array !== "undefined")
          (function() {
            var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
            function writeDouble_f64_cpy(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[0];
              buf[pos + 1] = f8b[1];
              buf[pos + 2] = f8b[2];
              buf[pos + 3] = f8b[3];
              buf[pos + 4] = f8b[4];
              buf[pos + 5] = f8b[5];
              buf[pos + 6] = f8b[6];
              buf[pos + 7] = f8b[7];
            }
            function writeDouble_f64_rev(val, buf, pos) {
              f64[0] = val;
              buf[pos] = f8b[7];
              buf[pos + 1] = f8b[6];
              buf[pos + 2] = f8b[5];
              buf[pos + 3] = f8b[4];
              buf[pos + 4] = f8b[3];
              buf[pos + 5] = f8b[2];
              buf[pos + 6] = f8b[1];
              buf[pos + 7] = f8b[0];
            }
            exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
            exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
            function readDouble_f64_cpy(buf, pos) {
              f8b[0] = buf[pos];
              f8b[1] = buf[pos + 1];
              f8b[2] = buf[pos + 2];
              f8b[3] = buf[pos + 3];
              f8b[4] = buf[pos + 4];
              f8b[5] = buf[pos + 5];
              f8b[6] = buf[pos + 6];
              f8b[7] = buf[pos + 7];
              return f64[0];
            }
            function readDouble_f64_rev(buf, pos) {
              f8b[7] = buf[pos];
              f8b[6] = buf[pos + 1];
              f8b[5] = buf[pos + 2];
              f8b[4] = buf[pos + 3];
              f8b[3] = buf[pos + 4];
              f8b[2] = buf[pos + 5];
              f8b[1] = buf[pos + 6];
              f8b[0] = buf[pos + 7];
              return f64[0];
            }
            exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
            exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
          })();
        else
          (function() {
            function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
              var sign = val < 0 ? 1 : 0;
              if (sign)
                val = -val;
              if (val === 0) {
                writeUint(0, buf, pos + off0);
                writeUint(1 / val > 0 ? (
                  /* positive */
                  0
                ) : (
                  /* negative 0 */
                  2147483648
                ), buf, pos + off1);
              } else if (isNaN(val)) {
                writeUint(0, buf, pos + off0);
                writeUint(2146959360, buf, pos + off1);
              } else if (val > 17976931348623157e292) {
                writeUint(0, buf, pos + off0);
                writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
              } else {
                var mantissa;
                if (val < 22250738585072014e-324) {
                  mantissa = val / 5e-324;
                  writeUint(mantissa >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
                } else {
                  var exponent = Math.floor(Math.log(val) / Math.LN2);
                  if (exponent === 1024)
                    exponent = 1023;
                  mantissa = val * Math.pow(2, -exponent);
                  writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                  writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
                }
              }
            }
            exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
            exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
            function readDouble_ieee754(readUint, off0, off1, buf, pos) {
              var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
              var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
              return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
            }
            exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
            exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
          })();
        return exports3;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // node_modules/.pnpm/@protobufjs+inquire@1.1.0/node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/.pnpm/@protobufjs+inquire@1.1.0/node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e) {
        }
        return null;
      }
    }
  });

  // node_modules/.pnpm/@protobufjs+utf8@1.1.0/node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/.pnpm/@protobufjs+utf8@1.1.0/node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      var utf8 = exports2;
      utf8.length = function utf8_length(string) {
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i = 0, t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128)
            chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
          else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // node_modules/.pnpm/@protobufjs+pool@1.1.0/node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/.pnpm/@protobufjs+pool@1.1.0/node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (
        /* istanbul ignore next */
        []
      );
      util.emptyObject = Object.freeze ? Object.freeze({}) : (
        /* istanbul ignore next */
        {}
      );
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject2(value) {
        return value && typeof value === "object";
      };
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e) {
          return null;
        }
      }();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = /* istanbul ignore next */
      util.global.dcodeIO && /* istanbul ignore next */
      util.global.dcodeIO.Long || /* istanbul ignore next */
      util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      function merge2(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
        return dst;
      }
      util.merge = merge2;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge2(this, properties);
        }
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: function get() {
              return name;
            },
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: function value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
        function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        };
      };
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create();
      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp(
          (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
          value
        )).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
          buf[pos + i] = val[i];
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        } : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else
            for (var i = 0; i < val.length; )
              buf[pos++] = val[i++];
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      } : function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      };
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create();
      Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
      util.Array.prototype.slice;
      Reader.prototype.uint32 = /* @__PURE__ */ function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128)
            return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      }();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      BufferReader._configure();
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(
                  /* endedByRPC */
                  true
                );
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure();
    }
  });

  // node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "node_modules/.pnpm/protobufjs@7.2.6/node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      module2.exports = require_index_minimal();
    }
  });

  // node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/generated/root.js
  var require_root = __commonJS({
    "node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/generated/root.js"(exports2, module2) {
      "use strict";
      var $protobuf = require_minimal2();
      var $Reader = $protobuf.Reader;
      var $Writer = $protobuf.Writer;
      var $util = $protobuf.util;
      var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
      $root.opentelemetry = function() {
        var opentelemetry2 = {};
        opentelemetry2.proto = function() {
          var proto = {};
          proto.common = function() {
            var common = {};
            common.v1 = function() {
              var v1 = {};
              v1.AnyValue = function() {
                function AnyValue(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                AnyValue.prototype.stringValue = null;
                AnyValue.prototype.boolValue = null;
                AnyValue.prototype.intValue = null;
                AnyValue.prototype.doubleValue = null;
                AnyValue.prototype.arrayValue = null;
                AnyValue.prototype.kvlistValue = null;
                AnyValue.prototype.bytesValue = null;
                var $oneOfFields;
                Object.defineProperty(AnyValue.prototype, "value", {
                  get: $util.oneOfGetter($oneOfFields = ["stringValue", "boolValue", "intValue", "doubleValue", "arrayValue", "kvlistValue", "bytesValue"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                AnyValue.create = function create(properties) {
                  return new AnyValue(properties);
                };
                AnyValue.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).string(message.stringValue);
                  if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                    writer.uint32(
                      /* id 2, wireType 0 =*/
                      16
                    ).bool(message.boolValue);
                  if (message.intValue != null && Object.hasOwnProperty.call(message, "intValue"))
                    writer.uint32(
                      /* id 3, wireType 0 =*/
                      24
                    ).int64(message.intValue);
                  if (message.doubleValue != null && Object.hasOwnProperty.call(message, "doubleValue"))
                    writer.uint32(
                      /* id 4, wireType 1 =*/
                      33
                    ).double(message.doubleValue);
                  if (message.arrayValue != null && Object.hasOwnProperty.call(message, "arrayValue"))
                    $root.opentelemetry.proto.common.v1.ArrayValue.encode(message.arrayValue, writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).fork()).ldelim();
                  if (message.kvlistValue != null && Object.hasOwnProperty.call(message, "kvlistValue"))
                    $root.opentelemetry.proto.common.v1.KeyValueList.encode(message.kvlistValue, writer.uint32(
                      /* id 6, wireType 2 =*/
                      50
                    ).fork()).ldelim();
                  if (message.bytesValue != null && Object.hasOwnProperty.call(message, "bytesValue"))
                    writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).bytes(message.bytesValue);
                  return writer;
                };
                AnyValue.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                AnyValue.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.AnyValue();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.stringValue = reader.string();
                        break;
                      }
                      case 2: {
                        message.boolValue = reader.bool();
                        break;
                      }
                      case 3: {
                        message.intValue = reader.int64();
                        break;
                      }
                      case 4: {
                        message.doubleValue = reader.double();
                        break;
                      }
                      case 5: {
                        message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.decode(reader, reader.uint32());
                        break;
                      }
                      case 6: {
                        message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.decode(reader, reader.uint32());
                        break;
                      }
                      case 7: {
                        message.bytesValue = reader.bytes();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                AnyValue.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                AnyValue.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  var properties = {};
                  if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    properties.value = 1;
                    if (!$util.isString(message.stringValue))
                      return "stringValue: string expected";
                  }
                  if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    if (typeof message.boolValue !== "boolean")
                      return "boolValue: boolean expected";
                  }
                  if (message.intValue != null && message.hasOwnProperty("intValue")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    if (!$util.isInteger(message.intValue) && !(message.intValue && $util.isInteger(message.intValue.low) && $util.isInteger(message.intValue.high)))
                      return "intValue: integer|Long expected";
                  }
                  if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    if (typeof message.doubleValue !== "number")
                      return "doubleValue: number expected";
                  }
                  if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    {
                      var error = $root.opentelemetry.proto.common.v1.ArrayValue.verify(message.arrayValue);
                      if (error)
                        return "arrayValue." + error;
                    }
                  }
                  if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    {
                      var error = $root.opentelemetry.proto.common.v1.KeyValueList.verify(message.kvlistValue);
                      if (error)
                        return "kvlistValue." + error;
                    }
                  }
                  if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    if (!(message.bytesValue && typeof message.bytesValue.length === "number" || $util.isString(message.bytesValue)))
                      return "bytesValue: buffer expected";
                  }
                  return null;
                };
                AnyValue.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.common.v1.AnyValue)
                    return object;
                  var message = new $root.opentelemetry.proto.common.v1.AnyValue();
                  if (object.stringValue != null)
                    message.stringValue = String(object.stringValue);
                  if (object.boolValue != null)
                    message.boolValue = Boolean(object.boolValue);
                  if (object.intValue != null) {
                    if ($util.Long)
                      (message.intValue = $util.Long.fromValue(object.intValue)).unsigned = false;
                    else if (typeof object.intValue === "string")
                      message.intValue = parseInt(object.intValue, 10);
                    else if (typeof object.intValue === "number")
                      message.intValue = object.intValue;
                    else if (typeof object.intValue === "object")
                      message.intValue = new $util.LongBits(object.intValue.low >>> 0, object.intValue.high >>> 0).toNumber();
                  }
                  if (object.doubleValue != null)
                    message.doubleValue = Number(object.doubleValue);
                  if (object.arrayValue != null) {
                    if (typeof object.arrayValue !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.AnyValue.arrayValue: object expected");
                    message.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.fromObject(object.arrayValue);
                  }
                  if (object.kvlistValue != null) {
                    if (typeof object.kvlistValue !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.AnyValue.kvlistValue: object expected");
                    message.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.fromObject(object.kvlistValue);
                  }
                  if (object.bytesValue != null) {
                    if (typeof object.bytesValue === "string")
                      $util.base64.decode(object.bytesValue, message.bytesValue = $util.newBuffer($util.base64.length(object.bytesValue)), 0);
                    else if (object.bytesValue.length >= 0)
                      message.bytesValue = object.bytesValue;
                  }
                  return message;
                };
                AnyValue.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs)
                      object.value = "stringValue";
                  }
                  if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    object.boolValue = message.boolValue;
                    if (options.oneofs)
                      object.value = "boolValue";
                  }
                  if (message.intValue != null && message.hasOwnProperty("intValue")) {
                    if (typeof message.intValue === "number")
                      object.intValue = options.longs === String ? String(message.intValue) : message.intValue;
                    else
                      object.intValue = options.longs === String ? $util.Long.prototype.toString.call(message.intValue) : options.longs === Number ? new $util.LongBits(message.intValue.low >>> 0, message.intValue.high >>> 0).toNumber() : message.intValue;
                    if (options.oneofs)
                      object.value = "intValue";
                  }
                  if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                    object.doubleValue = options.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                    if (options.oneofs)
                      object.value = "doubleValue";
                  }
                  if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                    object.arrayValue = $root.opentelemetry.proto.common.v1.ArrayValue.toObject(message.arrayValue, options);
                    if (options.oneofs)
                      object.value = "arrayValue";
                  }
                  if (message.kvlistValue != null && message.hasOwnProperty("kvlistValue")) {
                    object.kvlistValue = $root.opentelemetry.proto.common.v1.KeyValueList.toObject(message.kvlistValue, options);
                    if (options.oneofs)
                      object.value = "kvlistValue";
                  }
                  if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                    object.bytesValue = options.bytes === String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options.bytes === Array ? Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                    if (options.oneofs)
                      object.value = "bytesValue";
                  }
                  return object;
                };
                AnyValue.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                AnyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.common.v1.AnyValue";
                };
                return AnyValue;
              }();
              v1.ArrayValue = function() {
                function ArrayValue(properties) {
                  this.values = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ArrayValue.prototype.values = $util.emptyArray;
                ArrayValue.create = function create(properties) {
                  return new ArrayValue(properties);
                };
                ArrayValue.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.values != null && message.values.length)
                    for (var i = 0; i < message.values.length; ++i)
                      $root.opentelemetry.proto.common.v1.AnyValue.encode(message.values[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                ArrayValue.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ArrayValue.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.values && message.values.length))
                          message.values = [];
                        message.values.push($root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ArrayValue.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ArrayValue.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.values != null && message.hasOwnProperty("values")) {
                    if (!Array.isArray(message.values))
                      return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.values[i]);
                      if (error)
                        return "values." + error;
                    }
                  }
                  return null;
                };
                ArrayValue.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.common.v1.ArrayValue)
                    return object;
                  var message = new $root.opentelemetry.proto.common.v1.ArrayValue();
                  if (object.values) {
                    if (!Array.isArray(object.values))
                      throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i) {
                      if (typeof object.values[i] !== "object")
                        throw TypeError(".opentelemetry.proto.common.v1.ArrayValue.values: object expected");
                      message.values[i] = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.values[i]);
                    }
                  }
                  return message;
                };
                ArrayValue.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.values = [];
                  if (message.values && message.values.length) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                      object.values[j] = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.values[j], options);
                  }
                  return object;
                };
                ArrayValue.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ArrayValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.common.v1.ArrayValue";
                };
                return ArrayValue;
              }();
              v1.KeyValueList = function() {
                function KeyValueList(properties) {
                  this.values = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                KeyValueList.prototype.values = $util.emptyArray;
                KeyValueList.create = function create(properties) {
                  return new KeyValueList(properties);
                };
                KeyValueList.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.values != null && message.values.length)
                    for (var i = 0; i < message.values.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.values[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                KeyValueList.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                KeyValueList.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.values && message.values.length))
                          message.values = [];
                        message.values.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                KeyValueList.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                KeyValueList.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.values != null && message.hasOwnProperty("values")) {
                    if (!Array.isArray(message.values))
                      return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.values[i]);
                      if (error)
                        return "values." + error;
                    }
                  }
                  return null;
                };
                KeyValueList.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.common.v1.KeyValueList)
                    return object;
                  var message = new $root.opentelemetry.proto.common.v1.KeyValueList();
                  if (object.values) {
                    if (!Array.isArray(object.values))
                      throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i) {
                      if (typeof object.values[i] !== "object")
                        throw TypeError(".opentelemetry.proto.common.v1.KeyValueList.values: object expected");
                      message.values[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.values[i]);
                    }
                  }
                  return message;
                };
                KeyValueList.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.values = [];
                  if (message.values && message.values.length) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                      object.values[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.values[j], options);
                  }
                  return object;
                };
                KeyValueList.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                KeyValueList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValueList";
                };
                return KeyValueList;
              }();
              v1.KeyValue = function() {
                function KeyValue(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                KeyValue.prototype.key = null;
                KeyValue.prototype.value = null;
                KeyValue.create = function create(properties) {
                  return new KeyValue(properties);
                };
                KeyValue.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).string(message.key);
                  if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    $root.opentelemetry.proto.common.v1.AnyValue.encode(message.value, writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).fork()).ldelim();
                  return writer;
                };
                KeyValue.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                KeyValue.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.KeyValue();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.key = reader.string();
                        break;
                      }
                      case 2: {
                        message.value = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                KeyValue.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                KeyValue.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.key != null && message.hasOwnProperty("key")) {
                    if (!$util.isString(message.key))
                      return "key: string expected";
                  }
                  if (message.value != null && message.hasOwnProperty("value")) {
                    var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.value);
                    if (error)
                      return "value." + error;
                  }
                  return null;
                };
                KeyValue.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.common.v1.KeyValue)
                    return object;
                  var message = new $root.opentelemetry.proto.common.v1.KeyValue();
                  if (object.key != null)
                    message.key = String(object.key);
                  if (object.value != null) {
                    if (typeof object.value !== "object")
                      throw TypeError(".opentelemetry.proto.common.v1.KeyValue.value: object expected");
                    message.value = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.value);
                  }
                  return message;
                };
                KeyValue.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.defaults) {
                    object.key = "";
                    object.value = null;
                  }
                  if (message.key != null && message.hasOwnProperty("key"))
                    object.key = message.key;
                  if (message.value != null && message.hasOwnProperty("value"))
                    object.value = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.value, options);
                  return object;
                };
                KeyValue.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                KeyValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.common.v1.KeyValue";
                };
                return KeyValue;
              }();
              v1.InstrumentationScope = function() {
                function InstrumentationScope(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                InstrumentationScope.prototype.name = null;
                InstrumentationScope.prototype.version = null;
                InstrumentationScope.prototype.attributes = $util.emptyArray;
                InstrumentationScope.prototype.droppedAttributesCount = null;
                InstrumentationScope.create = function create(properties) {
                  return new InstrumentationScope(properties);
                };
                InstrumentationScope.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).string(message.name);
                  if (message.version != null && Object.hasOwnProperty.call(message, "version"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.version);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 3, wireType 2 =*/
                        26
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 4, wireType 0 =*/
                      32
                    ).uint32(message.droppedAttributesCount);
                  return writer;
                };
                InstrumentationScope.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                InstrumentationScope.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.name = reader.string();
                        break;
                      }
                      case 2: {
                        message.version = reader.string();
                        break;
                      }
                      case 3: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 4: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                InstrumentationScope.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                InstrumentationScope.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.name != null && message.hasOwnProperty("name")) {
                    if (!$util.isString(message.name))
                      return "name: string expected";
                  }
                  if (message.version != null && message.hasOwnProperty("version")) {
                    if (!$util.isString(message.version))
                      return "version: string expected";
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  return null;
                };
                InstrumentationScope.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.common.v1.InstrumentationScope)
                    return object;
                  var message = new $root.opentelemetry.proto.common.v1.InstrumentationScope();
                  if (object.name != null)
                    message.name = String(object.name);
                  if (object.version != null)
                    message.version = String(object.version);
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.common.v1.InstrumentationScope.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  return message;
                };
                InstrumentationScope.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.attributes = [];
                  if (options.defaults) {
                    object.name = "";
                    object.version = "";
                    object.droppedAttributesCount = 0;
                  }
                  if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                  if (message.version != null && message.hasOwnProperty("version"))
                    object.version = message.version;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                };
                InstrumentationScope.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                InstrumentationScope.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.common.v1.InstrumentationScope";
                };
                return InstrumentationScope;
              }();
              return v1;
            }();
            return common;
          }();
          proto.resource = function() {
            var resource2 = {};
            resource2.v1 = function() {
              var v1 = {};
              v1.Resource = function() {
                function Resource2(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Resource2.prototype.attributes = $util.emptyArray;
                Resource2.prototype.droppedAttributesCount = null;
                Resource2.create = function create(properties) {
                  return new Resource2(properties);
                };
                Resource2.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 2, wireType 0 =*/
                      16
                    ).uint32(message.droppedAttributesCount);
                  return writer;
                };
                Resource2.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Resource2.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.resource.v1.Resource();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Resource2.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Resource2.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  return null;
                };
                Resource2.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.resource.v1.Resource)
                    return object;
                  var message = new $root.opentelemetry.proto.resource.v1.Resource();
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.resource.v1.Resource.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  return message;
                };
                Resource2.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.attributes = [];
                  if (options.defaults)
                    object.droppedAttributesCount = 0;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  return object;
                };
                Resource2.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Resource2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.resource.v1.Resource";
                };
                return Resource2;
              }();
              return v1;
            }();
            return resource2;
          }();
          proto.trace = function() {
            var trace2 = {};
            trace2.v1 = function() {
              var v1 = {};
              v1.TracesData = function() {
                function TracesData(properties) {
                  this.resourceSpans = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                TracesData.prototype.resourceSpans = $util.emptyArray;
                TracesData.create = function create(properties) {
                  return new TracesData(properties);
                };
                TracesData.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceSpans != null && message.resourceSpans.length)
                    for (var i = 0; i < message.resourceSpans.length; ++i)
                      $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                TracesData.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                TracesData.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.TracesData();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceSpans && message.resourceSpans.length))
                          message.resourceSpans = [];
                        message.resourceSpans.push($root.opentelemetry.proto.trace.v1.ResourceSpans.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                TracesData.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                TracesData.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceSpans != null && message.hasOwnProperty("resourceSpans")) {
                    if (!Array.isArray(message.resourceSpans))
                      return "resourceSpans: array expected";
                    for (var i = 0; i < message.resourceSpans.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.ResourceSpans.verify(message.resourceSpans[i]);
                      if (error)
                        return "resourceSpans." + error;
                    }
                  }
                  return null;
                };
                TracesData.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.TracesData)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.TracesData();
                  if (object.resourceSpans) {
                    if (!Array.isArray(object.resourceSpans))
                      throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: array expected");
                    message.resourceSpans = [];
                    for (var i = 0; i < object.resourceSpans.length; ++i) {
                      if (typeof object.resourceSpans[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.TracesData.resourceSpans: object expected");
                      message.resourceSpans[i] = $root.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(object.resourceSpans[i]);
                    }
                  }
                  return message;
                };
                TracesData.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.resourceSpans = [];
                  if (message.resourceSpans && message.resourceSpans.length) {
                    object.resourceSpans = [];
                    for (var j = 0; j < message.resourceSpans.length; ++j)
                      object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options);
                  }
                  return object;
                };
                TracesData.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                TracesData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.TracesData";
                };
                return TracesData;
              }();
              v1.ResourceSpans = function() {
                function ResourceSpans(properties) {
                  this.scopeSpans = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ResourceSpans.prototype.resource = null;
                ResourceSpans.prototype.scopeSpans = $util.emptyArray;
                ResourceSpans.prototype.schemaUrl = null;
                ResourceSpans.create = function create(properties) {
                  return new ResourceSpans(properties);
                };
                ResourceSpans.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                    $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  if (message.scopeSpans != null && message.scopeSpans.length)
                    for (var i = 0; i < message.scopeSpans.length; ++i)
                      $root.opentelemetry.proto.trace.v1.ScopeSpans.encode(message.scopeSpans[i], writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork()).ldelim();
                  if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.schemaUrl);
                  return writer;
                };
                ResourceSpans.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ResourceSpans.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.ResourceSpans();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                        break;
                      }
                      case 2: {
                        if (!(message.scopeSpans && message.scopeSpans.length))
                          message.scopeSpans = [];
                        message.scopeSpans.push($root.opentelemetry.proto.trace.v1.ScopeSpans.decode(reader, reader.uint32()));
                        break;
                      }
                      case 3: {
                        message.schemaUrl = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ResourceSpans.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ResourceSpans.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resource != null && message.hasOwnProperty("resource")) {
                    var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                    if (error)
                      return "resource." + error;
                  }
                  if (message.scopeSpans != null && message.hasOwnProperty("scopeSpans")) {
                    if (!Array.isArray(message.scopeSpans))
                      return "scopeSpans: array expected";
                    for (var i = 0; i < message.scopeSpans.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.ScopeSpans.verify(message.scopeSpans[i]);
                      if (error)
                        return "scopeSpans." + error;
                    }
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                    if (!$util.isString(message.schemaUrl))
                      return "schemaUrl: string expected";
                  }
                  return null;
                };
                ResourceSpans.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.ResourceSpans)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.ResourceSpans();
                  if (object.resource != null) {
                    if (typeof object.resource !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.resource: object expected");
                    message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                  }
                  if (object.scopeSpans) {
                    if (!Array.isArray(object.scopeSpans))
                      throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: array expected");
                    message.scopeSpans = [];
                    for (var i = 0; i < object.scopeSpans.length; ++i) {
                      if (typeof object.scopeSpans[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.ResourceSpans.scopeSpans: object expected");
                      message.scopeSpans[i] = $root.opentelemetry.proto.trace.v1.ScopeSpans.fromObject(object.scopeSpans[i]);
                    }
                  }
                  if (object.schemaUrl != null)
                    message.schemaUrl = String(object.schemaUrl);
                  return message;
                };
                ResourceSpans.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.scopeSpans = [];
                  if (options.defaults) {
                    object.resource = null;
                    object.schemaUrl = "";
                  }
                  if (message.resource != null && message.hasOwnProperty("resource"))
                    object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options);
                  if (message.scopeSpans && message.scopeSpans.length) {
                    object.scopeSpans = [];
                    for (var j = 0; j < message.scopeSpans.length; ++j)
                      object.scopeSpans[j] = $root.opentelemetry.proto.trace.v1.ScopeSpans.toObject(message.scopeSpans[j], options);
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                    object.schemaUrl = message.schemaUrl;
                  return object;
                };
                ResourceSpans.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ResourceSpans.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ResourceSpans";
                };
                return ResourceSpans;
              }();
              v1.ScopeSpans = function() {
                function ScopeSpans(properties) {
                  this.spans = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ScopeSpans.prototype.scope = null;
                ScopeSpans.prototype.spans = $util.emptyArray;
                ScopeSpans.prototype.schemaUrl = null;
                ScopeSpans.create = function create(properties) {
                  return new ScopeSpans(properties);
                };
                ScopeSpans.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                    $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  if (message.spans != null && message.spans.length)
                    for (var i = 0; i < message.spans.length; ++i)
                      $root.opentelemetry.proto.trace.v1.Span.encode(message.spans[i], writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork()).ldelim();
                  if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.schemaUrl);
                  return writer;
                };
                ScopeSpans.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ScopeSpans.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.ScopeSpans();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                        break;
                      }
                      case 2: {
                        if (!(message.spans && message.spans.length))
                          message.spans = [];
                        message.spans.push($root.opentelemetry.proto.trace.v1.Span.decode(reader, reader.uint32()));
                        break;
                      }
                      case 3: {
                        message.schemaUrl = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ScopeSpans.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ScopeSpans.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.scope != null && message.hasOwnProperty("scope")) {
                    var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                    if (error)
                      return "scope." + error;
                  }
                  if (message.spans != null && message.hasOwnProperty("spans")) {
                    if (!Array.isArray(message.spans))
                      return "spans: array expected";
                    for (var i = 0; i < message.spans.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.Span.verify(message.spans[i]);
                      if (error)
                        return "spans." + error;
                    }
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                    if (!$util.isString(message.schemaUrl))
                      return "schemaUrl: string expected";
                  }
                  return null;
                };
                ScopeSpans.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.ScopeSpans)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.ScopeSpans();
                  if (object.scope != null) {
                    if (typeof object.scope !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.scope: object expected");
                    message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                  }
                  if (object.spans) {
                    if (!Array.isArray(object.spans))
                      throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: array expected");
                    message.spans = [];
                    for (var i = 0; i < object.spans.length; ++i) {
                      if (typeof object.spans[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.ScopeSpans.spans: object expected");
                      message.spans[i] = $root.opentelemetry.proto.trace.v1.Span.fromObject(object.spans[i]);
                    }
                  }
                  if (object.schemaUrl != null)
                    message.schemaUrl = String(object.schemaUrl);
                  return message;
                };
                ScopeSpans.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.spans = [];
                  if (options.defaults) {
                    object.scope = null;
                    object.schemaUrl = "";
                  }
                  if (message.scope != null && message.hasOwnProperty("scope"))
                    object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options);
                  if (message.spans && message.spans.length) {
                    object.spans = [];
                    for (var j = 0; j < message.spans.length; ++j)
                      object.spans[j] = $root.opentelemetry.proto.trace.v1.Span.toObject(message.spans[j], options);
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                    object.schemaUrl = message.schemaUrl;
                  return object;
                };
                ScopeSpans.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ScopeSpans.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.ScopeSpans";
                };
                return ScopeSpans;
              }();
              v1.Span = function() {
                function Span2(properties) {
                  this.attributes = [];
                  this.events = [];
                  this.links = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Span2.prototype.traceId = null;
                Span2.prototype.spanId = null;
                Span2.prototype.traceState = null;
                Span2.prototype.parentSpanId = null;
                Span2.prototype.name = null;
                Span2.prototype.kind = null;
                Span2.prototype.startTimeUnixNano = null;
                Span2.prototype.endTimeUnixNano = null;
                Span2.prototype.attributes = $util.emptyArray;
                Span2.prototype.droppedAttributesCount = null;
                Span2.prototype.events = $util.emptyArray;
                Span2.prototype.droppedEventsCount = null;
                Span2.prototype.links = $util.emptyArray;
                Span2.prototype.droppedLinksCount = null;
                Span2.prototype.status = null;
                Span2.create = function create(properties) {
                  return new Span2(properties);
                };
                Span2.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).bytes(message.traceId);
                  if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).bytes(message.spanId);
                  if (message.traceState != null && Object.hasOwnProperty.call(message, "traceState"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.traceState);
                  if (message.parentSpanId != null && Object.hasOwnProperty.call(message, "parentSpanId"))
                    writer.uint32(
                      /* id 4, wireType 2 =*/
                      34
                    ).bytes(message.parentSpanId);
                  if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).string(message.name);
                  if (message.kind != null && Object.hasOwnProperty.call(message, "kind"))
                    writer.uint32(
                      /* id 6, wireType 0 =*/
                      48
                    ).int32(message.kind);
                  if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                    writer.uint32(
                      /* id 7, wireType 1 =*/
                      57
                    ).fixed64(message.startTimeUnixNano);
                  if (message.endTimeUnixNano != null && Object.hasOwnProperty.call(message, "endTimeUnixNano"))
                    writer.uint32(
                      /* id 8, wireType 1 =*/
                      65
                    ).fixed64(message.endTimeUnixNano);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 9, wireType 2 =*/
                        74
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 10, wireType 0 =*/
                      80
                    ).uint32(message.droppedAttributesCount);
                  if (message.events != null && message.events.length)
                    for (var i = 0; i < message.events.length; ++i)
                      $root.opentelemetry.proto.trace.v1.Span.Event.encode(message.events[i], writer.uint32(
                        /* id 11, wireType 2 =*/
                        90
                      ).fork()).ldelim();
                  if (message.droppedEventsCount != null && Object.hasOwnProperty.call(message, "droppedEventsCount"))
                    writer.uint32(
                      /* id 12, wireType 0 =*/
                      96
                    ).uint32(message.droppedEventsCount);
                  if (message.links != null && message.links.length)
                    for (var i = 0; i < message.links.length; ++i)
                      $root.opentelemetry.proto.trace.v1.Span.Link.encode(message.links[i], writer.uint32(
                        /* id 13, wireType 2 =*/
                        106
                      ).fork()).ldelim();
                  if (message.droppedLinksCount != null && Object.hasOwnProperty.call(message, "droppedLinksCount"))
                    writer.uint32(
                      /* id 14, wireType 0 =*/
                      112
                    ).uint32(message.droppedLinksCount);
                  if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                    $root.opentelemetry.proto.trace.v1.Status.encode(message.status, writer.uint32(
                      /* id 15, wireType 2 =*/
                      122
                    ).fork()).ldelim();
                  return writer;
                };
                Span2.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Span2.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.traceId = reader.bytes();
                        break;
                      }
                      case 2: {
                        message.spanId = reader.bytes();
                        break;
                      }
                      case 3: {
                        message.traceState = reader.string();
                        break;
                      }
                      case 4: {
                        message.parentSpanId = reader.bytes();
                        break;
                      }
                      case 5: {
                        message.name = reader.string();
                        break;
                      }
                      case 6: {
                        message.kind = reader.int32();
                        break;
                      }
                      case 7: {
                        message.startTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 8: {
                        message.endTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 9: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 10: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      case 11: {
                        if (!(message.events && message.events.length))
                          message.events = [];
                        message.events.push($root.opentelemetry.proto.trace.v1.Span.Event.decode(reader, reader.uint32()));
                        break;
                      }
                      case 12: {
                        message.droppedEventsCount = reader.uint32();
                        break;
                      }
                      case 13: {
                        if (!(message.links && message.links.length))
                          message.links = [];
                        message.links.push($root.opentelemetry.proto.trace.v1.Span.Link.decode(reader, reader.uint32()));
                        break;
                      }
                      case 14: {
                        message.droppedLinksCount = reader.uint32();
                        break;
                      }
                      case 15: {
                        message.status = $root.opentelemetry.proto.trace.v1.Status.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Span2.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Span2.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.traceId != null && message.hasOwnProperty("traceId")) {
                    if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                      return "traceId: buffer expected";
                  }
                  if (message.spanId != null && message.hasOwnProperty("spanId")) {
                    if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                      return "spanId: buffer expected";
                  }
                  if (message.traceState != null && message.hasOwnProperty("traceState")) {
                    if (!$util.isString(message.traceState))
                      return "traceState: string expected";
                  }
                  if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId")) {
                    if (!(message.parentSpanId && typeof message.parentSpanId.length === "number" || $util.isString(message.parentSpanId)))
                      return "parentSpanId: buffer expected";
                  }
                  if (message.name != null && message.hasOwnProperty("name")) {
                    if (!$util.isString(message.name))
                      return "name: string expected";
                  }
                  if (message.kind != null && message.hasOwnProperty("kind"))
                    switch (message.kind) {
                      default:
                        return "kind: enum value expected";
                      case 0:
                      case 1:
                      case 2:
                      case 3:
                      case 4:
                      case 5:
                        break;
                    }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                    if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                      return "startTimeUnixNano: integer|Long expected";
                  }
                  if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano")) {
                    if (!$util.isInteger(message.endTimeUnixNano) && !(message.endTimeUnixNano && $util.isInteger(message.endTimeUnixNano.low) && $util.isInteger(message.endTimeUnixNano.high)))
                      return "endTimeUnixNano: integer|Long expected";
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  if (message.events != null && message.hasOwnProperty("events")) {
                    if (!Array.isArray(message.events))
                      return "events: array expected";
                    for (var i = 0; i < message.events.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.Span.Event.verify(message.events[i]);
                      if (error)
                        return "events." + error;
                    }
                  }
                  if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount")) {
                    if (!$util.isInteger(message.droppedEventsCount))
                      return "droppedEventsCount: integer expected";
                  }
                  if (message.links != null && message.hasOwnProperty("links")) {
                    if (!Array.isArray(message.links))
                      return "links: array expected";
                    for (var i = 0; i < message.links.length; ++i) {
                      var error = $root.opentelemetry.proto.trace.v1.Span.Link.verify(message.links[i]);
                      if (error)
                        return "links." + error;
                    }
                  }
                  if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount")) {
                    if (!$util.isInteger(message.droppedLinksCount))
                      return "droppedLinksCount: integer expected";
                  }
                  if (message.status != null && message.hasOwnProperty("status")) {
                    var error = $root.opentelemetry.proto.trace.v1.Status.verify(message.status);
                    if (error)
                      return "status." + error;
                  }
                  return null;
                };
                Span2.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.Span)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.Span();
                  if (object.traceId != null) {
                    if (typeof object.traceId === "string")
                      $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                    else if (object.traceId.length >= 0)
                      message.traceId = object.traceId;
                  }
                  if (object.spanId != null) {
                    if (typeof object.spanId === "string")
                      $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                    else if (object.spanId.length >= 0)
                      message.spanId = object.spanId;
                  }
                  if (object.traceState != null)
                    message.traceState = String(object.traceState);
                  if (object.parentSpanId != null) {
                    if (typeof object.parentSpanId === "string")
                      $util.base64.decode(object.parentSpanId, message.parentSpanId = $util.newBuffer($util.base64.length(object.parentSpanId)), 0);
                    else if (object.parentSpanId.length >= 0)
                      message.parentSpanId = object.parentSpanId;
                  }
                  if (object.name != null)
                    message.name = String(object.name);
                  switch (object.kind) {
                    default:
                      if (typeof object.kind === "number") {
                        message.kind = object.kind;
                        break;
                      }
                      break;
                    case "SPAN_KIND_UNSPECIFIED":
                    case 0:
                      message.kind = 0;
                      break;
                    case "SPAN_KIND_INTERNAL":
                    case 1:
                      message.kind = 1;
                      break;
                    case "SPAN_KIND_SERVER":
                    case 2:
                      message.kind = 2;
                      break;
                    case "SPAN_KIND_CLIENT":
                    case 3:
                      message.kind = 3;
                      break;
                    case "SPAN_KIND_PRODUCER":
                    case 4:
                      message.kind = 4;
                      break;
                    case "SPAN_KIND_CONSUMER":
                    case 5:
                      message.kind = 5;
                      break;
                  }
                  if (object.startTimeUnixNano != null) {
                    if ($util.Long)
                      (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                    else if (typeof object.startTimeUnixNano === "string")
                      message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                    else if (typeof object.startTimeUnixNano === "number")
                      message.startTimeUnixNano = object.startTimeUnixNano;
                    else if (typeof object.startTimeUnixNano === "object")
                      message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.endTimeUnixNano != null) {
                    if ($util.Long)
                      (message.endTimeUnixNano = $util.Long.fromValue(object.endTimeUnixNano)).unsigned = false;
                    else if (typeof object.endTimeUnixNano === "string")
                      message.endTimeUnixNano = parseInt(object.endTimeUnixNano, 10);
                    else if (typeof object.endTimeUnixNano === "number")
                      message.endTimeUnixNano = object.endTimeUnixNano;
                    else if (typeof object.endTimeUnixNano === "object")
                      message.endTimeUnixNano = new $util.LongBits(object.endTimeUnixNano.low >>> 0, object.endTimeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  if (object.events) {
                    if (!Array.isArray(object.events))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.events: array expected");
                    message.events = [];
                    for (var i = 0; i < object.events.length; ++i) {
                      if (typeof object.events[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.events: object expected");
                      message.events[i] = $root.opentelemetry.proto.trace.v1.Span.Event.fromObject(object.events[i]);
                    }
                  }
                  if (object.droppedEventsCount != null)
                    message.droppedEventsCount = object.droppedEventsCount >>> 0;
                  if (object.links) {
                    if (!Array.isArray(object.links))
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.links: array expected");
                    message.links = [];
                    for (var i = 0; i < object.links.length; ++i) {
                      if (typeof object.links[i] !== "object")
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.links: object expected");
                      message.links[i] = $root.opentelemetry.proto.trace.v1.Span.Link.fromObject(object.links[i]);
                    }
                  }
                  if (object.droppedLinksCount != null)
                    message.droppedLinksCount = object.droppedLinksCount >>> 0;
                  if (object.status != null) {
                    if (typeof object.status !== "object")
                      throw TypeError(".opentelemetry.proto.trace.v1.Span.status: object expected");
                    message.status = $root.opentelemetry.proto.trace.v1.Status.fromObject(object.status);
                  }
                  return message;
                };
                Span2.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults) {
                    object.attributes = [];
                    object.events = [];
                    object.links = [];
                  }
                  if (options.defaults) {
                    if (options.bytes === String)
                      object.traceId = "";
                    else {
                      object.traceId = [];
                      if (options.bytes !== Array)
                        object.traceId = $util.newBuffer(object.traceId);
                    }
                    if (options.bytes === String)
                      object.spanId = "";
                    else {
                      object.spanId = [];
                      if (options.bytes !== Array)
                        object.spanId = $util.newBuffer(object.spanId);
                    }
                    object.traceState = "";
                    if (options.bytes === String)
                      object.parentSpanId = "";
                    else {
                      object.parentSpanId = [];
                      if (options.bytes !== Array)
                        object.parentSpanId = $util.newBuffer(object.parentSpanId);
                    }
                    object.name = "";
                    object.kind = options.enums === String ? "SPAN_KIND_UNSPECIFIED" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.startTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.startTimeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.endTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.endTimeUnixNano = options.longs === String ? "0" : 0;
                    object.droppedAttributesCount = 0;
                    object.droppedEventsCount = 0;
                    object.droppedLinksCount = 0;
                    object.status = null;
                  }
                  if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = options.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                  if (message.spanId != null && message.hasOwnProperty("spanId"))
                    object.spanId = options.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                  if (message.traceState != null && message.hasOwnProperty("traceState"))
                    object.traceState = message.traceState;
                  if (message.parentSpanId != null && message.hasOwnProperty("parentSpanId"))
                    object.parentSpanId = options.bytes === String ? $util.base64.encode(message.parentSpanId, 0, message.parentSpanId.length) : options.bytes === Array ? Array.prototype.slice.call(message.parentSpanId) : message.parentSpanId;
                  if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                  if (message.kind != null && message.hasOwnProperty("kind"))
                    object.kind = options.enums === String ? $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] === void 0 ? message.kind : $root.opentelemetry.proto.trace.v1.Span.SpanKind[message.kind] : message.kind;
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                    if (typeof message.startTimeUnixNano === "number")
                      object.startTimeUnixNano = options.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                    else
                      object.startTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                  if (message.endTimeUnixNano != null && message.hasOwnProperty("endTimeUnixNano"))
                    if (typeof message.endTimeUnixNano === "number")
                      object.endTimeUnixNano = options.longs === String ? String(message.endTimeUnixNano) : message.endTimeUnixNano;
                    else
                      object.endTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.endTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.endTimeUnixNano.low >>> 0, message.endTimeUnixNano.high >>> 0).toNumber() : message.endTimeUnixNano;
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  if (message.events && message.events.length) {
                    object.events = [];
                    for (var j = 0; j < message.events.length; ++j)
                      object.events[j] = $root.opentelemetry.proto.trace.v1.Span.Event.toObject(message.events[j], options);
                  }
                  if (message.droppedEventsCount != null && message.hasOwnProperty("droppedEventsCount"))
                    object.droppedEventsCount = message.droppedEventsCount;
                  if (message.links && message.links.length) {
                    object.links = [];
                    for (var j = 0; j < message.links.length; ++j)
                      object.links[j] = $root.opentelemetry.proto.trace.v1.Span.Link.toObject(message.links[j], options);
                  }
                  if (message.droppedLinksCount != null && message.hasOwnProperty("droppedLinksCount"))
                    object.droppedLinksCount = message.droppedLinksCount;
                  if (message.status != null && message.hasOwnProperty("status"))
                    object.status = $root.opentelemetry.proto.trace.v1.Status.toObject(message.status, options);
                  return object;
                };
                Span2.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Span2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span";
                };
                Span2.SpanKind = function() {
                  var valuesById = {}, values = Object.create(valuesById);
                  values[valuesById[0] = "SPAN_KIND_UNSPECIFIED"] = 0;
                  values[valuesById[1] = "SPAN_KIND_INTERNAL"] = 1;
                  values[valuesById[2] = "SPAN_KIND_SERVER"] = 2;
                  values[valuesById[3] = "SPAN_KIND_CLIENT"] = 3;
                  values[valuesById[4] = "SPAN_KIND_PRODUCER"] = 4;
                  values[valuesById[5] = "SPAN_KIND_CONSUMER"] = 5;
                  return values;
                }();
                Span2.Event = function() {
                  function Event2(properties) {
                    this.attributes = [];
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  Event2.prototype.timeUnixNano = null;
                  Event2.prototype.name = null;
                  Event2.prototype.attributes = $util.emptyArray;
                  Event2.prototype.droppedAttributesCount = null;
                  Event2.create = function create(properties) {
                    return new Event2(properties);
                  };
                  Event2.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                      writer.uint32(
                        /* id 1, wireType 1 =*/
                        9
                      ).fixed64(message.timeUnixNano);
                    if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                      writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).string(message.name);
                    if (message.attributes != null && message.attributes.length)
                      for (var i = 0; i < message.attributes.length; ++i)
                        $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                          /* id 3, wireType 2 =*/
                          26
                        ).fork()).ldelim();
                    if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                      writer.uint32(
                        /* id 4, wireType 0 =*/
                        32
                      ).uint32(message.droppedAttributesCount);
                    return writer;
                  };
                  Event2.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  Event2.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span.Event();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.timeUnixNano = reader.fixed64();
                          break;
                        }
                        case 2: {
                          message.name = reader.string();
                          break;
                        }
                        case 3: {
                          if (!(message.attributes && message.attributes.length))
                            message.attributes = [];
                          message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                          break;
                        }
                        case 4: {
                          message.droppedAttributesCount = reader.uint32();
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  Event2.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  Event2.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                      if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                        return "timeUnixNano: integer|Long expected";
                    }
                    if (message.name != null && message.hasOwnProperty("name")) {
                      if (!$util.isString(message.name))
                        return "name: string expected";
                    }
                    if (message.attributes != null && message.hasOwnProperty("attributes")) {
                      if (!Array.isArray(message.attributes))
                        return "attributes: array expected";
                      for (var i = 0; i < message.attributes.length; ++i) {
                        var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                        if (error)
                          return "attributes." + error;
                      }
                    }
                    if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                      if (!$util.isInteger(message.droppedAttributesCount))
                        return "droppedAttributesCount: integer expected";
                    }
                    return null;
                  };
                  Event2.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.trace.v1.Span.Event)
                      return object;
                    var message = new $root.opentelemetry.proto.trace.v1.Span.Event();
                    if (object.timeUnixNano != null) {
                      if ($util.Long)
                        (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                      else if (typeof object.timeUnixNano === "string")
                        message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                      else if (typeof object.timeUnixNano === "number")
                        message.timeUnixNano = object.timeUnixNano;
                      else if (typeof object.timeUnixNano === "object")
                        message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                    }
                    if (object.name != null)
                      message.name = String(object.name);
                    if (object.attributes) {
                      if (!Array.isArray(object.attributes))
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: array expected");
                      message.attributes = [];
                      for (var i = 0; i < object.attributes.length; ++i) {
                        if (typeof object.attributes[i] !== "object")
                          throw TypeError(".opentelemetry.proto.trace.v1.Span.Event.attributes: object expected");
                        message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                      }
                    }
                    if (object.droppedAttributesCount != null)
                      message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                    return message;
                  };
                  Event2.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                      object.attributes = [];
                    if (options.defaults) {
                      if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                      } else
                        object.timeUnixNano = options.longs === String ? "0" : 0;
                      object.name = "";
                      object.droppedAttributesCount = 0;
                    }
                    if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                      if (typeof message.timeUnixNano === "number")
                        object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                      else
                        object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                    if (message.name != null && message.hasOwnProperty("name"))
                      object.name = message.name;
                    if (message.attributes && message.attributes.length) {
                      object.attributes = [];
                      for (var j = 0; j < message.attributes.length; ++j)
                        object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                    }
                    if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                      object.droppedAttributesCount = message.droppedAttributesCount;
                    return object;
                  };
                  Event2.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  Event2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Event";
                  };
                  return Event2;
                }();
                Span2.Link = function() {
                  function Link(properties) {
                    this.attributes = [];
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  Link.prototype.traceId = null;
                  Link.prototype.spanId = null;
                  Link.prototype.traceState = null;
                  Link.prototype.attributes = $util.emptyArray;
                  Link.prototype.droppedAttributesCount = null;
                  Link.create = function create(properties) {
                    return new Link(properties);
                  };
                  Link.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                      writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).bytes(message.traceId);
                    if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                      writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).bytes(message.spanId);
                    if (message.traceState != null && Object.hasOwnProperty.call(message, "traceState"))
                      writer.uint32(
                        /* id 3, wireType 2 =*/
                        26
                      ).string(message.traceState);
                    if (message.attributes != null && message.attributes.length)
                      for (var i = 0; i < message.attributes.length; ++i)
                        $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                          /* id 4, wireType 2 =*/
                          34
                        ).fork()).ldelim();
                    if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                      writer.uint32(
                        /* id 5, wireType 0 =*/
                        40
                      ).uint32(message.droppedAttributesCount);
                    return writer;
                  };
                  Link.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  Link.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Span.Link();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.traceId = reader.bytes();
                          break;
                        }
                        case 2: {
                          message.spanId = reader.bytes();
                          break;
                        }
                        case 3: {
                          message.traceState = reader.string();
                          break;
                        }
                        case 4: {
                          if (!(message.attributes && message.attributes.length))
                            message.attributes = [];
                          message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                          break;
                        }
                        case 5: {
                          message.droppedAttributesCount = reader.uint32();
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  Link.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  Link.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.traceId != null && message.hasOwnProperty("traceId")) {
                      if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                        return "traceId: buffer expected";
                    }
                    if (message.spanId != null && message.hasOwnProperty("spanId")) {
                      if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                        return "spanId: buffer expected";
                    }
                    if (message.traceState != null && message.hasOwnProperty("traceState")) {
                      if (!$util.isString(message.traceState))
                        return "traceState: string expected";
                    }
                    if (message.attributes != null && message.hasOwnProperty("attributes")) {
                      if (!Array.isArray(message.attributes))
                        return "attributes: array expected";
                      for (var i = 0; i < message.attributes.length; ++i) {
                        var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                        if (error)
                          return "attributes." + error;
                      }
                    }
                    if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                      if (!$util.isInteger(message.droppedAttributesCount))
                        return "droppedAttributesCount: integer expected";
                    }
                    return null;
                  };
                  Link.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.trace.v1.Span.Link)
                      return object;
                    var message = new $root.opentelemetry.proto.trace.v1.Span.Link();
                    if (object.traceId != null) {
                      if (typeof object.traceId === "string")
                        $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                      else if (object.traceId.length >= 0)
                        message.traceId = object.traceId;
                    }
                    if (object.spanId != null) {
                      if (typeof object.spanId === "string")
                        $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                      else if (object.spanId.length >= 0)
                        message.spanId = object.spanId;
                    }
                    if (object.traceState != null)
                      message.traceState = String(object.traceState);
                    if (object.attributes) {
                      if (!Array.isArray(object.attributes))
                        throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: array expected");
                      message.attributes = [];
                      for (var i = 0; i < object.attributes.length; ++i) {
                        if (typeof object.attributes[i] !== "object")
                          throw TypeError(".opentelemetry.proto.trace.v1.Span.Link.attributes: object expected");
                        message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                      }
                    }
                    if (object.droppedAttributesCount != null)
                      message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                    return message;
                  };
                  Link.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                      object.attributes = [];
                    if (options.defaults) {
                      if (options.bytes === String)
                        object.traceId = "";
                      else {
                        object.traceId = [];
                        if (options.bytes !== Array)
                          object.traceId = $util.newBuffer(object.traceId);
                      }
                      if (options.bytes === String)
                        object.spanId = "";
                      else {
                        object.spanId = [];
                        if (options.bytes !== Array)
                          object.spanId = $util.newBuffer(object.spanId);
                      }
                      object.traceState = "";
                      object.droppedAttributesCount = 0;
                    }
                    if (message.traceId != null && message.hasOwnProperty("traceId"))
                      object.traceId = options.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                    if (message.spanId != null && message.hasOwnProperty("spanId"))
                      object.spanId = options.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                    if (message.traceState != null && message.hasOwnProperty("traceState"))
                      object.traceState = message.traceState;
                    if (message.attributes && message.attributes.length) {
                      object.attributes = [];
                      for (var j = 0; j < message.attributes.length; ++j)
                        object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                    }
                    if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                      object.droppedAttributesCount = message.droppedAttributesCount;
                    return object;
                  };
                  Link.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  Link.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Span.Link";
                  };
                  return Link;
                }();
                return Span2;
              }();
              v1.Status = function() {
                function Status(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Status.prototype.message = null;
                Status.prototype.code = null;
                Status.create = function create(properties) {
                  return new Status(properties);
                };
                Status.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.message);
                  if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(
                      /* id 3, wireType 0 =*/
                      24
                    ).int32(message.code);
                  return writer;
                };
                Status.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Status.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.trace.v1.Status();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 2: {
                        message.message = reader.string();
                        break;
                      }
                      case 3: {
                        message.code = reader.int32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Status.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Status.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.message != null && message.hasOwnProperty("message")) {
                    if (!$util.isString(message.message))
                      return "message: string expected";
                  }
                  if (message.code != null && message.hasOwnProperty("code"))
                    switch (message.code) {
                      default:
                        return "code: enum value expected";
                      case 0:
                      case 1:
                      case 2:
                        break;
                    }
                  return null;
                };
                Status.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.trace.v1.Status)
                    return object;
                  var message = new $root.opentelemetry.proto.trace.v1.Status();
                  if (object.message != null)
                    message.message = String(object.message);
                  switch (object.code) {
                    default:
                      if (typeof object.code === "number") {
                        message.code = object.code;
                        break;
                      }
                      break;
                    case "STATUS_CODE_UNSET":
                    case 0:
                      message.code = 0;
                      break;
                    case "STATUS_CODE_OK":
                    case 1:
                      message.code = 1;
                      break;
                    case "STATUS_CODE_ERROR":
                    case 2:
                      message.code = 2;
                      break;
                  }
                  return message;
                };
                Status.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.defaults) {
                    object.message = "";
                    object.code = options.enums === String ? "STATUS_CODE_UNSET" : 0;
                  }
                  if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                  if (message.code != null && message.hasOwnProperty("code"))
                    object.code = options.enums === String ? $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] === void 0 ? message.code : $root.opentelemetry.proto.trace.v1.Status.StatusCode[message.code] : message.code;
                  return object;
                };
                Status.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Status.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.trace.v1.Status";
                };
                Status.StatusCode = function() {
                  var valuesById = {}, values = Object.create(valuesById);
                  values[valuesById[0] = "STATUS_CODE_UNSET"] = 0;
                  values[valuesById[1] = "STATUS_CODE_OK"] = 1;
                  values[valuesById[2] = "STATUS_CODE_ERROR"] = 2;
                  return values;
                }();
                return Status;
              }();
              return v1;
            }();
            return trace2;
          }();
          proto.collector = function() {
            var collector = {};
            collector.trace = function() {
              var trace2 = {};
              trace2.v1 = function() {
                var v1 = {};
                v1.TraceService = function() {
                  function TraceService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                  }
                  (TraceService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = TraceService;
                  TraceService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                  };
                  Object.defineProperty(TraceService.prototype["export"] = function export_(request, callback) {
                    return this.rpcCall(export_, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest, $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse, request, callback);
                  }, "name", { value: "Export" });
                  return TraceService;
                }();
                v1.ExportTraceServiceRequest = function() {
                  function ExportTraceServiceRequest(properties) {
                    this.resourceSpans = [];
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportTraceServiceRequest.prototype.resourceSpans = $util.emptyArray;
                  ExportTraceServiceRequest.create = function create(properties) {
                    return new ExportTraceServiceRequest(properties);
                  };
                  ExportTraceServiceRequest.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.resourceSpans != null && message.resourceSpans.length)
                      for (var i = 0; i < message.resourceSpans.length; ++i)
                        $root.opentelemetry.proto.trace.v1.ResourceSpans.encode(message.resourceSpans[i], writer.uint32(
                          /* id 1, wireType 2 =*/
                          10
                        ).fork()).ldelim();
                    return writer;
                  };
                  ExportTraceServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportTraceServiceRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          if (!(message.resourceSpans && message.resourceSpans.length))
                            message.resourceSpans = [];
                          message.resourceSpans.push($root.opentelemetry.proto.trace.v1.ResourceSpans.decode(reader, reader.uint32()));
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportTraceServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportTraceServiceRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.resourceSpans != null && message.hasOwnProperty("resourceSpans")) {
                      if (!Array.isArray(message.resourceSpans))
                        return "resourceSpans: array expected";
                      for (var i = 0; i < message.resourceSpans.length; ++i) {
                        var error = $root.opentelemetry.proto.trace.v1.ResourceSpans.verify(message.resourceSpans[i]);
                        if (error)
                          return "resourceSpans." + error;
                      }
                    }
                    return null;
                  };
                  ExportTraceServiceRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest();
                    if (object.resourceSpans) {
                      if (!Array.isArray(object.resourceSpans))
                        throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: array expected");
                      message.resourceSpans = [];
                      for (var i = 0; i < object.resourceSpans.length; ++i) {
                        if (typeof object.resourceSpans[i] !== "object")
                          throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest.resourceSpans: object expected");
                        message.resourceSpans[i] = $root.opentelemetry.proto.trace.v1.ResourceSpans.fromObject(object.resourceSpans[i]);
                      }
                    }
                    return message;
                  };
                  ExportTraceServiceRequest.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                      object.resourceSpans = [];
                    if (message.resourceSpans && message.resourceSpans.length) {
                      object.resourceSpans = [];
                      for (var j = 0; j < message.resourceSpans.length; ++j)
                        object.resourceSpans[j] = $root.opentelemetry.proto.trace.v1.ResourceSpans.toObject(message.resourceSpans[j], options);
                    }
                    return object;
                  };
                  ExportTraceServiceRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportTraceServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest";
                  };
                  return ExportTraceServiceRequest;
                }();
                v1.ExportTraceServiceResponse = function() {
                  function ExportTraceServiceResponse(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportTraceServiceResponse.prototype.partialSuccess = null;
                  ExportTraceServiceResponse.create = function create(properties) {
                    return new ExportTraceServiceResponse(properties);
                  };
                  ExportTraceServiceResponse.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                      $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.encode(message.partialSuccess, writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                    return writer;
                  };
                  ExportTraceServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportTraceServiceResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.decode(reader, reader.uint32());
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportTraceServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportTraceServiceResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                      var error = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.verify(message.partialSuccess);
                      if (error)
                        return "partialSuccess." + error;
                    }
                    return null;
                  };
                  ExportTraceServiceResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse();
                    if (object.partialSuccess != null) {
                      if (typeof object.partialSuccess !== "object")
                        throw TypeError(".opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse.partialSuccess: object expected");
                      message.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.fromObject(object.partialSuccess);
                    }
                    return message;
                  };
                  ExportTraceServiceResponse.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults)
                      object.partialSuccess = null;
                    if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                      object.partialSuccess = $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess.toObject(message.partialSuccess, options);
                    return object;
                  };
                  ExportTraceServiceResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportTraceServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTraceServiceResponse";
                  };
                  return ExportTraceServiceResponse;
                }();
                v1.ExportTracePartialSuccess = function() {
                  function ExportTracePartialSuccess(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportTracePartialSuccess.prototype.rejectedSpans = null;
                  ExportTracePartialSuccess.prototype.errorMessage = null;
                  ExportTracePartialSuccess.create = function create(properties) {
                    return new ExportTracePartialSuccess(properties);
                  };
                  ExportTracePartialSuccess.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.rejectedSpans != null && Object.hasOwnProperty.call(message, "rejectedSpans"))
                      writer.uint32(
                        /* id 1, wireType 0 =*/
                        8
                      ).int64(message.rejectedSpans);
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                      writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).string(message.errorMessage);
                    return writer;
                  };
                  ExportTracePartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportTracePartialSuccess.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.rejectedSpans = reader.int64();
                          break;
                        }
                        case 2: {
                          message.errorMessage = reader.string();
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportTracePartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportTracePartialSuccess.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans")) {
                      if (!$util.isInteger(message.rejectedSpans) && !(message.rejectedSpans && $util.isInteger(message.rejectedSpans.low) && $util.isInteger(message.rejectedSpans.high)))
                        return "rejectedSpans: integer|Long expected";
                    }
                    if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                      if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                    }
                    return null;
                  };
                  ExportTracePartialSuccess.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess();
                    if (object.rejectedSpans != null) {
                      if ($util.Long)
                        (message.rejectedSpans = $util.Long.fromValue(object.rejectedSpans)).unsigned = false;
                      else if (typeof object.rejectedSpans === "string")
                        message.rejectedSpans = parseInt(object.rejectedSpans, 10);
                      else if (typeof object.rejectedSpans === "number")
                        message.rejectedSpans = object.rejectedSpans;
                      else if (typeof object.rejectedSpans === "object")
                        message.rejectedSpans = new $util.LongBits(object.rejectedSpans.low >>> 0, object.rejectedSpans.high >>> 0).toNumber();
                    }
                    if (object.errorMessage != null)
                      message.errorMessage = String(object.errorMessage);
                    return message;
                  };
                  ExportTracePartialSuccess.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults) {
                      if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.rejectedSpans = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                      } else
                        object.rejectedSpans = options.longs === String ? "0" : 0;
                      object.errorMessage = "";
                    }
                    if (message.rejectedSpans != null && message.hasOwnProperty("rejectedSpans"))
                      if (typeof message.rejectedSpans === "number")
                        object.rejectedSpans = options.longs === String ? String(message.rejectedSpans) : message.rejectedSpans;
                      else
                        object.rejectedSpans = options.longs === String ? $util.Long.prototype.toString.call(message.rejectedSpans) : options.longs === Number ? new $util.LongBits(message.rejectedSpans.low >>> 0, message.rejectedSpans.high >>> 0).toNumber() : message.rejectedSpans;
                    if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                      object.errorMessage = message.errorMessage;
                    return object;
                  };
                  ExportTracePartialSuccess.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportTracePartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.trace.v1.ExportTracePartialSuccess";
                  };
                  return ExportTracePartialSuccess;
                }();
                return v1;
              }();
              return trace2;
            }();
            collector.metrics = function() {
              var metrics2 = {};
              metrics2.v1 = function() {
                var v1 = {};
                v1.MetricsService = function() {
                  function MetricsService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                  }
                  (MetricsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = MetricsService;
                  MetricsService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                  };
                  Object.defineProperty(MetricsService.prototype["export"] = function export_(request, callback) {
                    return this.rpcCall(export_, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest, $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse, request, callback);
                  }, "name", { value: "Export" });
                  return MetricsService;
                }();
                v1.ExportMetricsServiceRequest = function() {
                  function ExportMetricsServiceRequest(properties) {
                    this.resourceMetrics = [];
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportMetricsServiceRequest.prototype.resourceMetrics = $util.emptyArray;
                  ExportMetricsServiceRequest.create = function create(properties) {
                    return new ExportMetricsServiceRequest(properties);
                  };
                  ExportMetricsServiceRequest.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.resourceMetrics != null && message.resourceMetrics.length)
                      for (var i = 0; i < message.resourceMetrics.length; ++i)
                        $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                          /* id 1, wireType 2 =*/
                          10
                        ).fork()).ldelim();
                    return writer;
                  };
                  ExportMetricsServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportMetricsServiceRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          if (!(message.resourceMetrics && message.resourceMetrics.length))
                            message.resourceMetrics = [];
                          message.resourceMetrics.push($root.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(reader, reader.uint32()));
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportMetricsServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportMetricsServiceRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.resourceMetrics != null && message.hasOwnProperty("resourceMetrics")) {
                      if (!Array.isArray(message.resourceMetrics))
                        return "resourceMetrics: array expected";
                      for (var i = 0; i < message.resourceMetrics.length; ++i) {
                        var error = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(message.resourceMetrics[i]);
                        if (error)
                          return "resourceMetrics." + error;
                      }
                    }
                    return null;
                  };
                  ExportMetricsServiceRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest();
                    if (object.resourceMetrics) {
                      if (!Array.isArray(object.resourceMetrics))
                        throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: array expected");
                      message.resourceMetrics = [];
                      for (var i = 0; i < object.resourceMetrics.length; ++i) {
                        if (typeof object.resourceMetrics[i] !== "object")
                          throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest.resourceMetrics: object expected");
                        message.resourceMetrics[i] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(object.resourceMetrics[i]);
                      }
                    }
                    return message;
                  };
                  ExportMetricsServiceRequest.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                      object.resourceMetrics = [];
                    if (message.resourceMetrics && message.resourceMetrics.length) {
                      object.resourceMetrics = [];
                      for (var j = 0; j < message.resourceMetrics.length; ++j)
                        object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options);
                    }
                    return object;
                  };
                  ExportMetricsServiceRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportMetricsServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest";
                  };
                  return ExportMetricsServiceRequest;
                }();
                v1.ExportMetricsServiceResponse = function() {
                  function ExportMetricsServiceResponse(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportMetricsServiceResponse.prototype.partialSuccess = null;
                  ExportMetricsServiceResponse.create = function create(properties) {
                    return new ExportMetricsServiceResponse(properties);
                  };
                  ExportMetricsServiceResponse.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                      $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                    return writer;
                  };
                  ExportMetricsServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportMetricsServiceResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.decode(reader, reader.uint32());
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportMetricsServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportMetricsServiceResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                      var error = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.verify(message.partialSuccess);
                      if (error)
                        return "partialSuccess." + error;
                    }
                    return null;
                  };
                  ExportMetricsServiceResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse();
                    if (object.partialSuccess != null) {
                      if (typeof object.partialSuccess !== "object")
                        throw TypeError(".opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse.partialSuccess: object expected");
                      message.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.fromObject(object.partialSuccess);
                    }
                    return message;
                  };
                  ExportMetricsServiceResponse.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults)
                      object.partialSuccess = null;
                    if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                      object.partialSuccess = $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess.toObject(message.partialSuccess, options);
                    return object;
                  };
                  ExportMetricsServiceResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportMetricsServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceResponse";
                  };
                  return ExportMetricsServiceResponse;
                }();
                v1.ExportMetricsPartialSuccess = function() {
                  function ExportMetricsPartialSuccess(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportMetricsPartialSuccess.prototype.rejectedDataPoints = null;
                  ExportMetricsPartialSuccess.prototype.errorMessage = null;
                  ExportMetricsPartialSuccess.create = function create(properties) {
                    return new ExportMetricsPartialSuccess(properties);
                  };
                  ExportMetricsPartialSuccess.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.rejectedDataPoints != null && Object.hasOwnProperty.call(message, "rejectedDataPoints"))
                      writer.uint32(
                        /* id 1, wireType 0 =*/
                        8
                      ).int64(message.rejectedDataPoints);
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                      writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).string(message.errorMessage);
                    return writer;
                  };
                  ExportMetricsPartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportMetricsPartialSuccess.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.rejectedDataPoints = reader.int64();
                          break;
                        }
                        case 2: {
                          message.errorMessage = reader.string();
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportMetricsPartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportMetricsPartialSuccess.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints")) {
                      if (!$util.isInteger(message.rejectedDataPoints) && !(message.rejectedDataPoints && $util.isInteger(message.rejectedDataPoints.low) && $util.isInteger(message.rejectedDataPoints.high)))
                        return "rejectedDataPoints: integer|Long expected";
                    }
                    if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                      if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                    }
                    return null;
                  };
                  ExportMetricsPartialSuccess.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess();
                    if (object.rejectedDataPoints != null) {
                      if ($util.Long)
                        (message.rejectedDataPoints = $util.Long.fromValue(object.rejectedDataPoints)).unsigned = false;
                      else if (typeof object.rejectedDataPoints === "string")
                        message.rejectedDataPoints = parseInt(object.rejectedDataPoints, 10);
                      else if (typeof object.rejectedDataPoints === "number")
                        message.rejectedDataPoints = object.rejectedDataPoints;
                      else if (typeof object.rejectedDataPoints === "object")
                        message.rejectedDataPoints = new $util.LongBits(object.rejectedDataPoints.low >>> 0, object.rejectedDataPoints.high >>> 0).toNumber();
                    }
                    if (object.errorMessage != null)
                      message.errorMessage = String(object.errorMessage);
                    return message;
                  };
                  ExportMetricsPartialSuccess.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults) {
                      if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.rejectedDataPoints = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                      } else
                        object.rejectedDataPoints = options.longs === String ? "0" : 0;
                      object.errorMessage = "";
                    }
                    if (message.rejectedDataPoints != null && message.hasOwnProperty("rejectedDataPoints"))
                      if (typeof message.rejectedDataPoints === "number")
                        object.rejectedDataPoints = options.longs === String ? String(message.rejectedDataPoints) : message.rejectedDataPoints;
                      else
                        object.rejectedDataPoints = options.longs === String ? $util.Long.prototype.toString.call(message.rejectedDataPoints) : options.longs === Number ? new $util.LongBits(message.rejectedDataPoints.low >>> 0, message.rejectedDataPoints.high >>> 0).toNumber() : message.rejectedDataPoints;
                    if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                      object.errorMessage = message.errorMessage;
                    return object;
                  };
                  ExportMetricsPartialSuccess.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportMetricsPartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.metrics.v1.ExportMetricsPartialSuccess";
                  };
                  return ExportMetricsPartialSuccess;
                }();
                return v1;
              }();
              return metrics2;
            }();
            collector.logs = function() {
              var logs2 = {};
              logs2.v1 = function() {
                var v1 = {};
                v1.LogsService = function() {
                  function LogsService(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                  }
                  (LogsService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = LogsService;
                  LogsService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                  };
                  Object.defineProperty(LogsService.prototype["export"] = function export_(request, callback) {
                    return this.rpcCall(export_, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest, $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse, request, callback);
                  }, "name", { value: "Export" });
                  return LogsService;
                }();
                v1.ExportLogsServiceRequest = function() {
                  function ExportLogsServiceRequest(properties) {
                    this.resourceLogs = [];
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportLogsServiceRequest.prototype.resourceLogs = $util.emptyArray;
                  ExportLogsServiceRequest.create = function create(properties) {
                    return new ExportLogsServiceRequest(properties);
                  };
                  ExportLogsServiceRequest.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.resourceLogs != null && message.resourceLogs.length)
                      for (var i = 0; i < message.resourceLogs.length; ++i)
                        $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                          /* id 1, wireType 2 =*/
                          10
                        ).fork()).ldelim();
                    return writer;
                  };
                  ExportLogsServiceRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportLogsServiceRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          if (!(message.resourceLogs && message.resourceLogs.length))
                            message.resourceLogs = [];
                          message.resourceLogs.push($root.opentelemetry.proto.logs.v1.ResourceLogs.decode(reader, reader.uint32()));
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportLogsServiceRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportLogsServiceRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.resourceLogs != null && message.hasOwnProperty("resourceLogs")) {
                      if (!Array.isArray(message.resourceLogs))
                        return "resourceLogs: array expected";
                      for (var i = 0; i < message.resourceLogs.length; ++i) {
                        var error = $root.opentelemetry.proto.logs.v1.ResourceLogs.verify(message.resourceLogs[i]);
                        if (error)
                          return "resourceLogs." + error;
                      }
                    }
                    return null;
                  };
                  ExportLogsServiceRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest();
                    if (object.resourceLogs) {
                      if (!Array.isArray(object.resourceLogs))
                        throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: array expected");
                      message.resourceLogs = [];
                      for (var i = 0; i < object.resourceLogs.length; ++i) {
                        if (typeof object.resourceLogs[i] !== "object")
                          throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest.resourceLogs: object expected");
                        message.resourceLogs[i] = $root.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(object.resourceLogs[i]);
                      }
                    }
                    return message;
                  };
                  ExportLogsServiceRequest.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                      object.resourceLogs = [];
                    if (message.resourceLogs && message.resourceLogs.length) {
                      object.resourceLogs = [];
                      for (var j = 0; j < message.resourceLogs.length; ++j)
                        object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options);
                    }
                    return object;
                  };
                  ExportLogsServiceRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportLogsServiceRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest";
                  };
                  return ExportLogsServiceRequest;
                }();
                v1.ExportLogsServiceResponse = function() {
                  function ExportLogsServiceResponse(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportLogsServiceResponse.prototype.partialSuccess = null;
                  ExportLogsServiceResponse.create = function create(properties) {
                    return new ExportLogsServiceResponse(properties);
                  };
                  ExportLogsServiceResponse.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.partialSuccess != null && Object.hasOwnProperty.call(message, "partialSuccess"))
                      $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.encode(message.partialSuccess, writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                    return writer;
                  };
                  ExportLogsServiceResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportLogsServiceResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.decode(reader, reader.uint32());
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportLogsServiceResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportLogsServiceResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess")) {
                      var error = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.verify(message.partialSuccess);
                      if (error)
                        return "partialSuccess." + error;
                    }
                    return null;
                  };
                  ExportLogsServiceResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse();
                    if (object.partialSuccess != null) {
                      if (typeof object.partialSuccess !== "object")
                        throw TypeError(".opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse.partialSuccess: object expected");
                      message.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.fromObject(object.partialSuccess);
                    }
                    return message;
                  };
                  ExportLogsServiceResponse.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults)
                      object.partialSuccess = null;
                    if (message.partialSuccess != null && message.hasOwnProperty("partialSuccess"))
                      object.partialSuccess = $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess.toObject(message.partialSuccess, options);
                    return object;
                  };
                  ExportLogsServiceResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportLogsServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsServiceResponse";
                  };
                  return ExportLogsServiceResponse;
                }();
                v1.ExportLogsPartialSuccess = function() {
                  function ExportLogsPartialSuccess(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ExportLogsPartialSuccess.prototype.rejectedLogRecords = null;
                  ExportLogsPartialSuccess.prototype.errorMessage = null;
                  ExportLogsPartialSuccess.create = function create(properties) {
                    return new ExportLogsPartialSuccess(properties);
                  };
                  ExportLogsPartialSuccess.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.rejectedLogRecords != null && Object.hasOwnProperty.call(message, "rejectedLogRecords"))
                      writer.uint32(
                        /* id 1, wireType 0 =*/
                        8
                      ).int64(message.rejectedLogRecords);
                    if (message.errorMessage != null && Object.hasOwnProperty.call(message, "errorMessage"))
                      writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).string(message.errorMessage);
                    return writer;
                  };
                  ExportLogsPartialSuccess.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ExportLogsPartialSuccess.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.rejectedLogRecords = reader.int64();
                          break;
                        }
                        case 2: {
                          message.errorMessage = reader.string();
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ExportLogsPartialSuccess.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ExportLogsPartialSuccess.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords")) {
                      if (!$util.isInteger(message.rejectedLogRecords) && !(message.rejectedLogRecords && $util.isInteger(message.rejectedLogRecords.low) && $util.isInteger(message.rejectedLogRecords.high)))
                        return "rejectedLogRecords: integer|Long expected";
                    }
                    if (message.errorMessage != null && message.hasOwnProperty("errorMessage")) {
                      if (!$util.isString(message.errorMessage))
                        return "errorMessage: string expected";
                    }
                    return null;
                  };
                  ExportLogsPartialSuccess.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess)
                      return object;
                    var message = new $root.opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess();
                    if (object.rejectedLogRecords != null) {
                      if ($util.Long)
                        (message.rejectedLogRecords = $util.Long.fromValue(object.rejectedLogRecords)).unsigned = false;
                      else if (typeof object.rejectedLogRecords === "string")
                        message.rejectedLogRecords = parseInt(object.rejectedLogRecords, 10);
                      else if (typeof object.rejectedLogRecords === "number")
                        message.rejectedLogRecords = object.rejectedLogRecords;
                      else if (typeof object.rejectedLogRecords === "object")
                        message.rejectedLogRecords = new $util.LongBits(object.rejectedLogRecords.low >>> 0, object.rejectedLogRecords.high >>> 0).toNumber();
                    }
                    if (object.errorMessage != null)
                      message.errorMessage = String(object.errorMessage);
                    return message;
                  };
                  ExportLogsPartialSuccess.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults) {
                      if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.rejectedLogRecords = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                      } else
                        object.rejectedLogRecords = options.longs === String ? "0" : 0;
                      object.errorMessage = "";
                    }
                    if (message.rejectedLogRecords != null && message.hasOwnProperty("rejectedLogRecords"))
                      if (typeof message.rejectedLogRecords === "number")
                        object.rejectedLogRecords = options.longs === String ? String(message.rejectedLogRecords) : message.rejectedLogRecords;
                      else
                        object.rejectedLogRecords = options.longs === String ? $util.Long.prototype.toString.call(message.rejectedLogRecords) : options.longs === Number ? new $util.LongBits(message.rejectedLogRecords.low >>> 0, message.rejectedLogRecords.high >>> 0).toNumber() : message.rejectedLogRecords;
                    if (message.errorMessage != null && message.hasOwnProperty("errorMessage"))
                      object.errorMessage = message.errorMessage;
                    return object;
                  };
                  ExportLogsPartialSuccess.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ExportLogsPartialSuccess.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.collector.logs.v1.ExportLogsPartialSuccess";
                  };
                  return ExportLogsPartialSuccess;
                }();
                return v1;
              }();
              return logs2;
            }();
            return collector;
          }();
          proto.metrics = function() {
            var metrics2 = {};
            metrics2.v1 = function() {
              var v1 = {};
              v1.MetricsData = function() {
                function MetricsData(properties) {
                  this.resourceMetrics = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                MetricsData.prototype.resourceMetrics = $util.emptyArray;
                MetricsData.create = function create(properties) {
                  return new MetricsData(properties);
                };
                MetricsData.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceMetrics != null && message.resourceMetrics.length)
                    for (var i = 0; i < message.resourceMetrics.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.ResourceMetrics.encode(message.resourceMetrics[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                MetricsData.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                MetricsData.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.MetricsData();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceMetrics && message.resourceMetrics.length))
                          message.resourceMetrics = [];
                        message.resourceMetrics.push($root.opentelemetry.proto.metrics.v1.ResourceMetrics.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                MetricsData.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                MetricsData.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceMetrics != null && message.hasOwnProperty("resourceMetrics")) {
                    if (!Array.isArray(message.resourceMetrics))
                      return "resourceMetrics: array expected";
                    for (var i = 0; i < message.resourceMetrics.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.verify(message.resourceMetrics[i]);
                      if (error)
                        return "resourceMetrics." + error;
                    }
                  }
                  return null;
                };
                MetricsData.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.MetricsData)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.MetricsData();
                  if (object.resourceMetrics) {
                    if (!Array.isArray(object.resourceMetrics))
                      throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: array expected");
                    message.resourceMetrics = [];
                    for (var i = 0; i < object.resourceMetrics.length; ++i) {
                      if (typeof object.resourceMetrics[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.MetricsData.resourceMetrics: object expected");
                      message.resourceMetrics[i] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.fromObject(object.resourceMetrics[i]);
                    }
                  }
                  return message;
                };
                MetricsData.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.resourceMetrics = [];
                  if (message.resourceMetrics && message.resourceMetrics.length) {
                    object.resourceMetrics = [];
                    for (var j = 0; j < message.resourceMetrics.length; ++j)
                      object.resourceMetrics[j] = $root.opentelemetry.proto.metrics.v1.ResourceMetrics.toObject(message.resourceMetrics[j], options);
                  }
                  return object;
                };
                MetricsData.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                MetricsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.MetricsData";
                };
                return MetricsData;
              }();
              v1.ResourceMetrics = function() {
                function ResourceMetrics(properties) {
                  this.scopeMetrics = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ResourceMetrics.prototype.resource = null;
                ResourceMetrics.prototype.scopeMetrics = $util.emptyArray;
                ResourceMetrics.prototype.schemaUrl = null;
                ResourceMetrics.create = function create(properties) {
                  return new ResourceMetrics(properties);
                };
                ResourceMetrics.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                    $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  if (message.scopeMetrics != null && message.scopeMetrics.length)
                    for (var i = 0; i < message.scopeMetrics.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.ScopeMetrics.encode(message.scopeMetrics[i], writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork()).ldelim();
                  if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.schemaUrl);
                  return writer;
                };
                ResourceMetrics.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ResourceMetrics.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ResourceMetrics();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                        break;
                      }
                      case 2: {
                        if (!(message.scopeMetrics && message.scopeMetrics.length))
                          message.scopeMetrics = [];
                        message.scopeMetrics.push($root.opentelemetry.proto.metrics.v1.ScopeMetrics.decode(reader, reader.uint32()));
                        break;
                      }
                      case 3: {
                        message.schemaUrl = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ResourceMetrics.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ResourceMetrics.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resource != null && message.hasOwnProperty("resource")) {
                    var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                    if (error)
                      return "resource." + error;
                  }
                  if (message.scopeMetrics != null && message.hasOwnProperty("scopeMetrics")) {
                    if (!Array.isArray(message.scopeMetrics))
                      return "scopeMetrics: array expected";
                    for (var i = 0; i < message.scopeMetrics.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.verify(message.scopeMetrics[i]);
                      if (error)
                        return "scopeMetrics." + error;
                    }
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                    if (!$util.isString(message.schemaUrl))
                      return "schemaUrl: string expected";
                  }
                  return null;
                };
                ResourceMetrics.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.ResourceMetrics)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.ResourceMetrics();
                  if (object.resource != null) {
                    if (typeof object.resource !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.resource: object expected");
                    message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                  }
                  if (object.scopeMetrics) {
                    if (!Array.isArray(object.scopeMetrics))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: array expected");
                    message.scopeMetrics = [];
                    for (var i = 0; i < object.scopeMetrics.length; ++i) {
                      if (typeof object.scopeMetrics[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.ResourceMetrics.scopeMetrics: object expected");
                      message.scopeMetrics[i] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.fromObject(object.scopeMetrics[i]);
                    }
                  }
                  if (object.schemaUrl != null)
                    message.schemaUrl = String(object.schemaUrl);
                  return message;
                };
                ResourceMetrics.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.scopeMetrics = [];
                  if (options.defaults) {
                    object.resource = null;
                    object.schemaUrl = "";
                  }
                  if (message.resource != null && message.hasOwnProperty("resource"))
                    object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options);
                  if (message.scopeMetrics && message.scopeMetrics.length) {
                    object.scopeMetrics = [];
                    for (var j = 0; j < message.scopeMetrics.length; ++j)
                      object.scopeMetrics[j] = $root.opentelemetry.proto.metrics.v1.ScopeMetrics.toObject(message.scopeMetrics[j], options);
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                    object.schemaUrl = message.schemaUrl;
                  return object;
                };
                ResourceMetrics.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ResourceMetrics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ResourceMetrics";
                };
                return ResourceMetrics;
              }();
              v1.ScopeMetrics = function() {
                function ScopeMetrics(properties) {
                  this.metrics = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ScopeMetrics.prototype.scope = null;
                ScopeMetrics.prototype.metrics = $util.emptyArray;
                ScopeMetrics.prototype.schemaUrl = null;
                ScopeMetrics.create = function create(properties) {
                  return new ScopeMetrics(properties);
                };
                ScopeMetrics.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                    $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  if (message.metrics != null && message.metrics.length)
                    for (var i = 0; i < message.metrics.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.Metric.encode(message.metrics[i], writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork()).ldelim();
                  if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.schemaUrl);
                  return writer;
                };
                ScopeMetrics.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ScopeMetrics.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ScopeMetrics();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                        break;
                      }
                      case 2: {
                        if (!(message.metrics && message.metrics.length))
                          message.metrics = [];
                        message.metrics.push($root.opentelemetry.proto.metrics.v1.Metric.decode(reader, reader.uint32()));
                        break;
                      }
                      case 3: {
                        message.schemaUrl = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ScopeMetrics.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ScopeMetrics.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.scope != null && message.hasOwnProperty("scope")) {
                    var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                    if (error)
                      return "scope." + error;
                  }
                  if (message.metrics != null && message.hasOwnProperty("metrics")) {
                    if (!Array.isArray(message.metrics))
                      return "metrics: array expected";
                    for (var i = 0; i < message.metrics.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.Metric.verify(message.metrics[i]);
                      if (error)
                        return "metrics." + error;
                    }
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                    if (!$util.isString(message.schemaUrl))
                      return "schemaUrl: string expected";
                  }
                  return null;
                };
                ScopeMetrics.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.ScopeMetrics)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.ScopeMetrics();
                  if (object.scope != null) {
                    if (typeof object.scope !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.scope: object expected");
                    message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                  }
                  if (object.metrics) {
                    if (!Array.isArray(object.metrics))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: array expected");
                    message.metrics = [];
                    for (var i = 0; i < object.metrics.length; ++i) {
                      if (typeof object.metrics[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.ScopeMetrics.metrics: object expected");
                      message.metrics[i] = $root.opentelemetry.proto.metrics.v1.Metric.fromObject(object.metrics[i]);
                    }
                  }
                  if (object.schemaUrl != null)
                    message.schemaUrl = String(object.schemaUrl);
                  return message;
                };
                ScopeMetrics.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.metrics = [];
                  if (options.defaults) {
                    object.scope = null;
                    object.schemaUrl = "";
                  }
                  if (message.scope != null && message.hasOwnProperty("scope"))
                    object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options);
                  if (message.metrics && message.metrics.length) {
                    object.metrics = [];
                    for (var j = 0; j < message.metrics.length; ++j)
                      object.metrics[j] = $root.opentelemetry.proto.metrics.v1.Metric.toObject(message.metrics[j], options);
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                    object.schemaUrl = message.schemaUrl;
                  return object;
                };
                ScopeMetrics.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ScopeMetrics.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ScopeMetrics";
                };
                return ScopeMetrics;
              }();
              v1.Metric = function() {
                function Metric(properties) {
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Metric.prototype.name = null;
                Metric.prototype.description = null;
                Metric.prototype.unit = null;
                Metric.prototype.gauge = null;
                Metric.prototype.sum = null;
                Metric.prototype.histogram = null;
                Metric.prototype.exponentialHistogram = null;
                Metric.prototype.summary = null;
                var $oneOfFields;
                Object.defineProperty(Metric.prototype, "data", {
                  get: $util.oneOfGetter($oneOfFields = ["gauge", "sum", "histogram", "exponentialHistogram", "summary"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                Metric.create = function create(properties) {
                  return new Metric(properties);
                };
                Metric.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).string(message.name);
                  if (message.description != null && Object.hasOwnProperty.call(message, "description"))
                    writer.uint32(
                      /* id 2, wireType 2 =*/
                      18
                    ).string(message.description);
                  if (message.unit != null && Object.hasOwnProperty.call(message, "unit"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.unit);
                  if (message.gauge != null && Object.hasOwnProperty.call(message, "gauge"))
                    $root.opentelemetry.proto.metrics.v1.Gauge.encode(message.gauge, writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).fork()).ldelim();
                  if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                    $root.opentelemetry.proto.metrics.v1.Sum.encode(message.sum, writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork()).ldelim();
                  if (message.histogram != null && Object.hasOwnProperty.call(message, "histogram"))
                    $root.opentelemetry.proto.metrics.v1.Histogram.encode(message.histogram, writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).fork()).ldelim();
                  if (message.exponentialHistogram != null && Object.hasOwnProperty.call(message, "exponentialHistogram"))
                    $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.encode(message.exponentialHistogram, writer.uint32(
                      /* id 10, wireType 2 =*/
                      82
                    ).fork()).ldelim();
                  if (message.summary != null && Object.hasOwnProperty.call(message, "summary"))
                    $root.opentelemetry.proto.metrics.v1.Summary.encode(message.summary, writer.uint32(
                      /* id 11, wireType 2 =*/
                      90
                    ).fork()).ldelim();
                  return writer;
                };
                Metric.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Metric.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Metric();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.name = reader.string();
                        break;
                      }
                      case 2: {
                        message.description = reader.string();
                        break;
                      }
                      case 3: {
                        message.unit = reader.string();
                        break;
                      }
                      case 5: {
                        message.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.decode(reader, reader.uint32());
                        break;
                      }
                      case 7: {
                        message.sum = $root.opentelemetry.proto.metrics.v1.Sum.decode(reader, reader.uint32());
                        break;
                      }
                      case 9: {
                        message.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.decode(reader, reader.uint32());
                        break;
                      }
                      case 10: {
                        message.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.decode(reader, reader.uint32());
                        break;
                      }
                      case 11: {
                        message.summary = $root.opentelemetry.proto.metrics.v1.Summary.decode(reader, reader.uint32());
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Metric.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Metric.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  var properties = {};
                  if (message.name != null && message.hasOwnProperty("name")) {
                    if (!$util.isString(message.name))
                      return "name: string expected";
                  }
                  if (message.description != null && message.hasOwnProperty("description")) {
                    if (!$util.isString(message.description))
                      return "description: string expected";
                  }
                  if (message.unit != null && message.hasOwnProperty("unit")) {
                    if (!$util.isString(message.unit))
                      return "unit: string expected";
                  }
                  if (message.gauge != null && message.hasOwnProperty("gauge")) {
                    properties.data = 1;
                    {
                      var error = $root.opentelemetry.proto.metrics.v1.Gauge.verify(message.gauge);
                      if (error)
                        return "gauge." + error;
                    }
                  }
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    if (properties.data === 1)
                      return "data: multiple values";
                    properties.data = 1;
                    {
                      var error = $root.opentelemetry.proto.metrics.v1.Sum.verify(message.sum);
                      if (error)
                        return "sum." + error;
                    }
                  }
                  if (message.histogram != null && message.hasOwnProperty("histogram")) {
                    if (properties.data === 1)
                      return "data: multiple values";
                    properties.data = 1;
                    {
                      var error = $root.opentelemetry.proto.metrics.v1.Histogram.verify(message.histogram);
                      if (error)
                        return "histogram." + error;
                    }
                  }
                  if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                    if (properties.data === 1)
                      return "data: multiple values";
                    properties.data = 1;
                    {
                      var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.verify(message.exponentialHistogram);
                      if (error)
                        return "exponentialHistogram." + error;
                    }
                  }
                  if (message.summary != null && message.hasOwnProperty("summary")) {
                    if (properties.data === 1)
                      return "data: multiple values";
                    properties.data = 1;
                    {
                      var error = $root.opentelemetry.proto.metrics.v1.Summary.verify(message.summary);
                      if (error)
                        return "summary." + error;
                    }
                  }
                  return null;
                };
                Metric.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.Metric)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.Metric();
                  if (object.name != null)
                    message.name = String(object.name);
                  if (object.description != null)
                    message.description = String(object.description);
                  if (object.unit != null)
                    message.unit = String(object.unit);
                  if (object.gauge != null) {
                    if (typeof object.gauge !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Metric.gauge: object expected");
                    message.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.fromObject(object.gauge);
                  }
                  if (object.sum != null) {
                    if (typeof object.sum !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Metric.sum: object expected");
                    message.sum = $root.opentelemetry.proto.metrics.v1.Sum.fromObject(object.sum);
                  }
                  if (object.histogram != null) {
                    if (typeof object.histogram !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Metric.histogram: object expected");
                    message.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.fromObject(object.histogram);
                  }
                  if (object.exponentialHistogram != null) {
                    if (typeof object.exponentialHistogram !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Metric.exponentialHistogram: object expected");
                    message.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.fromObject(object.exponentialHistogram);
                  }
                  if (object.summary != null) {
                    if (typeof object.summary !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.Metric.summary: object expected");
                    message.summary = $root.opentelemetry.proto.metrics.v1.Summary.fromObject(object.summary);
                  }
                  return message;
                };
                Metric.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.defaults) {
                    object.name = "";
                    object.description = "";
                    object.unit = "";
                  }
                  if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                  if (message.description != null && message.hasOwnProperty("description"))
                    object.description = message.description;
                  if (message.unit != null && message.hasOwnProperty("unit"))
                    object.unit = message.unit;
                  if (message.gauge != null && message.hasOwnProperty("gauge")) {
                    object.gauge = $root.opentelemetry.proto.metrics.v1.Gauge.toObject(message.gauge, options);
                    if (options.oneofs)
                      object.data = "gauge";
                  }
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    object.sum = $root.opentelemetry.proto.metrics.v1.Sum.toObject(message.sum, options);
                    if (options.oneofs)
                      object.data = "sum";
                  }
                  if (message.histogram != null && message.hasOwnProperty("histogram")) {
                    object.histogram = $root.opentelemetry.proto.metrics.v1.Histogram.toObject(message.histogram, options);
                    if (options.oneofs)
                      object.data = "histogram";
                  }
                  if (message.exponentialHistogram != null && message.hasOwnProperty("exponentialHistogram")) {
                    object.exponentialHistogram = $root.opentelemetry.proto.metrics.v1.ExponentialHistogram.toObject(message.exponentialHistogram, options);
                    if (options.oneofs)
                      object.data = "exponentialHistogram";
                  }
                  if (message.summary != null && message.hasOwnProperty("summary")) {
                    object.summary = $root.opentelemetry.proto.metrics.v1.Summary.toObject(message.summary, options);
                    if (options.oneofs)
                      object.data = "summary";
                  }
                  return object;
                };
                Metric.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Metric.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Metric";
                };
                return Metric;
              }();
              v1.Gauge = function() {
                function Gauge(properties) {
                  this.dataPoints = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Gauge.prototype.dataPoints = $util.emptyArray;
                Gauge.create = function create(properties) {
                  return new Gauge(properties);
                };
                Gauge.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.dataPoints != null && message.dataPoints.length)
                    for (var i = 0; i < message.dataPoints.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                Gauge.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Gauge.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Gauge();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.dataPoints && message.dataPoints.length))
                          message.dataPoints = [];
                        message.dataPoints.push($root.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Gauge.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Gauge.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                    if (!Array.isArray(message.dataPoints))
                      return "dataPoints: array expected";
                    for (var i = 0; i < message.dataPoints.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(message.dataPoints[i]);
                      if (error)
                        return "dataPoints." + error;
                    }
                  }
                  return null;
                };
                Gauge.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.Gauge)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.Gauge();
                  if (object.dataPoints) {
                    if (!Array.isArray(object.dataPoints))
                      throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: array expected");
                    message.dataPoints = [];
                    for (var i = 0; i < object.dataPoints.length; ++i) {
                      if (typeof object.dataPoints[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.Gauge.dataPoints: object expected");
                      message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(object.dataPoints[i]);
                    }
                  }
                  return message;
                };
                Gauge.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.dataPoints = [];
                  if (message.dataPoints && message.dataPoints.length) {
                    object.dataPoints = [];
                    for (var j = 0; j < message.dataPoints.length; ++j)
                      object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options);
                  }
                  return object;
                };
                Gauge.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Gauge.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Gauge";
                };
                return Gauge;
              }();
              v1.Sum = function() {
                function Sum(properties) {
                  this.dataPoints = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Sum.prototype.dataPoints = $util.emptyArray;
                Sum.prototype.aggregationTemporality = null;
                Sum.prototype.isMonotonic = null;
                Sum.create = function create(properties) {
                  return new Sum(properties);
                };
                Sum.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.dataPoints != null && message.dataPoints.length)
                    for (var i = 0; i < message.dataPoints.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.NumberDataPoint.encode(message.dataPoints[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                    writer.uint32(
                      /* id 2, wireType 0 =*/
                      16
                    ).int32(message.aggregationTemporality);
                  if (message.isMonotonic != null && Object.hasOwnProperty.call(message, "isMonotonic"))
                    writer.uint32(
                      /* id 3, wireType 0 =*/
                      24
                    ).bool(message.isMonotonic);
                  return writer;
                };
                Sum.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Sum.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Sum();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.dataPoints && message.dataPoints.length))
                          message.dataPoints = [];
                        message.dataPoints.push($root.opentelemetry.proto.metrics.v1.NumberDataPoint.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.aggregationTemporality = reader.int32();
                        break;
                      }
                      case 3: {
                        message.isMonotonic = reader.bool();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Sum.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Sum.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                    if (!Array.isArray(message.dataPoints))
                      return "dataPoints: array expected";
                    for (var i = 0; i < message.dataPoints.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.verify(message.dataPoints[i]);
                      if (error)
                        return "dataPoints." + error;
                    }
                  }
                  if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                    switch (message.aggregationTemporality) {
                      default:
                        return "aggregationTemporality: enum value expected";
                      case 0:
                      case 1:
                      case 2:
                        break;
                    }
                  if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic")) {
                    if (typeof message.isMonotonic !== "boolean")
                      return "isMonotonic: boolean expected";
                  }
                  return null;
                };
                Sum.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.Sum)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.Sum();
                  if (object.dataPoints) {
                    if (!Array.isArray(object.dataPoints))
                      throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: array expected");
                    message.dataPoints = [];
                    for (var i = 0; i < object.dataPoints.length; ++i) {
                      if (typeof object.dataPoints[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.Sum.dataPoints: object expected");
                      message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.fromObject(object.dataPoints[i]);
                    }
                  }
                  switch (object.aggregationTemporality) {
                    default:
                      if (typeof object.aggregationTemporality === "number") {
                        message.aggregationTemporality = object.aggregationTemporality;
                        break;
                      }
                      break;
                    case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                    case 0:
                      message.aggregationTemporality = 0;
                      break;
                    case "AGGREGATION_TEMPORALITY_DELTA":
                    case 1:
                      message.aggregationTemporality = 1;
                      break;
                    case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                    case 2:
                      message.aggregationTemporality = 2;
                      break;
                  }
                  if (object.isMonotonic != null)
                    message.isMonotonic = Boolean(object.isMonotonic);
                  return message;
                };
                Sum.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.dataPoints = [];
                  if (options.defaults) {
                    object.aggregationTemporality = options.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                    object.isMonotonic = false;
                  }
                  if (message.dataPoints && message.dataPoints.length) {
                    object.dataPoints = [];
                    for (var j = 0; j < message.dataPoints.length; ++j)
                      object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.NumberDataPoint.toObject(message.dataPoints[j], options);
                  }
                  if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                    object.aggregationTemporality = options.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                  if (message.isMonotonic != null && message.hasOwnProperty("isMonotonic"))
                    object.isMonotonic = message.isMonotonic;
                  return object;
                };
                Sum.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Sum.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Sum";
                };
                return Sum;
              }();
              v1.Histogram = function() {
                function Histogram(properties) {
                  this.dataPoints = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Histogram.prototype.dataPoints = $util.emptyArray;
                Histogram.prototype.aggregationTemporality = null;
                Histogram.create = function create(properties) {
                  return new Histogram(properties);
                };
                Histogram.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.dataPoints != null && message.dataPoints.length)
                    for (var i = 0; i < message.dataPoints.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.encode(message.dataPoints[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                    writer.uint32(
                      /* id 2, wireType 0 =*/
                      16
                    ).int32(message.aggregationTemporality);
                  return writer;
                };
                Histogram.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Histogram.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Histogram();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.dataPoints && message.dataPoints.length))
                          message.dataPoints = [];
                        message.dataPoints.push($root.opentelemetry.proto.metrics.v1.HistogramDataPoint.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.aggregationTemporality = reader.int32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Histogram.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Histogram.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                    if (!Array.isArray(message.dataPoints))
                      return "dataPoints: array expected";
                    for (var i = 0; i < message.dataPoints.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.verify(message.dataPoints[i]);
                      if (error)
                        return "dataPoints." + error;
                    }
                  }
                  if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                    switch (message.aggregationTemporality) {
                      default:
                        return "aggregationTemporality: enum value expected";
                      case 0:
                      case 1:
                      case 2:
                        break;
                    }
                  return null;
                };
                Histogram.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.Histogram)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.Histogram();
                  if (object.dataPoints) {
                    if (!Array.isArray(object.dataPoints))
                      throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: array expected");
                    message.dataPoints = [];
                    for (var i = 0; i < object.dataPoints.length; ++i) {
                      if (typeof object.dataPoints[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.Histogram.dataPoints: object expected");
                      message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.fromObject(object.dataPoints[i]);
                    }
                  }
                  switch (object.aggregationTemporality) {
                    default:
                      if (typeof object.aggregationTemporality === "number") {
                        message.aggregationTemporality = object.aggregationTemporality;
                        break;
                      }
                      break;
                    case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                    case 0:
                      message.aggregationTemporality = 0;
                      break;
                    case "AGGREGATION_TEMPORALITY_DELTA":
                    case 1:
                      message.aggregationTemporality = 1;
                      break;
                    case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                    case 2:
                      message.aggregationTemporality = 2;
                      break;
                  }
                  return message;
                };
                Histogram.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.dataPoints = [];
                  if (options.defaults)
                    object.aggregationTemporality = options.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                  if (message.dataPoints && message.dataPoints.length) {
                    object.dataPoints = [];
                    for (var j = 0; j < message.dataPoints.length; ++j)
                      object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.HistogramDataPoint.toObject(message.dataPoints[j], options);
                  }
                  if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                    object.aggregationTemporality = options.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                  return object;
                };
                Histogram.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Histogram.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Histogram";
                };
                return Histogram;
              }();
              v1.ExponentialHistogram = function() {
                function ExponentialHistogram(properties) {
                  this.dataPoints = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExponentialHistogram.prototype.dataPoints = $util.emptyArray;
                ExponentialHistogram.prototype.aggregationTemporality = null;
                ExponentialHistogram.create = function create(properties) {
                  return new ExponentialHistogram(properties);
                };
                ExponentialHistogram.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.dataPoints != null && message.dataPoints.length)
                    for (var i = 0; i < message.dataPoints.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.encode(message.dataPoints[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  if (message.aggregationTemporality != null && Object.hasOwnProperty.call(message, "aggregationTemporality"))
                    writer.uint32(
                      /* id 2, wireType 0 =*/
                      16
                    ).int32(message.aggregationTemporality);
                  return writer;
                };
                ExponentialHistogram.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExponentialHistogram.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogram();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.dataPoints && message.dataPoints.length))
                          message.dataPoints = [];
                        message.dataPoints.push($root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.aggregationTemporality = reader.int32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExponentialHistogram.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExponentialHistogram.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                    if (!Array.isArray(message.dataPoints))
                      return "dataPoints: array expected";
                    for (var i = 0; i < message.dataPoints.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.verify(message.dataPoints[i]);
                      if (error)
                        return "dataPoints." + error;
                    }
                  }
                  if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                    switch (message.aggregationTemporality) {
                      default:
                        return "aggregationTemporality: enum value expected";
                      case 0:
                      case 1:
                      case 2:
                        break;
                    }
                  return null;
                };
                ExponentialHistogram.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogram)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogram();
                  if (object.dataPoints) {
                    if (!Array.isArray(object.dataPoints))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: array expected");
                    message.dataPoints = [];
                    for (var i = 0; i < object.dataPoints.length; ++i) {
                      if (typeof object.dataPoints[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogram.dataPoints: object expected");
                      message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.fromObject(object.dataPoints[i]);
                    }
                  }
                  switch (object.aggregationTemporality) {
                    default:
                      if (typeof object.aggregationTemporality === "number") {
                        message.aggregationTemporality = object.aggregationTemporality;
                        break;
                      }
                      break;
                    case "AGGREGATION_TEMPORALITY_UNSPECIFIED":
                    case 0:
                      message.aggregationTemporality = 0;
                      break;
                    case "AGGREGATION_TEMPORALITY_DELTA":
                    case 1:
                      message.aggregationTemporality = 1;
                      break;
                    case "AGGREGATION_TEMPORALITY_CUMULATIVE":
                    case 2:
                      message.aggregationTemporality = 2;
                      break;
                  }
                  return message;
                };
                ExponentialHistogram.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.dataPoints = [];
                  if (options.defaults)
                    object.aggregationTemporality = options.enums === String ? "AGGREGATION_TEMPORALITY_UNSPECIFIED" : 0;
                  if (message.dataPoints && message.dataPoints.length) {
                    object.dataPoints = [];
                    for (var j = 0; j < message.dataPoints.length; ++j)
                      object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.toObject(message.dataPoints[j], options);
                  }
                  if (message.aggregationTemporality != null && message.hasOwnProperty("aggregationTemporality"))
                    object.aggregationTemporality = options.enums === String ? $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] === void 0 ? message.aggregationTemporality : $root.opentelemetry.proto.metrics.v1.AggregationTemporality[message.aggregationTemporality] : message.aggregationTemporality;
                  return object;
                };
                ExponentialHistogram.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExponentialHistogram.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogram";
                };
                return ExponentialHistogram;
              }();
              v1.Summary = function() {
                function Summary(properties) {
                  this.dataPoints = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Summary.prototype.dataPoints = $util.emptyArray;
                Summary.create = function create(properties) {
                  return new Summary(properties);
                };
                Summary.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.dataPoints != null && message.dataPoints.length)
                    for (var i = 0; i < message.dataPoints.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.encode(message.dataPoints[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                Summary.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Summary.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Summary();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.dataPoints && message.dataPoints.length))
                          message.dataPoints = [];
                        message.dataPoints.push($root.opentelemetry.proto.metrics.v1.SummaryDataPoint.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Summary.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Summary.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.dataPoints != null && message.hasOwnProperty("dataPoints")) {
                    if (!Array.isArray(message.dataPoints))
                      return "dataPoints: array expected";
                    for (var i = 0; i < message.dataPoints.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.verify(message.dataPoints[i]);
                      if (error)
                        return "dataPoints." + error;
                    }
                  }
                  return null;
                };
                Summary.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.Summary)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.Summary();
                  if (object.dataPoints) {
                    if (!Array.isArray(object.dataPoints))
                      throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: array expected");
                    message.dataPoints = [];
                    for (var i = 0; i < object.dataPoints.length; ++i) {
                      if (typeof object.dataPoints[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.Summary.dataPoints: object expected");
                      message.dataPoints[i] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.fromObject(object.dataPoints[i]);
                    }
                  }
                  return message;
                };
                Summary.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.dataPoints = [];
                  if (message.dataPoints && message.dataPoints.length) {
                    object.dataPoints = [];
                    for (var j = 0; j < message.dataPoints.length; ++j)
                      object.dataPoints[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.toObject(message.dataPoints[j], options);
                  }
                  return object;
                };
                Summary.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Summary.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Summary";
                };
                return Summary;
              }();
              v1.AggregationTemporality = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "AGGREGATION_TEMPORALITY_UNSPECIFIED"] = 0;
                values[valuesById[1] = "AGGREGATION_TEMPORALITY_DELTA"] = 1;
                values[valuesById[2] = "AGGREGATION_TEMPORALITY_CUMULATIVE"] = 2;
                return values;
              }();
              v1.DataPointFlags = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "DATA_POINT_FLAGS_DO_NOT_USE"] = 0;
                values[valuesById[1] = "DATA_POINT_FLAGS_NO_RECORDED_VALUE_MASK"] = 1;
                return values;
              }();
              v1.NumberDataPoint = function() {
                function NumberDataPoint(properties) {
                  this.attributes = [];
                  this.exemplars = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                NumberDataPoint.prototype.attributes = $util.emptyArray;
                NumberDataPoint.prototype.startTimeUnixNano = null;
                NumberDataPoint.prototype.timeUnixNano = null;
                NumberDataPoint.prototype.asDouble = null;
                NumberDataPoint.prototype.asInt = null;
                NumberDataPoint.prototype.exemplars = $util.emptyArray;
                NumberDataPoint.prototype.flags = null;
                var $oneOfFields;
                Object.defineProperty(NumberDataPoint.prototype, "value", {
                  get: $util.oneOfGetter($oneOfFields = ["asDouble", "asInt"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                NumberDataPoint.create = function create(properties) {
                  return new NumberDataPoint(properties);
                };
                NumberDataPoint.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).fixed64(message.startTimeUnixNano);
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 3, wireType 1 =*/
                      25
                    ).fixed64(message.timeUnixNano);
                  if (message.asDouble != null && Object.hasOwnProperty.call(message, "asDouble"))
                    writer.uint32(
                      /* id 4, wireType 1 =*/
                      33
                    ).double(message.asDouble);
                  if (message.exemplars != null && message.exemplars.length)
                    for (var i = 0; i < message.exemplars.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                        /* id 5, wireType 2 =*/
                        42
                      ).fork()).ldelim();
                  if (message.asInt != null && Object.hasOwnProperty.call(message, "asInt"))
                    writer.uint32(
                      /* id 6, wireType 1 =*/
                      49
                    ).sfixed64(message.asInt);
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 7, wireType 2 =*/
                        58
                      ).fork()).ldelim();
                  if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(
                      /* id 8, wireType 0 =*/
                      64
                    ).uint32(message.flags);
                  return writer;
                };
                NumberDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                NumberDataPoint.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.NumberDataPoint();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 7: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.startTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 3: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 4: {
                        message.asDouble = reader.double();
                        break;
                      }
                      case 6: {
                        message.asInt = reader.sfixed64();
                        break;
                      }
                      case 5: {
                        if (!(message.exemplars && message.exemplars.length))
                          message.exemplars = [];
                        message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                        break;
                      }
                      case 8: {
                        message.flags = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                NumberDataPoint.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                NumberDataPoint.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  var properties = {};
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                    if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                      return "startTimeUnixNano: integer|Long expected";
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                    properties.value = 1;
                    if (typeof message.asDouble !== "number")
                      return "asDouble: number expected";
                  }
                  if (message.asInt != null && message.hasOwnProperty("asInt")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    if (!$util.isInteger(message.asInt) && !(message.asInt && $util.isInteger(message.asInt.low) && $util.isInteger(message.asInt.high)))
                      return "asInt: integer|Long expected";
                  }
                  if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                    if (!Array.isArray(message.exemplars))
                      return "exemplars: array expected";
                    for (var i = 0; i < message.exemplars.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                      if (error)
                        return "exemplars." + error;
                    }
                  }
                  if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!$util.isInteger(message.flags))
                      return "flags: integer expected";
                  }
                  return null;
                };
                NumberDataPoint.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.NumberDataPoint)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.NumberDataPoint();
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.startTimeUnixNano != null) {
                    if ($util.Long)
                      (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                    else if (typeof object.startTimeUnixNano === "string")
                      message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                    else if (typeof object.startTimeUnixNano === "number")
                      message.startTimeUnixNano = object.startTimeUnixNano;
                    else if (typeof object.startTimeUnixNano === "object")
                      message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.asDouble != null)
                    message.asDouble = Number(object.asDouble);
                  if (object.asInt != null) {
                    if ($util.Long)
                      (message.asInt = $util.Long.fromValue(object.asInt)).unsigned = false;
                    else if (typeof object.asInt === "string")
                      message.asInt = parseInt(object.asInt, 10);
                    else if (typeof object.asInt === "number")
                      message.asInt = object.asInt;
                    else if (typeof object.asInt === "object")
                      message.asInt = new $util.LongBits(object.asInt.low >>> 0, object.asInt.high >>> 0).toNumber();
                  }
                  if (object.exemplars) {
                    if (!Array.isArray(object.exemplars))
                      throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: array expected");
                    message.exemplars = [];
                    for (var i = 0; i < object.exemplars.length; ++i) {
                      if (typeof object.exemplars[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.NumberDataPoint.exemplars: object expected");
                      message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                    }
                  }
                  if (object.flags != null)
                    message.flags = object.flags >>> 0;
                  return message;
                };
                NumberDataPoint.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults) {
                    object.exemplars = [];
                    object.attributes = [];
                  }
                  if (options.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.startTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.startTimeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options.longs === String ? "0" : 0;
                    object.flags = 0;
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                    if (typeof message.startTimeUnixNano === "number")
                      object.startTimeUnixNano = options.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                    else
                      object.startTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                    object.asDouble = options.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                    if (options.oneofs)
                      object.value = "asDouble";
                  }
                  if (message.exemplars && message.exemplars.length) {
                    object.exemplars = [];
                    for (var j = 0; j < message.exemplars.length; ++j)
                      object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options);
                  }
                  if (message.asInt != null && message.hasOwnProperty("asInt")) {
                    if (typeof message.asInt === "number")
                      object.asInt = options.longs === String ? String(message.asInt) : message.asInt;
                    else
                      object.asInt = options.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                    if (options.oneofs)
                      object.value = "asInt";
                  }
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                  return object;
                };
                NumberDataPoint.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                NumberDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.NumberDataPoint";
                };
                return NumberDataPoint;
              }();
              v1.HistogramDataPoint = function() {
                function HistogramDataPoint(properties) {
                  this.attributes = [];
                  this.bucketCounts = [];
                  this.explicitBounds = [];
                  this.exemplars = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                HistogramDataPoint.prototype.attributes = $util.emptyArray;
                HistogramDataPoint.prototype.startTimeUnixNano = null;
                HistogramDataPoint.prototype.timeUnixNano = null;
                HistogramDataPoint.prototype.count = null;
                HistogramDataPoint.prototype.sum = null;
                HistogramDataPoint.prototype.bucketCounts = $util.emptyArray;
                HistogramDataPoint.prototype.explicitBounds = $util.emptyArray;
                HistogramDataPoint.prototype.exemplars = $util.emptyArray;
                HistogramDataPoint.prototype.flags = null;
                HistogramDataPoint.prototype.min = null;
                HistogramDataPoint.prototype.max = null;
                var $oneOfFields;
                Object.defineProperty(HistogramDataPoint.prototype, "_sum", {
                  get: $util.oneOfGetter($oneOfFields = ["sum"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                Object.defineProperty(HistogramDataPoint.prototype, "_min", {
                  get: $util.oneOfGetter($oneOfFields = ["min"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                Object.defineProperty(HistogramDataPoint.prototype, "_max", {
                  get: $util.oneOfGetter($oneOfFields = ["max"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                HistogramDataPoint.create = function create(properties) {
                  return new HistogramDataPoint(properties);
                };
                HistogramDataPoint.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).fixed64(message.startTimeUnixNano);
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 3, wireType 1 =*/
                      25
                    ).fixed64(message.timeUnixNano);
                  if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    writer.uint32(
                      /* id 4, wireType 1 =*/
                      33
                    ).fixed64(message.count);
                  if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                    writer.uint32(
                      /* id 5, wireType 1 =*/
                      41
                    ).double(message.sum);
                  if (message.bucketCounts != null && message.bucketCounts.length) {
                    writer.uint32(
                      /* id 6, wireType 2 =*/
                      50
                    ).fork();
                    for (var i = 0; i < message.bucketCounts.length; ++i)
                      writer.fixed64(message.bucketCounts[i]);
                    writer.ldelim();
                  }
                  if (message.explicitBounds != null && message.explicitBounds.length) {
                    writer.uint32(
                      /* id 7, wireType 2 =*/
                      58
                    ).fork();
                    for (var i = 0; i < message.explicitBounds.length; ++i)
                      writer.double(message.explicitBounds[i]);
                    writer.ldelim();
                  }
                  if (message.exemplars != null && message.exemplars.length)
                    for (var i = 0; i < message.exemplars.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                        /* id 8, wireType 2 =*/
                        66
                      ).fork()).ldelim();
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 9, wireType 2 =*/
                        74
                      ).fork()).ldelim();
                  if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(
                      /* id 10, wireType 0 =*/
                      80
                    ).uint32(message.flags);
                  if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                    writer.uint32(
                      /* id 11, wireType 1 =*/
                      89
                    ).double(message.min);
                  if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                    writer.uint32(
                      /* id 12, wireType 1 =*/
                      97
                    ).double(message.max);
                  return writer;
                };
                HistogramDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                HistogramDataPoint.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.HistogramDataPoint();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 9: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.startTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 3: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 4: {
                        message.count = reader.fixed64();
                        break;
                      }
                      case 5: {
                        message.sum = reader.double();
                        break;
                      }
                      case 6: {
                        if (!(message.bucketCounts && message.bucketCounts.length))
                          message.bucketCounts = [];
                        if ((tag & 7) === 2) {
                          var end2 = reader.uint32() + reader.pos;
                          while (reader.pos < end2)
                            message.bucketCounts.push(reader.fixed64());
                        } else
                          message.bucketCounts.push(reader.fixed64());
                        break;
                      }
                      case 7: {
                        if (!(message.explicitBounds && message.explicitBounds.length))
                          message.explicitBounds = [];
                        if ((tag & 7) === 2) {
                          var end2 = reader.uint32() + reader.pos;
                          while (reader.pos < end2)
                            message.explicitBounds.push(reader.double());
                        } else
                          message.explicitBounds.push(reader.double());
                        break;
                      }
                      case 8: {
                        if (!(message.exemplars && message.exemplars.length))
                          message.exemplars = [];
                        message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                        break;
                      }
                      case 10: {
                        message.flags = reader.uint32();
                        break;
                      }
                      case 11: {
                        message.min = reader.double();
                        break;
                      }
                      case 12: {
                        message.max = reader.double();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                HistogramDataPoint.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                HistogramDataPoint.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  var properties = {};
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                    if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                      return "startTimeUnixNano: integer|Long expected";
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.count != null && message.hasOwnProperty("count")) {
                    if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                      return "count: integer|Long expected";
                  }
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    properties._sum = 1;
                    if (typeof message.sum !== "number")
                      return "sum: number expected";
                  }
                  if (message.bucketCounts != null && message.hasOwnProperty("bucketCounts")) {
                    if (!Array.isArray(message.bucketCounts))
                      return "bucketCounts: array expected";
                    for (var i = 0; i < message.bucketCounts.length; ++i)
                      if (!$util.isInteger(message.bucketCounts[i]) && !(message.bucketCounts[i] && $util.isInteger(message.bucketCounts[i].low) && $util.isInteger(message.bucketCounts[i].high)))
                        return "bucketCounts: integer|Long[] expected";
                  }
                  if (message.explicitBounds != null && message.hasOwnProperty("explicitBounds")) {
                    if (!Array.isArray(message.explicitBounds))
                      return "explicitBounds: array expected";
                    for (var i = 0; i < message.explicitBounds.length; ++i)
                      if (typeof message.explicitBounds[i] !== "number")
                        return "explicitBounds: number[] expected";
                  }
                  if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                    if (!Array.isArray(message.exemplars))
                      return "exemplars: array expected";
                    for (var i = 0; i < message.exemplars.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                      if (error)
                        return "exemplars." + error;
                    }
                  }
                  if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!$util.isInteger(message.flags))
                      return "flags: integer expected";
                  }
                  if (message.min != null && message.hasOwnProperty("min")) {
                    properties._min = 1;
                    if (typeof message.min !== "number")
                      return "min: number expected";
                  }
                  if (message.max != null && message.hasOwnProperty("max")) {
                    properties._max = 1;
                    if (typeof message.max !== "number")
                      return "max: number expected";
                  }
                  return null;
                };
                HistogramDataPoint.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.HistogramDataPoint)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.HistogramDataPoint();
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.startTimeUnixNano != null) {
                    if ($util.Long)
                      (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                    else if (typeof object.startTimeUnixNano === "string")
                      message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                    else if (typeof object.startTimeUnixNano === "number")
                      message.startTimeUnixNano = object.startTimeUnixNano;
                    else if (typeof object.startTimeUnixNano === "object")
                      message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.count != null) {
                    if ($util.Long)
                      (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                    else if (typeof object.count === "string")
                      message.count = parseInt(object.count, 10);
                    else if (typeof object.count === "number")
                      message.count = object.count;
                    else if (typeof object.count === "object")
                      message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                  }
                  if (object.sum != null)
                    message.sum = Number(object.sum);
                  if (object.bucketCounts) {
                    if (!Array.isArray(object.bucketCounts))
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.bucketCounts: array expected");
                    message.bucketCounts = [];
                    for (var i = 0; i < object.bucketCounts.length; ++i)
                      if ($util.Long)
                        (message.bucketCounts[i] = $util.Long.fromValue(object.bucketCounts[i])).unsigned = false;
                      else if (typeof object.bucketCounts[i] === "string")
                        message.bucketCounts[i] = parseInt(object.bucketCounts[i], 10);
                      else if (typeof object.bucketCounts[i] === "number")
                        message.bucketCounts[i] = object.bucketCounts[i];
                      else if (typeof object.bucketCounts[i] === "object")
                        message.bucketCounts[i] = new $util.LongBits(object.bucketCounts[i].low >>> 0, object.bucketCounts[i].high >>> 0).toNumber();
                  }
                  if (object.explicitBounds) {
                    if (!Array.isArray(object.explicitBounds))
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.explicitBounds: array expected");
                    message.explicitBounds = [];
                    for (var i = 0; i < object.explicitBounds.length; ++i)
                      message.explicitBounds[i] = Number(object.explicitBounds[i]);
                  }
                  if (object.exemplars) {
                    if (!Array.isArray(object.exemplars))
                      throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: array expected");
                    message.exemplars = [];
                    for (var i = 0; i < object.exemplars.length; ++i) {
                      if (typeof object.exemplars[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.HistogramDataPoint.exemplars: object expected");
                      message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                    }
                  }
                  if (object.flags != null)
                    message.flags = object.flags >>> 0;
                  if (object.min != null)
                    message.min = Number(object.min);
                  if (object.max != null)
                    message.max = Number(object.max);
                  return message;
                };
                HistogramDataPoint.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults) {
                    object.bucketCounts = [];
                    object.explicitBounds = [];
                    object.exemplars = [];
                    object.attributes = [];
                  }
                  if (options.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.startTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.startTimeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.count = options.longs === String ? "0" : 0;
                    object.flags = 0;
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                    if (typeof message.startTimeUnixNano === "number")
                      object.startTimeUnixNano = options.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                    else
                      object.startTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.count != null && message.hasOwnProperty("count"))
                    if (typeof message.count === "number")
                      object.count = options.longs === String ? String(message.count) : message.count;
                    else
                      object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    object.sum = options.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                    if (options.oneofs)
                      object._sum = "sum";
                  }
                  if (message.bucketCounts && message.bucketCounts.length) {
                    object.bucketCounts = [];
                    for (var j = 0; j < message.bucketCounts.length; ++j)
                      if (typeof message.bucketCounts[j] === "number")
                        object.bucketCounts[j] = options.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                      else
                        object.bucketCounts[j] = options.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber() : message.bucketCounts[j];
                  }
                  if (message.explicitBounds && message.explicitBounds.length) {
                    object.explicitBounds = [];
                    for (var j = 0; j < message.explicitBounds.length; ++j)
                      object.explicitBounds[j] = options.json && !isFinite(message.explicitBounds[j]) ? String(message.explicitBounds[j]) : message.explicitBounds[j];
                  }
                  if (message.exemplars && message.exemplars.length) {
                    object.exemplars = [];
                    for (var j = 0; j < message.exemplars.length; ++j)
                      object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options);
                  }
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                  if (message.min != null && message.hasOwnProperty("min")) {
                    object.min = options.json && !isFinite(message.min) ? String(message.min) : message.min;
                    if (options.oneofs)
                      object._min = "min";
                  }
                  if (message.max != null && message.hasOwnProperty("max")) {
                    object.max = options.json && !isFinite(message.max) ? String(message.max) : message.max;
                    if (options.oneofs)
                      object._max = "max";
                  }
                  return object;
                };
                HistogramDataPoint.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                HistogramDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.HistogramDataPoint";
                };
                return HistogramDataPoint;
              }();
              v1.ExponentialHistogramDataPoint = function() {
                function ExponentialHistogramDataPoint(properties) {
                  this.attributes = [];
                  this.exemplars = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ExponentialHistogramDataPoint.prototype.attributes = $util.emptyArray;
                ExponentialHistogramDataPoint.prototype.startTimeUnixNano = null;
                ExponentialHistogramDataPoint.prototype.timeUnixNano = null;
                ExponentialHistogramDataPoint.prototype.count = null;
                ExponentialHistogramDataPoint.prototype.sum = null;
                ExponentialHistogramDataPoint.prototype.scale = null;
                ExponentialHistogramDataPoint.prototype.zeroCount = null;
                ExponentialHistogramDataPoint.prototype.positive = null;
                ExponentialHistogramDataPoint.prototype.negative = null;
                ExponentialHistogramDataPoint.prototype.flags = null;
                ExponentialHistogramDataPoint.prototype.exemplars = $util.emptyArray;
                ExponentialHistogramDataPoint.prototype.min = null;
                ExponentialHistogramDataPoint.prototype.max = null;
                ExponentialHistogramDataPoint.prototype.zeroThreshold = null;
                var $oneOfFields;
                Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_sum", {
                  get: $util.oneOfGetter($oneOfFields = ["sum"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_min", {
                  get: $util.oneOfGetter($oneOfFields = ["min"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                Object.defineProperty(ExponentialHistogramDataPoint.prototype, "_max", {
                  get: $util.oneOfGetter($oneOfFields = ["max"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                ExponentialHistogramDataPoint.create = function create(properties) {
                  return new ExponentialHistogramDataPoint(properties);
                };
                ExponentialHistogramDataPoint.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).fixed64(message.startTimeUnixNano);
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 3, wireType 1 =*/
                      25
                    ).fixed64(message.timeUnixNano);
                  if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    writer.uint32(
                      /* id 4, wireType 1 =*/
                      33
                    ).fixed64(message.count);
                  if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                    writer.uint32(
                      /* id 5, wireType 1 =*/
                      41
                    ).double(message.sum);
                  if (message.scale != null && Object.hasOwnProperty.call(message, "scale"))
                    writer.uint32(
                      /* id 6, wireType 0 =*/
                      48
                    ).sint32(message.scale);
                  if (message.zeroCount != null && Object.hasOwnProperty.call(message, "zeroCount"))
                    writer.uint32(
                      /* id 7, wireType 1 =*/
                      57
                    ).fixed64(message.zeroCount);
                  if (message.positive != null && Object.hasOwnProperty.call(message, "positive"))
                    $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(message.positive, writer.uint32(
                      /* id 8, wireType 2 =*/
                      66
                    ).fork()).ldelim();
                  if (message.negative != null && Object.hasOwnProperty.call(message, "negative"))
                    $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.encode(message.negative, writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).fork()).ldelim();
                  if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(
                      /* id 10, wireType 0 =*/
                      80
                    ).uint32(message.flags);
                  if (message.exemplars != null && message.exemplars.length)
                    for (var i = 0; i < message.exemplars.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.Exemplar.encode(message.exemplars[i], writer.uint32(
                        /* id 11, wireType 2 =*/
                        90
                      ).fork()).ldelim();
                  if (message.min != null && Object.hasOwnProperty.call(message, "min"))
                    writer.uint32(
                      /* id 12, wireType 1 =*/
                      97
                    ).double(message.min);
                  if (message.max != null && Object.hasOwnProperty.call(message, "max"))
                    writer.uint32(
                      /* id 13, wireType 1 =*/
                      105
                    ).double(message.max);
                  if (message.zeroThreshold != null && Object.hasOwnProperty.call(message, "zeroThreshold"))
                    writer.uint32(
                      /* id 14, wireType 1 =*/
                      113
                    ).double(message.zeroThreshold);
                  return writer;
                };
                ExponentialHistogramDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ExponentialHistogramDataPoint.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.startTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 3: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 4: {
                        message.count = reader.fixed64();
                        break;
                      }
                      case 5: {
                        message.sum = reader.double();
                        break;
                      }
                      case 6: {
                        message.scale = reader.sint32();
                        break;
                      }
                      case 7: {
                        message.zeroCount = reader.fixed64();
                        break;
                      }
                      case 8: {
                        message.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(reader, reader.uint32());
                        break;
                      }
                      case 9: {
                        message.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.decode(reader, reader.uint32());
                        break;
                      }
                      case 10: {
                        message.flags = reader.uint32();
                        break;
                      }
                      case 11: {
                        if (!(message.exemplars && message.exemplars.length))
                          message.exemplars = [];
                        message.exemplars.push($root.opentelemetry.proto.metrics.v1.Exemplar.decode(reader, reader.uint32()));
                        break;
                      }
                      case 12: {
                        message.min = reader.double();
                        break;
                      }
                      case 13: {
                        message.max = reader.double();
                        break;
                      }
                      case 14: {
                        message.zeroThreshold = reader.double();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ExponentialHistogramDataPoint.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ExponentialHistogramDataPoint.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  var properties = {};
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                    if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                      return "startTimeUnixNano: integer|Long expected";
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.count != null && message.hasOwnProperty("count")) {
                    if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                      return "count: integer|Long expected";
                  }
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    properties._sum = 1;
                    if (typeof message.sum !== "number")
                      return "sum: number expected";
                  }
                  if (message.scale != null && message.hasOwnProperty("scale")) {
                    if (!$util.isInteger(message.scale))
                      return "scale: integer expected";
                  }
                  if (message.zeroCount != null && message.hasOwnProperty("zeroCount")) {
                    if (!$util.isInteger(message.zeroCount) && !(message.zeroCount && $util.isInteger(message.zeroCount.low) && $util.isInteger(message.zeroCount.high)))
                      return "zeroCount: integer|Long expected";
                  }
                  if (message.positive != null && message.hasOwnProperty("positive")) {
                    var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(message.positive);
                    if (error)
                      return "positive." + error;
                  }
                  if (message.negative != null && message.hasOwnProperty("negative")) {
                    var error = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.verify(message.negative);
                    if (error)
                      return "negative." + error;
                  }
                  if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!$util.isInteger(message.flags))
                      return "flags: integer expected";
                  }
                  if (message.exemplars != null && message.hasOwnProperty("exemplars")) {
                    if (!Array.isArray(message.exemplars))
                      return "exemplars: array expected";
                    for (var i = 0; i < message.exemplars.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.Exemplar.verify(message.exemplars[i]);
                      if (error)
                        return "exemplars." + error;
                    }
                  }
                  if (message.min != null && message.hasOwnProperty("min")) {
                    properties._min = 1;
                    if (typeof message.min !== "number")
                      return "min: number expected";
                  }
                  if (message.max != null && message.hasOwnProperty("max")) {
                    properties._max = 1;
                    if (typeof message.max !== "number")
                      return "max: number expected";
                  }
                  if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold")) {
                    if (typeof message.zeroThreshold !== "number")
                      return "zeroThreshold: number expected";
                  }
                  return null;
                };
                ExponentialHistogramDataPoint.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint();
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.startTimeUnixNano != null) {
                    if ($util.Long)
                      (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                    else if (typeof object.startTimeUnixNano === "string")
                      message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                    else if (typeof object.startTimeUnixNano === "number")
                      message.startTimeUnixNano = object.startTimeUnixNano;
                    else if (typeof object.startTimeUnixNano === "object")
                      message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.count != null) {
                    if ($util.Long)
                      (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                    else if (typeof object.count === "string")
                      message.count = parseInt(object.count, 10);
                    else if (typeof object.count === "number")
                      message.count = object.count;
                    else if (typeof object.count === "object")
                      message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                  }
                  if (object.sum != null)
                    message.sum = Number(object.sum);
                  if (object.scale != null)
                    message.scale = object.scale | 0;
                  if (object.zeroCount != null) {
                    if ($util.Long)
                      (message.zeroCount = $util.Long.fromValue(object.zeroCount)).unsigned = false;
                    else if (typeof object.zeroCount === "string")
                      message.zeroCount = parseInt(object.zeroCount, 10);
                    else if (typeof object.zeroCount === "number")
                      message.zeroCount = object.zeroCount;
                    else if (typeof object.zeroCount === "object")
                      message.zeroCount = new $util.LongBits(object.zeroCount.low >>> 0, object.zeroCount.high >>> 0).toNumber();
                  }
                  if (object.positive != null) {
                    if (typeof object.positive !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.positive: object expected");
                    message.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(object.positive);
                  }
                  if (object.negative != null) {
                    if (typeof object.negative !== "object")
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.negative: object expected");
                    message.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.fromObject(object.negative);
                  }
                  if (object.flags != null)
                    message.flags = object.flags >>> 0;
                  if (object.exemplars) {
                    if (!Array.isArray(object.exemplars))
                      throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: array expected");
                    message.exemplars = [];
                    for (var i = 0; i < object.exemplars.length; ++i) {
                      if (typeof object.exemplars[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.exemplars: object expected");
                      message.exemplars[i] = $root.opentelemetry.proto.metrics.v1.Exemplar.fromObject(object.exemplars[i]);
                    }
                  }
                  if (object.min != null)
                    message.min = Number(object.min);
                  if (object.max != null)
                    message.max = Number(object.max);
                  if (object.zeroThreshold != null)
                    message.zeroThreshold = Number(object.zeroThreshold);
                  return message;
                };
                ExponentialHistogramDataPoint.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults) {
                    object.attributes = [];
                    object.exemplars = [];
                  }
                  if (options.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.startTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.startTimeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.count = options.longs === String ? "0" : 0;
                    object.scale = 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.zeroCount = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.zeroCount = options.longs === String ? "0" : 0;
                    object.positive = null;
                    object.negative = null;
                    object.flags = 0;
                    object.zeroThreshold = 0;
                  }
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                    if (typeof message.startTimeUnixNano === "number")
                      object.startTimeUnixNano = options.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                    else
                      object.startTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.count != null && message.hasOwnProperty("count"))
                    if (typeof message.count === "number")
                      object.count = options.longs === String ? String(message.count) : message.count;
                    else
                      object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    object.sum = options.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                    if (options.oneofs)
                      object._sum = "sum";
                  }
                  if (message.scale != null && message.hasOwnProperty("scale"))
                    object.scale = message.scale;
                  if (message.zeroCount != null && message.hasOwnProperty("zeroCount"))
                    if (typeof message.zeroCount === "number")
                      object.zeroCount = options.longs === String ? String(message.zeroCount) : message.zeroCount;
                    else
                      object.zeroCount = options.longs === String ? $util.Long.prototype.toString.call(message.zeroCount) : options.longs === Number ? new $util.LongBits(message.zeroCount.low >>> 0, message.zeroCount.high >>> 0).toNumber() : message.zeroCount;
                  if (message.positive != null && message.hasOwnProperty("positive"))
                    object.positive = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.positive, options);
                  if (message.negative != null && message.hasOwnProperty("negative"))
                    object.negative = $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.toObject(message.negative, options);
                  if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                  if (message.exemplars && message.exemplars.length) {
                    object.exemplars = [];
                    for (var j = 0; j < message.exemplars.length; ++j)
                      object.exemplars[j] = $root.opentelemetry.proto.metrics.v1.Exemplar.toObject(message.exemplars[j], options);
                  }
                  if (message.min != null && message.hasOwnProperty("min")) {
                    object.min = options.json && !isFinite(message.min) ? String(message.min) : message.min;
                    if (options.oneofs)
                      object._min = "min";
                  }
                  if (message.max != null && message.hasOwnProperty("max")) {
                    object.max = options.json && !isFinite(message.max) ? String(message.max) : message.max;
                    if (options.oneofs)
                      object._max = "max";
                  }
                  if (message.zeroThreshold != null && message.hasOwnProperty("zeroThreshold"))
                    object.zeroThreshold = options.json && !isFinite(message.zeroThreshold) ? String(message.zeroThreshold) : message.zeroThreshold;
                  return object;
                };
                ExponentialHistogramDataPoint.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ExponentialHistogramDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint";
                };
                ExponentialHistogramDataPoint.Buckets = function() {
                  function Buckets(properties) {
                    this.bucketCounts = [];
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  Buckets.prototype.offset = null;
                  Buckets.prototype.bucketCounts = $util.emptyArray;
                  Buckets.create = function create(properties) {
                    return new Buckets(properties);
                  };
                  Buckets.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.offset != null && Object.hasOwnProperty.call(message, "offset"))
                      writer.uint32(
                        /* id 1, wireType 0 =*/
                        8
                      ).sint32(message.offset);
                    if (message.bucketCounts != null && message.bucketCounts.length) {
                      writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork();
                      for (var i = 0; i < message.bucketCounts.length; ++i)
                        writer.uint64(message.bucketCounts[i]);
                      writer.ldelim();
                    }
                    return writer;
                  };
                  Buckets.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  Buckets.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.offset = reader.sint32();
                          break;
                        }
                        case 2: {
                          if (!(message.bucketCounts && message.bucketCounts.length))
                            message.bucketCounts = [];
                          if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                              message.bucketCounts.push(reader.uint64());
                          } else
                            message.bucketCounts.push(reader.uint64());
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  Buckets.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  Buckets.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.offset != null && message.hasOwnProperty("offset")) {
                      if (!$util.isInteger(message.offset))
                        return "offset: integer expected";
                    }
                    if (message.bucketCounts != null && message.hasOwnProperty("bucketCounts")) {
                      if (!Array.isArray(message.bucketCounts))
                        return "bucketCounts: array expected";
                      for (var i = 0; i < message.bucketCounts.length; ++i)
                        if (!$util.isInteger(message.bucketCounts[i]) && !(message.bucketCounts[i] && $util.isInteger(message.bucketCounts[i].low) && $util.isInteger(message.bucketCounts[i].high)))
                          return "bucketCounts: integer|Long[] expected";
                    }
                    return null;
                  };
                  Buckets.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets)
                      return object;
                    var message = new $root.opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets();
                    if (object.offset != null)
                      message.offset = object.offset | 0;
                    if (object.bucketCounts) {
                      if (!Array.isArray(object.bucketCounts))
                        throw TypeError(".opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets.bucketCounts: array expected");
                      message.bucketCounts = [];
                      for (var i = 0; i < object.bucketCounts.length; ++i)
                        if ($util.Long)
                          (message.bucketCounts[i] = $util.Long.fromValue(object.bucketCounts[i])).unsigned = true;
                        else if (typeof object.bucketCounts[i] === "string")
                          message.bucketCounts[i] = parseInt(object.bucketCounts[i], 10);
                        else if (typeof object.bucketCounts[i] === "number")
                          message.bucketCounts[i] = object.bucketCounts[i];
                        else if (typeof object.bucketCounts[i] === "object")
                          message.bucketCounts[i] = new $util.LongBits(object.bucketCounts[i].low >>> 0, object.bucketCounts[i].high >>> 0).toNumber(true);
                    }
                    return message;
                  };
                  Buckets.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.arrays || options.defaults)
                      object.bucketCounts = [];
                    if (options.defaults)
                      object.offset = 0;
                    if (message.offset != null && message.hasOwnProperty("offset"))
                      object.offset = message.offset;
                    if (message.bucketCounts && message.bucketCounts.length) {
                      object.bucketCounts = [];
                      for (var j = 0; j < message.bucketCounts.length; ++j)
                        if (typeof message.bucketCounts[j] === "number")
                          object.bucketCounts[j] = options.longs === String ? String(message.bucketCounts[j]) : message.bucketCounts[j];
                        else
                          object.bucketCounts[j] = options.longs === String ? $util.Long.prototype.toString.call(message.bucketCounts[j]) : options.longs === Number ? new $util.LongBits(message.bucketCounts[j].low >>> 0, message.bucketCounts[j].high >>> 0).toNumber(true) : message.bucketCounts[j];
                    }
                    return object;
                  };
                  Buckets.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  Buckets.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.ExponentialHistogramDataPoint.Buckets";
                  };
                  return Buckets;
                }();
                return ExponentialHistogramDataPoint;
              }();
              v1.SummaryDataPoint = function() {
                function SummaryDataPoint(properties) {
                  this.attributes = [];
                  this.quantileValues = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                SummaryDataPoint.prototype.attributes = $util.emptyArray;
                SummaryDataPoint.prototype.startTimeUnixNano = null;
                SummaryDataPoint.prototype.timeUnixNano = null;
                SummaryDataPoint.prototype.count = null;
                SummaryDataPoint.prototype.sum = null;
                SummaryDataPoint.prototype.quantileValues = $util.emptyArray;
                SummaryDataPoint.prototype.flags = null;
                SummaryDataPoint.create = function create(properties) {
                  return new SummaryDataPoint(properties);
                };
                SummaryDataPoint.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.startTimeUnixNano != null && Object.hasOwnProperty.call(message, "startTimeUnixNano"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).fixed64(message.startTimeUnixNano);
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 3, wireType 1 =*/
                      25
                    ).fixed64(message.timeUnixNano);
                  if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                    writer.uint32(
                      /* id 4, wireType 1 =*/
                      33
                    ).fixed64(message.count);
                  if (message.sum != null && Object.hasOwnProperty.call(message, "sum"))
                    writer.uint32(
                      /* id 5, wireType 1 =*/
                      41
                    ).double(message.sum);
                  if (message.quantileValues != null && message.quantileValues.length)
                    for (var i = 0; i < message.quantileValues.length; ++i)
                      $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.encode(message.quantileValues[i], writer.uint32(
                        /* id 6, wireType 2 =*/
                        50
                      ).fork()).ldelim();
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 7, wireType 2 =*/
                        58
                      ).fork()).ldelim();
                  if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(
                      /* id 8, wireType 0 =*/
                      64
                    ).uint32(message.flags);
                  return writer;
                };
                SummaryDataPoint.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                SummaryDataPoint.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 7: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.startTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 3: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 4: {
                        message.count = reader.fixed64();
                        break;
                      }
                      case 5: {
                        message.sum = reader.double();
                        break;
                      }
                      case 6: {
                        if (!(message.quantileValues && message.quantileValues.length))
                          message.quantileValues = [];
                        message.quantileValues.push($root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.decode(reader, reader.uint32()));
                        break;
                      }
                      case 8: {
                        message.flags = reader.uint32();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                SummaryDataPoint.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                SummaryDataPoint.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano")) {
                    if (!$util.isInteger(message.startTimeUnixNano) && !(message.startTimeUnixNano && $util.isInteger(message.startTimeUnixNano.low) && $util.isInteger(message.startTimeUnixNano.high)))
                      return "startTimeUnixNano: integer|Long expected";
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.count != null && message.hasOwnProperty("count")) {
                    if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                      return "count: integer|Long expected";
                  }
                  if (message.sum != null && message.hasOwnProperty("sum")) {
                    if (typeof message.sum !== "number")
                      return "sum: number expected";
                  }
                  if (message.quantileValues != null && message.hasOwnProperty("quantileValues")) {
                    if (!Array.isArray(message.quantileValues))
                      return "quantileValues: array expected";
                    for (var i = 0; i < message.quantileValues.length; ++i) {
                      var error = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.verify(message.quantileValues[i]);
                      if (error)
                        return "quantileValues." + error;
                    }
                  }
                  if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!$util.isInteger(message.flags))
                      return "flags: integer expected";
                  }
                  return null;
                };
                SummaryDataPoint.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint();
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.startTimeUnixNano != null) {
                    if ($util.Long)
                      (message.startTimeUnixNano = $util.Long.fromValue(object.startTimeUnixNano)).unsigned = false;
                    else if (typeof object.startTimeUnixNano === "string")
                      message.startTimeUnixNano = parseInt(object.startTimeUnixNano, 10);
                    else if (typeof object.startTimeUnixNano === "number")
                      message.startTimeUnixNano = object.startTimeUnixNano;
                    else if (typeof object.startTimeUnixNano === "object")
                      message.startTimeUnixNano = new $util.LongBits(object.startTimeUnixNano.low >>> 0, object.startTimeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.count != null) {
                    if ($util.Long)
                      (message.count = $util.Long.fromValue(object.count)).unsigned = false;
                    else if (typeof object.count === "string")
                      message.count = parseInt(object.count, 10);
                    else if (typeof object.count === "number")
                      message.count = object.count;
                    else if (typeof object.count === "object")
                      message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber();
                  }
                  if (object.sum != null)
                    message.sum = Number(object.sum);
                  if (object.quantileValues) {
                    if (!Array.isArray(object.quantileValues))
                      throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: array expected");
                    message.quantileValues = [];
                    for (var i = 0; i < object.quantileValues.length; ++i) {
                      if (typeof object.quantileValues[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.SummaryDataPoint.quantileValues: object expected");
                      message.quantileValues[i] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.fromObject(object.quantileValues[i]);
                    }
                  }
                  if (object.flags != null)
                    message.flags = object.flags >>> 0;
                  return message;
                };
                SummaryDataPoint.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults) {
                    object.quantileValues = [];
                    object.attributes = [];
                  }
                  if (options.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.startTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.startTimeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.count = options.longs === String ? "0" : 0;
                    object.sum = 0;
                    object.flags = 0;
                  }
                  if (message.startTimeUnixNano != null && message.hasOwnProperty("startTimeUnixNano"))
                    if (typeof message.startTimeUnixNano === "number")
                      object.startTimeUnixNano = options.longs === String ? String(message.startTimeUnixNano) : message.startTimeUnixNano;
                    else
                      object.startTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.startTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.startTimeUnixNano.low >>> 0, message.startTimeUnixNano.high >>> 0).toNumber() : message.startTimeUnixNano;
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.count != null && message.hasOwnProperty("count"))
                    if (typeof message.count === "number")
                      object.count = options.longs === String ? String(message.count) : message.count;
                    else
                      object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber() : message.count;
                  if (message.sum != null && message.hasOwnProperty("sum"))
                    object.sum = options.json && !isFinite(message.sum) ? String(message.sum) : message.sum;
                  if (message.quantileValues && message.quantileValues.length) {
                    object.quantileValues = [];
                    for (var j = 0; j < message.quantileValues.length; ++j)
                      object.quantileValues[j] = $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile.toObject(message.quantileValues[j], options);
                  }
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                  return object;
                };
                SummaryDataPoint.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                SummaryDataPoint.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint";
                };
                SummaryDataPoint.ValueAtQuantile = function() {
                  function ValueAtQuantile(properties) {
                    if (properties) {
                      for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                          this[keys[i]] = properties[keys[i]];
                    }
                  }
                  ValueAtQuantile.prototype.quantile = null;
                  ValueAtQuantile.prototype.value = null;
                  ValueAtQuantile.create = function create(properties) {
                    return new ValueAtQuantile(properties);
                  };
                  ValueAtQuantile.encode = function encode(message, writer) {
                    if (!writer)
                      writer = $Writer.create();
                    if (message.quantile != null && Object.hasOwnProperty.call(message, "quantile"))
                      writer.uint32(
                        /* id 1, wireType 1 =*/
                        9
                      ).double(message.quantile);
                    if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                      writer.uint32(
                        /* id 2, wireType 1 =*/
                        17
                      ).double(message.value);
                    return writer;
                  };
                  ValueAtQuantile.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                  };
                  ValueAtQuantile.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                      reader = $Reader.create(reader);
                    var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                    while (reader.pos < end) {
                      var tag = reader.uint32();
                      switch (tag >>> 3) {
                        case 1: {
                          message.quantile = reader.double();
                          break;
                        }
                        case 2: {
                          message.value = reader.double();
                          break;
                        }
                        default:
                          reader.skipType(tag & 7);
                          break;
                      }
                    }
                    return message;
                  };
                  ValueAtQuantile.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                      reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                  };
                  ValueAtQuantile.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                      return "object expected";
                    if (message.quantile != null && message.hasOwnProperty("quantile")) {
                      if (typeof message.quantile !== "number")
                        return "quantile: number expected";
                    }
                    if (message.value != null && message.hasOwnProperty("value")) {
                      if (typeof message.value !== "number")
                        return "value: number expected";
                    }
                    return null;
                  };
                  ValueAtQuantile.fromObject = function fromObject(object) {
                    if (object instanceof $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile)
                      return object;
                    var message = new $root.opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile();
                    if (object.quantile != null)
                      message.quantile = Number(object.quantile);
                    if (object.value != null)
                      message.value = Number(object.value);
                    return message;
                  };
                  ValueAtQuantile.toObject = function toObject(message, options) {
                    if (!options)
                      options = {};
                    var object = {};
                    if (options.defaults) {
                      object.quantile = 0;
                      object.value = 0;
                    }
                    if (message.quantile != null && message.hasOwnProperty("quantile"))
                      object.quantile = options.json && !isFinite(message.quantile) ? String(message.quantile) : message.quantile;
                    if (message.value != null && message.hasOwnProperty("value"))
                      object.value = options.json && !isFinite(message.value) ? String(message.value) : message.value;
                    return object;
                  };
                  ValueAtQuantile.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                  };
                  ValueAtQuantile.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === void 0) {
                      typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.SummaryDataPoint.ValueAtQuantile";
                  };
                  return ValueAtQuantile;
                }();
                return SummaryDataPoint;
              }();
              v1.Exemplar = function() {
                function Exemplar(properties) {
                  this.filteredAttributes = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                Exemplar.prototype.filteredAttributes = $util.emptyArray;
                Exemplar.prototype.timeUnixNano = null;
                Exemplar.prototype.asDouble = null;
                Exemplar.prototype.asInt = null;
                Exemplar.prototype.spanId = null;
                Exemplar.prototype.traceId = null;
                var $oneOfFields;
                Object.defineProperty(Exemplar.prototype, "value", {
                  get: $util.oneOfGetter($oneOfFields = ["asDouble", "asInt"]),
                  set: $util.oneOfSetter($oneOfFields)
                });
                Exemplar.create = function create(properties) {
                  return new Exemplar(properties);
                };
                Exemplar.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 2, wireType 1 =*/
                      17
                    ).fixed64(message.timeUnixNano);
                  if (message.asDouble != null && Object.hasOwnProperty.call(message, "asDouble"))
                    writer.uint32(
                      /* id 3, wireType 1 =*/
                      25
                    ).double(message.asDouble);
                  if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                    writer.uint32(
                      /* id 4, wireType 2 =*/
                      34
                    ).bytes(message.spanId);
                  if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).bytes(message.traceId);
                  if (message.asInt != null && Object.hasOwnProperty.call(message, "asInt"))
                    writer.uint32(
                      /* id 6, wireType 1 =*/
                      49
                    ).sfixed64(message.asInt);
                  if (message.filteredAttributes != null && message.filteredAttributes.length)
                    for (var i = 0; i < message.filteredAttributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.filteredAttributes[i], writer.uint32(
                        /* id 7, wireType 2 =*/
                        58
                      ).fork()).ldelim();
                  return writer;
                };
                Exemplar.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                Exemplar.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.metrics.v1.Exemplar();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 7: {
                        if (!(message.filteredAttributes && message.filteredAttributes.length))
                          message.filteredAttributes = [];
                        message.filteredAttributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 2: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 3: {
                        message.asDouble = reader.double();
                        break;
                      }
                      case 6: {
                        message.asInt = reader.sfixed64();
                        break;
                      }
                      case 4: {
                        message.spanId = reader.bytes();
                        break;
                      }
                      case 5: {
                        message.traceId = reader.bytes();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                Exemplar.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                Exemplar.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  var properties = {};
                  if (message.filteredAttributes != null && message.hasOwnProperty("filteredAttributes")) {
                    if (!Array.isArray(message.filteredAttributes))
                      return "filteredAttributes: array expected";
                    for (var i = 0; i < message.filteredAttributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.filteredAttributes[i]);
                      if (error)
                        return "filteredAttributes." + error;
                    }
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                    properties.value = 1;
                    if (typeof message.asDouble !== "number")
                      return "asDouble: number expected";
                  }
                  if (message.asInt != null && message.hasOwnProperty("asInt")) {
                    if (properties.value === 1)
                      return "value: multiple values";
                    properties.value = 1;
                    if (!$util.isInteger(message.asInt) && !(message.asInt && $util.isInteger(message.asInt.low) && $util.isInteger(message.asInt.high)))
                      return "asInt: integer|Long expected";
                  }
                  if (message.spanId != null && message.hasOwnProperty("spanId")) {
                    if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                      return "spanId: buffer expected";
                  }
                  if (message.traceId != null && message.hasOwnProperty("traceId")) {
                    if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                      return "traceId: buffer expected";
                  }
                  return null;
                };
                Exemplar.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.metrics.v1.Exemplar)
                    return object;
                  var message = new $root.opentelemetry.proto.metrics.v1.Exemplar();
                  if (object.filteredAttributes) {
                    if (!Array.isArray(object.filteredAttributes))
                      throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: array expected");
                    message.filteredAttributes = [];
                    for (var i = 0; i < object.filteredAttributes.length; ++i) {
                      if (typeof object.filteredAttributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.metrics.v1.Exemplar.filteredAttributes: object expected");
                      message.filteredAttributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.filteredAttributes[i]);
                    }
                  }
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.asDouble != null)
                    message.asDouble = Number(object.asDouble);
                  if (object.asInt != null) {
                    if ($util.Long)
                      (message.asInt = $util.Long.fromValue(object.asInt)).unsigned = false;
                    else if (typeof object.asInt === "string")
                      message.asInt = parseInt(object.asInt, 10);
                    else if (typeof object.asInt === "number")
                      message.asInt = object.asInt;
                    else if (typeof object.asInt === "object")
                      message.asInt = new $util.LongBits(object.asInt.low >>> 0, object.asInt.high >>> 0).toNumber();
                  }
                  if (object.spanId != null) {
                    if (typeof object.spanId === "string")
                      $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                    else if (object.spanId.length >= 0)
                      message.spanId = object.spanId;
                  }
                  if (object.traceId != null) {
                    if (typeof object.traceId === "string")
                      $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                    else if (object.traceId.length >= 0)
                      message.traceId = object.traceId;
                  }
                  return message;
                };
                Exemplar.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.filteredAttributes = [];
                  if (options.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options.longs === String ? "0" : 0;
                    if (options.bytes === String)
                      object.spanId = "";
                    else {
                      object.spanId = [];
                      if (options.bytes !== Array)
                        object.spanId = $util.newBuffer(object.spanId);
                    }
                    if (options.bytes === String)
                      object.traceId = "";
                    else {
                      object.traceId = [];
                      if (options.bytes !== Array)
                        object.traceId = $util.newBuffer(object.traceId);
                    }
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.asDouble != null && message.hasOwnProperty("asDouble")) {
                    object.asDouble = options.json && !isFinite(message.asDouble) ? String(message.asDouble) : message.asDouble;
                    if (options.oneofs)
                      object.value = "asDouble";
                  }
                  if (message.spanId != null && message.hasOwnProperty("spanId"))
                    object.spanId = options.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                  if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = options.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                  if (message.asInt != null && message.hasOwnProperty("asInt")) {
                    if (typeof message.asInt === "number")
                      object.asInt = options.longs === String ? String(message.asInt) : message.asInt;
                    else
                      object.asInt = options.longs === String ? $util.Long.prototype.toString.call(message.asInt) : options.longs === Number ? new $util.LongBits(message.asInt.low >>> 0, message.asInt.high >>> 0).toNumber() : message.asInt;
                    if (options.oneofs)
                      object.value = "asInt";
                  }
                  if (message.filteredAttributes && message.filteredAttributes.length) {
                    object.filteredAttributes = [];
                    for (var j = 0; j < message.filteredAttributes.length; ++j)
                      object.filteredAttributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.filteredAttributes[j], options);
                  }
                  return object;
                };
                Exemplar.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                Exemplar.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.metrics.v1.Exemplar";
                };
                return Exemplar;
              }();
              return v1;
            }();
            return metrics2;
          }();
          proto.logs = function() {
            var logs2 = {};
            logs2.v1 = function() {
              var v1 = {};
              v1.LogsData = function() {
                function LogsData(properties) {
                  this.resourceLogs = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                LogsData.prototype.resourceLogs = $util.emptyArray;
                LogsData.create = function create(properties) {
                  return new LogsData(properties);
                };
                LogsData.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resourceLogs != null && message.resourceLogs.length)
                    for (var i = 0; i < message.resourceLogs.length; ++i)
                      $root.opentelemetry.proto.logs.v1.ResourceLogs.encode(message.resourceLogs[i], writer.uint32(
                        /* id 1, wireType 2 =*/
                        10
                      ).fork()).ldelim();
                  return writer;
                };
                LogsData.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                LogsData.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.LogsData();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        if (!(message.resourceLogs && message.resourceLogs.length))
                          message.resourceLogs = [];
                        message.resourceLogs.push($root.opentelemetry.proto.logs.v1.ResourceLogs.decode(reader, reader.uint32()));
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                LogsData.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                LogsData.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resourceLogs != null && message.hasOwnProperty("resourceLogs")) {
                    if (!Array.isArray(message.resourceLogs))
                      return "resourceLogs: array expected";
                    for (var i = 0; i < message.resourceLogs.length; ++i) {
                      var error = $root.opentelemetry.proto.logs.v1.ResourceLogs.verify(message.resourceLogs[i]);
                      if (error)
                        return "resourceLogs." + error;
                    }
                  }
                  return null;
                };
                LogsData.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.logs.v1.LogsData)
                    return object;
                  var message = new $root.opentelemetry.proto.logs.v1.LogsData();
                  if (object.resourceLogs) {
                    if (!Array.isArray(object.resourceLogs))
                      throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: array expected");
                    message.resourceLogs = [];
                    for (var i = 0; i < object.resourceLogs.length; ++i) {
                      if (typeof object.resourceLogs[i] !== "object")
                        throw TypeError(".opentelemetry.proto.logs.v1.LogsData.resourceLogs: object expected");
                      message.resourceLogs[i] = $root.opentelemetry.proto.logs.v1.ResourceLogs.fromObject(object.resourceLogs[i]);
                    }
                  }
                  return message;
                };
                LogsData.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.resourceLogs = [];
                  if (message.resourceLogs && message.resourceLogs.length) {
                    object.resourceLogs = [];
                    for (var j = 0; j < message.resourceLogs.length; ++j)
                      object.resourceLogs[j] = $root.opentelemetry.proto.logs.v1.ResourceLogs.toObject(message.resourceLogs[j], options);
                  }
                  return object;
                };
                LogsData.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                LogsData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogsData";
                };
                return LogsData;
              }();
              v1.ResourceLogs = function() {
                function ResourceLogs(properties) {
                  this.scopeLogs = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ResourceLogs.prototype.resource = null;
                ResourceLogs.prototype.scopeLogs = $util.emptyArray;
                ResourceLogs.prototype.schemaUrl = null;
                ResourceLogs.create = function create(properties) {
                  return new ResourceLogs(properties);
                };
                ResourceLogs.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.resource != null && Object.hasOwnProperty.call(message, "resource"))
                    $root.opentelemetry.proto.resource.v1.Resource.encode(message.resource, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  if (message.scopeLogs != null && message.scopeLogs.length)
                    for (var i = 0; i < message.scopeLogs.length; ++i)
                      $root.opentelemetry.proto.logs.v1.ScopeLogs.encode(message.scopeLogs[i], writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork()).ldelim();
                  if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.schemaUrl);
                  return writer;
                };
                ResourceLogs.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ResourceLogs.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.ResourceLogs();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.resource = $root.opentelemetry.proto.resource.v1.Resource.decode(reader, reader.uint32());
                        break;
                      }
                      case 2: {
                        if (!(message.scopeLogs && message.scopeLogs.length))
                          message.scopeLogs = [];
                        message.scopeLogs.push($root.opentelemetry.proto.logs.v1.ScopeLogs.decode(reader, reader.uint32()));
                        break;
                      }
                      case 3: {
                        message.schemaUrl = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ResourceLogs.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ResourceLogs.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.resource != null && message.hasOwnProperty("resource")) {
                    var error = $root.opentelemetry.proto.resource.v1.Resource.verify(message.resource);
                    if (error)
                      return "resource." + error;
                  }
                  if (message.scopeLogs != null && message.hasOwnProperty("scopeLogs")) {
                    if (!Array.isArray(message.scopeLogs))
                      return "scopeLogs: array expected";
                    for (var i = 0; i < message.scopeLogs.length; ++i) {
                      var error = $root.opentelemetry.proto.logs.v1.ScopeLogs.verify(message.scopeLogs[i]);
                      if (error)
                        return "scopeLogs." + error;
                    }
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                    if (!$util.isString(message.schemaUrl))
                      return "schemaUrl: string expected";
                  }
                  return null;
                };
                ResourceLogs.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.logs.v1.ResourceLogs)
                    return object;
                  var message = new $root.opentelemetry.proto.logs.v1.ResourceLogs();
                  if (object.resource != null) {
                    if (typeof object.resource !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.resource: object expected");
                    message.resource = $root.opentelemetry.proto.resource.v1.Resource.fromObject(object.resource);
                  }
                  if (object.scopeLogs) {
                    if (!Array.isArray(object.scopeLogs))
                      throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: array expected");
                    message.scopeLogs = [];
                    for (var i = 0; i < object.scopeLogs.length; ++i) {
                      if (typeof object.scopeLogs[i] !== "object")
                        throw TypeError(".opentelemetry.proto.logs.v1.ResourceLogs.scopeLogs: object expected");
                      message.scopeLogs[i] = $root.opentelemetry.proto.logs.v1.ScopeLogs.fromObject(object.scopeLogs[i]);
                    }
                  }
                  if (object.schemaUrl != null)
                    message.schemaUrl = String(object.schemaUrl);
                  return message;
                };
                ResourceLogs.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.scopeLogs = [];
                  if (options.defaults) {
                    object.resource = null;
                    object.schemaUrl = "";
                  }
                  if (message.resource != null && message.hasOwnProperty("resource"))
                    object.resource = $root.opentelemetry.proto.resource.v1.Resource.toObject(message.resource, options);
                  if (message.scopeLogs && message.scopeLogs.length) {
                    object.scopeLogs = [];
                    for (var j = 0; j < message.scopeLogs.length; ++j)
                      object.scopeLogs[j] = $root.opentelemetry.proto.logs.v1.ScopeLogs.toObject(message.scopeLogs[j], options);
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                    object.schemaUrl = message.schemaUrl;
                  return object;
                };
                ResourceLogs.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ResourceLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ResourceLogs";
                };
                return ResourceLogs;
              }();
              v1.ScopeLogs = function() {
                function ScopeLogs(properties) {
                  this.logRecords = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                ScopeLogs.prototype.scope = null;
                ScopeLogs.prototype.logRecords = $util.emptyArray;
                ScopeLogs.prototype.schemaUrl = null;
                ScopeLogs.create = function create(properties) {
                  return new ScopeLogs(properties);
                };
                ScopeLogs.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.scope != null && Object.hasOwnProperty.call(message, "scope"))
                    $root.opentelemetry.proto.common.v1.InstrumentationScope.encode(message.scope, writer.uint32(
                      /* id 1, wireType 2 =*/
                      10
                    ).fork()).ldelim();
                  if (message.logRecords != null && message.logRecords.length)
                    for (var i = 0; i < message.logRecords.length; ++i)
                      $root.opentelemetry.proto.logs.v1.LogRecord.encode(message.logRecords[i], writer.uint32(
                        /* id 2, wireType 2 =*/
                        18
                      ).fork()).ldelim();
                  if (message.schemaUrl != null && Object.hasOwnProperty.call(message, "schemaUrl"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.schemaUrl);
                  return writer;
                };
                ScopeLogs.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                ScopeLogs.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.ScopeLogs();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.decode(reader, reader.uint32());
                        break;
                      }
                      case 2: {
                        if (!(message.logRecords && message.logRecords.length))
                          message.logRecords = [];
                        message.logRecords.push($root.opentelemetry.proto.logs.v1.LogRecord.decode(reader, reader.uint32()));
                        break;
                      }
                      case 3: {
                        message.schemaUrl = reader.string();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                ScopeLogs.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                ScopeLogs.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.scope != null && message.hasOwnProperty("scope")) {
                    var error = $root.opentelemetry.proto.common.v1.InstrumentationScope.verify(message.scope);
                    if (error)
                      return "scope." + error;
                  }
                  if (message.logRecords != null && message.hasOwnProperty("logRecords")) {
                    if (!Array.isArray(message.logRecords))
                      return "logRecords: array expected";
                    for (var i = 0; i < message.logRecords.length; ++i) {
                      var error = $root.opentelemetry.proto.logs.v1.LogRecord.verify(message.logRecords[i]);
                      if (error)
                        return "logRecords." + error;
                    }
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl")) {
                    if (!$util.isString(message.schemaUrl))
                      return "schemaUrl: string expected";
                  }
                  return null;
                };
                ScopeLogs.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.logs.v1.ScopeLogs)
                    return object;
                  var message = new $root.opentelemetry.proto.logs.v1.ScopeLogs();
                  if (object.scope != null) {
                    if (typeof object.scope !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.scope: object expected");
                    message.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.fromObject(object.scope);
                  }
                  if (object.logRecords) {
                    if (!Array.isArray(object.logRecords))
                      throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: array expected");
                    message.logRecords = [];
                    for (var i = 0; i < object.logRecords.length; ++i) {
                      if (typeof object.logRecords[i] !== "object")
                        throw TypeError(".opentelemetry.proto.logs.v1.ScopeLogs.logRecords: object expected");
                      message.logRecords[i] = $root.opentelemetry.proto.logs.v1.LogRecord.fromObject(object.logRecords[i]);
                    }
                  }
                  if (object.schemaUrl != null)
                    message.schemaUrl = String(object.schemaUrl);
                  return message;
                };
                ScopeLogs.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.logRecords = [];
                  if (options.defaults) {
                    object.scope = null;
                    object.schemaUrl = "";
                  }
                  if (message.scope != null && message.hasOwnProperty("scope"))
                    object.scope = $root.opentelemetry.proto.common.v1.InstrumentationScope.toObject(message.scope, options);
                  if (message.logRecords && message.logRecords.length) {
                    object.logRecords = [];
                    for (var j = 0; j < message.logRecords.length; ++j)
                      object.logRecords[j] = $root.opentelemetry.proto.logs.v1.LogRecord.toObject(message.logRecords[j], options);
                  }
                  if (message.schemaUrl != null && message.hasOwnProperty("schemaUrl"))
                    object.schemaUrl = message.schemaUrl;
                  return object;
                };
                ScopeLogs.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                ScopeLogs.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.logs.v1.ScopeLogs";
                };
                return ScopeLogs;
              }();
              v1.SeverityNumber = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "SEVERITY_NUMBER_UNSPECIFIED"] = 0;
                values[valuesById[1] = "SEVERITY_NUMBER_TRACE"] = 1;
                values[valuesById[2] = "SEVERITY_NUMBER_TRACE2"] = 2;
                values[valuesById[3] = "SEVERITY_NUMBER_TRACE3"] = 3;
                values[valuesById[4] = "SEVERITY_NUMBER_TRACE4"] = 4;
                values[valuesById[5] = "SEVERITY_NUMBER_DEBUG"] = 5;
                values[valuesById[6] = "SEVERITY_NUMBER_DEBUG2"] = 6;
                values[valuesById[7] = "SEVERITY_NUMBER_DEBUG3"] = 7;
                values[valuesById[8] = "SEVERITY_NUMBER_DEBUG4"] = 8;
                values[valuesById[9] = "SEVERITY_NUMBER_INFO"] = 9;
                values[valuesById[10] = "SEVERITY_NUMBER_INFO2"] = 10;
                values[valuesById[11] = "SEVERITY_NUMBER_INFO3"] = 11;
                values[valuesById[12] = "SEVERITY_NUMBER_INFO4"] = 12;
                values[valuesById[13] = "SEVERITY_NUMBER_WARN"] = 13;
                values[valuesById[14] = "SEVERITY_NUMBER_WARN2"] = 14;
                values[valuesById[15] = "SEVERITY_NUMBER_WARN3"] = 15;
                values[valuesById[16] = "SEVERITY_NUMBER_WARN4"] = 16;
                values[valuesById[17] = "SEVERITY_NUMBER_ERROR"] = 17;
                values[valuesById[18] = "SEVERITY_NUMBER_ERROR2"] = 18;
                values[valuesById[19] = "SEVERITY_NUMBER_ERROR3"] = 19;
                values[valuesById[20] = "SEVERITY_NUMBER_ERROR4"] = 20;
                values[valuesById[21] = "SEVERITY_NUMBER_FATAL"] = 21;
                values[valuesById[22] = "SEVERITY_NUMBER_FATAL2"] = 22;
                values[valuesById[23] = "SEVERITY_NUMBER_FATAL3"] = 23;
                values[valuesById[24] = "SEVERITY_NUMBER_FATAL4"] = 24;
                return values;
              }();
              v1.LogRecordFlags = function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "LOG_RECORD_FLAGS_DO_NOT_USE"] = 0;
                values[valuesById[255] = "LOG_RECORD_FLAGS_TRACE_FLAGS_MASK"] = 255;
                return values;
              }();
              v1.LogRecord = function() {
                function LogRecord2(properties) {
                  this.attributes = [];
                  if (properties) {
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                      if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
                  }
                }
                LogRecord2.prototype.timeUnixNano = null;
                LogRecord2.prototype.observedTimeUnixNano = null;
                LogRecord2.prototype.severityNumber = null;
                LogRecord2.prototype.severityText = null;
                LogRecord2.prototype.body = null;
                LogRecord2.prototype.attributes = $util.emptyArray;
                LogRecord2.prototype.droppedAttributesCount = null;
                LogRecord2.prototype.flags = null;
                LogRecord2.prototype.traceId = null;
                LogRecord2.prototype.spanId = null;
                LogRecord2.create = function create(properties) {
                  return new LogRecord2(properties);
                };
                LogRecord2.encode = function encode(message, writer) {
                  if (!writer)
                    writer = $Writer.create();
                  if (message.timeUnixNano != null && Object.hasOwnProperty.call(message, "timeUnixNano"))
                    writer.uint32(
                      /* id 1, wireType 1 =*/
                      9
                    ).fixed64(message.timeUnixNano);
                  if (message.severityNumber != null && Object.hasOwnProperty.call(message, "severityNumber"))
                    writer.uint32(
                      /* id 2, wireType 0 =*/
                      16
                    ).int32(message.severityNumber);
                  if (message.severityText != null && Object.hasOwnProperty.call(message, "severityText"))
                    writer.uint32(
                      /* id 3, wireType 2 =*/
                      26
                    ).string(message.severityText);
                  if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                    $root.opentelemetry.proto.common.v1.AnyValue.encode(message.body, writer.uint32(
                      /* id 5, wireType 2 =*/
                      42
                    ).fork()).ldelim();
                  if (message.attributes != null && message.attributes.length)
                    for (var i = 0; i < message.attributes.length; ++i)
                      $root.opentelemetry.proto.common.v1.KeyValue.encode(message.attributes[i], writer.uint32(
                        /* id 6, wireType 2 =*/
                        50
                      ).fork()).ldelim();
                  if (message.droppedAttributesCount != null && Object.hasOwnProperty.call(message, "droppedAttributesCount"))
                    writer.uint32(
                      /* id 7, wireType 0 =*/
                      56
                    ).uint32(message.droppedAttributesCount);
                  if (message.flags != null && Object.hasOwnProperty.call(message, "flags"))
                    writer.uint32(
                      /* id 8, wireType 5 =*/
                      69
                    ).fixed32(message.flags);
                  if (message.traceId != null && Object.hasOwnProperty.call(message, "traceId"))
                    writer.uint32(
                      /* id 9, wireType 2 =*/
                      74
                    ).bytes(message.traceId);
                  if (message.spanId != null && Object.hasOwnProperty.call(message, "spanId"))
                    writer.uint32(
                      /* id 10, wireType 2 =*/
                      82
                    ).bytes(message.spanId);
                  if (message.observedTimeUnixNano != null && Object.hasOwnProperty.call(message, "observedTimeUnixNano"))
                    writer.uint32(
                      /* id 11, wireType 1 =*/
                      89
                    ).fixed64(message.observedTimeUnixNano);
                  return writer;
                };
                LogRecord2.encodeDelimited = function encodeDelimited(message, writer) {
                  return this.encode(message, writer).ldelim();
                };
                LogRecord2.decode = function decode(reader, length) {
                  if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                  var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.opentelemetry.proto.logs.v1.LogRecord();
                  while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                      case 1: {
                        message.timeUnixNano = reader.fixed64();
                        break;
                      }
                      case 11: {
                        message.observedTimeUnixNano = reader.fixed64();
                        break;
                      }
                      case 2: {
                        message.severityNumber = reader.int32();
                        break;
                      }
                      case 3: {
                        message.severityText = reader.string();
                        break;
                      }
                      case 5: {
                        message.body = $root.opentelemetry.proto.common.v1.AnyValue.decode(reader, reader.uint32());
                        break;
                      }
                      case 6: {
                        if (!(message.attributes && message.attributes.length))
                          message.attributes = [];
                        message.attributes.push($root.opentelemetry.proto.common.v1.KeyValue.decode(reader, reader.uint32()));
                        break;
                      }
                      case 7: {
                        message.droppedAttributesCount = reader.uint32();
                        break;
                      }
                      case 8: {
                        message.flags = reader.fixed32();
                        break;
                      }
                      case 9: {
                        message.traceId = reader.bytes();
                        break;
                      }
                      case 10: {
                        message.spanId = reader.bytes();
                        break;
                      }
                      default:
                        reader.skipType(tag & 7);
                        break;
                    }
                  }
                  return message;
                };
                LogRecord2.decodeDelimited = function decodeDelimited(reader) {
                  if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                  return this.decode(reader, reader.uint32());
                };
                LogRecord2.verify = function verify(message) {
                  if (typeof message !== "object" || message === null)
                    return "object expected";
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano")) {
                    if (!$util.isInteger(message.timeUnixNano) && !(message.timeUnixNano && $util.isInteger(message.timeUnixNano.low) && $util.isInteger(message.timeUnixNano.high)))
                      return "timeUnixNano: integer|Long expected";
                  }
                  if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano")) {
                    if (!$util.isInteger(message.observedTimeUnixNano) && !(message.observedTimeUnixNano && $util.isInteger(message.observedTimeUnixNano.low) && $util.isInteger(message.observedTimeUnixNano.high)))
                      return "observedTimeUnixNano: integer|Long expected";
                  }
                  if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                    switch (message.severityNumber) {
                      default:
                        return "severityNumber: enum value expected";
                      case 0:
                      case 1:
                      case 2:
                      case 3:
                      case 4:
                      case 5:
                      case 6:
                      case 7:
                      case 8:
                      case 9:
                      case 10:
                      case 11:
                      case 12:
                      case 13:
                      case 14:
                      case 15:
                      case 16:
                      case 17:
                      case 18:
                      case 19:
                      case 20:
                      case 21:
                      case 22:
                      case 23:
                      case 24:
                        break;
                    }
                  if (message.severityText != null && message.hasOwnProperty("severityText")) {
                    if (!$util.isString(message.severityText))
                      return "severityText: string expected";
                  }
                  if (message.body != null && message.hasOwnProperty("body")) {
                    var error = $root.opentelemetry.proto.common.v1.AnyValue.verify(message.body);
                    if (error)
                      return "body." + error;
                  }
                  if (message.attributes != null && message.hasOwnProperty("attributes")) {
                    if (!Array.isArray(message.attributes))
                      return "attributes: array expected";
                    for (var i = 0; i < message.attributes.length; ++i) {
                      var error = $root.opentelemetry.proto.common.v1.KeyValue.verify(message.attributes[i]);
                      if (error)
                        return "attributes." + error;
                    }
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount")) {
                    if (!$util.isInteger(message.droppedAttributesCount))
                      return "droppedAttributesCount: integer expected";
                  }
                  if (message.flags != null && message.hasOwnProperty("flags")) {
                    if (!$util.isInteger(message.flags))
                      return "flags: integer expected";
                  }
                  if (message.traceId != null && message.hasOwnProperty("traceId")) {
                    if (!(message.traceId && typeof message.traceId.length === "number" || $util.isString(message.traceId)))
                      return "traceId: buffer expected";
                  }
                  if (message.spanId != null && message.hasOwnProperty("spanId")) {
                    if (!(message.spanId && typeof message.spanId.length === "number" || $util.isString(message.spanId)))
                      return "spanId: buffer expected";
                  }
                  return null;
                };
                LogRecord2.fromObject = function fromObject(object) {
                  if (object instanceof $root.opentelemetry.proto.logs.v1.LogRecord)
                    return object;
                  var message = new $root.opentelemetry.proto.logs.v1.LogRecord();
                  if (object.timeUnixNano != null) {
                    if ($util.Long)
                      (message.timeUnixNano = $util.Long.fromValue(object.timeUnixNano)).unsigned = false;
                    else if (typeof object.timeUnixNano === "string")
                      message.timeUnixNano = parseInt(object.timeUnixNano, 10);
                    else if (typeof object.timeUnixNano === "number")
                      message.timeUnixNano = object.timeUnixNano;
                    else if (typeof object.timeUnixNano === "object")
                      message.timeUnixNano = new $util.LongBits(object.timeUnixNano.low >>> 0, object.timeUnixNano.high >>> 0).toNumber();
                  }
                  if (object.observedTimeUnixNano != null) {
                    if ($util.Long)
                      (message.observedTimeUnixNano = $util.Long.fromValue(object.observedTimeUnixNano)).unsigned = false;
                    else if (typeof object.observedTimeUnixNano === "string")
                      message.observedTimeUnixNano = parseInt(object.observedTimeUnixNano, 10);
                    else if (typeof object.observedTimeUnixNano === "number")
                      message.observedTimeUnixNano = object.observedTimeUnixNano;
                    else if (typeof object.observedTimeUnixNano === "object")
                      message.observedTimeUnixNano = new $util.LongBits(object.observedTimeUnixNano.low >>> 0, object.observedTimeUnixNano.high >>> 0).toNumber();
                  }
                  switch (object.severityNumber) {
                    default:
                      if (typeof object.severityNumber === "number") {
                        message.severityNumber = object.severityNumber;
                        break;
                      }
                      break;
                    case "SEVERITY_NUMBER_UNSPECIFIED":
                    case 0:
                      message.severityNumber = 0;
                      break;
                    case "SEVERITY_NUMBER_TRACE":
                    case 1:
                      message.severityNumber = 1;
                      break;
                    case "SEVERITY_NUMBER_TRACE2":
                    case 2:
                      message.severityNumber = 2;
                      break;
                    case "SEVERITY_NUMBER_TRACE3":
                    case 3:
                      message.severityNumber = 3;
                      break;
                    case "SEVERITY_NUMBER_TRACE4":
                    case 4:
                      message.severityNumber = 4;
                      break;
                    case "SEVERITY_NUMBER_DEBUG":
                    case 5:
                      message.severityNumber = 5;
                      break;
                    case "SEVERITY_NUMBER_DEBUG2":
                    case 6:
                      message.severityNumber = 6;
                      break;
                    case "SEVERITY_NUMBER_DEBUG3":
                    case 7:
                      message.severityNumber = 7;
                      break;
                    case "SEVERITY_NUMBER_DEBUG4":
                    case 8:
                      message.severityNumber = 8;
                      break;
                    case "SEVERITY_NUMBER_INFO":
                    case 9:
                      message.severityNumber = 9;
                      break;
                    case "SEVERITY_NUMBER_INFO2":
                    case 10:
                      message.severityNumber = 10;
                      break;
                    case "SEVERITY_NUMBER_INFO3":
                    case 11:
                      message.severityNumber = 11;
                      break;
                    case "SEVERITY_NUMBER_INFO4":
                    case 12:
                      message.severityNumber = 12;
                      break;
                    case "SEVERITY_NUMBER_WARN":
                    case 13:
                      message.severityNumber = 13;
                      break;
                    case "SEVERITY_NUMBER_WARN2":
                    case 14:
                      message.severityNumber = 14;
                      break;
                    case "SEVERITY_NUMBER_WARN3":
                    case 15:
                      message.severityNumber = 15;
                      break;
                    case "SEVERITY_NUMBER_WARN4":
                    case 16:
                      message.severityNumber = 16;
                      break;
                    case "SEVERITY_NUMBER_ERROR":
                    case 17:
                      message.severityNumber = 17;
                      break;
                    case "SEVERITY_NUMBER_ERROR2":
                    case 18:
                      message.severityNumber = 18;
                      break;
                    case "SEVERITY_NUMBER_ERROR3":
                    case 19:
                      message.severityNumber = 19;
                      break;
                    case "SEVERITY_NUMBER_ERROR4":
                    case 20:
                      message.severityNumber = 20;
                      break;
                    case "SEVERITY_NUMBER_FATAL":
                    case 21:
                      message.severityNumber = 21;
                      break;
                    case "SEVERITY_NUMBER_FATAL2":
                    case 22:
                      message.severityNumber = 22;
                      break;
                    case "SEVERITY_NUMBER_FATAL3":
                    case 23:
                      message.severityNumber = 23;
                      break;
                    case "SEVERITY_NUMBER_FATAL4":
                    case 24:
                      message.severityNumber = 24;
                      break;
                  }
                  if (object.severityText != null)
                    message.severityText = String(object.severityText);
                  if (object.body != null) {
                    if (typeof object.body !== "object")
                      throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.body: object expected");
                    message.body = $root.opentelemetry.proto.common.v1.AnyValue.fromObject(object.body);
                  }
                  if (object.attributes) {
                    if (!Array.isArray(object.attributes))
                      throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: array expected");
                    message.attributes = [];
                    for (var i = 0; i < object.attributes.length; ++i) {
                      if (typeof object.attributes[i] !== "object")
                        throw TypeError(".opentelemetry.proto.logs.v1.LogRecord.attributes: object expected");
                      message.attributes[i] = $root.opentelemetry.proto.common.v1.KeyValue.fromObject(object.attributes[i]);
                    }
                  }
                  if (object.droppedAttributesCount != null)
                    message.droppedAttributesCount = object.droppedAttributesCount >>> 0;
                  if (object.flags != null)
                    message.flags = object.flags >>> 0;
                  if (object.traceId != null) {
                    if (typeof object.traceId === "string")
                      $util.base64.decode(object.traceId, message.traceId = $util.newBuffer($util.base64.length(object.traceId)), 0);
                    else if (object.traceId.length >= 0)
                      message.traceId = object.traceId;
                  }
                  if (object.spanId != null) {
                    if (typeof object.spanId === "string")
                      $util.base64.decode(object.spanId, message.spanId = $util.newBuffer($util.base64.length(object.spanId)), 0);
                    else if (object.spanId.length >= 0)
                      message.spanId = object.spanId;
                  }
                  return message;
                };
                LogRecord2.toObject = function toObject(message, options) {
                  if (!options)
                    options = {};
                  var object = {};
                  if (options.arrays || options.defaults)
                    object.attributes = [];
                  if (options.defaults) {
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.timeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.timeUnixNano = options.longs === String ? "0" : 0;
                    object.severityNumber = options.enums === String ? "SEVERITY_NUMBER_UNSPECIFIED" : 0;
                    object.severityText = "";
                    object.body = null;
                    object.droppedAttributesCount = 0;
                    object.flags = 0;
                    if (options.bytes === String)
                      object.traceId = "";
                    else {
                      object.traceId = [];
                      if (options.bytes !== Array)
                        object.traceId = $util.newBuffer(object.traceId);
                    }
                    if (options.bytes === String)
                      object.spanId = "";
                    else {
                      object.spanId = [];
                      if (options.bytes !== Array)
                        object.spanId = $util.newBuffer(object.spanId);
                    }
                    if ($util.Long) {
                      var long = new $util.Long(0, 0, false);
                      object.observedTimeUnixNano = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                      object.observedTimeUnixNano = options.longs === String ? "0" : 0;
                  }
                  if (message.timeUnixNano != null && message.hasOwnProperty("timeUnixNano"))
                    if (typeof message.timeUnixNano === "number")
                      object.timeUnixNano = options.longs === String ? String(message.timeUnixNano) : message.timeUnixNano;
                    else
                      object.timeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.timeUnixNano) : options.longs === Number ? new $util.LongBits(message.timeUnixNano.low >>> 0, message.timeUnixNano.high >>> 0).toNumber() : message.timeUnixNano;
                  if (message.severityNumber != null && message.hasOwnProperty("severityNumber"))
                    object.severityNumber = options.enums === String ? $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] === void 0 ? message.severityNumber : $root.opentelemetry.proto.logs.v1.SeverityNumber[message.severityNumber] : message.severityNumber;
                  if (message.severityText != null && message.hasOwnProperty("severityText"))
                    object.severityText = message.severityText;
                  if (message.body != null && message.hasOwnProperty("body"))
                    object.body = $root.opentelemetry.proto.common.v1.AnyValue.toObject(message.body, options);
                  if (message.attributes && message.attributes.length) {
                    object.attributes = [];
                    for (var j = 0; j < message.attributes.length; ++j)
                      object.attributes[j] = $root.opentelemetry.proto.common.v1.KeyValue.toObject(message.attributes[j], options);
                  }
                  if (message.droppedAttributesCount != null && message.hasOwnProperty("droppedAttributesCount"))
                    object.droppedAttributesCount = message.droppedAttributesCount;
                  if (message.flags != null && message.hasOwnProperty("flags"))
                    object.flags = message.flags;
                  if (message.traceId != null && message.hasOwnProperty("traceId"))
                    object.traceId = options.bytes === String ? $util.base64.encode(message.traceId, 0, message.traceId.length) : options.bytes === Array ? Array.prototype.slice.call(message.traceId) : message.traceId;
                  if (message.spanId != null && message.hasOwnProperty("spanId"))
                    object.spanId = options.bytes === String ? $util.base64.encode(message.spanId, 0, message.spanId.length) : options.bytes === Array ? Array.prototype.slice.call(message.spanId) : message.spanId;
                  if (message.observedTimeUnixNano != null && message.hasOwnProperty("observedTimeUnixNano"))
                    if (typeof message.observedTimeUnixNano === "number")
                      object.observedTimeUnixNano = options.longs === String ? String(message.observedTimeUnixNano) : message.observedTimeUnixNano;
                    else
                      object.observedTimeUnixNano = options.longs === String ? $util.Long.prototype.toString.call(message.observedTimeUnixNano) : options.longs === Number ? new $util.LongBits(message.observedTimeUnixNano.low >>> 0, message.observedTimeUnixNano.high >>> 0).toNumber() : message.observedTimeUnixNano;
                  return object;
                };
                LogRecord2.prototype.toJSON = function toJSON() {
                  return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };
                LogRecord2.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                  if (typeUrlPrefix === void 0) {
                    typeUrlPrefix = "type.googleapis.com";
                  }
                  return typeUrlPrefix + "/opentelemetry.proto.logs.v1.LogRecord";
                };
                return LogRecord2;
              }();
              return v1;
            }();
            return logs2;
          }();
          return proto;
        }();
        return opentelemetry2;
      }();
      module2.exports = $root;
    }
  });

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/platform/browser/globalThis.js
  var _globalThis = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/version.js
  var VERSION = "1.8.0";

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/internal/semver.js
  var re = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
  function _makeCompatibilityCheck(ownVersion) {
    var acceptedVersions = /* @__PURE__ */ new Set([ownVersion]);
    var rejectedVersions = /* @__PURE__ */ new Set();
    var myVersionMatch = ownVersion.match(re);
    if (!myVersionMatch) {
      return function() {
        return false;
      };
    }
    var ownVersionParsed = {
      major: +myVersionMatch[1],
      minor: +myVersionMatch[2],
      patch: +myVersionMatch[3],
      prerelease: myVersionMatch[4]
    };
    if (ownVersionParsed.prerelease != null) {
      return function isExactmatch(globalVersion) {
        return globalVersion === ownVersion;
      };
    }
    function _reject(v) {
      rejectedVersions.add(v);
      return false;
    }
    function _accept(v) {
      acceptedVersions.add(v);
      return true;
    }
    return function isCompatible2(globalVersion) {
      if (acceptedVersions.has(globalVersion)) {
        return true;
      }
      if (rejectedVersions.has(globalVersion)) {
        return false;
      }
      var globalVersionMatch = globalVersion.match(re);
      if (!globalVersionMatch) {
        return _reject(globalVersion);
      }
      var globalVersionParsed = {
        major: +globalVersionMatch[1],
        minor: +globalVersionMatch[2],
        patch: +globalVersionMatch[3],
        prerelease: globalVersionMatch[4]
      };
      if (globalVersionParsed.prerelease != null) {
        return _reject(globalVersion);
      }
      if (ownVersionParsed.major !== globalVersionParsed.major) {
        return _reject(globalVersion);
      }
      if (ownVersionParsed.major === 0) {
        if (ownVersionParsed.minor === globalVersionParsed.minor && ownVersionParsed.patch <= globalVersionParsed.patch) {
          return _accept(globalVersion);
        }
        return _reject(globalVersion);
      }
      if (ownVersionParsed.minor <= globalVersionParsed.minor) {
        return _accept(globalVersion);
      }
      return _reject(globalVersion);
    };
  }
  var isCompatible = _makeCompatibilityCheck(VERSION);

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/internal/global-utils.js
  var major = VERSION.split(".")[0];
  var GLOBAL_OPENTELEMETRY_API_KEY = Symbol.for("opentelemetry.js.api." + major);
  var _global = _globalThis;
  function registerGlobal(type, instance, diag3, allowOverride) {
    var _a3;
    if (allowOverride === void 0) {
      allowOverride = false;
    }
    var api = _global[GLOBAL_OPENTELEMETRY_API_KEY] = (_a3 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) !== null && _a3 !== void 0 ? _a3 : {
      version: VERSION
    };
    if (!allowOverride && api[type]) {
      var err = new Error("@opentelemetry/api: Attempted duplicate registration of API: " + type);
      diag3.error(err.stack || err.message);
      return false;
    }
    if (api.version !== VERSION) {
      var err = new Error("@opentelemetry/api: Registration of version v" + api.version + " for " + type + " does not match previously registered API v" + VERSION);
      diag3.error(err.stack || err.message);
      return false;
    }
    api[type] = instance;
    diag3.debug("@opentelemetry/api: Registered a global for " + type + " v" + VERSION + ".");
    return true;
  }
  function getGlobal(type) {
    var _a3, _b;
    var globalVersion = (_a3 = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _a3 === void 0 ? void 0 : _a3.version;
    if (!globalVersion || !isCompatible(globalVersion)) {
      return;
    }
    return (_b = _global[GLOBAL_OPENTELEMETRY_API_KEY]) === null || _b === void 0 ? void 0 : _b[type];
  }
  function unregisterGlobal(type, diag3) {
    diag3.debug("@opentelemetry/api: Unregistering a global for " + type + " v" + VERSION + ".");
    var api = _global[GLOBAL_OPENTELEMETRY_API_KEY];
    if (api) {
      delete api[type];
    }
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/diag/ComponentLogger.js
  var __read = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var DiagComponentLogger = (
    /** @class */
    function() {
      function DiagComponentLogger2(props) {
        this._namespace = props.namespace || "DiagComponentLogger";
      }
      DiagComponentLogger2.prototype.debug = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("debug", this._namespace, args);
      };
      DiagComponentLogger2.prototype.error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("error", this._namespace, args);
      };
      DiagComponentLogger2.prototype.info = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("info", this._namespace, args);
      };
      DiagComponentLogger2.prototype.warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("warn", this._namespace, args);
      };
      DiagComponentLogger2.prototype.verbose = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return logProxy("verbose", this._namespace, args);
      };
      return DiagComponentLogger2;
    }()
  );
  function logProxy(funcName, namespace, args) {
    var logger = getGlobal("diag");
    if (!logger) {
      return;
    }
    args.unshift(namespace);
    return logger[funcName].apply(logger, __spreadArray([], __read(args), false));
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/diag/types.js
  var DiagLogLevel;
  (function(DiagLogLevel2) {
    DiagLogLevel2[DiagLogLevel2["NONE"] = 0] = "NONE";
    DiagLogLevel2[DiagLogLevel2["ERROR"] = 30] = "ERROR";
    DiagLogLevel2[DiagLogLevel2["WARN"] = 50] = "WARN";
    DiagLogLevel2[DiagLogLevel2["INFO"] = 60] = "INFO";
    DiagLogLevel2[DiagLogLevel2["DEBUG"] = 70] = "DEBUG";
    DiagLogLevel2[DiagLogLevel2["VERBOSE"] = 80] = "VERBOSE";
    DiagLogLevel2[DiagLogLevel2["ALL"] = 9999] = "ALL";
  })(DiagLogLevel || (DiagLogLevel = {}));

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/diag/internal/logLevelLogger.js
  function createLogLevelDiagLogger(maxLevel, logger) {
    if (maxLevel < DiagLogLevel.NONE) {
      maxLevel = DiagLogLevel.NONE;
    } else if (maxLevel > DiagLogLevel.ALL) {
      maxLevel = DiagLogLevel.ALL;
    }
    logger = logger || {};
    function _filterFunc(funcName, theLevel) {
      var theFunc = logger[funcName];
      if (typeof theFunc === "function" && maxLevel >= theLevel) {
        return theFunc.bind(logger);
      }
      return function() {
      };
    }
    return {
      error: _filterFunc("error", DiagLogLevel.ERROR),
      warn: _filterFunc("warn", DiagLogLevel.WARN),
      info: _filterFunc("info", DiagLogLevel.INFO),
      debug: _filterFunc("debug", DiagLogLevel.DEBUG),
      verbose: _filterFunc("verbose", DiagLogLevel.VERBOSE)
    };
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/api/diag.js
  var __read2 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray2 = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var API_NAME = "diag";
  var DiagAPI = (
    /** @class */
    function() {
      function DiagAPI2() {
        function _logProxy(funcName) {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var logger = getGlobal("diag");
            if (!logger)
              return;
            return logger[funcName].apply(logger, __spreadArray2([], __read2(args), false));
          };
        }
        var self2 = this;
        var setLogger = function(logger, optionsOrLogLevel) {
          var _a3, _b, _c;
          if (optionsOrLogLevel === void 0) {
            optionsOrLogLevel = { logLevel: DiagLogLevel.INFO };
          }
          if (logger === self2) {
            var err = new Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
            self2.error((_a3 = err.stack) !== null && _a3 !== void 0 ? _a3 : err.message);
            return false;
          }
          if (typeof optionsOrLogLevel === "number") {
            optionsOrLogLevel = {
              logLevel: optionsOrLogLevel
            };
          }
          var oldLogger = getGlobal("diag");
          var newLogger = createLogLevelDiagLogger((_b = optionsOrLogLevel.logLevel) !== null && _b !== void 0 ? _b : DiagLogLevel.INFO, logger);
          if (oldLogger && !optionsOrLogLevel.suppressOverrideMessage) {
            var stack = (_c = new Error().stack) !== null && _c !== void 0 ? _c : "<failed to generate stacktrace>";
            oldLogger.warn("Current logger will be overwritten from " + stack);
            newLogger.warn("Current logger will overwrite one already registered from " + stack);
          }
          return registerGlobal("diag", newLogger, self2, true);
        };
        self2.setLogger = setLogger;
        self2.disable = function() {
          unregisterGlobal(API_NAME, self2);
        };
        self2.createComponentLogger = function(options) {
          return new DiagComponentLogger(options);
        };
        self2.verbose = _logProxy("verbose");
        self2.debug = _logProxy("debug");
        self2.info = _logProxy("info");
        self2.warn = _logProxy("warn");
        self2.error = _logProxy("error");
      }
      DiagAPI2.instance = function() {
        if (!this._instance) {
          this._instance = new DiagAPI2();
        }
        return this._instance;
      };
      return DiagAPI2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/baggage/internal/baggage-impl.js
  var __read3 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __values = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var BaggageImpl = (
    /** @class */
    function() {
      function BaggageImpl2(entries) {
        this._entries = entries ? new Map(entries) : /* @__PURE__ */ new Map();
      }
      BaggageImpl2.prototype.getEntry = function(key) {
        var entry = this._entries.get(key);
        if (!entry) {
          return void 0;
        }
        return Object.assign({}, entry);
      };
      BaggageImpl2.prototype.getAllEntries = function() {
        return Array.from(this._entries.entries()).map(function(_a3) {
          var _b = __read3(_a3, 2), k = _b[0], v = _b[1];
          return [k, v];
        });
      };
      BaggageImpl2.prototype.setEntry = function(key, entry) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.set(key, entry);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntry = function(key) {
        var newBaggage = new BaggageImpl2(this._entries);
        newBaggage._entries.delete(key);
        return newBaggage;
      };
      BaggageImpl2.prototype.removeEntries = function() {
        var e_1, _a3;
        var keys = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          keys[_i] = arguments[_i];
        }
        var newBaggage = new BaggageImpl2(this._entries);
        try {
          for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
            var key = keys_1_1.value;
            newBaggage._entries.delete(key);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (keys_1_1 && !keys_1_1.done && (_a3 = keys_1.return))
              _a3.call(keys_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return newBaggage;
      };
      BaggageImpl2.prototype.clear = function() {
        return new BaggageImpl2();
      };
      return BaggageImpl2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/baggage/internal/symbol.js
  var baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/baggage/utils.js
  var diag = DiagAPI.instance();
  function createBaggage(entries) {
    if (entries === void 0) {
      entries = {};
    }
    return new BaggageImpl(new Map(Object.entries(entries)));
  }
  function baggageEntryMetadataFromString(str) {
    if (typeof str !== "string") {
      diag.error("Cannot create baggage metadata from unknown type: " + typeof str);
      str = "";
    }
    return {
      __TYPE__: baggageEntryMetadataSymbol,
      toString: function() {
        return str;
      }
    };
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/context/context.js
  function createContextKey(description) {
    return Symbol.for(description);
  }
  var BaseContext = (
    /** @class */
    /* @__PURE__ */ function() {
      function BaseContext2(parentContext) {
        var self2 = this;
        self2._currentContext = parentContext ? new Map(parentContext) : /* @__PURE__ */ new Map();
        self2.getValue = function(key) {
          return self2._currentContext.get(key);
        };
        self2.setValue = function(key, value) {
          var context2 = new BaseContext2(self2._currentContext);
          context2._currentContext.set(key, value);
          return context2;
        };
        self2.deleteValue = function(key) {
          var context2 = new BaseContext2(self2._currentContext);
          context2._currentContext.delete(key);
          return context2;
        };
      }
      return BaseContext2;
    }()
  );
  var ROOT_CONTEXT = new BaseContext();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/metrics/NoopMeter.js
  var __extends = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var NoopMeter = (
    /** @class */
    function() {
      function NoopMeter2() {
      }
      NoopMeter2.prototype.createHistogram = function(_name, _options) {
        return NOOP_HISTOGRAM_METRIC;
      };
      NoopMeter2.prototype.createCounter = function(_name, _options) {
        return NOOP_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createUpDownCounter = function(_name, _options) {
        return NOOP_UP_DOWN_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createObservableGauge = function(_name, _options) {
        return NOOP_OBSERVABLE_GAUGE_METRIC;
      };
      NoopMeter2.prototype.createObservableCounter = function(_name, _options) {
        return NOOP_OBSERVABLE_COUNTER_METRIC;
      };
      NoopMeter2.prototype.createObservableUpDownCounter = function(_name, _options) {
        return NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
      };
      NoopMeter2.prototype.addBatchObservableCallback = function(_callback, _observables) {
      };
      NoopMeter2.prototype.removeBatchObservableCallback = function(_callback) {
      };
      return NoopMeter2;
    }()
  );
  var NoopMetric = (
    /** @class */
    /* @__PURE__ */ function() {
      function NoopMetric2() {
      }
      return NoopMetric2;
    }()
  );
  var NoopCounterMetric = (
    /** @class */
    function(_super) {
      __extends(NoopCounterMetric2, _super);
      function NoopCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopCounterMetric2.prototype.add = function(_value, _attributes) {
      };
      return NoopCounterMetric2;
    }(NoopMetric)
  );
  var NoopUpDownCounterMetric = (
    /** @class */
    function(_super) {
      __extends(NoopUpDownCounterMetric2, _super);
      function NoopUpDownCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopUpDownCounterMetric2.prototype.add = function(_value, _attributes) {
      };
      return NoopUpDownCounterMetric2;
    }(NoopMetric)
  );
  var NoopHistogramMetric = (
    /** @class */
    function(_super) {
      __extends(NoopHistogramMetric2, _super);
      function NoopHistogramMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      NoopHistogramMetric2.prototype.record = function(_value, _attributes) {
      };
      return NoopHistogramMetric2;
    }(NoopMetric)
  );
  var NoopObservableMetric = (
    /** @class */
    function() {
      function NoopObservableMetric2() {
      }
      NoopObservableMetric2.prototype.addCallback = function(_callback) {
      };
      NoopObservableMetric2.prototype.removeCallback = function(_callback) {
      };
      return NoopObservableMetric2;
    }()
  );
  var NoopObservableCounterMetric = (
    /** @class */
    function(_super) {
      __extends(NoopObservableCounterMetric2, _super);
      function NoopObservableCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableCounterMetric2;
    }(NoopObservableMetric)
  );
  var NoopObservableGaugeMetric = (
    /** @class */
    function(_super) {
      __extends(NoopObservableGaugeMetric2, _super);
      function NoopObservableGaugeMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableGaugeMetric2;
    }(NoopObservableMetric)
  );
  var NoopObservableUpDownCounterMetric = (
    /** @class */
    function(_super) {
      __extends(NoopObservableUpDownCounterMetric2, _super);
      function NoopObservableUpDownCounterMetric2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return NoopObservableUpDownCounterMetric2;
    }(NoopObservableMetric)
  );
  var NOOP_METER = new NoopMeter();
  var NOOP_COUNTER_METRIC = new NoopCounterMetric();
  var NOOP_HISTOGRAM_METRIC = new NoopHistogramMetric();
  var NOOP_UP_DOWN_COUNTER_METRIC = new NoopUpDownCounterMetric();
  var NOOP_OBSERVABLE_COUNTER_METRIC = new NoopObservableCounterMetric();
  var NOOP_OBSERVABLE_GAUGE_METRIC = new NoopObservableGaugeMetric();
  var NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new NoopObservableUpDownCounterMetric();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/propagation/TextMapPropagator.js
  var defaultTextMapGetter = {
    get: function(carrier, key) {
      if (carrier == null) {
        return void 0;
      }
      return carrier[key];
    },
    keys: function(carrier) {
      if (carrier == null) {
        return [];
      }
      return Object.keys(carrier);
    }
  };
  var defaultTextMapSetter = {
    set: function(carrier, key, value) {
      if (carrier == null) {
        return;
      }
      carrier[key] = value;
    }
  };

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/context/NoopContextManager.js
  var __read4 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray3 = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var NoopContextManager = (
    /** @class */
    function() {
      function NoopContextManager2() {
      }
      NoopContextManager2.prototype.active = function() {
        return ROOT_CONTEXT;
      };
      NoopContextManager2.prototype.with = function(_context, fn, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return fn.call.apply(fn, __spreadArray3([thisArg], __read4(args), false));
      };
      NoopContextManager2.prototype.bind = function(_context, target) {
        return target;
      };
      NoopContextManager2.prototype.enable = function() {
        return this;
      };
      NoopContextManager2.prototype.disable = function() {
        return this;
      };
      return NoopContextManager2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/api/context.js
  var __read5 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray4 = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var API_NAME2 = "context";
  var NOOP_CONTEXT_MANAGER = new NoopContextManager();
  var ContextAPI = (
    /** @class */
    function() {
      function ContextAPI2() {
      }
      ContextAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new ContextAPI2();
        }
        return this._instance;
      };
      ContextAPI2.prototype.setGlobalContextManager = function(contextManager) {
        return registerGlobal(API_NAME2, contextManager, DiagAPI.instance());
      };
      ContextAPI2.prototype.active = function() {
        return this._getContextManager().active();
      };
      ContextAPI2.prototype.with = function(context2, fn, thisArg) {
        var _a3;
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        return (_a3 = this._getContextManager()).with.apply(_a3, __spreadArray4([context2, fn, thisArg], __read5(args), false));
      };
      ContextAPI2.prototype.bind = function(context2, target) {
        return this._getContextManager().bind(context2, target);
      };
      ContextAPI2.prototype._getContextManager = function() {
        return getGlobal(API_NAME2) || NOOP_CONTEXT_MANAGER;
      };
      ContextAPI2.prototype.disable = function() {
        this._getContextManager().disable();
        unregisterGlobal(API_NAME2, DiagAPI.instance());
      };
      return ContextAPI2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/trace_flags.js
  var TraceFlags;
  (function(TraceFlags2) {
    TraceFlags2[TraceFlags2["NONE"] = 0] = "NONE";
    TraceFlags2[TraceFlags2["SAMPLED"] = 1] = "SAMPLED";
  })(TraceFlags || (TraceFlags = {}));

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/invalid-span-constants.js
  var INVALID_SPANID = "0000000000000000";
  var INVALID_TRACEID = "00000000000000000000000000000000";
  var INVALID_SPAN_CONTEXT = {
    traceId: INVALID_TRACEID,
    spanId: INVALID_SPANID,
    traceFlags: TraceFlags.NONE
  };

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/NonRecordingSpan.js
  var NonRecordingSpan = (
    /** @class */
    function() {
      function NonRecordingSpan2(_spanContext) {
        if (_spanContext === void 0) {
          _spanContext = INVALID_SPAN_CONTEXT;
        }
        this._spanContext = _spanContext;
      }
      NonRecordingSpan2.prototype.spanContext = function() {
        return this._spanContext;
      };
      NonRecordingSpan2.prototype.setAttribute = function(_key, _value) {
        return this;
      };
      NonRecordingSpan2.prototype.setAttributes = function(_attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.addEvent = function(_name, _attributes) {
        return this;
      };
      NonRecordingSpan2.prototype.setStatus = function(_status) {
        return this;
      };
      NonRecordingSpan2.prototype.updateName = function(_name) {
        return this;
      };
      NonRecordingSpan2.prototype.end = function(_endTime) {
      };
      NonRecordingSpan2.prototype.isRecording = function() {
        return false;
      };
      NonRecordingSpan2.prototype.recordException = function(_exception, _time) {
      };
      return NonRecordingSpan2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/context-utils.js
  var SPAN_KEY = createContextKey("OpenTelemetry Context Key SPAN");
  function getSpan(context2) {
    return context2.getValue(SPAN_KEY) || void 0;
  }
  function getActiveSpan() {
    return getSpan(ContextAPI.getInstance().active());
  }
  function setSpan(context2, span) {
    return context2.setValue(SPAN_KEY, span);
  }
  function deleteSpan(context2) {
    return context2.deleteValue(SPAN_KEY);
  }
  function setSpanContext(context2, spanContext) {
    return setSpan(context2, new NonRecordingSpan(spanContext));
  }
  function getSpanContext(context2) {
    var _a3;
    return (_a3 = getSpan(context2)) === null || _a3 === void 0 ? void 0 : _a3.spanContext();
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/spancontext-utils.js
  var VALID_TRACEID_REGEX = /^([0-9a-f]{32})$/i;
  var VALID_SPANID_REGEX = /^[0-9a-f]{16}$/i;
  function isValidTraceId(traceId) {
    return VALID_TRACEID_REGEX.test(traceId) && traceId !== INVALID_TRACEID;
  }
  function isValidSpanId(spanId) {
    return VALID_SPANID_REGEX.test(spanId) && spanId !== INVALID_SPANID;
  }
  function isSpanContextValid(spanContext) {
    return isValidTraceId(spanContext.traceId) && isValidSpanId(spanContext.spanId);
  }
  function wrapSpanContext(spanContext) {
    return new NonRecordingSpan(spanContext);
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracer.js
  var contextApi = ContextAPI.getInstance();
  var NoopTracer = (
    /** @class */
    function() {
      function NoopTracer2() {
      }
      NoopTracer2.prototype.startSpan = function(name, options, context2) {
        if (context2 === void 0) {
          context2 = contextApi.active();
        }
        var root2 = Boolean(options === null || options === void 0 ? void 0 : options.root);
        if (root2) {
          return new NonRecordingSpan();
        }
        var parentFromContext = context2 && getSpanContext(context2);
        if (isSpanContext(parentFromContext) && isSpanContextValid(parentFromContext)) {
          return new NonRecordingSpan(parentFromContext);
        } else {
          return new NonRecordingSpan();
        }
      };
      NoopTracer2.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : contextApi.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = setSpan(parentContext, span);
        return contextApi.with(contextWithSpanSet, fn, void 0, span);
      };
      return NoopTracer2;
    }()
  );
  function isSpanContext(spanContext) {
    return typeof spanContext === "object" && typeof spanContext["spanId"] === "string" && typeof spanContext["traceId"] === "string" && typeof spanContext["traceFlags"] === "number";
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracer.js
  var NOOP_TRACER = new NoopTracer();
  var ProxyTracer = (
    /** @class */
    function() {
      function ProxyTracer2(_provider, name, version, options) {
        this._provider = _provider;
        this.name = name;
        this.version = version;
        this.options = options;
      }
      ProxyTracer2.prototype.startSpan = function(name, options, context2) {
        return this._getTracer().startSpan(name, options, context2);
      };
      ProxyTracer2.prototype.startActiveSpan = function(_name, _options, _context, _fn) {
        var tracer = this._getTracer();
        return Reflect.apply(tracer.startActiveSpan, tracer, arguments);
      };
      ProxyTracer2.prototype._getTracer = function() {
        if (this._delegate) {
          return this._delegate;
        }
        var tracer = this._provider.getDelegateTracer(this.name, this.version, this.options);
        if (!tracer) {
          return NOOP_TRACER;
        }
        this._delegate = tracer;
        return this._delegate;
      };
      return ProxyTracer2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/NoopTracerProvider.js
  var NoopTracerProvider = (
    /** @class */
    function() {
      function NoopTracerProvider2() {
      }
      NoopTracerProvider2.prototype.getTracer = function(_name, _version, _options) {
        return new NoopTracer();
      };
      return NoopTracerProvider2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/ProxyTracerProvider.js
  var NOOP_TRACER_PROVIDER = new NoopTracerProvider();
  var ProxyTracerProvider = (
    /** @class */
    function() {
      function ProxyTracerProvider2() {
      }
      ProxyTracerProvider2.prototype.getTracer = function(name, version, options) {
        var _a3;
        return (_a3 = this.getDelegateTracer(name, version, options)) !== null && _a3 !== void 0 ? _a3 : new ProxyTracer(this, name, version, options);
      };
      ProxyTracerProvider2.prototype.getDelegate = function() {
        var _a3;
        return (_a3 = this._delegate) !== null && _a3 !== void 0 ? _a3 : NOOP_TRACER_PROVIDER;
      };
      ProxyTracerProvider2.prototype.setDelegate = function(delegate) {
        this._delegate = delegate;
      };
      ProxyTracerProvider2.prototype.getDelegateTracer = function(name, version, options) {
        var _a3;
        return (_a3 = this._delegate) === null || _a3 === void 0 ? void 0 : _a3.getTracer(name, version, options);
      };
      return ProxyTracerProvider2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/SamplingResult.js
  var SamplingDecision;
  (function(SamplingDecision3) {
    SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
    SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
    SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
  })(SamplingDecision || (SamplingDecision = {}));

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/span_kind.js
  var SpanKind;
  (function(SpanKind2) {
    SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
    SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
    SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
    SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
    SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
  })(SpanKind || (SpanKind = {}));

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace/status.js
  var SpanStatusCode;
  (function(SpanStatusCode2) {
    SpanStatusCode2[SpanStatusCode2["UNSET"] = 0] = "UNSET";
    SpanStatusCode2[SpanStatusCode2["OK"] = 1] = "OK";
    SpanStatusCode2[SpanStatusCode2["ERROR"] = 2] = "ERROR";
  })(SpanStatusCode || (SpanStatusCode = {}));

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/context-api.js
  var context = ContextAPI.getInstance();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/diag-api.js
  var diag2 = DiagAPI.instance();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/metrics/NoopMeterProvider.js
  var NoopMeterProvider = (
    /** @class */
    function() {
      function NoopMeterProvider2() {
      }
      NoopMeterProvider2.prototype.getMeter = function(_name, _version, _options) {
        return NOOP_METER;
      };
      return NoopMeterProvider2;
    }()
  );
  var NOOP_METER_PROVIDER = new NoopMeterProvider();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/api/metrics.js
  var API_NAME3 = "metrics";
  var MetricsAPI = (
    /** @class */
    function() {
      function MetricsAPI2() {
      }
      MetricsAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new MetricsAPI2();
        }
        return this._instance;
      };
      MetricsAPI2.prototype.setGlobalMeterProvider = function(provider) {
        return registerGlobal(API_NAME3, provider, DiagAPI.instance());
      };
      MetricsAPI2.prototype.getMeterProvider = function() {
        return getGlobal(API_NAME3) || NOOP_METER_PROVIDER;
      };
      MetricsAPI2.prototype.getMeter = function(name, version, options) {
        return this.getMeterProvider().getMeter(name, version, options);
      };
      MetricsAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME3, DiagAPI.instance());
      };
      return MetricsAPI2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/metrics-api.js
  var metrics = MetricsAPI.getInstance();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/propagation/NoopTextMapPropagator.js
  var NoopTextMapPropagator = (
    /** @class */
    function() {
      function NoopTextMapPropagator2() {
      }
      NoopTextMapPropagator2.prototype.inject = function(_context, _carrier) {
      };
      NoopTextMapPropagator2.prototype.extract = function(context2, _carrier) {
        return context2;
      };
      NoopTextMapPropagator2.prototype.fields = function() {
        return [];
      };
      return NoopTextMapPropagator2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/baggage/context-helpers.js
  var BAGGAGE_KEY = createContextKey("OpenTelemetry Baggage Key");
  function getBaggage(context2) {
    return context2.getValue(BAGGAGE_KEY) || void 0;
  }
  function getActiveBaggage() {
    return getBaggage(ContextAPI.getInstance().active());
  }
  function setBaggage(context2, baggage) {
    return context2.setValue(BAGGAGE_KEY, baggage);
  }
  function deleteBaggage(context2) {
    return context2.deleteValue(BAGGAGE_KEY);
  }

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/api/propagation.js
  var API_NAME4 = "propagation";
  var NOOP_TEXT_MAP_PROPAGATOR = new NoopTextMapPropagator();
  var PropagationAPI = (
    /** @class */
    function() {
      function PropagationAPI2() {
        this.createBaggage = createBaggage;
        this.getBaggage = getBaggage;
        this.getActiveBaggage = getActiveBaggage;
        this.setBaggage = setBaggage;
        this.deleteBaggage = deleteBaggage;
      }
      PropagationAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new PropagationAPI2();
        }
        return this._instance;
      };
      PropagationAPI2.prototype.setGlobalPropagator = function(propagator) {
        return registerGlobal(API_NAME4, propagator, DiagAPI.instance());
      };
      PropagationAPI2.prototype.inject = function(context2, carrier, setter) {
        if (setter === void 0) {
          setter = defaultTextMapSetter;
        }
        return this._getGlobalPropagator().inject(context2, carrier, setter);
      };
      PropagationAPI2.prototype.extract = function(context2, carrier, getter) {
        if (getter === void 0) {
          getter = defaultTextMapGetter;
        }
        return this._getGlobalPropagator().extract(context2, carrier, getter);
      };
      PropagationAPI2.prototype.fields = function() {
        return this._getGlobalPropagator().fields();
      };
      PropagationAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME4, DiagAPI.instance());
      };
      PropagationAPI2.prototype._getGlobalPropagator = function() {
        return getGlobal(API_NAME4) || NOOP_TEXT_MAP_PROPAGATOR;
      };
      return PropagationAPI2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/propagation-api.js
  var propagation = PropagationAPI.getInstance();

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/api/trace.js
  var API_NAME5 = "trace";
  var TraceAPI = (
    /** @class */
    function() {
      function TraceAPI2() {
        this._proxyTracerProvider = new ProxyTracerProvider();
        this.wrapSpanContext = wrapSpanContext;
        this.isSpanContextValid = isSpanContextValid;
        this.deleteSpan = deleteSpan;
        this.getSpan = getSpan;
        this.getActiveSpan = getActiveSpan;
        this.getSpanContext = getSpanContext;
        this.setSpan = setSpan;
        this.setSpanContext = setSpanContext;
      }
      TraceAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new TraceAPI2();
        }
        return this._instance;
      };
      TraceAPI2.prototype.setGlobalTracerProvider = function(provider) {
        var success = registerGlobal(API_NAME5, this._proxyTracerProvider, DiagAPI.instance());
        if (success) {
          this._proxyTracerProvider.setDelegate(provider);
        }
        return success;
      };
      TraceAPI2.prototype.getTracerProvider = function() {
        return getGlobal(API_NAME5) || this._proxyTracerProvider;
      };
      TraceAPI2.prototype.getTracer = function(name, version) {
        return this.getTracerProvider().getTracer(name, version);
      };
      TraceAPI2.prototype.disable = function() {
        unregisterGlobal(API_NAME5, DiagAPI.instance());
        this._proxyTracerProvider = new ProxyTracerProvider();
      };
      return TraceAPI2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api@1.8.0/node_modules/@opentelemetry/api/build/esm/trace-api.js
  var trace = TraceAPI.getInstance();

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/suppress-tracing.js
  var SUPPRESS_TRACING_KEY = createContextKey("OpenTelemetry SDK Context Key SUPPRESS_TRACING");
  function suppressTracing(context2) {
    return context2.setValue(SUPPRESS_TRACING_KEY, true);
  }
  function isTracingSuppressed(context2) {
    return context2.getValue(SUPPRESS_TRACING_KEY) === true;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/constants.js
  var BAGGAGE_KEY_PAIR_SEPARATOR = "=";
  var BAGGAGE_PROPERTIES_SEPARATOR = ";";
  var BAGGAGE_ITEMS_SEPARATOR = ",";
  var BAGGAGE_HEADER = "baggage";
  var BAGGAGE_MAX_NAME_VALUE_PAIRS = 180;
  var BAGGAGE_MAX_PER_NAME_VALUE_PAIRS = 4096;
  var BAGGAGE_MAX_TOTAL_LENGTH = 8192;

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    getKeyPairs: () => getKeyPairs,
    parseKeyPairsIntoRecord: () => parseKeyPairsIntoRecord,
    parsePairKeyValue: () => parsePairKeyValue,
    serializeKeyPairs: () => serializeKeyPairs
  });
  var __read6 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function serializeKeyPairs(keyPairs) {
    return keyPairs.reduce(function(hValue, current) {
      var value = "" + hValue + (hValue !== "" ? BAGGAGE_ITEMS_SEPARATOR : "") + current;
      return value.length > BAGGAGE_MAX_TOTAL_LENGTH ? hValue : value;
    }, "");
  }
  function getKeyPairs(baggage) {
    return baggage.getAllEntries().map(function(_a3) {
      var _b = __read6(_a3, 2), key = _b[0], value = _b[1];
      var entry = encodeURIComponent(key) + "=" + encodeURIComponent(value.value);
      if (value.metadata !== void 0) {
        entry += BAGGAGE_PROPERTIES_SEPARATOR + value.metadata.toString();
      }
      return entry;
    });
  }
  function parsePairKeyValue(entry) {
    var valueProps = entry.split(BAGGAGE_PROPERTIES_SEPARATOR);
    if (valueProps.length <= 0)
      return;
    var keyPairPart = valueProps.shift();
    if (!keyPairPart)
      return;
    var separatorIndex = keyPairPart.indexOf(BAGGAGE_KEY_PAIR_SEPARATOR);
    if (separatorIndex <= 0)
      return;
    var key = decodeURIComponent(keyPairPart.substring(0, separatorIndex).trim());
    var value = decodeURIComponent(keyPairPart.substring(separatorIndex + 1).trim());
    var metadata;
    if (valueProps.length > 0) {
      metadata = baggageEntryMetadataFromString(valueProps.join(BAGGAGE_PROPERTIES_SEPARATOR));
    }
    return { key, value, metadata };
  }
  function parseKeyPairsIntoRecord(value) {
    if (typeof value !== "string" || value.length === 0)
      return {};
    return value.split(BAGGAGE_ITEMS_SEPARATOR).map(function(entry) {
      return parsePairKeyValue(entry);
    }).filter(function(keyPair) {
      return keyPair !== void 0 && keyPair.value.length > 0;
    }).reduce(function(headers, keyPair) {
      headers[keyPair.key] = keyPair.value;
      return headers;
    }, {});
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/baggage/propagation/W3CBaggagePropagator.js
  var W3CBaggagePropagator = (
    /** @class */
    function() {
      function W3CBaggagePropagator2() {
      }
      W3CBaggagePropagator2.prototype.inject = function(context2, carrier, setter) {
        var baggage = propagation.getBaggage(context2);
        if (!baggage || isTracingSuppressed(context2))
          return;
        var keyPairs = getKeyPairs(baggage).filter(function(pair) {
          return pair.length <= BAGGAGE_MAX_PER_NAME_VALUE_PAIRS;
        }).slice(0, BAGGAGE_MAX_NAME_VALUE_PAIRS);
        var headerValue = serializeKeyPairs(keyPairs);
        if (headerValue.length > 0) {
          setter.set(carrier, BAGGAGE_HEADER, headerValue);
        }
      };
      W3CBaggagePropagator2.prototype.extract = function(context2, carrier, getter) {
        var headerValue = getter.get(carrier, BAGGAGE_HEADER);
        var baggageString = Array.isArray(headerValue) ? headerValue.join(BAGGAGE_ITEMS_SEPARATOR) : headerValue;
        if (!baggageString)
          return context2;
        var baggage = {};
        if (baggageString.length === 0) {
          return context2;
        }
        var pairs = baggageString.split(BAGGAGE_ITEMS_SEPARATOR);
        pairs.forEach(function(entry) {
          var keyPair = parsePairKeyValue(entry);
          if (keyPair) {
            var baggageEntry = { value: keyPair.value };
            if (keyPair.metadata) {
              baggageEntry.metadata = keyPair.metadata;
            }
            baggage[keyPair.key] = baggageEntry;
          }
        });
        if (Object.entries(baggage).length === 0) {
          return context2;
        }
        return propagation.setBaggage(context2, propagation.createBaggage(baggage));
      };
      W3CBaggagePropagator2.prototype.fields = function() {
        return [BAGGAGE_HEADER];
      };
      return W3CBaggagePropagator2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/attributes.js
  var __values2 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read7 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function sanitizeAttributes(attributes) {
    var e_1, _a3;
    var out = {};
    if (typeof attributes !== "object" || attributes == null) {
      return out;
    }
    try {
      for (var _b = __values2(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var _d = __read7(_c.value, 2), key = _d[0], val = _d[1];
        if (!isAttributeKey(key)) {
          diag2.warn("Invalid attribute key: " + key);
          continue;
        }
        if (!isAttributeValue(val)) {
          diag2.warn("Invalid attribute value set for key: " + key);
          continue;
        }
        if (Array.isArray(val)) {
          out[key] = val.slice();
        } else {
          out[key] = val;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a3 = _b.return))
          _a3.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return out;
  }
  function isAttributeKey(key) {
    return typeof key === "string" && key.length > 0;
  }
  function isAttributeValue(val) {
    if (val == null) {
      return true;
    }
    if (Array.isArray(val)) {
      return isHomogeneousAttributeValueArray(val);
    }
    return isValidPrimitiveAttributeValue(val);
  }
  function isHomogeneousAttributeValueArray(arr) {
    var e_2, _a3;
    var type;
    try {
      for (var arr_1 = __values2(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
        var element = arr_1_1.value;
        if (element == null)
          continue;
        if (!type) {
          if (isValidPrimitiveAttributeValue(element)) {
            type = typeof element;
            continue;
          }
          return false;
        }
        if (typeof element === type) {
          continue;
        }
        return false;
      }
    } catch (e_2_1) {
      e_2 = { error: e_2_1 };
    } finally {
      try {
        if (arr_1_1 && !arr_1_1.done && (_a3 = arr_1.return))
          _a3.call(arr_1);
      } finally {
        if (e_2)
          throw e_2.error;
      }
    }
    return true;
  }
  function isValidPrimitiveAttributeValue(val) {
    switch (typeof val) {
      case "number":
      case "boolean":
      case "string":
        return true;
    }
    return false;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/logging-error-handler.js
  function loggingErrorHandler() {
    return function(ex) {
      diag2.error(stringifyException(ex));
    };
  }
  function stringifyException(ex) {
    if (typeof ex === "string") {
      return ex;
    } else {
      return JSON.stringify(flattenException(ex));
    }
  }
  function flattenException(ex) {
    var result = {};
    var current = ex;
    while (current !== null) {
      Object.getOwnPropertyNames(current).forEach(function(propertyName) {
        if (result[propertyName])
          return;
        var value = current[propertyName];
        if (value) {
          result[propertyName] = String(value);
        }
      });
      current = Object.getPrototypeOf(current);
    }
    return result;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/global-error-handler.js
  var delegateHandler = loggingErrorHandler();
  function globalErrorHandler(ex) {
    try {
      delegateHandler(ex);
    } catch (_a3) {
    }
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/sampling.js
  var TracesSamplerValues;
  (function(TracesSamplerValues2) {
    TracesSamplerValues2["AlwaysOff"] = "always_off";
    TracesSamplerValues2["AlwaysOn"] = "always_on";
    TracesSamplerValues2["ParentBasedAlwaysOff"] = "parentbased_always_off";
    TracesSamplerValues2["ParentBasedAlwaysOn"] = "parentbased_always_on";
    TracesSamplerValues2["ParentBasedTraceIdRatio"] = "parentbased_traceidratio";
    TracesSamplerValues2["TraceIdRatio"] = "traceidratio";
  })(TracesSamplerValues || (TracesSamplerValues = {}));

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/browser/globalThis.js
  var _globalThis2 = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/environment.js
  var DEFAULT_LIST_SEPARATOR = ",";
  var ENVIRONMENT_BOOLEAN_KEYS = ["OTEL_SDK_DISABLED"];
  function isEnvVarABoolean(key) {
    return ENVIRONMENT_BOOLEAN_KEYS.indexOf(key) > -1;
  }
  var ENVIRONMENT_NUMBERS_KEYS = [
    "OTEL_BSP_EXPORT_TIMEOUT",
    "OTEL_BSP_MAX_EXPORT_BATCH_SIZE",
    "OTEL_BSP_MAX_QUEUE_SIZE",
    "OTEL_BSP_SCHEDULE_DELAY",
    "OTEL_BLRP_EXPORT_TIMEOUT",
    "OTEL_BLRP_MAX_EXPORT_BATCH_SIZE",
    "OTEL_BLRP_MAX_QUEUE_SIZE",
    "OTEL_BLRP_SCHEDULE_DELAY",
    "OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT",
    "OTEL_ATTRIBUTE_COUNT_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT",
    "OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT",
    "OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT",
    "OTEL_SPAN_EVENT_COUNT_LIMIT",
    "OTEL_SPAN_LINK_COUNT_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT",
    "OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT",
    "OTEL_EXPORTER_OTLP_TIMEOUT",
    "OTEL_EXPORTER_OTLP_TRACES_TIMEOUT",
    "OTEL_EXPORTER_OTLP_METRICS_TIMEOUT",
    "OTEL_EXPORTER_OTLP_LOGS_TIMEOUT",
    "OTEL_EXPORTER_JAEGER_AGENT_PORT"
  ];
  function isEnvVarANumber(key) {
    return ENVIRONMENT_NUMBERS_KEYS.indexOf(key) > -1;
  }
  var ENVIRONMENT_LISTS_KEYS = [
    "OTEL_NO_PATCH_MODULES",
    "OTEL_PROPAGATORS"
  ];
  function isEnvVarAList(key) {
    return ENVIRONMENT_LISTS_KEYS.indexOf(key) > -1;
  }
  var DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT = Infinity;
  var DEFAULT_ATTRIBUTE_COUNT_LIMIT = 128;
  var DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT = 128;
  var DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT = 128;
  var DEFAULT_ENVIRONMENT = {
    OTEL_SDK_DISABLED: false,
    CONTAINER_NAME: "",
    ECS_CONTAINER_METADATA_URI_V4: "",
    ECS_CONTAINER_METADATA_URI: "",
    HOSTNAME: "",
    KUBERNETES_SERVICE_HOST: "",
    NAMESPACE: "",
    OTEL_BSP_EXPORT_TIMEOUT: 3e4,
    OTEL_BSP_MAX_EXPORT_BATCH_SIZE: 512,
    OTEL_BSP_MAX_QUEUE_SIZE: 2048,
    OTEL_BSP_SCHEDULE_DELAY: 5e3,
    OTEL_BLRP_EXPORT_TIMEOUT: 3e4,
    OTEL_BLRP_MAX_EXPORT_BATCH_SIZE: 512,
    OTEL_BLRP_MAX_QUEUE_SIZE: 2048,
    OTEL_BLRP_SCHEDULE_DELAY: 5e3,
    OTEL_EXPORTER_JAEGER_AGENT_HOST: "",
    OTEL_EXPORTER_JAEGER_AGENT_PORT: 6832,
    OTEL_EXPORTER_JAEGER_ENDPOINT: "",
    OTEL_EXPORTER_JAEGER_PASSWORD: "",
    OTEL_EXPORTER_JAEGER_USER: "",
    OTEL_EXPORTER_OTLP_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: "",
    OTEL_EXPORTER_OTLP_HEADERS: "",
    OTEL_EXPORTER_OTLP_TRACES_HEADERS: "",
    OTEL_EXPORTER_OTLP_METRICS_HEADERS: "",
    OTEL_EXPORTER_OTLP_LOGS_HEADERS: "",
    OTEL_EXPORTER_OTLP_TIMEOUT: 1e4,
    OTEL_EXPORTER_OTLP_TRACES_TIMEOUT: 1e4,
    OTEL_EXPORTER_OTLP_METRICS_TIMEOUT: 1e4,
    OTEL_EXPORTER_OTLP_LOGS_TIMEOUT: 1e4,
    OTEL_EXPORTER_ZIPKIN_ENDPOINT: "http://localhost:9411/api/v2/spans",
    OTEL_LOG_LEVEL: DiagLogLevel.INFO,
    OTEL_NO_PATCH_MODULES: [],
    OTEL_PROPAGATORS: ["tracecontext", "baggage"],
    OTEL_RESOURCE_ATTRIBUTES: "",
    OTEL_SERVICE_NAME: "",
    OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
    OTEL_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
    OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
    OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
    OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT: DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT,
    OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT: DEFAULT_ATTRIBUTE_COUNT_LIMIT,
    OTEL_SPAN_EVENT_COUNT_LIMIT: 128,
    OTEL_SPAN_LINK_COUNT_LIMIT: 128,
    OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT: DEFAULT_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
    OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT: DEFAULT_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT,
    OTEL_TRACES_EXPORTER: "",
    OTEL_TRACES_SAMPLER: TracesSamplerValues.ParentBasedAlwaysOn,
    OTEL_TRACES_SAMPLER_ARG: "",
    OTEL_LOGS_EXPORTER: "",
    OTEL_EXPORTER_OTLP_INSECURE: "",
    OTEL_EXPORTER_OTLP_TRACES_INSECURE: "",
    OTEL_EXPORTER_OTLP_METRICS_INSECURE: "",
    OTEL_EXPORTER_OTLP_LOGS_INSECURE: "",
    OTEL_EXPORTER_OTLP_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_TRACES_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_METRICS_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_LOGS_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_TRACES_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_METRICS_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_LOGS_COMPRESSION: "",
    OTEL_EXPORTER_OTLP_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_TRACES_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_METRICS_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_LOGS_CLIENT_KEY: "",
    OTEL_EXPORTER_OTLP_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_TRACES_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_METRICS_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_LOGS_CLIENT_CERTIFICATE: "",
    OTEL_EXPORTER_OTLP_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_TRACES_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_METRICS_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_LOGS_PROTOCOL: "http/protobuf",
    OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE: "cumulative"
  };
  function parseBoolean(key, environment, values) {
    if (typeof values[key] === "undefined") {
      return;
    }
    var value = String(values[key]);
    environment[key] = value.toLowerCase() === "true";
  }
  function parseNumber(name, environment, values, min, max) {
    if (min === void 0) {
      min = -Infinity;
    }
    if (max === void 0) {
      max = Infinity;
    }
    if (typeof values[name] !== "undefined") {
      var value = Number(values[name]);
      if (!isNaN(value)) {
        if (value < min) {
          environment[name] = min;
        } else if (value > max) {
          environment[name] = max;
        } else {
          environment[name] = value;
        }
      }
    }
  }
  function parseStringList(name, output, input, separator) {
    if (separator === void 0) {
      separator = DEFAULT_LIST_SEPARATOR;
    }
    var givenValue = input[name];
    if (typeof givenValue === "string") {
      output[name] = givenValue.split(separator).map(function(v) {
        return v.trim();
      });
    }
  }
  var logLevelMap = {
    ALL: DiagLogLevel.ALL,
    VERBOSE: DiagLogLevel.VERBOSE,
    DEBUG: DiagLogLevel.DEBUG,
    INFO: DiagLogLevel.INFO,
    WARN: DiagLogLevel.WARN,
    ERROR: DiagLogLevel.ERROR,
    NONE: DiagLogLevel.NONE
  };
  function setLogLevelFromEnv(key, environment, values) {
    var value = values[key];
    if (typeof value === "string") {
      var theLevel = logLevelMap[value.toUpperCase()];
      if (theLevel != null) {
        environment[key] = theLevel;
      }
    }
  }
  function parseEnvironment(values) {
    var environment = {};
    for (var env2 in DEFAULT_ENVIRONMENT) {
      var key = env2;
      switch (key) {
        case "OTEL_LOG_LEVEL":
          setLogLevelFromEnv(key, environment, values);
          break;
        default:
          if (isEnvVarABoolean(key)) {
            parseBoolean(key, environment, values);
          } else if (isEnvVarANumber(key)) {
            parseNumber(key, environment, values);
          } else if (isEnvVarAList(key)) {
            parseStringList(key, environment, values);
          } else {
            var value = values[key];
            if (typeof value !== "undefined" && value !== null) {
              environment[key] = String(value);
            }
          }
      }
    }
    return environment;
  }
  function getEnvWithoutDefaults() {
    return typeof process !== "undefined" && process && process.env ? parseEnvironment(process.env) : parseEnvironment(_globalThis2);
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/browser/environment.js
  function getEnv() {
    var globalEnv = parseEnvironment(_globalThis2);
    return Object.assign({}, DEFAULT_ENVIRONMENT, globalEnv);
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/hex-to-binary.js
  function intValue(charCode) {
    if (charCode >= 48 && charCode <= 57) {
      return charCode - 48;
    }
    if (charCode >= 97 && charCode <= 102) {
      return charCode - 87;
    }
    return charCode - 55;
  }
  function hexToBinary(hexStr) {
    var buf = new Uint8Array(hexStr.length / 2);
    var offset = 0;
    for (var i = 0; i < hexStr.length; i += 2) {
      var hi = intValue(hexStr.charCodeAt(i));
      var lo = intValue(hexStr.charCodeAt(i + 1));
      buf[offset++] = hi << 4 | lo;
    }
    return buf;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/browser/performance.js
  var otperformance = performance;

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/version.js
  var VERSION2 = "1.23.0";

  // node_modules/.pnpm/@opentelemetry+semantic-conventions@1.23.0/node_modules/@opentelemetry/semantic-conventions/build/esm/internal/utils.js
  // @__NO_SIDE_EFFECTS__
  function createConstMap(values) {
    var res = {};
    var len = values.length;
    for (var lp = 0; lp < len; lp++) {
      var val = values[lp];
      if (val) {
        res[String(val).toUpperCase().replace(/[-.]/g, "_")] = val;
      }
    }
    return res;
  }

  // node_modules/.pnpm/@opentelemetry+semantic-conventions@1.23.0/node_modules/@opentelemetry/semantic-conventions/build/esm/trace/SemanticAttributes.js
  var TMP_AWS_LAMBDA_INVOKED_ARN = "aws.lambda.invoked_arn";
  var TMP_DB_SYSTEM = "db.system";
  var TMP_DB_CONNECTION_STRING = "db.connection_string";
  var TMP_DB_USER = "db.user";
  var TMP_DB_JDBC_DRIVER_CLASSNAME = "db.jdbc.driver_classname";
  var TMP_DB_NAME = "db.name";
  var TMP_DB_STATEMENT = "db.statement";
  var TMP_DB_OPERATION = "db.operation";
  var TMP_DB_MSSQL_INSTANCE_NAME = "db.mssql.instance_name";
  var TMP_DB_CASSANDRA_KEYSPACE = "db.cassandra.keyspace";
  var TMP_DB_CASSANDRA_PAGE_SIZE = "db.cassandra.page_size";
  var TMP_DB_CASSANDRA_CONSISTENCY_LEVEL = "db.cassandra.consistency_level";
  var TMP_DB_CASSANDRA_TABLE = "db.cassandra.table";
  var TMP_DB_CASSANDRA_IDEMPOTENCE = "db.cassandra.idempotence";
  var TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT = "db.cassandra.speculative_execution_count";
  var TMP_DB_CASSANDRA_COORDINATOR_ID = "db.cassandra.coordinator.id";
  var TMP_DB_CASSANDRA_COORDINATOR_DC = "db.cassandra.coordinator.dc";
  var TMP_DB_HBASE_NAMESPACE = "db.hbase.namespace";
  var TMP_DB_REDIS_DATABASE_INDEX = "db.redis.database_index";
  var TMP_DB_MONGODB_COLLECTION = "db.mongodb.collection";
  var TMP_DB_SQL_TABLE = "db.sql.table";
  var TMP_EXCEPTION_TYPE = "exception.type";
  var TMP_EXCEPTION_MESSAGE = "exception.message";
  var TMP_EXCEPTION_STACKTRACE = "exception.stacktrace";
  var TMP_EXCEPTION_ESCAPED = "exception.escaped";
  var TMP_FAAS_TRIGGER = "faas.trigger";
  var TMP_FAAS_EXECUTION = "faas.execution";
  var TMP_FAAS_DOCUMENT_COLLECTION = "faas.document.collection";
  var TMP_FAAS_DOCUMENT_OPERATION = "faas.document.operation";
  var TMP_FAAS_DOCUMENT_TIME = "faas.document.time";
  var TMP_FAAS_DOCUMENT_NAME = "faas.document.name";
  var TMP_FAAS_TIME = "faas.time";
  var TMP_FAAS_CRON = "faas.cron";
  var TMP_FAAS_COLDSTART = "faas.coldstart";
  var TMP_FAAS_INVOKED_NAME = "faas.invoked_name";
  var TMP_FAAS_INVOKED_PROVIDER = "faas.invoked_provider";
  var TMP_FAAS_INVOKED_REGION = "faas.invoked_region";
  var TMP_NET_TRANSPORT = "net.transport";
  var TMP_NET_PEER_IP = "net.peer.ip";
  var TMP_NET_PEER_PORT = "net.peer.port";
  var TMP_NET_PEER_NAME = "net.peer.name";
  var TMP_NET_HOST_IP = "net.host.ip";
  var TMP_NET_HOST_PORT = "net.host.port";
  var TMP_NET_HOST_NAME = "net.host.name";
  var TMP_NET_HOST_CONNECTION_TYPE = "net.host.connection.type";
  var TMP_NET_HOST_CONNECTION_SUBTYPE = "net.host.connection.subtype";
  var TMP_NET_HOST_CARRIER_NAME = "net.host.carrier.name";
  var TMP_NET_HOST_CARRIER_MCC = "net.host.carrier.mcc";
  var TMP_NET_HOST_CARRIER_MNC = "net.host.carrier.mnc";
  var TMP_NET_HOST_CARRIER_ICC = "net.host.carrier.icc";
  var TMP_PEER_SERVICE = "peer.service";
  var TMP_ENDUSER_ID = "enduser.id";
  var TMP_ENDUSER_ROLE = "enduser.role";
  var TMP_ENDUSER_SCOPE = "enduser.scope";
  var TMP_THREAD_ID = "thread.id";
  var TMP_THREAD_NAME = "thread.name";
  var TMP_CODE_FUNCTION = "code.function";
  var TMP_CODE_NAMESPACE = "code.namespace";
  var TMP_CODE_FILEPATH = "code.filepath";
  var TMP_CODE_LINENO = "code.lineno";
  var TMP_HTTP_METHOD = "http.method";
  var TMP_HTTP_URL = "http.url";
  var TMP_HTTP_TARGET = "http.target";
  var TMP_HTTP_HOST = "http.host";
  var TMP_HTTP_SCHEME = "http.scheme";
  var TMP_HTTP_STATUS_CODE = "http.status_code";
  var TMP_HTTP_FLAVOR = "http.flavor";
  var TMP_HTTP_USER_AGENT = "http.user_agent";
  var TMP_HTTP_REQUEST_CONTENT_LENGTH = "http.request_content_length";
  var TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED = "http.request_content_length_uncompressed";
  var TMP_HTTP_RESPONSE_CONTENT_LENGTH = "http.response_content_length";
  var TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED = "http.response_content_length_uncompressed";
  var TMP_HTTP_SERVER_NAME = "http.server_name";
  var TMP_HTTP_ROUTE = "http.route";
  var TMP_HTTP_CLIENT_IP = "http.client_ip";
  var TMP_AWS_DYNAMODB_TABLE_NAMES = "aws.dynamodb.table_names";
  var TMP_AWS_DYNAMODB_CONSUMED_CAPACITY = "aws.dynamodb.consumed_capacity";
  var TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS = "aws.dynamodb.item_collection_metrics";
  var TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY = "aws.dynamodb.provisioned_read_capacity";
  var TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY = "aws.dynamodb.provisioned_write_capacity";
  var TMP_AWS_DYNAMODB_CONSISTENT_READ = "aws.dynamodb.consistent_read";
  var TMP_AWS_DYNAMODB_PROJECTION = "aws.dynamodb.projection";
  var TMP_AWS_DYNAMODB_LIMIT = "aws.dynamodb.limit";
  var TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET = "aws.dynamodb.attributes_to_get";
  var TMP_AWS_DYNAMODB_INDEX_NAME = "aws.dynamodb.index_name";
  var TMP_AWS_DYNAMODB_SELECT = "aws.dynamodb.select";
  var TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES = "aws.dynamodb.global_secondary_indexes";
  var TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES = "aws.dynamodb.local_secondary_indexes";
  var TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE = "aws.dynamodb.exclusive_start_table";
  var TMP_AWS_DYNAMODB_TABLE_COUNT = "aws.dynamodb.table_count";
  var TMP_AWS_DYNAMODB_SCAN_FORWARD = "aws.dynamodb.scan_forward";
  var TMP_AWS_DYNAMODB_SEGMENT = "aws.dynamodb.segment";
  var TMP_AWS_DYNAMODB_TOTAL_SEGMENTS = "aws.dynamodb.total_segments";
  var TMP_AWS_DYNAMODB_COUNT = "aws.dynamodb.count";
  var TMP_AWS_DYNAMODB_SCANNED_COUNT = "aws.dynamodb.scanned_count";
  var TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS = "aws.dynamodb.attribute_definitions";
  var TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES = "aws.dynamodb.global_secondary_index_updates";
  var TMP_MESSAGING_SYSTEM = "messaging.system";
  var TMP_MESSAGING_DESTINATION = "messaging.destination";
  var TMP_MESSAGING_DESTINATION_KIND = "messaging.destination_kind";
  var TMP_MESSAGING_TEMP_DESTINATION = "messaging.temp_destination";
  var TMP_MESSAGING_PROTOCOL = "messaging.protocol";
  var TMP_MESSAGING_PROTOCOL_VERSION = "messaging.protocol_version";
  var TMP_MESSAGING_URL = "messaging.url";
  var TMP_MESSAGING_MESSAGE_ID = "messaging.message_id";
  var TMP_MESSAGING_CONVERSATION_ID = "messaging.conversation_id";
  var TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES = "messaging.message_payload_size_bytes";
  var TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES = "messaging.message_payload_compressed_size_bytes";
  var TMP_MESSAGING_OPERATION = "messaging.operation";
  var TMP_MESSAGING_CONSUMER_ID = "messaging.consumer_id";
  var TMP_MESSAGING_RABBITMQ_ROUTING_KEY = "messaging.rabbitmq.routing_key";
  var TMP_MESSAGING_KAFKA_MESSAGE_KEY = "messaging.kafka.message_key";
  var TMP_MESSAGING_KAFKA_CONSUMER_GROUP = "messaging.kafka.consumer_group";
  var TMP_MESSAGING_KAFKA_CLIENT_ID = "messaging.kafka.client_id";
  var TMP_MESSAGING_KAFKA_PARTITION = "messaging.kafka.partition";
  var TMP_MESSAGING_KAFKA_TOMBSTONE = "messaging.kafka.tombstone";
  var TMP_RPC_SYSTEM = "rpc.system";
  var TMP_RPC_SERVICE = "rpc.service";
  var TMP_RPC_METHOD = "rpc.method";
  var TMP_RPC_GRPC_STATUS_CODE = "rpc.grpc.status_code";
  var TMP_RPC_JSONRPC_VERSION = "rpc.jsonrpc.version";
  var TMP_RPC_JSONRPC_REQUEST_ID = "rpc.jsonrpc.request_id";
  var TMP_RPC_JSONRPC_ERROR_CODE = "rpc.jsonrpc.error_code";
  var TMP_RPC_JSONRPC_ERROR_MESSAGE = "rpc.jsonrpc.error_message";
  var TMP_MESSAGE_TYPE = "message.type";
  var TMP_MESSAGE_ID = "message.id";
  var TMP_MESSAGE_COMPRESSED_SIZE = "message.compressed_size";
  var TMP_MESSAGE_UNCOMPRESSED_SIZE = "message.uncompressed_size";
  var SEMATTRS_HTTP_URL = TMP_HTTP_URL;
  var SEMATTRS_HTTP_USER_AGENT = TMP_HTTP_USER_AGENT;
  var SemanticAttributes = /* @__PURE__ */ createConstMap([
    TMP_AWS_LAMBDA_INVOKED_ARN,
    TMP_DB_SYSTEM,
    TMP_DB_CONNECTION_STRING,
    TMP_DB_USER,
    TMP_DB_JDBC_DRIVER_CLASSNAME,
    TMP_DB_NAME,
    TMP_DB_STATEMENT,
    TMP_DB_OPERATION,
    TMP_DB_MSSQL_INSTANCE_NAME,
    TMP_DB_CASSANDRA_KEYSPACE,
    TMP_DB_CASSANDRA_PAGE_SIZE,
    TMP_DB_CASSANDRA_CONSISTENCY_LEVEL,
    TMP_DB_CASSANDRA_TABLE,
    TMP_DB_CASSANDRA_IDEMPOTENCE,
    TMP_DB_CASSANDRA_SPECULATIVE_EXECUTION_COUNT,
    TMP_DB_CASSANDRA_COORDINATOR_ID,
    TMP_DB_CASSANDRA_COORDINATOR_DC,
    TMP_DB_HBASE_NAMESPACE,
    TMP_DB_REDIS_DATABASE_INDEX,
    TMP_DB_MONGODB_COLLECTION,
    TMP_DB_SQL_TABLE,
    TMP_EXCEPTION_TYPE,
    TMP_EXCEPTION_MESSAGE,
    TMP_EXCEPTION_STACKTRACE,
    TMP_EXCEPTION_ESCAPED,
    TMP_FAAS_TRIGGER,
    TMP_FAAS_EXECUTION,
    TMP_FAAS_DOCUMENT_COLLECTION,
    TMP_FAAS_DOCUMENT_OPERATION,
    TMP_FAAS_DOCUMENT_TIME,
    TMP_FAAS_DOCUMENT_NAME,
    TMP_FAAS_TIME,
    TMP_FAAS_CRON,
    TMP_FAAS_COLDSTART,
    TMP_FAAS_INVOKED_NAME,
    TMP_FAAS_INVOKED_PROVIDER,
    TMP_FAAS_INVOKED_REGION,
    TMP_NET_TRANSPORT,
    TMP_NET_PEER_IP,
    TMP_NET_PEER_PORT,
    TMP_NET_PEER_NAME,
    TMP_NET_HOST_IP,
    TMP_NET_HOST_PORT,
    TMP_NET_HOST_NAME,
    TMP_NET_HOST_CONNECTION_TYPE,
    TMP_NET_HOST_CONNECTION_SUBTYPE,
    TMP_NET_HOST_CARRIER_NAME,
    TMP_NET_HOST_CARRIER_MCC,
    TMP_NET_HOST_CARRIER_MNC,
    TMP_NET_HOST_CARRIER_ICC,
    TMP_PEER_SERVICE,
    TMP_ENDUSER_ID,
    TMP_ENDUSER_ROLE,
    TMP_ENDUSER_SCOPE,
    TMP_THREAD_ID,
    TMP_THREAD_NAME,
    TMP_CODE_FUNCTION,
    TMP_CODE_NAMESPACE,
    TMP_CODE_FILEPATH,
    TMP_CODE_LINENO,
    TMP_HTTP_METHOD,
    TMP_HTTP_URL,
    TMP_HTTP_TARGET,
    TMP_HTTP_HOST,
    TMP_HTTP_SCHEME,
    TMP_HTTP_STATUS_CODE,
    TMP_HTTP_FLAVOR,
    TMP_HTTP_USER_AGENT,
    TMP_HTTP_REQUEST_CONTENT_LENGTH,
    TMP_HTTP_REQUEST_CONTENT_LENGTH_UNCOMPRESSED,
    TMP_HTTP_RESPONSE_CONTENT_LENGTH,
    TMP_HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED,
    TMP_HTTP_SERVER_NAME,
    TMP_HTTP_ROUTE,
    TMP_HTTP_CLIENT_IP,
    TMP_AWS_DYNAMODB_TABLE_NAMES,
    TMP_AWS_DYNAMODB_CONSUMED_CAPACITY,
    TMP_AWS_DYNAMODB_ITEM_COLLECTION_METRICS,
    TMP_AWS_DYNAMODB_PROVISIONED_READ_CAPACITY,
    TMP_AWS_DYNAMODB_PROVISIONED_WRITE_CAPACITY,
    TMP_AWS_DYNAMODB_CONSISTENT_READ,
    TMP_AWS_DYNAMODB_PROJECTION,
    TMP_AWS_DYNAMODB_LIMIT,
    TMP_AWS_DYNAMODB_ATTRIBUTES_TO_GET,
    TMP_AWS_DYNAMODB_INDEX_NAME,
    TMP_AWS_DYNAMODB_SELECT,
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEXES,
    TMP_AWS_DYNAMODB_LOCAL_SECONDARY_INDEXES,
    TMP_AWS_DYNAMODB_EXCLUSIVE_START_TABLE,
    TMP_AWS_DYNAMODB_TABLE_COUNT,
    TMP_AWS_DYNAMODB_SCAN_FORWARD,
    TMP_AWS_DYNAMODB_SEGMENT,
    TMP_AWS_DYNAMODB_TOTAL_SEGMENTS,
    TMP_AWS_DYNAMODB_COUNT,
    TMP_AWS_DYNAMODB_SCANNED_COUNT,
    TMP_AWS_DYNAMODB_ATTRIBUTE_DEFINITIONS,
    TMP_AWS_DYNAMODB_GLOBAL_SECONDARY_INDEX_UPDATES,
    TMP_MESSAGING_SYSTEM,
    TMP_MESSAGING_DESTINATION,
    TMP_MESSAGING_DESTINATION_KIND,
    TMP_MESSAGING_TEMP_DESTINATION,
    TMP_MESSAGING_PROTOCOL,
    TMP_MESSAGING_PROTOCOL_VERSION,
    TMP_MESSAGING_URL,
    TMP_MESSAGING_MESSAGE_ID,
    TMP_MESSAGING_CONVERSATION_ID,
    TMP_MESSAGING_MESSAGE_PAYLOAD_SIZE_BYTES,
    TMP_MESSAGING_MESSAGE_PAYLOAD_COMPRESSED_SIZE_BYTES,
    TMP_MESSAGING_OPERATION,
    TMP_MESSAGING_CONSUMER_ID,
    TMP_MESSAGING_RABBITMQ_ROUTING_KEY,
    TMP_MESSAGING_KAFKA_MESSAGE_KEY,
    TMP_MESSAGING_KAFKA_CONSUMER_GROUP,
    TMP_MESSAGING_KAFKA_CLIENT_ID,
    TMP_MESSAGING_KAFKA_PARTITION,
    TMP_MESSAGING_KAFKA_TOMBSTONE,
    TMP_RPC_SYSTEM,
    TMP_RPC_SERVICE,
    TMP_RPC_METHOD,
    TMP_RPC_GRPC_STATUS_CODE,
    TMP_RPC_JSONRPC_VERSION,
    TMP_RPC_JSONRPC_REQUEST_ID,
    TMP_RPC_JSONRPC_ERROR_CODE,
    TMP_RPC_JSONRPC_ERROR_MESSAGE,
    TMP_MESSAGE_TYPE,
    TMP_MESSAGE_ID,
    TMP_MESSAGE_COMPRESSED_SIZE,
    TMP_MESSAGE_UNCOMPRESSED_SIZE
  ]);

  // node_modules/.pnpm/@opentelemetry+semantic-conventions@1.23.0/node_modules/@opentelemetry/semantic-conventions/build/esm/resource/SemanticResourceAttributes.js
  var TMP_CLOUD_PROVIDER = "cloud.provider";
  var TMP_CLOUD_ACCOUNT_ID = "cloud.account.id";
  var TMP_CLOUD_REGION = "cloud.region";
  var TMP_CLOUD_AVAILABILITY_ZONE = "cloud.availability_zone";
  var TMP_CLOUD_PLATFORM = "cloud.platform";
  var TMP_AWS_ECS_CONTAINER_ARN = "aws.ecs.container.arn";
  var TMP_AWS_ECS_CLUSTER_ARN = "aws.ecs.cluster.arn";
  var TMP_AWS_ECS_LAUNCHTYPE = "aws.ecs.launchtype";
  var TMP_AWS_ECS_TASK_ARN = "aws.ecs.task.arn";
  var TMP_AWS_ECS_TASK_FAMILY = "aws.ecs.task.family";
  var TMP_AWS_ECS_TASK_REVISION = "aws.ecs.task.revision";
  var TMP_AWS_EKS_CLUSTER_ARN = "aws.eks.cluster.arn";
  var TMP_AWS_LOG_GROUP_NAMES = "aws.log.group.names";
  var TMP_AWS_LOG_GROUP_ARNS = "aws.log.group.arns";
  var TMP_AWS_LOG_STREAM_NAMES = "aws.log.stream.names";
  var TMP_AWS_LOG_STREAM_ARNS = "aws.log.stream.arns";
  var TMP_CONTAINER_NAME = "container.name";
  var TMP_CONTAINER_ID = "container.id";
  var TMP_CONTAINER_RUNTIME = "container.runtime";
  var TMP_CONTAINER_IMAGE_NAME = "container.image.name";
  var TMP_CONTAINER_IMAGE_TAG = "container.image.tag";
  var TMP_DEPLOYMENT_ENVIRONMENT = "deployment.environment";
  var TMP_DEVICE_ID = "device.id";
  var TMP_DEVICE_MODEL_IDENTIFIER = "device.model.identifier";
  var TMP_DEVICE_MODEL_NAME = "device.model.name";
  var TMP_FAAS_NAME = "faas.name";
  var TMP_FAAS_ID = "faas.id";
  var TMP_FAAS_VERSION = "faas.version";
  var TMP_FAAS_INSTANCE = "faas.instance";
  var TMP_FAAS_MAX_MEMORY = "faas.max_memory";
  var TMP_HOST_ID = "host.id";
  var TMP_HOST_NAME = "host.name";
  var TMP_HOST_TYPE = "host.type";
  var TMP_HOST_ARCH = "host.arch";
  var TMP_HOST_IMAGE_NAME = "host.image.name";
  var TMP_HOST_IMAGE_ID = "host.image.id";
  var TMP_HOST_IMAGE_VERSION = "host.image.version";
  var TMP_K8S_CLUSTER_NAME = "k8s.cluster.name";
  var TMP_K8S_NODE_NAME = "k8s.node.name";
  var TMP_K8S_NODE_UID = "k8s.node.uid";
  var TMP_K8S_NAMESPACE_NAME = "k8s.namespace.name";
  var TMP_K8S_POD_UID = "k8s.pod.uid";
  var TMP_K8S_POD_NAME = "k8s.pod.name";
  var TMP_K8S_CONTAINER_NAME = "k8s.container.name";
  var TMP_K8S_REPLICASET_UID = "k8s.replicaset.uid";
  var TMP_K8S_REPLICASET_NAME = "k8s.replicaset.name";
  var TMP_K8S_DEPLOYMENT_UID = "k8s.deployment.uid";
  var TMP_K8S_DEPLOYMENT_NAME = "k8s.deployment.name";
  var TMP_K8S_STATEFULSET_UID = "k8s.statefulset.uid";
  var TMP_K8S_STATEFULSET_NAME = "k8s.statefulset.name";
  var TMP_K8S_DAEMONSET_UID = "k8s.daemonset.uid";
  var TMP_K8S_DAEMONSET_NAME = "k8s.daemonset.name";
  var TMP_K8S_JOB_UID = "k8s.job.uid";
  var TMP_K8S_JOB_NAME = "k8s.job.name";
  var TMP_K8S_CRONJOB_UID = "k8s.cronjob.uid";
  var TMP_K8S_CRONJOB_NAME = "k8s.cronjob.name";
  var TMP_OS_TYPE = "os.type";
  var TMP_OS_DESCRIPTION = "os.description";
  var TMP_OS_NAME = "os.name";
  var TMP_OS_VERSION = "os.version";
  var TMP_PROCESS_PID = "process.pid";
  var TMP_PROCESS_EXECUTABLE_NAME = "process.executable.name";
  var TMP_PROCESS_EXECUTABLE_PATH = "process.executable.path";
  var TMP_PROCESS_COMMAND = "process.command";
  var TMP_PROCESS_COMMAND_LINE = "process.command_line";
  var TMP_PROCESS_COMMAND_ARGS = "process.command_args";
  var TMP_PROCESS_OWNER = "process.owner";
  var TMP_PROCESS_RUNTIME_NAME = "process.runtime.name";
  var TMP_PROCESS_RUNTIME_VERSION = "process.runtime.version";
  var TMP_PROCESS_RUNTIME_DESCRIPTION = "process.runtime.description";
  var TMP_SERVICE_NAME = "service.name";
  var TMP_SERVICE_NAMESPACE = "service.namespace";
  var TMP_SERVICE_INSTANCE_ID = "service.instance.id";
  var TMP_SERVICE_VERSION = "service.version";
  var TMP_TELEMETRY_SDK_NAME = "telemetry.sdk.name";
  var TMP_TELEMETRY_SDK_LANGUAGE = "telemetry.sdk.language";
  var TMP_TELEMETRY_SDK_VERSION = "telemetry.sdk.version";
  var TMP_TELEMETRY_AUTO_VERSION = "telemetry.auto.version";
  var TMP_WEBENGINE_NAME = "webengine.name";
  var TMP_WEBENGINE_VERSION = "webengine.version";
  var TMP_WEBENGINE_DESCRIPTION = "webengine.description";
  var SEMRESATTRS_SERVICE_NAME = TMP_SERVICE_NAME;
  var SemanticResourceAttributes = /* @__PURE__ */ createConstMap([
    TMP_CLOUD_PROVIDER,
    TMP_CLOUD_ACCOUNT_ID,
    TMP_CLOUD_REGION,
    TMP_CLOUD_AVAILABILITY_ZONE,
    TMP_CLOUD_PLATFORM,
    TMP_AWS_ECS_CONTAINER_ARN,
    TMP_AWS_ECS_CLUSTER_ARN,
    TMP_AWS_ECS_LAUNCHTYPE,
    TMP_AWS_ECS_TASK_ARN,
    TMP_AWS_ECS_TASK_FAMILY,
    TMP_AWS_ECS_TASK_REVISION,
    TMP_AWS_EKS_CLUSTER_ARN,
    TMP_AWS_LOG_GROUP_NAMES,
    TMP_AWS_LOG_GROUP_ARNS,
    TMP_AWS_LOG_STREAM_NAMES,
    TMP_AWS_LOG_STREAM_ARNS,
    TMP_CONTAINER_NAME,
    TMP_CONTAINER_ID,
    TMP_CONTAINER_RUNTIME,
    TMP_CONTAINER_IMAGE_NAME,
    TMP_CONTAINER_IMAGE_TAG,
    TMP_DEPLOYMENT_ENVIRONMENT,
    TMP_DEVICE_ID,
    TMP_DEVICE_MODEL_IDENTIFIER,
    TMP_DEVICE_MODEL_NAME,
    TMP_FAAS_NAME,
    TMP_FAAS_ID,
    TMP_FAAS_VERSION,
    TMP_FAAS_INSTANCE,
    TMP_FAAS_MAX_MEMORY,
    TMP_HOST_ID,
    TMP_HOST_NAME,
    TMP_HOST_TYPE,
    TMP_HOST_ARCH,
    TMP_HOST_IMAGE_NAME,
    TMP_HOST_IMAGE_ID,
    TMP_HOST_IMAGE_VERSION,
    TMP_K8S_CLUSTER_NAME,
    TMP_K8S_NODE_NAME,
    TMP_K8S_NODE_UID,
    TMP_K8S_NAMESPACE_NAME,
    TMP_K8S_POD_UID,
    TMP_K8S_POD_NAME,
    TMP_K8S_CONTAINER_NAME,
    TMP_K8S_REPLICASET_UID,
    TMP_K8S_REPLICASET_NAME,
    TMP_K8S_DEPLOYMENT_UID,
    TMP_K8S_DEPLOYMENT_NAME,
    TMP_K8S_STATEFULSET_UID,
    TMP_K8S_STATEFULSET_NAME,
    TMP_K8S_DAEMONSET_UID,
    TMP_K8S_DAEMONSET_NAME,
    TMP_K8S_JOB_UID,
    TMP_K8S_JOB_NAME,
    TMP_K8S_CRONJOB_UID,
    TMP_K8S_CRONJOB_NAME,
    TMP_OS_TYPE,
    TMP_OS_DESCRIPTION,
    TMP_OS_NAME,
    TMP_OS_VERSION,
    TMP_PROCESS_PID,
    TMP_PROCESS_EXECUTABLE_NAME,
    TMP_PROCESS_EXECUTABLE_PATH,
    TMP_PROCESS_COMMAND,
    TMP_PROCESS_COMMAND_LINE,
    TMP_PROCESS_COMMAND_ARGS,
    TMP_PROCESS_OWNER,
    TMP_PROCESS_RUNTIME_NAME,
    TMP_PROCESS_RUNTIME_VERSION,
    TMP_PROCESS_RUNTIME_DESCRIPTION,
    TMP_SERVICE_NAME,
    TMP_SERVICE_NAMESPACE,
    TMP_SERVICE_INSTANCE_ID,
    TMP_SERVICE_VERSION,
    TMP_TELEMETRY_SDK_NAME,
    TMP_TELEMETRY_SDK_LANGUAGE,
    TMP_TELEMETRY_SDK_VERSION,
    TMP_TELEMETRY_AUTO_VERSION,
    TMP_WEBENGINE_NAME,
    TMP_WEBENGINE_VERSION,
    TMP_WEBENGINE_DESCRIPTION
  ]);
  var TMP_TELEMETRYSDKLANGUAGEVALUES_CPP = "cpp";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET = "dotnet";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG = "erlang";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_GO = "go";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA = "java";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS = "nodejs";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_PHP = "php";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON = "python";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY = "ruby";
  var TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS = "webjs";
  var TelemetrySdkLanguageValues = /* @__PURE__ */ createConstMap([
    TMP_TELEMETRYSDKLANGUAGEVALUES_CPP,
    TMP_TELEMETRYSDKLANGUAGEVALUES_DOTNET,
    TMP_TELEMETRYSDKLANGUAGEVALUES_ERLANG,
    TMP_TELEMETRYSDKLANGUAGEVALUES_GO,
    TMP_TELEMETRYSDKLANGUAGEVALUES_JAVA,
    TMP_TELEMETRYSDKLANGUAGEVALUES_NODEJS,
    TMP_TELEMETRYSDKLANGUAGEVALUES_PHP,
    TMP_TELEMETRYSDKLANGUAGEVALUES_PYTHON,
    TMP_TELEMETRYSDKLANGUAGEVALUES_RUBY,
    TMP_TELEMETRYSDKLANGUAGEVALUES_WEBJS
  ]);

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/browser/sdk-info.js
  var _a;
  var SDK_INFO = (_a = {}, _a[SemanticResourceAttributes.TELEMETRY_SDK_NAME] = "opentelemetry", _a[SemanticResourceAttributes.PROCESS_RUNTIME_NAME] = "browser", _a[SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE] = TelemetrySdkLanguageValues.WEBJS, _a[SemanticResourceAttributes.TELEMETRY_SDK_VERSION] = VERSION2, _a);

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/platform/browser/timer-util.js
  function unrefTimer(_timer) {
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/common/time.js
  var NANOSECOND_DIGITS = 9;
  var NANOSECOND_DIGITS_IN_MILLIS = 6;
  var MILLISECONDS_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS_IN_MILLIS);
  var SECOND_TO_NANOSECONDS = Math.pow(10, NANOSECOND_DIGITS);
  function millisToHrTime(epochMillis) {
    var epochSeconds = epochMillis / 1e3;
    var seconds = Math.trunc(epochSeconds);
    var nanos = Math.round(epochMillis % 1e3 * MILLISECONDS_TO_NANOSECONDS);
    return [seconds, nanos];
  }
  function getTimeOrigin() {
    var timeOrigin = otperformance.timeOrigin;
    if (typeof timeOrigin !== "number") {
      var perf = otperformance;
      timeOrigin = perf.timing && perf.timing.fetchStart;
    }
    return timeOrigin;
  }
  function hrTime(performanceNow) {
    var timeOrigin = millisToHrTime(getTimeOrigin());
    var now = millisToHrTime(typeof performanceNow === "number" ? performanceNow : otperformance.now());
    return addHrTimes(timeOrigin, now);
  }
  function timeInputToHrTime(time) {
    if (isTimeInputHrTime(time)) {
      return time;
    } else if (typeof time === "number") {
      if (time < getTimeOrigin()) {
        return hrTime(time);
      } else {
        return millisToHrTime(time);
      }
    } else if (time instanceof Date) {
      return millisToHrTime(time.getTime());
    } else {
      throw TypeError("Invalid input type");
    }
  }
  function hrTimeDuration(startTime, endTime) {
    var seconds = endTime[0] - startTime[0];
    var nanos = endTime[1] - startTime[1];
    if (nanos < 0) {
      seconds -= 1;
      nanos += SECOND_TO_NANOSECONDS;
    }
    return [seconds, nanos];
  }
  function hrTimeToNanoseconds(time) {
    return time[0] * SECOND_TO_NANOSECONDS + time[1];
  }
  function isTimeInputHrTime(value) {
    return Array.isArray(value) && value.length === 2 && typeof value[0] === "number" && typeof value[1] === "number";
  }
  function isTimeInput(value) {
    return isTimeInputHrTime(value) || typeof value === "number" || value instanceof Date;
  }
  function addHrTimes(time1, time2) {
    var out = [time1[0] + time2[0], time1[1] + time2[1]];
    if (out[1] >= SECOND_TO_NANOSECONDS) {
      out[1] -= SECOND_TO_NANOSECONDS;
      out[0] += 1;
    }
    return out;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/ExportResult.js
  var ExportResultCode;
  (function(ExportResultCode2) {
    ExportResultCode2[ExportResultCode2["SUCCESS"] = 0] = "SUCCESS";
    ExportResultCode2[ExportResultCode2["FAILED"] = 1] = "FAILED";
  })(ExportResultCode || (ExportResultCode = {}));

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/propagation/composite.js
  var __values3 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var CompositePropagator = (
    /** @class */
    function() {
      function CompositePropagator2(config) {
        if (config === void 0) {
          config = {};
        }
        var _a3;
        this._propagators = (_a3 = config.propagators) !== null && _a3 !== void 0 ? _a3 : [];
        this._fields = Array.from(new Set(this._propagators.map(function(p) {
          return typeof p.fields === "function" ? p.fields() : [];
        }).reduce(function(x, y) {
          return x.concat(y);
        }, [])));
      }
      CompositePropagator2.prototype.inject = function(context2, carrier, setter) {
        var e_1, _a3;
        try {
          for (var _b = __values3(this._propagators), _c = _b.next(); !_c.done; _c = _b.next()) {
            var propagator = _c.value;
            try {
              propagator.inject(context2, carrier, setter);
            } catch (err) {
              diag2.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      };
      CompositePropagator2.prototype.extract = function(context2, carrier, getter) {
        return this._propagators.reduce(function(ctx, propagator) {
          try {
            return propagator.extract(ctx, carrier, getter);
          } catch (err) {
            diag2.warn("Failed to inject with " + propagator.constructor.name + ". Err: " + err.message);
          }
          return ctx;
        }, context2);
      };
      CompositePropagator2.prototype.fields = function() {
        return this._fields.slice();
      };
      return CompositePropagator2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/internal/validators.js
  var VALID_KEY_CHAR_RANGE = "[_0-9a-z-*/]";
  var VALID_KEY = "[a-z]" + VALID_KEY_CHAR_RANGE + "{0,255}";
  var VALID_VENDOR_KEY = "[a-z0-9]" + VALID_KEY_CHAR_RANGE + "{0,240}@[a-z]" + VALID_KEY_CHAR_RANGE + "{0,13}";
  var VALID_KEY_REGEX = new RegExp("^(?:" + VALID_KEY + "|" + VALID_VENDOR_KEY + ")$");
  var VALID_VALUE_BASE_REGEX = /^[ -~]{0,255}[!-~]$/;
  var INVALID_VALUE_COMMA_EQUAL_REGEX = /,|=/;
  function validateKey(key) {
    return VALID_KEY_REGEX.test(key);
  }
  function validateValue(value) {
    return VALID_VALUE_BASE_REGEX.test(value) && !INVALID_VALUE_COMMA_EQUAL_REGEX.test(value);
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/TraceState.js
  var MAX_TRACE_STATE_ITEMS = 32;
  var MAX_TRACE_STATE_LEN = 512;
  var LIST_MEMBERS_SEPARATOR = ",";
  var LIST_MEMBER_KEY_VALUE_SPLITTER = "=";
  var TraceState = (
    /** @class */
    function() {
      function TraceState2(rawTraceState) {
        this._internalState = /* @__PURE__ */ new Map();
        if (rawTraceState)
          this._parse(rawTraceState);
      }
      TraceState2.prototype.set = function(key, value) {
        var traceState = this._clone();
        if (traceState._internalState.has(key)) {
          traceState._internalState.delete(key);
        }
        traceState._internalState.set(key, value);
        return traceState;
      };
      TraceState2.prototype.unset = function(key) {
        var traceState = this._clone();
        traceState._internalState.delete(key);
        return traceState;
      };
      TraceState2.prototype.get = function(key) {
        return this._internalState.get(key);
      };
      TraceState2.prototype.serialize = function() {
        var _this = this;
        return this._keys().reduce(function(agg, key) {
          agg.push(key + LIST_MEMBER_KEY_VALUE_SPLITTER + _this.get(key));
          return agg;
        }, []).join(LIST_MEMBERS_SEPARATOR);
      };
      TraceState2.prototype._parse = function(rawTraceState) {
        if (rawTraceState.length > MAX_TRACE_STATE_LEN)
          return;
        this._internalState = rawTraceState.split(LIST_MEMBERS_SEPARATOR).reverse().reduce(function(agg, part) {
          var listMember = part.trim();
          var i = listMember.indexOf(LIST_MEMBER_KEY_VALUE_SPLITTER);
          if (i !== -1) {
            var key = listMember.slice(0, i);
            var value = listMember.slice(i + 1, part.length);
            if (validateKey(key) && validateValue(value)) {
              agg.set(key, value);
            } else {
            }
          }
          return agg;
        }, /* @__PURE__ */ new Map());
        if (this._internalState.size > MAX_TRACE_STATE_ITEMS) {
          this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, MAX_TRACE_STATE_ITEMS));
        }
      };
      TraceState2.prototype._keys = function() {
        return Array.from(this._internalState.keys()).reverse();
      };
      TraceState2.prototype._clone = function() {
        var traceState = new TraceState2();
        traceState._internalState = new Map(this._internalState);
        return traceState;
      };
      return TraceState2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/trace/W3CTraceContextPropagator.js
  var TRACE_PARENT_HEADER = "traceparent";
  var TRACE_STATE_HEADER = "tracestate";
  var VERSION3 = "00";
  var VERSION_PART = "(?!ff)[\\da-f]{2}";
  var TRACE_ID_PART = "(?![0]{32})[\\da-f]{32}";
  var PARENT_ID_PART = "(?![0]{16})[\\da-f]{16}";
  var FLAGS_PART = "[\\da-f]{2}";
  var TRACE_PARENT_REGEX = new RegExp("^\\s?(" + VERSION_PART + ")-(" + TRACE_ID_PART + ")-(" + PARENT_ID_PART + ")-(" + FLAGS_PART + ")(-.*)?\\s?$");
  function parseTraceParent(traceParent) {
    var match = TRACE_PARENT_REGEX.exec(traceParent);
    if (!match)
      return null;
    if (match[1] === "00" && match[5])
      return null;
    return {
      traceId: match[2],
      spanId: match[3],
      traceFlags: parseInt(match[4], 16)
    };
  }
  var W3CTraceContextPropagator = (
    /** @class */
    function() {
      function W3CTraceContextPropagator2() {
      }
      W3CTraceContextPropagator2.prototype.inject = function(context2, carrier, setter) {
        var spanContext = trace.getSpanContext(context2);
        if (!spanContext || isTracingSuppressed(context2) || !isSpanContextValid(spanContext))
          return;
        var traceParent = VERSION3 + "-" + spanContext.traceId + "-" + spanContext.spanId + "-0" + Number(spanContext.traceFlags || TraceFlags.NONE).toString(16);
        setter.set(carrier, TRACE_PARENT_HEADER, traceParent);
        if (spanContext.traceState) {
          setter.set(carrier, TRACE_STATE_HEADER, spanContext.traceState.serialize());
        }
      };
      W3CTraceContextPropagator2.prototype.extract = function(context2, carrier, getter) {
        var traceParentHeader = getter.get(carrier, TRACE_PARENT_HEADER);
        if (!traceParentHeader)
          return context2;
        var traceParent = Array.isArray(traceParentHeader) ? traceParentHeader[0] : traceParentHeader;
        if (typeof traceParent !== "string")
          return context2;
        var spanContext = parseTraceParent(traceParent);
        if (!spanContext)
          return context2;
        spanContext.isRemote = true;
        var traceStateHeader = getter.get(carrier, TRACE_STATE_HEADER);
        if (traceStateHeader) {
          var state = Array.isArray(traceStateHeader) ? traceStateHeader.join(",") : traceStateHeader;
          spanContext.traceState = new TraceState(typeof state === "string" ? state : void 0);
        }
        return trace.setSpanContext(context2, spanContext);
      };
      W3CTraceContextPropagator2.prototype.fields = function() {
        return [TRACE_PARENT_HEADER, TRACE_STATE_HEADER];
      };
      return W3CTraceContextPropagator2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/lodash.merge.js
  var objectTag = "[object Object]";
  var nullTag = "[object Null]";
  var undefinedTag = "[object Undefined]";
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  var objectCtorString = funcToString.call(Object);
  var getPrototype = overArg(Object.getPrototypeOf, Object);
  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
  var nativeObjectToString = objectProto.toString;
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function isPlainObject(value) {
    if (!isObjectLike(value) || baseGetTag(value) !== objectTag) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) === objectCtorString;
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
    var unmasked = false;
    try {
      value[symToStringTag] = void 0;
      unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/merge.js
  var MAX_LEVEL = 20;
  function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var result = args.shift();
    var objects = /* @__PURE__ */ new WeakMap();
    while (args.length > 0) {
      result = mergeTwoObjects(result, args.shift(), 0, objects);
    }
    return result;
  }
  function takeValue(value) {
    if (isArray(value)) {
      return value.slice();
    }
    return value;
  }
  function mergeTwoObjects(one, two, level, objects) {
    if (level === void 0) {
      level = 0;
    }
    var result;
    if (level > MAX_LEVEL) {
      return void 0;
    }
    level++;
    if (isPrimitive(one) || isPrimitive(two) || isFunction(two)) {
      result = takeValue(two);
    } else if (isArray(one)) {
      result = one.slice();
      if (isArray(two)) {
        for (var i = 0, j = two.length; i < j; i++) {
          result.push(takeValue(two[i]));
        }
      } else if (isObject(two)) {
        var keys = Object.keys(two);
        for (var i = 0, j = keys.length; i < j; i++) {
          var key = keys[i];
          result[key] = takeValue(two[key]);
        }
      }
    } else if (isObject(one)) {
      if (isObject(two)) {
        if (!shouldMerge(one, two)) {
          return two;
        }
        result = Object.assign({}, one);
        var keys = Object.keys(two);
        for (var i = 0, j = keys.length; i < j; i++) {
          var key = keys[i];
          var twoValue = two[key];
          if (isPrimitive(twoValue)) {
            if (typeof twoValue === "undefined") {
              delete result[key];
            } else {
              result[key] = twoValue;
            }
          } else {
            var obj1 = result[key];
            var obj2 = twoValue;
            if (wasObjectReferenced(one, key, objects) || wasObjectReferenced(two, key, objects)) {
              delete result[key];
            } else {
              if (isObject(obj1) && isObject(obj2)) {
                var arr1 = objects.get(obj1) || [];
                var arr2 = objects.get(obj2) || [];
                arr1.push({ obj: one, key });
                arr2.push({ obj: two, key });
                objects.set(obj1, arr1);
                objects.set(obj2, arr2);
              }
              result[key] = mergeTwoObjects(result[key], twoValue, level, objects);
            }
          }
        }
      } else {
        result = two;
      }
    }
    return result;
  }
  function wasObjectReferenced(obj, key, objects) {
    var arr = objects.get(obj[key]) || [];
    for (var i = 0, j = arr.length; i < j; i++) {
      var info = arr[i];
      if (info.key === key && info.obj === obj) {
        return true;
      }
    }
    return false;
  }
  function isArray(value) {
    return Array.isArray(value);
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isObject(value) {
    return !isPrimitive(value) && !isArray(value) && !isFunction(value) && typeof value === "object";
  }
  function isPrimitive(value) {
    return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "undefined" || value instanceof Date || value instanceof RegExp || value === null;
  }
  function shouldMerge(one, two) {
    if (!isPlainObject(one) || !isPlainObject(two)) {
      return false;
    }
    return true;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/timeout.js
  var __extends2 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var TimeoutError = (
    /** @class */
    function(_super) {
      __extends2(TimeoutError2, _super);
      function TimeoutError2(message) {
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, TimeoutError2.prototype);
        return _this;
      }
      return TimeoutError2;
    }(Error)
  );
  function callWithTimeout(promise, timeout) {
    var timeoutHandle;
    var timeoutPromise = new Promise(function timeoutFunction(_resolve, reject) {
      timeoutHandle = setTimeout(function timeoutHandler() {
        reject(new TimeoutError("Operation timed out."));
      }, timeout);
    });
    return Promise.race([promise, timeoutPromise]).then(function(result) {
      clearTimeout(timeoutHandle);
      return result;
    }, function(reason) {
      clearTimeout(timeoutHandle);
      throw reason;
    });
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/url.js
  var __values4 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  function urlMatches(url, urlToMatch) {
    if (typeof urlToMatch === "string") {
      return url === urlToMatch;
    } else {
      return !!url.match(urlToMatch);
    }
  }
  function isUrlIgnored(url, ignoredUrls) {
    var e_1, _a3;
    if (!ignoredUrls) {
      return false;
    }
    try {
      for (var ignoredUrls_1 = __values4(ignoredUrls), ignoredUrls_1_1 = ignoredUrls_1.next(); !ignoredUrls_1_1.done; ignoredUrls_1_1 = ignoredUrls_1.next()) {
        var ignoreUrl = ignoredUrls_1_1.value;
        if (urlMatches(url, ignoreUrl)) {
          return true;
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (ignoredUrls_1_1 && !ignoredUrls_1_1.done && (_a3 = ignoredUrls_1.return))
          _a3.call(ignoredUrls_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return false;
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/promise.js
  var Deferred = (
    /** @class */
    function() {
      function Deferred2() {
        var _this = this;
        this._promise = new Promise(function(resolve, reject) {
          _this._resolve = resolve;
          _this._reject = reject;
        });
      }
      Object.defineProperty(Deferred2.prototype, "promise", {
        get: function() {
          return this._promise;
        },
        enumerable: false,
        configurable: true
      });
      Deferred2.prototype.resolve = function(val) {
        this._resolve(val);
      };
      Deferred2.prototype.reject = function(err) {
        this._reject(err);
      };
      return Deferred2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/utils/callback.js
  var __read8 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray5 = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var BindOnceFuture = (
    /** @class */
    function() {
      function BindOnceFuture2(_callback, _that) {
        this._callback = _callback;
        this._that = _that;
        this._isCalled = false;
        this._deferred = new Deferred();
      }
      Object.defineProperty(BindOnceFuture2.prototype, "isCalled", {
        get: function() {
          return this._isCalled;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(BindOnceFuture2.prototype, "promise", {
        get: function() {
          return this._deferred.promise;
        },
        enumerable: false,
        configurable: true
      });
      BindOnceFuture2.prototype.call = function() {
        var _a3;
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!this._isCalled) {
          this._isCalled = true;
          try {
            Promise.resolve((_a3 = this._callback).call.apply(_a3, __spreadArray5([this._that], __read8(args), false))).then(function(val) {
              return _this._deferred.resolve(val);
            }, function(err) {
              return _this._deferred.reject(err);
            });
          } catch (err) {
            this._deferred.reject(err);
          }
        }
        return this._deferred.promise;
      };
      return BindOnceFuture2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/internal/exporter.js
  function _export(exporter, arg) {
    return new Promise(function(resolve) {
      context.with(suppressTracing(context.active()), function() {
        exporter.export(arg, function(result) {
          resolve(result);
        });
      });
    });
  }

  // node_modules/.pnpm/@opentelemetry+core@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/core/build/esm/index.js
  var internal = {
    _export
  };

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/enums.js
  var ExceptionEventName = "exception";

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/Span.js
  var __values5 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read9 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var Span = (
    /** @class */
    function() {
      function Span2(parentTracer, context2, spanName, spanContext, kind, parentSpanId, links, startTime, _deprecatedClock, attributes) {
        if (links === void 0) {
          links = [];
        }
        this.attributes = {};
        this.links = [];
        this.events = [];
        this._droppedAttributesCount = 0;
        this._droppedEventsCount = 0;
        this._droppedLinksCount = 0;
        this.status = {
          code: SpanStatusCode.UNSET
        };
        this.endTime = [0, 0];
        this._ended = false;
        this._duration = [-1, -1];
        this.name = spanName;
        this._spanContext = spanContext;
        this.parentSpanId = parentSpanId;
        this.kind = kind;
        this.links = links;
        var now = Date.now();
        this._performanceStartTime = otperformance.now();
        this._performanceOffset = now - (this._performanceStartTime + getTimeOrigin());
        this._startTimeProvided = startTime != null;
        this.startTime = this._getTime(startTime !== null && startTime !== void 0 ? startTime : now);
        this.resource = parentTracer.resource;
        this.instrumentationLibrary = parentTracer.instrumentationLibrary;
        this._spanLimits = parentTracer.getSpanLimits();
        this._attributeValueLengthLimit = this._spanLimits.attributeValueLengthLimit || 0;
        if (attributes != null) {
          this.setAttributes(attributes);
        }
        this._spanProcessor = parentTracer.getActiveSpanProcessor();
        this._spanProcessor.onStart(this, context2);
      }
      Span2.prototype.spanContext = function() {
        return this._spanContext;
      };
      Span2.prototype.setAttribute = function(key, value) {
        if (value == null || this._isSpanEnded())
          return this;
        if (key.length === 0) {
          diag2.warn("Invalid attribute key: " + key);
          return this;
        }
        if (!isAttributeValue(value)) {
          diag2.warn("Invalid attribute value set for key: " + key);
          return this;
        }
        if (Object.keys(this.attributes).length >= this._spanLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
          this._droppedAttributesCount++;
          return this;
        }
        this.attributes[key] = this._truncateToSize(value);
        return this;
      };
      Span2.prototype.setAttributes = function(attributes) {
        var e_1, _a3;
        try {
          for (var _b = __values5(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read9(_c.value, 2), k = _d[0], v = _d[1];
            this.setAttribute(k, v);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return this;
      };
      Span2.prototype.addEvent = function(name, attributesOrStartTime, timeStamp) {
        if (this._isSpanEnded())
          return this;
        if (this._spanLimits.eventCountLimit === 0) {
          diag2.warn("No events allowed.");
          this._droppedEventsCount++;
          return this;
        }
        if (this.events.length >= this._spanLimits.eventCountLimit) {
          if (this._droppedEventsCount === 0) {
            diag2.debug("Dropping extra events.");
          }
          this.events.shift();
          this._droppedEventsCount++;
        }
        if (isTimeInput(attributesOrStartTime)) {
          if (!isTimeInput(timeStamp)) {
            timeStamp = attributesOrStartTime;
          }
          attributesOrStartTime = void 0;
        }
        var attributes = sanitizeAttributes(attributesOrStartTime);
        this.events.push({
          name,
          attributes,
          time: this._getTime(timeStamp),
          droppedAttributesCount: 0
        });
        return this;
      };
      Span2.prototype.setStatus = function(status) {
        if (this._isSpanEnded())
          return this;
        this.status = status;
        return this;
      };
      Span2.prototype.updateName = function(name) {
        if (this._isSpanEnded())
          return this;
        this.name = name;
        return this;
      };
      Span2.prototype.end = function(endTime) {
        if (this._isSpanEnded()) {
          diag2.error(this.name + " " + this._spanContext.traceId + "-" + this._spanContext.spanId + " - You can only call end() on a span once.");
          return;
        }
        this._ended = true;
        this.endTime = this._getTime(endTime);
        this._duration = hrTimeDuration(this.startTime, this.endTime);
        if (this._duration[0] < 0) {
          diag2.warn("Inconsistent start and end time, startTime > endTime. Setting span duration to 0ms.", this.startTime, this.endTime);
          this.endTime = this.startTime.slice();
          this._duration = [0, 0];
        }
        if (this._droppedEventsCount > 0) {
          diag2.warn("Dropped " + this._droppedEventsCount + " events because eventCountLimit reached");
        }
        this._spanProcessor.onEnd(this);
      };
      Span2.prototype._getTime = function(inp) {
        if (typeof inp === "number" && inp < otperformance.now()) {
          return hrTime(inp + this._performanceOffset);
        }
        if (typeof inp === "number") {
          return millisToHrTime(inp);
        }
        if (inp instanceof Date) {
          return millisToHrTime(inp.getTime());
        }
        if (isTimeInputHrTime(inp)) {
          return inp;
        }
        if (this._startTimeProvided) {
          return millisToHrTime(Date.now());
        }
        var msDuration = otperformance.now() - this._performanceStartTime;
        return addHrTimes(this.startTime, millisToHrTime(msDuration));
      };
      Span2.prototype.isRecording = function() {
        return this._ended === false;
      };
      Span2.prototype.recordException = function(exception, time) {
        var attributes = {};
        if (typeof exception === "string") {
          attributes[SemanticAttributes.EXCEPTION_MESSAGE] = exception;
        } else if (exception) {
          if (exception.code) {
            attributes[SemanticAttributes.EXCEPTION_TYPE] = exception.code.toString();
          } else if (exception.name) {
            attributes[SemanticAttributes.EXCEPTION_TYPE] = exception.name;
          }
          if (exception.message) {
            attributes[SemanticAttributes.EXCEPTION_MESSAGE] = exception.message;
          }
          if (exception.stack) {
            attributes[SemanticAttributes.EXCEPTION_STACKTRACE] = exception.stack;
          }
        }
        if (attributes[SemanticAttributes.EXCEPTION_TYPE] || attributes[SemanticAttributes.EXCEPTION_MESSAGE]) {
          this.addEvent(ExceptionEventName, attributes, time);
        } else {
          diag2.warn("Failed to record an exception " + exception);
        }
      };
      Object.defineProperty(Span2.prototype, "duration", {
        get: function() {
          return this._duration;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Span2.prototype, "ended", {
        get: function() {
          return this._ended;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Span2.prototype, "droppedAttributesCount", {
        get: function() {
          return this._droppedAttributesCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Span2.prototype, "droppedEventsCount", {
        get: function() {
          return this._droppedEventsCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(Span2.prototype, "droppedLinksCount", {
        get: function() {
          return this._droppedLinksCount;
        },
        enumerable: false,
        configurable: true
      });
      Span2.prototype._isSpanEnded = function() {
        if (this._ended) {
          diag2.warn("Can not execute the operation on ended Span {traceId: " + this._spanContext.traceId + ", spanId: " + this._spanContext.spanId + "}");
        }
        return this._ended;
      };
      Span2.prototype._truncateToLimitUtil = function(value, limit) {
        if (value.length <= limit) {
          return value;
        }
        return value.substr(0, limit);
      };
      Span2.prototype._truncateToSize = function(value) {
        var _this = this;
        var limit = this._attributeValueLengthLimit;
        if (limit <= 0) {
          diag2.warn("Attribute value limit must be positive, got " + limit);
          return value;
        }
        if (typeof value === "string") {
          return this._truncateToLimitUtil(value, limit);
        }
        if (Array.isArray(value)) {
          return value.map(function(val) {
            return typeof val === "string" ? _this._truncateToLimitUtil(val, limit) : val;
          });
        }
        return value;
      };
      return Span2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/Sampler.js
  var SamplingDecision2;
  (function(SamplingDecision3) {
    SamplingDecision3[SamplingDecision3["NOT_RECORD"] = 0] = "NOT_RECORD";
    SamplingDecision3[SamplingDecision3["RECORD"] = 1] = "RECORD";
    SamplingDecision3[SamplingDecision3["RECORD_AND_SAMPLED"] = 2] = "RECORD_AND_SAMPLED";
  })(SamplingDecision2 || (SamplingDecision2 = {}));

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOffSampler.js
  var AlwaysOffSampler = (
    /** @class */
    function() {
      function AlwaysOffSampler2() {
      }
      AlwaysOffSampler2.prototype.shouldSample = function() {
        return {
          decision: SamplingDecision2.NOT_RECORD
        };
      };
      AlwaysOffSampler2.prototype.toString = function() {
        return "AlwaysOffSampler";
      };
      return AlwaysOffSampler2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/AlwaysOnSampler.js
  var AlwaysOnSampler = (
    /** @class */
    function() {
      function AlwaysOnSampler2() {
      }
      AlwaysOnSampler2.prototype.shouldSample = function() {
        return {
          decision: SamplingDecision2.RECORD_AND_SAMPLED
        };
      };
      AlwaysOnSampler2.prototype.toString = function() {
        return "AlwaysOnSampler";
      };
      return AlwaysOnSampler2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/ParentBasedSampler.js
  var ParentBasedSampler = (
    /** @class */
    function() {
      function ParentBasedSampler2(config) {
        var _a3, _b, _c, _d;
        this._root = config.root;
        if (!this._root) {
          globalErrorHandler(new Error("ParentBasedSampler must have a root sampler configured"));
          this._root = new AlwaysOnSampler();
        }
        this._remoteParentSampled = (_a3 = config.remoteParentSampled) !== null && _a3 !== void 0 ? _a3 : new AlwaysOnSampler();
        this._remoteParentNotSampled = (_b = config.remoteParentNotSampled) !== null && _b !== void 0 ? _b : new AlwaysOffSampler();
        this._localParentSampled = (_c = config.localParentSampled) !== null && _c !== void 0 ? _c : new AlwaysOnSampler();
        this._localParentNotSampled = (_d = config.localParentNotSampled) !== null && _d !== void 0 ? _d : new AlwaysOffSampler();
      }
      ParentBasedSampler2.prototype.shouldSample = function(context2, traceId, spanName, spanKind, attributes, links) {
        var parentContext = trace.getSpanContext(context2);
        if (!parentContext || !isSpanContextValid(parentContext)) {
          return this._root.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.isRemote) {
          if (parentContext.traceFlags & TraceFlags.SAMPLED) {
            return this._remoteParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
          }
          return this._remoteParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        if (parentContext.traceFlags & TraceFlags.SAMPLED) {
          return this._localParentSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
        }
        return this._localParentNotSampled.shouldSample(context2, traceId, spanName, spanKind, attributes, links);
      };
      ParentBasedSampler2.prototype.toString = function() {
        return "ParentBased{root=" + this._root.toString() + ", remoteParentSampled=" + this._remoteParentSampled.toString() + ", remoteParentNotSampled=" + this._remoteParentNotSampled.toString() + ", localParentSampled=" + this._localParentSampled.toString() + ", localParentNotSampled=" + this._localParentNotSampled.toString() + "}";
      };
      return ParentBasedSampler2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/sampler/TraceIdRatioBasedSampler.js
  var TraceIdRatioBasedSampler = (
    /** @class */
    function() {
      function TraceIdRatioBasedSampler2(_ratio) {
        if (_ratio === void 0) {
          _ratio = 0;
        }
        this._ratio = _ratio;
        this._ratio = this._normalize(_ratio);
        this._upperBound = Math.floor(this._ratio * 4294967295);
      }
      TraceIdRatioBasedSampler2.prototype.shouldSample = function(context2, traceId) {
        return {
          decision: isValidTraceId(traceId) && this._accumulate(traceId) < this._upperBound ? SamplingDecision2.RECORD_AND_SAMPLED : SamplingDecision2.NOT_RECORD
        };
      };
      TraceIdRatioBasedSampler2.prototype.toString = function() {
        return "TraceIdRatioBased{" + this._ratio + "}";
      };
      TraceIdRatioBasedSampler2.prototype._normalize = function(ratio) {
        if (typeof ratio !== "number" || isNaN(ratio))
          return 0;
        return ratio >= 1 ? 1 : ratio <= 0 ? 0 : ratio;
      };
      TraceIdRatioBasedSampler2.prototype._accumulate = function(traceId) {
        var accumulation = 0;
        for (var i = 0; i < traceId.length / 8; i++) {
          var pos = i * 8;
          var part = parseInt(traceId.slice(pos, pos + 8), 16);
          accumulation = (accumulation ^ part) >>> 0;
        }
        return accumulation;
      };
      return TraceIdRatioBasedSampler2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/config.js
  var env = getEnv();
  var FALLBACK_OTEL_TRACES_SAMPLER = TracesSamplerValues.AlwaysOn;
  var DEFAULT_RATIO = 1;
  function loadDefaultConfig() {
    return {
      sampler: buildSamplerFromEnv(env),
      forceFlushTimeoutMillis: 3e4,
      generalLimits: {
        attributeValueLengthLimit: getEnv().OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        attributeCountLimit: getEnv().OTEL_ATTRIBUTE_COUNT_LIMIT
      },
      spanLimits: {
        attributeValueLengthLimit: getEnv().OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        attributeCountLimit: getEnv().OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT,
        linkCountLimit: getEnv().OTEL_SPAN_LINK_COUNT_LIMIT,
        eventCountLimit: getEnv().OTEL_SPAN_EVENT_COUNT_LIMIT,
        attributePerEventCountLimit: getEnv().OTEL_SPAN_ATTRIBUTE_PER_EVENT_COUNT_LIMIT,
        attributePerLinkCountLimit: getEnv().OTEL_SPAN_ATTRIBUTE_PER_LINK_COUNT_LIMIT
      }
    };
  }
  function buildSamplerFromEnv(environment) {
    if (environment === void 0) {
      environment = getEnv();
    }
    switch (environment.OTEL_TRACES_SAMPLER) {
      case TracesSamplerValues.AlwaysOn:
        return new AlwaysOnSampler();
      case TracesSamplerValues.AlwaysOff:
        return new AlwaysOffSampler();
      case TracesSamplerValues.ParentBasedAlwaysOn:
        return new ParentBasedSampler({
          root: new AlwaysOnSampler()
        });
      case TracesSamplerValues.ParentBasedAlwaysOff:
        return new ParentBasedSampler({
          root: new AlwaysOffSampler()
        });
      case TracesSamplerValues.TraceIdRatio:
        return new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment));
      case TracesSamplerValues.ParentBasedTraceIdRatio:
        return new ParentBasedSampler({
          root: new TraceIdRatioBasedSampler(getSamplerProbabilityFromEnv(environment))
        });
      default:
        diag2.error('OTEL_TRACES_SAMPLER value "' + environment.OTEL_TRACES_SAMPLER + " invalid, defaulting to " + FALLBACK_OTEL_TRACES_SAMPLER + '".');
        return new AlwaysOnSampler();
    }
  }
  function getSamplerProbabilityFromEnv(environment) {
    if (environment.OTEL_TRACES_SAMPLER_ARG === void 0 || environment.OTEL_TRACES_SAMPLER_ARG === "") {
      diag2.error("OTEL_TRACES_SAMPLER_ARG is blank, defaulting to " + DEFAULT_RATIO + ".");
      return DEFAULT_RATIO;
    }
    var probability = Number(environment.OTEL_TRACES_SAMPLER_ARG);
    if (isNaN(probability)) {
      diag2.error("OTEL_TRACES_SAMPLER_ARG=" + environment.OTEL_TRACES_SAMPLER_ARG + " was given, but it is invalid, defaulting to " + DEFAULT_RATIO + ".");
      return DEFAULT_RATIO;
    }
    if (probability < 0 || probability > 1) {
      diag2.error("OTEL_TRACES_SAMPLER_ARG=" + environment.OTEL_TRACES_SAMPLER_ARG + " was given, but it is out of range ([0..1]), defaulting to " + DEFAULT_RATIO + ".");
      return DEFAULT_RATIO;
    }
    return probability;
  }

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/utility.js
  function mergeConfig(userConfig) {
    var perInstanceDefaults = {
      sampler: buildSamplerFromEnv()
    };
    var DEFAULT_CONFIG = loadDefaultConfig();
    var target = Object.assign({}, DEFAULT_CONFIG, perInstanceDefaults, userConfig);
    target.generalLimits = Object.assign({}, DEFAULT_CONFIG.generalLimits, userConfig.generalLimits || {});
    target.spanLimits = Object.assign({}, DEFAULT_CONFIG.spanLimits, userConfig.spanLimits || {});
    return target;
  }
  function reconfigureLimits(userConfig) {
    var _a3, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var spanLimits = Object.assign({}, userConfig.spanLimits);
    var parsedEnvConfig = getEnvWithoutDefaults();
    spanLimits.attributeCountLimit = (_f = (_e = (_d = (_b = (_a3 = userConfig.spanLimits) === null || _a3 === void 0 ? void 0 : _a3.attributeCountLimit) !== null && _b !== void 0 ? _b : (_c = userConfig.generalLimits) === null || _c === void 0 ? void 0 : _c.attributeCountLimit) !== null && _d !== void 0 ? _d : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_COUNT_LIMIT) !== null && _e !== void 0 ? _e : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _f !== void 0 ? _f : DEFAULT_ATTRIBUTE_COUNT_LIMIT;
    spanLimits.attributeValueLengthLimit = (_m = (_l = (_k = (_h = (_g = userConfig.spanLimits) === null || _g === void 0 ? void 0 : _g.attributeValueLengthLimit) !== null && _h !== void 0 ? _h : (_j = userConfig.generalLimits) === null || _j === void 0 ? void 0 : _j.attributeValueLengthLimit) !== null && _k !== void 0 ? _k : parsedEnvConfig.OTEL_SPAN_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _l !== void 0 ? _l : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _m !== void 0 ? _m : DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT;
    return Object.assign({}, userConfig, { spanLimits });
  }

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/export/BatchSpanProcessorBase.js
  var BatchSpanProcessorBase = (
    /** @class */
    function() {
      function BatchSpanProcessorBase2(_exporter, config) {
        this._exporter = _exporter;
        this._isExporting = false;
        this._finishedSpans = [];
        this._droppedSpansCount = 0;
        var env2 = getEnv();
        this._maxExportBatchSize = typeof (config === null || config === void 0 ? void 0 : config.maxExportBatchSize) === "number" ? config.maxExportBatchSize : env2.OTEL_BSP_MAX_EXPORT_BATCH_SIZE;
        this._maxQueueSize = typeof (config === null || config === void 0 ? void 0 : config.maxQueueSize) === "number" ? config.maxQueueSize : env2.OTEL_BSP_MAX_QUEUE_SIZE;
        this._scheduledDelayMillis = typeof (config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) === "number" ? config.scheduledDelayMillis : env2.OTEL_BSP_SCHEDULE_DELAY;
        this._exportTimeoutMillis = typeof (config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) === "number" ? config.exportTimeoutMillis : env2.OTEL_BSP_EXPORT_TIMEOUT;
        this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
          diag2.warn("BatchSpanProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
          this._maxExportBatchSize = this._maxQueueSize;
        }
      }
      BatchSpanProcessorBase2.prototype.forceFlush = function() {
        if (this._shutdownOnce.isCalled) {
          return this._shutdownOnce.promise;
        }
        return this._flushAll();
      };
      BatchSpanProcessorBase2.prototype.onStart = function(_span, _parentContext) {
      };
      BatchSpanProcessorBase2.prototype.onEnd = function(span) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        if ((span.spanContext().traceFlags & TraceFlags.SAMPLED) === 0) {
          return;
        }
        this._addToBuffer(span);
      };
      BatchSpanProcessorBase2.prototype.shutdown = function() {
        return this._shutdownOnce.call();
      };
      BatchSpanProcessorBase2.prototype._shutdown = function() {
        var _this = this;
        return Promise.resolve().then(function() {
          return _this.onShutdown();
        }).then(function() {
          return _this._flushAll();
        }).then(function() {
          return _this._exporter.shutdown();
        });
      };
      BatchSpanProcessorBase2.prototype._addToBuffer = function(span) {
        if (this._finishedSpans.length >= this._maxQueueSize) {
          if (this._droppedSpansCount === 0) {
            diag2.debug("maxQueueSize reached, dropping spans");
          }
          this._droppedSpansCount++;
          return;
        }
        if (this._droppedSpansCount > 0) {
          diag2.warn("Dropped " + this._droppedSpansCount + " spans because maxQueueSize reached");
          this._droppedSpansCount = 0;
        }
        this._finishedSpans.push(span);
        this._maybeStartTimer();
      };
      BatchSpanProcessorBase2.prototype._flushAll = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var promises = [];
          var count = Math.ceil(_this._finishedSpans.length / _this._maxExportBatchSize);
          for (var i = 0, j = count; i < j; i++) {
            promises.push(_this._flushOneBatch());
          }
          Promise.all(promises).then(function() {
            resolve();
          }).catch(reject);
        });
      };
      BatchSpanProcessorBase2.prototype._flushOneBatch = function() {
        var _this = this;
        this._clearTimer();
        if (this._finishedSpans.length === 0) {
          return Promise.resolve();
        }
        return new Promise(function(resolve, reject) {
          var timer = setTimeout(function() {
            reject(new Error("Timeout"));
          }, _this._exportTimeoutMillis);
          context.with(suppressTracing(context.active()), function() {
            var spans;
            if (_this._finishedSpans.length <= _this._maxExportBatchSize) {
              spans = _this._finishedSpans;
              _this._finishedSpans = [];
            } else {
              spans = _this._finishedSpans.splice(0, _this._maxExportBatchSize);
            }
            var doExport = function() {
              return _this._exporter.export(spans, function(result) {
                var _a3;
                clearTimeout(timer);
                if (result.code === ExportResultCode.SUCCESS) {
                  resolve();
                } else {
                  reject((_a3 = result.error) !== null && _a3 !== void 0 ? _a3 : new Error("BatchSpanProcessor: span export failed"));
                }
              });
            };
            var pendingResources = null;
            for (var i = 0, len = spans.length; i < len; i++) {
              var span = spans[i];
              if (span.resource.asyncAttributesPending && span.resource.waitForAsyncAttributes) {
                pendingResources !== null && pendingResources !== void 0 ? pendingResources : pendingResources = [];
                pendingResources.push(span.resource.waitForAsyncAttributes());
              }
            }
            if (pendingResources === null) {
              doExport();
            } else {
              Promise.all(pendingResources).then(doExport, function(err) {
                globalErrorHandler(err);
                reject(err);
              });
            }
          });
        });
      };
      BatchSpanProcessorBase2.prototype._maybeStartTimer = function() {
        var _this = this;
        if (this._isExporting)
          return;
        var flush = function() {
          _this._isExporting = true;
          _this._flushOneBatch().finally(function() {
            _this._isExporting = false;
            if (_this._finishedSpans.length > 0) {
              _this._clearTimer();
              _this._maybeStartTimer();
            }
          }).catch(function(e) {
            _this._isExporting = false;
            globalErrorHandler(e);
          });
        };
        if (this._finishedSpans.length >= this._maxExportBatchSize) {
          return flush();
        }
        if (this._timer !== void 0)
          return;
        this._timer = setTimeout(function() {
          return flush();
        }, this._scheduledDelayMillis);
        unrefTimer(this._timer);
      };
      BatchSpanProcessorBase2.prototype._clearTimer = function() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      };
      return BatchSpanProcessorBase2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/export/BatchSpanProcessor.js
  var __extends3 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var BatchSpanProcessor = (
    /** @class */
    function(_super) {
      __extends3(BatchSpanProcessor2, _super);
      function BatchSpanProcessor2(_exporter, config) {
        var _this = _super.call(this, _exporter, config) || this;
        _this.onInit(config);
        return _this;
      }
      BatchSpanProcessor2.prototype.onInit = function(config) {
        var _this = this;
        if ((config === null || config === void 0 ? void 0 : config.disableAutoFlushOnDocumentHide) !== true && typeof document !== "undefined") {
          this._visibilityChangeListener = function() {
            if (document.visibilityState === "hidden") {
              void _this.forceFlush();
            }
          };
          this._pageHideListener = function() {
            void _this.forceFlush();
          };
          document.addEventListener("visibilitychange", this._visibilityChangeListener);
          document.addEventListener("pagehide", this._pageHideListener);
        }
      };
      BatchSpanProcessor2.prototype.onShutdown = function() {
        if (typeof document !== "undefined") {
          if (this._visibilityChangeListener) {
            document.removeEventListener("visibilitychange", this._visibilityChangeListener);
          }
          if (this._pageHideListener) {
            document.removeEventListener("pagehide", this._pageHideListener);
          }
        }
      };
      return BatchSpanProcessor2;
    }(BatchSpanProcessorBase)
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/platform/browser/RandomIdGenerator.js
  var SPAN_ID_BYTES = 8;
  var TRACE_ID_BYTES = 16;
  var RandomIdGenerator = (
    /** @class */
    /* @__PURE__ */ function() {
      function RandomIdGenerator2() {
        this.generateTraceId = getIdGenerator(TRACE_ID_BYTES);
        this.generateSpanId = getIdGenerator(SPAN_ID_BYTES);
      }
      return RandomIdGenerator2;
    }()
  );
  var SHARED_CHAR_CODES_ARRAY = Array(32);
  function getIdGenerator(bytes) {
    return function generateId() {
      for (var i = 0; i < bytes * 2; i++) {
        SHARED_CHAR_CODES_ARRAY[i] = Math.floor(Math.random() * 16) + 48;
        if (SHARED_CHAR_CODES_ARRAY[i] >= 58) {
          SHARED_CHAR_CODES_ARRAY[i] += 39;
        }
      }
      return String.fromCharCode.apply(null, SHARED_CHAR_CODES_ARRAY.slice(0, bytes * 2));
    };
  }

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/Tracer.js
  var Tracer = (
    /** @class */
    function() {
      function Tracer2(instrumentationLibrary, config, _tracerProvider) {
        this._tracerProvider = _tracerProvider;
        var localConfig = mergeConfig(config);
        this._sampler = localConfig.sampler;
        this._generalLimits = localConfig.generalLimits;
        this._spanLimits = localConfig.spanLimits;
        this._idGenerator = config.idGenerator || new RandomIdGenerator();
        this.resource = _tracerProvider.resource;
        this.instrumentationLibrary = instrumentationLibrary;
      }
      Tracer2.prototype.startSpan = function(name, options, context2) {
        var _a3, _b, _c;
        if (options === void 0) {
          options = {};
        }
        if (context2 === void 0) {
          context2 = context.active();
        }
        if (options.root) {
          context2 = trace.deleteSpan(context2);
        }
        var parentSpan = trace.getSpan(context2);
        if (isTracingSuppressed(context2)) {
          diag2.debug("Instrumentation suppressed, returning Noop Span");
          var nonRecordingSpan = trace.wrapSpanContext(INVALID_SPAN_CONTEXT);
          return nonRecordingSpan;
        }
        var parentSpanContext = parentSpan === null || parentSpan === void 0 ? void 0 : parentSpan.spanContext();
        var spanId = this._idGenerator.generateSpanId();
        var traceId;
        var traceState;
        var parentSpanId;
        if (!parentSpanContext || !trace.isSpanContextValid(parentSpanContext)) {
          traceId = this._idGenerator.generateTraceId();
        } else {
          traceId = parentSpanContext.traceId;
          traceState = parentSpanContext.traceState;
          parentSpanId = parentSpanContext.spanId;
        }
        var spanKind = (_a3 = options.kind) !== null && _a3 !== void 0 ? _a3 : SpanKind.INTERNAL;
        var links = ((_b = options.links) !== null && _b !== void 0 ? _b : []).map(function(link) {
          return {
            context: link.context,
            attributes: sanitizeAttributes(link.attributes)
          };
        });
        var attributes = sanitizeAttributes(options.attributes);
        var samplingResult = this._sampler.shouldSample(context2, traceId, name, spanKind, attributes, links);
        traceState = (_c = samplingResult.traceState) !== null && _c !== void 0 ? _c : traceState;
        var traceFlags = samplingResult.decision === SamplingDecision.RECORD_AND_SAMPLED ? TraceFlags.SAMPLED : TraceFlags.NONE;
        var spanContext = { traceId, spanId, traceFlags, traceState };
        if (samplingResult.decision === SamplingDecision.NOT_RECORD) {
          diag2.debug("Recording is off, propagating context in a non-recording span");
          var nonRecordingSpan = trace.wrapSpanContext(spanContext);
          return nonRecordingSpan;
        }
        var initAttributes = sanitizeAttributes(Object.assign(attributes, samplingResult.attributes));
        var span = new Span(this, context2, name, spanContext, spanKind, parentSpanId, links, options.startTime, void 0, initAttributes);
        return span;
      };
      Tracer2.prototype.startActiveSpan = function(name, arg2, arg3, arg4) {
        var opts;
        var ctx;
        var fn;
        if (arguments.length < 2) {
          return;
        } else if (arguments.length === 2) {
          fn = arg2;
        } else if (arguments.length === 3) {
          opts = arg2;
          fn = arg3;
        } else {
          opts = arg2;
          ctx = arg3;
          fn = arg4;
        }
        var parentContext = ctx !== null && ctx !== void 0 ? ctx : context.active();
        var span = this.startSpan(name, opts, parentContext);
        var contextWithSpanSet = trace.setSpan(parentContext, span);
        return context.with(contextWithSpanSet, fn, void 0, span);
      };
      Tracer2.prototype.getGeneralLimits = function() {
        return this._generalLimits;
      };
      Tracer2.prototype.getSpanLimits = function() {
        return this._spanLimits;
      };
      Tracer2.prototype.getActiveSpanProcessor = function() {
        return this._tracerProvider.getActiveSpanProcessor();
      };
      return Tracer2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+resources@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/resources/build/esm/platform/browser/default-service-name.js
  function defaultServiceName() {
    return "unknown_service";
  }

  // node_modules/.pnpm/@opentelemetry+resources@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/resources/build/esm/Resource.js
  var __assign = function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __awaiter = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __read10 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var Resource = (
    /** @class */
    function() {
      function Resource2(attributes, asyncAttributesPromise) {
        var _this = this;
        var _a3;
        this._attributes = attributes;
        this.asyncAttributesPending = asyncAttributesPromise != null;
        this._syncAttributes = (_a3 = this._attributes) !== null && _a3 !== void 0 ? _a3 : {};
        this._asyncAttributesPromise = asyncAttributesPromise === null || asyncAttributesPromise === void 0 ? void 0 : asyncAttributesPromise.then(function(asyncAttributes) {
          _this._attributes = Object.assign({}, _this._attributes, asyncAttributes);
          _this.asyncAttributesPending = false;
          return asyncAttributes;
        }, function(err) {
          diag2.debug("a resource's async attributes promise rejected: %s", err);
          _this.asyncAttributesPending = false;
          return {};
        });
      }
      Resource2.empty = function() {
        return Resource2.EMPTY;
      };
      Resource2.default = function() {
        var _a3;
        return new Resource2((_a3 = {}, _a3[SemanticResourceAttributes.SERVICE_NAME] = defaultServiceName(), _a3[SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE] = SDK_INFO[SemanticResourceAttributes.TELEMETRY_SDK_LANGUAGE], _a3[SemanticResourceAttributes.TELEMETRY_SDK_NAME] = SDK_INFO[SemanticResourceAttributes.TELEMETRY_SDK_NAME], _a3[SemanticResourceAttributes.TELEMETRY_SDK_VERSION] = SDK_INFO[SemanticResourceAttributes.TELEMETRY_SDK_VERSION], _a3));
      };
      Object.defineProperty(Resource2.prototype, "attributes", {
        get: function() {
          var _a3;
          if (this.asyncAttributesPending) {
            diag2.error("Accessing resource attributes before async attributes settled");
          }
          return (_a3 = this._attributes) !== null && _a3 !== void 0 ? _a3 : {};
        },
        enumerable: false,
        configurable: true
      });
      Resource2.prototype.waitForAsyncAttributes = function() {
        return __awaiter(this, void 0, void 0, function() {
          return __generator(this, function(_a3) {
            switch (_a3.label) {
              case 0:
                if (!this.asyncAttributesPending)
                  return [3, 2];
                return [4, this._asyncAttributesPromise];
              case 1:
                _a3.sent();
                _a3.label = 2;
              case 2:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      Resource2.prototype.merge = function(other) {
        var _this = this;
        var _a3;
        if (!other)
          return this;
        var mergedSyncAttributes = __assign(__assign({}, this._syncAttributes), (_a3 = other._syncAttributes) !== null && _a3 !== void 0 ? _a3 : other.attributes);
        if (!this._asyncAttributesPromise && !other._asyncAttributesPromise) {
          return new Resource2(mergedSyncAttributes);
        }
        var mergedAttributesPromise = Promise.all([
          this._asyncAttributesPromise,
          other._asyncAttributesPromise
        ]).then(function(_a4) {
          var _b;
          var _c = __read10(_a4, 2), thisAsyncAttributes = _c[0], otherAsyncAttributes = _c[1];
          return __assign(__assign(__assign(__assign({}, _this._syncAttributes), thisAsyncAttributes), (_b = other._syncAttributes) !== null && _b !== void 0 ? _b : other.attributes), otherAsyncAttributes);
        });
        return new Resource2(mergedSyncAttributes, mergedAttributesPromise);
      };
      Resource2.EMPTY = new Resource2({});
      return Resource2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/MultiSpanProcessor.js
  var __values6 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var MultiSpanProcessor = (
    /** @class */
    function() {
      function MultiSpanProcessor2(_spanProcessors) {
        this._spanProcessors = _spanProcessors;
      }
      MultiSpanProcessor2.prototype.forceFlush = function() {
        var e_1, _a3;
        var promises = [];
        try {
          for (var _b = __values6(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) {
            var spanProcessor = _c.value;
            promises.push(spanProcessor.forceFlush());
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return new Promise(function(resolve) {
          Promise.all(promises).then(function() {
            resolve();
          }).catch(function(error) {
            globalErrorHandler(error || new Error("MultiSpanProcessor: forceFlush failed"));
            resolve();
          });
        });
      };
      MultiSpanProcessor2.prototype.onStart = function(span, context2) {
        var e_2, _a3;
        try {
          for (var _b = __values6(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) {
            var spanProcessor = _c.value;
            spanProcessor.onStart(span, context2);
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      };
      MultiSpanProcessor2.prototype.onEnd = function(span) {
        var e_3, _a3;
        try {
          for (var _b = __values6(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) {
            var spanProcessor = _c.value;
            spanProcessor.onEnd(span);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
      };
      MultiSpanProcessor2.prototype.shutdown = function() {
        var e_4, _a3;
        var promises = [];
        try {
          for (var _b = __values6(this._spanProcessors), _c = _b.next(); !_c.done; _c = _b.next()) {
            var spanProcessor = _c.value;
            promises.push(spanProcessor.shutdown());
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_4)
              throw e_4.error;
          }
        }
        return new Promise(function(resolve, reject) {
          Promise.all(promises).then(function() {
            resolve();
          }, reject);
        });
      };
      return MultiSpanProcessor2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/export/NoopSpanProcessor.js
  var NoopSpanProcessor = (
    /** @class */
    function() {
      function NoopSpanProcessor2() {
      }
      NoopSpanProcessor2.prototype.onStart = function(_span, _context) {
      };
      NoopSpanProcessor2.prototype.onEnd = function(_span) {
      };
      NoopSpanProcessor2.prototype.shutdown = function() {
        return Promise.resolve();
      };
      NoopSpanProcessor2.prototype.forceFlush = function() {
        return Promise.resolve();
      };
      return NoopSpanProcessor2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-base@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-base/build/esm/BasicTracerProvider.js
  var ForceFlushState;
  (function(ForceFlushState2) {
    ForceFlushState2[ForceFlushState2["resolved"] = 0] = "resolved";
    ForceFlushState2[ForceFlushState2["timeout"] = 1] = "timeout";
    ForceFlushState2[ForceFlushState2["error"] = 2] = "error";
    ForceFlushState2[ForceFlushState2["unresolved"] = 3] = "unresolved";
  })(ForceFlushState || (ForceFlushState = {}));
  var BasicTracerProvider = (
    /** @class */
    function() {
      function BasicTracerProvider2(config) {
        if (config === void 0) {
          config = {};
        }
        var _a3;
        this._registeredSpanProcessors = [];
        this._tracers = /* @__PURE__ */ new Map();
        var mergedConfig = merge({}, loadDefaultConfig(), reconfigureLimits(config));
        this.resource = (_a3 = mergedConfig.resource) !== null && _a3 !== void 0 ? _a3 : Resource.empty();
        this.resource = Resource.default().merge(this.resource);
        this._config = Object.assign({}, mergedConfig, {
          resource: this.resource
        });
        var defaultExporter = this._buildExporterFromEnv();
        if (defaultExporter !== void 0) {
          var batchProcessor = new BatchSpanProcessor(defaultExporter);
          this.activeSpanProcessor = batchProcessor;
        } else {
          this.activeSpanProcessor = new NoopSpanProcessor();
        }
      }
      BasicTracerProvider2.prototype.getTracer = function(name, version, options) {
        var key = name + "@" + (version || "") + ":" + ((options === null || options === void 0 ? void 0 : options.schemaUrl) || "");
        if (!this._tracers.has(key)) {
          this._tracers.set(key, new Tracer({ name, version, schemaUrl: options === null || options === void 0 ? void 0 : options.schemaUrl }, this._config, this));
        }
        return this._tracers.get(key);
      };
      BasicTracerProvider2.prototype.addSpanProcessor = function(spanProcessor) {
        if (this._registeredSpanProcessors.length === 0) {
          this.activeSpanProcessor.shutdown().catch(function(err) {
            return diag2.error("Error while trying to shutdown current span processor", err);
          });
        }
        this._registeredSpanProcessors.push(spanProcessor);
        this.activeSpanProcessor = new MultiSpanProcessor(this._registeredSpanProcessors);
      };
      BasicTracerProvider2.prototype.getActiveSpanProcessor = function() {
        return this.activeSpanProcessor;
      };
      BasicTracerProvider2.prototype.register = function(config) {
        if (config === void 0) {
          config = {};
        }
        trace.setGlobalTracerProvider(this);
        if (config.propagator === void 0) {
          config.propagator = this._buildPropagatorFromEnv();
        }
        if (config.contextManager) {
          context.setGlobalContextManager(config.contextManager);
        }
        if (config.propagator) {
          propagation.setGlobalPropagator(config.propagator);
        }
      };
      BasicTracerProvider2.prototype.forceFlush = function() {
        var timeout = this._config.forceFlushTimeoutMillis;
        var promises = this._registeredSpanProcessors.map(function(spanProcessor) {
          return new Promise(function(resolve) {
            var state;
            var timeoutInterval = setTimeout(function() {
              resolve(new Error("Span processor did not completed within timeout period of " + timeout + " ms"));
              state = ForceFlushState.timeout;
            }, timeout);
            spanProcessor.forceFlush().then(function() {
              clearTimeout(timeoutInterval);
              if (state !== ForceFlushState.timeout) {
                state = ForceFlushState.resolved;
                resolve(state);
              }
            }).catch(function(error) {
              clearTimeout(timeoutInterval);
              state = ForceFlushState.error;
              resolve(error);
            });
          });
        });
        return new Promise(function(resolve, reject) {
          Promise.all(promises).then(function(results) {
            var errors = results.filter(function(result) {
              return result !== ForceFlushState.resolved;
            });
            if (errors.length > 0) {
              reject(errors);
            } else {
              resolve();
            }
          }).catch(function(error) {
            return reject([error]);
          });
        });
      };
      BasicTracerProvider2.prototype.shutdown = function() {
        return this.activeSpanProcessor.shutdown();
      };
      BasicTracerProvider2.prototype._getPropagator = function(name) {
        var _a3;
        return (_a3 = this.constructor._registeredPropagators.get(name)) === null || _a3 === void 0 ? void 0 : _a3();
      };
      BasicTracerProvider2.prototype._getSpanExporter = function(name) {
        var _a3;
        return (_a3 = this.constructor._registeredExporters.get(name)) === null || _a3 === void 0 ? void 0 : _a3();
      };
      BasicTracerProvider2.prototype._buildPropagatorFromEnv = function() {
        var _this = this;
        var uniquePropagatorNames = Array.from(new Set(getEnv().OTEL_PROPAGATORS));
        var propagators = uniquePropagatorNames.map(function(name) {
          var propagator = _this._getPropagator(name);
          if (!propagator) {
            diag2.warn('Propagator "' + name + '" requested through environment variable is unavailable.');
          }
          return propagator;
        });
        var validPropagators = propagators.reduce(function(list, item) {
          if (item) {
            list.push(item);
          }
          return list;
        }, []);
        if (validPropagators.length === 0) {
          return;
        } else if (uniquePropagatorNames.length === 1) {
          return validPropagators[0];
        } else {
          return new CompositePropagator({
            propagators: validPropagators
          });
        }
      };
      BasicTracerProvider2.prototype._buildExporterFromEnv = function() {
        var exporterName = getEnv().OTEL_TRACES_EXPORTER;
        if (exporterName === "none" || exporterName === "")
          return;
        var exporter = this._getSpanExporter(exporterName);
        if (!exporter) {
          diag2.error('Exporter "' + exporterName + '" requested through environment variable is unavailable.');
        }
        return exporter;
      };
      BasicTracerProvider2._registeredPropagators = /* @__PURE__ */ new Map([
        ["tracecontext", function() {
          return new W3CTraceContextPropagator();
        }],
        ["baggage", function() {
          return new W3CBaggagePropagator();
        }]
      ]);
      BasicTracerProvider2._registeredExporters = /* @__PURE__ */ new Map();
      return BasicTracerProvider2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-web@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-web/build/esm/StackContextManager.js
  var __read11 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var __spreadArray6 = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  var StackContextManager = (
    /** @class */
    function() {
      function StackContextManager2() {
        this._enabled = false;
        this._currentContext = ROOT_CONTEXT;
      }
      StackContextManager2.prototype._bindFunction = function(context2, target) {
        if (context2 === void 0) {
          context2 = ROOT_CONTEXT;
        }
        var manager = this;
        var contextWrapper = function() {
          var _this = this;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return manager.with(context2, function() {
            return target.apply(_this, args);
          });
        };
        Object.defineProperty(contextWrapper, "length", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: target.length
        });
        return contextWrapper;
      };
      StackContextManager2.prototype.active = function() {
        return this._currentContext;
      };
      StackContextManager2.prototype.bind = function(context2, target) {
        if (context2 === void 0) {
          context2 = this.active();
        }
        if (typeof target === "function") {
          return this._bindFunction(context2, target);
        }
        return target;
      };
      StackContextManager2.prototype.disable = function() {
        this._currentContext = ROOT_CONTEXT;
        this._enabled = false;
        return this;
      };
      StackContextManager2.prototype.enable = function() {
        if (this._enabled) {
          return this;
        }
        this._enabled = true;
        this._currentContext = ROOT_CONTEXT;
        return this;
      };
      StackContextManager2.prototype.with = function(context2, fn, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        var previousContext = this._currentContext;
        this._currentContext = context2 || ROOT_CONTEXT;
        try {
          return fn.call.apply(fn, __spreadArray6([thisArg], __read11(args), false));
        } finally {
          this._currentContext = previousContext;
        }
      };
      return StackContextManager2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-web@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-web/build/esm/WebTracerProvider.js
  var __extends4 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var WebTracerProvider = (
    /** @class */
    function(_super) {
      __extends4(WebTracerProvider2, _super);
      function WebTracerProvider2(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this, config) || this;
        if (config.contextManager) {
          throw "contextManager should be defined in register method not in constructor";
        }
        if (config.propagator) {
          throw "propagator should be defined in register method not in constructor";
        }
        return _this;
      }
      WebTracerProvider2.prototype.register = function(config) {
        if (config === void 0) {
          config = {};
        }
        if (config.contextManager === void 0) {
          config.contextManager = new StackContextManager();
        }
        if (config.contextManager) {
          config.contextManager.enable();
        }
        _super.prototype.register.call(this, config);
      };
      return WebTracerProvider2;
    }(BasicTracerProvider)
  );

  // node_modules/.pnpm/@opentelemetry+sdk-trace-web@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-web/build/esm/enums/PerformanceTimingNames.js
  var PerformanceTimingNames;
  (function(PerformanceTimingNames2) {
    PerformanceTimingNames2["CONNECT_END"] = "connectEnd";
    PerformanceTimingNames2["CONNECT_START"] = "connectStart";
    PerformanceTimingNames2["DECODED_BODY_SIZE"] = "decodedBodySize";
    PerformanceTimingNames2["DOM_COMPLETE"] = "domComplete";
    PerformanceTimingNames2["DOM_CONTENT_LOADED_EVENT_END"] = "domContentLoadedEventEnd";
    PerformanceTimingNames2["DOM_CONTENT_LOADED_EVENT_START"] = "domContentLoadedEventStart";
    PerformanceTimingNames2["DOM_INTERACTIVE"] = "domInteractive";
    PerformanceTimingNames2["DOMAIN_LOOKUP_END"] = "domainLookupEnd";
    PerformanceTimingNames2["DOMAIN_LOOKUP_START"] = "domainLookupStart";
    PerformanceTimingNames2["ENCODED_BODY_SIZE"] = "encodedBodySize";
    PerformanceTimingNames2["FETCH_START"] = "fetchStart";
    PerformanceTimingNames2["LOAD_EVENT_END"] = "loadEventEnd";
    PerformanceTimingNames2["LOAD_EVENT_START"] = "loadEventStart";
    PerformanceTimingNames2["NAVIGATION_START"] = "navigationStart";
    PerformanceTimingNames2["REDIRECT_END"] = "redirectEnd";
    PerformanceTimingNames2["REDIRECT_START"] = "redirectStart";
    PerformanceTimingNames2["REQUEST_START"] = "requestStart";
    PerformanceTimingNames2["RESPONSE_END"] = "responseEnd";
    PerformanceTimingNames2["RESPONSE_START"] = "responseStart";
    PerformanceTimingNames2["SECURE_CONNECTION_START"] = "secureConnectionStart";
    PerformanceTimingNames2["UNLOAD_EVENT_END"] = "unloadEventEnd";
    PerformanceTimingNames2["UNLOAD_EVENT_START"] = "unloadEventStart";
  })(PerformanceTimingNames || (PerformanceTimingNames = {}));

  // node_modules/.pnpm/@opentelemetry+sdk-trace-web@1.23.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-trace-web/build/esm/utils.js
  var urlNormalizingAnchor;
  function getUrlNormalizingAnchor() {
    if (!urlNormalizingAnchor) {
      urlNormalizingAnchor = document.createElement("a");
    }
    return urlNormalizingAnchor;
  }
  function hasKey(obj, key) {
    return key in obj;
  }
  function addSpanNetworkEvent(span, performanceName, entries) {
    if (hasKey(entries, performanceName) && typeof entries[performanceName] === "number") {
      span.addEvent(performanceName, entries[performanceName]);
      return span;
    }
    return void 0;
  }
  function addSpanNetworkEvents(span, resource2) {
    addSpanNetworkEvent(span, PerformanceTimingNames.FETCH_START, resource2);
    addSpanNetworkEvent(span, PerformanceTimingNames.DOMAIN_LOOKUP_START, resource2);
    addSpanNetworkEvent(span, PerformanceTimingNames.DOMAIN_LOOKUP_END, resource2);
    addSpanNetworkEvent(span, PerformanceTimingNames.CONNECT_START, resource2);
    if (hasKey(resource2, "name") && resource2["name"].startsWith("https:")) {
      addSpanNetworkEvent(span, PerformanceTimingNames.SECURE_CONNECTION_START, resource2);
    }
    addSpanNetworkEvent(span, PerformanceTimingNames.CONNECT_END, resource2);
    addSpanNetworkEvent(span, PerformanceTimingNames.REQUEST_START, resource2);
    addSpanNetworkEvent(span, PerformanceTimingNames.RESPONSE_START, resource2);
    addSpanNetworkEvent(span, PerformanceTimingNames.RESPONSE_END, resource2);
    var encodedLength = resource2[PerformanceTimingNames.ENCODED_BODY_SIZE];
    if (encodedLength !== void 0) {
      span.setAttribute(SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH, encodedLength);
    }
    var decodedLength = resource2[PerformanceTimingNames.DECODED_BODY_SIZE];
    if (decodedLength !== void 0 && encodedLength !== decodedLength) {
      span.setAttribute(SemanticAttributes.HTTP_RESPONSE_CONTENT_LENGTH_UNCOMPRESSED, decodedLength);
    }
  }
  function sortResources(filteredResources) {
    return filteredResources.slice().sort(function(a, b) {
      var valueA = a[PerformanceTimingNames.FETCH_START];
      var valueB = b[PerformanceTimingNames.FETCH_START];
      if (valueA > valueB) {
        return 1;
      } else if (valueA < valueB) {
        return -1;
      }
      return 0;
    });
  }
  function getOrigin() {
    return typeof location !== "undefined" ? location.origin : void 0;
  }
  function getResource(spanUrl, startTimeHR, endTimeHR, resources, ignoredResources, initiatorType) {
    if (ignoredResources === void 0) {
      ignoredResources = /* @__PURE__ */ new WeakSet();
    }
    var parsedSpanUrl = parseUrl(spanUrl);
    spanUrl = parsedSpanUrl.toString();
    var filteredResources = filterResourcesForSpan(spanUrl, startTimeHR, endTimeHR, resources, ignoredResources, initiatorType);
    if (filteredResources.length === 0) {
      return {
        mainRequest: void 0
      };
    }
    if (filteredResources.length === 1) {
      return {
        mainRequest: filteredResources[0]
      };
    }
    var sorted = sortResources(filteredResources);
    if (parsedSpanUrl.origin !== getOrigin() && sorted.length > 1) {
      var corsPreFlightRequest = sorted[0];
      var mainRequest = findMainRequest(sorted, corsPreFlightRequest[PerformanceTimingNames.RESPONSE_END], endTimeHR);
      var responseEnd = corsPreFlightRequest[PerformanceTimingNames.RESPONSE_END];
      var fetchStart = mainRequest[PerformanceTimingNames.FETCH_START];
      if (fetchStart < responseEnd) {
        mainRequest = corsPreFlightRequest;
        corsPreFlightRequest = void 0;
      }
      return {
        corsPreFlightRequest,
        mainRequest
      };
    } else {
      return {
        mainRequest: filteredResources[0]
      };
    }
  }
  function findMainRequest(resources, corsPreFlightRequestEndTime, spanEndTimeHR) {
    var spanEndTime = hrTimeToNanoseconds(spanEndTimeHR);
    var minTime = hrTimeToNanoseconds(timeInputToHrTime(corsPreFlightRequestEndTime));
    var mainRequest = resources[1];
    var bestGap;
    var length = resources.length;
    for (var i = 1; i < length; i++) {
      var resource2 = resources[i];
      var resourceStartTime = hrTimeToNanoseconds(timeInputToHrTime(resource2[PerformanceTimingNames.FETCH_START]));
      var resourceEndTime = hrTimeToNanoseconds(timeInputToHrTime(resource2[PerformanceTimingNames.RESPONSE_END]));
      var currentGap = spanEndTime - resourceEndTime;
      if (resourceStartTime >= minTime && (!bestGap || currentGap < bestGap)) {
        bestGap = currentGap;
        mainRequest = resource2;
      }
    }
    return mainRequest;
  }
  function filterResourcesForSpan(spanUrl, startTimeHR, endTimeHR, resources, ignoredResources, initiatorType) {
    var startTime = hrTimeToNanoseconds(startTimeHR);
    var endTime = hrTimeToNanoseconds(endTimeHR);
    var filteredResources = resources.filter(function(resource2) {
      var resourceStartTime = hrTimeToNanoseconds(timeInputToHrTime(resource2[PerformanceTimingNames.FETCH_START]));
      var resourceEndTime = hrTimeToNanoseconds(timeInputToHrTime(resource2[PerformanceTimingNames.RESPONSE_END]));
      return resource2.initiatorType.toLowerCase() === (initiatorType || "xmlhttprequest") && resource2.name === spanUrl && resourceStartTime >= startTime && resourceEndTime <= endTime;
    });
    if (filteredResources.length > 0) {
      filteredResources = filteredResources.filter(function(resource2) {
        return !ignoredResources.has(resource2);
      });
    }
    return filteredResources;
  }
  function parseUrl(url) {
    if (typeof URL === "function") {
      return new URL(url, typeof document !== "undefined" ? document.baseURI : typeof location !== "undefined" ? location.href : void 0);
    }
    var element = getUrlNormalizingAnchor();
    element.href = url;
    return element;
  }
  function getElementXPath(target, optimised) {
    if (target.nodeType === Node.DOCUMENT_NODE) {
      return "/";
    }
    var targetValue = getNodeValue(target, optimised);
    if (optimised && targetValue.indexOf("@id") > 0) {
      return targetValue;
    }
    var xpath = "";
    if (target.parentNode) {
      xpath += getElementXPath(target.parentNode, false);
    }
    xpath += targetValue;
    return xpath;
  }
  function getNodeIndex(target) {
    if (!target.parentNode) {
      return 0;
    }
    var allowedTypes = [target.nodeType];
    if (target.nodeType === Node.CDATA_SECTION_NODE) {
      allowedTypes.push(Node.TEXT_NODE);
    }
    var elements = Array.from(target.parentNode.childNodes);
    elements = elements.filter(function(element) {
      var localName = element.localName;
      return allowedTypes.indexOf(element.nodeType) >= 0 && localName === target.localName;
    });
    if (elements.length >= 1) {
      return elements.indexOf(target) + 1;
    }
    return 0;
  }
  function getNodeValue(target, optimised) {
    var nodeType = target.nodeType;
    var index = getNodeIndex(target);
    var nodeValue = "";
    if (nodeType === Node.ELEMENT_NODE) {
      var id = target.getAttribute("id");
      if (optimised && id) {
        return '//*[@id="' + id + '"]';
      }
      nodeValue = target.localName;
    } else if (nodeType === Node.TEXT_NODE || nodeType === Node.CDATA_SECTION_NODE) {
      nodeValue = "text()";
    } else if (nodeType === Node.COMMENT_NODE) {
      nodeValue = "comment()";
    } else {
      return "";
    }
    if (nodeValue && index > 1) {
      return "/" + nodeValue + "[" + index + "]";
    }
    return "/" + nodeValue;
  }
  function shouldPropagateTraceHeaders(spanUrl, propagateTraceHeaderCorsUrls) {
    var propagateTraceHeaderUrls = propagateTraceHeaderCorsUrls || [];
    if (typeof propagateTraceHeaderUrls === "string" || propagateTraceHeaderUrls instanceof RegExp) {
      propagateTraceHeaderUrls = [propagateTraceHeaderUrls];
    }
    var parsedSpanUrl = parseUrl(spanUrl);
    if (parsedSpanUrl.origin === getOrigin()) {
      return true;
    } else {
      return propagateTraceHeaderUrls.some(function(propagateTraceHeaderUrl) {
        return urlMatches(spanUrl, propagateTraceHeaderUrl);
      });
    }
  }

  // node_modules/.pnpm/@opentelemetry+api-logs@0.50.0/node_modules/@opentelemetry/api-logs/build/esm/NoopLogger.js
  var NoopLogger = (
    /** @class */
    function() {
      function NoopLogger2() {
      }
      NoopLogger2.prototype.emit = function(_logRecord) {
      };
      return NoopLogger2;
    }()
  );
  var NOOP_LOGGER = new NoopLogger();

  // node_modules/.pnpm/@opentelemetry+api-logs@0.50.0/node_modules/@opentelemetry/api-logs/build/esm/NoopLoggerProvider.js
  var NoopLoggerProvider = (
    /** @class */
    function() {
      function NoopLoggerProvider2() {
      }
      NoopLoggerProvider2.prototype.getLogger = function(_name, _version, _options) {
        return new NoopLogger();
      };
      return NoopLoggerProvider2;
    }()
  );
  var NOOP_LOGGER_PROVIDER = new NoopLoggerProvider();

  // node_modules/.pnpm/@opentelemetry+api-logs@0.50.0/node_modules/@opentelemetry/api-logs/build/esm/platform/browser/globalThis.js
  var _globalThis3 = typeof globalThis === "object" ? globalThis : typeof self === "object" ? self : typeof window === "object" ? window : typeof global === "object" ? global : {};

  // node_modules/.pnpm/@opentelemetry+api-logs@0.50.0/node_modules/@opentelemetry/api-logs/build/esm/internal/global-utils.js
  var GLOBAL_LOGS_API_KEY = Symbol.for("io.opentelemetry.js.api.logs");
  var _global2 = _globalThis3;
  function makeGetter(requiredVersion, instance, fallback) {
    return function(version) {
      return version === requiredVersion ? instance : fallback;
    };
  }
  var API_BACKWARDS_COMPATIBILITY_VERSION = 1;

  // node_modules/.pnpm/@opentelemetry+api-logs@0.50.0/node_modules/@opentelemetry/api-logs/build/esm/api/logs.js
  var LogsAPI = (
    /** @class */
    function() {
      function LogsAPI2() {
      }
      LogsAPI2.getInstance = function() {
        if (!this._instance) {
          this._instance = new LogsAPI2();
        }
        return this._instance;
      };
      LogsAPI2.prototype.setGlobalLoggerProvider = function(provider) {
        if (_global2[GLOBAL_LOGS_API_KEY]) {
          return this.getLoggerProvider();
        }
        _global2[GLOBAL_LOGS_API_KEY] = makeGetter(API_BACKWARDS_COMPATIBILITY_VERSION, provider, NOOP_LOGGER_PROVIDER);
        return provider;
      };
      LogsAPI2.prototype.getLoggerProvider = function() {
        var _a3, _b;
        return (_b = (_a3 = _global2[GLOBAL_LOGS_API_KEY]) === null || _a3 === void 0 ? void 0 : _a3.call(_global2, API_BACKWARDS_COMPATIBILITY_VERSION)) !== null && _b !== void 0 ? _b : NOOP_LOGGER_PROVIDER;
      };
      LogsAPI2.prototype.getLogger = function(name, version, options) {
        return this.getLoggerProvider().getLogger(name, version, options);
      };
      LogsAPI2.prototype.disable = function() {
        delete _global2[GLOBAL_LOGS_API_KEY];
      };
      return LogsAPI2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+api-logs@0.50.0/node_modules/@opentelemetry/api-logs/build/esm/index.js
  var logs = LogsAPI.getInstance();

  // node_modules/.pnpm/@opentelemetry+instrumentation@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation/build/esm/autoLoaderUtils.js
  function parseInstrumentationOptions(options) {
    if (options === void 0) {
      options = [];
    }
    var instrumentations = [];
    for (var i = 0, j = options.length; i < j; i++) {
      var option = options[i];
      if (Array.isArray(option)) {
        var results = parseInstrumentationOptions(option);
        instrumentations = instrumentations.concat(results.instrumentations);
      } else if (typeof option === "function") {
        instrumentations.push(new option());
      } else if (option.instrumentationName) {
        instrumentations.push(option);
      }
    }
    return { instrumentations };
  }
  function enableInstrumentations(instrumentations, tracerProvider2, meterProvider, loggerProvider2) {
    for (var i = 0, j = instrumentations.length; i < j; i++) {
      var instrumentation = instrumentations[i];
      if (tracerProvider2) {
        instrumentation.setTracerProvider(tracerProvider2);
      }
      if (meterProvider) {
        instrumentation.setMeterProvider(meterProvider);
      }
      if (loggerProvider2 && instrumentation.setLoggerProvider) {
        instrumentation.setLoggerProvider(loggerProvider2);
      }
      if (!instrumentation.getConfig().enabled) {
        instrumentation.enable();
      }
    }
  }
  function disableInstrumentations(instrumentations) {
    instrumentations.forEach(function(instrumentation) {
      return instrumentation.disable();
    });
  }

  // node_modules/.pnpm/@opentelemetry+instrumentation@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation/build/esm/autoLoader.js
  function registerInstrumentations(options) {
    var instrumentations = parseInstrumentationOptions(options.instrumentations).instrumentations;
    var tracerProvider2 = options.tracerProvider || trace.getTracerProvider();
    var meterProvider = options.meterProvider || metrics.getMeterProvider();
    var loggerProvider2 = options.loggerProvider || logs.getLoggerProvider();
    enableInstrumentations(instrumentations, tracerProvider2, meterProvider, loggerProvider2);
    return function() {
      disableInstrumentations(instrumentations);
    };
  }

  // node_modules/.pnpm/@opentelemetry+instrumentation@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation/build/esm/instrumentation.js
  var shimmer = __toESM(require_shimmer());
  var __assign2 = function() {
    __assign2 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign2.apply(this, arguments);
  };
  var InstrumentationAbstract = (
    /** @class */
    function() {
      function InstrumentationAbstract2(instrumentationName, instrumentationVersion, config) {
        if (config === void 0) {
          config = {};
        }
        this.instrumentationName = instrumentationName;
        this.instrumentationVersion = instrumentationVersion;
        this._wrap = shimmer.wrap;
        this._unwrap = shimmer.unwrap;
        this._massWrap = shimmer.massWrap;
        this._massUnwrap = shimmer.massUnwrap;
        this._config = __assign2({ enabled: true }, config);
        this._diag = diag2.createComponentLogger({
          namespace: instrumentationName
        });
        this._tracer = trace.getTracer(instrumentationName, instrumentationVersion);
        this._meter = metrics.getMeter(instrumentationName, instrumentationVersion);
        this._logger = logs.getLogger(instrumentationName, instrumentationVersion);
        this._updateMetricInstruments();
      }
      Object.defineProperty(InstrumentationAbstract2.prototype, "meter", {
        /* Returns meter */
        get: function() {
          return this._meter;
        },
        enumerable: false,
        configurable: true
      });
      InstrumentationAbstract2.prototype.setMeterProvider = function(meterProvider) {
        this._meter = meterProvider.getMeter(this.instrumentationName, this.instrumentationVersion);
        this._updateMetricInstruments();
      };
      Object.defineProperty(InstrumentationAbstract2.prototype, "logger", {
        /* Returns logger */
        get: function() {
          return this._logger;
        },
        enumerable: false,
        configurable: true
      });
      InstrumentationAbstract2.prototype.setLoggerProvider = function(loggerProvider2) {
        this._logger = loggerProvider2.getLogger(this.instrumentationName, this.instrumentationVersion);
      };
      InstrumentationAbstract2.prototype.getModuleDefinitions = function() {
        var _a3;
        var initResult = (_a3 = this.init()) !== null && _a3 !== void 0 ? _a3 : [];
        if (!Array.isArray(initResult)) {
          return [initResult];
        }
        return initResult;
      };
      InstrumentationAbstract2.prototype._updateMetricInstruments = function() {
        return;
      };
      InstrumentationAbstract2.prototype.getConfig = function() {
        return this._config;
      };
      InstrumentationAbstract2.prototype.setConfig = function(config) {
        if (config === void 0) {
          config = {};
        }
        this._config = Object.assign({}, config);
      };
      InstrumentationAbstract2.prototype.setTracerProvider = function(tracerProvider2) {
        this._tracer = tracerProvider2.getTracer(this.instrumentationName, this.instrumentationVersion);
      };
      Object.defineProperty(InstrumentationAbstract2.prototype, "tracer", {
        /* Returns tracer */
        get: function() {
          return this._tracer;
        },
        enumerable: false,
        configurable: true
      });
      return InstrumentationAbstract2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+instrumentation@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation/build/esm/platform/browser/instrumentation.js
  var __extends5 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var InstrumentationBase = (
    /** @class */
    function(_super) {
      __extends5(InstrumentationBase2, _super);
      function InstrumentationBase2(instrumentationName, instrumentationVersion, config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this, instrumentationName, instrumentationVersion, config) || this;
        if (_this._config.enabled) {
          _this.enable();
        }
        return _this;
      }
      return InstrumentationBase2;
    }(InstrumentationAbstract)
  );

  // node_modules/.pnpm/@opentelemetry+instrumentation@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation/build/esm/utils.js
  function safeExecuteInTheMiddle(execute, onFinish, preventThrowingError) {
    var error;
    var result;
    try {
      result = execute();
    } catch (e) {
      error = e;
    } finally {
      onFinish(error, result);
      if (error && !preventThrowingError) {
        throw error;
      }
      return result;
    }
  }
  function isWrapped(func) {
    return typeof func === "function" && typeof func.__original === "function" && typeof func.__unwrap === "function" && func.__wrapped === true;
  }

  // node_modules/.pnpm/@opentelemetry+instrumentation-document-load@0.37.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-document-load/build/esm/enums/AttributeNames.js
  var AttributeNames;
  (function(AttributeNames5) {
    AttributeNames5["DOCUMENT_LOAD"] = "documentLoad";
    AttributeNames5["DOCUMENT_FETCH"] = "documentFetch";
    AttributeNames5["RESOURCE_FETCH"] = "resourceFetch";
  })(AttributeNames || (AttributeNames = {}));

  // node_modules/.pnpm/@opentelemetry+instrumentation-document-load@0.37.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-document-load/build/esm/version.js
  var VERSION4 = "0.37.0";

  // node_modules/.pnpm/@opentelemetry+instrumentation-document-load@0.37.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-document-load/build/esm/enums/EventNames.js
  var EventNames;
  (function(EventNames3) {
    EventNames3["FIRST_PAINT"] = "firstPaint";
    EventNames3["FIRST_CONTENTFUL_PAINT"] = "firstContentfulPaint";
  })(EventNames || (EventNames = {}));

  // node_modules/.pnpm/@opentelemetry+instrumentation-document-load@0.37.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-document-load/build/esm/utils.js
  var getPerformanceNavigationEntries = function() {
    var _a3, _b;
    var entries = {};
    var performanceNavigationTiming = (_b = (_a3 = otperformance).getEntriesByType) === null || _b === void 0 ? void 0 : _b.call(_a3, "navigation")[0];
    if (performanceNavigationTiming) {
      var keys = Object.values(PerformanceTimingNames);
      keys.forEach(function(key) {
        if (hasKey(performanceNavigationTiming, key)) {
          var value = performanceNavigationTiming[key];
          if (typeof value === "number") {
            entries[key] = value;
          }
        }
      });
    } else {
      var perf = otperformance;
      var performanceTiming_1 = perf.timing;
      if (performanceTiming_1) {
        var keys = Object.values(PerformanceTimingNames);
        keys.forEach(function(key) {
          if (hasKey(performanceTiming_1, key)) {
            var value = performanceTiming_1[key];
            if (typeof value === "number") {
              entries[key] = value;
            }
          }
        });
      }
    }
    return entries;
  };
  var performancePaintNames = {
    "first-paint": EventNames.FIRST_PAINT,
    "first-contentful-paint": EventNames.FIRST_CONTENTFUL_PAINT
  };
  var addSpanPerformancePaintEvents = function(span) {
    var _a3, _b;
    var performancePaintTiming = (_b = (_a3 = otperformance).getEntriesByType) === null || _b === void 0 ? void 0 : _b.call(_a3, "paint");
    if (performancePaintTiming) {
      performancePaintTiming.forEach(function(_a4) {
        var name = _a4.name, startTime = _a4.startTime;
        if (hasKey(performancePaintNames, name)) {
          span.addEvent(performancePaintNames[name], startTime);
        }
      });
    }
  };

  // node_modules/.pnpm/@opentelemetry+instrumentation-document-load@0.37.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-document-load/build/esm/instrumentation.js
  var __extends6 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DocumentLoadInstrumentation = (
    /** @class */
    function(_super) {
      __extends6(DocumentLoadInstrumentation2, _super);
      function DocumentLoadInstrumentation2(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this, "@opentelemetry/instrumentation-document-load", VERSION4, config) || this;
        _this.component = "document-load";
        _this.version = "1";
        _this.moduleName = _this.component;
        return _this;
      }
      DocumentLoadInstrumentation2.prototype.init = function() {
      };
      DocumentLoadInstrumentation2.prototype._onDocumentLoaded = function() {
        var _this = this;
        window.setTimeout(function() {
          _this._collectPerformance();
        });
      };
      DocumentLoadInstrumentation2.prototype._addResourcesSpans = function(rootSpan) {
        var _this = this;
        var _a3, _b;
        var resources = (_b = (_a3 = otperformance).getEntriesByType) === null || _b === void 0 ? void 0 : _b.call(_a3, "resource");
        if (resources) {
          resources.forEach(function(resource2) {
            _this._initResourceSpan(resource2, rootSpan);
          });
        }
      };
      DocumentLoadInstrumentation2.prototype._collectPerformance = function() {
        var _this = this;
        var metaElement = Array.from(document.getElementsByTagName("meta")).find(function(e) {
          return e.getAttribute("name") === TRACE_PARENT_HEADER;
        });
        var entries = getPerformanceNavigationEntries();
        var traceparent = metaElement && metaElement.content || "";
        context.with(propagation.extract(ROOT_CONTEXT, { traceparent }), function() {
          var _a3;
          var rootSpan = _this._startSpan(AttributeNames.DOCUMENT_LOAD, PerformanceTimingNames.FETCH_START, entries);
          if (!rootSpan) {
            return;
          }
          context.with(trace.setSpan(context.active(), rootSpan), function() {
            var fetchSpan = _this._startSpan(AttributeNames.DOCUMENT_FETCH, PerformanceTimingNames.FETCH_START, entries);
            if (fetchSpan) {
              fetchSpan.setAttribute(SEMATTRS_HTTP_URL, location.href);
              context.with(trace.setSpan(context.active(), fetchSpan), function() {
                var _a4;
                addSpanNetworkEvents(fetchSpan, entries);
                _this._addCustomAttributesOnSpan(fetchSpan, (_a4 = _this._getConfig().applyCustomAttributesOnSpan) === null || _a4 === void 0 ? void 0 : _a4.documentFetch);
                _this._endSpan(fetchSpan, PerformanceTimingNames.RESPONSE_END, entries);
              });
            }
          });
          rootSpan.setAttribute(SEMATTRS_HTTP_URL, location.href);
          rootSpan.setAttribute(SEMATTRS_HTTP_USER_AGENT, navigator.userAgent);
          _this._addResourcesSpans(rootSpan);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.FETCH_START, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.UNLOAD_EVENT_START, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.UNLOAD_EVENT_END, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.DOM_INTERACTIVE, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.DOM_CONTENT_LOADED_EVENT_START, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.DOM_CONTENT_LOADED_EVENT_END, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.DOM_COMPLETE, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.LOAD_EVENT_START, entries);
          addSpanNetworkEvent(rootSpan, PerformanceTimingNames.LOAD_EVENT_END, entries);
          addSpanPerformancePaintEvents(rootSpan);
          _this._addCustomAttributesOnSpan(rootSpan, (_a3 = _this._getConfig().applyCustomAttributesOnSpan) === null || _a3 === void 0 ? void 0 : _a3.documentLoad);
          _this._endSpan(rootSpan, PerformanceTimingNames.LOAD_EVENT_END, entries);
        });
      };
      DocumentLoadInstrumentation2.prototype._endSpan = function(span, performanceName, entries) {
        if (span) {
          if (hasKey(entries, performanceName)) {
            span.end(entries[performanceName]);
          } else {
            span.end();
          }
        }
      };
      DocumentLoadInstrumentation2.prototype._initResourceSpan = function(resource2, parentSpan) {
        var _a3;
        var span = this._startSpan(AttributeNames.RESOURCE_FETCH, PerformanceTimingNames.FETCH_START, resource2, parentSpan);
        if (span) {
          span.setAttribute(SEMATTRS_HTTP_URL, resource2.name);
          addSpanNetworkEvents(span, resource2);
          this._addCustomAttributesOnResourceSpan(span, resource2, (_a3 = this._getConfig().applyCustomAttributesOnSpan) === null || _a3 === void 0 ? void 0 : _a3.resourceFetch);
          this._endSpan(span, PerformanceTimingNames.RESPONSE_END, resource2);
        }
      };
      DocumentLoadInstrumentation2.prototype._startSpan = function(spanName, performanceName, entries, parentSpan) {
        if (hasKey(entries, performanceName) && typeof entries[performanceName] === "number") {
          var span = this.tracer.startSpan(spanName, {
            startTime: entries[performanceName]
          }, parentSpan ? trace.setSpan(context.active(), parentSpan) : void 0);
          return span;
        }
        return void 0;
      };
      DocumentLoadInstrumentation2.prototype._waitForPageLoad = function() {
        if (window.document.readyState === "complete") {
          this._onDocumentLoaded();
        } else {
          this._onDocumentLoaded = this._onDocumentLoaded.bind(this);
          window.addEventListener("load", this._onDocumentLoaded);
        }
      };
      DocumentLoadInstrumentation2.prototype._getConfig = function() {
        return this._config;
      };
      DocumentLoadInstrumentation2.prototype._addCustomAttributesOnSpan = function(span, applyCustomAttributesOnSpan) {
        var _this = this;
        if (applyCustomAttributesOnSpan) {
          safeExecuteInTheMiddle(function() {
            return applyCustomAttributesOnSpan(span);
          }, function(error) {
            if (!error) {
              return;
            }
            _this._diag.error("addCustomAttributesOnSpan", error);
          }, true);
        }
      };
      DocumentLoadInstrumentation2.prototype._addCustomAttributesOnResourceSpan = function(span, resource2, applyCustomAttributesOnSpan) {
        var _this = this;
        if (applyCustomAttributesOnSpan) {
          safeExecuteInTheMiddle(function() {
            return applyCustomAttributesOnSpan(span, resource2);
          }, function(error) {
            if (!error) {
              return;
            }
            _this._diag.error("addCustomAttributesOnResourceSpan", error);
          }, true);
        }
      };
      DocumentLoadInstrumentation2.prototype.enable = function() {
        window.removeEventListener("load", this._onDocumentLoaded);
        this._waitForPageLoad();
      };
      DocumentLoadInstrumentation2.prototype.disable = function() {
        window.removeEventListener("load", this._onDocumentLoaded);
      };
      return DocumentLoadInstrumentation2;
    }(InstrumentationBase)
  );

  // node_modules/.pnpm/@opentelemetry+instrumentation-fetch@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-fetch/build/esm/enums/AttributeNames.js
  var AttributeNames2;
  (function(AttributeNames5) {
    AttributeNames5["COMPONENT"] = "component";
    AttributeNames5["HTTP_ERROR_NAME"] = "http.error_name";
    AttributeNames5["HTTP_STATUS_TEXT"] = "http.status_text";
  })(AttributeNames2 || (AttributeNames2 = {}));

  // node_modules/.pnpm/@opentelemetry+instrumentation-fetch@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-fetch/build/esm/version.js
  var VERSION5 = "0.50.0";

  // node_modules/.pnpm/@opentelemetry+instrumentation-fetch@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-fetch/build/esm/fetch.js
  var __extends7 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var _a2;
  var OBSERVER_WAIT_TIME_MS = 300;
  var isNode = typeof process === "object" && ((_a2 = process.release) === null || _a2 === void 0 ? void 0 : _a2.name) === "node";
  var FetchInstrumentation = (
    /** @class */
    function(_super) {
      __extends7(FetchInstrumentation2, _super);
      function FetchInstrumentation2(config) {
        var _this = _super.call(this, "@opentelemetry/instrumentation-fetch", VERSION5, config) || this;
        _this.component = "fetch";
        _this.version = VERSION5;
        _this.moduleName = _this.component;
        _this._usedResources = /* @__PURE__ */ new WeakSet();
        _this._tasksCount = 0;
        return _this;
      }
      FetchInstrumentation2.prototype.init = function() {
      };
      FetchInstrumentation2.prototype._getConfig = function() {
        return this._config;
      };
      FetchInstrumentation2.prototype._addChildSpan = function(span, corsPreFlightRequest) {
        var childSpan = this.tracer.startSpan("CORS Preflight", {
          startTime: corsPreFlightRequest[PerformanceTimingNames.FETCH_START]
        }, trace.setSpan(context.active(), span));
        if (!this._getConfig().ignoreNetworkEvents) {
          addSpanNetworkEvents(childSpan, corsPreFlightRequest);
        }
        childSpan.end(corsPreFlightRequest[PerformanceTimingNames.RESPONSE_END]);
      };
      FetchInstrumentation2.prototype._addFinalSpanAttributes = function(span, response) {
        var parsedUrl = parseUrl(response.url);
        span.setAttribute(SemanticAttributes.HTTP_STATUS_CODE, response.status);
        if (response.statusText != null) {
          span.setAttribute(AttributeNames2.HTTP_STATUS_TEXT, response.statusText);
        }
        span.setAttribute(SemanticAttributes.HTTP_HOST, parsedUrl.host);
        span.setAttribute(SemanticAttributes.HTTP_SCHEME, parsedUrl.protocol.replace(":", ""));
        if (typeof navigator !== "undefined") {
          span.setAttribute(SemanticAttributes.HTTP_USER_AGENT, navigator.userAgent);
        }
      };
      FetchInstrumentation2.prototype._addHeaders = function(options, spanUrl) {
        if (!shouldPropagateTraceHeaders(spanUrl, this._getConfig().propagateTraceHeaderCorsUrls)) {
          var headers = {};
          propagation.inject(context.active(), headers);
          if (Object.keys(headers).length > 0) {
            this._diag.debug("headers inject skipped due to CORS policy");
          }
          return;
        }
        if (options instanceof Request) {
          propagation.inject(context.active(), options.headers, {
            set: function(h, k, v) {
              return h.set(k, typeof v === "string" ? v : String(v));
            }
          });
        } else if (options.headers instanceof Headers) {
          propagation.inject(context.active(), options.headers, {
            set: function(h, k, v) {
              return h.set(k, typeof v === "string" ? v : String(v));
            }
          });
        } else if (options.headers instanceof Map) {
          propagation.inject(context.active(), options.headers, {
            set: function(h, k, v) {
              return h.set(k, typeof v === "string" ? v : String(v));
            }
          });
        } else {
          var headers = {};
          propagation.inject(context.active(), headers);
          options.headers = Object.assign({}, headers, options.headers || {});
        }
      };
      FetchInstrumentation2.prototype._clearResources = function() {
        if (this._tasksCount === 0 && this._getConfig().clearTimingResources) {
          performance.clearResourceTimings();
          this._usedResources = /* @__PURE__ */ new WeakSet();
        }
      };
      FetchInstrumentation2.prototype._createSpan = function(url, options) {
        var _a3;
        if (options === void 0) {
          options = {};
        }
        if (isUrlIgnored(url, this._getConfig().ignoreUrls)) {
          this._diag.debug("ignoring span as url matches ignored url");
          return;
        }
        var method = (options.method || "GET").toUpperCase();
        var spanName = "HTTP " + method;
        return this.tracer.startSpan(spanName, {
          kind: SpanKind.CLIENT,
          attributes: (_a3 = {}, _a3[AttributeNames2.COMPONENT] = this.moduleName, _a3[SemanticAttributes.HTTP_METHOD] = method, _a3[SemanticAttributes.HTTP_URL] = url, _a3)
        });
      };
      FetchInstrumentation2.prototype._findResourceAndAddNetworkEvents = function(span, resourcesObserver, endTime) {
        var resources = resourcesObserver.entries;
        if (!resources.length) {
          if (!performance.getEntriesByType) {
            return;
          }
          resources = performance.getEntriesByType("resource");
        }
        var resource2 = getResource(resourcesObserver.spanUrl, resourcesObserver.startTime, endTime, resources, this._usedResources, "fetch");
        if (resource2.mainRequest) {
          var mainRequest = resource2.mainRequest;
          this._markResourceAsUsed(mainRequest);
          var corsPreFlightRequest = resource2.corsPreFlightRequest;
          if (corsPreFlightRequest) {
            this._addChildSpan(span, corsPreFlightRequest);
            this._markResourceAsUsed(corsPreFlightRequest);
          }
          if (!this._getConfig().ignoreNetworkEvents) {
            addSpanNetworkEvents(span, mainRequest);
          }
        }
      };
      FetchInstrumentation2.prototype._markResourceAsUsed = function(resource2) {
        this._usedResources.add(resource2);
      };
      FetchInstrumentation2.prototype._endSpan = function(span, spanData, response) {
        var _this = this;
        var endTime = millisToHrTime(Date.now());
        var performanceEndTime = hrTime();
        this._addFinalSpanAttributes(span, response);
        setTimeout(function() {
          var _a3;
          (_a3 = spanData.observer) === null || _a3 === void 0 ? void 0 : _a3.disconnect();
          _this._findResourceAndAddNetworkEvents(span, spanData, performanceEndTime);
          _this._tasksCount--;
          _this._clearResources();
          span.end(endTime);
        }, OBSERVER_WAIT_TIME_MS);
      };
      FetchInstrumentation2.prototype._patchConstructor = function() {
        var _this = this;
        return function(original) {
          var plugin = _this;
          return function patchConstructor() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var self2 = this;
            var url = parseUrl(args[0] instanceof Request ? args[0].url : String(args[0])).href;
            var options = args[0] instanceof Request ? args[0] : args[1] || {};
            var createdSpan = plugin._createSpan(url, options);
            if (!createdSpan) {
              return original.apply(this, args);
            }
            var spanData = plugin._prepareSpanData(url);
            function endSpanOnError(span, error) {
              plugin._applyAttributesAfterFetch(span, options, error);
              plugin._endSpan(span, spanData, {
                status: error.status || 0,
                statusText: error.message,
                url
              });
            }
            function endSpanOnSuccess(span, response) {
              plugin._applyAttributesAfterFetch(span, options, response);
              if (response.status >= 200 && response.status < 400) {
                plugin._endSpan(span, spanData, response);
              } else {
                plugin._endSpan(span, spanData, {
                  status: response.status,
                  statusText: response.statusText,
                  url
                });
              }
            }
            function onSuccess(span, resolve, response) {
              try {
                var resClone = response.clone();
                var resClone4Hook_1 = response.clone();
                var body = resClone.body;
                if (body) {
                  var reader_1 = body.getReader();
                  var read_1 = function() {
                    reader_1.read().then(function(_a3) {
                      var done = _a3.done;
                      if (done) {
                        endSpanOnSuccess(span, resClone4Hook_1);
                      } else {
                        read_1();
                      }
                    }, function(error) {
                      endSpanOnError(span, error);
                    });
                  };
                  read_1();
                } else {
                  endSpanOnSuccess(span, response);
                }
              } finally {
                resolve(response);
              }
            }
            function onError(span, reject, error) {
              try {
                endSpanOnError(span, error);
              } finally {
                reject(error);
              }
            }
            return new Promise(function(resolve, reject) {
              return context.with(trace.setSpan(context.active(), createdSpan), function() {
                plugin._addHeaders(options, url);
                plugin._tasksCount++;
                return original.apply(self2, options instanceof Request ? [options] : [url, options]).then(onSuccess.bind(self2, createdSpan, resolve), onError.bind(self2, createdSpan, reject));
              });
            });
          };
        };
      };
      FetchInstrumentation2.prototype._applyAttributesAfterFetch = function(span, request, result) {
        var _this = this;
        var applyCustomAttributesOnSpan = this._getConfig().applyCustomAttributesOnSpan;
        if (applyCustomAttributesOnSpan) {
          safeExecuteInTheMiddle(function() {
            return applyCustomAttributesOnSpan(span, request, result);
          }, function(error) {
            if (!error) {
              return;
            }
            _this._diag.error("applyCustomAttributesOnSpan", error);
          }, true);
        }
      };
      FetchInstrumentation2.prototype._prepareSpanData = function(spanUrl) {
        var startTime = hrTime();
        var entries = [];
        if (typeof PerformanceObserver !== "function") {
          return { entries, startTime, spanUrl };
        }
        var observer = new PerformanceObserver(function(list) {
          var perfObsEntries = list.getEntries();
          perfObsEntries.forEach(function(entry) {
            if (entry.initiatorType === "fetch" && entry.name === spanUrl) {
              entries.push(entry);
            }
          });
        });
        observer.observe({
          entryTypes: ["resource"]
        });
        return { entries, observer, startTime, spanUrl };
      };
      FetchInstrumentation2.prototype.enable = function() {
        if (isNode) {
          this._diag.warn("this instrumentation is intended for web usage only, it does not instrument Node.js's fetch()");
          return;
        }
        if (isWrapped(fetch)) {
          this._unwrap(_globalThis2, "fetch");
          this._diag.debug("removing previous patch for constructor");
        }
        this._wrap(_globalThis2, "fetch", this._patchConstructor());
      };
      FetchInstrumentation2.prototype.disable = function() {
        if (isNode) {
          return;
        }
        this._unwrap(_globalThis2, "fetch");
        this._usedResources = /* @__PURE__ */ new WeakSet();
      };
      return FetchInstrumentation2;
    }(InstrumentationBase)
  );

  // node_modules/.pnpm/@opentelemetry+instrumentation-user-interaction@0.37.0_@opentelemetry+api@1.8.0_zone.js@0.14.4/node_modules/@opentelemetry/instrumentation-user-interaction/build/esm/enums/AttributeNames.js
  var AttributeNames3;
  (function(AttributeNames5) {
    AttributeNames5["EVENT_TYPE"] = "event_type";
    AttributeNames5["TARGET_ELEMENT"] = "target_element";
    AttributeNames5["TARGET_XPATH"] = "target_xpath";
    AttributeNames5["HTTP_URL"] = "http.url";
  })(AttributeNames3 || (AttributeNames3 = {}));

  // node_modules/.pnpm/@opentelemetry+instrumentation-user-interaction@0.37.0_@opentelemetry+api@1.8.0_zone.js@0.14.4/node_modules/@opentelemetry/instrumentation-user-interaction/build/esm/version.js
  var VERSION6 = "0.37.0";

  // node_modules/.pnpm/@opentelemetry+instrumentation-user-interaction@0.37.0_@opentelemetry+api@1.8.0_zone.js@0.14.4/node_modules/@opentelemetry/instrumentation-user-interaction/build/esm/instrumentation.js
  var __extends8 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var ZONE_CONTEXT_KEY = "OT_ZONE_CONTEXT";
  var EVENT_NAVIGATION_NAME = "Navigation:";
  var DEFAULT_EVENT_NAMES = ["click"];
  function defaultShouldPreventSpanCreation() {
    return false;
  }
  var UserInteractionInstrumentation = (
    /** @class */
    function(_super) {
      __extends8(UserInteractionInstrumentation2, _super);
      function UserInteractionInstrumentation2(config) {
        var _a3;
        var _this = _super.call(this, "@opentelemetry/instrumentation-user-interaction", VERSION6, config) || this;
        _this.version = VERSION6;
        _this.moduleName = "user-interaction";
        _this._spansData = /* @__PURE__ */ new WeakMap();
        _this._wrappedListeners = /* @__PURE__ */ new WeakMap();
        _this._eventsSpanMap = /* @__PURE__ */ new WeakMap();
        _this._eventNames = new Set((_a3 = config === null || config === void 0 ? void 0 : config.eventNames) !== null && _a3 !== void 0 ? _a3 : DEFAULT_EVENT_NAMES);
        _this._shouldPreventSpanCreation = typeof (config === null || config === void 0 ? void 0 : config.shouldPreventSpanCreation) === "function" ? config.shouldPreventSpanCreation : defaultShouldPreventSpanCreation;
        return _this;
      }
      UserInteractionInstrumentation2.prototype.init = function() {
      };
      UserInteractionInstrumentation2.prototype._checkForTimeout = function(task, span) {
        var spanData = this._spansData.get(span);
        if (spanData) {
          if (task.source === "setTimeout") {
            spanData.hrTimeLastTimeout = hrTime();
          } else if (task.source !== "Promise.then" && task.source !== "setTimeout") {
            spanData.hrTimeLastTimeout = void 0;
          }
        }
      };
      UserInteractionInstrumentation2.prototype._allowEventName = function(eventName) {
        return this._eventNames.has(eventName);
      };
      UserInteractionInstrumentation2.prototype._createSpan = function(element, eventName, parentSpan) {
        var _a3;
        if (!(element instanceof HTMLElement)) {
          return void 0;
        }
        if (!element.getAttribute) {
          return void 0;
        }
        if (element.hasAttribute("disabled")) {
          return void 0;
        }
        if (!this._allowEventName(eventName)) {
          return void 0;
        }
        var xpath = getElementXPath(element, true);
        try {
          var span = this.tracer.startSpan(eventName, {
            attributes: (_a3 = {}, _a3[AttributeNames3.EVENT_TYPE] = eventName, _a3[AttributeNames3.TARGET_ELEMENT] = element.tagName, _a3[AttributeNames3.TARGET_XPATH] = xpath, _a3[AttributeNames3.HTTP_URL] = window.location.href, _a3)
          }, parentSpan ? trace.setSpan(context.active(), parentSpan) : void 0);
          if (this._shouldPreventSpanCreation(eventName, element, span) === true) {
            return void 0;
          }
          this._spansData.set(span, {
            taskCount: 0
          });
          return span;
        } catch (e) {
          this._diag.error("failed to start create new user interaction span", e);
        }
        return void 0;
      };
      UserInteractionInstrumentation2.prototype._decrementTask = function(span) {
        var spanData = this._spansData.get(span);
        if (spanData) {
          spanData.taskCount--;
          if (spanData.taskCount === 0) {
            this._tryToEndSpan(span, spanData.hrTimeLastTimeout);
          }
        }
      };
      UserInteractionInstrumentation2.prototype._getCurrentSpan = function(zone) {
        var context2 = zone.get(ZONE_CONTEXT_KEY);
        if (context2) {
          return trace.getSpan(context2);
        }
        return context2;
      };
      UserInteractionInstrumentation2.prototype._incrementTask = function(span) {
        var spanData = this._spansData.get(span);
        if (spanData) {
          spanData.taskCount++;
        }
      };
      UserInteractionInstrumentation2.prototype.addPatchedListener = function(on, type, listener, wrappedListener) {
        var listener2Type = this._wrappedListeners.get(listener);
        if (!listener2Type) {
          listener2Type = /* @__PURE__ */ new Map();
          this._wrappedListeners.set(listener, listener2Type);
        }
        var element2patched = listener2Type.get(type);
        if (!element2patched) {
          element2patched = /* @__PURE__ */ new Map();
          listener2Type.set(type, element2patched);
        }
        if (element2patched.has(on)) {
          return false;
        }
        element2patched.set(on, wrappedListener);
        return true;
      };
      UserInteractionInstrumentation2.prototype.removePatchedListener = function(on, type, listener) {
        var listener2Type = this._wrappedListeners.get(listener);
        if (!listener2Type) {
          return void 0;
        }
        var element2patched = listener2Type.get(type);
        if (!element2patched) {
          return void 0;
        }
        var patched = element2patched.get(on);
        if (patched) {
          element2patched.delete(on);
          if (element2patched.size === 0) {
            listener2Type.delete(type);
            if (listener2Type.size === 0) {
              this._wrappedListeners.delete(listener);
            }
          }
        }
        return patched;
      };
      UserInteractionInstrumentation2.prototype._invokeListener = function(listener, target, args) {
        if (typeof listener === "function") {
          return listener.apply(target, args);
        } else {
          return listener.handleEvent(args[0]);
        }
      };
      UserInteractionInstrumentation2.prototype._patchAddEventListener = function() {
        var plugin = this;
        return function(original) {
          return function addEventListenerPatched(type, listener, useCapture) {
            if (!listener) {
              return original.call(this, type, listener, useCapture);
            }
            var once = useCapture && typeof useCapture === "object" && useCapture.once;
            var patchedListener = function() {
              var _this = this;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              var parentSpan;
              var event = args[0];
              var target = event === null || event === void 0 ? void 0 : event.target;
              if (event) {
                parentSpan = plugin._eventsSpanMap.get(event);
              }
              if (once) {
                plugin.removePatchedListener(this, type, listener);
              }
              var span = plugin._createSpan(target, type, parentSpan);
              if (span) {
                if (event) {
                  plugin._eventsSpanMap.set(event, span);
                }
                return context.with(trace.setSpan(context.active(), span), function() {
                  var result = plugin._invokeListener(listener, _this, args);
                  span.end();
                  return result;
                });
              } else {
                return plugin._invokeListener(listener, this, args);
              }
            };
            if (plugin.addPatchedListener(this, type, listener, patchedListener)) {
              return original.call(this, type, patchedListener, useCapture);
            }
          };
        };
      };
      UserInteractionInstrumentation2.prototype._patchRemoveEventListener = function() {
        var plugin = this;
        return function(original) {
          return function removeEventListenerPatched(type, listener, useCapture) {
            var wrappedListener = plugin.removePatchedListener(this, type, listener);
            if (wrappedListener) {
              return original.call(this, type, wrappedListener, useCapture);
            } else {
              return original.call(this, type, listener, useCapture);
            }
          };
        };
      };
      UserInteractionInstrumentation2.prototype._getPatchableEventTargets = function() {
        return window.EventTarget ? [EventTarget.prototype] : [Node.prototype, Window.prototype];
      };
      UserInteractionInstrumentation2.prototype._patchHistoryApi = function() {
        this._unpatchHistoryApi();
        this._wrap(history, "replaceState", this._patchHistoryMethod());
        this._wrap(history, "pushState", this._patchHistoryMethod());
        this._wrap(history, "back", this._patchHistoryMethod());
        this._wrap(history, "forward", this._patchHistoryMethod());
        this._wrap(history, "go", this._patchHistoryMethod());
      };
      UserInteractionInstrumentation2.prototype._patchHistoryMethod = function() {
        var plugin = this;
        return function(original) {
          return function patchHistoryMethod() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var url = "" + location.pathname + location.hash + location.search;
            var result = original.apply(this, args);
            var urlAfter = "" + location.pathname + location.hash + location.search;
            if (url !== urlAfter) {
              plugin._updateInteractionName(urlAfter);
            }
            return result;
          };
        };
      };
      UserInteractionInstrumentation2.prototype._unpatchHistoryApi = function() {
        if (isWrapped(history.replaceState))
          this._unwrap(history, "replaceState");
        if (isWrapped(history.pushState))
          this._unwrap(history, "pushState");
        if (isWrapped(history.back))
          this._unwrap(history, "back");
        if (isWrapped(history.forward))
          this._unwrap(history, "forward");
        if (isWrapped(history.go))
          this._unwrap(history, "go");
      };
      UserInteractionInstrumentation2.prototype._updateInteractionName = function(url) {
        var span = trace.getSpan(context.active());
        if (span && typeof span.updateName === "function") {
          span.updateName(EVENT_NAVIGATION_NAME + " " + url);
        }
      };
      UserInteractionInstrumentation2.prototype._patchZoneCancelTask = function() {
        var plugin = this;
        return function(original) {
          return function patchCancelTask(task) {
            var currentZone = Zone.current;
            var currentSpan = plugin._getCurrentSpan(currentZone);
            if (currentSpan && plugin._shouldCountTask(task, currentZone)) {
              plugin._decrementTask(currentSpan);
            }
            return original.call(this, task);
          };
        };
      };
      UserInteractionInstrumentation2.prototype._patchZoneScheduleTask = function() {
        var plugin = this;
        return function(original) {
          return function patchScheduleTask(task) {
            var currentZone = Zone.current;
            var currentSpan = plugin._getCurrentSpan(currentZone);
            if (currentSpan && plugin._shouldCountTask(task, currentZone)) {
              plugin._incrementTask(currentSpan);
              plugin._checkForTimeout(task, currentSpan);
            }
            return original.call(this, task);
          };
        };
      };
      UserInteractionInstrumentation2.prototype._patchZoneRunTask = function() {
        var plugin = this;
        return function(original) {
          return function patchRunTask(task, applyThis, applyArgs) {
            var event = Array.isArray(applyArgs) && applyArgs[0] instanceof Event ? applyArgs[0] : void 0;
            var target = event === null || event === void 0 ? void 0 : event.target;
            var span;
            var activeZone = this;
            if (target) {
              span = plugin._createSpan(target, task.eventName);
              if (span) {
                plugin._incrementTask(span);
                return activeZone.run(function() {
                  try {
                    return context.with(trace.setSpan(context.active(), span), function() {
                      var currentZone = Zone.current;
                      task._zone = currentZone;
                      return original.call(currentZone, task, applyThis, applyArgs);
                    });
                  } finally {
                    plugin._decrementTask(span);
                  }
                });
              }
            } else {
              span = plugin._getCurrentSpan(activeZone);
            }
            try {
              return original.call(activeZone, task, applyThis, applyArgs);
            } finally {
              if (span && plugin._shouldCountTask(task, activeZone)) {
                plugin._decrementTask(span);
              }
            }
          };
        };
      };
      UserInteractionInstrumentation2.prototype._shouldCountTask = function(task, currentZone) {
        if (task._zone) {
          currentZone = task._zone;
        }
        if (!currentZone || !task.data || task.data.isPeriodic) {
          return false;
        }
        var currentSpan = this._getCurrentSpan(currentZone);
        if (!currentSpan) {
          return false;
        }
        if (!this._spansData.get(currentSpan)) {
          return false;
        }
        return task.type === "macroTask" || task.type === "microTask";
      };
      UserInteractionInstrumentation2.prototype._tryToEndSpan = function(span, endTime) {
        if (span) {
          var spanData = this._spansData.get(span);
          if (spanData) {
            span.end(endTime);
            this._spansData.delete(span);
          }
        }
      };
      UserInteractionInstrumentation2.prototype.enable = function() {
        var _this = this;
        var ZoneWithPrototype = this.getZoneWithPrototype();
        this._diag.debug("applying patch to", this.moduleName, this.version, "zone:", !!ZoneWithPrototype);
        if (ZoneWithPrototype) {
          if (isWrapped(ZoneWithPrototype.prototype.runTask)) {
            this._unwrap(ZoneWithPrototype.prototype, "runTask");
            this._diag.debug("removing previous patch from method runTask");
          }
          if (isWrapped(ZoneWithPrototype.prototype.scheduleTask)) {
            this._unwrap(ZoneWithPrototype.prototype, "scheduleTask");
            this._diag.debug("removing previous patch from method scheduleTask");
          }
          if (isWrapped(ZoneWithPrototype.prototype.cancelTask)) {
            this._unwrap(ZoneWithPrototype.prototype, "cancelTask");
            this._diag.debug("removing previous patch from method cancelTask");
          }
          this._zonePatched = true;
          this._wrap(ZoneWithPrototype.prototype, "runTask", this._patchZoneRunTask());
          this._wrap(ZoneWithPrototype.prototype, "scheduleTask", this._patchZoneScheduleTask());
          this._wrap(ZoneWithPrototype.prototype, "cancelTask", this._patchZoneCancelTask());
        } else {
          this._zonePatched = false;
          var targets = this._getPatchableEventTargets();
          targets.forEach(function(target) {
            if (isWrapped(target.addEventListener)) {
              _this._unwrap(target, "addEventListener");
              _this._diag.debug("removing previous patch from method addEventListener");
            }
            if (isWrapped(target.removeEventListener)) {
              _this._unwrap(target, "removeEventListener");
              _this._diag.debug("removing previous patch from method removeEventListener");
            }
            _this._wrap(target, "addEventListener", _this._patchAddEventListener());
            _this._wrap(target, "removeEventListener", _this._patchRemoveEventListener());
          });
        }
        this._patchHistoryApi();
      };
      UserInteractionInstrumentation2.prototype.disable = function() {
        var _this = this;
        var ZoneWithPrototype = this.getZoneWithPrototype();
        this._diag.debug("removing patch from", this.moduleName, this.version, "zone:", !!ZoneWithPrototype);
        if (ZoneWithPrototype && this._zonePatched) {
          if (isWrapped(ZoneWithPrototype.prototype.runTask)) {
            this._unwrap(ZoneWithPrototype.prototype, "runTask");
          }
          if (isWrapped(ZoneWithPrototype.prototype.scheduleTask)) {
            this._unwrap(ZoneWithPrototype.prototype, "scheduleTask");
          }
          if (isWrapped(ZoneWithPrototype.prototype.cancelTask)) {
            this._unwrap(ZoneWithPrototype.prototype, "cancelTask");
          }
        } else {
          var targets = this._getPatchableEventTargets();
          targets.forEach(function(target) {
            if (isWrapped(target.addEventListener)) {
              _this._unwrap(target, "addEventListener");
            }
            if (isWrapped(target.removeEventListener)) {
              _this._unwrap(target, "removeEventListener");
            }
          });
        }
        this._unpatchHistoryApi();
      };
      UserInteractionInstrumentation2.prototype.getZoneWithPrototype = function() {
        var _window = window;
        return _window.Zone;
      };
      return UserInteractionInstrumentation2;
    }(InstrumentationBase)
  );

  // node_modules/.pnpm/@opentelemetry+instrumentation-xml-http-request@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-xml-http-request/build/esm/enums/EventNames.js
  var EventNames2;
  (function(EventNames3) {
    EventNames3["METHOD_OPEN"] = "open";
    EventNames3["METHOD_SEND"] = "send";
    EventNames3["EVENT_ABORT"] = "abort";
    EventNames3["EVENT_ERROR"] = "error";
    EventNames3["EVENT_LOAD"] = "loaded";
    EventNames3["EVENT_TIMEOUT"] = "timeout";
  })(EventNames2 || (EventNames2 = {}));

  // node_modules/.pnpm/@opentelemetry+instrumentation-xml-http-request@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-xml-http-request/build/esm/version.js
  var VERSION7 = "0.50.0";

  // node_modules/.pnpm/@opentelemetry+instrumentation-xml-http-request@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-xml-http-request/build/esm/enums/AttributeNames.js
  var AttributeNames4;
  (function(AttributeNames5) {
    AttributeNames5["HTTP_STATUS_TEXT"] = "http.status_text";
  })(AttributeNames4 || (AttributeNames4 = {}));

  // node_modules/.pnpm/@opentelemetry+instrumentation-xml-http-request@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/instrumentation-xml-http-request/build/esm/xhr.js
  var __extends9 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var OBSERVER_WAIT_TIME_MS2 = 300;
  var XMLHttpRequestInstrumentation = (
    /** @class */
    function(_super) {
      __extends9(XMLHttpRequestInstrumentation2, _super);
      function XMLHttpRequestInstrumentation2(config) {
        var _this = _super.call(this, "@opentelemetry/instrumentation-xml-http-request", VERSION7, config) || this;
        _this.component = "xml-http-request";
        _this.version = VERSION7;
        _this.moduleName = _this.component;
        _this._tasksCount = 0;
        _this._xhrMem = /* @__PURE__ */ new WeakMap();
        _this._usedResources = /* @__PURE__ */ new WeakSet();
        return _this;
      }
      XMLHttpRequestInstrumentation2.prototype.init = function() {
      };
      XMLHttpRequestInstrumentation2.prototype._getConfig = function() {
        return this._config;
      };
      XMLHttpRequestInstrumentation2.prototype._addHeaders = function(xhr, spanUrl) {
        var url = parseUrl(spanUrl).href;
        if (!shouldPropagateTraceHeaders(url, this._getConfig().propagateTraceHeaderCorsUrls)) {
          var headers_1 = {};
          propagation.inject(context.active(), headers_1);
          if (Object.keys(headers_1).length > 0) {
            this._diag.debug("headers inject skipped due to CORS policy");
          }
          return;
        }
        var headers = {};
        propagation.inject(context.active(), headers);
        Object.keys(headers).forEach(function(key) {
          xhr.setRequestHeader(key, String(headers[key]));
        });
      };
      XMLHttpRequestInstrumentation2.prototype._addChildSpan = function(span, corsPreFlightRequest) {
        var _this = this;
        context.with(trace.setSpan(context.active(), span), function() {
          var childSpan = _this.tracer.startSpan("CORS Preflight", {
            startTime: corsPreFlightRequest[PerformanceTimingNames.FETCH_START]
          });
          if (!_this._getConfig().ignoreNetworkEvents) {
            addSpanNetworkEvents(childSpan, corsPreFlightRequest);
          }
          childSpan.end(corsPreFlightRequest[PerformanceTimingNames.RESPONSE_END]);
        });
      };
      XMLHttpRequestInstrumentation2.prototype._addFinalSpanAttributes = function(span, xhrMem, spanUrl) {
        if (typeof spanUrl === "string") {
          var parsedUrl = parseUrl(spanUrl);
          if (xhrMem.status !== void 0) {
            span.setAttribute(SemanticAttributes.HTTP_STATUS_CODE, xhrMem.status);
          }
          if (xhrMem.statusText !== void 0) {
            span.setAttribute(AttributeNames4.HTTP_STATUS_TEXT, xhrMem.statusText);
          }
          span.setAttribute(SemanticAttributes.HTTP_HOST, parsedUrl.host);
          span.setAttribute(SemanticAttributes.HTTP_SCHEME, parsedUrl.protocol.replace(":", ""));
          span.setAttribute(SemanticAttributes.HTTP_USER_AGENT, navigator.userAgent);
        }
      };
      XMLHttpRequestInstrumentation2.prototype._applyAttributesAfterXHR = function(span, xhr) {
        var _this = this;
        var applyCustomAttributesOnSpan = this._getConfig().applyCustomAttributesOnSpan;
        if (typeof applyCustomAttributesOnSpan === "function") {
          safeExecuteInTheMiddle(function() {
            return applyCustomAttributesOnSpan(span, xhr);
          }, function(error) {
            if (!error) {
              return;
            }
            _this._diag.error("applyCustomAttributesOnSpan", error);
          }, true);
        }
      };
      XMLHttpRequestInstrumentation2.prototype._addResourceObserver = function(xhr, spanUrl) {
        var xhrMem = this._xhrMem.get(xhr);
        if (!xhrMem || typeof PerformanceObserver !== "function" || typeof PerformanceResourceTiming !== "function") {
          return;
        }
        xhrMem.createdResources = {
          observer: new PerformanceObserver(function(list) {
            var entries = list.getEntries();
            var parsedUrl = parseUrl(spanUrl);
            entries.forEach(function(entry) {
              if (entry.initiatorType === "xmlhttprequest" && entry.name === parsedUrl.href) {
                if (xhrMem.createdResources) {
                  xhrMem.createdResources.entries.push(entry);
                }
              }
            });
          }),
          entries: []
        };
        xhrMem.createdResources.observer.observe({
          entryTypes: ["resource"]
        });
      };
      XMLHttpRequestInstrumentation2.prototype._clearResources = function() {
        if (this._tasksCount === 0 && this._getConfig().clearTimingResources) {
          otperformance.clearResourceTimings();
          this._xhrMem = /* @__PURE__ */ new WeakMap();
          this._usedResources = /* @__PURE__ */ new WeakSet();
        }
      };
      XMLHttpRequestInstrumentation2.prototype._findResourceAndAddNetworkEvents = function(xhrMem, span, spanUrl, startTime, endTime) {
        if (!spanUrl || !startTime || !endTime || !xhrMem.createdResources) {
          return;
        }
        var resources = xhrMem.createdResources.entries;
        if (!resources || !resources.length) {
          resources = otperformance.getEntriesByType("resource");
        }
        var resource2 = getResource(parseUrl(spanUrl).href, startTime, endTime, resources, this._usedResources);
        if (resource2.mainRequest) {
          var mainRequest = resource2.mainRequest;
          this._markResourceAsUsed(mainRequest);
          var corsPreFlightRequest = resource2.corsPreFlightRequest;
          if (corsPreFlightRequest) {
            this._addChildSpan(span, corsPreFlightRequest);
            this._markResourceAsUsed(corsPreFlightRequest);
          }
          if (!this._getConfig().ignoreNetworkEvents) {
            addSpanNetworkEvents(span, mainRequest);
          }
        }
      };
      XMLHttpRequestInstrumentation2.prototype._cleanPreviousSpanInformation = function(xhr) {
        var xhrMem = this._xhrMem.get(xhr);
        if (xhrMem) {
          var callbackToRemoveEvents = xhrMem.callbackToRemoveEvents;
          if (callbackToRemoveEvents) {
            callbackToRemoveEvents();
          }
          this._xhrMem.delete(xhr);
        }
      };
      XMLHttpRequestInstrumentation2.prototype._createSpan = function(xhr, url, method) {
        var _a3;
        if (isUrlIgnored(url, this._getConfig().ignoreUrls)) {
          this._diag.debug("ignoring span as url matches ignored url");
          return;
        }
        var spanName = method.toUpperCase();
        var currentSpan = this.tracer.startSpan(spanName, {
          kind: SpanKind.CLIENT,
          attributes: (_a3 = {}, _a3[SemanticAttributes.HTTP_METHOD] = method, _a3[SemanticAttributes.HTTP_URL] = parseUrl(url).toString(), _a3)
        });
        currentSpan.addEvent(EventNames2.METHOD_OPEN);
        this._cleanPreviousSpanInformation(xhr);
        this._xhrMem.set(xhr, {
          span: currentSpan,
          spanUrl: url
        });
        return currentSpan;
      };
      XMLHttpRequestInstrumentation2.prototype._markResourceAsUsed = function(resource2) {
        this._usedResources.add(resource2);
      };
      XMLHttpRequestInstrumentation2.prototype._patchOpen = function() {
        var _this = this;
        return function(original) {
          var plugin = _this;
          return function patchOpen() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var method = args[0];
            var url = args[1];
            plugin._createSpan(this, url, method);
            return original.apply(this, args);
          };
        };
      };
      XMLHttpRequestInstrumentation2.prototype._patchSend = function() {
        var plugin = this;
        function endSpanTimeout(eventName, xhrMem, performanceEndTime, endTime) {
          var callbackToRemoveEvents = xhrMem.callbackToRemoveEvents;
          if (typeof callbackToRemoveEvents === "function") {
            callbackToRemoveEvents();
          }
          var span = xhrMem.span, spanUrl = xhrMem.spanUrl, sendStartTime = xhrMem.sendStartTime;
          if (span) {
            plugin._findResourceAndAddNetworkEvents(xhrMem, span, spanUrl, sendStartTime, performanceEndTime);
            span.addEvent(eventName, endTime);
            plugin._addFinalSpanAttributes(span, xhrMem, spanUrl);
            span.end(endTime);
            plugin._tasksCount--;
          }
          plugin._clearResources();
        }
        function endSpan(eventName, xhr) {
          var xhrMem = plugin._xhrMem.get(xhr);
          if (!xhrMem) {
            return;
          }
          xhrMem.status = xhr.status;
          xhrMem.statusText = xhr.statusText;
          plugin._xhrMem.delete(xhr);
          if (xhrMem.span) {
            plugin._applyAttributesAfterXHR(xhrMem.span, xhr);
          }
          var performanceEndTime = hrTime();
          var endTime = Date.now();
          setTimeout(function() {
            endSpanTimeout(eventName, xhrMem, performanceEndTime, endTime);
          }, OBSERVER_WAIT_TIME_MS2);
        }
        function onError() {
          endSpan(EventNames2.EVENT_ERROR, this);
        }
        function onAbort() {
          endSpan(EventNames2.EVENT_ABORT, this);
        }
        function onTimeout() {
          endSpan(EventNames2.EVENT_TIMEOUT, this);
        }
        function onLoad() {
          if (this.status < 299) {
            endSpan(EventNames2.EVENT_LOAD, this);
          } else {
            endSpan(EventNames2.EVENT_ERROR, this);
          }
        }
        function unregister(xhr) {
          xhr.removeEventListener("abort", onAbort);
          xhr.removeEventListener("error", onError);
          xhr.removeEventListener("load", onLoad);
          xhr.removeEventListener("timeout", onTimeout);
          var xhrMem = plugin._xhrMem.get(xhr);
          if (xhrMem) {
            xhrMem.callbackToRemoveEvents = void 0;
          }
        }
        return function(original) {
          return function patchSend() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            var xhrMem = plugin._xhrMem.get(this);
            if (!xhrMem) {
              return original.apply(this, args);
            }
            var currentSpan = xhrMem.span;
            var spanUrl = xhrMem.spanUrl;
            if (currentSpan && spanUrl) {
              context.with(trace.setSpan(context.active(), currentSpan), function() {
                plugin._tasksCount++;
                xhrMem.sendStartTime = hrTime();
                currentSpan.addEvent(EventNames2.METHOD_SEND);
                _this.addEventListener("abort", onAbort);
                _this.addEventListener("error", onError);
                _this.addEventListener("load", onLoad);
                _this.addEventListener("timeout", onTimeout);
                xhrMem.callbackToRemoveEvents = function() {
                  unregister(_this);
                  if (xhrMem.createdResources) {
                    xhrMem.createdResources.observer.disconnect();
                  }
                };
                plugin._addHeaders(_this, spanUrl);
                plugin._addResourceObserver(_this, spanUrl);
              });
            }
            return original.apply(this, args);
          };
        };
      };
      XMLHttpRequestInstrumentation2.prototype.enable = function() {
        this._diag.debug("applying patch to", this.moduleName, this.version);
        if (isWrapped(XMLHttpRequest.prototype.open)) {
          this._unwrap(XMLHttpRequest.prototype, "open");
          this._diag.debug("removing previous patch from method open");
        }
        if (isWrapped(XMLHttpRequest.prototype.send)) {
          this._unwrap(XMLHttpRequest.prototype, "send");
          this._diag.debug("removing previous patch from method send");
        }
        this._wrap(XMLHttpRequest.prototype, "open", this._patchOpen());
        this._wrap(XMLHttpRequest.prototype, "send", this._patchSend());
      };
      XMLHttpRequestInstrumentation2.prototype.disable = function() {
        this._diag.debug("removing patch from", this.moduleName, this.version);
        this._unwrap(XMLHttpRequest.prototype, "open");
        this._unwrap(XMLHttpRequest.prototype, "send");
        this._tasksCount = 0;
        this._xhrMem = /* @__PURE__ */ new WeakMap();
        this._usedResources = /* @__PURE__ */ new WeakSet();
      };
      return XMLHttpRequestInstrumentation2;
    }(InstrumentationBase)
  );

  // node_modules/.pnpm/@opentelemetry+auto-instrumentations-web@0.38.0_@opentelemetry+api@1.8.0_zone.js@0.14.4/node_modules/@opentelemetry/auto-instrumentations-web/build/esm/utils.js
  var InstrumentationMap = {
    "@opentelemetry/instrumentation-document-load": DocumentLoadInstrumentation,
    "@opentelemetry/instrumentation-fetch": FetchInstrumentation,
    "@opentelemetry/instrumentation-user-interaction": UserInteractionInstrumentation,
    "@opentelemetry/instrumentation-xml-http-request": XMLHttpRequestInstrumentation
  };
  function getWebAutoInstrumentations(inputConfigs) {
    var _a3;
    if (inputConfigs === void 0) {
      inputConfigs = {};
    }
    for (var _i = 0, _b = Object.keys(inputConfigs); _i < _b.length; _i++) {
      var name_1 = _b[_i];
      if (!Object.prototype.hasOwnProperty.call(InstrumentationMap, name_1)) {
        diag2.error('Provided instrumentation name "' + name_1 + '" not found');
        continue;
      }
    }
    var instrumentations = [];
    for (var _c = 0, _d = Object.keys(InstrumentationMap); _c < _d.length; _c++) {
      var name_2 = _d[_c];
      var Instance = InstrumentationMap[name_2];
      var userConfig = (_a3 = inputConfigs[name_2]) !== null && _a3 !== void 0 ? _a3 : {};
      if (userConfig.enabled === false) {
        diag2.debug("Disabling instrumentation for " + name_2);
        continue;
      }
      try {
        diag2.debug("Loading instrumentation for " + name_2);
        instrumentations.push(new Instance(userConfig));
      } catch (e) {
        diag2.error(e);
      }
    }
    return instrumentations;
  }

  // node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/util.js
  var __read12 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var DEFAULT_TRACE_TIMEOUT = 1e4;
  var DEFAULT_EXPORT_MAX_ATTEMPTS = 5;
  var DEFAULT_EXPORT_INITIAL_BACKOFF = 1e3;
  var DEFAULT_EXPORT_MAX_BACKOFF = 5e3;
  var DEFAULT_EXPORT_BACKOFF_MULTIPLIER = 1.5;
  function parseHeaders(partialHeaders) {
    if (partialHeaders === void 0) {
      partialHeaders = {};
    }
    var headers = {};
    Object.entries(partialHeaders).forEach(function(_a3) {
      var _b = __read12(_a3, 2), key = _b[0], value = _b[1];
      if (typeof value !== "undefined") {
        headers[key] = String(value);
      } else {
        diag2.warn('Header "' + key + '" has invalid value (' + value + ") and will be ignored");
      }
    });
    return headers;
  }
  function appendResourcePathToUrl(url, path) {
    if (!url.endsWith("/")) {
      url = url + "/";
    }
    return url + path;
  }
  function appendRootPathToUrlIfNeeded(url) {
    try {
      var parsedUrl = new URL(url);
      if (parsedUrl.pathname === "") {
        parsedUrl.pathname = parsedUrl.pathname + "/";
      }
      return parsedUrl.toString();
    } catch (_a3) {
      diag2.warn("Could not parse export URL: '" + url + "'");
      return url;
    }
  }
  function configureExporterTimeout(timeoutMillis) {
    if (typeof timeoutMillis === "number") {
      if (timeoutMillis <= 0) {
        return invalidTimeout(timeoutMillis, DEFAULT_TRACE_TIMEOUT);
      }
      return timeoutMillis;
    } else {
      return getExporterTimeoutFromEnv();
    }
  }
  function getExporterTimeoutFromEnv() {
    var _a3;
    var definedTimeout = Number((_a3 = getEnv().OTEL_EXPORTER_OTLP_TRACES_TIMEOUT) !== null && _a3 !== void 0 ? _a3 : getEnv().OTEL_EXPORTER_OTLP_TIMEOUT);
    if (definedTimeout <= 0) {
      return invalidTimeout(definedTimeout, DEFAULT_TRACE_TIMEOUT);
    } else {
      return definedTimeout;
    }
  }
  function invalidTimeout(timeout, defaultTimeout) {
    diag2.warn("Timeout must be greater than 0", timeout);
    return defaultTimeout;
  }
  function isExportRetryable(statusCode) {
    var retryCodes = [429, 502, 503, 504];
    return retryCodes.includes(statusCode);
  }
  function parseRetryAfterToMills(retryAfter) {
    if (retryAfter == null) {
      return -1;
    }
    var seconds = Number.parseInt(retryAfter, 10);
    if (Number.isInteger(seconds)) {
      return seconds > 0 ? seconds * 1e3 : -1;
    }
    var delay = new Date(retryAfter).getTime() - Date.now();
    if (delay >= 0) {
      return delay;
    }
    return 0;
  }

  // node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/OTLPExporterBase.js
  var OTLPExporterBase = (
    /** @class */
    function() {
      function OTLPExporterBase2(config) {
        if (config === void 0) {
          config = {};
        }
        this._sendingPromises = [];
        this.url = this.getDefaultUrl(config);
        if (typeof config.hostname === "string") {
          this.hostname = config.hostname;
        }
        this.shutdown = this.shutdown.bind(this);
        this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
        this._concurrencyLimit = typeof config.concurrencyLimit === "number" ? config.concurrencyLimit : 30;
        this.timeoutMillis = configureExporterTimeout(config.timeoutMillis);
        this.onInit(config);
      }
      OTLPExporterBase2.prototype.export = function(items, resultCallback) {
        if (this._shutdownOnce.isCalled) {
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error("Exporter has been shutdown")
          });
          return;
        }
        if (this._sendingPromises.length >= this._concurrencyLimit) {
          resultCallback({
            code: ExportResultCode.FAILED,
            error: new Error("Concurrent export limit reached")
          });
          return;
        }
        this._export(items).then(function() {
          resultCallback({ code: ExportResultCode.SUCCESS });
        }).catch(function(error) {
          resultCallback({ code: ExportResultCode.FAILED, error });
        });
      };
      OTLPExporterBase2.prototype._export = function(items) {
        var _this = this;
        return new Promise(function(resolve, reject) {
          try {
            diag2.debug("items to be sent", items);
            _this.send(items, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      };
      OTLPExporterBase2.prototype.shutdown = function() {
        return this._shutdownOnce.call();
      };
      OTLPExporterBase2.prototype.forceFlush = function() {
        return Promise.all(this._sendingPromises).then(function() {
        });
      };
      OTLPExporterBase2.prototype._shutdown = function() {
        diag2.debug("shutdown started");
        this.onShutdown();
        return this.forceFlush();
      };
      return OTLPExporterBase2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/types.js
  var __extends10 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var OTLPExporterError = (
    /** @class */
    function(_super) {
      __extends10(OTLPExporterError2, _super);
      function OTLPExporterError2(message, code, data) {
        var _this = _super.call(this, message) || this;
        _this.name = "OTLPExporterError";
        _this.data = data;
        _this.code = code;
        return _this;
      }
      return OTLPExporterError2;
    }(Error)
  );

  // node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/browser/util.js
  var __assign3 = function() {
    __assign3 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign3.apply(this, arguments);
  };
  var __read13 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function sendWithBeacon(body, url, blobPropertyBag, onSuccess, onError) {
    if (navigator.sendBeacon(url, new Blob([body], blobPropertyBag))) {
      diag2.debug("sendBeacon - can send", body);
      onSuccess();
    } else {
      var error = new OTLPExporterError("sendBeacon - cannot send " + body);
      onError(error);
    }
  }
  function sendWithXhr(body, url, headers, exporterTimeout, onSuccess, onError) {
    var retryTimer;
    var xhr;
    var reqIsDestroyed = false;
    var exporterTimer = setTimeout(function() {
      clearTimeout(retryTimer);
      reqIsDestroyed = true;
      if (xhr.readyState === XMLHttpRequest.DONE) {
        var err = new OTLPExporterError("Request Timeout");
        onError(err);
      } else {
        xhr.abort();
      }
    }, exporterTimeout);
    var sendWithRetry = function(retries, minDelay) {
      if (retries === void 0) {
        retries = DEFAULT_EXPORT_MAX_ATTEMPTS;
      }
      if (minDelay === void 0) {
        minDelay = DEFAULT_EXPORT_INITIAL_BACKOFF;
      }
      xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      var defaultHeaders = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };
      Object.entries(__assign3(__assign3({}, defaultHeaders), headers)).forEach(function(_a3) {
        var _b = __read13(_a3, 2), k = _b[0], v = _b[1];
        xhr.setRequestHeader(k, v);
      });
      xhr.send(body);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && reqIsDestroyed === false) {
          if (xhr.status >= 200 && xhr.status <= 299) {
            diag2.debug("xhr success", body);
            onSuccess();
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          } else if (xhr.status && isExportRetryable(xhr.status) && retries > 0) {
            var retryTime = void 0;
            minDelay = DEFAULT_EXPORT_BACKOFF_MULTIPLIER * minDelay;
            if (xhr.getResponseHeader("Retry-After")) {
              retryTime = parseRetryAfterToMills(xhr.getResponseHeader("Retry-After"));
            } else {
              retryTime = Math.round(Math.random() * (DEFAULT_EXPORT_MAX_BACKOFF - minDelay) + minDelay);
            }
            retryTimer = setTimeout(function() {
              sendWithRetry(retries - 1, minDelay);
            }, retryTime);
          } else {
            var error = new OTLPExporterError("Failed to export with XHR (status: " + xhr.status + ")", xhr.status);
            onError(error);
            clearTimeout(exporterTimer);
            clearTimeout(retryTimer);
          }
        }
      };
      xhr.onabort = function() {
        if (reqIsDestroyed) {
          var err = new OTLPExporterError("Request Timeout");
          onError(err);
        }
        clearTimeout(exporterTimer);
        clearTimeout(retryTimer);
      };
      xhr.onerror = function() {
        if (reqIsDestroyed) {
          var err = new OTLPExporterError("Request Timeout");
          onError(err);
        }
        clearTimeout(exporterTimer);
        clearTimeout(retryTimer);
      };
    };
    sendWithRetry();
  }

  // node_modules/.pnpm/@opentelemetry+otlp-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-exporter-base/build/esm/platform/browser/OTLPExporterBrowserBase.js
  var __extends11 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var OTLPExporterBrowserBase = (
    /** @class */
    function(_super) {
      __extends11(OTLPExporterBrowserBase2, _super);
      function OTLPExporterBrowserBase2(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this, config) || this;
        _this._useXHR = false;
        _this._useXHR = !!config.headers || typeof navigator.sendBeacon !== "function";
        if (_this._useXHR) {
          _this._headers = Object.assign({}, parseHeaders(config.headers), utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_HEADERS));
        } else {
          _this._headers = {};
        }
        return _this;
      }
      OTLPExporterBrowserBase2.prototype.onInit = function() {
      };
      OTLPExporterBrowserBase2.prototype.onShutdown = function() {
      };
      OTLPExporterBrowserBase2.prototype.send = function(items, onSuccess, onError) {
        var _this = this;
        if (this._shutdownOnce.isCalled) {
          diag2.debug("Shutdown already started. Cannot send objects");
          return;
        }
        var serviceRequest = this.convert(items);
        var body = JSON.stringify(serviceRequest);
        var promise = new Promise(function(resolve, reject) {
          if (_this._useXHR) {
            sendWithXhr(body, _this.url, _this._headers, _this.timeoutMillis, resolve, reject);
          } else {
            sendWithBeacon(body, _this.url, { type: "application/json" }, resolve, reject);
          }
        }).then(onSuccess, onError);
        this._sendingPromises.push(promise);
        var popPromise = function() {
          var index = _this._sendingPromises.indexOf(promise);
          _this._sendingPromises.splice(index, 1);
        };
        promise.then(popPromise, popPromise);
      };
      return OTLPExporterBrowserBase2;
    }(OTLPExporterBase)
  );

  // node_modules/.pnpm/@opentelemetry+otlp-transformer@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/common/index.js
  function hrTimeToNanos(hrTime2) {
    var NANOSECONDS = BigInt(1e9);
    return BigInt(hrTime2[0]) * NANOSECONDS + BigInt(hrTime2[1]);
  }
  function toLongBits(value) {
    var low = Number(BigInt.asUintN(32, value));
    var high = Number(BigInt.asUintN(32, value >> BigInt(32)));
    return { low, high };
  }
  function encodeAsLongBits(hrTime2) {
    var nanos = hrTimeToNanos(hrTime2);
    return toLongBits(nanos);
  }
  function encodeAsString(hrTime2) {
    var nanos = hrTimeToNanos(hrTime2);
    return nanos.toString();
  }
  var encodeTimestamp = typeof BigInt !== "undefined" ? encodeAsString : hrTimeToNanoseconds;
  function identity(value) {
    return value;
  }
  function optionalHexToBinary(str) {
    if (str === void 0)
      return void 0;
    return hexToBinary(str);
  }
  var DEFAULT_ENCODER = {
    encodeHrTime: encodeAsLongBits,
    encodeSpanContext: hexToBinary,
    encodeOptionalSpanContext: optionalHexToBinary
  };
  function getOtlpEncoder(options) {
    var _a3, _b;
    if (options === void 0) {
      return DEFAULT_ENCODER;
    }
    var useLongBits = (_a3 = options.useLongBits) !== null && _a3 !== void 0 ? _a3 : true;
    var useHex = (_b = options.useHex) !== null && _b !== void 0 ? _b : false;
    return {
      encodeHrTime: useLongBits ? encodeAsLongBits : encodeTimestamp,
      encodeSpanContext: useHex ? identity : hexToBinary,
      encodeOptionalSpanContext: useHex ? identity : optionalHexToBinary
    };
  }

  // node_modules/.pnpm/@opentelemetry+otlp-transformer@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/common/internal.js
  var __read14 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function toAttributes(attributes) {
    return Object.keys(attributes).map(function(key) {
      return toKeyValue(key, attributes[key]);
    });
  }
  function toKeyValue(key, value) {
    return {
      key,
      value: toAnyValue(value)
    };
  }
  function toAnyValue(value) {
    var t = typeof value;
    if (t === "string")
      return { stringValue: value };
    if (t === "number") {
      if (!Number.isInteger(value))
        return { doubleValue: value };
      return { intValue: value };
    }
    if (t === "boolean")
      return { boolValue: value };
    if (value instanceof Uint8Array)
      return { bytesValue: value };
    if (Array.isArray(value))
      return { arrayValue: { values: value.map(toAnyValue) } };
    if (t === "object" && value != null)
      return {
        kvlistValue: {
          values: Object.entries(value).map(function(_a3) {
            var _b = __read14(_a3, 2), k = _b[0], v = _b[1];
            return toKeyValue(k, v);
          })
        }
      };
    return {};
  }

  // node_modules/.pnpm/@opentelemetry+otlp-transformer@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/trace/internal.js
  function sdkSpanToOtlpSpan(span, encoder) {
    var _a3;
    var ctx = span.spanContext();
    var status = span.status;
    return {
      traceId: encoder.encodeSpanContext(ctx.traceId),
      spanId: encoder.encodeSpanContext(ctx.spanId),
      parentSpanId: encoder.encodeOptionalSpanContext(span.parentSpanId),
      traceState: (_a3 = ctx.traceState) === null || _a3 === void 0 ? void 0 : _a3.serialize(),
      name: span.name,
      // Span kind is offset by 1 because the API does not define a value for unset
      kind: span.kind == null ? 0 : span.kind + 1,
      startTimeUnixNano: encoder.encodeHrTime(span.startTime),
      endTimeUnixNano: encoder.encodeHrTime(span.endTime),
      attributes: toAttributes(span.attributes),
      droppedAttributesCount: span.droppedAttributesCount,
      events: span.events.map(function(event) {
        return toOtlpSpanEvent(event, encoder);
      }),
      droppedEventsCount: span.droppedEventsCount,
      status: {
        // API and proto enums share the same values
        code: status.code,
        message: status.message
      },
      links: span.links.map(function(link) {
        return toOtlpLink(link, encoder);
      }),
      droppedLinksCount: span.droppedLinksCount
    };
  }
  function toOtlpLink(link, encoder) {
    var _a3;
    return {
      attributes: link.attributes ? toAttributes(link.attributes) : [],
      spanId: encoder.encodeSpanContext(link.context.spanId),
      traceId: encoder.encodeSpanContext(link.context.traceId),
      traceState: (_a3 = link.context.traceState) === null || _a3 === void 0 ? void 0 : _a3.serialize(),
      droppedAttributesCount: link.droppedAttributesCount || 0
    };
  }
  function toOtlpSpanEvent(timedEvent, encoder) {
    return {
      attributes: timedEvent.attributes ? toAttributes(timedEvent.attributes) : [],
      name: timedEvent.name,
      timeUnixNano: encoder.encodeHrTime(timedEvent.time),
      droppedAttributesCount: timedEvent.droppedAttributesCount || 0
    };
  }

  // node_modules/.pnpm/@opentelemetry+otlp-transformer@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/trace/index.js
  var __values7 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read15 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function createExportTraceServiceRequest(spans, options) {
    var encoder = getOtlpEncoder(options);
    return {
      resourceSpans: spanRecordsToResourceSpans(spans, encoder)
    };
  }
  function createResourceMap(readableSpans) {
    var e_1, _a3;
    var resourceMap = /* @__PURE__ */ new Map();
    try {
      for (var readableSpans_1 = __values7(readableSpans), readableSpans_1_1 = readableSpans_1.next(); !readableSpans_1_1.done; readableSpans_1_1 = readableSpans_1.next()) {
        var record = readableSpans_1_1.value;
        var ilmMap = resourceMap.get(record.resource);
        if (!ilmMap) {
          ilmMap = /* @__PURE__ */ new Map();
          resourceMap.set(record.resource, ilmMap);
        }
        var instrumentationLibraryKey = record.instrumentationLibrary.name + "@" + (record.instrumentationLibrary.version || "") + ":" + (record.instrumentationLibrary.schemaUrl || "");
        var records = ilmMap.get(instrumentationLibraryKey);
        if (!records) {
          records = [];
          ilmMap.set(instrumentationLibraryKey, records);
        }
        records.push(record);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (readableSpans_1_1 && !readableSpans_1_1.done && (_a3 = readableSpans_1.return))
          _a3.call(readableSpans_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return resourceMap;
  }
  function spanRecordsToResourceSpans(readableSpans, encoder) {
    var resourceMap = createResourceMap(readableSpans);
    var out = [];
    var entryIterator = resourceMap.entries();
    var entry = entryIterator.next();
    while (!entry.done) {
      var _a3 = __read15(entry.value, 2), resource2 = _a3[0], ilmMap = _a3[1];
      var scopeResourceSpans = [];
      var ilmIterator = ilmMap.values();
      var ilmEntry = ilmIterator.next();
      while (!ilmEntry.done) {
        var scopeSpans = ilmEntry.value;
        if (scopeSpans.length > 0) {
          var _b = scopeSpans[0].instrumentationLibrary, name_1 = _b.name, version = _b.version, schemaUrl = _b.schemaUrl;
          var spans = scopeSpans.map(function(readableSpan) {
            return sdkSpanToOtlpSpan(readableSpan, encoder);
          });
          scopeResourceSpans.push({
            scope: { name: name_1, version },
            spans,
            schemaUrl
          });
        }
        ilmEntry = ilmIterator.next();
      }
      var transformedSpans = {
        resource: {
          attributes: toAttributes(resource2.attributes),
          droppedAttributesCount: 0
        },
        scopeSpans: scopeResourceSpans,
        schemaUrl: void 0
      };
      out.push(transformedSpans);
      entry = entryIterator.next();
    }
    return out;
  }

  // node_modules/.pnpm/@opentelemetry+otlp-transformer@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-transformer/build/esm/logs/index.js
  var __values8 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read16 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  function createExportLogsServiceRequest(logRecords, options) {
    var encoder = getOtlpEncoder(options);
    return {
      resourceLogs: logRecordsToResourceLogs(logRecords, encoder)
    };
  }
  function createResourceMap2(logRecords) {
    var e_1, _a3;
    var resourceMap = /* @__PURE__ */ new Map();
    try {
      for (var logRecords_1 = __values8(logRecords), logRecords_1_1 = logRecords_1.next(); !logRecords_1_1.done; logRecords_1_1 = logRecords_1.next()) {
        var record = logRecords_1_1.value;
        var resource2 = record.resource, _b = record.instrumentationScope, name_1 = _b.name, _c = _b.version, version = _c === void 0 ? "" : _c, _d = _b.schemaUrl, schemaUrl = _d === void 0 ? "" : _d;
        var ismMap = resourceMap.get(resource2);
        if (!ismMap) {
          ismMap = /* @__PURE__ */ new Map();
          resourceMap.set(resource2, ismMap);
        }
        var ismKey = name_1 + "@" + version + ":" + schemaUrl;
        var records = ismMap.get(ismKey);
        if (!records) {
          records = [];
          ismMap.set(ismKey, records);
        }
        records.push(record);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (logRecords_1_1 && !logRecords_1_1.done && (_a3 = logRecords_1.return))
          _a3.call(logRecords_1);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
    return resourceMap;
  }
  function logRecordsToResourceLogs(logRecords, encoder) {
    var resourceMap = createResourceMap2(logRecords);
    return Array.from(resourceMap, function(_a3) {
      var _b = __read16(_a3, 2), resource2 = _b[0], ismMap = _b[1];
      return {
        resource: {
          attributes: toAttributes(resource2.attributes),
          droppedAttributesCount: 0
        },
        scopeLogs: Array.from(ismMap, function(_a4) {
          var _b2 = __read16(_a4, 2), scopeLogs = _b2[1];
          var _c = scopeLogs[0].instrumentationScope, name = _c.name, version = _c.version, schemaUrl = _c.schemaUrl;
          return {
            scope: { name, version },
            logRecords: scopeLogs.map(function(log) {
              return toLogRecord(log, encoder);
            }),
            schemaUrl
          };
        }),
        schemaUrl: void 0
      };
    });
  }
  function toLogRecord(log, encoder) {
    var _a3, _b, _c;
    return {
      timeUnixNano: encoder.encodeHrTime(log.hrTime),
      observedTimeUnixNano: encoder.encodeHrTime(log.hrTimeObserved),
      severityNumber: toSeverityNumber(log.severityNumber),
      severityText: log.severityText,
      body: toAnyValue(log.body),
      attributes: toLogAttributes(log.attributes),
      droppedAttributesCount: log.droppedAttributesCount,
      flags: (_a3 = log.spanContext) === null || _a3 === void 0 ? void 0 : _a3.traceFlags,
      traceId: encoder.encodeOptionalSpanContext((_b = log.spanContext) === null || _b === void 0 ? void 0 : _b.traceId),
      spanId: encoder.encodeOptionalSpanContext((_c = log.spanContext) === null || _c === void 0 ? void 0 : _c.spanId)
    };
  }
  function toSeverityNumber(severityNumber) {
    return severityNumber;
  }
  function toLogAttributes(attributes) {
    return Object.keys(attributes).map(function(key) {
      return toKeyValue(key, attributes[key]);
    });
  }

  // node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-http@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-http/build/esm/platform/config.js
  var DEFAULT_COLLECTOR_RESOURCE_PATH = "v1/logs";
  var DEFAULT_COLLECTOR_URL = "http://localhost:4318/" + DEFAULT_COLLECTOR_RESOURCE_PATH;
  function getDefaultUrl(config) {
    return typeof config.url === "string" ? config.url : getEnv().OTEL_EXPORTER_OTLP_LOGS_ENDPOINT.length > 0 ? appendRootPathToUrlIfNeeded(getEnv().OTEL_EXPORTER_OTLP_LOGS_ENDPOINT) : getEnv().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? appendResourcePathToUrl(getEnv().OTEL_EXPORTER_OTLP_ENDPOINT, DEFAULT_COLLECTOR_RESOURCE_PATH) : DEFAULT_COLLECTOR_URL;
  }

  // node_modules/.pnpm/@opentelemetry+exporter-logs-otlp-http@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-logs-otlp-http/build/esm/platform/browser/OTLPLogExporter.js
  var __extends12 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __assign4 = function() {
    __assign4 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign4.apply(this, arguments);
  };
  var OTLPLogExporter = (
    /** @class */
    function(_super) {
      __extends12(OTLPLogExporter2, _super);
      function OTLPLogExporter2(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = (
          // load  OTEL_EXPORTER_OTLP_LOGS_TIMEOUT env var
          _super.call(this, __assign4({ timeoutMillis: getEnv().OTEL_EXPORTER_OTLP_LOGS_TIMEOUT }, config)) || this
        );
        _this._headers = __assign4(__assign4({}, _this._headers), utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_LOGS_HEADERS));
        return _this;
      }
      OTLPLogExporter2.prototype.convert = function(logRecords) {
        return createExportLogsServiceRequest(logRecords, {
          useHex: true,
          useLongBits: false
        });
      };
      OTLPLogExporter2.prototype.getDefaultUrl = function(config) {
        return getDefaultUrl(config);
      };
      return OTLPLogExporter2;
    }(OTLPExporterBrowserBase)
  );

  // node_modules/.pnpm/@opentelemetry+context-zone-peer-dep@1.23.0_@opentelemetry+api@1.8.0_zone.js@0.14.4/node_modules/@opentelemetry/context-zone-peer-dep/build/esm/util.js
  function isListenerObject(obj) {
    if (obj === void 0) {
      obj = {};
    }
    return typeof obj.addEventListener === "function" && typeof obj.removeEventListener === "function";
  }

  // node_modules/.pnpm/@opentelemetry+context-zone-peer-dep@1.23.0_@opentelemetry+api@1.8.0_zone.js@0.14.4/node_modules/@opentelemetry/context-zone-peer-dep/build/esm/ZoneContextManager.js
  var ZONE_CONTEXT_KEY2 = "OT_ZONE_CONTEXT";
  var ZoneContextManager = (
    /** @class */
    function() {
      function ZoneContextManager2() {
        this._enabled = false;
        this._zoneCounter = 0;
      }
      ZoneContextManager2.prototype._activeContextFromZone = function(activeZone) {
        return activeZone && activeZone.get(ZONE_CONTEXT_KEY2) || ROOT_CONTEXT;
      };
      ZoneContextManager2.prototype._bindFunction = function(context2, target) {
        var manager = this;
        var contextWrapper = function() {
          var _this = this;
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return manager.with(context2, function() {
            return target.apply(_this, args);
          });
        };
        Object.defineProperty(contextWrapper, "length", {
          enumerable: false,
          configurable: true,
          writable: false,
          value: target.length
        });
        return contextWrapper;
      };
      ZoneContextManager2.prototype._bindListener = function(context2, obj) {
        var target = obj;
        if (target.__ot_listeners !== void 0) {
          return obj;
        }
        target.__ot_listeners = {};
        if (typeof target.addEventListener === "function") {
          target.addEventListener = this._patchAddEventListener(target, target.addEventListener, context2);
        }
        if (typeof target.removeEventListener === "function") {
          target.removeEventListener = this._patchRemoveEventListener(target, target.removeEventListener);
        }
        return obj;
      };
      ZoneContextManager2.prototype._createZoneName = function() {
        this._zoneCounter++;
        var random = Math.random();
        return this._zoneCounter + "-" + random;
      };
      ZoneContextManager2.prototype._createZone = function(zoneName, context2) {
        var _a3;
        return Zone.current.fork({
          name: zoneName,
          properties: (_a3 = {}, _a3[ZONE_CONTEXT_KEY2] = context2, _a3)
        });
      };
      ZoneContextManager2.prototype._getActiveZone = function() {
        return Zone.current;
      };
      ZoneContextManager2.prototype._patchAddEventListener = function(target, original, context2) {
        var contextManager = this;
        return function(event, listener, opts) {
          if (target.__ot_listeners === void 0) {
            target.__ot_listeners = {};
          }
          var listeners = target.__ot_listeners[event];
          if (listeners === void 0) {
            listeners = /* @__PURE__ */ new WeakMap();
            target.__ot_listeners[event] = listeners;
          }
          var patchedListener = contextManager.bind(context2, listener);
          listeners.set(listener, patchedListener);
          return original.call(this, event, patchedListener, opts);
        };
      };
      ZoneContextManager2.prototype._patchRemoveEventListener = function(target, original) {
        return function(event, listener) {
          if (target.__ot_listeners === void 0 || target.__ot_listeners[event] === void 0) {
            return original.call(this, event, listener);
          }
          var events = target.__ot_listeners[event];
          var patchedListener = events.get(listener);
          events.delete(listener);
          return original.call(this, event, patchedListener || listener);
        };
      };
      ZoneContextManager2.prototype.active = function() {
        if (!this._enabled) {
          return ROOT_CONTEXT;
        }
        var activeZone = this._getActiveZone();
        var active = this._activeContextFromZone(activeZone);
        if (active) {
          return active;
        }
        return ROOT_CONTEXT;
      };
      ZoneContextManager2.prototype.bind = function(context2, target) {
        if (context2 === void 0) {
          context2 = this.active();
        }
        if (typeof target === "function") {
          return this._bindFunction(context2, target);
        } else if (isListenerObject(target)) {
          this._bindListener(context2, target);
        }
        return target;
      };
      ZoneContextManager2.prototype.disable = function() {
        this._enabled = false;
        return this;
      };
      ZoneContextManager2.prototype.enable = function() {
        this._enabled = true;
        return this;
      };
      ZoneContextManager2.prototype.with = function(context2, fn, thisArg) {
        var args = [];
        for (var _i = 3; _i < arguments.length; _i++) {
          args[_i - 3] = arguments[_i];
        }
        var zoneName = this._createZoneName();
        var newZone = this._createZone(zoneName, context2);
        return newZone.run(fn, thisArg, args);
      };
      return ZoneContextManager2;
    }()
  );

  // node_modules/.pnpm/zone.js@0.14.4/node_modules/zone.js/fesm2015/zone.js
  (function(global2) {
    const performance2 = global2["performance"];
    function mark(name) {
      performance2 && performance2["mark"] && performance2["mark"](name);
    }
    function performanceMeasure(name, label) {
      performance2 && performance2["measure"] && performance2["measure"](name, label);
    }
    mark("Zone");
    const symbolPrefix = global2["__Zone_symbol_prefix"] || "__zone_symbol__";
    function __symbol__(name) {
      return symbolPrefix + name;
    }
    const checkDuplicate = global2[__symbol__("forceDuplicateZoneCheck")] === true;
    if (global2["Zone"]) {
      if (checkDuplicate || typeof global2["Zone"].__symbol__ !== "function") {
        throw new Error("Zone already loaded.");
      } else {
        return global2["Zone"];
      }
    }
    class Zone2 {
      static {
        this.__symbol__ = __symbol__;
      }
      static assertZonePatched() {
        if (global2["Promise"] !== patches["ZoneAwarePromise"]) {
          throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)");
        }
      }
      static get root() {
        let zone = Zone2.current;
        while (zone.parent) {
          zone = zone.parent;
        }
        return zone;
      }
      static get current() {
        return _currentZoneFrame.zone;
      }
      static get currentTask() {
        return _currentTask;
      }
      // tslint:disable-next-line:require-internal-with-underscore
      static __load_patch(name, fn, ignoreDuplicate = false) {
        if (patches.hasOwnProperty(name)) {
          if (!ignoreDuplicate && checkDuplicate) {
            throw Error("Already loaded patch: " + name);
          }
        } else if (!global2["__Zone_disable_" + name]) {
          const perfName = "Zone:" + name;
          mark(perfName);
          patches[name] = fn(global2, Zone2, _api);
          performanceMeasure(perfName, perfName);
        }
      }
      get parent() {
        return this._parent;
      }
      get name() {
        return this._name;
      }
      constructor(parent, zoneSpec) {
        this._parent = parent;
        this._name = zoneSpec ? zoneSpec.name || "unnamed" : "<root>";
        this._properties = zoneSpec && zoneSpec.properties || {};
        this._zoneDelegate = new _ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
      }
      get(key) {
        const zone = this.getZoneWith(key);
        if (zone)
          return zone._properties[key];
      }
      getZoneWith(key) {
        let current = this;
        while (current) {
          if (current._properties.hasOwnProperty(key)) {
            return current;
          }
          current = current._parent;
        }
        return null;
      }
      fork(zoneSpec) {
        if (!zoneSpec)
          throw new Error("ZoneSpec required!");
        return this._zoneDelegate.fork(this, zoneSpec);
      }
      wrap(callback, source) {
        if (typeof callback !== "function") {
          throw new Error("Expecting function got: " + callback);
        }
        const _callback = this._zoneDelegate.intercept(this, callback, source);
        const zone = this;
        return function() {
          return zone.runGuarded(_callback, this, arguments, source);
        };
      }
      run(callback, applyThis, applyArgs, source) {
        _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
        try {
          return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
        } finally {
          _currentZoneFrame = _currentZoneFrame.parent;
        }
      }
      runGuarded(callback, applyThis = null, applyArgs, source) {
        _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
        try {
          try {
            return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
          } catch (error) {
            if (this._zoneDelegate.handleError(this, error)) {
              throw error;
            }
          }
        } finally {
          _currentZoneFrame = _currentZoneFrame.parent;
        }
      }
      runTask(task, applyThis, applyArgs) {
        if (task.zone != this) {
          throw new Error("A task can only be run in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
        }
        if (task.state === notScheduled && (task.type === eventTask || task.type === macroTask)) {
          return;
        }
        const reEntryGuard = task.state != running;
        reEntryGuard && task._transitionTo(running, scheduled);
        task.runCount++;
        const previousTask = _currentTask;
        _currentTask = task;
        _currentZoneFrame = { parent: _currentZoneFrame, zone: this };
        try {
          if (task.type == macroTask && task.data && !task.data.isPeriodic) {
            task.cancelFn = void 0;
          }
          try {
            return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
          } catch (error) {
            if (this._zoneDelegate.handleError(this, error)) {
              throw error;
            }
          }
        } finally {
          if (task.state !== notScheduled && task.state !== unknown) {
            if (task.type == eventTask || task.data && task.data.isPeriodic) {
              reEntryGuard && task._transitionTo(scheduled, running);
            } else {
              task.runCount = 0;
              this._updateTaskCount(task, -1);
              reEntryGuard && task._transitionTo(notScheduled, running, notScheduled);
            }
          }
          _currentZoneFrame = _currentZoneFrame.parent;
          _currentTask = previousTask;
        }
      }
      scheduleTask(task) {
        if (task.zone && task.zone !== this) {
          let newZone = this;
          while (newZone) {
            if (newZone === task.zone) {
              throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${task.zone.name}`);
            }
            newZone = newZone.parent;
          }
        }
        task._transitionTo(scheduling, notScheduled);
        const zoneDelegates = [];
        task._zoneDelegates = zoneDelegates;
        task._zone = this;
        try {
          task = this._zoneDelegate.scheduleTask(this, task);
        } catch (err) {
          task._transitionTo(unknown, scheduling, notScheduled);
          this._zoneDelegate.handleError(this, err);
          throw err;
        }
        if (task._zoneDelegates === zoneDelegates) {
          this._updateTaskCount(task, 1);
        }
        if (task.state == scheduling) {
          task._transitionTo(scheduled, scheduling);
        }
        return task;
      }
      scheduleMicroTask(source, callback, data, customSchedule) {
        return this.scheduleTask(new ZoneTask(microTask, source, callback, data, customSchedule, void 0));
      }
      scheduleMacroTask(source, callback, data, customSchedule, customCancel) {
        return this.scheduleTask(new ZoneTask(macroTask, source, callback, data, customSchedule, customCancel));
      }
      scheduleEventTask(source, callback, data, customSchedule, customCancel) {
        return this.scheduleTask(new ZoneTask(eventTask, source, callback, data, customSchedule, customCancel));
      }
      cancelTask(task) {
        if (task.zone != this)
          throw new Error("A task can only be cancelled in the zone of creation! (Creation: " + (task.zone || NO_ZONE).name + "; Execution: " + this.name + ")");
        if (task.state !== scheduled && task.state !== running) {
          return;
        }
        task._transitionTo(canceling, scheduled, running);
        try {
          this._zoneDelegate.cancelTask(this, task);
        } catch (err) {
          task._transitionTo(unknown, canceling);
          this._zoneDelegate.handleError(this, err);
          throw err;
        }
        this._updateTaskCount(task, -1);
        task._transitionTo(notScheduled, canceling);
        task.runCount = 0;
        return task;
      }
      _updateTaskCount(task, count) {
        const zoneDelegates = task._zoneDelegates;
        if (count == -1) {
          task._zoneDelegates = null;
        }
        for (let i = 0; i < zoneDelegates.length; i++) {
          zoneDelegates[i]._updateTaskCount(task.type, count);
        }
      }
    }
    const DELEGATE_ZS = {
      name: "",
      onHasTask: (delegate, _, target, hasTaskState) => delegate.hasTask(target, hasTaskState),
      onScheduleTask: (delegate, _, target, task) => delegate.scheduleTask(target, task),
      onInvokeTask: (delegate, _, target, task, applyThis, applyArgs) => delegate.invokeTask(target, task, applyThis, applyArgs),
      onCancelTask: (delegate, _, target, task) => delegate.cancelTask(target, task)
    };
    class _ZoneDelegate {
      constructor(zone, parentDelegate, zoneSpec) {
        this._taskCounts = { "microTask": 0, "macroTask": 0, "eventTask": 0 };
        this.zone = zone;
        this._parentDelegate = parentDelegate;
        this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
        this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
        this._forkCurrZone = zoneSpec && (zoneSpec.onFork ? this.zone : parentDelegate._forkCurrZone);
        this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
        this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
        this._interceptCurrZone = zoneSpec && (zoneSpec.onIntercept ? this.zone : parentDelegate._interceptCurrZone);
        this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
        this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
        this._invokeCurrZone = zoneSpec && (zoneSpec.onInvoke ? this.zone : parentDelegate._invokeCurrZone);
        this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
        this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
        this._handleErrorCurrZone = zoneSpec && (zoneSpec.onHandleError ? this.zone : parentDelegate._handleErrorCurrZone);
        this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
        this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
        this._scheduleTaskCurrZone = zoneSpec && (zoneSpec.onScheduleTask ? this.zone : parentDelegate._scheduleTaskCurrZone);
        this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
        this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
        this._invokeTaskCurrZone = zoneSpec && (zoneSpec.onInvokeTask ? this.zone : parentDelegate._invokeTaskCurrZone);
        this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
        this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
        this._cancelTaskCurrZone = zoneSpec && (zoneSpec.onCancelTask ? this.zone : parentDelegate._cancelTaskCurrZone);
        this._hasTaskZS = null;
        this._hasTaskDlgt = null;
        this._hasTaskDlgtOwner = null;
        this._hasTaskCurrZone = null;
        const zoneSpecHasTask = zoneSpec && zoneSpec.onHasTask;
        const parentHasTask = parentDelegate && parentDelegate._hasTaskZS;
        if (zoneSpecHasTask || parentHasTask) {
          this._hasTaskZS = zoneSpecHasTask ? zoneSpec : DELEGATE_ZS;
          this._hasTaskDlgt = parentDelegate;
          this._hasTaskDlgtOwner = this;
          this._hasTaskCurrZone = zone;
          if (!zoneSpec.onScheduleTask) {
            this._scheduleTaskZS = DELEGATE_ZS;
            this._scheduleTaskDlgt = parentDelegate;
            this._scheduleTaskCurrZone = this.zone;
          }
          if (!zoneSpec.onInvokeTask) {
            this._invokeTaskZS = DELEGATE_ZS;
            this._invokeTaskDlgt = parentDelegate;
            this._invokeTaskCurrZone = this.zone;
          }
          if (!zoneSpec.onCancelTask) {
            this._cancelTaskZS = DELEGATE_ZS;
            this._cancelTaskDlgt = parentDelegate;
            this._cancelTaskCurrZone = this.zone;
          }
        }
      }
      fork(targetZone, zoneSpec) {
        return this._forkZS ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec) : new Zone2(targetZone, zoneSpec);
      }
      intercept(targetZone, callback, source) {
        return this._interceptZS ? this._interceptZS.onIntercept(this._interceptDlgt, this._interceptCurrZone, targetZone, callback, source) : callback;
      }
      invoke(targetZone, callback, applyThis, applyArgs, source) {
        return this._invokeZS ? this._invokeZS.onInvoke(this._invokeDlgt, this._invokeCurrZone, targetZone, callback, applyThis, applyArgs, source) : callback.apply(applyThis, applyArgs);
      }
      handleError(targetZone, error) {
        return this._handleErrorZS ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this._handleErrorCurrZone, targetZone, error) : true;
      }
      scheduleTask(targetZone, task) {
        let returnTask = task;
        if (this._scheduleTaskZS) {
          if (this._hasTaskZS) {
            returnTask._zoneDelegates.push(this._hasTaskDlgtOwner);
          }
          returnTask = this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this._scheduleTaskCurrZone, targetZone, task);
          if (!returnTask)
            returnTask = task;
        } else {
          if (task.scheduleFn) {
            task.scheduleFn(task);
          } else if (task.type == microTask) {
            scheduleMicroTask(task);
          } else {
            throw new Error("Task is missing scheduleFn.");
          }
        }
        return returnTask;
      }
      invokeTask(targetZone, task, applyThis, applyArgs) {
        return this._invokeTaskZS ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this._invokeTaskCurrZone, targetZone, task, applyThis, applyArgs) : task.callback.apply(applyThis, applyArgs);
      }
      cancelTask(targetZone, task) {
        let value;
        if (this._cancelTaskZS) {
          value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this._cancelTaskCurrZone, targetZone, task);
        } else {
          if (!task.cancelFn) {
            throw Error("Task is not cancelable");
          }
          value = task.cancelFn(task);
        }
        return value;
      }
      hasTask(targetZone, isEmpty) {
        try {
          this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this._hasTaskCurrZone, targetZone, isEmpty);
        } catch (err) {
          this.handleError(targetZone, err);
        }
      }
      // tslint:disable-next-line:require-internal-with-underscore
      _updateTaskCount(type, count) {
        const counts = this._taskCounts;
        const prev = counts[type];
        const next = counts[type] = prev + count;
        if (next < 0) {
          throw new Error("More tasks executed then were scheduled.");
        }
        if (prev == 0 || next == 0) {
          const isEmpty = {
            microTask: counts["microTask"] > 0,
            macroTask: counts["macroTask"] > 0,
            eventTask: counts["eventTask"] > 0,
            change: type
          };
          this.hasTask(this.zone, isEmpty);
        }
      }
    }
    class ZoneTask {
      constructor(type, source, callback, options, scheduleFn, cancelFn) {
        this._zone = null;
        this.runCount = 0;
        this._zoneDelegates = null;
        this._state = "notScheduled";
        this.type = type;
        this.source = source;
        this.data = options;
        this.scheduleFn = scheduleFn;
        this.cancelFn = cancelFn;
        if (!callback) {
          throw new Error("callback is not defined");
        }
        this.callback = callback;
        const self2 = this;
        if (type === eventTask && options && options.useG) {
          this.invoke = ZoneTask.invokeTask;
        } else {
          this.invoke = function() {
            return ZoneTask.invokeTask.call(global2, self2, this, arguments);
          };
        }
      }
      static invokeTask(task, target, args) {
        if (!task) {
          task = this;
        }
        _numberOfNestedTaskFrames++;
        try {
          task.runCount++;
          return task.zone.runTask(task, target, args);
        } finally {
          if (_numberOfNestedTaskFrames == 1) {
            drainMicroTaskQueue();
          }
          _numberOfNestedTaskFrames--;
        }
      }
      get zone() {
        return this._zone;
      }
      get state() {
        return this._state;
      }
      cancelScheduleRequest() {
        this._transitionTo(notScheduled, scheduling);
      }
      // tslint:disable-next-line:require-internal-with-underscore
      _transitionTo(toState, fromState1, fromState2) {
        if (this._state === fromState1 || this._state === fromState2) {
          this._state = toState;
          if (toState == notScheduled) {
            this._zoneDelegates = null;
          }
        } else {
          throw new Error(`${this.type} '${this.source}': can not transition to '${toState}', expecting state '${fromState1}'${fromState2 ? " or '" + fromState2 + "'" : ""}, was '${this._state}'.`);
        }
      }
      toString() {
        if (this.data && typeof this.data.handleId !== "undefined") {
          return this.data.handleId.toString();
        } else {
          return Object.prototype.toString.call(this);
        }
      }
      // add toJSON method to prevent cyclic error when
      // call JSON.stringify(zoneTask)
      toJSON() {
        return {
          type: this.type,
          state: this.state,
          source: this.source,
          zone: this.zone.name,
          runCount: this.runCount
        };
      }
    }
    const symbolSetTimeout = __symbol__("setTimeout");
    const symbolPromise = __symbol__("Promise");
    const symbolThen = __symbol__("then");
    let _microTaskQueue = [];
    let _isDrainingMicrotaskQueue = false;
    let nativeMicroTaskQueuePromise;
    function nativeScheduleMicroTask(func) {
      if (!nativeMicroTaskQueuePromise) {
        if (global2[symbolPromise]) {
          nativeMicroTaskQueuePromise = global2[symbolPromise].resolve(0);
        }
      }
      if (nativeMicroTaskQueuePromise) {
        let nativeThen = nativeMicroTaskQueuePromise[symbolThen];
        if (!nativeThen) {
          nativeThen = nativeMicroTaskQueuePromise["then"];
        }
        nativeThen.call(nativeMicroTaskQueuePromise, func);
      } else {
        global2[symbolSetTimeout](func, 0);
      }
    }
    function scheduleMicroTask(task) {
      if (_numberOfNestedTaskFrames === 0 && _microTaskQueue.length === 0) {
        nativeScheduleMicroTask(drainMicroTaskQueue);
      }
      task && _microTaskQueue.push(task);
    }
    function drainMicroTaskQueue() {
      if (!_isDrainingMicrotaskQueue) {
        _isDrainingMicrotaskQueue = true;
        while (_microTaskQueue.length) {
          const queue = _microTaskQueue;
          _microTaskQueue = [];
          for (let i = 0; i < queue.length; i++) {
            const task = queue[i];
            try {
              task.zone.runTask(task, null, null);
            } catch (error) {
              _api.onUnhandledError(error);
            }
          }
        }
        _api.microtaskDrainDone();
        _isDrainingMicrotaskQueue = false;
      }
    }
    const NO_ZONE = {
      name: "NO ZONE"
    };
    const notScheduled = "notScheduled", scheduling = "scheduling", scheduled = "scheduled", running = "running", canceling = "canceling", unknown = "unknown";
    const microTask = "microTask", macroTask = "macroTask", eventTask = "eventTask";
    const patches = {};
    const _api = {
      symbol: __symbol__,
      currentZoneFrame: () => _currentZoneFrame,
      onUnhandledError: noop,
      microtaskDrainDone: noop,
      scheduleMicroTask,
      showUncaughtError: () => !Zone2[__symbol__("ignoreConsoleErrorUncaughtError")],
      patchEventTarget: () => [],
      patchOnProperties: noop,
      patchMethod: () => noop,
      bindArguments: () => [],
      patchThen: () => noop,
      patchMacroTask: () => noop,
      patchEventPrototype: () => noop,
      isIEOrEdge: () => false,
      getGlobalObjects: () => void 0,
      ObjectDefineProperty: () => noop,
      ObjectGetOwnPropertyDescriptor: () => void 0,
      ObjectCreate: () => void 0,
      ArraySlice: () => [],
      patchClass: () => noop,
      wrapWithCurrentZone: () => noop,
      filterProperties: () => [],
      attachOriginToPatched: () => noop,
      _redefineProperty: () => noop,
      patchCallbacks: () => noop,
      nativeScheduleMicroTask
    };
    let _currentZoneFrame = { parent: null, zone: new Zone2(null, null) };
    let _currentTask = null;
    let _numberOfNestedTaskFrames = 0;
    function noop() {
    }
    performanceMeasure("Zone", "Zone");
    return global2["Zone"] = Zone2;
  })(globalThis);
  var ObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  var ObjectDefineProperty = Object.defineProperty;
  var ObjectGetPrototypeOf = Object.getPrototypeOf;
  var ObjectCreate = Object.create;
  var ArraySlice = Array.prototype.slice;
  var ADD_EVENT_LISTENER_STR = "addEventListener";
  var REMOVE_EVENT_LISTENER_STR = "removeEventListener";
  var ZONE_SYMBOL_ADD_EVENT_LISTENER = Zone.__symbol__(ADD_EVENT_LISTENER_STR);
  var ZONE_SYMBOL_REMOVE_EVENT_LISTENER = Zone.__symbol__(REMOVE_EVENT_LISTENER_STR);
  var TRUE_STR = "true";
  var FALSE_STR = "false";
  var ZONE_SYMBOL_PREFIX = Zone.__symbol__("");
  function wrapWithCurrentZone(callback, source) {
    return Zone.current.wrap(callback, source);
  }
  function scheduleMacroTaskWithCurrentZone(source, callback, data, customSchedule, customCancel) {
    return Zone.current.scheduleMacroTask(source, callback, data, customSchedule, customCancel);
  }
  var zoneSymbol = Zone.__symbol__;
  var isWindowExists = typeof window !== "undefined";
  var internalWindow = isWindowExists ? window : void 0;
  var _global3 = isWindowExists && internalWindow || globalThis;
  var REMOVE_ATTRIBUTE = "removeAttribute";
  function bindArguments(args, source) {
    for (let i = args.length - 1; i >= 0; i--) {
      if (typeof args[i] === "function") {
        args[i] = wrapWithCurrentZone(args[i], source + "_" + i);
      }
    }
    return args;
  }
  function patchPrototype(prototype, fnNames) {
    const source = prototype.constructor["name"];
    for (let i = 0; i < fnNames.length; i++) {
      const name = fnNames[i];
      const delegate = prototype[name];
      if (delegate) {
        const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, name);
        if (!isPropertyWritable(prototypeDesc)) {
          continue;
        }
        prototype[name] = ((delegate2) => {
          const patched = function() {
            return delegate2.apply(this, bindArguments(arguments, source + "." + name));
          };
          attachOriginToPatched(patched, delegate2);
          return patched;
        })(delegate);
      }
    }
  }
  function isPropertyWritable(propertyDesc) {
    if (!propertyDesc) {
      return true;
    }
    if (propertyDesc.writable === false) {
      return false;
    }
    return !(typeof propertyDesc.get === "function" && typeof propertyDesc.set === "undefined");
  }
  var isWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
  var isNode2 = !("nw" in _global3) && typeof _global3.process !== "undefined" && {}.toString.call(_global3.process) === "[object process]";
  var isBrowser = !isNode2 && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
  var isMix = typeof _global3.process !== "undefined" && {}.toString.call(_global3.process) === "[object process]" && !isWebWorker && !!(isWindowExists && internalWindow["HTMLElement"]);
  var zoneSymbolEventNames$1 = {};
  var wrapFn = function(event) {
    event = event || _global3.event;
    if (!event) {
      return;
    }
    let eventNameSymbol = zoneSymbolEventNames$1[event.type];
    if (!eventNameSymbol) {
      eventNameSymbol = zoneSymbolEventNames$1[event.type] = zoneSymbol("ON_PROPERTY" + event.type);
    }
    const target = this || event.target || _global3;
    const listener = target[eventNameSymbol];
    let result;
    if (isBrowser && target === internalWindow && event.type === "error") {
      const errorEvent = event;
      result = listener && listener.call(this, errorEvent.message, errorEvent.filename, errorEvent.lineno, errorEvent.colno, errorEvent.error);
      if (result === true) {
        event.preventDefault();
      }
    } else {
      result = listener && listener.apply(this, arguments);
      if (result != void 0 && !result) {
        event.preventDefault();
      }
    }
    return result;
  };
  function patchProperty(obj, prop, prototype) {
    let desc = ObjectGetOwnPropertyDescriptor(obj, prop);
    if (!desc && prototype) {
      const prototypeDesc = ObjectGetOwnPropertyDescriptor(prototype, prop);
      if (prototypeDesc) {
        desc = { enumerable: true, configurable: true };
      }
    }
    if (!desc || !desc.configurable) {
      return;
    }
    const onPropPatchedSymbol = zoneSymbol("on" + prop + "patched");
    if (obj.hasOwnProperty(onPropPatchedSymbol) && obj[onPropPatchedSymbol]) {
      return;
    }
    delete desc.writable;
    delete desc.value;
    const originalDescGet = desc.get;
    const originalDescSet = desc.set;
    const eventName = prop.slice(2);
    let eventNameSymbol = zoneSymbolEventNames$1[eventName];
    if (!eventNameSymbol) {
      eventNameSymbol = zoneSymbolEventNames$1[eventName] = zoneSymbol("ON_PROPERTY" + eventName);
    }
    desc.set = function(newValue) {
      let target = this;
      if (!target && obj === _global3) {
        target = _global3;
      }
      if (!target) {
        return;
      }
      const previousValue = target[eventNameSymbol];
      if (typeof previousValue === "function") {
        target.removeEventListener(eventName, wrapFn);
      }
      originalDescSet && originalDescSet.call(target, null);
      target[eventNameSymbol] = newValue;
      if (typeof newValue === "function") {
        target.addEventListener(eventName, wrapFn, false);
      }
    };
    desc.get = function() {
      let target = this;
      if (!target && obj === _global3) {
        target = _global3;
      }
      if (!target) {
        return null;
      }
      const listener = target[eventNameSymbol];
      if (listener) {
        return listener;
      } else if (originalDescGet) {
        let value = originalDescGet.call(this);
        if (value) {
          desc.set.call(this, value);
          if (typeof target[REMOVE_ATTRIBUTE] === "function") {
            target.removeAttribute(prop);
          }
          return value;
        }
      }
      return null;
    };
    ObjectDefineProperty(obj, prop, desc);
    obj[onPropPatchedSymbol] = true;
  }
  function patchOnProperties(obj, properties, prototype) {
    if (properties) {
      for (let i = 0; i < properties.length; i++) {
        patchProperty(obj, "on" + properties[i], prototype);
      }
    } else {
      const onProperties = [];
      for (const prop in obj) {
        if (prop.slice(0, 2) == "on") {
          onProperties.push(prop);
        }
      }
      for (let j = 0; j < onProperties.length; j++) {
        patchProperty(obj, onProperties[j], prototype);
      }
    }
  }
  var originalInstanceKey = zoneSymbol("originalInstance");
  function patchClass(className) {
    const OriginalClass = _global3[className];
    if (!OriginalClass)
      return;
    _global3[zoneSymbol(className)] = OriginalClass;
    _global3[className] = function() {
      const a = bindArguments(arguments, className);
      switch (a.length) {
        case 0:
          this[originalInstanceKey] = new OriginalClass();
          break;
        case 1:
          this[originalInstanceKey] = new OriginalClass(a[0]);
          break;
        case 2:
          this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
          break;
        case 3:
          this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
          break;
        case 4:
          this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
          break;
        default:
          throw new Error("Arg list too long.");
      }
    };
    attachOriginToPatched(_global3[className], OriginalClass);
    const instance = new OriginalClass(function() {
    });
    let prop;
    for (prop in instance) {
      if (className === "XMLHttpRequest" && prop === "responseBlob")
        continue;
      (function(prop2) {
        if (typeof instance[prop2] === "function") {
          _global3[className].prototype[prop2] = function() {
            return this[originalInstanceKey][prop2].apply(this[originalInstanceKey], arguments);
          };
        } else {
          ObjectDefineProperty(_global3[className].prototype, prop2, {
            set: function(fn) {
              if (typeof fn === "function") {
                this[originalInstanceKey][prop2] = wrapWithCurrentZone(fn, className + "." + prop2);
                attachOriginToPatched(this[originalInstanceKey][prop2], fn);
              } else {
                this[originalInstanceKey][prop2] = fn;
              }
            },
            get: function() {
              return this[originalInstanceKey][prop2];
            }
          });
        }
      })(prop);
    }
    for (prop in OriginalClass) {
      if (prop !== "prototype" && OriginalClass.hasOwnProperty(prop)) {
        _global3[className][prop] = OriginalClass[prop];
      }
    }
  }
  function patchMethod(target, name, patchFn) {
    let proto = target;
    while (proto && !proto.hasOwnProperty(name)) {
      proto = ObjectGetPrototypeOf(proto);
    }
    if (!proto && target[name]) {
      proto = target;
    }
    const delegateName = zoneSymbol(name);
    let delegate = null;
    if (proto && (!(delegate = proto[delegateName]) || !proto.hasOwnProperty(delegateName))) {
      delegate = proto[delegateName] = proto[name];
      const desc = proto && ObjectGetOwnPropertyDescriptor(proto, name);
      if (isPropertyWritable(desc)) {
        const patchDelegate = patchFn(delegate, delegateName, name);
        proto[name] = function() {
          return patchDelegate(this, arguments);
        };
        attachOriginToPatched(proto[name], delegate);
      }
    }
    return delegate;
  }
  function patchMacroTask(obj, funcName, metaCreator) {
    let setNative = null;
    function scheduleTask(task) {
      const data = task.data;
      data.args[data.cbIdx] = function() {
        task.invoke.apply(this, arguments);
      };
      setNative.apply(data.target, data.args);
      return task;
    }
    setNative = patchMethod(obj, funcName, (delegate) => function(self2, args) {
      const meta = metaCreator(self2, args);
      if (meta.cbIdx >= 0 && typeof args[meta.cbIdx] === "function") {
        return scheduleMacroTaskWithCurrentZone(meta.name, args[meta.cbIdx], meta, scheduleTask);
      } else {
        return delegate.apply(self2, args);
      }
    });
  }
  function attachOriginToPatched(patched, original) {
    patched[zoneSymbol("OriginalDelegate")] = original;
  }
  var isDetectedIEOrEdge = false;
  var ieOrEdge = false;
  function isIE() {
    try {
      const ua = internalWindow.navigator.userAgent;
      if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1) {
        return true;
      }
    } catch (error) {
    }
    return false;
  }
  function isIEOrEdge() {
    if (isDetectedIEOrEdge) {
      return ieOrEdge;
    }
    isDetectedIEOrEdge = true;
    try {
      const ua = internalWindow.navigator.userAgent;
      if (ua.indexOf("MSIE ") !== -1 || ua.indexOf("Trident/") !== -1 || ua.indexOf("Edge/") !== -1) {
        ieOrEdge = true;
      }
    } catch (error) {
    }
    return ieOrEdge;
  }
  Zone.__load_patch("ZoneAwarePromise", (global2, Zone2, api) => {
    const ObjectGetOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;
    const ObjectDefineProperty2 = Object.defineProperty;
    function readableObjectToString(obj) {
      if (obj && obj.toString === Object.prototype.toString) {
        const className = obj.constructor && obj.constructor.name;
        return (className ? className : "") + ": " + JSON.stringify(obj);
      }
      return obj ? obj.toString() : Object.prototype.toString.call(obj);
    }
    const __symbol__ = api.symbol;
    const _uncaughtPromiseErrors = [];
    const isDisableWrappingUncaughtPromiseRejection = global2[__symbol__("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== false;
    const symbolPromise = __symbol__("Promise");
    const symbolThen = __symbol__("then");
    const creationTrace = "__creationTrace__";
    api.onUnhandledError = (e) => {
      if (api.showUncaughtError()) {
        const rejection = e && e.rejection;
        if (rejection) {
          console.error("Unhandled Promise rejection:", rejection instanceof Error ? rejection.message : rejection, "; Zone:", e.zone.name, "; Task:", e.task && e.task.source, "; Value:", rejection, rejection instanceof Error ? rejection.stack : void 0);
        } else {
          console.error(e);
        }
      }
    };
    api.microtaskDrainDone = () => {
      while (_uncaughtPromiseErrors.length) {
        const uncaughtPromiseError = _uncaughtPromiseErrors.shift();
        try {
          uncaughtPromiseError.zone.runGuarded(() => {
            if (uncaughtPromiseError.throwOriginal) {
              throw uncaughtPromiseError.rejection;
            }
            throw uncaughtPromiseError;
          });
        } catch (error) {
          handleUnhandledRejection(error);
        }
      }
    };
    const UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL = __symbol__("unhandledPromiseRejectionHandler");
    function handleUnhandledRejection(e) {
      api.onUnhandledError(e);
      try {
        const handler = Zone2[UNHANDLED_PROMISE_REJECTION_HANDLER_SYMBOL];
        if (typeof handler === "function") {
          handler.call(this, e);
        }
      } catch (err) {
      }
    }
    function isThenable(value) {
      return value && value.then;
    }
    function forwardResolution(value) {
      return value;
    }
    function forwardRejection(rejection) {
      return ZoneAwarePromise.reject(rejection);
    }
    const symbolState = __symbol__("state");
    const symbolValue = __symbol__("value");
    const symbolFinally = __symbol__("finally");
    const symbolParentPromiseValue = __symbol__("parentPromiseValue");
    const symbolParentPromiseState = __symbol__("parentPromiseState");
    const source = "Promise.then";
    const UNRESOLVED = null;
    const RESOLVED = true;
    const REJECTED = false;
    const REJECTED_NO_CATCH = 0;
    function makeResolver(promise, state) {
      return (v) => {
        try {
          resolvePromise(promise, state, v);
        } catch (err) {
          resolvePromise(promise, false, err);
        }
      };
    }
    const once = function() {
      let wasCalled = false;
      return function wrapper(wrappedFunction) {
        return function() {
          if (wasCalled) {
            return;
          }
          wasCalled = true;
          wrappedFunction.apply(null, arguments);
        };
      };
    };
    const TYPE_ERROR = "Promise resolved with itself";
    const CURRENT_TASK_TRACE_SYMBOL = __symbol__("currentTaskTrace");
    function resolvePromise(promise, state, value) {
      const onceWrapper = once();
      if (promise === value) {
        throw new TypeError(TYPE_ERROR);
      }
      if (promise[symbolState] === UNRESOLVED) {
        let then = null;
        try {
          if (typeof value === "object" || typeof value === "function") {
            then = value && value.then;
          }
        } catch (err) {
          onceWrapper(() => {
            resolvePromise(promise, false, err);
          })();
          return promise;
        }
        if (state !== REJECTED && value instanceof ZoneAwarePromise && value.hasOwnProperty(symbolState) && value.hasOwnProperty(symbolValue) && value[symbolState] !== UNRESOLVED) {
          clearRejectedNoCatch(value);
          resolvePromise(promise, value[symbolState], value[symbolValue]);
        } else if (state !== REJECTED && typeof then === "function") {
          try {
            then.call(value, onceWrapper(makeResolver(promise, state)), onceWrapper(makeResolver(promise, false)));
          } catch (err) {
            onceWrapper(() => {
              resolvePromise(promise, false, err);
            })();
          }
        } else {
          promise[symbolState] = state;
          const queue = promise[symbolValue];
          promise[symbolValue] = value;
          if (promise[symbolFinally] === symbolFinally) {
            if (state === RESOLVED) {
              promise[symbolState] = promise[symbolParentPromiseState];
              promise[symbolValue] = promise[symbolParentPromiseValue];
            }
          }
          if (state === REJECTED && value instanceof Error) {
            const trace2 = Zone2.currentTask && Zone2.currentTask.data && Zone2.currentTask.data[creationTrace];
            if (trace2) {
              ObjectDefineProperty2(value, CURRENT_TASK_TRACE_SYMBOL, { configurable: true, enumerable: false, writable: true, value: trace2 });
            }
          }
          for (let i = 0; i < queue.length; ) {
            scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
          }
          if (queue.length == 0 && state == REJECTED) {
            promise[symbolState] = REJECTED_NO_CATCH;
            let uncaughtPromiseError = value;
            try {
              throw new Error("Uncaught (in promise): " + readableObjectToString(value) + (value && value.stack ? "\n" + value.stack : ""));
            } catch (err) {
              uncaughtPromiseError = err;
            }
            if (isDisableWrappingUncaughtPromiseRejection) {
              uncaughtPromiseError.throwOriginal = true;
            }
            uncaughtPromiseError.rejection = value;
            uncaughtPromiseError.promise = promise;
            uncaughtPromiseError.zone = Zone2.current;
            uncaughtPromiseError.task = Zone2.currentTask;
            _uncaughtPromiseErrors.push(uncaughtPromiseError);
            api.scheduleMicroTask();
          }
        }
      }
      return promise;
    }
    const REJECTION_HANDLED_HANDLER = __symbol__("rejectionHandledHandler");
    function clearRejectedNoCatch(promise) {
      if (promise[symbolState] === REJECTED_NO_CATCH) {
        try {
          const handler = Zone2[REJECTION_HANDLED_HANDLER];
          if (handler && typeof handler === "function") {
            handler.call(this, { rejection: promise[symbolValue], promise });
          }
        } catch (err) {
        }
        promise[symbolState] = REJECTED;
        for (let i = 0; i < _uncaughtPromiseErrors.length; i++) {
          if (promise === _uncaughtPromiseErrors[i].promise) {
            _uncaughtPromiseErrors.splice(i, 1);
          }
        }
      }
    }
    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
      clearRejectedNoCatch(promise);
      const promiseState = promise[symbolState];
      const delegate = promiseState ? typeof onFulfilled === "function" ? onFulfilled : forwardResolution : typeof onRejected === "function" ? onRejected : forwardRejection;
      zone.scheduleMicroTask(source, () => {
        try {
          const parentPromiseValue = promise[symbolValue];
          const isFinallyPromise = !!chainPromise && symbolFinally === chainPromise[symbolFinally];
          if (isFinallyPromise) {
            chainPromise[symbolParentPromiseValue] = parentPromiseValue;
            chainPromise[symbolParentPromiseState] = promiseState;
          }
          const value = zone.run(delegate, void 0, isFinallyPromise && delegate !== forwardRejection && delegate !== forwardResolution ? [] : [parentPromiseValue]);
          resolvePromise(chainPromise, true, value);
        } catch (error) {
          resolvePromise(chainPromise, false, error);
        }
      }, chainPromise);
    }
    const ZONE_AWARE_PROMISE_TO_STRING = "function ZoneAwarePromise() { [native code] }";
    const noop = function() {
    };
    const AggregateError = global2.AggregateError;
    class ZoneAwarePromise {
      static toString() {
        return ZONE_AWARE_PROMISE_TO_STRING;
      }
      static resolve(value) {
        if (value instanceof ZoneAwarePromise) {
          return value;
        }
        return resolvePromise(new this(null), RESOLVED, value);
      }
      static reject(error) {
        return resolvePromise(new this(null), REJECTED, error);
      }
      static withResolvers() {
        const result = {};
        result.promise = new ZoneAwarePromise((res, rej) => {
          result.resolve = res;
          result.reject = rej;
        });
        return result;
      }
      static any(values) {
        if (!values || typeof values[Symbol.iterator] !== "function") {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        const promises = [];
        let count = 0;
        try {
          for (let v of values) {
            count++;
            promises.push(ZoneAwarePromise.resolve(v));
          }
        } catch (err) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        if (count === 0) {
          return Promise.reject(new AggregateError([], "All promises were rejected"));
        }
        let finished = false;
        const errors = [];
        return new ZoneAwarePromise((resolve, reject) => {
          for (let i = 0; i < promises.length; i++) {
            promises[i].then((v) => {
              if (finished) {
                return;
              }
              finished = true;
              resolve(v);
            }, (err) => {
              errors.push(err);
              count--;
              if (count === 0) {
                finished = true;
                reject(new AggregateError(errors, "All promises were rejected"));
              }
            });
          }
        });
      }
      static race(values) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        function onResolve(value) {
          resolve(value);
        }
        function onReject(error) {
          reject(error);
        }
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          value.then(onResolve, onReject);
        }
        return promise;
      }
      static all(values) {
        return ZoneAwarePromise.allWithCallback(values);
      }
      static allSettled(values) {
        const P = this && this.prototype instanceof ZoneAwarePromise ? this : ZoneAwarePromise;
        return P.allWithCallback(values, {
          thenCallback: (value) => ({ status: "fulfilled", value }),
          errorCallback: (err) => ({ status: "rejected", reason: err })
        });
      }
      static allWithCallback(values, callback) {
        let resolve;
        let reject;
        let promise = new this((res, rej) => {
          resolve = res;
          reject = rej;
        });
        let unresolvedCount = 2;
        let valueIndex = 0;
        const resolvedValues = [];
        for (let value of values) {
          if (!isThenable(value)) {
            value = this.resolve(value);
          }
          const curValueIndex = valueIndex;
          try {
            value.then((value2) => {
              resolvedValues[curValueIndex] = callback ? callback.thenCallback(value2) : value2;
              unresolvedCount--;
              if (unresolvedCount === 0) {
                resolve(resolvedValues);
              }
            }, (err) => {
              if (!callback) {
                reject(err);
              } else {
                resolvedValues[curValueIndex] = callback.errorCallback(err);
                unresolvedCount--;
                if (unresolvedCount === 0) {
                  resolve(resolvedValues);
                }
              }
            });
          } catch (thenErr) {
            reject(thenErr);
          }
          unresolvedCount++;
          valueIndex++;
        }
        unresolvedCount -= 2;
        if (unresolvedCount === 0) {
          resolve(resolvedValues);
        }
        return promise;
      }
      constructor(executor) {
        const promise = this;
        if (!(promise instanceof ZoneAwarePromise)) {
          throw new Error("Must be an instanceof Promise.");
        }
        promise[symbolState] = UNRESOLVED;
        promise[symbolValue] = [];
        try {
          const onceWrapper = once();
          executor && executor(onceWrapper(makeResolver(promise, RESOLVED)), onceWrapper(makeResolver(promise, REJECTED)));
        } catch (error) {
          resolvePromise(promise, false, error);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return ZoneAwarePromise;
      }
      then(onFulfilled, onRejected) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = this.constructor || ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        const zone = Zone2.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
        }
        return chainPromise;
      }
      catch(onRejected) {
        return this.then(null, onRejected);
      }
      finally(onFinally) {
        let C = this.constructor?.[Symbol.species];
        if (!C || typeof C !== "function") {
          C = ZoneAwarePromise;
        }
        const chainPromise = new C(noop);
        chainPromise[symbolFinally] = symbolFinally;
        const zone = Zone2.current;
        if (this[symbolState] == UNRESOLVED) {
          this[symbolValue].push(zone, chainPromise, onFinally, onFinally);
        } else {
          scheduleResolveOrReject(this, zone, chainPromise, onFinally, onFinally);
        }
        return chainPromise;
      }
    }
    ZoneAwarePromise["resolve"] = ZoneAwarePromise.resolve;
    ZoneAwarePromise["reject"] = ZoneAwarePromise.reject;
    ZoneAwarePromise["race"] = ZoneAwarePromise.race;
    ZoneAwarePromise["all"] = ZoneAwarePromise.all;
    const NativePromise = global2[symbolPromise] = global2["Promise"];
    global2["Promise"] = ZoneAwarePromise;
    const symbolThenPatched = __symbol__("thenPatched");
    function patchThen(Ctor) {
      const proto = Ctor.prototype;
      const prop = ObjectGetOwnPropertyDescriptor2(proto, "then");
      if (prop && (prop.writable === false || !prop.configurable)) {
        return;
      }
      const originalThen = proto.then;
      proto[symbolThen] = originalThen;
      Ctor.prototype.then = function(onResolve, onReject) {
        const wrapped = new ZoneAwarePromise((resolve, reject) => {
          originalThen.call(this, resolve, reject);
        });
        return wrapped.then(onResolve, onReject);
      };
      Ctor[symbolThenPatched] = true;
    }
    api.patchThen = patchThen;
    function zoneify(fn) {
      return function(self2, args) {
        let resultPromise = fn.apply(self2, args);
        if (resultPromise instanceof ZoneAwarePromise) {
          return resultPromise;
        }
        let ctor = resultPromise.constructor;
        if (!ctor[symbolThenPatched]) {
          patchThen(ctor);
        }
        return resultPromise;
      };
    }
    if (NativePromise) {
      patchThen(NativePromise);
      patchMethod(global2, "fetch", (delegate) => zoneify(delegate));
    }
    Promise[Zone2.__symbol__("uncaughtPromiseErrors")] = _uncaughtPromiseErrors;
    return ZoneAwarePromise;
  });
  Zone.__load_patch("toString", (global2) => {
    const originalFunctionToString = Function.prototype.toString;
    const ORIGINAL_DELEGATE_SYMBOL = zoneSymbol("OriginalDelegate");
    const PROMISE_SYMBOL = zoneSymbol("Promise");
    const ERROR_SYMBOL = zoneSymbol("Error");
    const newFunctionToString = function toString() {
      if (typeof this === "function") {
        const originalDelegate = this[ORIGINAL_DELEGATE_SYMBOL];
        if (originalDelegate) {
          if (typeof originalDelegate === "function") {
            return originalFunctionToString.call(originalDelegate);
          } else {
            return Object.prototype.toString.call(originalDelegate);
          }
        }
        if (this === Promise) {
          const nativePromise = global2[PROMISE_SYMBOL];
          if (nativePromise) {
            return originalFunctionToString.call(nativePromise);
          }
        }
        if (this === Error) {
          const nativeError = global2[ERROR_SYMBOL];
          if (nativeError) {
            return originalFunctionToString.call(nativeError);
          }
        }
      }
      return originalFunctionToString.call(this);
    };
    newFunctionToString[ORIGINAL_DELEGATE_SYMBOL] = originalFunctionToString;
    Function.prototype.toString = newFunctionToString;
    const originalObjectToString = Object.prototype.toString;
    const PROMISE_OBJECT_TO_STRING = "[object Promise]";
    Object.prototype.toString = function() {
      if (typeof Promise === "function" && this instanceof Promise) {
        return PROMISE_OBJECT_TO_STRING;
      }
      return originalObjectToString.call(this);
    };
  });
  var passiveSupported = false;
  if (typeof window !== "undefined") {
    try {
      const options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
        }
      });
      window.addEventListener("test", options, options);
      window.removeEventListener("test", options, options);
    } catch (err) {
      passiveSupported = false;
    }
  }
  var OPTIMIZED_ZONE_EVENT_TASK_DATA = {
    useG: true
  };
  var zoneSymbolEventNames = {};
  var globalSources = {};
  var EVENT_NAME_SYMBOL_REGX = new RegExp("^" + ZONE_SYMBOL_PREFIX + "(\\w+)(true|false)$");
  var IMMEDIATE_PROPAGATION_SYMBOL = zoneSymbol("propagationStopped");
  function prepareEventNames(eventName, eventNameToString) {
    const falseEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + FALSE_STR;
    const trueEventName = (eventNameToString ? eventNameToString(eventName) : eventName) + TRUE_STR;
    const symbol = ZONE_SYMBOL_PREFIX + falseEventName;
    const symbolCapture = ZONE_SYMBOL_PREFIX + trueEventName;
    zoneSymbolEventNames[eventName] = {};
    zoneSymbolEventNames[eventName][FALSE_STR] = symbol;
    zoneSymbolEventNames[eventName][TRUE_STR] = symbolCapture;
  }
  function patchEventTarget(_global4, api, apis, patchOptions) {
    const ADD_EVENT_LISTENER = patchOptions && patchOptions.add || ADD_EVENT_LISTENER_STR;
    const REMOVE_EVENT_LISTENER = patchOptions && patchOptions.rm || REMOVE_EVENT_LISTENER_STR;
    const LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.listeners || "eventListeners";
    const REMOVE_ALL_LISTENERS_EVENT_LISTENER = patchOptions && patchOptions.rmAll || "removeAllListeners";
    const zoneSymbolAddEventListener = zoneSymbol(ADD_EVENT_LISTENER);
    const ADD_EVENT_LISTENER_SOURCE = "." + ADD_EVENT_LISTENER + ":";
    const PREPEND_EVENT_LISTENER = "prependListener";
    const PREPEND_EVENT_LISTENER_SOURCE = "." + PREPEND_EVENT_LISTENER + ":";
    const invokeTask = function(task, target, event) {
      if (task.isRemoved) {
        return;
      }
      const delegate = task.callback;
      if (typeof delegate === "object" && delegate.handleEvent) {
        task.callback = (event2) => delegate.handleEvent(event2);
        task.originalDelegate = delegate;
      }
      let error;
      try {
        task.invoke(task, target, [event]);
      } catch (err) {
        error = err;
      }
      const options = task.options;
      if (options && typeof options === "object" && options.once) {
        const delegate2 = task.originalDelegate ? task.originalDelegate : task.callback;
        target[REMOVE_EVENT_LISTENER].call(target, event.type, delegate2, options);
      }
      return error;
    };
    function globalCallback(context2, event, isCapture) {
      event = event || _global4.event;
      if (!event) {
        return;
      }
      const target = context2 || event.target || _global4;
      const tasks = target[zoneSymbolEventNames[event.type][isCapture ? TRUE_STR : FALSE_STR]];
      if (tasks) {
        const errors = [];
        if (tasks.length === 1) {
          const err = invokeTask(tasks[0], target, event);
          err && errors.push(err);
        } else {
          const copyTasks = tasks.slice();
          for (let i = 0; i < copyTasks.length; i++) {
            if (event && event[IMMEDIATE_PROPAGATION_SYMBOL] === true) {
              break;
            }
            const err = invokeTask(copyTasks[i], target, event);
            err && errors.push(err);
          }
        }
        if (errors.length === 1) {
          throw errors[0];
        } else {
          for (let i = 0; i < errors.length; i++) {
            const err = errors[i];
            api.nativeScheduleMicroTask(() => {
              throw err;
            });
          }
        }
      }
    }
    const globalZoneAwareCallback = function(event) {
      return globalCallback(this, event, false);
    };
    const globalZoneAwareCaptureCallback = function(event) {
      return globalCallback(this, event, true);
    };
    function patchEventTargetMethods(obj, patchOptions2) {
      if (!obj) {
        return false;
      }
      let useGlobalCallback = true;
      if (patchOptions2 && patchOptions2.useG !== void 0) {
        useGlobalCallback = patchOptions2.useG;
      }
      const validateHandler = patchOptions2 && patchOptions2.vh;
      let checkDuplicate = true;
      if (patchOptions2 && patchOptions2.chkDup !== void 0) {
        checkDuplicate = patchOptions2.chkDup;
      }
      let returnTarget = false;
      if (patchOptions2 && patchOptions2.rt !== void 0) {
        returnTarget = patchOptions2.rt;
      }
      let proto = obj;
      while (proto && !proto.hasOwnProperty(ADD_EVENT_LISTENER)) {
        proto = ObjectGetPrototypeOf(proto);
      }
      if (!proto && obj[ADD_EVENT_LISTENER]) {
        proto = obj;
      }
      if (!proto) {
        return false;
      }
      if (proto[zoneSymbolAddEventListener]) {
        return false;
      }
      const eventNameToString = patchOptions2 && patchOptions2.eventNameToString;
      const taskData = {};
      const nativeAddEventListener = proto[zoneSymbolAddEventListener] = proto[ADD_EVENT_LISTENER];
      const nativeRemoveEventListener = proto[zoneSymbol(REMOVE_EVENT_LISTENER)] = proto[REMOVE_EVENT_LISTENER];
      const nativeListeners = proto[zoneSymbol(LISTENERS_EVENT_LISTENER)] = proto[LISTENERS_EVENT_LISTENER];
      const nativeRemoveAllListeners = proto[zoneSymbol(REMOVE_ALL_LISTENERS_EVENT_LISTENER)] = proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER];
      let nativePrependEventListener;
      if (patchOptions2 && patchOptions2.prepend) {
        nativePrependEventListener = proto[zoneSymbol(patchOptions2.prepend)] = proto[patchOptions2.prepend];
      }
      function buildEventListenerOptions(options, passive) {
        if (!passiveSupported && typeof options === "object" && options) {
          return !!options.capture;
        }
        if (!passiveSupported || !passive) {
          return options;
        }
        if (typeof options === "boolean") {
          return { capture: options, passive: true };
        }
        if (!options) {
          return { passive: true };
        }
        if (typeof options === "object" && options.passive !== false) {
          return { ...options, passive: true };
        }
        return options;
      }
      const customScheduleGlobal = function(task) {
        if (taskData.isExisting) {
          return;
        }
        return nativeAddEventListener.call(taskData.target, taskData.eventName, taskData.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, taskData.options);
      };
      const customCancelGlobal = function(task) {
        if (!task.isRemoved) {
          const symbolEventNames = zoneSymbolEventNames[task.eventName];
          let symbolEventName;
          if (symbolEventNames) {
            symbolEventName = symbolEventNames[task.capture ? TRUE_STR : FALSE_STR];
          }
          const existingTasks = symbolEventName && task.target[symbolEventName];
          if (existingTasks) {
            for (let i = 0; i < existingTasks.length; i++) {
              const existingTask = existingTasks[i];
              if (existingTask === task) {
                existingTasks.splice(i, 1);
                task.isRemoved = true;
                if (existingTasks.length === 0) {
                  task.allRemoved = true;
                  task.target[symbolEventName] = null;
                }
                break;
              }
            }
          }
        }
        if (!task.allRemoved) {
          return;
        }
        return nativeRemoveEventListener.call(task.target, task.eventName, task.capture ? globalZoneAwareCaptureCallback : globalZoneAwareCallback, task.options);
      };
      const customScheduleNonGlobal = function(task) {
        return nativeAddEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
      };
      const customSchedulePrepend = function(task) {
        return nativePrependEventListener.call(taskData.target, taskData.eventName, task.invoke, taskData.options);
      };
      const customCancelNonGlobal = function(task) {
        return nativeRemoveEventListener.call(task.target, task.eventName, task.invoke, task.options);
      };
      const customSchedule = useGlobalCallback ? customScheduleGlobal : customScheduleNonGlobal;
      const customCancel = useGlobalCallback ? customCancelGlobal : customCancelNonGlobal;
      const compareTaskCallbackVsDelegate = function(task, delegate) {
        const typeOfDelegate = typeof delegate;
        return typeOfDelegate === "function" && task.callback === delegate || typeOfDelegate === "object" && task.originalDelegate === delegate;
      };
      const compare = patchOptions2 && patchOptions2.diff ? patchOptions2.diff : compareTaskCallbackVsDelegate;
      const unpatchedEvents = Zone[zoneSymbol("UNPATCHED_EVENTS")];
      const passiveEvents = _global4[zoneSymbol("PASSIVE_EVENTS")];
      const makeAddListener = function(nativeListener, addSource, customScheduleFn, customCancelFn, returnTarget2 = false, prepend = false) {
        return function() {
          const target = this || _global4;
          let eventName = arguments[0];
          if (patchOptions2 && patchOptions2.transferEventName) {
            eventName = patchOptions2.transferEventName(eventName);
          }
          let delegate = arguments[1];
          if (!delegate) {
            return nativeListener.apply(this, arguments);
          }
          if (isNode2 && eventName === "uncaughtException") {
            return nativeListener.apply(this, arguments);
          }
          let isHandleEvent = false;
          if (typeof delegate !== "function") {
            if (!delegate.handleEvent) {
              return nativeListener.apply(this, arguments);
            }
            isHandleEvent = true;
          }
          if (validateHandler && !validateHandler(nativeListener, delegate, target, arguments)) {
            return;
          }
          const passive = passiveSupported && !!passiveEvents && passiveEvents.indexOf(eventName) !== -1;
          const options = buildEventListenerOptions(arguments[2], passive);
          const signal = options && typeof options === "object" && options.signal && typeof options.signal === "object" ? options.signal : void 0;
          if (signal?.aborted) {
            return;
          }
          if (unpatchedEvents) {
            for (let i = 0; i < unpatchedEvents.length; i++) {
              if (eventName === unpatchedEvents[i]) {
                if (passive) {
                  return nativeListener.call(target, eventName, delegate, options);
                } else {
                  return nativeListener.apply(this, arguments);
                }
              }
            }
          }
          const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
          const once = options && typeof options === "object" ? options.once : false;
          const zone = Zone.current;
          let symbolEventNames = zoneSymbolEventNames[eventName];
          if (!symbolEventNames) {
            prepareEventNames(eventName, eventNameToString);
            symbolEventNames = zoneSymbolEventNames[eventName];
          }
          const symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
          let existingTasks = target[symbolEventName];
          let isExisting = false;
          if (existingTasks) {
            isExisting = true;
            if (checkDuplicate) {
              for (let i = 0; i < existingTasks.length; i++) {
                if (compare(existingTasks[i], delegate)) {
                  return;
                }
              }
            }
          } else {
            existingTasks = target[symbolEventName] = [];
          }
          let source;
          const constructorName = target.constructor["name"];
          const targetSource = globalSources[constructorName];
          if (targetSource) {
            source = targetSource[eventName];
          }
          if (!source) {
            source = constructorName + addSource + (eventNameToString ? eventNameToString(eventName) : eventName);
          }
          taskData.options = options;
          if (once) {
            taskData.options.once = false;
          }
          taskData.target = target;
          taskData.capture = capture;
          taskData.eventName = eventName;
          taskData.isExisting = isExisting;
          const data = useGlobalCallback ? OPTIMIZED_ZONE_EVENT_TASK_DATA : void 0;
          if (data) {
            data.taskData = taskData;
          }
          if (signal) {
            taskData.options.signal = void 0;
          }
          const task = zone.scheduleEventTask(source, delegate, data, customScheduleFn, customCancelFn);
          if (signal) {
            taskData.options.signal = signal;
            nativeListener.call(signal, "abort", () => {
              task.zone.cancelTask(task);
            }, { once: true });
          }
          taskData.target = null;
          if (data) {
            data.taskData = null;
          }
          if (once) {
            options.once = true;
          }
          if (!(!passiveSupported && typeof task.options === "boolean")) {
            task.options = options;
          }
          task.target = target;
          task.capture = capture;
          task.eventName = eventName;
          if (isHandleEvent) {
            task.originalDelegate = delegate;
          }
          if (!prepend) {
            existingTasks.push(task);
          } else {
            existingTasks.unshift(task);
          }
          if (returnTarget2) {
            return target;
          }
        };
      };
      proto[ADD_EVENT_LISTENER] = makeAddListener(nativeAddEventListener, ADD_EVENT_LISTENER_SOURCE, customSchedule, customCancel, returnTarget);
      if (nativePrependEventListener) {
        proto[PREPEND_EVENT_LISTENER] = makeAddListener(nativePrependEventListener, PREPEND_EVENT_LISTENER_SOURCE, customSchedulePrepend, customCancel, returnTarget, true);
      }
      proto[REMOVE_EVENT_LISTENER] = function() {
        const target = this || _global4;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const options = arguments[2];
        const capture = !options ? false : typeof options === "boolean" ? true : options.capture;
        const delegate = arguments[1];
        if (!delegate) {
          return nativeRemoveEventListener.apply(this, arguments);
        }
        if (validateHandler && !validateHandler(nativeRemoveEventListener, delegate, target, arguments)) {
          return;
        }
        const symbolEventNames = zoneSymbolEventNames[eventName];
        let symbolEventName;
        if (symbolEventNames) {
          symbolEventName = symbolEventNames[capture ? TRUE_STR : FALSE_STR];
        }
        const existingTasks = symbolEventName && target[symbolEventName];
        if (existingTasks) {
          for (let i = 0; i < existingTasks.length; i++) {
            const existingTask = existingTasks[i];
            if (compare(existingTask, delegate)) {
              existingTasks.splice(i, 1);
              existingTask.isRemoved = true;
              if (existingTasks.length === 0) {
                existingTask.allRemoved = true;
                target[symbolEventName] = null;
                if (typeof eventName === "string") {
                  const onPropertySymbol = ZONE_SYMBOL_PREFIX + "ON_PROPERTY" + eventName;
                  target[onPropertySymbol] = null;
                }
              }
              existingTask.zone.cancelTask(existingTask);
              if (returnTarget) {
                return target;
              }
              return;
            }
          }
        }
        return nativeRemoveEventListener.apply(this, arguments);
      };
      proto[LISTENERS_EVENT_LISTENER] = function() {
        const target = this || _global4;
        let eventName = arguments[0];
        if (patchOptions2 && patchOptions2.transferEventName) {
          eventName = patchOptions2.transferEventName(eventName);
        }
        const listeners = [];
        const tasks = findEventTasks(target, eventNameToString ? eventNameToString(eventName) : eventName);
        for (let i = 0; i < tasks.length; i++) {
          const task = tasks[i];
          let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
          listeners.push(delegate);
        }
        return listeners;
      };
      proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER] = function() {
        const target = this || _global4;
        let eventName = arguments[0];
        if (!eventName) {
          const keys = Object.keys(target);
          for (let i = 0; i < keys.length; i++) {
            const prop = keys[i];
            const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
            let evtName = match && match[1];
            if (evtName && evtName !== "removeListener") {
              this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, evtName);
            }
          }
          this[REMOVE_ALL_LISTENERS_EVENT_LISTENER].call(this, "removeListener");
        } else {
          if (patchOptions2 && patchOptions2.transferEventName) {
            eventName = patchOptions2.transferEventName(eventName);
          }
          const symbolEventNames = zoneSymbolEventNames[eventName];
          if (symbolEventNames) {
            const symbolEventName = symbolEventNames[FALSE_STR];
            const symbolCaptureEventName = symbolEventNames[TRUE_STR];
            const tasks = target[symbolEventName];
            const captureTasks = target[symbolCaptureEventName];
            if (tasks) {
              const removeTasks = tasks.slice();
              for (let i = 0; i < removeTasks.length; i++) {
                const task = removeTasks[i];
                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
              }
            }
            if (captureTasks) {
              const removeTasks = captureTasks.slice();
              for (let i = 0; i < removeTasks.length; i++) {
                const task = removeTasks[i];
                let delegate = task.originalDelegate ? task.originalDelegate : task.callback;
                this[REMOVE_EVENT_LISTENER].call(this, eventName, delegate, task.options);
              }
            }
          }
        }
        if (returnTarget) {
          return this;
        }
      };
      attachOriginToPatched(proto[ADD_EVENT_LISTENER], nativeAddEventListener);
      attachOriginToPatched(proto[REMOVE_EVENT_LISTENER], nativeRemoveEventListener);
      if (nativeRemoveAllListeners) {
        attachOriginToPatched(proto[REMOVE_ALL_LISTENERS_EVENT_LISTENER], nativeRemoveAllListeners);
      }
      if (nativeListeners) {
        attachOriginToPatched(proto[LISTENERS_EVENT_LISTENER], nativeListeners);
      }
      return true;
    }
    let results = [];
    for (let i = 0; i < apis.length; i++) {
      results[i] = patchEventTargetMethods(apis[i], patchOptions);
    }
    return results;
  }
  function findEventTasks(target, eventName) {
    if (!eventName) {
      const foundTasks = [];
      for (let prop in target) {
        const match = EVENT_NAME_SYMBOL_REGX.exec(prop);
        let evtName = match && match[1];
        if (evtName && (!eventName || evtName === eventName)) {
          const tasks = target[prop];
          if (tasks) {
            for (let i = 0; i < tasks.length; i++) {
              foundTasks.push(tasks[i]);
            }
          }
        }
      }
      return foundTasks;
    }
    let symbolEventName = zoneSymbolEventNames[eventName];
    if (!symbolEventName) {
      prepareEventNames(eventName);
      symbolEventName = zoneSymbolEventNames[eventName];
    }
    const captureFalseTasks = target[symbolEventName[FALSE_STR]];
    const captureTrueTasks = target[symbolEventName[TRUE_STR]];
    if (!captureFalseTasks) {
      return captureTrueTasks ? captureTrueTasks.slice() : [];
    } else {
      return captureTrueTasks ? captureFalseTasks.concat(captureTrueTasks) : captureFalseTasks.slice();
    }
  }
  function patchEventPrototype(global2, api) {
    const Event2 = global2["Event"];
    if (Event2 && Event2.prototype) {
      api.patchMethod(Event2.prototype, "stopImmediatePropagation", (delegate) => function(self2, args) {
        self2[IMMEDIATE_PROPAGATION_SYMBOL] = true;
        delegate && delegate.apply(self2, args);
      });
    }
  }
  function patchCallbacks(api, target, targetName, method, callbacks) {
    const symbol = Zone.__symbol__(method);
    if (target[symbol]) {
      return;
    }
    const nativeDelegate = target[symbol] = target[method];
    target[method] = function(name, opts, options) {
      if (opts && opts.prototype) {
        callbacks.forEach(function(callback) {
          const source = `${targetName}.${method}::` + callback;
          const prototype = opts.prototype;
          try {
            if (prototype.hasOwnProperty(callback)) {
              const descriptor = api.ObjectGetOwnPropertyDescriptor(prototype, callback);
              if (descriptor && descriptor.value) {
                descriptor.value = api.wrapWithCurrentZone(descriptor.value, source);
                api._redefineProperty(opts.prototype, callback, descriptor);
              } else if (prototype[callback]) {
                prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
              }
            } else if (prototype[callback]) {
              prototype[callback] = api.wrapWithCurrentZone(prototype[callback], source);
            }
          } catch {
          }
        });
      }
      return nativeDelegate.call(target, name, opts, options);
    };
    api.attachOriginToPatched(target[method], nativeDelegate);
  }
  function filterProperties(target, onProperties, ignoreProperties) {
    if (!ignoreProperties || ignoreProperties.length === 0) {
      return onProperties;
    }
    const tip = ignoreProperties.filter((ip) => ip.target === target);
    if (!tip || tip.length === 0) {
      return onProperties;
    }
    const targetIgnoreProperties = tip[0].ignoreProperties;
    return onProperties.filter((op) => targetIgnoreProperties.indexOf(op) === -1);
  }
  function patchFilteredProperties(target, onProperties, ignoreProperties, prototype) {
    if (!target) {
      return;
    }
    const filteredProperties = filterProperties(target, onProperties, ignoreProperties);
    patchOnProperties(target, filteredProperties, prototype);
  }
  function getOnEventNames(target) {
    return Object.getOwnPropertyNames(target).filter((name) => name.startsWith("on") && name.length > 2).map((name) => name.substring(2));
  }
  function propertyDescriptorPatch(api, _global4) {
    if (isNode2 && !isMix) {
      return;
    }
    if (Zone[api.symbol("patchEvents")]) {
      return;
    }
    const ignoreProperties = _global4["__Zone_ignore_on_properties"];
    let patchTargets = [];
    if (isBrowser) {
      const internalWindow2 = window;
      patchTargets = patchTargets.concat([
        "Document",
        "SVGElement",
        "Element",
        "HTMLElement",
        "HTMLBodyElement",
        "HTMLMediaElement",
        "HTMLFrameSetElement",
        "HTMLFrameElement",
        "HTMLIFrameElement",
        "HTMLMarqueeElement",
        "Worker"
      ]);
      const ignoreErrorProperties = isIE() ? [{ target: internalWindow2, ignoreProperties: ["error"] }] : [];
      patchFilteredProperties(internalWindow2, getOnEventNames(internalWindow2), ignoreProperties ? ignoreProperties.concat(ignoreErrorProperties) : ignoreProperties, ObjectGetPrototypeOf(internalWindow2));
    }
    patchTargets = patchTargets.concat([
      "XMLHttpRequest",
      "XMLHttpRequestEventTarget",
      "IDBIndex",
      "IDBRequest",
      "IDBOpenDBRequest",
      "IDBDatabase",
      "IDBTransaction",
      "IDBCursor",
      "WebSocket"
    ]);
    for (let i = 0; i < patchTargets.length; i++) {
      const target = _global4[patchTargets[i]];
      target && target.prototype && patchFilteredProperties(target.prototype, getOnEventNames(target.prototype), ignoreProperties);
    }
  }
  Zone.__load_patch("util", (global2, Zone2, api) => {
    const eventNames = getOnEventNames(global2);
    api.patchOnProperties = patchOnProperties;
    api.patchMethod = patchMethod;
    api.bindArguments = bindArguments;
    api.patchMacroTask = patchMacroTask;
    const SYMBOL_BLACK_LISTED_EVENTS = Zone2.__symbol__("BLACK_LISTED_EVENTS");
    const SYMBOL_UNPATCHED_EVENTS = Zone2.__symbol__("UNPATCHED_EVENTS");
    if (global2[SYMBOL_UNPATCHED_EVENTS]) {
      global2[SYMBOL_BLACK_LISTED_EVENTS] = global2[SYMBOL_UNPATCHED_EVENTS];
    }
    if (global2[SYMBOL_BLACK_LISTED_EVENTS]) {
      Zone2[SYMBOL_BLACK_LISTED_EVENTS] = Zone2[SYMBOL_UNPATCHED_EVENTS] = global2[SYMBOL_BLACK_LISTED_EVENTS];
    }
    api.patchEventPrototype = patchEventPrototype;
    api.patchEventTarget = patchEventTarget;
    api.isIEOrEdge = isIEOrEdge;
    api.ObjectDefineProperty = ObjectDefineProperty;
    api.ObjectGetOwnPropertyDescriptor = ObjectGetOwnPropertyDescriptor;
    api.ObjectCreate = ObjectCreate;
    api.ArraySlice = ArraySlice;
    api.patchClass = patchClass;
    api.wrapWithCurrentZone = wrapWithCurrentZone;
    api.filterProperties = filterProperties;
    api.attachOriginToPatched = attachOriginToPatched;
    api._redefineProperty = Object.defineProperty;
    api.patchCallbacks = patchCallbacks;
    api.getGlobalObjects = () => ({
      globalSources,
      zoneSymbolEventNames,
      eventNames,
      isBrowser,
      isMix,
      isNode: isNode2,
      TRUE_STR,
      FALSE_STR,
      ZONE_SYMBOL_PREFIX,
      ADD_EVENT_LISTENER_STR,
      REMOVE_EVENT_LISTENER_STR
    });
  });
  function patchQueueMicrotask(global2, api) {
    api.patchMethod(global2, "queueMicrotask", (delegate) => {
      return function(self2, args) {
        Zone.current.scheduleMicroTask("queueMicrotask", args[0]);
      };
    });
  }
  var taskSymbol = zoneSymbol("zoneTask");
  function patchTimer(window2, setName, cancelName, nameSuffix) {
    let setNative = null;
    let clearNative = null;
    setName += nameSuffix;
    cancelName += nameSuffix;
    const tasksByHandleId = {};
    function scheduleTask(task) {
      const data = task.data;
      data.args[0] = function() {
        return task.invoke.apply(this, arguments);
      };
      data.handleId = setNative.apply(window2, data.args);
      return task;
    }
    function clearTask(task) {
      return clearNative.call(window2, task.data.handleId);
    }
    setNative = patchMethod(window2, setName, (delegate) => function(self2, args) {
      if (typeof args[0] === "function") {
        const options = {
          isPeriodic: nameSuffix === "Interval",
          delay: nameSuffix === "Timeout" || nameSuffix === "Interval" ? args[1] || 0 : void 0,
          args
        };
        const callback = args[0];
        args[0] = function timer() {
          try {
            return callback.apply(this, arguments);
          } finally {
            if (!options.isPeriodic) {
              if (typeof options.handleId === "number") {
                delete tasksByHandleId[options.handleId];
              } else if (options.handleId) {
                options.handleId[taskSymbol] = null;
              }
            }
          }
        };
        const task = scheduleMacroTaskWithCurrentZone(setName, args[0], options, scheduleTask, clearTask);
        if (!task) {
          return task;
        }
        const handle = task.data.handleId;
        if (typeof handle === "number") {
          tasksByHandleId[handle] = task;
        } else if (handle) {
          handle[taskSymbol] = task;
        }
        if (handle && handle.ref && handle.unref && typeof handle.ref === "function" && typeof handle.unref === "function") {
          task.ref = handle.ref.bind(handle);
          task.unref = handle.unref.bind(handle);
        }
        if (typeof handle === "number" || handle) {
          return handle;
        }
        return task;
      } else {
        return delegate.apply(window2, args);
      }
    });
    clearNative = patchMethod(window2, cancelName, (delegate) => function(self2, args) {
      const id = args[0];
      let task;
      if (typeof id === "number") {
        task = tasksByHandleId[id];
      } else {
        task = id && id[taskSymbol];
        if (!task) {
          task = id;
        }
      }
      if (task && typeof task.type === "string") {
        if (task.state !== "notScheduled" && (task.cancelFn && task.data.isPeriodic || task.runCount === 0)) {
          if (typeof id === "number") {
            delete tasksByHandleId[id];
          } else if (id) {
            id[taskSymbol] = null;
          }
          task.zone.cancelTask(task);
        }
      } else {
        delegate.apply(window2, args);
      }
    });
  }
  function patchCustomElements(_global4, api) {
    const { isBrowser: isBrowser2, isMix: isMix2 } = api.getGlobalObjects();
    if (!isBrowser2 && !isMix2 || !_global4["customElements"] || !("customElements" in _global4)) {
      return;
    }
    const callbacks = [
      "connectedCallback",
      "disconnectedCallback",
      "adoptedCallback",
      "attributeChangedCallback",
      "formAssociatedCallback",
      "formDisabledCallback",
      "formResetCallback",
      "formStateRestoreCallback"
    ];
    api.patchCallbacks(api, _global4.customElements, "customElements", "define", callbacks);
  }
  function eventTargetPatch(_global4, api) {
    if (Zone[api.symbol("patchEventTarget")]) {
      return;
    }
    const { eventNames, zoneSymbolEventNames: zoneSymbolEventNames2, TRUE_STR: TRUE_STR2, FALSE_STR: FALSE_STR2, ZONE_SYMBOL_PREFIX: ZONE_SYMBOL_PREFIX2 } = api.getGlobalObjects();
    for (let i = 0; i < eventNames.length; i++) {
      const eventName = eventNames[i];
      const falseEventName = eventName + FALSE_STR2;
      const trueEventName = eventName + TRUE_STR2;
      const symbol = ZONE_SYMBOL_PREFIX2 + falseEventName;
      const symbolCapture = ZONE_SYMBOL_PREFIX2 + trueEventName;
      zoneSymbolEventNames2[eventName] = {};
      zoneSymbolEventNames2[eventName][FALSE_STR2] = symbol;
      zoneSymbolEventNames2[eventName][TRUE_STR2] = symbolCapture;
    }
    const EVENT_TARGET = _global4["EventTarget"];
    if (!EVENT_TARGET || !EVENT_TARGET.prototype) {
      return;
    }
    api.patchEventTarget(_global4, api, [EVENT_TARGET && EVENT_TARGET.prototype]);
    return true;
  }
  function patchEvent(global2, api) {
    api.patchEventPrototype(global2, api);
  }
  Zone.__load_patch("legacy", (global2) => {
    const legacyPatch = global2[Zone.__symbol__("legacyPatch")];
    if (legacyPatch) {
      legacyPatch();
    }
  });
  Zone.__load_patch("timers", (global2) => {
    const set = "set";
    const clear = "clear";
    patchTimer(global2, set, clear, "Timeout");
    patchTimer(global2, set, clear, "Interval");
    patchTimer(global2, set, clear, "Immediate");
  });
  Zone.__load_patch("requestAnimationFrame", (global2) => {
    patchTimer(global2, "request", "cancel", "AnimationFrame");
    patchTimer(global2, "mozRequest", "mozCancel", "AnimationFrame");
    patchTimer(global2, "webkitRequest", "webkitCancel", "AnimationFrame");
  });
  Zone.__load_patch("blocking", (global2, Zone2) => {
    const blockingMethods = ["alert", "prompt", "confirm"];
    for (let i = 0; i < blockingMethods.length; i++) {
      const name = blockingMethods[i];
      patchMethod(global2, name, (delegate, symbol, name2) => {
        return function(s, args) {
          return Zone2.current.run(delegate, global2, args, name2);
        };
      });
    }
  });
  Zone.__load_patch("EventTarget", (global2, Zone2, api) => {
    patchEvent(global2, api);
    eventTargetPatch(global2, api);
    const XMLHttpRequestEventTarget = global2["XMLHttpRequestEventTarget"];
    if (XMLHttpRequestEventTarget && XMLHttpRequestEventTarget.prototype) {
      api.patchEventTarget(global2, api, [XMLHttpRequestEventTarget.prototype]);
    }
  });
  Zone.__load_patch("MutationObserver", (global2, Zone2, api) => {
    patchClass("MutationObserver");
    patchClass("WebKitMutationObserver");
  });
  Zone.__load_patch("IntersectionObserver", (global2, Zone2, api) => {
    patchClass("IntersectionObserver");
  });
  Zone.__load_patch("FileReader", (global2, Zone2, api) => {
    patchClass("FileReader");
  });
  Zone.__load_patch("on_property", (global2, Zone2, api) => {
    propertyDescriptorPatch(api, global2);
  });
  Zone.__load_patch("customElements", (global2, Zone2, api) => {
    patchCustomElements(global2, api);
  });
  Zone.__load_patch("XHR", (global2, Zone2) => {
    patchXHR(global2);
    const XHR_TASK = zoneSymbol("xhrTask");
    const XHR_SYNC = zoneSymbol("xhrSync");
    const XHR_LISTENER = zoneSymbol("xhrListener");
    const XHR_SCHEDULED = zoneSymbol("xhrScheduled");
    const XHR_URL = zoneSymbol("xhrURL");
    const XHR_ERROR_BEFORE_SCHEDULED = zoneSymbol("xhrErrorBeforeScheduled");
    function patchXHR(window2) {
      const XMLHttpRequest2 = window2["XMLHttpRequest"];
      if (!XMLHttpRequest2) {
        return;
      }
      const XMLHttpRequestPrototype = XMLHttpRequest2.prototype;
      function findPendingTask(target) {
        return target[XHR_TASK];
      }
      let oriAddListener = XMLHttpRequestPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
      let oriRemoveListener = XMLHttpRequestPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
      if (!oriAddListener) {
        const XMLHttpRequestEventTarget = window2["XMLHttpRequestEventTarget"];
        if (XMLHttpRequestEventTarget) {
          const XMLHttpRequestEventTargetPrototype = XMLHttpRequestEventTarget.prototype;
          oriAddListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = XMLHttpRequestEventTargetPrototype[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
      }
      const READY_STATE_CHANGE = "readystatechange";
      const SCHEDULED = "scheduled";
      function scheduleTask(task) {
        const data = task.data;
        const target = data.target;
        target[XHR_SCHEDULED] = false;
        target[XHR_ERROR_BEFORE_SCHEDULED] = false;
        const listener = target[XHR_LISTENER];
        if (!oriAddListener) {
          oriAddListener = target[ZONE_SYMBOL_ADD_EVENT_LISTENER];
          oriRemoveListener = target[ZONE_SYMBOL_REMOVE_EVENT_LISTENER];
        }
        if (listener) {
          oriRemoveListener.call(target, READY_STATE_CHANGE, listener);
        }
        const newListener = target[XHR_LISTENER] = () => {
          if (target.readyState === target.DONE) {
            if (!data.aborted && target[XHR_SCHEDULED] && task.state === SCHEDULED) {
              const loadTasks = target[Zone2.__symbol__("loadfalse")];
              if (target.status !== 0 && loadTasks && loadTasks.length > 0) {
                const oriInvoke = task.invoke;
                task.invoke = function() {
                  const loadTasks2 = target[Zone2.__symbol__("loadfalse")];
                  for (let i = 0; i < loadTasks2.length; i++) {
                    if (loadTasks2[i] === task) {
                      loadTasks2.splice(i, 1);
                    }
                  }
                  if (!data.aborted && task.state === SCHEDULED) {
                    oriInvoke.call(task);
                  }
                };
                loadTasks.push(task);
              } else {
                task.invoke();
              }
            } else if (!data.aborted && target[XHR_SCHEDULED] === false) {
              target[XHR_ERROR_BEFORE_SCHEDULED] = true;
            }
          }
        };
        oriAddListener.call(target, READY_STATE_CHANGE, newListener);
        const storedTask = target[XHR_TASK];
        if (!storedTask) {
          target[XHR_TASK] = task;
        }
        sendNative.apply(target, data.args);
        target[XHR_SCHEDULED] = true;
        return task;
      }
      function placeholderCallback() {
      }
      function clearTask(task) {
        const data = task.data;
        data.aborted = true;
        return abortNative.apply(data.target, data.args);
      }
      const openNative = patchMethod(XMLHttpRequestPrototype, "open", () => function(self2, args) {
        self2[XHR_SYNC] = args[2] == false;
        self2[XHR_URL] = args[1];
        return openNative.apply(self2, args);
      });
      const XMLHTTPREQUEST_SOURCE = "XMLHttpRequest.send";
      const fetchTaskAborting = zoneSymbol("fetchTaskAborting");
      const fetchTaskScheduling = zoneSymbol("fetchTaskScheduling");
      const sendNative = patchMethod(XMLHttpRequestPrototype, "send", () => function(self2, args) {
        if (Zone2.current[fetchTaskScheduling] === true) {
          return sendNative.apply(self2, args);
        }
        if (self2[XHR_SYNC]) {
          return sendNative.apply(self2, args);
        } else {
          const options = { target: self2, url: self2[XHR_URL], isPeriodic: false, args, aborted: false };
          const task = scheduleMacroTaskWithCurrentZone(XMLHTTPREQUEST_SOURCE, placeholderCallback, options, scheduleTask, clearTask);
          if (self2 && self2[XHR_ERROR_BEFORE_SCHEDULED] === true && !options.aborted && task.state === SCHEDULED) {
            task.invoke();
          }
        }
      });
      const abortNative = patchMethod(XMLHttpRequestPrototype, "abort", () => function(self2, args) {
        const task = findPendingTask(self2);
        if (task && typeof task.type == "string") {
          if (task.cancelFn == null || task.data && task.data.aborted) {
            return;
          }
          task.zone.cancelTask(task);
        } else if (Zone2.current[fetchTaskAborting] === true) {
          return abortNative.apply(self2, args);
        }
      });
    }
  });
  Zone.__load_patch("geolocation", (global2) => {
    if (global2["navigator"] && global2["navigator"].geolocation) {
      patchPrototype(global2["navigator"].geolocation, ["getCurrentPosition", "watchPosition"]);
    }
  });
  Zone.__load_patch("PromiseRejectionEvent", (global2, Zone2) => {
    function findPromiseRejectionHandler(evtName) {
      return function(e) {
        const eventTasks = findEventTasks(global2, evtName);
        eventTasks.forEach((eventTask) => {
          const PromiseRejectionEvent = global2["PromiseRejectionEvent"];
          if (PromiseRejectionEvent) {
            const evt = new PromiseRejectionEvent(evtName, { promise: e.promise, reason: e.rejection });
            eventTask.invoke(evt);
          }
        });
      };
    }
    if (global2["PromiseRejectionEvent"]) {
      Zone2[zoneSymbol("unhandledPromiseRejectionHandler")] = findPromiseRejectionHandler("unhandledrejection");
      Zone2[zoneSymbol("rejectionHandledHandler")] = findPromiseRejectionHandler("rejectionhandled");
    }
  });
  Zone.__load_patch("queueMicrotask", (global2, Zone2, api) => {
    patchQueueMicrotask(global2, api);
  });

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/LogRecord.js
  var __values9 = function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  var __read17 = function(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  };
  var LogRecord = (
    /** @class */
    function() {
      function LogRecord2(_sharedState, instrumentationScope, logRecord) {
        this.attributes = {};
        this.totalAttributesCount = 0;
        this._isReadonly = false;
        var timestamp = logRecord.timestamp, observedTimestamp = logRecord.observedTimestamp, severityNumber = logRecord.severityNumber, severityText = logRecord.severityText, body = logRecord.body, _a3 = logRecord.attributes, attributes = _a3 === void 0 ? {} : _a3, context2 = logRecord.context;
        var now = Date.now();
        this.hrTime = timeInputToHrTime(timestamp !== null && timestamp !== void 0 ? timestamp : now);
        this.hrTimeObserved = timeInputToHrTime(observedTimestamp !== null && observedTimestamp !== void 0 ? observedTimestamp : now);
        if (context2) {
          var spanContext = trace.getSpanContext(context2);
          if (spanContext && isSpanContextValid(spanContext)) {
            this.spanContext = spanContext;
          }
        }
        this.severityNumber = severityNumber;
        this.severityText = severityText;
        this.body = body;
        this.resource = _sharedState.resource;
        this.instrumentationScope = instrumentationScope;
        this._logRecordLimits = _sharedState.logRecordLimits;
        this.setAttributes(attributes);
      }
      Object.defineProperty(LogRecord2.prototype, "severityText", {
        get: function() {
          return this._severityText;
        },
        set: function(severityText) {
          if (this._isLogRecordReadonly()) {
            return;
          }
          this._severityText = severityText;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LogRecord2.prototype, "severityNumber", {
        get: function() {
          return this._severityNumber;
        },
        set: function(severityNumber) {
          if (this._isLogRecordReadonly()) {
            return;
          }
          this._severityNumber = severityNumber;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LogRecord2.prototype, "body", {
        get: function() {
          return this._body;
        },
        set: function(body) {
          if (this._isLogRecordReadonly()) {
            return;
          }
          this._body = body;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LogRecord2.prototype, "droppedAttributesCount", {
        get: function() {
          return this.totalAttributesCount - Object.keys(this.attributes).length;
        },
        enumerable: false,
        configurable: true
      });
      LogRecord2.prototype.setAttribute = function(key, value) {
        if (this._isLogRecordReadonly()) {
          return this;
        }
        if (value === null) {
          return this;
        }
        if (key.length === 0) {
          diag2.warn("Invalid attribute key: " + key);
          return this;
        }
        if (!isAttributeValue(value) && !(typeof value === "object" && !Array.isArray(value) && Object.keys(value).length > 0)) {
          diag2.warn("Invalid attribute value set for key: " + key);
          return this;
        }
        this.totalAttributesCount += 1;
        if (Object.keys(this.attributes).length >= this._logRecordLimits.attributeCountLimit && !Object.prototype.hasOwnProperty.call(this.attributes, key)) {
          return this;
        }
        if (isAttributeValue(value)) {
          this.attributes[key] = this._truncateToSize(value);
        } else {
          this.attributes[key] = value;
        }
        return this;
      };
      LogRecord2.prototype.setAttributes = function(attributes) {
        var e_1, _a3;
        try {
          for (var _b = __values9(Object.entries(attributes)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read17(_c.value, 2), k = _d[0], v = _d[1];
            this.setAttribute(k, v);
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a3 = _b.return))
              _a3.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return this;
      };
      LogRecord2.prototype.setBody = function(body) {
        this.body = body;
        return this;
      };
      LogRecord2.prototype.setSeverityNumber = function(severityNumber) {
        this.severityNumber = severityNumber;
        return this;
      };
      LogRecord2.prototype.setSeverityText = function(severityText) {
        this.severityText = severityText;
        return this;
      };
      LogRecord2.prototype._makeReadonly = function() {
        this._isReadonly = true;
      };
      LogRecord2.prototype._truncateToSize = function(value) {
        var _this = this;
        var limit = this._logRecordLimits.attributeValueLengthLimit;
        if (limit <= 0) {
          diag2.warn("Attribute value limit must be positive, got " + limit);
          return value;
        }
        if (typeof value === "string") {
          return this._truncateToLimitUtil(value, limit);
        }
        if (Array.isArray(value)) {
          return value.map(function(val) {
            return typeof val === "string" ? _this._truncateToLimitUtil(val, limit) : val;
          });
        }
        return value;
      };
      LogRecord2.prototype._truncateToLimitUtil = function(value, limit) {
        if (value.length <= limit) {
          return value;
        }
        return value.substring(0, limit);
      };
      LogRecord2.prototype._isLogRecordReadonly = function() {
        if (this._isReadonly) {
          diag2.warn("Can not execute the operation on emitted log record");
        }
        return this._isReadonly;
      };
      return LogRecord2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/Logger.js
  var __assign5 = function() {
    __assign5 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign5.apply(this, arguments);
  };
  var Logger = (
    /** @class */
    function() {
      function Logger2(instrumentationScope, _sharedState) {
        this.instrumentationScope = instrumentationScope;
        this._sharedState = _sharedState;
      }
      Logger2.prototype.emit = function(logRecord) {
        var currentContext = logRecord.context || context.active();
        var logRecordInstance = new LogRecord(this._sharedState, this.instrumentationScope, __assign5({ context: currentContext }, logRecord));
        this._sharedState.activeProcessor.onEmit(logRecordInstance, currentContext);
        logRecordInstance._makeReadonly();
      };
      return Logger2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/config.js
  function loadDefaultConfig2() {
    return {
      forceFlushTimeoutMillis: 3e4,
      logRecordLimits: {
        attributeValueLengthLimit: getEnv().OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT,
        attributeCountLimit: getEnv().OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT
      },
      includeTraceContext: true
    };
  }
  function reconfigureLimits2(logRecordLimits) {
    var _a3, _b, _c, _d, _e, _f;
    var parsedEnvConfig = getEnvWithoutDefaults();
    return {
      /**
       * Reassign log record attribute count limit to use first non null value defined by user or use default value
       */
      attributeCountLimit: (_c = (_b = (_a3 = logRecordLimits.attributeCountLimit) !== null && _a3 !== void 0 ? _a3 : parsedEnvConfig.OTEL_LOGRECORD_ATTRIBUTE_COUNT_LIMIT) !== null && _b !== void 0 ? _b : parsedEnvConfig.OTEL_ATTRIBUTE_COUNT_LIMIT) !== null && _c !== void 0 ? _c : DEFAULT_ATTRIBUTE_COUNT_LIMIT,
      /**
       * Reassign log record attribute value length limit to use first non null value defined by user or use default value
       */
      attributeValueLengthLimit: (_f = (_e = (_d = logRecordLimits.attributeValueLengthLimit) !== null && _d !== void 0 ? _d : parsedEnvConfig.OTEL_LOGRECORD_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _e !== void 0 ? _e : parsedEnvConfig.OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT) !== null && _f !== void 0 ? _f : DEFAULT_ATTRIBUTE_VALUE_LENGTH_LIMIT
    };
  }

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/MultiLogRecordProcessor.js
  var __awaiter2 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator2 = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var MultiLogRecordProcessor = (
    /** @class */
    function() {
      function MultiLogRecordProcessor2(processors, forceFlushTimeoutMillis) {
        this.processors = processors;
        this.forceFlushTimeoutMillis = forceFlushTimeoutMillis;
      }
      MultiLogRecordProcessor2.prototype.forceFlush = function() {
        return __awaiter2(this, void 0, void 0, function() {
          var timeout;
          return __generator2(this, function(_a3) {
            switch (_a3.label) {
              case 0:
                timeout = this.forceFlushTimeoutMillis;
                return [4, Promise.all(this.processors.map(function(processor) {
                  return callWithTimeout(processor.forceFlush(), timeout);
                }))];
              case 1:
                _a3.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      MultiLogRecordProcessor2.prototype.onEmit = function(logRecord, context2) {
        this.processors.forEach(function(processors) {
          return processors.onEmit(logRecord, context2);
        });
      };
      MultiLogRecordProcessor2.prototype.shutdown = function() {
        return __awaiter2(this, void 0, void 0, function() {
          return __generator2(this, function(_a3) {
            switch (_a3.label) {
              case 0:
                return [4, Promise.all(this.processors.map(function(processor) {
                  return processor.shutdown();
                }))];
              case 1:
                _a3.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      return MultiLogRecordProcessor2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/export/NoopLogRecordProcessor.js
  var NoopLogRecordProcessor = (
    /** @class */
    function() {
      function NoopLogRecordProcessor2() {
      }
      NoopLogRecordProcessor2.prototype.forceFlush = function() {
        return Promise.resolve();
      };
      NoopLogRecordProcessor2.prototype.onEmit = function(_logRecord, _context) {
      };
      NoopLogRecordProcessor2.prototype.shutdown = function() {
        return Promise.resolve();
      };
      return NoopLogRecordProcessor2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/internal/LoggerProviderSharedState.js
  var LoggerProviderSharedState = (
    /** @class */
    /* @__PURE__ */ function() {
      function LoggerProviderSharedState2(resource2, forceFlushTimeoutMillis, logRecordLimits) {
        this.resource = resource2;
        this.forceFlushTimeoutMillis = forceFlushTimeoutMillis;
        this.logRecordLimits = logRecordLimits;
        this.loggers = /* @__PURE__ */ new Map();
        this.registeredLogRecordProcessors = [];
        this.activeProcessor = new NoopLogRecordProcessor();
      }
      return LoggerProviderSharedState2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/LoggerProvider.js
  var DEFAULT_LOGGER_NAME = "unknown";
  var LoggerProvider = (
    /** @class */
    function() {
      function LoggerProvider2(config) {
        if (config === void 0) {
          config = {};
        }
        var _a3;
        var mergedConfig = merge({}, loadDefaultConfig2(), config);
        var resource2 = Resource.default().merge((_a3 = mergedConfig.resource) !== null && _a3 !== void 0 ? _a3 : Resource.empty());
        this._sharedState = new LoggerProviderSharedState(resource2, mergedConfig.forceFlushTimeoutMillis, reconfigureLimits2(mergedConfig.logRecordLimits));
        this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
      }
      LoggerProvider2.prototype.getLogger = function(name, version, options) {
        if (this._shutdownOnce.isCalled) {
          diag2.warn("A shutdown LoggerProvider cannot provide a Logger");
          return NOOP_LOGGER;
        }
        if (!name) {
          diag2.warn("Logger requested without instrumentation scope name.");
        }
        var loggerName = name || DEFAULT_LOGGER_NAME;
        var key = loggerName + "@" + (version || "") + ":" + ((options === null || options === void 0 ? void 0 : options.schemaUrl) || "");
        if (!this._sharedState.loggers.has(key)) {
          this._sharedState.loggers.set(key, new Logger({ name: loggerName, version, schemaUrl: options === null || options === void 0 ? void 0 : options.schemaUrl }, this._sharedState));
        }
        return this._sharedState.loggers.get(key);
      };
      LoggerProvider2.prototype.addLogRecordProcessor = function(processor) {
        if (this._sharedState.registeredLogRecordProcessors.length === 0) {
          this._sharedState.activeProcessor.shutdown().catch(function(err) {
            return diag2.error("Error while trying to shutdown current log record processor", err);
          });
        }
        this._sharedState.registeredLogRecordProcessors.push(processor);
        this._sharedState.activeProcessor = new MultiLogRecordProcessor(this._sharedState.registeredLogRecordProcessors, this._sharedState.forceFlushTimeoutMillis);
      };
      LoggerProvider2.prototype.forceFlush = function() {
        if (this._shutdownOnce.isCalled) {
          diag2.warn("invalid attempt to force flush after LoggerProvider shutdown");
          return this._shutdownOnce.promise;
        }
        return this._sharedState.activeProcessor.forceFlush();
      };
      LoggerProvider2.prototype.shutdown = function() {
        if (this._shutdownOnce.isCalled) {
          diag2.warn("shutdown may only be called once per LoggerProvider");
          return this._shutdownOnce.promise;
        }
        return this._shutdownOnce.call();
      };
      LoggerProvider2.prototype._shutdown = function() {
        return this._sharedState.activeProcessor.shutdown();
      };
      return LoggerProvider2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/export/BatchLogRecordProcessorBase.js
  var __awaiter3 = function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator3 = function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var BatchLogRecordProcessorBase = (
    /** @class */
    function() {
      function BatchLogRecordProcessorBase2(_exporter, config) {
        var _a3, _b, _c, _d;
        this._exporter = _exporter;
        this._finishedLogRecords = [];
        var env2 = getEnv();
        this._maxExportBatchSize = (_a3 = config === null || config === void 0 ? void 0 : config.maxExportBatchSize) !== null && _a3 !== void 0 ? _a3 : env2.OTEL_BLRP_MAX_EXPORT_BATCH_SIZE;
        this._maxQueueSize = (_b = config === null || config === void 0 ? void 0 : config.maxQueueSize) !== null && _b !== void 0 ? _b : env2.OTEL_BLRP_MAX_QUEUE_SIZE;
        this._scheduledDelayMillis = (_c = config === null || config === void 0 ? void 0 : config.scheduledDelayMillis) !== null && _c !== void 0 ? _c : env2.OTEL_BLRP_SCHEDULE_DELAY;
        this._exportTimeoutMillis = (_d = config === null || config === void 0 ? void 0 : config.exportTimeoutMillis) !== null && _d !== void 0 ? _d : env2.OTEL_BLRP_EXPORT_TIMEOUT;
        this._shutdownOnce = new BindOnceFuture(this._shutdown, this);
        if (this._maxExportBatchSize > this._maxQueueSize) {
          diag2.warn("BatchLogRecordProcessor: maxExportBatchSize must be smaller or equal to maxQueueSize, setting maxExportBatchSize to match maxQueueSize");
          this._maxExportBatchSize = this._maxQueueSize;
        }
      }
      BatchLogRecordProcessorBase2.prototype.onEmit = function(logRecord) {
        if (this._shutdownOnce.isCalled) {
          return;
        }
        this._addToBuffer(logRecord);
      };
      BatchLogRecordProcessorBase2.prototype.forceFlush = function() {
        if (this._shutdownOnce.isCalled) {
          return this._shutdownOnce.promise;
        }
        return this._flushAll();
      };
      BatchLogRecordProcessorBase2.prototype.shutdown = function() {
        return this._shutdownOnce.call();
      };
      BatchLogRecordProcessorBase2.prototype._shutdown = function() {
        return __awaiter3(this, void 0, void 0, function() {
          return __generator3(this, function(_a3) {
            switch (_a3.label) {
              case 0:
                this.onShutdown();
                return [4, this._flushAll()];
              case 1:
                _a3.sent();
                return [4, this._exporter.shutdown()];
              case 2:
                _a3.sent();
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      BatchLogRecordProcessorBase2.prototype._addToBuffer = function(logRecord) {
        if (this._finishedLogRecords.length >= this._maxQueueSize) {
          return;
        }
        this._finishedLogRecords.push(logRecord);
        this._maybeStartTimer();
      };
      BatchLogRecordProcessorBase2.prototype._flushAll = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var promises = [];
          var batchCount = Math.ceil(_this._finishedLogRecords.length / _this._maxExportBatchSize);
          for (var i = 0; i < batchCount; i++) {
            promises.push(_this._flushOneBatch());
          }
          Promise.all(promises).then(function() {
            resolve();
          }).catch(reject);
        });
      };
      BatchLogRecordProcessorBase2.prototype._flushOneBatch = function() {
        var _this = this;
        this._clearTimer();
        if (this._finishedLogRecords.length === 0) {
          return Promise.resolve();
        }
        return new Promise(function(resolve, reject) {
          callWithTimeout(_this._export(_this._finishedLogRecords.splice(0, _this._maxExportBatchSize)), _this._exportTimeoutMillis).then(function() {
            return resolve();
          }).catch(reject);
        });
      };
      BatchLogRecordProcessorBase2.prototype._maybeStartTimer = function() {
        var _this = this;
        if (this._timer !== void 0) {
          return;
        }
        this._timer = setTimeout(function() {
          _this._flushOneBatch().then(function() {
            if (_this._finishedLogRecords.length > 0) {
              _this._clearTimer();
              _this._maybeStartTimer();
            }
          }).catch(function(e) {
            globalErrorHandler(e);
          });
        }, this._scheduledDelayMillis);
        unrefTimer(this._timer);
      };
      BatchLogRecordProcessorBase2.prototype._clearTimer = function() {
        if (this._timer !== void 0) {
          clearTimeout(this._timer);
          this._timer = void 0;
        }
      };
      BatchLogRecordProcessorBase2.prototype._export = function(logRecords) {
        var _this = this;
        var doExport = function() {
          return internal._export(_this._exporter, logRecords).then(function(result) {
            var _a3;
            if (result.code !== ExportResultCode.SUCCESS) {
              globalErrorHandler((_a3 = result.error) !== null && _a3 !== void 0 ? _a3 : new Error("BatchLogRecordProcessor: log record export failed (status " + result + ")"));
            }
          }).catch(globalErrorHandler);
        };
        var pendingResources = logRecords.map(function(logRecord) {
          return logRecord.resource;
        }).filter(function(resource2) {
          return resource2.asyncAttributesPending;
        });
        if (pendingResources.length === 0) {
          return doExport();
        } else {
          return Promise.all(pendingResources.map(function(resource2) {
            var _a3;
            return (_a3 = resource2.waitForAsyncAttributes) === null || _a3 === void 0 ? void 0 : _a3.call(resource2);
          })).then(doExport, globalErrorHandler);
        }
      };
      return BatchLogRecordProcessorBase2;
    }()
  );

  // node_modules/.pnpm/@opentelemetry+sdk-logs@0.50.0_@opentelemetry+api-logs@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/sdk-logs/build/esm/platform/browser/export/BatchLogRecordProcessor.js
  var __extends13 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var BatchLogRecordProcessor = (
    /** @class */
    function(_super) {
      __extends13(BatchLogRecordProcessor2, _super);
      function BatchLogRecordProcessor2(exporter, config) {
        var _this = _super.call(this, exporter, config) || this;
        _this._onInit(config);
        return _this;
      }
      BatchLogRecordProcessor2.prototype.onShutdown = function() {
        if (typeof document === "undefined") {
          return;
        }
        if (this._visibilityChangeListener) {
          document.removeEventListener("visibilitychange", this._visibilityChangeListener);
        }
        if (this._pageHideListener) {
          document.removeEventListener("pagehide", this._pageHideListener);
        }
      };
      BatchLogRecordProcessor2.prototype._onInit = function(config) {
        var _this = this;
        if ((config === null || config === void 0 ? void 0 : config.disableAutoFlushOnDocumentHide) === true || typeof document === "undefined") {
          return;
        }
        this._visibilityChangeListener = function() {
          if (document.visibilityState === "hidden") {
            void _this.forceFlush();
          }
        };
        this._pageHideListener = function() {
          void _this.forceFlush();
        };
        document.addEventListener("visibilitychange", this._visibilityChangeListener);
        document.addEventListener("pagehide", this._pageHideListener);
      };
      return BatchLogRecordProcessor2;
    }(BatchLogRecordProcessorBase)
  );

  // node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/util.js
  var root = __toESM(require_root());

  // node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/types.js
  var ServiceClientType;
  (function(ServiceClientType2) {
    ServiceClientType2[ServiceClientType2["SPANS"] = 0] = "SPANS";
    ServiceClientType2[ServiceClientType2["METRICS"] = 1] = "METRICS";
    ServiceClientType2[ServiceClientType2["LOGS"] = 2] = "LOGS";
  })(ServiceClientType || (ServiceClientType = {}));

  // node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/util.js
  function getExportRequestProto(clientType) {
    if (clientType === ServiceClientType.SPANS) {
      return root.opentelemetry.proto.collector.trace.v1.ExportTraceServiceRequest;
    } else if (clientType === ServiceClientType.LOGS) {
      return root.opentelemetry.proto.collector.logs.v1.ExportLogsServiceRequest;
    } else {
      return root.opentelemetry.proto.collector.metrics.v1.ExportMetricsServiceRequest;
    }
  }

  // node_modules/.pnpm/@opentelemetry+otlp-proto-exporter-base@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/otlp-proto-exporter-base/build/esm/platform/browser/OTLPProtoExporterBrowserBase.js
  var __extends14 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var __assign6 = function() {
    __assign6 = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign6.apply(this, arguments);
  };
  var OTLPProtoExporterBrowserBase = (
    /** @class */
    function(_super) {
      __extends14(OTLPProtoExporterBrowserBase2, _super);
      function OTLPProtoExporterBrowserBase2(config) {
        if (config === void 0) {
          config = {};
        }
        return _super.call(this, config) || this;
      }
      OTLPProtoExporterBrowserBase2.prototype.send = function(objects, onSuccess, onError) {
        if (this._shutdownOnce.isCalled) {
          diag2.debug("Shutdown already started. Cannot send objects");
          return;
        }
        var serviceRequest = this.convert(objects);
        var exportRequestType = getExportRequestProto(this.getServiceClientType());
        var message = exportRequestType.create(serviceRequest);
        if (message) {
          var body = exportRequestType.encode(message).finish();
          if (body) {
            sendWithXhr(new Blob([body], { type: "application/x-protobuf" }), this.url, __assign6(__assign6({}, this._headers), { "Content-Type": "application/x-protobuf", Accept: "application/x-protobuf" }), this.timeoutMillis, onSuccess, onError);
          }
        } else {
          onError(new OTLPExporterError("No proto"));
        }
      };
      return OTLPProtoExporterBrowserBase2;
    }(OTLPExporterBrowserBase)
  );

  // node_modules/.pnpm/@opentelemetry+exporter-trace-otlp-proto@0.50.0_@opentelemetry+api@1.8.0/node_modules/@opentelemetry/exporter-trace-otlp-proto/build/esm/platform/browser/OTLPTraceExporter.js
  var __extends15 = /* @__PURE__ */ function() {
    var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    return function(d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  var DEFAULT_COLLECTOR_RESOURCE_PATH2 = "v1/traces";
  var DEFAULT_COLLECTOR_URL2 = "http://localhost:4318/" + DEFAULT_COLLECTOR_RESOURCE_PATH2;
  var OTLPTraceExporter = (
    /** @class */
    function(_super) {
      __extends15(OTLPTraceExporter2, _super);
      function OTLPTraceExporter2(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this, config) || this;
        _this._headers = Object.assign(_this._headers, utils_exports.parseKeyPairsIntoRecord(getEnv().OTEL_EXPORTER_OTLP_TRACES_HEADERS));
        return _this;
      }
      OTLPTraceExporter2.prototype.convert = function(spans) {
        return createExportTraceServiceRequest(spans);
      };
      OTLPTraceExporter2.prototype.getDefaultUrl = function(config) {
        return typeof config.url === "string" ? config.url : getEnv().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT.length > 0 ? appendRootPathToUrlIfNeeded(getEnv().OTEL_EXPORTER_OTLP_TRACES_ENDPOINT) : getEnv().OTEL_EXPORTER_OTLP_ENDPOINT.length > 0 ? appendResourcePathToUrl(getEnv().OTEL_EXPORTER_OTLP_ENDPOINT, DEFAULT_COLLECTOR_RESOURCE_PATH2) : DEFAULT_COLLECTOR_URL2;
      };
      OTLPTraceExporter2.prototype.getServiceClientType = function() {
        return ServiceClientType.SPANS;
      };
      return OTLPTraceExporter2;
    }(OTLPProtoExporterBrowserBase)
  );

  // node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 256).toString(16).slice(1));
  }
  function unsafeStringify(arr, offset = 0) {
    return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
  }

  // node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/native.js
  var randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
  var native_default = {
    randomUUID
  };

  // node_modules/.pnpm/uuid@9.0.1/node_modules/uuid/dist/esm-browser/v4.js
  function v4(options, buf, offset) {
    if (native_default.randomUUID && !buf && !options) {
      return native_default.randomUUID();
    }
    options = options || {};
    const rnds = options.random || (options.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = rnds[i];
      }
      return buf;
    }
    return unsafeStringify(rnds);
  }
  var v4_default = v4;

  // instrumentation.browser.ts
  var resource = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "next-app-browser",
    "session.instance.id": v4_default()
  });
  var traceExporter = new OTLPTraceExporter();
  var logExporter = new OTLPLogExporter();
  var tracerProvider = new WebTracerProvider({
    resource
  });
  tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
  tracerProvider.register({
    contextManager: new ZoneContextManager(),
    propagator: new CompositePropagator({
      propagators: [new W3CBaggagePropagator(), new W3CTraceContextPropagator()]
    })
  });
  var loggerProvider = new LoggerProvider({
    resource
  });
  loggerProvider.addLogRecordProcessor(new BatchLogRecordProcessor(logExporter));
  registerInstrumentations({
    tracerProvider,
    loggerProvider,
    instrumentations: [
      getWebAutoInstrumentations({
        "@opentelemetry/instrumentation-fetch": {
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
          applyCustomAttributesOnSpan(span) {
            span.setAttribute("app.synthetic_request", "false");
          }
        },
        "@opentelemetry/instrumentation-xml-http-request": {
          propagateTraceHeaderCorsUrls: /.*/,
          clearTimingResources: true,
          applyCustomAttributesOnSpan(span) {
            span.setAttribute("app.synthetic_request", "false");
          }
        }
      })
    ]
  });
})();
/*! Bundled license information:

zone.js/fesm2015/zone.js:
  (**
   * @license Angular v<unknown>
   * (c) 2010-2022 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
