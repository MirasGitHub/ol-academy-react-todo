import React from "react";
import "./TaskEditorForm.css";

const TaskEditForm = ({
	inputVal,
	handleOnKeyDownOnSave,
	updateTodo,
	changeHolder,
	handleCancelUpdating,
}) => {
	return (
		<div className="editorContainer">
			<input
				type="text"
				className="form-control"
				value={inputVal}
				onKeyDown={handleOnKeyDownOnSave}
				onChange={(e) => changeHolder(e)}
			/>

			<button className="btn btn-primary" onClick={updateTodo}>
				Save
			</button>
			<button className="btn btn-warning" onClick={handleCancelUpdating}>
				Cancel
			</button>
		</div>
	);
};

export { TaskEditForm };
