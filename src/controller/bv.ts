import { Context } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";

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
    const url = `${process.env.CASHFREE_HOST_TEST}/verification/bank-account/async`;
    // Get request body from client with proper error handling
    let body;
    try {
      body = await c.req.json();
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      return c.json(
        { success: false, error: "Invalid JSON in request body" },
        400,
      );
    }

    // Check if body exists
    if (!body || Object.keys(body).length === 0) {
      return c.json({ success: false, error: "Empty request body" }, 400);
    }

    console.log("Received body:", body);

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

    console.log("Sending request to Cashfree API");

    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        "Cashfree API error:",
        response.status,
        response.statusText,
      );
      return c.json(
        {
          success: false,
          error: `Cashfree API error: ${response.status}`,
          details: await response.text(),
        },
        (response.status as ContentfulStatusCode) || 500,
      );
    }

    const data = await response.json();
    console.log("Cashfree API response:", data);

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
        details: error instanceof Error ? error.message : String(error),
      },
      500,
    );
  }
}
