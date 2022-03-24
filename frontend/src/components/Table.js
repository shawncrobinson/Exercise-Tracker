import React from "react";
import TableRow from "./TableRow";
import TableHead from "./TableHead";

function Table({ exercises, onDelete, onEdit }) {
  return (
    <table>
      <thead>
        <tr>
          <TableHead />
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise, i) => (
          <TableRow
            exercise={exercise}
            key={i}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
