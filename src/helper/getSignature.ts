import * as crypto from "crypto";

function encryptRSA(plainData: string, publicKey: string): string | null {
  try {
    const encrypted = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha1",
      },
      Buffer.from(plainData, "utf-8"),
    );

    return encrypted.toString("base64");
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
}

export default function getSignature(): string | null {
  const clientId = process.env.CLIENT_ID;
  let publicKey = process.env.PUBLIC_KEY;

  if (!publicKey) {
    console.error("Error: PUBLIC_KEY environment variable is not set.");
    return null;
  }

  // Replace explicit `\n` characters with actual newlines
  publicKey = publicKey.replace(/\\n/g, "\n").trim();

  try {
    const encodedData = `${clientId}.${Math.floor(Date.now() / 1000)}`;
    return encryptRSA(encodedData, publicKey);
  } catch (error) {
    console.error("Error using public key:", error);
    return null;
  }
}

// Example usage
/*
const signature = getSignature();
if (signature) {
  console.log("Generated Signature:", signature);
} else {
  console.log("Failed to generate signature.");
}

*/
