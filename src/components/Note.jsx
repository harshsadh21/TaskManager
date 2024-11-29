// import React from 'react'

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoArrowBack } from "react-icons/io5";
const token = Cookies.get("token");
import { useNavigate } from "react-router-dom";

const Note = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  let navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/note/notesDetails/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        const json = await response.json();
        setNote(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div>
      <span className="mt-2">
        <IoArrowBack size="2.3rem" color="#fff" onClick={handleBack} />
      </span>
      {note ? (
        <div className="text-white mt-5">
          <h2 className="d-flex justify-content-center">{note.title}</h2>
          <p className="mt-5">
            <h5>Description:</h5>
            {note.description}
          </p>
          <p>
            <h4>Due date</h4>
            {new Date(note.dueDate).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Loading note details...</p>
      )}
    </div>
  );
};

export default Note;
