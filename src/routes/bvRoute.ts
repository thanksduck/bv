import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import bankVerification from "../controller/bv";
const bvRouter = new Hono();

const token = process.env.TOKEN || "easy-password";

bvRouter.use("*", bearerAuth({ token }));

bvRouter.get("/bank-verify", bankVerification);

export default bvRouter;
