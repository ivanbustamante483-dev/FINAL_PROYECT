# MiniVault 🔐

MiniVault is a lightweight, secure, and privacy-focused password manager.

This project includes:
- A **desktop version** built with Python (PySide6)
- A **web demo version** built with HTML, CSS and JavaScript

![MiniVault Icon](assets/icon.png)

---

## ✨ Key Features

- **Local-First Security**  
  Your data is stored locally. No cloud, no servers.

- **Master Password Protection**  
  Access is protected with a master password.

- **Password Generator**  
  Generate secure passwords easily.

- **Modern UI**  
  Clean interface inspired by modern apps.

---

## 🌐 Online Demo

You can try the web version here:

👉 https://ivanbustamante483-dev.github.io/FINAL_PROYECT/

⚠️ Note:
The web demo is a simplified version of the application.  
It runs entirely in the browser and stores data using `localStorage`.

---

## 💻 Desktop Version

The full version of MiniVault is available as a Windows executable.

👉 Download it from the **Releases section**:
https://github.com/ivanbustamante483-dev/FINAL_PROYECT/releases

---

## 🚀 How to Use

### Web Version
1. Open the demo link
2. Enter a master password
3. Start adding credentials

### Desktop Version
1. Download the `.zip` from Releases
2. Extract it into a folder
3. Run `MiniVault.exe`
4. Create your vault

---

## 🔐 Security Model

### Desktop Version
- Data is stored in a local file (`vault.json`)
- Encrypted using strong cryptography (Fernet, PBKDF2)

### Web Version
- Data is stored in the browser (`localStorage`)
- No files are created
- Designed for demonstration purposes only

---

## 📦 Project Structure

```bash
assets/
index.html
style.css
script.js
README.md
