import { Logger, Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { IngredientDto } from "./models/ingredients/entities/ingredient.dto";
import { RecipeDto } from "./models/recipes/entities/recipe.dto";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return "Hello World!";
  }

  async getRecipes(): Promise<RecipeDto[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://natashaskitchen.com/category/dessert/cookies/");

    const links = await this.findRecipeLinks(page);
    const recipes: RecipeDto[] = [];

    for (const link of links) {
      try {
        await page.goto(link);
        console.log("goto ", link);
        const info = await this.findRecipeInfo(page);
        recipes.push({
          name: info.title.slice(0, 255),
          description: info.description.slice(0, 255),
          ingredients: info.ingredients,
          link,
          imageUrl: info.imageUrl,
        });
        console.log("recipe: ", {
          name: info.title,
          description: info.description,
          ingredients: info.ingredients,
          link,
          imageUrl: info.imageUrl,
        });
      } catch (e) {
        console.log("error: ", e);
      }
    }

    await browser.close();

    return recipes;
  }

  async findRecipeLinks(page): Promise<string[]> {
    const resultsSelector = ".page ul > li > .li-a > a";
    await page.waitForSelector(resultsSelector);

    return page.evaluate((resultsSelector) => {
      return [...document.querySelectorAll(resultsSelector)].map((item) => {
        return item.getAttribute("href");
      });
    }, resultsSelector);
  }

  async findRecipeInfo(page): Promise<any> {
    await page.waitForSelector(
      ".wprm-recipe-name, .wprm-recipe-summary, .wprm-recipe-ingredient",
    );
    return page.evaluate(() => {
      const title = _extractInnerText(document, ".wprm-recipe-name");
      const description = _extractInnerText(document, ".wprm-recipe-summary");
      const ingredients = _extractIngredients();
      const imageUrl = (document.querySelector(".post img") as HTMLImageElement)
        ?.src;
      return {
        title,
        description,
        ingredients,
        imageUrl,
      };

      function _extractIngredients(): IngredientDto[] {
        const ingredients: IngredientDto[] = [];
        const ingredientNodes = document.querySelectorAll(
          ".wprm-recipe-ingredient",
        );
        for (const ingredientNode of ingredientNodes) {
          const amount = _extractInnerText(
            ingredientNode,
            ".wprm-recipe-ingredient-amount",
          );
          const unit = _extractInnerText(
            ingredientNode,
            ".wprm-recipe-ingredient-unit",
          );
          const name = _extractInnerText(
            ingredientNode,
            ".wprm-recipe-ingredient-name",
          );
          ingredients.push({
            name,
            unit,
            amount,
          });
        }

        return ingredients;
      }

      function _extractInnerText(parent: Element | Document, selector: string) {
        return parent.querySelector<HTMLElement>(selector)?.innerText;
      }
    });
  }
}
