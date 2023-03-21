export type Gender = "F" | "M";

export interface Cat {
  id: number;
  name: string;
  birthdate: Date;
  gender: Gender;
  bio: string;
}
