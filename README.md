This repo demonstrates an issue with caching subscriptions in Apollo React 2.5.8.

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

The demo has two page, a home page and a todo page. When goin going from the home page to the todo page and back, the expected behavior is not have a render with "loading=true".
