import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Ingredient } from "../../ingredients/entities/ingredient.entity";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ nullable: true, default: null })
  description?: string;

  @Column({ nullable: true, default: null, unique: true })
  link: string;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients?: Ingredient[];
}
