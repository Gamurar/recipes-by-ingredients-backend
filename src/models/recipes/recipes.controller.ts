import { Controller, Get, Query } from "@nestjs/common";
import { RecipesService } from "./recipes.service";

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  @Get("recipes")
  getRecipes(@Query("ingredients") ingredients) {
    if (!ingredients) return [];
    return this.recipesService.findByIngredients(ingredients.split("|"));
  }
}
