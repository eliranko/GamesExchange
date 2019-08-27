"use strict";

var chat;
var isChatOpen;

fetch('chat/chat.html').then(html => chat = html)

function openChat(id) {
    if (chat == undefined || isChatOpen) {
        return;
    }
    isChatOpen = true;
    document.getElementById(id).insertAdjacentHTML('beforeend', chat);
}

function closeChat(id) {
    if (!isChatOpen) {
        return;
    }
    isChatOpen = false;
    var e = document.getElementById(id);
    e.removeChild(e.lastChild);
}