import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";

import { AuthUserController } from "./controllers/user/AuthUserController";

import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAuthenticated } from "./middlewares/isAuthenticated"

const router = Router();

// ROTAS USER
router.post("/users", new CreateUserController().handle);
// ROTAS LOGIN
router.post("/session", new AuthUserController().handle);
// ROTAS DETAIL USER / middlewares
router.get("/info", isAuthenticated, new DetailUserController().handle);

export { router };
