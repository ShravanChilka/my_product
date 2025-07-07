import { prisma } from "../seed";

export default class StateSeed {
  seed = async () => {
    const states = [
      {
        id: 1,
        name: "Maharashtra",
        countryId: 1,
      },
    ];

    for (const state of states) {
      const { id, ...data } = state;
      await prisma.state.upsert({
        where: { id: state.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${states.length} states`);
  };
}
