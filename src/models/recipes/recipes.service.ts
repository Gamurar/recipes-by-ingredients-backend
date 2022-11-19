import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Recipe } from "./entities/recipe.entity";

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private usersRepository: Repository<Recipe>,
  ) {}

  findAll(): Promise<Recipe[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Recipe> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
