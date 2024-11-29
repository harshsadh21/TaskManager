import { useContext, useRef, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote, user, getUser } = context;
  //
  useEffect(() => {
    getUser();
  }, []);

  console.log(user);
  useEffect(() => {
    getNote();
  }, [user]);

  const refUpdate = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    edueDate: "",
  });
  const updateNote = (currentNote) => {
    refUpdate.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      edueDate: currentNote.dueDate,
    });
  };

  const handleClick = () => {
    console.log("updating the note", note);
    editNote(note.id, note.etitle, note.edescription, note.edueDate);

    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <AddNotes />
      <button
        ref={refUpdate}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Tasks
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="constainer my-3">
                <div className="my-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    placeholder="Title your note"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />

                  <label htmlFor="title" className="form-label">
                    dueDate
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="edueDate"
                    name="edueDate"
                    // placeholder="#"
                    value={note.edueDate}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    rows={3}
                    minLength={5}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3  ml-5 mb-3">
        <h2 className="mb-5 text-white">Your Tasks </h2>
        <div className="container ">
          {notes.length === 0 && <h4>No tasks available </h4>}
        </div>
        {notes &&
          notes.map &&
          notes.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} note={note} />
            );
          })}
      </div>
    </>
  );
};

export default Notes;
