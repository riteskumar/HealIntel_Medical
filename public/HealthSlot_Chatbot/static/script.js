document.getElementById('chat-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the traditional way

    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    
    // Append user's message to chat
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    
    // Send message to the server
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `message=${encodeURIComponent(message)}`,
    })
    .then(response => response.json())
    .then(data => {
        // Append chatbot's response to chat
        chatBox.innerHTML += `<div><strong>Bot:</strong> ${data.response}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    });

    messageInput.value = ''; // Clear input
});
