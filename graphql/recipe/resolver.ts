// recipe.ts
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  Int,
} from "type-graphql";
import { createRecipeSamples } from "./recipe-samples";
import { Recipe, RecipeInput } from "./schema";

@Resolver((of) => Recipe)
export class RecipeResolver {
  private readonly items: Recipe[] = createRecipeSamples();

  @Query((returns) => Recipe, { nullable: true })
  async recipe(@Arg("title") title: string): Promise<Recipe | undefined> {
    return await this.items.find((recipe) => recipe.title === title);
  }

  @Query((returns) => [Recipe], {
    description: "Get all the recipes from around the world ",
  })
  async recipes(): Promise<Recipe[]> {
    return await this.items;
  }

  @Mutation((returns) => Recipe)
  async addRecipe(@Arg("recipe") recipeInput: RecipeInput): Promise<Recipe> {
    const recipe = Object.assign(new Recipe(), {
      description: recipeInput.description,
      title: recipeInput.title,
      ratings: recipeInput.ratings,
      creationDate: new Date(),
    });
    await this.items.push(recipe);
    return recipe;
  }

  @FieldResolver()
  ratingsCount(
    @Root() recipe: Recipe,
    @Arg("minRate", (type) => Int, { defaultValue: 0.0 }) minRate: number
  ): number {
    return recipe.ratings.filter((rating) => rating >= minRate).length;
  }
}
