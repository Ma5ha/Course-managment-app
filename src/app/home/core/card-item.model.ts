type Person = {
  id: number;
  name: string;
}

export type Student = Person;

export type Teacher = Person;

export class CardItemModel {
  id: number;
  name: string;
  description: string;
  students: Student[];
  teacher: Teacher;
}
