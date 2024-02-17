export type Todo = {
  id: number;
  created_at: string;
  todo: string;
}

export type TodoDB = {
  todo: Todo[];
}