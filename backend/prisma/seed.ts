import { PrismaClient } from "@prisma/client";
import UnitOfMeasureSeed from "./data/unit_of_measure.seed";
import UserSeed from "./data/user.seed";
import MaterialCategorySeed from "./data/material_category.seed";
import MaterialSeed from "./data/material.seed";
import MaterialBrandSeed from "./data/material_brand.seed";
import LocationSeed from "./data/location.seed";
import InventorySeed from "./data/inventory.seed";
import PackageTypeSeed from "./data/package_type.seed";
import PackageSizeSeed from "./data/package_size.seed";
import MaterialPackageSeed from "./data/material_package.seed";
import CountrySeed from "./data/country.seed";
import PostalCodeSeed from "./data/postal_code.seed";
import StateSeed from "./data/state.seed";
import CitySeed from "./data/city.seed";
import AreaSeed from "./data/area.seed";

export const prisma = new PrismaClient();

class Seed {
  async run() {
    try {
      await new UserSeed().seed();
      await new UnitOfMeasureSeed().seed();
      await new MaterialCategorySeed().seed();
      await new MaterialBrandSeed().seed();
      await new MaterialSeed().seed();
      await new PackageTypeSeed().seed();
      await new PackageSizeSeed().seed();
      await new MaterialPackageSeed().seed();
      await new CountrySeed().seed();
      await new StateSeed().seed();
      await new CitySeed().seed();
      await new AreaSeed().seed();
      await new PostalCodeSeed().seed();
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
