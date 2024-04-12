<div align="center">
  <a href="https://devopscycle.com/">
    <img src="./docs/assets/devopscycle.png" width="500" />
  </a>

  <h1>Enhancing React Ecosystems with Observability</h1>
  <p>
    <b>A ReactSummit 2024 talk</b>
  </p>
  <br>
  <br>
  <br>
</div>

## Usage

> **Note:** make sure you have installed [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

```sh
$ docker compose up
```

After a successful run following services are available:

- [NextJS application](http://localhost:3000/)

## Restart on demand

If you want to get rid of the NextJS cache run following:

```sh
# delete the actual cache directory
$ rm -rf docker-next-cache
# restart the service to also get rid of the in memory cache
$ docker compose restart next
```

To remove the data inside Jaeger you just need to restart it:

```sh
$ docker compose restart jaeger
```
