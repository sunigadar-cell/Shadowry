// generate-secret.js
const crypto = require('crypto');

// 32 bytes => 256 bits (good for HS256). Use 64 for HS512.
const secret = crypto.randomBytes(32).toString('base64');
console.log(secret);