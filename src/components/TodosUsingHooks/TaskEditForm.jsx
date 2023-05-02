import React from 'react'
import './TaskEditorForm.css'

const TaskEditForm = (props) => {
  return (
    <div className='editorContainer'>
      <input type="text" 
      className='form-control'
      key={props.id}
      value={props.value}
      handleEdit={props.handleEdit}
      onChange={ (e) => props.changeHolder(e)}/>

      <button 
      className='btn btn-primary'
      onClick={props.updateTodo}>Save</button>
    </div>
  )
}

export {TaskEditForm};

