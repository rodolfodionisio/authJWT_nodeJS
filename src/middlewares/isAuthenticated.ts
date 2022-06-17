import { Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

interface PayLoad{
    sub: string;

}

export function isAuthenticated(req: Request,res: Response, next: NextFunction){
    console.log("Chamou o middleware")
    

    // Receber o token
    const authToken = req.headers.authorization;

    if(!authToken){
        // Usuário Não Autorizado
        return res.status(401).end(); 
    }
    console.log(authToken);

    const [, token] = authToken.split(" ")

    console.log(token)

    try {
        //Validar Token
        const { sub } = verify (token, process.env.JWT) as PayLoad

        console.log(sub)

        //Recuperar ID TOKEN e inserir dentro de uma variavel usar_id dentro do req
        req.user_id = sub;

        return next();
    } catch (error) {
        // Usuário Não Autorizado
        return res.status(401).end();        
    }
}