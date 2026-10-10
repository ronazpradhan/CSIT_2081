import { Sem } from "./types";

// Class routine per semester. Empty for now: the "Today's classes" card on the
// homepage stays hidden until a semester has days here.
//
// Format (one entry per day, "a"/"b" are sections, one cell per period):
//   { day: "Mon", a: [[subjects.sem4.OS, "Teacher name"], ...], b: [...] }
// For electives running in the same period, use a list of cells:
//   [[subjects.sem8.DN, "Teacher"], [subjects.sem8.IBM, "Teacher"]]
type RoutineCell = any[];
export type DayRoutine = { day: string; a: RoutineCell[]; b: RoutineCell[] };

export const classRoutine: Record<Sem, DayRoutine[]> = {
  sem1: [],
  sem2: [],
  sem3: [],
  sem4: [],
  sem5: [],
  sem6: [],
  sem7: [],
  sem8: [],
};
