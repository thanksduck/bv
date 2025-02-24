import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import bankVerification from "../controller/bv";
const bvRouter = new Hono();

const token = process.env.TOKEN || "easy-password";

bvRouter.use("*", bearerAuth({ token }));

bvRouter.post("/bank-verification", bankVerification);

export default bvRouter;
