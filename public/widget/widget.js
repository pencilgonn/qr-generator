(function () {
  const ChatWidget = {
    init: function (options) {
      if (document.getElementById("qr-widget-btn")) return;

      const token = encodeURIComponent(options.token || "");

      // === Tạo nút chat ===
      const button = document.createElement("div");
      button.id = "qr-widget-btn";
      button.style.position = "fixed";
      button.style.bottom = "20px";
      button.style.right = "20px";
      button.style.width = "60px";
      button.style.height = "60px";
      button.style.borderRadius = "50%";
      button.style.backgroundColor = "#007bff";
      button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      button.style.display = "flex";
      button.style.justifyContent = "center";
      button.style.alignItems = "center";
      button.style.cursor = "pointer";
      button.style.zIndex = "9998";
      button.innerHTML =
        '<svg fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 3C7.031 3 3 6.589 3 11c0 1.74.664 3.317 1.789 4.579L3 21l5.576-1.744C9.175 19.75 10.562 20 12 20c4.969 0 9-3.589 9-8s-4.031-9-9-9zm0 2c3.859 0 7 2.805 7 6s-3.141 6-7 6c-1.24 0-2.401-.299-3.4-.819l-.601-.312-.898.281.326-1.105-.426-.531C5.629 14.099 5 12.612 5 11c0-3.195 3.141-6 7-6z"/></svg>';

      document.body.appendChild(button);

      // === Tạo iframe (ẩn ban đầu) ===
      const iframe = document.createElement("iframe");
      iframe.src = `https://qr-generator-omega-two.vercel.app/?token=${token}`;
      iframe.id = "qr-widget-iframe";
      iframe.style.position = "fixed";
      iframe.style.bottom = "90px";
      iframe.style.right = "20px";
      iframe.style.width = "400px";
      iframe.style.height = "600px";
      iframe.style.border = "none";
      iframe.style.zIndex = "9999";
      iframe.style.borderRadius = "12px";
      iframe.style.display = "none"; // ẩn ban đầu
      iframe.style.transition = "all 0.3s ease-in-out";

      document.body.appendChild(iframe);

      // === Bắt sự kiện click để toggle iframe ===
      button.addEventListener("click", () => {
        iframe.style.display =
          iframe.style.display === "none" ? "block" : "none";
      });
    },
  };

  window.ChatWidget = ChatWidget;
})();
