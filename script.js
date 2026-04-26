/**
 * MiniVault Web Application Core Logic
 * Secure client-side encryption using Web Crypto API.
 */

class MiniVault {
    constructor() {
        this.masterKey = null;
        this.vaultData = [];
        this.salt = null;
        this.isLocked = true;
        this.isSetupMode = false;

        this.initElements();
        this.bindEvents();
        this.checkExistingVault();
    }

    initElements() {
        // Overlays
        this.loginOverlay = document.getElementById('login-overlay');
        this.dashboard = document.getElementById('dashboard');
        this.entryModal = document.getElementById('entry-modal');
        this.genModal = document.getElementById('gen-modal');

        // Login Elements
        this.loginTitle = document.getElementById('login-title');
        this.loginDesc = document.getElementById('login-desc');
        this.masterPassInput = document.getElementById('master-password');
        this.confirmPassInput = document.getElementById('confirm-password');
        this.unlockBtn = document.getElementById('unlock-btn');
        this.loginError = document.getElementById('login-error');

        // Dashboard Elements
        this.searchInput = document.getElementById('search-input');
        this.addEntryBtn = document.getElementById('add-entry-btn');
        this.genPassBtn = document.getElementById('gen-pass-btn');
        this.lockBtn = document.getElementById('lock-btn');
        this.saveBtn = document.getElementById('save-btn');
        this.cancelBtn = document.getElementById('cancel-btn');
        this.closeGenBtn = document.getElementById('close-gen-btn');
        this.copyBtn = document.getElementById('copy-btn');

        this.vaultItems = document.getElementById('vault-items');
        this.emptyState = document.getElementById('empty-state');
        this.genResult = document.getElementById('gen-result');
        this.lengthSlider = document.getElementById('length-slider');
        this.lengthVal = document.getElementById('length-val');
        this.toast = document.getElementById('toast');
    }

    bindEvents() {
        this.unlockBtn.addEventListener('click', () => this.handleUnlock());
        this.masterPassInput.addEventListener('keypress', (e) => e.key === 'Enter' && this.handleUnlock());
        this.confirmPassInput.addEventListener('keypress', (e) => e.key === 'Enter' && this.handleUnlock());
        
        this.addEntryBtn.addEventListener('click', () => this.toggleModal(this.entryModal, true));
        this.cancelBtn.addEventListener('click', () => this.toggleModal(this.entryModal, false));
        this.saveBtn.addEventListener('click', () => this.handleSaveEntry());

        this.genPassBtn.addEventListener('click', () => {
            this.generatePassword();
            this.toggleModal(this.genModal, true);
        });
        this.closeGenBtn.addEventListener('click', () => this.toggleModal(this.genModal, false));
        this.copyBtn.addEventListener('click', () => this.copyToClipboard(this.genResult.textContent));

        this.lockBtn.addEventListener('click', () => this.lock());
        
        this.searchInput.addEventListener('input', () => this.renderVault());
        this.lengthSlider.addEventListener('input', (e) => {
            this.lengthVal.textContent = e.target.value;
            this.generatePassword();
        });

        const toggleBtn = document.getElementById('toggle-pass');
        if (toggleBtn) {
            toggleBtn.onclick = (e) => {
                const input = document.getElementById('password');
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                e.target.textContent = type === 'password' ? '👁️' : '🔒';
            };
        }
    }

    async checkExistingVault() {
        const storedSalt = localStorage.getItem('mv_salt');
        if (storedSalt) {
            this.salt = this.strToUint8(storedSalt);
            this.isSetupMode = false;
            this.loginTitle.textContent = 'Welcome Back';
            this.loginDesc.textContent = 'Unlock your vault to continue.';
            this.confirmPassInput.classList.add('hidden');
            this.unlockBtn.textContent = 'Unlock Vault';
        } else {
            this.isSetupMode = true;
            this.loginTitle.textContent = 'Setup MiniVault';
            this.loginDesc.textContent = 'Create a strong Master Password to initialize your vault.';
            this.confirmPassInput.classList.remove('hidden');
            this.unlockBtn.textContent = 'Create Vault';
        }
        // Force focus after a small delay to ensure visibility
        setTimeout(() => this.masterPassInput.focus(), 100);
    }

    async handleUnlock() {
        const password = this.masterPassInput.value;
        const confirmPass = this.confirmPassInput.value;
        
        if (!password) {
            this.showLoginError('Please enter a password.');
            return;
        }

        if (this.isSetupMode) {
            if (password !== confirmPass) {
                this.showLoginError('Passwords do not match.');
                return;
            }
            if (password.length < 8) {
                this.showLoginError('Password must be at least 8 characters.');
                return;
            }
        }

        this.unlockBtn.disabled = true;
        this.unlockBtn.textContent = this.isSetupMode ? 'Creating...' : 'Unlocking...';
        this.loginError.textContent = '';

        try {
            if (this.isSetupMode) {
                this.salt = window.crypto.getRandomValues(new Uint8Array(16));
                localStorage.setItem('mv_salt', this.uint8ToStr(this.salt));
                this.masterKey = await this.deriveKey(password, this.salt);
                await this.saveVault(); // Save empty vault
            } else {
                this.masterKey = await this.deriveKey(password, this.salt);
                const encryptedData = localStorage.getItem('mv_data');
                if (encryptedData) {
                    try {
                        const decrypted = await this.decrypt(encryptedData, this.masterKey);
                        this.vaultData = JSON.parse(decrypted);
                    } catch (e) {
                        throw new Error('Incorrect Master Password.');
                    }
                }
            }

            this.unlock();
        } catch (err) {
            this.showLoginError(err.message);
            this.masterPassInput.value = '';
            this.confirmPassInput.value = '';
        } finally {
            this.unlockBtn.disabled = false;
            this.unlockBtn.textContent = this.isSetupMode ? 'Create Vault' : 'Unlock Vault';
        }
    }

