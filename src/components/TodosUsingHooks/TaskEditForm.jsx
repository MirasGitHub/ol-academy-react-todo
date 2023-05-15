import React, { useEffect, useState } from "react";
import "./TaskEditorForm.css";

const TaskEditForm = ({
	inputVal,
	todos,
	handleOnKeyDownOnSave,
	updateTodo,
	changeHolder,
	handleCancelUpdating,
}) => {
	const [isEdited, setIsEdited] = useState(true);

	useEffect(() => {
		if (todos.name === inputVal) {
			setIsEdited(false);
		}
	});
	return (
		<div className="editorContainer">
			<input
				type="text"
				className="form-control"
				value={inputVal}
				onKeyDown={handleOnKeyDownOnSave}
				onChange={(e) => changeHolder(e)}
			/>

			<button
				disabled={isEdited}
				className="btn btn-primary"
				onClick={updateTodo}
			>
				Save
			</button>
			<button className="btn btn-warning" onClick={handleCancelUpdating}>
				Cancel
			</button>
		</div>
	);
};

export { TaskEditForm };
