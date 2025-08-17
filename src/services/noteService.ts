import { type Note, type NoteTag, type NewNote } from "../types/note";
import axios from "axios";

const myKey = import.meta.env.VITE_NOTEHUB_TOKEN

interface FetchNotesProps {
    query?: string,
    tag?: NoteTag,
    currentPage: number,
    perPage?: number,
    
}

interface FetchNotesResp {
    notes: Note[],
    totalPages: number,
}


async function fetchNotes({ query, currentPage, tag}: FetchNotesProps): Promise<FetchNotesResp> {
    const response = await axios.get<FetchNotesResp>('https://notehub-public.goit.study/api/notes?', {
        params: {
            search: query,
            tag: tag,
            page: currentPage,
            perPage: 12,
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return response.data;
}

async function deleteNote(id: string) {
    const deleteResponse = await axios.delete(`https://notehub-public.goit.study/api/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    })
    return deleteResponse.data;
}

async function createNote(newNote: NewNote) {
    const createResponse = await axios.post('https://notehub-public.goit.study/api/notes', newNote, {
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
    return createResponse.data;
}

export { fetchNotes, deleteNote, createNote};