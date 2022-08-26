# NextJS Floyd Shop

To run locally you need the DB

```
docker-compose up -d
```

- The url of the local DB

```
mongodb://localhost:27017/floyddb
```

## Configure the environment variables

Rename .env.template to .env

## Populate DB with initial data

Call to

```
http://localhost:3000/api/seed
```
