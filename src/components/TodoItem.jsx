import React from "react";
import './TodoItem.scss'


class TodoItem extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                    <li key={this.props.todo.id} style={{
                        textDecoration: this.props.todo.isDone ? 'line-through': 'none',
                     }}
                    >
                    <div className="listItemsContainer">
                        <div>
                           <input type="checkbox" 
                            checked={this.props.todo.isChecked}
                            onChange={ ()=> this.props.handleCheckedTodos( this.props.todo.id)}
                            />

                            {this.props.todo.name} 
                        </div>

                        

                        <div className="buttonsContainer">
                            <button 
                            onClick={this.props.handleEdit} type="button" 
                            className="btn btn-secondary"> Edit </button>

                            <button onClick={() => this.props.handleDone(this.props.todo.id)} type="button" className="btn btn-success"> Done </button>

                            <button onClick={()=> this.props.handleDelete(this.props.todo.id)} type="button" className="btn btn-danger"> Delete </button> 




                            {/* Cannot bind events properly in TodoListButtonComp*/}
                            {/* 
                            <TodoListButtonComp 
                                key={this.props.todo.id}
                                handleDelete={this.props.handleDelete}
                                handleEdit={this.props.handleEdit}
                                handleDone={this.props.handleDone}
                            /> */}
                        </div>

                    </div>
                </li>
            </div>
        )
    }

}


export default TodoItem;