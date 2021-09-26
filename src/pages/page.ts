import { State } from "../state";

let lastState = State.getState();

export function rootPage(params) {
  let lastState = params.lastState;
  lastState = lastState.sort((a, b) => {
    if (a.checked > b.checked) {
      return 1;
    }
    if (a.checked < b.checked) {
      return -1;
    }
    return 0;
  });

  const div = document.createElement("div");
  div.className = "card-box";
  const style = document.createElement("style");
  style.textContent = `
    .card-box{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 20px;
      justify-content: space-around;
    }
  `;

  const lista = lastState.map(
    (item) => `
      <card-note id="${item.id}" checked="${item.checked}">${item.content}</card-note>
  `
  );
  div.innerHTML = lista.join("");
  div.appendChild(style);

  return div;
}

State.suscribe(() => {
  const container = document.querySelector("#root");
  container.firstChild?.remove();
  container.appendChild(rootPage({ lastState: State.getState() }));
});
