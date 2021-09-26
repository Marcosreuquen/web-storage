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
    return this.data;
  },

  setState(data: Notes[]) {
    this.data = data;
    localStorage.setItem("notes", JSON.stringify(this.data));

    for (const cb of this.listeners) {
      cb();
    }
  },

  addNewNote(content: string) {
    const note = new Notes(content, this.idGen());
    const data = this.getState();
    data.push(note);
    this.setState(data);
  },

  deleteNote(id: number) {
    const newState = this.getState().filter((item) => item.id !== id);
    this.setState(newState);
  },

  checkedNote(id: number, value: boolean) {
    const lastState = this.data.filter((item) => item.id !== id);
    let checkedNote = this.data.find((item) => item.id === id);
    checkedNote.checked = value;
    const newState = lastState.concat(checkedNote);
    this.setState(newState);
  },

  idGen() {
    let id: number;
    if (this.getState().length < 1) {
      id = 1;
    } else {
      let idValues: number[] = this.getState().map((item) => item.id);
      const max = Math.max(...idValues);
      id = max + 1;
    }
    if (this.getState().map((item) => item.id === id)) {
      id++;
    }
    return id;
  },

  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { State };
