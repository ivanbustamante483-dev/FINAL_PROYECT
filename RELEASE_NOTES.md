# Release Notes - v1.0.0 (Initial Release)

We are excited to announce the first public release of **MiniVault**!

## Features included in this version:
- **Secure Web Vault**: Fully encrypted storage using **Web Crypto API** (AES-GCM).
- **Master Password Protection**: Key derivation with PBKDF2 (100k iterations).
- **Local-Only Storage**: Uses `localStorage` to keep data strictly on your device.
- **Credential Management**: Seamlessly add, view, and delete entries.
- **Password Generator**: Integrated secure generator with customizable length.
- **Premium Design**: Modern dark theme with responsive glassmorphism UI.

## Security Notes:
- Please ensure you remember your Master Password. There is **no way to recover it** if lost, as the encryption is zero-knowledge and happens entirely on your client.
- Your data is stored in your browser's local storage. Clearing your browser data may delete your vault.

## Installation:
Please refer to the `README.md` for installation instructions.
