import { Controller, Get } from "@nestjs/common";
import { IngredientsService } from "./ingredients.service";

@Controller()
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}
  @Get("ingredients")
  getIngredients() {
    return this.ingredientsService.findAllUnique();
  }
}
