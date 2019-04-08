const socket = io("http://localhost:9000");

socket.on("nsList", nsData => {
  console.log("The list of namespaces has arrived");
  // console.log(nsData);
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
  joinNs("/wiki");
});
