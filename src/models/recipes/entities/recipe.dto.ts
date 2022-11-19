import { IngredientDto } from "src/models/ingredients/entities/ingredient.dto";

export class RecipeDto {
  id?: number;

  name: string;

  description?: string;

  link: string;

  ingredients?: IngredientDto[];

  imageUrl?: string;
}
