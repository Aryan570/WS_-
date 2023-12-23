const chats = document.querySelector('.ul');
// const chat = document.createElement('li')
const button: HTMLElement | null = document.querySelector('.button')
// const ip: HTMLElement | null = document.getElementById('ips');
// console.log(ip)
const clrs = ['red', 'cyan', 'tomato', 'yellow', 'lime', 'blue', 'violet', 'hotpink']
button?.addEventListener('click', () => {
    let val = (<HTMLInputElement>document.getElementById('ips'));
    const chat = document.createElement('li')
    if (val.value) {
        chat.innerHTML = val.value;
        chat.style.color = clrs[Math.floor((Math.random() * 10)) % 8]
        chats?.appendChild(chat);
        // console.log(val)
        val.value = "";
    }
})
// chat.innerHTML = "Hi there"
// chat.style.listStyleType = 'none'
// chats?.appendChild(chat)
//make this a function
// Create WebSocket connection.
const urlString = window.location.href;
const parts = urlString.split(':');
const afterFirstColon = parts.slice(1).join(':');
// console.log(afterFirstColon);
const socket = new WebSocket(`ws:${afterFirstColon}`);
socket.onopen = () => {
    console.log("Connected with client")
}
socket.onclose = () => {
    console.log("closed")
}