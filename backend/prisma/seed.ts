import { PrismaClient } from "@prisma/client";
import UnitsOfMeasureSeed from "./data/units_of_measure.seed";
import UserSeed from "./data/user.seed";
import CategorySeed from "./data/category.seed";
import MaterialSeed from "./data/material.seed";
import BrandSeed from "./data/brand.seed";

export const prisma = new PrismaClient();

class Seed {
  async run() {
    try {
      await new UserSeed().seed();
      await new UnitsOfMeasureSeed().seed();
      await new CategorySeed().seed();
      await new BrandSeed().seed();
      await new MaterialSeed().seed();
    } catch (error) {
      console.error("Error during seeding:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

new Seed().run();
