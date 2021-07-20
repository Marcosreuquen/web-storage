import { State } from "../../state";
const trash = require("url:../../assets/delete.svg");

export function initCardComponent() {
  class Card extends HTMLElement {
    //Shadow DOM
    shadow: any = this.attachShadow({ mode: "open" });
    card: Element;

    constructor() {
      super();
      this.render();

      //Estilos
      var style = document.createElement("style");
      style.textContent = `
      *{
        box-sizing:border-box;
      }
      .card{
        background-color: #FFF599;
        display: flex;
        height: auto;
        min-height: 211px;
        width: 311px;
        border-radius: 8px;
        padding: 22px 13px;
        margin: 20px 6px;
        box-shadow: 2px 2px 5px #444444ee;
      }
      .card:hover{
        cursor:pointer;
      }
      .card-active{
        border: 3px solid #000;
      }
      .card__text{
        flex-grow:1;
      }
      .task-done{
        text-decoration:line-through;
      }
      .card__functions{
        display:flex;
        flex-direction: column;
        justify-content: space-around;
      }
      .card__checkbox, .card__trash{
        width: 21px;
        height: 21px;
      }
      .card__trash {
        display: none;
      }
      .show-trash{
        display:block;
      }
      `;
      this.shadow.appendChild(style);
    }

    render() {
      const card = document.createElement("div");

      const shadow = this.shadow;
      const text = this.textContent;
      const id = this.getAttribute("id");
      const check = this.getAttribute("checked");

      let checkAttribute: string;
      if (check == "true") {
        checkAttribute = "checked";
      } else {
        checkAttribute = "none";
      }

      card.classList.add("card");
      card.setAttribute("id", id);

      //Content
      card.innerHTML = `
      <p class="card__text">${text}</p>
        <div class="card__functions">
        <input class="card__checkbox" type="checkbox" ${checkAttribute}>
        <div class="card__trash">
          <img src=${trash}>
        </div>
        </div>
        `;

      const checkbox = card.querySelector(".card__checkbox");

      if (check === "true") {
        card.querySelector(".card__text").classList.add("task-done");
      } else if (check === "false") {
        card.querySelector(".card__text").classList.remove("task-done");
      }

      checkbox.addEventListener("change", function (e) {
        card.querySelector(".card__text").classList.toggle("task-done");
        State.checkedNote(Number(id), this.checked);
      });

      card.addEventListener("click", (e) => {
        card.querySelector(".card__trash").classList.toggle("show-trash");
        card.classList.toggle("card-active");
      });

      card.querySelector(".card__trash").addEventListener("click", () => {
        State.deleteNote(Number(id));
      });

      shadow.appendChild(card);
    }
  }
  customElements.define("card-note", Card);
}
