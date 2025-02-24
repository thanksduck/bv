import { Context } from "hono";

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

export default async function bankVerification(c: Context) {
  try {
    // Check if credentials are configured
    if (!clientId || !clientSecret) {
      console.error("Cashfree API credentials not configured");
      return c.json(
        { success: false, error: "Server configuration error" },
        500,
      );
    }

    // Get request body from client
    const body = await c.req.json();

    // Validate required fields
    const requiredFields = ["bank_account", "ifsc", "name", "user_id", "phone"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return c.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          400,
        );
      }
    }

    // Make request to Cashfree API
    const options = {
      method: "POST",
      headers: {
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(
      "https://sandbox.cashfree.com/verification/bank-account/async",
      options,
    );
    const data = await response.json();

    // Return the response data
    return c.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Bank verification error:", error);
    return c.json(
      {
        success: false,
        error: "Failed to process bank verification request",
      },
      500,
    );
  }
}
