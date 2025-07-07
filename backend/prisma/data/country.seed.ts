import { prisma } from "../seed";

export default class CountrySeed {
  seed = async () => {
    const countries = [
      {
        id: 1,
        name: "India",
        code: "IN",
      },
    ];
    for (const country of countries) {
      const { id, ...data } = country;
      await prisma.country.upsert({
        where: { id: country.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${countries.length} countries`);
  };
}
