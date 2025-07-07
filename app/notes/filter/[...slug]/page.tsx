import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import type { NotesResponse } from "@/types/note";

type Props = {
  params: Promise<{ slug?: string[] }>; 
};

export default async function NotesPage({ params }: Props) {
  const { slug } = await params; 
  const perPage = 12;
  const initialPage = 1;
  const initialSearch = "";

  const tag = slug?.[0]; 

  const initialData: NotesResponse = await fetchNotes(
    initialPage,
    initialSearch,
    perPage,
    tag
  );

  return (
    <NotesClient
      initialPage={initialPage}
      initialSearch={initialSearch}
      initialData={initialData}
      initialTag={tag || ""}
    />
  );
}