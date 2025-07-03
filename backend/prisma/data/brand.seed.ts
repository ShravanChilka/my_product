import { prisma } from "../seed";

class BrandSeed {
  seed = async () => {
    const brands = [
      {
        id: 1,
        name: "Pillsbury",
        description: "Trusted baking brand for flour and dough products.",
        logoURL: "https://example.com/logos/pillsbury.png", // All-Purpose Flour
      },
      {
        id: 2,
        name: "Amul",
        description: "India's leading dairy brand, known for quality cheese.",
        logoURL: "https://example.com/logos/amul.png", // Mozzarella Cheese
      },
      {
        id: 3,
        name: "Heinz",
        description: "Classic tomato sauces and condiments.",
        logoURL: "https://example.com/logos/heinz.png", // Tomato Sauce
      },
      {
        id: 4,
        name: "Borges",
        description: "Premium olive oil brand from Spain.",
        logoURL: "https://example.com/logos/borges.png", // Olive Oil
      },
      {
        id: 5,
        name: "Weikfield",
        description: "Indian brand for baking ingredients like yeast.",
        logoURL: "https://example.com/logos/weikfield.png", // Dry Yeast
      },
      {
        id: 6,
        name: "Dhampure",
        description: "Pure and refined sugar producer.",
        logoURL: "https://example.com/logos/dhampure.png", // Sugar
      },
      {
        id: 7,
        name: "Catch",
        description: "Well-known Indian brand for salt and spices.",
        logoURL: "https://example.com/logos/catch.png", // Salt
      },
      {
        id: 8,
        name: "Bisleri",
        description: "Popular bottled water brand in India.",
        logoURL: "https://example.com/logos/bisleri.png", // Water
      },
      {
        id: 9,
        name: "Fresho",
        description: "Fresh farm produce brand by BigBasket.",
        logoURL: "https://example.com/logos/fresho.png", // Bell Pepper
      },
      {
        id: 10,
        name: "Licious",
        description: "Premium brand for processed meat products.",
        logoURL: "https://example.com/logos/licious.png", // Pepperoni
      },

      {
        id: 11,
        name: "Keya",
        description: "Premium herbs and seasoning products.",
        logoURL: "https://example.com/logos/keya.png", // Oregano
      },
    ];

    for (const brand of brands) {
      const { id, ...data } = brand;
      await prisma.brand.upsert({
        where: { id: brand.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${brands.length} brands`);
  };
}

export default BrandSeed;
