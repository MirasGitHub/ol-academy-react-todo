import React from "react";
import TodoItem from "./TodoItem";
import 'bootstrap/dist/css/bootstrap.min.css'
import './Todo.css'
import DeleteButtons from "./DeleteButtons";
import EditorComponent from "./EditorComponent";


class Todo extends React.Component {_
    constructor(props) {
        super(props);

        this.state = {
            todos: [
                {
                    name: "Learn React",
                    id: 1,
                    isDone: false,
                    isChecked: false,
                },
                {
                    name: "Learn Angular",
                    id: 2,
                    isDone: false,
                    isChecked: false,
                },
                {
                    name: "Learn Vue",
                    id: 3,
                    isDone: false,
                    isChecked: false,
                }      
            ],
            inputValue: "",
            error: '',
            editor: {
                isEditing: false,
                id: undefined,
                inputValue: '',
            }
        }


        //bind the methods to this context
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    //Handle input change

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
                 isChecked: false,
             }],
                inputValue: '',
                error: '',
             })
            
        }else if(usedTodoArr.includes(inputVal)){
            
            this.setState({
                error: "This Task Already Exists.",
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
    handleEdit = (id, inputValue) => {
        console.log(id);
        console.log(inputValue);

        this.setState({
            editor: {
                id, //id: id
                inputValue,
                isEditing: true,
            }
        })

    }

    //mark the task as done
    handleDone = (id) => { 
    
        const doneTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                todo.isDone = true;
              }
              return todo;
            });
            this.setState({ todos: doneTodos });
    }

    //Delete Done tasks

    deleteDoneTasks = () => {
        console.log("deleted")
        this.setState(prevState => {
            const todos = this.state.todos.filter(
                todo => !todo.isDone
            );
            return {...prevState, todos}
        })
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

    //Handle Chacked items
    handleCheckedTodos = (id) => {
        
        this.setState(prevState => {
            const todos = prevState.todos.map(todo => {
                if(todo.id === id) {
                    return {...todo, isChecked: !todo.isChecked};
                }
                return todo;
            });

            return {todos};
        });
    }

    //Delete Checked items
    deleteCheckedTasks = () => {
        this.setState(prevState => {
            const todos = prevState.todos.filter(todo => !todo.isChecked);

            return{...prevState, todos};
        });
    }


    //Handle Editor Change
    handleEditorChange = (event) => {
        this.setState({
            editor: {
                ...this.state.editor,
                inputValue: event.target.value,
            }
        })
    }


    //Handle Editor Save
    handleEditorSave = () => {
        console.log("Clicked")
        const todos = this.state.todos;

        todos.map((todo) => {
            if(todo.id === this.state.editor.id){
                todo.name = this.state.editor.inputValue
            }
            return todo;
        })

        this.setState({
            todos,
            editor: {
                isEditing: false,
            }
        })
    }

    //Handle up
    handleMoveUp = (id) => {
        if(id === 0){
            return;
        }

       this.setState(prevState => {
            const todos =[...prevState.todos];
            const temp = todos[id];
            todos[id] = todos[id - 1];
            todos[id - 1] = temp;
            return {todos};
        });
    
    }

    handleMoveDown = (id) => {
        if(id === this.state.todos.length - 1){
            return;
        }

        this.setState(prevState => {
            const todos = [...prevState.todos];
            const temp = todos[id];
            todos[id] = todos[id + 1];
            todos[id + 1] = temp;
            return {todos};
        })
        
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
                            this.state.todos.map((todo, index) => (
                                <TodoItem 
                                key={todo.id}
                                todo={todo}
                                handleDelete={this.handleDelete}
                                handleCheckedTodos={this.handleCheckedTodos}
                                handleDone={this.handleDone}
                                handleEdit={()=>this.handleEdit(todo.id, todo.name)}
                                handleMoveUp={()=>this.handleMoveUp(index)}
                                handleMoveDown={()=>this.handleMoveDown(index)}
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
                value={this.state.inputValue} 
                className="form-control form-control-md" 
                type="text" 
                ></input>
                 

                <button onClick={this.handleAddTodo} type="button" className="btn btn-primary">Add</button>

            </div>
            <div style={{ color: "red" }}> {this.state.error} </div>

            <br />
            <br />

           <DeleteButtons
                deleteCheckedTasks={this.deleteCheckedTasks}
                deleteDoneTasks={this.deleteDoneTasks}
                deleteAllTasks={this.deleteAllTasks}
                />

            <br />

            {this.state.editor.isEditing && (
                
                <div>
    
                 <EditorComponent 
                    key={this.state.todos.id}
                    value={this.state.editor.inputValue}
                    handleEditorChange={this.handleEditorChange}
                    handleEditorSave={this.handleEditorSave}
                    />
                </div>

            )}
               

            </div>
        )
    }

}


export default Todo;