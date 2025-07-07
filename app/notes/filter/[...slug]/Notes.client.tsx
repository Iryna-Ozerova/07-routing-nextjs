"use client";

import { useState } from "react";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";

import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";

import type { NotesResponse, NotesClientProps } from "@/types/note";
import css from "./NotesPage.module.css";


export default function NotesClient({
  initialPage,
  initialSearch,
  initialData,
  initialTag
}: NotesClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const selectedTag = initialTag;
  const [debounceSearchTerm] = useDebounce(searchTerm, 1000);
  const perPage = 12;

  const { data } = useQuery<NotesResponse>({
    queryKey: ["notes", debounceSearchTerm, currentPage, selectedTag],
    queryFn: () => fetchNotes(currentPage, debounceSearchTerm, perPage, selectedTag),
    placeholderData: keepPreviousData,
    initialData:
      currentPage === initialPage && debounceSearchTerm === initialSearch
        ? initialData
        : undefined,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (newTerm: string) => {
    setSearchTerm(newTerm);
    setCurrentPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            pageCount={data.totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {data && <NoteList notes={data.notes} />}
      {isModalOpen && (
          <Modal onClose={closeModal}>
    <NoteForm onClose={closeModal} onSuccess={closeModal} />
  </Modal>
      )}
    </div>
  );
}