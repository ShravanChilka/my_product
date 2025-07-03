import { prisma } from "../seed";

class MaterialSeed {
  seed = async () => {
    const materials = [
      {
        id: 1,
        name: "All-Purpose Flour",
        sku: "FLR-001",
        description: "Used for pizza dough",
        unitsOfMeasureId: 1, // Kilogram
        categoryId: 4, // Base
        brandId: 1, // Pillsbury
      },
      {
        id: 2,
        name: "Mozzarella Cheese",
        sku: "CHS-001",
        description: "Shredded cheese topping",
        unitsOfMeasureId: 1, // Kilogram
        categoryId: 13, // Dairy
        brandId: 2, // Amul
      },
      {
        id: 3,
        name: "Tomato Sauce",
        sku: "SCE-001",
        description: "Base sauce for pizza",
        unitsOfMeasureId: 3, // Liter
        categoryId: 5, // Sauce
        brandId: 3, // Heinz
      },
      {
        id: 4,
        name: "Olive Oil",
        sku: "OIL-001",
        description: "Used in dough and sauce",
        unitsOfMeasureId: 3, // Liter
        categoryId: 11, // Oils
        brandId: 4, // Borges
      },
      {
        id: 5,
        name: "Dry Yeast",
        sku: "YST-001",
        description: "Leavening agent for pizza dough",
        unitsOfMeasureId: 2, // Gram
        categoryId: 10, // Additives
        brandId: 5, // Weikfield
      },
      {
        id: 6,
        name: "Sugar",
        sku: "SGR-001",
        description: "Used in dough and sauce",
        unitsOfMeasureId: 2, // Gram
        categoryId: 10, // Additives
        brandId: 6, // Dhampure
      },
      {
        id: 7,
        name: "Salt",
        sku: "SLT-001",
        description: "Flavor enhancer",
        unitsOfMeasureId: 2, // Gram
        categoryId: 10, // Additives
        brandId: 7, // Catch
      },
      {
        id: 8,
        name: "Water",
        sku: "WTR-001",
        description: "Used for dough mixing",
        unitsOfMeasureId: 3, // Liter
        categoryId: 12, // Liquids
        brandId: 8, // Bisleri
      },
      {
        id: 9,
        name: "Bell Pepper",
        sku: "VEG-001",
        description: "Topping for pizzas",
        unitsOfMeasureId: 1, // Kilogram
        categoryId: 7, // Vegetables
        brandId: 9, // Fresho
      },
      {
        id: 10,
        name: "Pepperoni",
        sku: "MTP-001",
        description: "Meat topping for pizzas",
        unitsOfMeasureId: 1, // Kilogram
        categoryId: 8, // Meat
        brandId: 10, // Licious
      },
      {
        id: 11,
        name: "Oregano",
        sku: "HRB-001",
        description: "Dried herb seasoning",
        unitsOfMeasureId: 2, // Gram
        categoryId: 9, // Herbs
        brandId: 11, // Keya
      },
    ];

    for (const material of materials) {
      const { id, ...data } = material;
      await prisma.material.upsert({
        where: { id: material.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${materials.length} materials`);
  };
}

export default MaterialSeed;
