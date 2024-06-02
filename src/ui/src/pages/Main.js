import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Main() {
  const [textValue, setTextValue] = useState('');
  const [teacherButtonClicked, setTeacherButtonClicked] = useState(null);
  const navigate = useNavigate();
  

  const handleTextChange = (event) => {
    setTextValue(event.target.value); 
  }

  const handleClick = () => {
    if(teacherButtonClicked){
      sessionStorage.setItem('idTeacher', textValue);
      navigate('/teacher');
    }
    else{
      sessionStorage.setItem('idStudent', textValue);
      navigate('/student');
    }
  }
  const styleH3={
    background: "#010101",
    color: "#fff",
    padding: "10px 30px",
    size: "1.2rem"
  }
  return (
    <div >
       <h1>School management system</h1> 
       <h3>Login as </h3>
       <div style={{display: "flex", gap: "90px", justifyContent: "center"}}>
       <button onClick={()=>setTeacherButtonClicked(true)}style={teacherButtonClicked?{...styleH3,opacity:"0.8"} :styleH3}>Teacher</button>
       <button onClick={()=>setTeacherButtonClicked(false)}style={teacherButtonClicked?styleH3: {...styleH3,opacity:"0.8"}}>Student</button>
       </div>
       <div style={{display: " flex", justifyContent: "center", paddingTop: " 40px"}}>
       <TextField 
         label="Enter ID" 
         variant="outlined" 
         value={textValue} 
         onChange={handleTextChange} 
       />
       <Button variant="contained" style={{background: "#010101"}} onClick={handleClick}>
         Submit
       </Button>
        </div> 
              
    </div>
  )
}

export default Main