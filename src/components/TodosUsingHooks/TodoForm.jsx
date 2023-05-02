import React from 'react'
import './TodoForm.css'

const TodoForm = (props) => {
   

  

  return (
    <div>

    
      <div className='todoFormContainer'>
        
          <input type="text" 
                  className='form-control'
                  placeholder='Type your task here'
                  onChange={props.handleInputValue}
                  value={props.inputValue}/>
            
            
              <button 
                  className='btn btn-primary'
                  onClick={props.addTask}><span>Add </span></button>            
      </div>

      <p style={{ color: 'red' }}>{props.errorMessage}</p>
    </div>
  )
}

export default TodoForm;
