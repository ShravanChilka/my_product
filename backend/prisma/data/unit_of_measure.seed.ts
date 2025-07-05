import { prisma } from "../seed";

class UnitOfMeasureSeed {
  seed = async () => {
    const units = [
      { id: 1, name: "Kilogram", abbreviation: "kg" },
      { id: 2, name: "Gram", abbreviation: "g" },
      { id: 3, name: "Liter", abbreviation: "L" },
      { id: 4, name: "Milliliter", abbreviation: "mL" },
      { id: 5, name: "Piece", abbreviation: "pc" },
      { id: 6, name: "Dozen", abbreviation: "dz" },
      { id: 7, name: "Meter", abbreviation: "m" },
      { id: 8, name: "Centimeter", abbreviation: "cm" },
      { id: 9, name: "Box", abbreviation: "box" },
      { id: 10, name: "Packet", abbreviation: "pkt" },
    ];

    for (const unit of units) {
      const { id, ...data } = unit;
      await prisma.unitOfMeasure.upsert({
        where: { id: unit.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${units.length} units of measure`);
  };
}

export default UnitOfMeasureSeed;
