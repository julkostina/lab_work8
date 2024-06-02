import React from 'react'

function SubItem({item, index}) {
  return (
    <div key={index}>
      <p >{index+1}. {item.name}</p>
    </div>
  )
}

export default SubItem
