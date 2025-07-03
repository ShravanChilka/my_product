import { injectable } from "tsyringe";
import prisma from "../../core/prisma_client";
import { UserCreate, UserGetByEmailPassword } from "./user.validation";
import bcrypt from "bcrypt";

@injectable()
export default class UserService {
  createUser = async (data: UserCreate) => {
    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (user) throw new Error("User with same email already exists");

    const password = await bcrypt.hash(data.password, 10);
    const result = await prisma.user.create({
      data: { ...data, password },
    });
    return {
      id: result.id,
      name: result.name,
      email: result.email,
    };
  };

  getUserByEmailPassword = async (data: UserGetByEmailPassword) => {
    const user = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid password");

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  };
}
