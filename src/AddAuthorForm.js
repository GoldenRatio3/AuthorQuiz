import React from "react";
import "./AddAuthorForm.css";

function AddAuthorForm({ match }) {
  return (
    <div className="AddAuthorForm">
      <h1>Add Author</h1>
      <form>
        <div className="AddAuthorForm_input">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" />
        </div>
      </form>
    </div>
  );
}

export default AddAuthorForm;
