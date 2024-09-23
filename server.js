const express = require('express'); // Import Express framework
const jwt = require('jsonwebtoken'); // Import JSON Web Token (JWT) library
const forge = require('node-forge'); // Import Node Forge for key generation
const app = express(); // Create an Express application
const port = 8080; // Define the port the server will run on

// Stores public keys (JWK) and private keys
let keys = {};
let privateKeys = {};

// Function to generate a new RSA key pair and store them
function generateKey(kid) {
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

    // Store public key information (JWK format)
    keys[kid] = {
        kty: "RSA",
        kid: kid,
        n: Buffer.from(publicKey.n.toByteArray()).toString('base64url'),
        e: Buffer.from(publicKey.e.toByteArray()).toString('base64url'),
        expiry: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
    };
    // Store the private key for later use in signing tokens
    privateKeys[kid] = forge.pki.privateKeyToPem(privateKey);
}

// Logging middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// Endpoint to serve the JWKS (JSON Web Key Set)
app.get('/.well-known/jwks.json', (req, res) => {
     // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    // Filter the keys to only include those that haven't expired
    const responseKeys = Object.values(keys).filter(key => key.expiry > Math.floor(Date.now() / 1000));
    // Log the public keys being returned
    console.log('JWKS response:', responseKeys);
     // Respond with the public keys in JWKS format
    res.json({ keys: responseKeys });
});
// Endpoint to authenticate and return a JWT
app.post('/auth', (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    // Check if the query parameter "expired=true" is present
    const expired = req.query.expired === "true";
    const kid = expired ? "expired-key-id" : Object.keys(keys)[0];

    // Generate an expired key if it doesn't already exist
    if (expired && !(kid in keys)) {
        // Generate a new key with the ID "expired-key-id"
        generateKey(kid);
        // Set the key to expire in the past (1 hour ago)
        keys[kid].expiry = Math.floor(Date.now() / 1000) - 3600;
    }
    // Get the private key associated with the key ID
    const privKey = privateKeys[kid];
    // Set token expiration time (past for expired, future for valid)
    const expTime = expired ? Math.floor(Date.now() / 1000) - 3600 : Math.floor(Date.now() / 1000) + 3600;
    // Create a JWT with issued at (iat) and expiration (exp) claims
    const token = jwt.sign(
        // Payload: issued at and expiration time
        { iat: Math.floor(Date.now() / 1000), exp: expTime },
        // Sign with the private key
        privKey,
        // Use RS256 algorithm and add the key ID in the header
        { algorithm: 'RS256', header: { kid: kid } }
    );
    // Log the token issued
    console.log(`Token issued for ${kid}: ${token}`);
    // Send the JWT to the client
    res.send(token);
});
// Start the server and generate an initial key
app.listen(port, () => {
    // Generate a new key
    generateKey("key-id-1");
    // Log that the server is running
    console.log(`Server working on http://localhost:${port}`);
});
