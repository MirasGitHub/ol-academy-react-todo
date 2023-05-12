import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./DeleteButtons.css";

const DeleteButtons = ({
	deleteCheckedTasks,
	deleteCompleteTasks,
	deleteAllTask,
	todos,
}) => {
	return (
		<div className="btns-container">
			<button
				disabled={todos.length === 0 ? true : false}
				className="btn btn-secondary"
				onClick={deleteCheckedTasks}
			>
				<FontAwesomeIcon icon={faTrashCan} /> Checked Tasks
			</button>

			<button
				disabled={todos.length === 0 ? true : false}
				className="btn btn-info"
				onClick={deleteCompleteTasks}
			>
				<FontAwesomeIcon icon={faTrashCan} /> Completed Tasks
			</button>

			<button
				disabled={todos.length === 0 ? true : false}
				className="btn btn-danger"
				onClick={deleteAllTask}
			>
				<FontAwesomeIcon icon={faTrashCan} /> All Tasks
			</button>
		</div>
	);
};

export { DeleteButtons };
