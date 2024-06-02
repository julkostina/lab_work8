import React from 'react'
import SubItem from './SubItemTeacher'
import { useState } from 'react'

function CourseForTeacher({course, index,setChosen}) {
  const[clicked, setClicked] = useState(false);
  const handleClick=(c)=>{
    setClicked(!clicked);
    if(!clicked){
      setChosen("");
    }
    setChosen(c.id);
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
      <p onClick={()=>handleClick(course)} style={{background: clicked? "#9A9A9A": "#A7BFA9"}}>{index+1}. <strong>{course.name}</strong></p>
      <div id={`details-${index}`} style={{display: 'none', textAlign:"left", paddingLeft: "10px"}}>
        <p>Teacher: {course.teacher.id}</p>
        <p>ID: {course.id}</p>

        <p style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>Tasks: <div style={{flexDirection:"column"}}>{course.tasks.map((task, i)=><SubItem item={task} index={i}/>)}</div></p>
        <p style={{display:"flex", flexDirection:"row", alignItems:"baseline"}}>Students: {course.students.map((student, i)=> <p>{i+1}. {student.id}</p>)}</p>
      </div>
    </div>
  )
}

export default CourseForTeacher