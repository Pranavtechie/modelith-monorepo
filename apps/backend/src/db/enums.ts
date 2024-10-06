export const Role = {
    STUDENT: "STUDENT",
    TEACHER: "TEACHER"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
