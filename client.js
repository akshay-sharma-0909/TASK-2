const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('Tone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);  // Use 'position' instead of 'position' as class name
    messageContainer.append(messageElement);
    if (position === 'left') {
        audio.play();   
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');  // Fix string interpolation
    socket.emit('send', message);
    messageInput.value = '';
});

let name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');  // Fix string interpolation and correct class
});

socket.on('receive', data => {
    append(`${data.user}: ${data.message}`, 'left');  // Fix string interpolation and proper access to data
});

socket.on('left', name => {
    append(`${ data.name} left the chat`, 'left');  // Correct event name from 'leave' to 'left'
});
