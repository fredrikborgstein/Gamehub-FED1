export default class Toaster {
  constructor() {
    this.toastContainer = document.createElement("div");
    this.toastContainer.id = "toast-container";
    this.toastContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
    document.body.appendChild(this.toastContainer);
  }

  show(message, duration = 3000) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toast.style.cssText = `
            background-color: #323232;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            opacity: 0;
            transform: translateY(20px);
            animation: slide-in 0.5s forwards, fade-out 0.5s ${
              duration / 1000
            }s forwards;
        `;

    const keyframes = `
            @keyframes slide-in {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fade-out {
                to { opacity: 0; transform: translateY(20px); }
            }
        `;
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = keyframes;
    document.head.appendChild(styleSheet);

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration + 500);
  }
}
