import React from 'react'
import { useState } from 'react';
import SubItemStudent from './SubItemStudent';

function CourseForStudent({course, index,setChosenCourse, setChosenTask}) {
     const[clicked, setClicked] = useState(false);
    const handleClickCourse=(c)=>{
      if(!clicked){
        setChosenCourse(c.id);
      }
      else{
        setChosenCourse("");
      }
      setClicked(!clicked);
    }
      return (
  
      <div key={index} style={{display: "flex",gap:"5px", alignItems:"baseline"}}>
        <button style={{height:"50%", background: "rgb(1, 1, 1)", 
    marginBottom: "10px", borderRadius: "2px", border:"none", color:"#fff"}}onClick={() => {
          const details = document.getElementById(`details-${index}`);
          if (details.style.display === "none") {
            details.style.display = "block";
          } else {
            details.style.display = "none";
          }
        }}>+</button>
        <p onClick={()=>handleClickCourse(course)} style={{background: clicked? "#9A9A9A": "#A7BFA9"}}>{index+1}. <strong>{course.name}</strong></p>
        <div id={`details-${index}`} style={{display: 'none', textAlign:"left", paddingLeft: "10px"}}>
          <p>Teacher: {course.teacher.id}</p>
          <p>ID: {course.id}</p>
  
          <p style={{display:"flex", flexDirection:"row", alignItems: "baseline"}}>Tasks: <div style={{flexDirection:"column"}}>{course.tasks.map((task, i)=><SubItemStudent item={task} index={i} setTask={setChosenTask}/>)}</div></p>
          <p style={{display:"flex", flexDirection:"row", alignItems: "baseline"}}>Students: <div style={{flexDirection:"column"}}>{course.students.map((student, i)=> <p>{i+1}. {student.id}</p>)}</div></p>
        </div>
      </div>
    )
}

export default CourseForStudent