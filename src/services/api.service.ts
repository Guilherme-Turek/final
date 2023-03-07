import axios, { AxiosResponse } from "axios";
import { CreateNote } from "../store/modules/noteSlice";

const api = axios.create({
  baseURL: "https://guilhermeturek-api-notes.onrender.com",
});

export interface ApiResponse {
  ok: boolean;
  message: string;
}

export type BaseOkResponse = {
  ok: boolean;
  message: string;
};

export type User = {
  _id: string;
  _username: string;
  _password: string;
  _notes: Note[];
};

export type Note = {
  _id: string;
  _title: string;
  _content: string;
  _status: string;
};

type UserRegister = {
  username: string;
  password: string;
  confirmPassword: string;
};

export type UserLoginType = {
  username: string;
  password: string;
};

export const createUser = async (user: UserRegister): Promise<ApiResponse> => {
  try {
    const result: AxiosResponse<BaseOkResponse & { data: User }> =
      await api.post("/users", user);
    return result.data;
  } catch (error: any) {
    const result = error.request.response;
    return JSON.parse(result);
  }
};

export const userLogin = async (
  user: UserLoginType
): Promise<ApiResponse & { data: User }> => {
  try {
    const result: AxiosResponse<BaseOkResponse & { data: User }> =
      await api.post("/login", user);
    return result.data;
  } catch (error: any) {
    const result = error.request.response;
    return JSON.parse(result);
  }
};

export const listNotes = async (
  id: string
): Promise<ApiResponse & { data: Note[] }> => {
  try {
    const result: AxiosResponse<BaseOkResponse & { data: Note[] }> =
      await api.get(`/${id}/notes`);
    return result.data;
  } catch (error: any) {
    const result = error.request.response;
    return JSON.parse(result);
  }
};

export const createNote = async (
  id: string,
  note: CreateNote
): Promise<ApiResponse & { data: Note }> => {
  try {
    const result: AxiosResponse<BaseOkResponse & { data: Note }> =
      await api.post(`/${id}/notes`, note);

    return result.data;
  } catch (error: any) {
    const result = error.request.response;
    return JSON.parse(result);
  }
};

export const deleteNote = async (
  id: string,
  noteId: string
): Promise<ApiResponse> => {
  try {
    const result: AxiosResponse<BaseOkResponse & { data: Note[] }> =
      await api.delete(`/${id}/notes/${noteId}`);
    console.log(`Apagou a nota ${noteId} do usuario ${id}`);

    return result.data;
  } catch (error: any) {
    const result = error.request.response;
    return JSON.parse(result);
  }
};

export type UptadeNoteProps = {
  id: string;
  noteId: string;
  title?: string;
  content?: string;
  status?: string;
};

export const UptadeNote = async (
  note: UptadeNoteProps
): Promise<ApiResponse & { data: Note }> => {
  try {
    const result: AxiosResponse<BaseOkResponse & { data: Note }> =
      await api.put(`/${note.id}/notes/${note.id}`, note);
    return result.data;
  } catch (error: any) {
    const result = error.request.response;
    return JSON.parse(result);
  }
};
