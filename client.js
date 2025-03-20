const socket = io("http://localhost:8000");

const name = prompt("Enter your name");

socket.emit("user-joined", name);

socket.on("new-user-joined", (name) => {
  if (name) generateMessage("center", `${name} joined the chat`);
});

const first = document.querySelector(".first");
function generateMessage(side, message) {
  var div = document.createElement("div");
  div.classList.add("alert");
  div.innerHTML = message;

  if (side == "left") div.classList.add("alert-primary");
  else if (side == "right") div.classList.add("alert-danger");
  else div.classList.add("alert-secondary");

  first.appendChild(div);
}


function sendMessage(){
    let input =document.getElementById("message")
    generateMessage("right",`${input.value}:you`)
    socket.emit("send",input.value)
    input.value =" "
}

socket.on("receive",({name,message})=>{
    generateMessage("left",`${name}:${message}`)
})

socket.on("user-left",(name)=>{
    if (name)
        generateMessage("center",`${name} left the chat`)
})