import { prisma } from "../seed";

export default class MaterialPackageSeed {
  seed = async () => {
    const materialPackages = [
      // 🧂 All-Purpose Flour — 1 kg Bag
      {
        id: 1,
        materialId: 1,
        packageTypeId: 7, // Bag
        packageSizeId: 3, // 1 kg (size: 1, UOM: kg)
        sku: "FLR-BAG-1KG",
        barcode: "8901010000011",
        isActive: true,
      },

      // 🧀 Mozzarella Cheese — 500g Pouch
      {
        id: 2,
        materialId: 2,
        packageTypeId: 3, // Pouch
        packageSizeId: 2, // 500g (size: 500, UOM: g)
        sku: "CHS-POU-500G",
        barcode: "8901020000022",
        isActive: true,
      },

      // 🍅 Tomato Sauce — 1L Bottle
      {
        id: 3,
        materialId: 3,
        packageTypeId: 1, // Bottle
        packageSizeId: 6, // 1L (size: 1, UOM: L)
        sku: "SCE-BOT-1L",
        barcode: "8901030000033",
        isActive: true,
      },

      // 🫒 Olive Oil — 500mL Bottle
      {
        id: 4,
        materialId: 4,
        packageTypeId: 1, // Bottle
        packageSizeId: 5, // 500mL (size: 500, UOM: mL)
        sku: "OIL-BOT-500ML",
        barcode: "8901040000044",
        isActive: true,
      },

      // 🍞 Dry Yeast — 100g Pouch
      {
        id: 5,
        materialId: 5,
        packageTypeId: 3, // Pouch
        packageSizeId: 1, // 100g (size: 100, UOM: g)
        sku: "YST-POU-100G",
        barcode: "8901050000055",
        isActive: true,
      },

      // 🍬 Sugar — 1 kg Bag
      {
        id: 6,
        materialId: 6,
        packageTypeId: 7, // Bag
        packageSizeId: 3, // 1kg
        sku: "SGR-BAG-1KG",
        barcode: "8901060000066",
        isActive: true,
      },

      // 🧂 Salt — 500g Pouch
      {
        id: 7,
        materialId: 7,
        packageTypeId: 3, // Pouch
        packageSizeId: 2, // 500g
        sku: "SLT-POU-500G",
        barcode: "8901070000077",
        isActive: true,
      },

      // 💧 Water — 1L Bottle
      {
        id: 8,
        materialId: 8,
        packageTypeId: 1, // Bottle
        packageSizeId: 6, // 1L
        sku: "WTR-BOT-1L",
        barcode: "8901080000088",
        isActive: true,
      },

      // 🌶 Bell Pepper — 1 kg Bag
      {
        id: 9,
        materialId: 9,
        packageTypeId: 7, // Bag
        packageSizeId: 3, // 1kg
        sku: "VEG-BAG-1KG",
        barcode: "8901090000099",
        isActive: true,
      },

      // 🍖 Pepperoni — 1 kg Bag
      {
        id: 10,
        materialId: 10,
        packageTypeId: 7, // Bag
        packageSizeId: 3, // 1kg
        sku: "MTP-BAG-1KG",
        barcode: "8901100000101",
        isActive: true,
      },

      // 🌿 Oregano — Sachet (1 pc)
      {
        id: 11,
        materialId: 11,
        packageTypeId: 5, // Sachet
        packageSizeId: 7, // 1 piece
        sku: "HRB-SCH-1PC",
        barcode: "8901110000112",
        isActive: true,
      },
    ];

    for (const materialPackage of materialPackages) {
      const { id, ...data } = materialPackage;
      await prisma.materialPackage.upsert({
        where: { id: materialPackage.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${materialPackages.length} material packages`);
  };
}
