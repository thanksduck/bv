import { Hono } from "hono";
import { poweredBy } from "hono/powered-by";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import bvRouter from "./routes/bvRoute";
const app = new Hono();

app.use(poweredBy());
app.use(secureHeaders());
app.use(logger());
app.use(cors());

app.route("/api", bvRouter);
app.get("/health", (c) => {
  return c.text("Hey i'm alive");
});

export default app;
