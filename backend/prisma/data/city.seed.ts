import { prisma } from "../seed";

export default class CitySeed {
  seed = async () => {
    const cities = [
      {
        id: 1,
        name: "Mumbai",
        stateId: 1,
      },
    ];

    for (const city of cities) {
      const { id, ...data } = city;
      await prisma.city.upsert({
        where: { id: city.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${cities.length} cities`);
  };
}
