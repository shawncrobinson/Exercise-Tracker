import { useState } from "react";
import { useHistory } from "react-router-dom";

import TableHead from "../components/TableHead";

function CreatePage() {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("lbs");
  const [date, setDate] = useState("");

  const history = useHistory();

  const addExercise = async () => {
    const newExercise = { name, reps, weight, unit, date };
    const response = await fetch("/exercises", {
      method: "POST",
      body: JSON.stringify(newExercise),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      alert("Successfully added exercise");
    } else {
      alert(`Failed to add exercise, status code = ${response.status}`);
    }

    history.push("/");
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <TableHead />
          </tr>
        </thead>
        <tr>
          <td>
            <input
              type="text"
              placeholder="Exercise Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Total Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Rep Weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </td>
          <td>
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="lbs">lbs</option>
              <option value="kgs">kgs</option>
            </select>
          </td>
          <td>
            <input
              type="text"
              placeholder="YY-MM-DD"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <button onClick={addExercise}>Create</button>
          </td>
        </tr>
      </table>
    </>
  );
}

export default CreatePage;
