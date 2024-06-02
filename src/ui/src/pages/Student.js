import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseForStudent from "../components/CourseForStudent";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";

function Student() {
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]);
  const [chosenCourse, setChosenCourse] = useState("");
  const [chosenTask, setChosenTask] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  console.log(courses);
  const logOut = () => {
    navigate(-1);
  };
  const updateCourses = () => {
    fetch("http://localhost:8080/studentCourses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idStudent: sessionStorage.getItem("idStudent"),
      }),
    })
      .then((res) => res.json())
      .then((data) => setCourses(data));
  };

  useEffect(() => {
    updateCourses();
  }, []);
  const handleCourseId = (event) => {
    setCourseId(event.target.value);
  };
  const handleAddCourse = () => {
    fetch("http://localhost:8080/enrollCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idCourse: courseId,
        idStudent: sessionStorage.getItem("idStudent"),
      }),
    }).then(() => updateCourses());
  };
  const handleCompleteTask = () => {
    if (chosenCourse === "" || chosenTask === "") {
      setOpen(true);
    } else {
      fetch("http://localhost:8080/completeTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idCourse: chosenCourse,
          nameTask: chosenTask,
        }),
      }).then(() => updateCourses());
    }
  };
  console.log("Chosen course: "+ chosenCourse + "\n Chosen task " + chosenTask);
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
          Please choose a course and task
        </Box>
      </Modal>
      <h1>Student: {sessionStorage.getItem("idStudent")}</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <p>Courses({courses.length})</p>
          <div>
            <div>
              {courses.map((course, index) => (
                <CourseForStudent
                  course={course}
                  index={index}
                  setChosenCourse={setChosenCourse}
                  setChosenTask={setChosenTask}
                />
              ))}
            </div>
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
              label="Enter ID of the course"
              variant="outlined"
              value={courseId}
              onChange={handleCourseId}
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
              onClick={handleCompleteTask}
            >
              Complete task
            </Button>
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

export default Student;
