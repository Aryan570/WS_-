// const urlString = window.location.href;
// const parts = urlString.split(':');
// const afterFirstColon = parts.slice(1).join(':');
var socket = new WebSocket("wss://silly-luisa-aryan570.koyeb.app");
socket.onopen = function () {
    console.log("Connected with Server");
};
socket.onclose = function () {
    console.log("Bye Bye");
};
socket.onmessage = function (e) {
    var check = JSON.parse(e.data);
    if (check[0] === 'message')
        broadcast_from_server(check[1]);
    else
        no_of_connections(check[1]);
};
var chats = document.querySelector('.ul');
var button = document.querySelector('.button');
var clrs = ['red', 'cyan', 'tomato', 'lime', 'blue', 'violet', 'hotpink'];
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    append_to_list();
});
function append_to_list() {
    var val = document.getElementById('ips');
    var username = document.getElementById('username');
    if (val.value && username.value) {
        socket.send("".concat(username.value, " - ").concat(val.value));
        val.value = "";
    }
}
function broadcast_from_server(message) {
    var chat = document.createElement('li');
    chat.innerHTML = message;
    chat.style.color = clrs[Math.floor((Math.random() * 10)) % 7];
    chats === null || chats === void 0 ? void 0 : chats.appendChild(chat);
}
function no_of_connections(num) {
    var node = document.getElementById('connec');
    var innerTxt = node === null || node === void 0 ? void 0 : node.innerHTML;
    innerTxt = "Connected : ".concat(num);
    node.innerHTML = innerTxt;
}
/*Next task --
 1.Make the function of the above addition of node li, so that socket.message can be called with that too. ✔
 2. Broadcast the chat message to all the client except the client that sent the message ✔
*/ 
