import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import notify from "../controller/notify";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
const notifyRouter = new Hono();

const token = process.env.TOKEN || "easy-password";

notifyRouter.use("*", bearerAuth({ token }));
const schema = z.object({
  tokens: z.array(z.string()),
  title: z.string(),
  body: z.string(),
});
export type Payload = z.infer<typeof schema>;
notifyRouter.post("/", zValidator("json", schema), notify);

export default notifyRouter;
