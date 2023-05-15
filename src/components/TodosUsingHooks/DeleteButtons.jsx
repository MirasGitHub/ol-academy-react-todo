import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./DeleteButtons.css";

const DeleteButtons = ({
	deleteCheckedTasks,
	deleteCompleteTasks,
	deleteAllTask,
	todos,
}) => {
	const [checked, setChecked] = useState();
	const [done, setDone] = useState();

	useEffect(() => {
		setChecked(todos && todos.some(({ isChecked }) => isChecked));
		setDone(todos && todos.some(({ isDone }) => isDone));
	}, [todos]);

	return (
		<div className="btns-container">
			<button
				disabled={!checked}
				className="btn btn-secondary"
				onClick={deleteCheckedTasks}
			>
				<FontAwesomeIcon icon={faTrashCan} /> Checked Tasks
			</button>

			<button
				disabled={!done}
				className="btn btn-info"
				onClick={deleteCompleteTasks}
			>
				<FontAwesomeIcon icon={faTrashCan} /> Completed Tasks
			</button>

			<button
				disabled={!todos.length}
				className="btn btn-danger"
				onClick={deleteAllTask}
			>
				<FontAwesomeIcon icon={faTrashCan} /> All Tasks
			</button>
		</div>
	);
};

export { DeleteButtons };
