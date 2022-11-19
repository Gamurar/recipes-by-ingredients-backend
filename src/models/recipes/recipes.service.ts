import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ingredient } from "../ingredients/entities/ingredient.entity";
import { RecipeDto } from "./entities/recipe.dto";
import { Recipe } from "./entities/recipe.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find();
  }

  findOne(id: number): Promise<Recipe> {
    return this.recipesRepository.findOneBy({ id });
  }

  findByLinks(links: string[]): Promise<Recipe[]> {
    const whereOrQuery = links.map((link) => ({
      link,
    }));
    return this.recipesRepository.find({
      where: whereOrQuery,
    });
  }

  findByIngredients(ingredients: string[]) {
    const OrQuery = ingredients.map((ingredient) => ({
      name: ingredient,
    }));
    return this.recipesRepository.find({
      relations: {
        ingredients: true,
      },
      where: {
        ingredients: OrQuery,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await this.recipesRepository.delete(id);
  }

  async saveAll(recipes: RecipeDto[]): Promise<string> {
    const links = recipes.map((recipe) => recipe.link);
    const existingRecipes = await this.findByLinks(links);
    const existingLinks = existingRecipes.map((recipe) => recipe.link);
    const newRecipes = recipes.filter(
      (recipe) => !existingLinks.includes(recipe.link),
    );

    for (const newRecipe of newRecipes) {
      const savedRecipe = await this.recipesRepository.save(newRecipe);
      for (const ingredient of savedRecipe.ingredients) {
        ingredient.recipe = savedRecipe;
        await this.ingredientsRepository.save(ingredient);
      }
    }
    return "Saved!";
  }
}
