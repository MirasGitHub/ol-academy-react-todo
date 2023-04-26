import React from "react";
import TodoItem from "./TodoItem";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Todo.css'

class Todo extends React.Component {_
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    name: "Learn React",
                    id: 1,
                    isDone: false,
                },
                {
                    name: "Learn Angular",
                    id: 2,
                    isDone: false,
                },
                {
                    name: "Learn Vue",
                    id: 3,
                    isDone: false,
                }      
            ],
            inputValue: "",
            error: ''
        }


        //bind the methods to this context
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    handleInputChange = (event) =>{
        this.setState({
            inputValue: event.target.value,
        })
    }


    //Add the task in ul
    handleAddTodo (){
        const inputVal = this.state.inputValue;
        const usedTodoArr = this.state.todos.map(todo => todo.name);

        console.log(inputVal, usedTodoArr, usedTodoArr.includes(inputVal))

        const usedIds = this.state.todos.map(todo => todo.id);
        let newId = 0;

        if(usedIds.length > 0){
            newId = Math.max(...usedIds) + 1;
        }

        if(inputVal !== "" && !usedTodoArr.includes(inputVal)){

            this.setState({
                todos: [...this.state.todos, {
                 name: inputVal,
                 id: newId,
                 isDone: false,
             }],
                inputValue: '',
                error: '',
             })
            
        }else if(usedTodoArr.includes(inputVal)){
            
            this.setState({
                error: "Already Exists.",
            })
            
        }

        if(inputVal === ""){
            this.setState({
                error: "Please Enter Your Task"
            })
        }
    }


    //Delete task
    handleDelete = (id) => {

        const filteredTodos = this.state.todos.filter(
            todo => todo.id !== id
        )

        this.setState({
            todos: filteredTodos,
        })
    }

    //Edit the Task event handler
    handleEdit = (id) => {
        console.log(id)

            const mapedName = this.state.todos.map(
                todo => todo.name
            )
        
            
            const filteredName = mapedName.filter(name => name.id !== id)

                this.setState({
                
                    inputValue: filteredName,
                })

    }



    //mark the task as done
    handleDone = (id) => { 
    

     

    }

    //Delete all tasks
    deleteAllTasks = (clicked) => {
        alert("are you sure you want to delete all tasks?");
        if(clicked){
            this.setState({
                todos:[],
                inputValue: "",
                error: ''
            })
        }
        
    }

    deleteCheckedTasks = (id) => {
        console.log(this)
        console.log(id);
    }


    render(){


        return(
            <div>
                <h1>{this.props.title}</h1>

            {
                this.state.todos && this.state.todos.length > 0 ?
                (
                <div>
                    <ul>
                        {
                            this.state.todos.map((todo) => (
                                <TodoItem 
                                key={todo.id}
                                todo={todo}
                                handleDelete={this.handleDelete}
                                handleDone={this.handleDone}
                                deleteCheckedTasks={this.deleteCheckedTasks}
                                handleEdit={this.handleEdit}
                                />
                            ))
                        }
                    </ul>
                </div>
                )
                : (
                    <div>No Tasks...</div>
                )

            }

            <div className="inputContainer">
                <input
                onChange={this.handleInputChange} 
                value={this.state.inputValue} className="form-control form-control-md" type="text" id="validationCustom03" required></input>
                 

                <button onClick={this.handleAddTodo} type="button" className="btn btn-primary">Add Todo</button>

            </div>
            <div style={{ color: "red" }}> {this.state.error} </div>

            <br/>
            
            
            <button onClick={() => this.deleteCheckedTasks(this.state.todos.id)} type="button" className="btn btn-secondary">Delete checked tasks</button>
            

            <br />
            <br />
            <button onClick={this.deleteAllTasks} type="button" className="btn btn-danger">Delete All tasks</button>
               
            </div>
        )
    }

}


export default Todo;