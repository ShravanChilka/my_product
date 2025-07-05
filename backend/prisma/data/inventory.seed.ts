import { prisma } from "../seed";

export default class InventorySeed {
  seed = async () => {
    const inventories = [
      // Central Warehouse (WAR-0001)
      {
        id: 1,
        materialPackageId: 1,
        locationId: 1,
        quantity: 500,
        reservedQuantity: 50,
        thresholdQuantity: 100,
      }, // All-Purpose Flour
      {
        id: 2,
        materialPackageId: 3,
        locationId: 1,
        quantity: 300,
        reservedQuantity: 20,
        thresholdQuantity: 80,
      }, // Tomato Sauce
      {
        id: 3,
        materialPackageId: 5,
        locationId: 1,
        quantity: 1000,
        reservedQuantity: 100,
        thresholdQuantity: 200,
      }, // Dry Yeast

      // Bin A - Ingredients (BIN-0006)
      {
        id: 4,
        materialPackageId: 6,
        locationId: 6,
        quantity: 800,
        reservedQuantity: 60,
        thresholdQuantity: 150,
      }, // Sugar
      {
        id: 5,
        materialPackageId: 7,
        locationId: 6,
        quantity: 1000,
        reservedQuantity: 80,
        thresholdQuantity: 200,
      }, // Salt

      // Bin B - Packaging (BIN-0007)
      {
        id: 6,
        materialPackageId: 11,
        locationId: 7,
        quantity: 300,
        reservedQuantity: 10,
        thresholdQuantity: 50,
      }, // Oregano

      // Kitchen Store (STR-0002)
      {
        id: 7,
        materialPackageId: 2,
        locationId: 2,
        quantity: 150,
        reservedQuantity: 20,
        thresholdQuantity: 50,
      }, // Mozzarella Cheese
      {
        id: 8,
        materialPackageId: 8,
        locationId: 2,
        quantity: 200,
        reservedQuantity: 25,
        thresholdQuantity: 70,
      }, // Water

      // Delivery Store (STR-0003)
      {
        id: 9,
        materialPackageId: 9,
        locationId: 3,
        quantity: 120,
        reservedQuantity: 10,
        thresholdQuantity: 30,
      }, // Bell Pepper
      {
        id: 10,
        materialPackageId: 10,
        locationId: 3,
        quantity: 180,
        reservedQuantity: 15,
        thresholdQuantity: 40,
      }, // Pepperoni

      // Cold Storage (WAR-0008)
      {
        id: 11,
        materialPackageId: 2,
        locationId: 8,
        quantity: 100,
        reservedQuantity: 5,
        thresholdQuantity: 40,
      }, // Mozzarella Cheese

      // Bin C - Dairy (BIN-0009)
      {
        id: 12,
        materialPackageId: 2,
        locationId: 9,
        quantity: 200,
        reservedQuantity: 30,
        thresholdQuantity: 60,
      }, // Mozzarella Cheese

      // Bin D - Meat (BIN-0010)
      {
        id: 13,
        materialPackageId: 10,
        locationId: 10,
        quantity: 250,
        reservedQuantity: 20,
        thresholdQuantity: 70,
      }, // Pepperoni
    ];

    for (const inventory of inventories) {
      const { id, ...data } = inventory;
      await prisma.inventory.upsert({
        where: { id: inventory.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${inventories.length} inventories`);
  };
}
