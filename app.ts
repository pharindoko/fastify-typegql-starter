// index.ts
import "reflect-metadata";
import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { RecipeResolver } from "./graphql/recipe";
import { buildSchema } from "type-graphql";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";

export async function build() {
  // build TypeGraphQL executable schema
  const app = fastify();

  const schema = await buildSchema({
    resolvers: [RecipeResolver],
    emitSchemaFile: true,
  });

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });
  await apolloServer.start();
  app.register(apolloServer.createHandler());
  return app;
}
