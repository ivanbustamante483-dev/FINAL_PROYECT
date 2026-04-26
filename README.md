# 🔐 MiniVault Web

MiniVault is a simple and secure password manager that works entirely in your browser.

It allows users to store, manage, and generate passwords using strong client-side encryption, without sending any data to external servers.

---

## 🚀 Project Motivation

The goal of this project is to simulate a real-world digitalization solution focused on **data security and privacy**.

Many users reuse weak passwords or store them insecurely. This project aims to solve that problem by:

- Providing a simple interface to manage credentials
- Applying encryption directly in the browser
- Avoiding dependency on external services or databases

It also demonstrates how modern web technologies can be used to build secure applications.

---

## 🌐 Live Demo

You can try the application online here:

👉 https://ivanbustamante483-dev.github.io/FINAL_PROJECT/

No installation is required.

---

## ⚙️ How It Works

MiniVault works completely on the client side:

1. The user creates a **master password**
2. A secure encryption key is generated using **PBKDF2**
3. All credentials are encrypted using **AES-GCM**
4. The encrypted data is stored in the browser using `localStorage`

### Important

- Data **never leaves your browser**
- There is **no backend or server**
- If you **clear browser data (cookies/localStorage)**, all saved passwords are lost

---

## 🔐 Security Overview

- Key derivation: PBKDF2 (100,000 iterations)
- Encryption: AES-GCM (256-bit)
- Random salt generation
- Password generator using cryptographic randomness

### Limitations

This is a **demo project**, so:

- Data is stored locally (not suitable for production)
- No account recovery system exists
- Data loss occurs if browser storage is cleared

---

## 📦 Deployment

### Option 1: Use the online version

Just open the demo link above.

### Option 2: Run locally

1. Download or clone the repository
2. Open `index.html` in your browser

No installation or dependencies required.

---

## 📖 Documentation

The project includes automatically generated documentation using JSDoc.

You can access it here:

👉 https://ivanbustamante483-dev.github.io/FINAL_PROJECT/docs/

This documentation explains:

- The structure of the code
- Functions and classes
- Encryption logic

---

## 🧠 Project Structure
- FINAL_PROJECT/
- │
- ├── index.html # Main app
- ├── script.js # Core logic
- ├── style.css # UI styles
- ├── assets/ # Icons and images
- ├── docs/ # Auto-generated documentation (JSDoc)
- │
- ├── README.md
- ├── CONTRIBUTING.md
- ├── questions.md
- ├── LICENSE
- ├── RELEASE_NOTES.md
- ├── documentation_strategy.md 
- └── wiki_proposal.md


---

## 🤝 Contributing

If you want to contribute to this project, please read:

👉 `CONTRIBUTING.md`

It includes:

- Code structure guidelines
- Possible improvements
- Contribution workflow

---

## 📚 Wiki and Devlog

This project includes a **Wiki proposal** and a **development log (devlog)**.

### Wiki

The wiki contains:

- Technical documentation for developers
- Explanation of architecture and decisions
- Future improvements

👉 See: `wiki_proposal.md`

### Devlog

The development process has been documented and published on LinkedIn:

👉 https://www.linkedin.com/posts/ivan-bustamante-0aa609406_webdevelopment-javascript-cybersecurity-share-7454279559975231488-vrSf

It explains:

- How the project evolved
- Problems encountered
- Decisions made during development

---

## 📊 Use Cases

This software can be useful in:

- Personal password management
- Educational environments (learning encryption concepts)
- Demonstrating secure frontend applications

---

## 🧩 Future Improvements

- Cloud synchronization
- Multi-device support
- Backup system
- Biometric authentication
- Progressive Web App (PWA)

---

## 📜 License

This project is licensed under the MIT License.

---

## ⚠️ Final Notes

This project is intended for **educational purposes**.

It demonstrates how encryption and secure storage can be implemented in a web environment, but it is not intended for production use.

