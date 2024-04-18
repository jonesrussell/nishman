export interface DialogueActor {
  id: number;
  type: string;
  name: {
    first: string;
    last: string;
  };
}

export interface DialogueAnswer {
  id: number;
  emotion: number;
  text: string;
}

export interface Dialogue {
  id: number;
  type: string;
  actorId: number;
  emotion: number;
  text: string;
  answers: {
    answerId: number;
    next: number;
  }[];
}

export interface DialoguesJson {
  actor: DialogueActor[];
  answer: DialogueAnswer[];
  dialog: Dialogue[];
  emotion: string[];
}