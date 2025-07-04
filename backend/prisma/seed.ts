import { PrismaClient } from "@prisma/client";
import UnitsOfMeasureSeed from "./data/units_of_measure.seed";
import UserSeed from "./data/user.seed";
import MaterialCategorySeed from "./data/material_category.seed";
import MaterialSeed from "./data/material.seed";
import MaterialBrandSeed from "./data/material_brand.seed";
import LocationSeed from "./data/location.seed";
import InventorySeed from "./data/inventory.seed";

export const prisma = new PrismaClient();

class Seed {
  async run() {
    try {
      await new UserSeed().seed();
      await new UnitsOfMeasureSeed().seed();
      await new MaterialCategorySeed().seed();
      await new MaterialBrandSeed().seed();
      await new MaterialSeed().seed();
      await new LocationSeed().seed();
      await new InventorySeed().seed();
    } catch (error) {
      console.error("Error during seeding:", error);
    } finally {
      await prisma.$disconnect();
    }
  }
}

new Seed().run();
