const chats = document.querySelector('.ul');
// const chat = document.createElement('li')
const button: HTMLElement | null = document.querySelector('.button')
const clrs = ['red', 'cyan', 'tomato', 'yellow', 'lime', 'blue', 'violet', 'hotpink']
button?.addEventListener('click', () => {
    let val = (<HTMLInputElement>document.getElementById('ips'));
    const chat = document.createElement('li');
    if (val.value) {
        chat.innerHTML = val.value;
        chat.style.color = clrs[Math.floor((Math.random() * 10)) % 8]
        chats?.appendChild(chat);
        val.value = "";
    }
})
const urlString = window.location.href;
const parts = urlString.split(':');
const afterFirstColon = parts.slice(1).join(':');
const socket = new WebSocket(`ws:${afterFirstColon}`);
socket.onopen = () => {
    console.log("Connected with client")
}
socket.onclose = () => {
    console.log("closed")
}
socket.onmessage = (e) =>{
     console.log(`Message Received : ${e.data} `)
}