import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipesService } from "./recipes.service";
import { RecipesController } from "./recipes.controller";
import { Recipe } from "./entities/recipe.entity";
import { Ingredient } from "../ingredients/entities/ingredient.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient])],
  providers: [RecipesService],
  controllers: [RecipesController],
  exports: [RecipesService],
})
export class RecipesModule {}
