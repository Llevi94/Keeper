import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";
import axios from "axios";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event) {
    //Handling the display of user typing/editing
    const { name, value } = event.target;

    if (props.isEdit) {
      setNote((prevNote) => {
        return {
          title: props.editTitle,
          content: props.editContent,
          [name]: value,
        };
      });
    } else {
      setNote((prevNote) => {
        return {
          ...prevNote,
          [name]: value,
        };
      });
    }
  }

  function submitNote(event) {
    //Adding a note and resetting the fields
    props.onAdd(note);
    axios.post("http://localhost:5000/notes", note);

    setNote({
      title: "",
      content: "",
    });
    event.preventDefault();
    setExpanded(false);
  }

  function expand() {
    //Expands the form by clicking
    setExpanded(true);
  }

  function handle(e) {
    //Handling pressing Enter in the content field
    if (e.key === "Enter") {
      submitNote(e);
    }
  }

  function titleHandler(e) {
    //Handling pressing Enter in the title field
    if (e.keyCode == 13) {
      console.log("ENTER PRESSED");
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            type="text"
            onKeyDown={titleHandler}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder={props.isEdit ? props.editTitle : "Title"}
          />
        )}

        <textarea
          id="contentText"
          name="content"
          onClick={expand}
          onKeyDown={handle}
          onChange={handleChange}
          value={note.content}
          placeholder={props.isEdit ? props.editContent : "Take a note..."}
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
