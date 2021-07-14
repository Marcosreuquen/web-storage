/*
    --PAGE--
una page:
que se suscriba al state y escuche sus cambios para imprimir la lista de pendientes respetando lo que el state diga sobre cada uno de ellos. Es decir, si el state dice que está completo, así será considerado.
que escuche el evento del componente que representa al ítem y, al mismo tiempo, escuche si alguien hace click en el checkbox para avisarle al estado que alguien cambió ese ítem.
que, cada vez que el estado cambie la page, se entere y vuelva a imprimir todo el listado de tareas. O sea, que lo que define lo que se ve sea siempre el estado.
*/
import { State } from "../state";

let lastState = State.getState();

export function rootPage(params) {
  const lastState = params.lastState;

  const div = document.createElement("div");
  div.className = "card-box";
  const style = document.createElement("style");
  style.textContent = `
    .card-box{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin: 0 20px;
    }
  `;
  div.appendChild(style);
  lastState.forEach((item) => {
    const card = document.createElement("card-note");
    card.setAttribute("checked", String(item.checked));
    card.setAttribute("id", String(item.id));
    card.textContent = item.content;
    div.appendChild(card);
  });

  return div;
}

State.suscribe(() => {
  if (lastState !== State.getState()) {
    console.log("cambio de estado, salto a /");
    const container = document.querySelector("#root");
    if (container.firstChild) {
      container.firstChild.remove();
    }
    container.appendChild(rootPage({ lastState: State.getState() }));
  }
});
