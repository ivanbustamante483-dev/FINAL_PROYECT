# MiniVault Wiki Structure Proposal

To maintain a professional open-source project, I propose the following structure for the GitHub Wiki.

👉 For a better and more organized experience, please visit the **Wiki tab** in the repository to view the full documentation.

---

## 1. Home
- Project Vision
- Quick Start Links

---

## 2. User Guide
- **Installation**: Detailed steps for Windows, macOS, and Linux.
- **First Run**: Setting up your Master Password.
- **Managing Credentials**: Adding, editing, and deleting entries.
- **Best Practices**: How to choose a strong Master Password.

---

## 3. Technical Reference
- **Security Architecture**: In-depth explanation of the encryption flow (PBKDF2 + Fernet).
- **Data Format**: Description of how `vault.json` is structured.
- **Dependencies**: Why we chose each library.

---

## 4. Development
- **Environment Setup**: Setting up a virtualenv and dev tools.
- **UI Customization**: How to modify the stylesheet in `app.py`.
- **Roadmap**: Planned features (e.g., CSV import/export, biometric unlock).

---

## 5. Troubleshooting / FAQ
- "I lost my Master Password, what do I do?" → Data is unrecoverable.
- "How do I move my vault to another computer?"
