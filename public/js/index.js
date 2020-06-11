console.log("CLient Side JS is Loaded");

// Fetch API, it is for client side JS, so we can't use the Fetch API on node side(Server side) and its completely fine, because we are only running this script for browser(client side JS), not for server side
// fetch("http://puzzle.mead.io/puzzle").then((respone) => {
//   respone.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=jaipur").then((response) => {
//   //   console.log("dsd");
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.style.color = "blue";
messageOne.style.fontSize = "1.5rem";
messageTwo.style.fontSize = "1.5rem";

// messageOne.textContent = "From JS";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Preventing page from reloading again and again
  messageOne.style.color = "blue";
  messageTwo.style.color = "black";

  const location = search.value;
  console.log(location);

  //   messageOne.innerHTML = "Loading...";
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //   console.log(data.error);
        messageOne.style.color = "red";
        messageOne.textContent = data.error;
      } else {
        //   console.log(data.location);
        //   console.log(data.forecast);
        messageOne.style.color = "Black";

        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
