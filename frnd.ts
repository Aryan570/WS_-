const chats = document.querySelector('.ul');
// const chat = document.createElement('li')
const button: HTMLElement | null = document.querySelector('.button')
// const ip: HTMLElement | null = document.getElementById('ips');
// console.log(ip)
button?.addEventListener('click',()=>{
    let val = (<HTMLInputElement>document.getElementById('ips'));
    const chat = document.createElement('li')
    if(val.value){
        chat.innerHTML = val.value;
        chats?.appendChild(chat);
        // console.log(val)
        val.value = "";
    }
})
// chat.innerHTML = "Hi there"
// chat.style.listStyleType = 'none'
// chats?.appendChild(chat)
//make this a function