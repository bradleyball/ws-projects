// const socket = io("http://localhost:9000");
const username = prompt("What is your name?");
const socket = io("http://localhost:9000", {
  query: {
    username: username
  }
});
let nsSocket = "";
socket.on("nsList", nsData => {
  console.log("The list of namespaces has arrived");
  // console.log(nsData);
  let namespacesDiv = document.querySelector(".namespaces");
  namespacesDiv.innerHTML = "";
  nsData.forEach(ns => {
    namespacesDiv.innerHTML += `<div class="namespace" ns=${
      ns.endpoint
    }><img src="${ns.img}"/></div>`;
    console.log(namespacesDiv);
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(i => {
    i.addEventListener("click", e => {
      const nsEndpoint = i.getAttribute("ns");
      joinNs(nsEndpoint);
    });
  });
  joinNs("/wiki");
});
