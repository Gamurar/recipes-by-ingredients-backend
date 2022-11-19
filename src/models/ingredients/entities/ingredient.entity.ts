import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Recipe } from "src/models/recipes/entities/recipe.entity";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
