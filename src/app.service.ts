import { Logger, Injectable } from "@nestjs/common";
import puppeteer from "puppeteer";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return "Hello World!";
  }

  async getGoodbye() {
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
    const promises = [];

    links.forEach(async (link) => {
      await page.goto(link);
      console.log("goto ", link);
      const title = await this.findRecipeTitle(page);
      console.log("title ", title);
      titles.push(title);
    });

    await browser.close();

    return titles;

    // return page.content();
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
