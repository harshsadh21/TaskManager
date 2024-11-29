import { useState } from "react";
import PropTypes from "prop-types";
import NoteContext from "./noteContext";
import Cookies from "js-cookie";
const NoteState = ({ children }) => {
  const host = "http://localhost:3000";

  const [notes, setnote] = useState([]);
  const [user, setUser] = useState(null);
  const token = Cookies.get("token");
  console.log(token);

  /// grt all note
  const getNote = async () => {
    // console.log("callled get bnote");
    // api call
    const response = await fetch(`${host}/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
    // console.log(json);
    setnote(json);
  };

  const getUser = async () => {
    // console.log("callled get bnote");
    // api call
    const response = await fetch(`${host}/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const json = await response.json();
    // console.log(json);
    setUser(json);
  };

  //Add note

  const addNote = async (title, description, priority, dueDate) => {
    // api call
    const response = await fetch(`${host}/note/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, priority, dueDate }),
    });
    // adding to  client side
    const note = await response.json();
    // console.log(note);
    setnote(notes.concat(note));
  };
  // Delete note
  const deleteNote = async (id) => {
    // add api
    const response = await fetch(`${host}/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    console.log(response.json());

    console.log("deleting a note with id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnote(newNote);
  };

  //edit note
  const editNote = async (id, title, description, dueDate) => {
    // API call
    const response = await fetch(`${host}/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({ title, description, dueDate }),
    });
    const json = await response.json();
    console.log(json);

    /// Logic to edit client side
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].dueDate = dueDate;
        break;
      }
    }
    setnote(newNote);
  };

  // Update note status
  const updateStatus = async (id) => {
    // Call the API to update the status
    const response = await fetch(`${host}/note/updatestatus/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    const updatedNote = await response.json();

    // Update note on client side
    const newNote = notes.map((note) => {
      if (note._id === id) {
        return { ...note, status: updatedNote.status };
      }
      return note;
    });

    setnote(newNote);
  };

  // getNote single

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        editNote,
        getNote,
        getUser,
        user,
        updateStatus,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
NoteState.propTypes = {
  children: PropTypes.node, // or PropTypes.element
};
export default NoteState;
