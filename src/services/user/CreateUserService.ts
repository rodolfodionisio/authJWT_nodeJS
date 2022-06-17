import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    //Verificar se o E-mail Foi Informado
    if (!email) {
      throw new Error("E-mail não informado!");
    }
    //Verificar se a Senha Foi Informado
    if (!password) {
      throw new Error("Senha não informada!");
    }

    //Veriricar se E-mail Está Cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("Usuário já possui e-mail cadastrado!");
    }

    //Criptografia de Senha Utilizando Bcryptjs
    const passwordHash = await hash(password, 8);

    //Cadastrar Usuário
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { CreateUserService };