    showLoginError(msg) {
        this.loginError.textContent = msg;
        this.loginError.style.opacity = 1;
    }

    unlock() {
        this.isLocked = false;
        this.loginOverlay.classList.remove('active');
        this.loginOverlay.classList.add('hidden');
        this.dashboard.classList.remove('hidden');
        this.renderVault();
        this.showToast(this.isSetupMode ? 'Vault Created!' : 'Vault Unlocked');
        this.isSetupMode = false; // Reset mode for future locks
    }

    lock() {
        this.isLocked = true;
        this.masterKey = null;
        this.vaultData = [];
        this.dashboard.classList.add('hidden');
        this.loginOverlay.classList.remove('hidden');
        this.loginOverlay.classList.add('active');
        this.masterPassInput.value = '';
        this.confirmPassInput.value = '';
        this.loginError.textContent = '';
        this.vaultItems.innerHTML = '';
        this.checkExistingVault(); // Re-check setup mode
    }

    async handleSaveEntry() {
        const service = document.getElementById('service').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (!service || !username || !password) {
            this.showToast('Please fill all fields', true);
            return;
        }

        const entry = {
            id: Date.now(),
            service,
            username,
            password,
            created: new Date().toISOString()
        };

        this.vaultData.push(entry);
        await this.saveVault();
        this.renderVault();
        this.toggleModal(this.entryModal, false);
        this.showToast('Credential Saved');
        
        document.getElementById('service').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    async deleteEntry(id) {
        if (!confirm('Are you sure you want to delete this credential?')) return;
        this.vaultData = this.vaultData.filter(item => item.id !== id);
        await this.saveVault();
        this.renderVault();
        this.showToast('Credential Deleted');
    }

    async saveVault() {
        const json = JSON.stringify(this.vaultData);
        const encrypted = await this.encrypt(json, this.masterKey);
        localStorage.setItem('mv_data', encrypted);
    }

    renderVault() {
        const query = this.searchInput.value.toLowerCase();
        const filtered = this.vaultData.filter(item => 
            item.service.toLowerCase().includes(query) || 
            item.username.toLowerCase().includes(query)
        );

        this.vaultItems.innerHTML = '';
        
        if (filtered.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            filtered.forEach(item => {
                const card = document.createElement('div');
                card.className = 'glass-card vault-card';
                card.innerHTML = `
                    <div class="card-header">
                        <h4>${this.escapeHtml(item.service)}</h4>
                        <button class="lock-btn small-btn" onclick="app.deleteEntry(${item.id})">Delete</button>
                    </div>
                    <div class="item-details">
                        <p>User: <span>${this.escapeHtml(item.username)}</span></p>
                        <p>Pass: <span class="pass-blur" id="p-${item.id}">••••••••</span></p>
                    </div>
                    <div class="card-actions">
                        <button class="primary-btn small-btn" onclick="app.showPassword(${item.id})">Show</button>
                        <button class="secondary-btn small-btn" onclick="app.copyToClipboard('${this.escapeHtml(item.password)}')">Copy</button>
                    </div>
                `;
                this.vaultItems.appendChild(card);
            });
        }
    }

    showPassword(id) {
        const item = this.vaultData.find(i => i.id === id);
        const el = document.getElementById(`p-${id}`);
        if (el.textContent === '••••••••') {
            el.textContent = item.password;
            el.classList.remove('pass-blur');
        } else {
            el.textContent = '••••••••';
            el.classList.add('pass-blur');
        }
    }

    async deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const baseKey = await window.crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            'PBKDF2',
            false,
            ['deriveKey']
        );

        return window.crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            baseKey,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
    }

    async encrypt(text, key) {
        const encoder = new TextEncoder();
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encoder.encode(text)
        );

        const combined = new Uint8Array(iv.length + encrypted.byteLength);
        combined.set(iv);
        combined.set(new Uint8Array(encrypted), iv.length);
        
        return this.uint8ToStr(combined);
    }

    async decrypt(combinedStr, key) {
        const combined = this.strToUint8(combinedStr);
        const iv = combined.slice(0, 12);
        const data = combined.slice(12);

        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            data
        );

        return new TextDecoder().decode(decrypted);
    }

    generatePassword() {
        const len = parseInt(this.lengthSlider.value);
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
        let retVal = "";
        const array = new Uint32Array(len);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < len; i++) {
            retVal += charset.charAt(array[i] % charset.length);
        }
        this.genResult.textContent = retVal;
    }

    toggleModal(modal, show) {
        if (show) modal.classList.remove('hidden');
        else modal.classList.add('hidden');
    }

    showToast(msg, isError = false) {
        this.toast.textContent = msg;
        this.toast.style.background = isError ? 'var(--error-color)' : 'var(--primary-color)';
        this.toast.classList.remove('hidden');
        setTimeout(() => this.toast.classList.add('hidden'), 3000);
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Copied to clipboard!');
        });
    }

    uint8ToStr(uint8) {
        return btoa(String.fromCharCode.apply(null, uint8));
    }

    strToUint8(str) {
        return new Uint8Array(atob(str).split('').map(c => c.charCodeAt(0)));
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const app = new MiniVault();
window.app = app;
