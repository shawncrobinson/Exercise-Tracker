import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "../components/Table";

function HomePage({ setExerciseToEdit }) {
  const [exercises, setExercises] = useState([]);
  const history = useHistory();

  const onDeleteExercise = async (_id) => {
    const response = await fetch(`/exercises/${_id}`, { method: "DELETE" });
    if (response.status === 204) {
      setExercises(exercises.filter((exercise) => exercise._id !== _id));
    } else {
      console.error(
        `Failed to delete exercise with _id = ${_id}, status code = ${response.status}`
      );
    }
  };

  const onEditExercise = async (exercise) => {
    setExerciseToEdit(exercise);
    history.push("/edit");
  };

  const loadExercises = async () => {
    const response = await fetch("/exercises");
    const data = await response.json();
    setExercises(data);
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <>
      <Table
        exercises={exercises}
        onDelete={onDeleteExercise}
        onEdit={onEditExercise}
      />
    </>
  );
}

export default HomePage;
