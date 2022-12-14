import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Recipe } from "./models/recipes/entities/recipe.entity";
import { Ingredient } from "./models/ingredients/entities/ingredient.entity";
import { RecipesModule } from "./models/recipes/recipes.module";
import { IngredientsModule } from "./models/ingredients/ingredients.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "young20",
      database: "recipes",
      entities: [Recipe, Ingredient],
      synchronize: true,
    }),
    RecipesModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
