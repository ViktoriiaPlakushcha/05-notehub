interface Note {
    id: string,
    title: string,
    content: string,
    tag: string,
}
    
type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo"

interface NewNote {
    title: string,
    content: string,
    tag: NoteTag,
}

export { type Note, type NoteTag, type NewNote };