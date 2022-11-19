import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Recipe } from "src/models/recipes/entities/recipe.entity";

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  amount: string;

  @Column({ nullable: true, default: null })
  unit: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;
}
