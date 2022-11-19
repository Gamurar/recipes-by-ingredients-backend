import { Logger, Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";
import { Recipe } from "./models/recipes/entities/recipe.entity";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return "Hello World!";
  }

  async getRecipes(): Promise<Recipe[]> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://natashaskitchen.com/category/dessert/cookies/");

    const resultsSelector = ".page ul > li > .li-a > a";
    await page.waitForSelector(resultsSelector);

    const links = await page.evaluate((resultsSelector) => {
      return [...document.querySelectorAll(resultsSelector)].map((item) => {
        return item.getAttribute("href");
      });
    }, resultsSelector);

    const titles = [];

    const recipes: Recipe[] = [];

    for (const link of links.slice(0, 5)) {
      await page.goto(link);
      console.log("goto ", link);
      const title = await this.findRecipeTitle(page);
      if (/video/i.test(title)) {
        continue;
      }
      recipes.push({
        name: title,
        link,
      });
      console.log("recipe: ", {
        name: title,
        link,
      });
      titles.push(title);
    }

    await browser.close();

    return recipes;
  }

  async findRecipeTitle(page): Promise<string> {
    const titleSelector = ".title";
    await page.waitForSelector(titleSelector);
    const title = await page.evaluate((titleSelector) => {
      return document.querySelector(titleSelector).textContent;
    }, titleSelector);
    return title;
  }
}
