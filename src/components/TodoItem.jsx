import React from "react";
import './TodoItem.css'

class TodoItem extends React.Component {


    render(){
        return(
            <div>
                    <li key={this.props.todo.id} style={{
                        textDecoration: this.props.todo.isDone ? 'line-through': 'none',
                     }}
                    >
                    <div className="listItemsContainer">
                        <div>
                            <span> <input type="checkbox" key={this.props.todo.id}/> </span>

                            {this.props.todo.name} 
                        </div>

                        

                        <div className="buttonsContainer">
                            <span><button onClick={() => this.props.handleEdit(this.props.todo.id)} type="button" className="btn btn-warning"> Edit </button></span>

                            <span><button onClick={() => this.props.handleDone(this.props.todo.id)} type="button" className="btn btn-success"> Done </button></span>

                            <span> <button onClick={()=> this.props.handleDelete(this.props.todo.id)} type="button" className="btn btn-danger"> Delete </button> </span> 
                        </div>

                    </div>
                </li>
            </div>
        )
    }

}


export default TodoItem;