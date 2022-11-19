import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ingredient } from "./entities/ingredient.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
})
export class IngredientsModule {}
