const socket = io("http://localhost:9000");

socket.on("nsList", nsData => {
  console.log("The list of namespaces has arrived");
  console.log(nsData);
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace ns=${
      ns.endpoint
    }"><img src="${ns.img}"/></div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(i => {
    i.addEventListener("click", e => {
      const nsEndpoint = i.getAttribute("ns");
      console.log(`${nsEndpoint} I should go to now`);
    });
  });
});

socket.on("messageFromServer", dataFromServer => {
  console.log(dataFromServer);
  socket.emit("messageToServer", { data: "Data from client" });
});

document.querySelector("#message-form").addEventListener("submit", event => {
  event.preventDefault();
  const newMessage = document.querySelector("#user-message").value;
  socket.emit("newMessageToServer", { text: newMessage });
});

socket.on("messageToClients", msg => {
  console.log(msg);
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
