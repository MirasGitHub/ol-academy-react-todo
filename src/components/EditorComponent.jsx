import React from 'react';
import './EditorComponent.scss'

class EditorComponent extends React.Component {
    constructor(props){
        super(props),

        console.log(props)
    }
    
    render(){

            
        return(
            <div>
                <h2>Edit Your ToDo</h2>

                <input 
                type="text" 
                value={this.props.value}
                handleEdit={this.props.handleEdit} 
                onChange={this.props.handleEditorChange}/>

                <button 
                onClick={this.props.handleEditorSave}>Save</button>
            </div>
        )
    }
}

export default EditorComponent;