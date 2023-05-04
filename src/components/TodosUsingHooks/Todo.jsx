import React, { useState } from "react";
import { DeleteButtons } from "./DeleteButtons";
import { TaskEditForm } from "./TaskEditForm";
import TodoForm from "./TodoForm";
import { TodoItem } from "./TodoItem";


const Todo = (props) => {
   

    const [todos, setTodos] = useState([
        {
            name: "Learn React",
            id: 1,
            isDone: false,
            isChecked: false,
            errorMessage: ''
        },
        {
            name: "Learn Angular",
            id: 2,
            isDone: false,
            isChecked: false,
            errorMessage: ''
        },
        {
            name: "Learn Vue",
            id: 3,
            isDone: false,
            isChecked: false,
            errorMessage: ''
        }      
    ])

    const [inputValue, setInputValue] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [updateTask, setUpdateTask] = useState([{
        id: undefined,
        inputVal: '',
        isEditing: false
    }]);

    


    //Handle Task Complete/Done

    const handleCompleteTodo = (id) => {
            
        setTodos(todos.map(
            todo => todo.id === id 
            ? ({...todo, isDone: !todo.isDone})
            : (todo)
        ))

    }


    //Handle Input Value
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    }

    //Handle Checked Tasks
    const handleCheckedTasks = (id) => {

        setTodos(todos.map(
            todo => todo.id === id
            ? ({...todo, isChecked: !todo.isChecked})
            : (todo)
        ))
      
    }

    

    //Add new Task

    const addTask = () => {
        const usedTaskNames = todos.map(todo => todo.name);
        
        if(inputValue && !usedTaskNames.includes(inputValue)) {

        const usedIds = todos.map(todo => todo.id);
        let newId = 0;
        
        if(usedIds.length > 0){
            newId = Math.max(...usedIds) + 1;
        };

       
        setTodos([...todos, 
            {id: newId, name: inputValue, isDone: false, isChecked: false, errorMessage: ''}  
        ])

        setInputValue('');
        setErrorMessage('');
        
    }else if(usedTaskNames.includes){
        setErrorMessage('This task already exists')
    }
    
    if(inputValue === ''){
            setErrorMessage('Please enter your task');
        }
    
    }

    // Delete todo

    const handleDeleteTodo = (id) => {
        
        setTodos(todos.filter(todo => todo.id !== id));
    }



    //Delete Checked Tasks 

    const deleteCheckedTasks = () => {
        setTodos(todos.filter(
            todo => !todo.isChecked
        ))
    }

    //Delete All Tasks
    const deleteAllTask = () => {
        setTodos([]);
        setErrorMessage('');
        setInputValue('');
    }

    //Delete Complete Tasks 
    const deleteCompleteTasks = () =>{
        console.log("deleted")
        setTodos(todos.filter(
            todo => !todo.isDone
        ))
    }

    //Change Holder
    const changeHolder = (e) =>{

        setUpdateTask({
            ...updateTask,
            inputVal: e.target.value
        })
    }

    //Handle Edit
    const handleEdit = (id, inputVal) => {

        todos.map((todo) => {
            if(todo.id === id) {
                setUpdateTask({
                    id,
                    inputVal,
                    isEditing: true
                })
            }
        })
    }


    //Update Todo
    const updateTodo = () => {
       
        console.log("Saved")

        todos.map(todo => {
            if(todo.id === updateTask.id){
                todo.name = updateTask.inputVal;
            }
        
            return todo;
        }) 

        setTodos([...todos]);

        setUpdateTask({
            inputVal: ''
        });

    }

    //handle Move Up
    const handleMoveUp = (index) => {

        if(index === 0){
            return;
        }

        setTodos(prevTodos => {
            console.log('PrevTodos', prevTodos);

            let todos = [...prevTodos];

            let temp = todos[index];
        
            todos[index] = todos[index - 1];

            todos[index - 1] = temp;

            console.log('PostTodos', todos);

            return  { todos };
        })  
        
    }

    //handle Move Down
    const handleMoveDown = (index) => {
        console.log('down')
        console.log(index)

        if(index === todos.length - 1){
            return;
        }

        setTodos(prevTodos => {
            console.log('PrevTodos', prevTodos);

            let todos = [...prevTodos];

            let temp = todos[index];
        
            todos[index] = todos[index + 1];

            todos[index + 1] = temp;

            console.log('PostTodos', todos);

            return  { todos };
        })
    }

    
    return (
        <div>
            <br />
            <h1>{props.title}</h1>
            <br />

            {updateTask && updateTask && updateTask.isEditing ? (
                <TaskEditForm 
                key={todos.id}
                value={updateTask.inputVal}
                updateTask={updateTask}
                changeHolder={changeHolder}
                updateTodo={updateTodo}
                />

            ) : (
                <TodoForm
                    addTask={addTask}
                    handleInputValue={handleInputValue}
                    setTodos={setTodos}
                    errorMessage={errorMessage}
                    inputValue={inputValue}
                />
            )
        }

           {
            todos && todos.length > 0 ? 
           (
             <TodoItem
                todos={todos}
                key={todos.id}
                handleCompleteTodo={handleCompleteTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleCheckedTasks={handleCheckedTasks}
                deleteCompleteTasks={deleteCompleteTasks}
                setUpdateTask={setUpdateTask}
                handleEdit={handleEdit}
                handleMoveUp={handleMoveUp}
                handleMoveDown={handleMoveDown}/>

           ) : (
            <h3>No tasks...</h3>
           )
           
        }

        <DeleteButtons
          deleteCheckedTasks={deleteCheckedTasks}
          deleteCompleteTasks={deleteCompleteTasks}
          deleteAllTask={deleteAllTask}/>

            
        </div>
    )
}

export  default Todo;