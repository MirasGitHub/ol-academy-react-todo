import React from "react";
import './DeleteButtons.scss'

class DeleteButtons extends React.Component {
    
    render(){
        return(
            <div className="deleteBtnsContainer">

                <button 
                    onClick={this.props.deleteCheckedTasks} 
                    type="button" 
                    handlecheckedtodos={this.props.handleCheckedTodos}
                    className="btn btn-warning">
                        Delete Checked Tasks
                </button>

                <button 
                    onClick={this.props.deleteDoneTasks} 
                    handledone={this.props.handleDone}
                    type="button" 
                    className="btn btn-info">
                        Delete Done Tasks
                </button>


                 <button 
                    onClick={this.props.deleteAllTasks} 
                    type="button" 
                    className="btn btn-danger">
                        Delete All Tasks
            </button>
            </div>
        )
    }
}

export default DeleteButtons;