/*

--STATE--

con métodos para acceder y para ser escrito.
con la información de todas las tareas y sus distintas variaciones (si están completadas o si están borradas).
que sea el lugar donde se sincroniza el state con localstorage.
Tip: para que sea más fácil, tenés que usar un id en cada pendiente.

*/
class Notes {
  id: number;
  content: string;
  checked: boolean;
  constructor(content: string, id: number) {
    this.id = id;
    this.content = content;
    this.checked = false;
  }
}

const State = {
  data: JSON.parse(localStorage.getItem("notes")) || [],
  listeners: [],

  getState(): Notes[] {
    console.log("obteniendo datos del estado...");
    return this.data;
  },

  setState(data: Notes[]) {
    console.log("Se ha agregado un nuevo estado");
    this.data = data;
    localStorage.setItem("notes", JSON.stringify(this.data));
    for (const cb of this.listeners) {
      cb();
    }
  },

  addNewNote(content: string) {
    console.log("Se agregó una nota");
    const note = new Notes(content, this.idGen());
    const data = this.getState();
    data.push(note);
    this.setState(data);
  },

  deleteNote(id: number) {
    console.log("Se eliminó la nota con id: ", id);
    const newState = this.getState().filter((item) => item.id !== id);
    this.setState(newState);
  },

  checkedNote(id: number, value: boolean) {
    console.log("Nota chequeada: ", id);
    const lastState = this.getState().filter((item) => item.id === id);
    let checkedNote = this.getState().find((item) => item.id === id);
    checkedNote.checked = value;
    const newState = lastState.concat(checkedNote);
    this.setState(newState);
  },

  idGen() {
    console.log("Generando ID para su nueva nota...");
    if (this.getState().length < 1) {
      return 1;
    } else {
      let idValues: number[] = this.getState().map((item) => item.id);
      const max = Math.max(...idValues);
      return max + 1;
    }
  },

  suscribe(callback: () => {}) {
    console.log("Añadiendo nuevo callback al state: ", callback);
    this.listeners.push(callback);
  },
};

export { State };
