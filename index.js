import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { ApolloProvider, Subscription } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: new WebSocketLink({
    uri: "ws://localhost:8080/v1/graphql",
    options: {
      reconnect: true
    }
  })
});

const App = () => (
  <div>
    <Router>
      <Route path="/" exact component={Homepage} />
      <Route path="/todo/:id" component={Todo} />
    </Router>
  </div>
);

const todoListSubscription = gql`
  subscription todos {
    todos {
      pk
      title
    }
  }
`;

function Homepage() {
  return (
    <Subscription subscription={todoListSubscription}>
      {({ loading, error, data }) => {
        console.log("loading is", loading);
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {JSON.stringify(error, null, 4)}</div>;
        return (
          <ul>
            {data.todos.map(todo => (
              <li key={todo.pk}>
                <Link to={`/todo/${todo.pk}`}>{todo.title}</Link>
              </li>
            ))}
          </ul>
        );
      }}
    </Subscription>
  );
}

const todoSubscription = gql`
  subscription todo($pk: bigint) {
    todos(where: { pk: { _eq: $pk } }) {
      title
      description
    }
  }
`;

function Todo({ match }) {
  return (
    <Subscription subscription={todoSubscription} variables={{ pk: match.params.id }}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {JSON.stringify(error, null, 4)}</div>;
        if (data.todos.length !== 1) return <div>not found</div>;
        return (
          <div>
            <h1>{data.todos[0].title}</h1>
            <p>{data.todos[0].description}</p>
          </div>
        );
      }}
    </Subscription>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
