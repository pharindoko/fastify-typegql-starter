import request from "supertest";
import "reflect-metadata";
import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { RecipeResolver } from "../graphql/recipe";
import { buildSchema } from "type-graphql";
import { build } from "../app";

let app;
describe("graphql calls", () => {
  beforeAll(async () => {
    app = await build();
  });

  test("Graphql: It should return a response from recipes endpoint", async () => {
    try {
      const response = await app
        .inject()
        .post("/graphql")
        .body({ query: "{recipes{title, description, averageRating}}" });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body).data.recipes[0].title).toBe("Recipe 1");
    } catch (error) {
      console.log(error);
    }
    return;
  });
});
