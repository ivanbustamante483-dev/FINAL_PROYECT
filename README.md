# MiniVault 🔐

MiniVault is a lightweight, secure, and privacy-focused web-based password manager. Built with HTML5, CSS3, and Vanilla JavaScript, it allows you to store your digital credentials securely in your browser, protected by industry-standard encryption.

![MiniVault Icon](assets/icon.png)

## Key Features

- **Local-First Security**: Your passwords never leave your browser. No cloud, no servers, no third-party storage.
- **Strong Encryption**: Uses PBKDF2 for key derivation and AES-GCM (256-bit) for data encryption via the native Web Crypto API.
- **Modern UI**: A premium, dark-themed interface with glassmorphism aesthetics.
- **Password Generator**: Built-in cryptographically secure password generator.
- **Zero Dependencies**: Pure Vanilla JS for maximum security and performance.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).

### Usage

1. Clone the repository or download the source code.
2. Open `index.html` in your web browser.
3. Set your Master Password to initialize your vault.

## Web Demo

Try the simplified web version of MiniVault to test the password generator and strength checker:

```bash
streamlit run demo.py
```

## Security Model

MiniVault uses the `cryptography` library. When you set a Master Password:
1. A unique salt is generated (`salt.bin`).
2. Your Master Password is combined with the salt using **PBKDF2HMAC** (SHA256, 100k iterations) to derive a 32-byte key.
3. All data is stored in `vault.json` using **Fernet symmetric encryption**.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
