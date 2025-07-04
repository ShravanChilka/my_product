import { LocationType } from "@prisma/client";
import { prisma } from "../seed";

export default class LocationSeed {
  seed = async () => {
    const locations = [
      // 🏢 Top-level warehouse
      {
        id: 1,
        code: "WAR-0001",
        name: "Mumbai Central Warehouse",
        type: "warehouse",
        address: "Sewri, Mumbai",
        parentId: null, // Root node
      },

      // 🏪 Stores under Central Warehouse
      {
        id: 2,
        code: "STR-0002",
        name: "Mumbai Kitchen Store",
        type: "store",
        address: "Worli, Mumbai",
        parentId: 1, // Child of Central Warehouse
      },
      {
        id: 3,
        code: "STR-0003",
        name: "Mumbai Delivery Store",
        type: "store",
        address: "Dadar, Mumbai",
        parentId: 1, // Child of Central Warehouse
      },

      // 🧑‍🌾 Independent local vendors (top-level)
      {
        id: 4,
        code: "VEN-0004",
        name: "Mumbai Local Vendor A",
        type: "vendor",
        address: "Crawford Market, Mumbai",
        parentId: null, // Independent vendor
      },
      {
        id: 5,
        code: "VEN-0005",
        name: "Mumbai Local Vendor B",
        type: "vendor",
        address: "Byculla Market, Mumbai",
        parentId: null, // Independent vendor
      },

      // 📦 Bins within Central Warehouse
      {
        id: 6,
        code: "BIN-0006",
        name: "Bin A - Ingredients",
        type: "bin",
        address: "Section A - Central Warehouse",
        parentId: 1, // Bin inside WAR-0001
      },
      {
        id: 7,
        code: "BIN-0007",
        name: "Bin B - Packaging",
        type: "bin",
        address: "Section B - Central Warehouse",
        parentId: 1, // Bin inside WAR-0001
      },

      // 🧊 Separate cold storage warehouse
      {
        id: 8,
        code: "WAR-0008",
        name: "Mumbai Cold Storage",
        type: "warehouse",
        address: "Taloja, Mumbai",
        parentId: null, // Independent warehouse
      },

      // ❄️ Bins inside Cold Storage
      {
        id: 9,
        code: "BIN-0009",
        name: "Bin C - Dairy",
        type: "bin",
        address: "Cold Storage - Dairy Zone",
        parentId: 8, // Bin inside WAR-0008
      },
      {
        id: 10,
        code: "BIN-0010",
        name: "Bin D - Meat",
        type: "bin",
        address: "Cold Storage - Meat Zone",
        parentId: 8, // Bin inside WAR-0008
      },
    ];

    for (const location of locations) {
      const { id, ...data } = location;
      await prisma.location.upsert({
        where: { id: location.id },
        create: { ...data, type: data.type as LocationType },
        update: { ...data, type: data.type as LocationType },
      });
    }
    console.log(`Inserted ${locations.length} locations`);
  };
}
