/**
 * PopupManager - Quản lý stack các popup có thể đè lên nhau
 */
class PopupManager {
    constructor() {
        this.popupStack = []; // Stack để quản lý các popup đang mở
        this.overlay = null;
        this.overlayClickHandler = null;
        this.escapeKeyHandler = null;
        this.init();
    }

    /**
     * Initialize PopupManager
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupHandlers();
            });
        } else {
            this.setupHandlers();
        }
    }

    /**
     * Setup event handlers
     */
    setupHandlers() {
        this.overlay = document.getElementById('popupOverlay');
        if (!this.overlay) {
            console.error('Popup overlay not found');
            return;
        }

        // Overlay click handler
        this.overlayClickHandler = (e) => {
            if (e.target === this.overlay && this.popupStack.length > 0) {
                const topPopup = this.popupStack[this.popupStack.length - 1];
                if (topPopup.allowOverlayClose) {
                    this.closeTopPopup();
                }
            }
        };
        this.overlay.addEventListener('click', this.overlayClickHandler);

        // Global Escape key handler
        this.escapeKeyHandler = (e) => {
            if (e.key === 'Escape' && this.popupStack.length > 0) {
                const topPopup = this.popupStack[this.popupStack.length - 1];
                if (topPopup.allowEscapeClose) {
                    this.closeTopPopup();
                }
            }
        };
        document.addEventListener('keydown', this.escapeKeyHandler);
    }

    /**
     * Close the top popup in the stack
     */
    closeTopPopup() {
        if (this.popupStack.length > 0) {
            const topPopup = this.popupStack[this.popupStack.length - 1];
            topPopup.reject(null);
            this.close(topPopup);
        }
    }    /**
     * Hiển thị popup
     * @param {string} dialogId - ID của dialog element
     * @param {Function} setupCallback - Function để setup nội dung và handlers
     * @param {boolean} allowOverlayClose - Cho phép đóng bằng click overlay
     * @param {boolean} allowEscapeClose - Cho phép đóng bằng phím Escape
     * @returns {Promise} - Promise resolve khi popup đóng
     */
    show(dialogId, setupCallback, allowOverlayClose = true, allowEscapeClose = true) {
        return new Promise((resolve, reject) => {
            const dialog = document.getElementById(dialogId);
            if (!dialog) {
                console.error(`Dialog ${dialogId} not found`);
                reject(new Error(`Dialog ${dialogId} not found`));
                return;
            }

            // Tạo popup object
            const popup = {
                id: dialogId,
                dialog: dialog,
                resolve: resolve,
                reject: reject,
                allowOverlayClose: allowOverlayClose,
                allowEscapeClose: allowEscapeClose,
                cleanup: null
            };

            // Thêm vào stack
            this.popupStack.push(popup);

            // Hiển thị overlay nếu đây là popup đầu tiên
            if (this.popupStack.length === 1) {
                this.overlay.classList.add('show');
            }

            // Hiển thị dialog với z-index tăng dần
            const zIndex = 1000 + this.popupStack.length * 10;
            dialog.style.zIndex = zIndex;
            dialog.classList.add('show');

            // Setup cleanup function
            const cleanupFn = () => {
                this.close(popup);
            };

            // Gọi setup callback để config popup
            const userCleanup = setupCallback(popup, cleanupFn);
            popup.cleanup = userCleanup || null;
        });
    }

    /**
     * Đóng popup
     * @param {Object} popup - Popup object cần đóng
     */
    close(popup) {
        // Tìm index của popup trong stack
        const index = this.popupStack.findIndex(p => p.id === popup.id);
        if (index === -1) return;

        // Gọi cleanup nếu có
        if (typeof popup.cleanup === 'function') {
            popup.cleanup();
        }

        // Ẩn dialog
        popup.dialog.classList.remove('show');
        popup.dialog.style.zIndex = '';

        // Xóa khỏi stack
        this.popupStack.splice(index, 1);

        // Ẩn overlay nếu không còn popup nào
        if (this.popupStack.length === 0) {
            this.overlay.classList.remove('show');
        }
    }

    /**
     * Đóng tất cả popup
     */
    closeAll() {
        while (this.popupStack.length > 0) {
            const popup = this.popupStack[this.popupStack.length - 1];
            popup.reject(null);
        }
    }

