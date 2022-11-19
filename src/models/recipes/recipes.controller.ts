import { Controller, Get } from "@nestjs/common";
import { RecipesService } from "./recipes.service";

@Controller()
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}
  @Get("test")
  getTest() {
    const links = [
      "https://natashaskitchen.com/pumpkin-cookies/",
      "https://natashaskitchen.com/oatmeal-raisin-cookies/",
      "https://natashaskitchen.com/dsdfsf/",
    ];
    return this.recipesService.findByLinks(links);
  }
}
