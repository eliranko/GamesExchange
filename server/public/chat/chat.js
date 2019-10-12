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

        let id = participantPrefix + chat.userId;
        clonedParticipant.id = id; // Set id

        clonedParticipant.querySelector("span:first-of-type").classList
            .add(chat.online ? "sidebar-chat-online-dot" : "sidebar-chat-offline-dot"); // Set connectivity dot

        let button = clonedParticipant.querySelector(".sidebar-start-chat-btn");
        button.addEventListener("click", () => openChat(id)); // Set event
        button.textContent = chat.userName; // Set participant name

        clonedParticipant.querySelector(".sidebar-chat-notif").textContent = chat.unreadMessages; // Set notification

        parent.appendChild(clonedParticipant);
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
    for(let msg of data.chatHistory) {
        let p = document.createElement("p");
        p.classList.add("msg");
        p.classList.add(msg.sender ? "him" : "you");
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