var chats = document.querySelector('.ul');
// const chat = document.createElement('li')
var button = document.querySelector('.button');
// const ip: HTMLElement | null = document.getElementById('ips');
// console.log(ip)
button === null || button === void 0 ? void 0 : button.addEventListener('click', function () {
    var val = document.getElementById('ips');
    var chat = document.createElement('li');
    if (val.value) {
        chat.innerHTML = val.value;
        chats === null || chats === void 0 ? void 0 : chats.appendChild(chat);
        // console.log(val)
        val.value = "";
    }
});
// chat.innerHTML = "Hi there"
// chat.style.listStyleType = 'none'
// chats?.appendChild(chat)
//make this a function
