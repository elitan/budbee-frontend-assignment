export type Gender = "F" | "M";

export interface Cat {
  id: number;
  name: string;
  birthDate: Date;
  gender: Gender;
}
