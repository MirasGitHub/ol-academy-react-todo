import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './DeleteButtons.css'

const DeleteButtons = (props) => {
  return (
    <div className='btns-container'>
      <button className='btn btn-secondary'
        handleCheckedTasks={props.handleCheckedTasks}
        onClick={props.deleteCheckedTasks}>
            <FontAwesomeIcon icon={faTrashCan}/> Checked Tasks
        </button>
        
        <button 
        className='btn btn-info'
        onClick={props.deleteCompleteTasks}>
            <FontAwesomeIcon icon={faTrashCan}/> Completed Tasks
        </button>

        <button 
        className='btn btn-danger'
        onClick={props.deleteAllTask}>
            <FontAwesomeIcon icon={faTrashCan}/> All Tasks
        </button>
    </div>
  )
}

export {DeleteButtons}
