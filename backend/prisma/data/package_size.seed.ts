import { prisma } from "../seed";

export default class PackageSizeSeed {
  seed = async () => {
    const packageSizes = [
      // 🔢 Weight-based (Gram to Kilogram)
      {
        id: 1,
        size: 100,
        unitOfMeasureId: 2, // Gram
        baseUnitOfMeasureId: 1, // Kilogram
        conversionFactor: 0.1, // 100g = 0.1kg
      },
      {
        id: 2,
        size: 500,
        unitOfMeasureId: 2,
        baseUnitOfMeasureId: 1,
        conversionFactor: 0.5,
      },
      {
        id: 3,
        size: 1,
        unitOfMeasureId: 1, // Kilogram
        baseUnitOfMeasureId: 1,
        conversionFactor: 1,
      },

      // 💧 Volume-based (Milliliter to Liter)
      {
        id: 4,
        size: 250,
        unitOfMeasureId: 4, // mL
        baseUnitOfMeasureId: 3, // Liter
        conversionFactor: 0.25,
      },
      {
        id: 5,
        size: 500,
        unitOfMeasureId: 4,
        baseUnitOfMeasureId: 3,
        conversionFactor: 0.5,
      },
      {
        id: 6,
        size: 1,
        unitOfMeasureId: 3, // Liter
        baseUnitOfMeasureId: 3,
        conversionFactor: 1,
      },

      // 🔢 Count-based
      {
        id: 7,
        size: 1,
        unitOfMeasureId: 5, // Piece
        baseUnitOfMeasureId: 5,
        conversionFactor: 1,
      },
      {
        id: 8,
        size: 1,
        unitOfMeasureId: 6, // Dozen
        baseUnitOfMeasureId: 5, // Base = Piece
        conversionFactor: 12,
      },

      // 📏 Length-based
      {
        id: 9,
        size: 100,
        unitOfMeasureId: 8, // cm
        baseUnitOfMeasureId: 7, // m
        conversionFactor: 1, // 100 cm = 1 m
      },
      {
        id: 10,
        size: 1,
        unitOfMeasureId: 7, // m
        baseUnitOfMeasureId: 7,
        conversionFactor: 1,
      },

      // 📦 Prepackaged countable units
      {
        id: 11,
        size: 1,
        unitOfMeasureId: 9, // Box
        baseUnitOfMeasureId: 5, // Base = Piece
        conversionFactor: 24, // e.g., 1 box = 24 pcs
      },
      {
        id: 12,
        size: 1,
        unitOfMeasureId: 10, // Packet
        baseUnitOfMeasureId: 5,
        conversionFactor: 6, // e.g., 1 packet = 6 pcs
      },
    ];

    for (const packageSize of packageSizes) {
      const { id, ...data } = packageSize;
      await prisma.packageSize.upsert({
        where: { id: packageSize.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${packageSizes.length} package sizes`);
  };
}
