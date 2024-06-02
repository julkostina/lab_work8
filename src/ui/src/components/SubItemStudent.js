import React from 'react'
import { useState } from 'react';

function SubItemStudent({item, index, setTask}) {

  const[clicked, setClicked] = useState(false);
  const handleClickTask = (e) => {
    if (!clicked) {
      setTask(e.name);
    } else {
      setTask("");
    }
    setClicked(!clicked);
  };
    return (
        <div key={index}>
          <p style={{background: clicked? "#9A9A9A": "#A7BFA9"}} onClick={()=>handleClickTask(item)}>{index+1}. {item.name}: {item.isCompleted ? "Completed": "Not done"}</p>
        </div>
      )
}

export default SubItemStudent