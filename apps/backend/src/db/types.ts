import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role } from "./enums";

export type Assignment = {
    id: Generated<string>;
    title: string;
    description: string;
    datasetUrl: string;
    notebookUrl: string | null;
    testDatasetUrl: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    dueDate: Timestamp;
    teacherId: string;
    classId: string;
};
export type Class = {
    id: Generated<string>;
    name: string;
    inviteCode: string;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type ClassEnrollment = {
    id: Generated<string>;
    userId: string;
    classId: string;
    enrolledAt: Generated<Timestamp>;
};
export type Submission = {
    id: Generated<string>;
    notebookUrl: string;
    outputUrl: string;
    score: number | null;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
    userId: string;
    assignmentId: string;
};
export type User = {
    id: Generated<string>;
    email: string;
    password: string;
    name: string;
    role: Generated<Role>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp;
};
export type DB = {
    Assignment: Assignment;
    Class: Class;
    ClassEnrollment: ClassEnrollment;
    Submission: Submission;
    User: User;
};
