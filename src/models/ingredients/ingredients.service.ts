import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ingredient } from "../ingredients/entities/ingredient.entity";

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  findAll(): Promise<Ingredient[]> {
    return this.ingredientsRepository.find();
  }

  findOne(id: number): Promise<Ingredient> {
    return this.ingredientsRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.ingredientsRepository.delete(id);
  }

  async findAllUnique(): Promise<string[]> {
    const ingredients = await this.ingredientsRepository.find();
    const ingredientsArr = ingredients.map((ingredient) => ingredient.name);
    return [...new Set(ingredientsArr)];
  }
}
