"use strict";

var chat;
var isChatOpen;
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function () {
    if (this.readyState != XMLHttpRequest.DONE) return;
    if (this.status != 200) return;
    chat = this.responseText;
    // document.querySelector('.app-container > main').innerHTML = this.responseText;
}
httpRequest.open('GET', 'chat/chat.html');
httpRequest.send();

function openChat(id) {
    if (isChatOpen) {
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