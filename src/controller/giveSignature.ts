import { Context } from "hono";
import getSignature from "../helper/getSignature";

export default async function giveSignatue(c: Context) {
  try {
    return c.json({
      success: true,
      signature: getSignature(),
    });
  } catch (error) {
    console.error("Error during Signature generation", error);
    return c.json(
      {
        success: false,
        message: "Server configuration error",
      },
      500,
    );
  }
}
