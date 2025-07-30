const form = document.getElementById('supportForm');
const nameInput = document.getElementById('name');
const messageInput = document.getElementById('message');
const messagesDiv = document.getElementById('messages');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const message = messageInput.value;

  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, message }),
  });

  if (res.ok) {
    nameInput.value = '';
    messageInput.value = '';
    loadMessages();
  }
});

async function loadMessages() {
  const res = await fetch('/api/messages');
  const data = await res.json();

  messagesDiv.innerHTML = data.map(msg => `
    <p><strong>${msg.name}:</strong> ${msg.message}</p>
  `).join('');
}

loadMessages();
