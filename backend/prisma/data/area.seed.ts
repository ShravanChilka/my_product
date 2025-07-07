import { prisma } from "../seed";

export default class AreaSeed {
  seed = async () => {
    const areas = [
      { id: 1, name: "Sewri", cityId: 1 },
      { id: 2, name: "Worli", cityId: 1 },
      { id: 3, name: "Dadar", cityId: 1 },
      { id: 4, name: "Crawford Market", cityId: 1 },
      { id: 5, name: "Byculla", cityId: 1 },
      { id: 6, name: "Taloja", cityId: 1 },
    ];

    for (const area of areas) {
      const { id, ...data } = area;
      await prisma.area.upsert({
        where: { id: area.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${areas.length} areas`);
  };
}
