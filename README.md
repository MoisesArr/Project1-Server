# JWKS Server Moises Arredondo

## Overview
<<<<<<< HEAD

This project is a basic implementation of a JWKS (JSON Web Key Set) server. The server provides public keys for verifying JSON Web Tokens (JWTs), supports key expiry, and includes endpoints for issuing JWTs and serving public keys.

## Features

=======
This project is a basic implementation of a JWKS (JSON Web Key Set) server. The server provides public keys for verifying JSON Web Tokens (JWTs), supports key expiry, and includes endpoints for issuing JWTs and serving public keys.

## Features
>>>>>>> 745d289cede060a7db72b6dfa1ce3ff936803225
- **RSA Key Generation**: Generates RSA key pairs with unique identifiers (kid) and expiry timestamps.
- **JWKS Endpoint**: Serves public keys in JWKS format.
- **Authentication Endpoint**: Issues JWTs with an option to include an expired key based on the `expired` query parameter.

## Setup Instructions
<<<<<<< HEAD

1. **Clone the repository**:

   ```powershell
   git clone https://github.com/MoisesArr/Project1-Server.git

   ```

2. Navigate to the project directory:

   ```powershell
   cd Project1-Server

   ```

3. Install dependencies:

   ```powershell
   npm install

   ```

4. Start the server
   ```powershell
   node server.js
   ```
=======
1. **Clone the repository**:
   ```powershell
   git clone https://github.com/MoisesArr/Project1-Server.git
  
2. Navigate to the project directory:
   ```powershell
   cd Project1-Server
  
4. Install dependencies:
   ```powershell
   npm install

6. Start the server
   ```powershell
   node server.js
>>>>>>> 745d289cede060a7db72b6dfa1ce3ff936803225

## Testing

To test the server:

- For coverage percent test
<<<<<<< HEAD

  ```powershell
  .\gradebot.exe project1

  ```
=======
   ```powershell
   .\gradebot.exe project1
>>>>>>> 745d289cede060a7db72b6dfa1ce3ff936803225

- For JWKS Endpoint:

Authentication Endpoint:
Use Postman to make a GET request to http://localhost:8080/.well-known/jwks.json to verify the public keys.

Normal JWT Token:
Open Postman, set the method to POST, and navigate to http://localhost:8080/auth
Click Send to receive a JWT token.
Expired JWT Token:
Open Postman, set the method to POST, and navigate to http://localhost:8080/auth?expired=true
Click Send to receive a JWT token signed with an expired key.

## JWT Decoding:

Use [JWT.io](https://jwt.io/) to decode and verify the JWT tokens obtained from the /auth endpoint. This tool helps to inspect the token's payload and verify its signature.

## Tools Used

- **VS Code**: For code development and editing.
- **Postman**: For testing the server endpoints.
- **JWT.io**: For decoding and verifying JWTs.
