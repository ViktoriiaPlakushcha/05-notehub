import { useState, useEffect } from "react";
import css from "./App.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";
import Message from "../Message/Message";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const showMessage = (
    text: string,
    type: "success" | "error" | "info" = "info",
    duration = 3000
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), duration);
  };

  const { data, isFetching, isError } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes({ query: searchQuery, currentPage }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (searchQuery.length > 0 && data?.notes.length === 0) {
      showMessage("No notes match your search.");
    }
  }, [data, searchQuery]);
  useEffect(() => {
    if (isError) {
      showMessage("Oops, something went wrong! Try again later.", "error");
    }
  }, [isError]);

  const handleOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          {<SearchBox updateSearch={updateSearchQuery} />}
          {data && data.totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPage={data.totalPages}
              onChange={setCurrentPage}
            />
          )}
          {
            <button className={css.button} onClick={handleOpen}>
              Create note +
            </button>
          }
        </header>
        {isFetching && <Loader />}
        {message && (
          <Message messageToShow={message.text} type={message.type} />
        )}
        <NoteList notes={data?.notes ?? []} showMessage={showMessage} />
        {isModalOpen && (
          <Modal onClose={handleClose}>
            <NoteForm onClose={handleClose} showMessage={showMessage} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
