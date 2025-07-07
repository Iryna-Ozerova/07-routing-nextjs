export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

export type NotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type NotesClientProps = {
  initialPage: number;
  initialSearch: string;
  initialData: NotesResponse;
  initialTag: string;
};