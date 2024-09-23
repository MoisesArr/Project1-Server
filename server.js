const express = require('express');
const jwt = require('jsonwebtoken');
const forge = require('node-forge');
const app = express();
const port = 8080;

let keys = {};
let privateKeys = {};

function generateKey(kid) {
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
    const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

    keys[kid] = {
        kty: "RSA",
        kid: kid,
        n: Buffer.from(publicKey.n.toByteArray()).toString('base64url'),
        e: Buffer.from(publicKey.e.toByteArray()).toString('base64url'),
        expiry: Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry
    };
    privateKeys[kid] = forge.pki.privateKeyToPem(privateKey);
}

app.get('/.well-known/jwks.json', (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).send('Method not allowed');
    }

    const responseKeys = Object.values(keys).filter(key => key.expiry > Math.floor(Date.now() / 1000));
    res.json({ keys: responseKeys });
});

app.post('/auth', (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method not allowed');
    }

    const expired = req.query.expired === "true";
    const kid = expired ? "expired-key-id" : Object.keys(keys)[0];

    if (expired && !(kid in keys)) {
        generateKey(kid);
        keys[kid].expiry = Math.floor(Date.now() / 1000) - 3600; // Set expiry in the past
    }

    const privKey = privateKeys[kid];
    const expTime = expired ? Math.floor(Date.now() / 1000) - 3600 : Math.floor(Date.now() / 1000) + 3600;

    const token = jwt.sign({ iat: Math.floor(Date.now() / 1000), exp: expTime }, privKey, { algorithm: 'RS256', header: { kid: kid } });
    res.send(token);
});

app.listen(port, () => {
    generateKey("key-id-1"); // Generate a new key
    console.log(`Server listening on http://localhost:${port}`);
});
