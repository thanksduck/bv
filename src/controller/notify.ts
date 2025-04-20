import { type Context } from "hono";
import messaging from "../firebase/admin";
import { Payload } from "../routes/notifyRoute";

export default async (c: Context) => {
  const { tokens, title, body } = c.req.valid("json") as Payload;

  // Ensure tokens is actually an array
  if (!Array.isArray(tokens)) {
    return c.json({ success: false, error: "Tokens must be an array" }, 400);
  }

  const message = {
    notification: { title, body },
    tokens,
  };

  try {
    // console.log("Sending message:", JSON.stringify(message, null, 2));
    const response = await messaging.sendEachForMulticast({
      tokens: tokens,
      notification: { title, body },
    });
    // console.log("Full response:", JSON.stringify(response, null, 2));
    return c.json({ success: true, response });
  } catch (error: unknown) {
    console.error("Detailed error:", error);
    const errorDetails =
      error instanceof Error
        ? { message: error.message, stack: error.stack }
        : String(error);
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        errorDetails,
      },
      500,
    );
  }
};
