import React from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";

function TableRow({ exercise, onDelete, onEdit }) {
  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{exercise.date}</td>
      <td>
        <MdEdit className="editButton" onClick={() => onEdit(exercise)} />
      </td>
      <td>
        <MdDeleteForever
          className="deleteButton"
          onClick={() => onDelete(exercise._id)}
        />
      </td>
    </tr>
  );
}

export default TableRow;
