import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NoteList from "./componenets/NoteList";
import AddNote from "./componenets/AddNode";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Fetch notes from the server
    axios
      .get("https://mern-notes-app-backend.vercel.app//api/notes")
      .then((response) => setNotes(response.data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleAddNote = () => {
    // Add a new note to the server
    axios
      .post("https://mern-notes-app-backend.vercel.app/api/notes", {
        title,
        content,
      })
      .then((response) => {
        setNotes([...notes, response.data]);
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error("Error adding note:", error));
  };
  const handleEditNote = (id, updatedTitle, updatedContent) => {
    // Update note by ID
    axios
      .put(`https://mern-notes-app-backend.vercel.app/api/notes/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      })
      .then((response) => {
        const updatedNotes = notes.map((note) =>
          note._id === id ? response.data : note
        );
        setNotes(updatedNotes);
      })
      .catch((error) => console.error("Error updating note:", error));
  };

  const handleDeleteNote = (id) => {
    // Delete note by ID
    axios
      .delete(`https://mern-notes-app-backend.vercel.app/api/notes/${id}`)
      .then((response) => {
        const updatedNotes = notes.filter((note) => note._id !== id);
        setNotes(updatedNotes);
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="app-container">
      <h1>Notes App</h1>
      <AddNote
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        onAddNote={handleAddNote}
      />
      <NoteList
        notes={notes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
      />
    </div>
  );
};

export default App;
