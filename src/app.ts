import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import bvRouter from "./routes/bvRoute";
import notifyRouter from "./routes/notifyRoute";

const app = new Hono()
  .use(poweredBy())
  .use(secureHeaders())
  .use(logger())
  .use(cors())
  .route("/api", bvRouter)
  .get("/health", (c) => {
    return c.text("Hey i'm alive");
  })
  .route("/notify", notifyRouter);
export default app;
