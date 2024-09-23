# JWKS Server Moises Arredondo

## Overview
This project is a basic implementation of a JWKS (JSON Web Key Set) server. The server provides public keys for verifying JSON Web Tokens (JWTs), supports key expiry, and includes endpoints for issuing JWTs and serving public keys.

## Features
- **RSA Key Generation**: Generates RSA key pairs with unique identifiers (kid) and expiry timestamps.
- **JWKS Endpoint**: Serves public keys in JWKS format.
- **Authentication Endpoint**: Issues JWTs with an option to include an expired key based on the `expired` query parameter.

## Setup Instructions
1. **Clone the repository**:
   ```powershell
   git clone "This repo"
  
2. Navigate to the project directory:
   ```powershell
   cd Project-1-JWKS-server
  
4. Install dependencies:
   ```powershell
   npm install

6. Start the server
   ```powershell
   node server.js

## Testing

To test the server:

- For coverage percent test
   ````powershell
   .\gradebot.exe project1

For JWKS Authentication Endpoint:
Use Postman to make a GET request to http://localhost:8080/.well-known/jwks.json to verify the public keys.

Normal JWT Token:
Open Postman, set the method to POST, and navigate to http://localhost:8080/auth.
Click Send to receive a JWT token
Expired JWT Token:
Open Postman, set the method to POST, and navigate to http://localhost:8080/auth?expired=true
Click Send to receive a JWT token signed with an expired key.

## JWT Decoding:

Use JWT.io to decode and verify the JWT tokens obtained from the /auth endpoint. This tool helps to inspect the token's payload and verify its signature.

## Tools Used

- **VS Code**: For code development and editing.
- **Postman**: For testing the server endpoints.
- **JWT.io**: For decoding and verifying JWTs.
