import { prisma } from "../seed";

export default class PostalCodeSeed {
  seed = async () => {
    const postalCodes = [
      { id: 1, code: "400015", areaId: 1 }, // Sewri
      { id: 2, code: "400018", areaId: 2 }, // Worli
      { id: 3, code: "400028", areaId: 3 }, // Dadar
      { id: 4, code: "400003", areaId: 4 }, // Crawford Market
      { id: 5, code: "400008", areaId: 5 }, // Byculla
      { id: 6, code: "410208", areaId: 6 }, // Taloja
    ];

    for (const postalCode of postalCodes) {
      const { id, ...data } = postalCode;
      await prisma.postalCode.upsert({
        where: { id: postalCode.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${postalCodes.length} postalCodes`);
  };
}
