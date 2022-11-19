import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipe } from "./entities/recipe.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
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

  async remove(id: string): Promise<void> {
    await this.recipesRepository.delete(id);
  }

  async saveAll(recipes: Recipe[]): Promise<Recipe[]> {
    const links = recipes.map((recipe) => recipe.link);
    const existingRecipes = await this.findByLinks(links);
    const existingLinks = existingRecipes.map((recipe) => recipe.link);
    const newRecipes = recipes.filter(
      (recipe) => !existingLinks.includes(recipe.link),
    );
    return this.recipesRepository.save(newRecipes);
  }
}
