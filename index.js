import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { ApolloProvider, Subscription } from "react-apollo";
import { WebSocketLink } from "apollo-link-ws";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    <div className="container" id="container">
      <Router>
        <Route path="/" exact component={Homepage} />
        <Route path="/todo/:id" component={Todo} />
      </Router>
    </div>
  </div>
);

function Homepage() {
  return <div>Hello World</div>;
}

function Todo() {
  return <div>Todo</div>;
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
