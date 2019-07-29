This repo demonstrates an issue with caching subscriptions in Apollo React 2.5.8.

# Requirements

* `npm` 
* `docker-compose`
* `hasura` (Hasura CLI: see https://docs.hasura.io/1.0/graphql/manual/hasura-cli/install-hasura-cli.html)

# How To Run

```
docker-compose up -d
cd hasura
hasura metadata apply
cd ..
npm install
npm start
```

Then point your browser at http://localhost:1234

# What is the issue ?

The demo has two pages, a home page and a todo page. When going from the home page to the todo page and back, the expected behaviour is not to have a render with "loading=true".
