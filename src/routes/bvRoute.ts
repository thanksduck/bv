import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import giveSignatue from "../controller/giveSignature";
const bvRouter = new Hono();

const token = process.env.TOKEN || "easy-password";

bvRouter.use("*", bearerAuth({ token }));

bvRouter.get("/get-signature", giveSignatue);

export default bvRouter;
