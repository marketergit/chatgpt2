document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("user-input");
    const chatMessages = document.getElementById("chat-messages");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const message = input.value.trim();
      if (!message) return;
  
      // Display the user's message
      const userMessageDiv = document.createElement("div");
      userMessageDiv.classList.add("message", "user");
      userMessageDiv.innerHTML = `
        <div class="avatar">U</div>
        <div class="message-content">${message}</div>
        <div class="message-time">${new Date().toLocaleTimeString()}</div>
      `;
      chatMessages.appendChild(userMessageDiv);
  
      // Clear the input field
      input.value = '';
  
      // Add a typing indicator (optional, can be removed)
      const typingIndicator = document.createElement("div");
      typingIndicator.classList.add("typing-indicator");
      typingIndicator.innerHTML = `
        <span></span><span></span><span></span>
      `;
      chatMessages.appendChild(typingIndicator);
  
      // Scroll to the latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
  
      try {
        const res = await fetch("http://127.0.0.1:5000/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message })
        });
  
        typingIndicator.remove(); // Remove typing indicator when response arrives
  
        if (!res.ok) {
          throw new Error("Failed to connect to backend.");
        }
  
        const data = await res.json();
        const botMessageDiv = document.createElement("div");
        botMessageDiv.classList.add("message", "bot");
        botMessageDiv.innerHTML = `
          <div class="avatar">B</div>
          <div class="message-content">${data.response}</div>
          <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(botMessageDiv);
  
        // Scroll to the latest message
        chatMessages.scrollTop = chatMessages.scrollHeight;
      } catch (err) {
        const errorMessageDiv = document.createElement("div");
        errorMessageDiv.classList.add("message", "bot");
        errorMessageDiv.innerHTML = `
          <div class="avatar">B</div>
          <div class="message-content">Error: ${err.message}</div>
          <div class="message-time">${new Date().toLocaleTimeString()}</div>
        `;
        chatMessages.appendChild(errorMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    });
  });
  