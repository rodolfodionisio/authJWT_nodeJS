import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    //  console.log(email);

    //Verificar se o E-mail existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    //Validar se o E-mail Está Cadastrado
    if (!user) {
      throw new Error("E-mail não Cadastrado!");
    }

    //Verificar se a Senha Confere com a Cadastrada (Criptografada)
    const passwordMach = await compare(password, user.password);

    if (!passwordMach) {
      throw new Error("Senha Inválida!");
    }

    //Gerar um Token JWT e Devolver os Dados do Usuário
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT,
      {
        subject: user.id,
        // expiredsIN: '30d'
      }
    );
    return {
      id: user.id,  
      name: user.name,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
