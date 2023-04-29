import React from "react";

class TodoListButtonComp extends React.Component {
   constructor(props){
    super(props);

    console.log(props)
   }
    render(){
        
        return(
            <div>
                <button 
                    onClick={this.props.handleEdit}
                    handleEdit={this.props.handleEdit} 
                    type="button" 
                    className="btn btn-secondary"> 
                    
                    Edit
                    </button>

                    <button 
                        onClick={() => this.props.handleDone(this.props.id)}
                        handleDone={this.props.handleDone} 
                        type="button" 
                        className="btn btn-success"> Done 
                    </button>

                <button 
                    onClick={()=> this.props.handleDelete(this.props.id)}
                    handleDelete={this.props.handleDelete} 
                    type="button" 
                    className="btn btn-danger"> 

                    Delete 
                </button> 
            </div>
        )
    }
}


export default TodoListButtonComp;