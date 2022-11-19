import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecipesService } from "./recipes.service";
import { RecipesController } from "./recipes.controller";
import { Recipe } from "./entities/recipe.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule { }
