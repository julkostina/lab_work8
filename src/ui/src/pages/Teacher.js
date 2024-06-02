import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseForTeacher from "../components/CourseForTeacher";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";

function Teacher() {
  const [nameCourse, setNameCourse] = useState("");
  const [nameTask, setNameTask] = useState("");
  const [courses, setCourses] = useState([]);
  const [chosenCourse, setChosenCourse] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    navigate(-1);
  };
  const handleTextChange = (event) => {
    setNameCourse(event.target.value);
  };
  const handleTaskChange = (event) => {
    setNameTask(event.target.value);
  };
  const updateCourses = () => {
    fetch("http://localhost:8080/teacherCourses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idTeacher: sessionStorage.getItem("idTeacher"),
      }),
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  };
  useEffect(() => {
    updateCourses();
  }, []);
  const handleAddCourse = () => {
    fetch("http://localhost:8080/createCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nameCourse: nameCourse,
        idTeacher: sessionStorage.getItem("idTeacher"),
      }),
    }).then(() => updateCourses());
  };
  const handleAddTask = () => {
    if (chosenCourse === "") {
      setOpen(true);
    } else {
      fetch("http://localhost:8080/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameTask: nameTask,
          idCourse: chosenCourse,
        }),
      }).then(() => updateCourses());
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#A7BFA9",
            border: "2px solid #000",
            textAlign: "center",
            borderRadius: "10px",
            p: 4,
          }}
        >
          Please choose a course 
        </Box>
      </Modal>
      <h1>Teacher: {sessionStorage.getItem("idTeacher")}</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p>Courses({courses.length})</p>
          <div>
            {courses.map((course, index) => (
              <CourseForTeacher
                course={course}
                index={index}
                setChosen={setChosenCourse}
              />
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              display: " flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: " 40px",
            }}
          >
            <Button
              variant="contained"
              style={{ background: "#010101", marginBottom: "10px" }}
              onClick={handleAddCourse}
            >
              Add course
            </Button>
            <TextField
              label="Enter name"
              variant="outlined"
              onChange={handleTextChange}
            />
          </div>
          <div
            style={{
              display: " flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingTop: " 40px",
            }}
          >
            <Button
              variant="contained"
              style={{ background: "#010101", marginBottom: "10px" }}
              onClick={handleAddTask}
            >
              Add task
            </Button>
            <TextField
              label="Enter name"
              variant="outlined"
              value={nameTask}
              onChange={handleTaskChange}
            />
          </div>
        </div>
      </div>
      <Button
        label="Log out"
        variant="contained"
        style={{ background: "#010101", marginTop: "40px" }}
        onClick={logOut}
      >
        Log out
      </Button>
    </div>
  );
}

export default Teacher;
