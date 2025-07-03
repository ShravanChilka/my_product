import { prisma } from "../seed";

class CategorySeed {
  seed = async () => {
    const categories = [
      { id: 1, name: "Ingredients", parentId: null },
      { id: 2, name: "Packaging", parentId: null },
      { id: 3, name: "Kitchen Supplies", parentId: null },
      { id: 4, name: "Base", parentId: 1 },
      { id: 5, name: "Sauce", parentId: 1 },
      { id: 6, name: "Cheese", parentId: 1 },
      { id: 7, name: "Vegetables", parentId: 1 },
      { id: 8, name: "Meat", parentId: 1 },
      { id: 9, name: "Herbs", parentId: 1 },
      { id: 10, name: "Additives", parentId: 1 },
      { id: 11, name: "Oils", parentId: 1 },
      { id: 12, name: "Liquids", parentId: 1 },
      { id: 13, name: "Dairy", parentId: 1 },
    ];

    for (const category of categories) {
      const { id, ...data } = category;
      await prisma.category.upsert({
        where: { id: category.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${categories.length} categories`);
  };
}

export default CategorySeed;