    /**
     * Helper: Show Confirm Dialog
     */
    showConfirm(message) {
        return this.show('confirmDialog', (popup, cleanupFn) => {
            const messageEl = document.getElementById('confirmMessage');
            const okBtn = document.getElementById('confirmOk');
            const cancelBtn = document.getElementById('confirmCancel');

            messageEl.textContent = message;

            const handleOk = () => {
                popup.resolve(true);
                cleanupFn();
            };

            const handleCancel = () => {
                popup.resolve(false);
                cleanupFn();
            };

            okBtn.addEventListener('click', handleOk);
            cancelBtn.addEventListener('click', handleCancel);

            // Return cleanup function
            return () => {
                okBtn.removeEventListener('click', handleOk);
                cancelBtn.removeEventListener('click', handleCancel);
            };
        });
    }

    /**
     * Helper: Show Prompt Dialog
     */
    showPrompt(message, defaultValue = '') {
        return this.show('promptDialog', (popup, cleanupFn) => {
            const messageEl = document.getElementById('promptMessage');
            const input = document.getElementById('promptInput');
            const okBtn = document.getElementById('promptOk');
            const cancelBtn = document.getElementById('promptCancel');

            messageEl.textContent = message;
            input.value = defaultValue;

            // Focus input
            setTimeout(() => {
                input.focus();
                input.select();
            }, 100);            const handleOk = () => {
                const value = input.value;
                popup.resolve(value);
                cleanupFn();
            };

            const handleCancel = () => {
                popup.resolve(null);
                cleanupFn();
            };

            const handleKeyPress = (e) => {
                if (e.key === 'Enter') {
                    handleOk();
                }
            };

            okBtn.addEventListener('click', handleOk);
            cancelBtn.addEventListener('click', handleCancel);
            input.addEventListener('keydown', handleKeyPress);

            // Return cleanup function
            return () => {
                okBtn.removeEventListener('click', handleOk);
                cancelBtn.removeEventListener('click', handleCancel);
                input.removeEventListener('keydown', handleKeyPress);
            };
        });
    }

    /**
     * Helper: Show Import Dialog
     */
    showImport(currentMatrix) {
        return this.show('importDialog', (popup, cleanupFn) => {
            const textarea = document.getElementById('importTextarea');
            const okBtn = document.getElementById('importOk');
            const cancelBtn = document.getElementById('importCancel');

            // Pre-fill với current matrix
            textarea.value = currentMatrix.map(row => row.join(', ')).join('\n');

            setTimeout(() => {
                textarea.focus();
                textarea.select();
            }, 100);

            const handleImport = () => {
                const matrixText = textarea.value.trim();
                popup.resolve(matrixText);
                cleanupFn();
            };

            const handleCancel = () => {
                popup.resolve(null);
                cleanupFn();
            };

            okBtn.addEventListener('click', handleImport);
            cancelBtn.addEventListener('click', handleCancel);

            return () => {
                okBtn.removeEventListener('click', handleImport);
                cancelBtn.removeEventListener('click', handleCancel);
            };
        });
    }

    /**
     * Helper: Show Export Dialog
     */
    showExport(matrixText, nodeNames) {
        return this.show('exportDialog', (popup, cleanupFn) => {
            const textarea = document.getElementById('exportTextarea');
            const nodeOrderEl = document.getElementById('exportNodeOrder');
            const copyBtn = document.getElementById('exportCopy');
            const closeBtn = document.getElementById('exportClose');

            textarea.value = matrixText;
            nodeOrderEl.textContent = nodeNames;

            const handleCopy = async () => {
                try {
                    await navigator.clipboard.writeText(matrixText);
                    const originalText = copyBtn.textContent;
                    const originalBg = copyBtn.style.background;
                    
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.style.background = originalBg;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                    // Fallback
                    textarea.select();
                    document.execCommand('copy');
                }
            };

            const handleClose = () => {
                popup.resolve(true);
                cleanupFn();
            };            copyBtn.addEventListener('click', handleCopy);
            closeBtn.addEventListener('click', handleClose);

            return () => {
                copyBtn.removeEventListener('click', handleCopy);
                closeBtn.removeEventListener('click', handleClose);
            };
        }, false, false); // Không cho đóng bằng overlay click và Escape
    }
}

// Export singleton instance
const popupManager = new PopupManager();
