const urlString = window.location.href;
const parts = urlString.split(':');
const afterFirstColon = parts.slice(1).join(':');
const socket = new WebSocket(`ws:${afterFirstColon}`);
socket.onopen = () => {
    console.log("Connected with Server")
    // no_of_connections()
}
socket.onclose = () => {
    console.log("Bye Bye")
}
socket.onmessage = (e) =>{
    //  console.log(`Message Received : ${e.data} `)
    const check = JSON.parse(e.data)
    // console.log(typeof e.data,check)
    if(check[0] === 'message') broadcast_from_server(check[1])
    else no_of_connections(check[1]);
}
const chats = document.querySelector('.ul');
// const chat = document.createElement('li')
const button: HTMLElement | null = document.querySelector('.button')
const clrs = ['red', 'cyan', 'tomato', 'lime', 'blue', 'violet', 'hotpink']
button?.addEventListener('click', () => {
    append_to_list();
})
function append_to_list(){
    let val = (<HTMLInputElement>document.getElementById('ips'));
    let username = (<HTMLInputElement>document.getElementById('username'))
    // const chat = document.createElement('li');
    if (val.value && username.value) {
        // chat.innerHTML = `${username.value} - ${val.value}`;
        // chat.style.color = clrs[Math.floor((Math.random() * 10)) % 8]
        // chats?.appendChild(chat);
        socket.send(`${username.value} - ${val.value}`)
        val.value = "";
    }
}
function broadcast_from_server(message :string){
    // let val = (<HTMLInputElement>document.getElementById('ips'));
    const chat = document.createElement('li');
    chat.innerHTML = message;
    chat.style.color = clrs[Math.floor((Math.random() * 10)) % 7]
    chats?.appendChild(chat);

}
function no_of_connections(num : string){
    let node = document.getElementById('connec');
    let innerTxt = node?.innerHTML;
    innerTxt = `Connected : ${num}`
    node!.innerHTML = innerTxt
}
/*Next task -- 
 1.Make the function of the above addition of node li, so that socket.message can be called with that too. ✔
 2. Broadcast the chat message to all the client except the client that sent the message ✔

*/