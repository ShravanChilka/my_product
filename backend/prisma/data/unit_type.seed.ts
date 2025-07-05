import { prisma } from "../seed";

export default class UnitTypeSeed {
  seed = async () => {
    const unitTypes = [
      {
        id: 1,
        name: "Bottle",
        description: "Cylindrical container, often plastic or glass",
      },
      { id: 2, name: "Can", description: "Metal container, usually sealed" },
      { id: 3, name: "Pouch", description: "Flexible plastic or foil package" },
      {
        id: 4,
        name: "Jar",
        description: "Wide-mouthed container, usually glass or plastic",
      },
      {
        id: 5,
        name: "Sachet",
        description: "Small, single-use sealed package",
      },
      {
        id: 6,
        name: "Box",
        description: "Cardboard or rigid square container",
      },
      {
        id: 7,
        name: "Bag",
        description: "Flexible container, often paper or plastic",
      },
      {
        id: 8,
        name: "Tub",
        description: "Short, wide container often with a lid",
      },
      { id: 9, name: "Packet", description: "Flat, sealed package" },
      { id: 10, name: "Drum", description: "Large cylindrical bulk container" },
      {
        id: 11,
        name: "Carton",
        description: "Folded box used for liquids like milk or juice",
      },
      {
        id: 12,
        name: "Tray",
        description: "Shallow container for perishables or meat",
      },
      {
        id: 13,
        name: "Roll",
        description: "Cylindrical wrap of material like foil or paper",
      },
      { id: 14, name: "Wrap", description: "Plastic film used to wrap items" },
      {
        id: 15,
        name: "Blister Pack",
        description: "Individual sealed units in plastic and foil",
      },
      {
        id: 16,
        name: "Tetra Pak",
        description: "Aseptic packaging for liquids",
      },
      {
        id: 17,
        name: "Dispenser",
        description: "Packaging with pouring or pump feature",
      },
      {
        id: 18,
        name: "Bucket",
        description: "Large plastic container with handle and lid",
      },
      { id: 19, name: "Sleeve", description: "Cardboard wrap around product" },
      {
        id: 20,
        name: "Strip",
        description: "Individual units in a row, like chewing gum",
      },
    ];

    for (const unitType of unitTypes) {
      const { id, ...data } = unitType;
      await prisma.unitType.upsert({
        where: { id: unitType.id },
        create: data,
        update: data,
      });
    }
  };
}
