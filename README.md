# IceVault

Welcome to IceVault

The IceVault is a safe place where you can keep your sensitive information.

## How does it work?

The vault is designed to safely store the user's data using encryption methods for the data in-transit and at rest. When a new user is created (what can be performed only by admin users), the vault assigns to him a new pair of RSA keys (public/private) of 2048 bits which will be linked to this user and can be only used by him. Whenever this user successfully logs in the system using his personal credentials, a new JWT token containing his public key is returned to him for performing the next the data encryption/decryption operations - while his private key never leaves the server. 

When he creates a new "secret" (sensitive data), the system will actually encrypt the data using AES encryption with a random passphrase, and will encrypt this key with the user's personal RSA public key before sending to the server for storage. When the data arrives in the server, the passphase is decrypted and encrypted again, but now using the user's private key and finally, it is store in the database.

When the user wants to retrieve the secret and check it as plain text, the server will send him the encrypted data which can be only descrypted having the corresponding key.

To avoid interception, the HTTPS should always be enabled in production servers with the proper signed certificates.

## How do I run it?

1) Make sure you have node/npm and ng (AngularCLI) properly installed 
2) In the project root folder execute the command: 'npm install' to refresh all the dependencies
3) Execute 'ng build' for building the project
4) Execute 'ng serve' to start up the front-end server on http://localhost:4200

## Dev Requirements

NodeJS (npm) and ng (Angular-CLI)

### Who do I talk to? ###

Felipe F. de Souza Carvalho | souzacarvalh@gmail.com
