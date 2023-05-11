import React from "react";
import "./EditorComponent.css";

class EditorComponent extends React.Component {
	render() {
		const {
			value,
			handleEditorChange,
			handleEditorSave,
			handleKeyDownOnSave,
			handleEditorCancel,
		} = this.props;
		return (
			<div>
				<h2>Edit Your ToDo</h2>
				<div className="editorContainer">
					<input
						type="text"
						className="form-control form-control-md"
						value={value}
						onKeyDown={handleKeyDownOnSave}
						onChange={handleEditorChange}
					/>

					<button className="btn btn-success" onClick={handleEditorSave}>
						Save
					</button>
					<button className="btn btn-warning" onClick={handleEditorCancel}>
						Cancel
					</button>
				</div>
			</div>
		);
	}
}

export default EditorComponent;
