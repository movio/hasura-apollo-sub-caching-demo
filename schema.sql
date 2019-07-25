CREATE TABLE todos (
    pk bigserial PRIMARY KEY,
    title text,
    description text
);

INSERT INTO todos (title, description) VALUES ('learn GraphQL', 'go to https://graphql.org/learn/');
INSERT INTO todos (title, description) VALUES ('learn PostgreSQL', 'go to http://postgresql.org/docs/11/index.html');
INSERT INTO todos (title, description) VALUES ('learn Hasura GraphQL Engine', 'go to https://learn.hasura.io/');
INSERT INTO todos (title, description) VALUES ('profit!', 'go to https://en.wikipedia.org/wiki/Maldives');
