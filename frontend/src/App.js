import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState } from "react";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

import Navigation from "./components/Navigation";

function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Exercise Tracker</h1>
          <p>Helping you humble yourself since one day before the due date.</p>
          <Navigation />
        </header>

        <main>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/create">
            <CreatePage />
          </Route>
          <Route path="/edit">
            <EditPage exerciseToEdit={exerciseToEdit} />
          </Route>
        </main>

        <footer className="App-footer">
          <p>© 2022 Shawn Robinson</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
