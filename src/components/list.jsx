import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const ToDo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([...tasks, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      id="ToDoContainer"
      style={{height:"60vh"}}
    >
      <InputGroup className="mb-3" data-bs-theme="dark">
        <Form.Control
          placeholder="Enter your Task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <button
          type="button"
          id="button-addon2"
          className="btn btn-outline-secondary"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </InputGroup>

      <div id="TaskContainer" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {currentTasks.map((task, index) => (
          <div id={index} key={index}>
            <InputGroup className="mb-3" id="InputUser" data-bs-theme="dark">
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder={task}
              />
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </Button>
            </InputGroup>
          </div>
        ))}
      </div>

      {tasks.length > tasksPerPage && (
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(tasks.length / tasksPerPage) },
            (_, index) => (
              <Button
                key={index}
                variant="outline-secondary"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ToDo;
