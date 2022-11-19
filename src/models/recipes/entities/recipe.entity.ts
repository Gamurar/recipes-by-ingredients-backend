import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ingredient } from "../../ingredients/entities/ingredient.entity";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unique: true })
  link: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];
}
