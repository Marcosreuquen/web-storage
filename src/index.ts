// --MAIN SCRIPT--
import { State } from "./state";
import { initCardComponent } from "./components/cards";
import { initRouter } from "./router";

(function () {
  initRouter(document.querySelector("#root"));
  initCardComponent();

  document.querySelector(".form-new-note").addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target[0].value;
    State.addNewNote(value);
    e.target[0].value = "";
  });
})();
