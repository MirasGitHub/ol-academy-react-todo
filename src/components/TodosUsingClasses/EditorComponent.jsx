import React from 'react';
import './EditorComponent.css'

class EditorComponent extends React.Component {
    
    render(){

            
        return(
            <div>
                <h2>Edit Your ToDo</h2>
                <div className='editorContainer'>
                    <input 
                    type="text" 
                    className="form-control form-control-md"
                    value={this.props.value}
                    handledit={this.props.handleEdit} 
                    onChange={this.props.handleEditorChange}/>

                    <button
                    className='btn btn-success' 
                    onClick={this.props.handleEditorSave}>Save</button>
                </div>
                
            </div>
        )
    }
}

export default EditorComponent;