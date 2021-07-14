import { State } from "../../state";

/*
--COMPONENTE--

un componente <todo-item> (o el nombre que quieras):
que reciba atributos como text, checked, o los que se te ocurran, para mostrar la card amarilla correspondiente a cada pendiente con la data que corresponda.
que emita un evento (leer custom events) para que la page se entere de que algo cambió.
*/
export function initCardComponent() {
  class Card extends HTMLElement {
    //Shadow DOM
    shadow: any = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      State.suscribe(() => {
        console.log("Renderizando componente...");
        this.render();
      });
    }

    render() {
      //variables previas a la llamada
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
        width: 311px;
        border-radius: 4px;
        padding: 22px 13px;
        margin: 20px 6px;
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
      //Content
      shadow.innerHTML = `
      <div class="card" id="${id}">
        <p class="card__text">${text}</p>
        <div class="card__functions">
          <input class="card__checkbox" type="checkbox" ${checkAttribute}>
          <div class="card__trash">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="22" height="22" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0" transform="scale(0.00195312)"/>
            </pattern>
            <image id="image0" width="512" height="512" xlink:href="data:image/png;base64,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SeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQJKkDhkAJEnqkAFAkqQOGQAkSeqQAUCSpA4ZACRJ6pABQFN0ecGxE7ii4PglXQHcWnD8kse9tNK9f6fw+NLoDACaotMKjv3NzLyq4PjFLPo+u2CJkse9tNK9f6Xw+NLoDACaolMnOnYNJSeiyR6bzLwYuKhgCQOAJscAoCkq+W1uyt9yoexENPVjU6r/yzPzvwuNLRVjANAUnQX8oNDYJxcat5YvFxr3WuDrhcaupdTvduqfGXXKAKDJycxbgdcUGPqfMvNfCoxbTWaeCnyswNCvzcybCoxb0zuAC0ce8ybgtSOPKVVhANBU/QVwwojjXQm8ZMTxWvp1xr0r/UTgbSOO10Rmfh84ZORh35CZ/zbymFIVBgBNUmYmw8n86pGGPHRxo9jkZeZ3gN8YabhrgBcvVl0mLzP/GXjnSMOdAfzxSGNJ1RkANFmZeR7Dt921XZp+X2Z+eO07Wh6Z+VHWfqK7Cfj1zDx3hJaWyWGs/RMNlwEvnMFlEXXMAKBJW0zcuzF8G7urvgsclJljLwsvhcz8DeBA1uxywBnAbpn5oXG7ai8zrwEeC/wf1iw8/iOwc2ZO/aZIdc4AoMnLzK8CuwN/CNy8wj/2KYaT+N8Xa2wJLFYCdmblNwbezHAcd18c11nKzJsz83UMn5uvrfCPXQ78bGY+PzOnvCuiBEAMl1K1tiKi6IHMzCg5/lxExPbAE4BdgF2BRwIbAP/J8Bz4acApmdndxi0RsQuwBz86NjsBNzB82z+V4dic1Nsz7RGxPrAnPzouuwLbM6ycnMaPjs0XMvPKVn1ORUTszbg36K7uC5m5d8Hxu2EAGIkBYDlFxDrA3TLz+ta9LJuI2BC4cS43+I0pIjbOzGtb9zFFBoDpWK91A1JJi8nNyf92GIrumJO/euA9AJIkdcgAIElShwwAkiR1yAAgSVKHDACSJHXIACBJUocMAJIkdcgAIElShwwAkiR1yAAgSZoS968fiQFgPEW3VY2Ie5QcX5JGUvpc5RbWIzEAjOfqwuNvWXh8SRpD6XNV6XNtNwwA4yn9obxP4fElaQylz1UGgJEYAMZjAJCk8ueqqwqP3w0DwHhKfyi9BCBpCrwEMBEGgPG4AiBJXgKYDAPAeK4sPL4rAJKmoPS5qvS5thsGgPGcW3h8VwAkTUHpc1Xpc203DADj+a/C4+9ceHxJWisRsSVw78JlSp9ru2EAGM85hcffMSK2LVxDktbG0wuPfzNwfuEa3TAAjKd0AAB4RoUakrSmSp+jvpWZNxeu0Q0DwHguBG4oXKN0upakNRIRATytcBmX/0dkABhJZiblVwGeGhH+ziQto0dS/gZAA8CInEzGdUrh8e8J7Fa4hiStiRorlKXPsV0xAIzrpAo1vA9A0jKqcW6qcY7thgFgXDU+nM+qUEOSVmzxuvLHFy5zSWbWuNm6GwaAEWXm2cDlhcvsERGPLVxDku6K3wTuVrjGvxQevzsGgPHV+JD+XoUaknSnImJj4OUVSrn8PzIDwPiqXAaIiEdXqCNJd+ZXgZ+oUMcAMLIYnl7TWCLiocBZFUp9PDMPqFBHkm5XRGzIsDf/1oVLXQzcLzNvLVynK64AjGxxH8DXKpR6bkQ8rEIdSbojh1B+8gc40sl/fAaAMv6xQo0AXlOhjiT9mIhYH3hlpXI1zqndMQCU8Q+V6jw/Ih5RqZYkrerXgO0q1LkUOLFCne4YAArIzG8AX61Qah3gIxGxSYVakgRARPwU8OZK5Vz+L8QAUE6tVYCHAn9ZqZakzi2+cHwE2KhSSZf/C/EpgEIiYiuG91aX3hzjNi/OzA9UqiWpUxHxPuDFlcqdBeyUTlRFuAJQSGZeAhxRseRfRMSOFetJ6kxEHEy9yR/grU7+5bgCUFBEPBL4t4olvw7skZnXVawpqQOLPU5OA2rdc3Q5sG1mXl+pXndcASgoM88ATqhY8qeA90bEehVrSpq5iLgP8DHqTf4Af+nkX5YrAIVFxLOBT1Uu+0/A8zPz2sp1Jc1MRDwA+AzwoIplbwC2y8zLKtbsjisA5R0NnFm55r7AcRGxReW6kmZk8c6Rf6Xu5A/wfif/8lwBqCAi9gOOalD6LGCfzDy/QW1JExYRTwWOBDatXPpq4MGLG6lVkCsAFWTm0cDxDUrvAPzrYtMOSVqRiPh5hkuJtSd/gD9x8q/DFYBKFk8EnEab0PV94HeA97ijlqQ7EhGbAn8AvILhfSO1fRt4iPcv1eEKQCWLJwI+2Kj8ZsC7gFMi4jGNepC0pGJwMPAN4LdoM/kDvMbJvx5XACqKiG0Y/oJt3LCNZAgir8zMSxv2IWkJRMSjgHcAj2vcyr8Bu7pKWY8rABVl5reBwxq3EcCLgG9ExMsjotZWxZKWSETcOyLeCZxK+8n/RuAQJ/+6XAFoICKOAZ7Zuo+F7wGfYHh50ecy86bG/UgqJCI2A54LHAg8jXrvKrkzr8rMWm8X1IIBoIHFi4K+Dty7dS+ruZIfhYHjDAPS9C0m/f0ZJv2nszyT/m2+CDzJb//1GQAaiYjnMTxju6y+y/DUwoW395OZ323Ym6SFiFgH2BK43+38bAvswfJN+rf5AfBw9yppwwDQUES8FzikdR9r6CbAxC61tx6wbusm1tALM/NDuBbsbwAAApNJREFUrZvolQGgoYjYkOFlQT6aJ6k3b8vMl7duomcGgMYi4ieAk4HtW/ciSZV8Cnie1/3bMgAsgYjYkeGFG5u37kWSCjsd2DMzr2ndSO/cB2AJZOaZwE8zXFeXpLm6ANjPyX85GACWRGYeD/wS3lgnaZ6uAPbNzItbN6KBAWCJLO6G/QXg5ta9SNKILgH2zsyvt25EP+I9AEsoIvZn2IxnWZ/dlaSVugB4SmZ+s3Uj+p8MAEsqIp4BfBzYqHUvkrSGzmWY/M9r3Yh+nJcAllRmfgbYh2Gvfkmamn8Hnujkv7wMAEssM78I7AKc0boXSboL/h54TGZe1LoR3TEDwJLLzHOBxwLvb9yKJN2Zm4BDM/MgH/Vbft4DMCER8RLg7cAGrXuRpNV8GzgwM7/UuhGtjCsAE5KZ7wYeB3y1dS+StIojgUc7+U+LAWBiMvN0YFfgMMAlNkktXQA8JzN/OjMva92M7hovAUxYRNwfeAewX+teJHXlFobLka/NzKtbN6M1YwCYgYg4AHgD8NDWvUiavc8Dv52Zp7VuRGvHSwAzkJlHAjsxbCN8VuN2JM3TCcBemfkkJ/95cAVgZiJiHeBngdcCOzZuR9L0HQe8LjNPbN2IxmUAmKlFEHgm8IvAs/G9ApJW7krgCOB9mfmV1s2oDANAByJiC+Ag4MXAo9t2I2lJ3QJ8lmHTsU9m5g1t21FpBoDORMTDGFYGngI8AdikbUeSGroMOH7xc3RmXty4H1VkAOhYRKwPPAZ4MrAXsDNwn6ZNSSolgfMZNhI7ATguM/+9bUtqyQCg/yEi7gXssPjZEXgQsBmwKXCPxT83ZVg5iEZtSvqRW4CrgR8AV63ycwVwNnAmw9NBZ2fmda2a1PL5f8JrFglZBPZsAAAAAElFTkSuQmCC"/>
            </defs>
            </svg>
          </div>
        </div>
      </div>
      `;

      shadow.appendChild(style);

      const checkbox = shadow.querySelector(".card__checkbox");
      if (check === "true") {
        shadow.querySelector(".card__text").classList.add("task-done");
      } else if (check === "false") {
        shadow.querySelector(".card__text").classList.remove("task-done");
      }

      checkbox.addEventListener("change", function (e) {
        console.log("checking note...");
        shadow.querySelector(".card__text").classList.toggle("task-done");
        State.checkedNote(Number(id), this.checked);
        console.log(this.checked);
      });

      shadow.addEventListener("click", (e) => {
        console.log("Activando nota...");
        shadow.querySelector(".card__trash").classList.toggle("show-trash");
        shadow.querySelector(".card").classList.toggle("card-active");
      });

      shadow.querySelector(".card__trash").addEventListener("click", () => {
        console.log("Eliminado");
        State.deleteNote(Number(id));
      });
    }
  }
  customElements.define("card-note", Card);
}
