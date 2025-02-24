# Bank Verification API

This API provides a secure way to verify bank accounts using the Cashfree API without exposing your Cashfree credentials to clients.

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   CLIENT_ID=your_cashfree_client_id
   CLIENT_SECRET=your_cashfree_client_secret
   ```

## API Endpoint

### Verify Bank Account

Verifies a bank account by forwarding the request to Cashfree's Bank Verification API.

- **URL**: `/api/bank-verification`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body

```json
{
  "bank_account": "026291800001191",
  "ifsc": "YESB0000262",
  "name": "John Doe",
  "user_id": "test",
  "phone": "9999999999"
}
```

| Parameter    | Type   | Description                              |
| ------------ | ------ | ---------------------------------------- |
| bank_account | string | The bank account number to verify        |
| ifsc         | string | IFSC code of the bank branch             |
| name         | string | Account holder's name                    |
| user_id      | string | Unique identifier for the user           |
| phone        | string | Phone number associated with the account |

#### Successful Response

```json
{
  "success": true,
  "data": {
    // Response data from Cashfree API
  }
}
```

#### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```

## Client Implementation

### JavaScript/Fetch Example

```javascript
const verifyBankAccount = async (accountDetails) => {
  try {
    const response = await fetch("/api/bank-verification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountDetails),
    });

    return await response.json();
  } catch (error) {
    console.error("Error verifying bank account:", error);
    return { success: false, error: "Failed to connect to server" };
  }
};

// Usage example
const accountDetails = {
  bank_account: "026291800001191",
  ifsc: "YESB0000262",
  name: "John Doe",
  user_id: "test",
  phone: "9999999999",
};

verifyBankAccount(accountDetails)
  .then((result) => console.log(result))
  .catch((err) => console.error(err));
```

## Security Notes

- Never expose your Cashfree API credentials to clients
- Always validate input from clients
- Use HTTPS in production
- Consider implementing rate limiting to prevent abuse

## Error Codes

| Status Code | Description                                      |
| ----------- | ------------------------------------------------ |
| 400         | Bad Request - Missing required fields            |
| 500         | Server Error - Configuration or processing error |
| 401         | Unauthorized - Usually from Cashfree API         |

## Troubleshooting

- Ensure environment variables are properly set
- Check server logs for detailed error messages
- Verify Cashfree API status if receiving persistent errors
