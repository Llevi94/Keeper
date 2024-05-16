import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CreateArea from "./CreateArea";

function Note(props) {
  const [isEditOn, setEditOn] = useState(false);

  function deleteIcon() {
    //Deleting a note
    props.onDelete(props._id);
  }

  function editOn() {
    //Sets editing mode
    setEditOn(true);
  }

  function closeIcon() {
    //Cancels edit mode
    setEditOn(false);
  }

  function addNote() {
    //Updating the note
    props.onDelete(props._id);
    setEditOn(false);
  }

  if (isEditOn) {
    //Editing mode
    return (
      <div className="note-edit">
        <button className="exit-button" onClick={closeIcon}>
          <CloseIcon />
        </button>
        <a className="edit-text"> Edit Note: </a>
        <CreateArea
          onAdd={addNote}
          editTitle={props.title}
          editContent={props.content}
          isEdit={isEditOn}
        />
      </div>
    );
  } else {
    //Note display mode
    return (
      <div className="note">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
        <button onClick={deleteIcon}>
          <DeleteIcon />
        </button>
        <button onClick={editOn}>
          <EditOutlinedIcon />
        </button>
      </div>
    );
  }
}

export default Note;
