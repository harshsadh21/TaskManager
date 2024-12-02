import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { GrFormNextLink } from "react-icons/gr";
import { TiTick } from "react-icons/ti";

const Noteitem = ({ updateNote, note }) => {
  const context = useContext(noteContext);
  const { deleteNote, updateStatus } = context;
  let navigate = useNavigate();

  // console.log(note._id);
  const handleArrowClick = () => {
    navigate(`/note/${note._id}`); // Navigate to the detail page
  };
  return (
    <div
      className="position-relative   mb-5"
      style={{
        width: "16rem",
        height: "18rem",
        marginLeft: "34px",
        marginRight: "34px",
        borderRadius: 45,
        backgroundColor: "rgba(39, 39, 42, 0.9)",
        padding: "2.5rem 1.25rem 2.5rem 1.25rem",
        color: "white",
        overflow: "hidden",
      }}
    >
      <span
        className=" position-absolute d-flex align-items-center justify-content-center bg-danger rounded-circle"
        style={{
          width: "1.75rem",
          height: "1.75rem",
          top: "20px",
          left: "215px",
        }}
      >
        <RxCross2
          size="1.4rem"
          color="#fff"
          onClick={() => {
            deleteNote(note._id);
          }}
        ></RxCross2>
      </span>
      <h6 className="text-primary">
        {new Date(note.dueDate).toLocaleDateString()}
      </h6>
      <h4 className="card-title mb-2">{note.title}</h4>
      {/* <p className="text-sm fw-semibold mt-2">
        {note.description.split(" ").slice(0, 5).join(" ")}...
      </p> */}

      <p className="badge rounded-pill text-bg-light text-lg mt-1">
        {note.priority}
      </p>

      <div className="d-flex justify-content-between align-items-center">
        <p className="badge rounded text-bg-light text-lg mt-3 bg-primary-subtle">
          Status : {note.status}
        </p>

        <button
          className={`py-1 px-1  text-xs bg-success rounded ${
            note.status !== "Pending" ? "d-none" : "false"
          } `}
          onClick={() => {
            updateStatus(note._id);
          }}
        >
          <TiTick size="1.4rem" color="#fff" />
        </button>
      </div>

      <div>
        <GrFormNextLink
          style={{
            position: "absolute",
            right: "12px",
          }}
          size="2.3rem"
          color="#fff"
          onClick={handleArrowClick}
        />
      </div>

      <div className="footer position-absolute bottom-0 w-100 start-0">
        {note.status == "Pending" ? (
          <div
            className="tag w-100 py-1 bg-warning d-flex align-items-center justify-content-center cursor-pointer"
            onClick={() => {
              updateNote(note);
            }}
          >
            <h4 className="text-sm fw-semibold">Edit</h4>
          </div>
        ) : (
          <div className="tag w-100 py-1 bg-success d-flex align-items-center justify-content-center cursor-pointer">
            <h4 className="text-sm fw-semibold">Completed</h4>
          </div>
        )}
      </div>
    </div>
  );
};

Noteitem.propTypes = {
  note: PropTypes.object.isRequired,
  updateNote: PropTypes.func.isRequired,
};

export default Noteitem;
