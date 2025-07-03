import { prisma } from "../seed";

class UserSeed {
  seed = async () => {
    const users = [
      {
        id: 1,
        email: "shravanchilka16@gmail.com",
        name: "Shravan",
        password: "12345678",
      },
      {
        id: 2,
        email: "john@gmail.com",
        name: "John",
        password: "12345678",
      },
    ];
    for (const user of users) {
      const { id, ...data } = user;
      await prisma.user.upsert({
        where: { id: user.id },
        create: data,
        update: data,
      });
    }
    console.log(`Inserted ${users.length} users`);
  };
}

export default UserSeed;
