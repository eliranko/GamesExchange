"use strict";
const participantPrefix = "chat-participant-";
const messages = new Map();
let chatHtml, isChatOpen;

Promise.all([fetch('chat/chat.html'), fetch('chat/participant.html'),
fetch('/api/chat')]).then(values => {
    chatHtml = stringToHtmlElement(values[0]);
    let participantHtml = stringToHtmlElement(values[1]);
    let parent = document.querySelector(".sidebar-chat-container ul");

    // Add participant to view
    for (let chat of JSON.parse(values[2])) {
        // Build HTML
        let clonedParticipant = participantHtml.cloneNode(true);

        let id = participantPrefix + chat.usersId.join('-');
        clonedParticipant.id = id; // Set id
        let button = clonedParticipant.querySelector(".sidebar-start-chat-btn");
        button.addEventListener("click", () => openChat(id)); // Set event
        clonedParticipant.querySelector(".sidebar-chat-notif").textContent = chat.unreadMessages; // Set notification


        fetch('/api/user/' + (chat.usersId[0] == '1' ? chat.usersId[1] : chat.usersId[0]))
            .then(data => { // TODO: Use real user once authentication is established
                data = JSON.parse(data);
                clonedParticipant.querySelector("span:first-of-type").classList
                    .add(data.online ? "sidebar-chat-online-dot" : "sidebar-chat-offline-dot"); // Set connectivity dot
                button.textContent = data.name; // Set participant name

                parent.appendChild(clonedParticipant);
            });
        messages.set(id, chat);
    }
});

function openChat(id) {
    if (isChatOpen) {
        return;
    }
    isChatOpen = true;

    // Build HTML
    let clonedChat = chatHtml.cloneNode(true);
    let data = messages.get(id);
    // Set Header
    clonedChat.querySelector("header p").textContent = data.userName;
    clonedChat.querySelector("header button").addEventListener("click", () => closeChat(id));
    // Set messages
    let msgContainer = clonedChat.querySelector(".chat-msgs");
    for (let msg of data.chatHistory) {
        let p = document.createElement("p");
        p.classList.add("msg");
        p.classList.add(msg.userId == '1' ? "me" : "him");
        p.textContent = msg.message;
        msgContainer.appendChild(p);
    }

    document.getElementById(id).appendChild(clonedChat);
}

function closeChat(id) {
    if (!isChatOpen) {
        return;
    }
    isChatOpen = false;
    var e = document.getElementById(id);
    e.removeChild(e.lastChild);
}