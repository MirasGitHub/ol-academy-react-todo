import React from "react";
import "./DeleteButtons.css";

class DeleteButtons extends React.Component {
	render() {
		const { deleteCheckedTasks, deleteDoneTasks, deleteAllTasks, todos } =
			this.props;

		return (
			<div className="deleteBtnsContainer">
				<button
					disabled={!todos.length ? true : false}
					onClick={deleteCheckedTasks}
					type="button"
					className="btn btn-warning"
				>
					Delete Checked Tasks
				</button>

				<button
					disabled={!todos.length ? true : false}
					onClick={deleteDoneTasks}
					type="button"
					className="btn btn-info"
				>
					Delete Done Tasks
				</button>

				<button
					disabled={!todos.length ? true : false}
					onClick={deleteAllTasks}
					type="button"
					className="btn btn-danger"
				>
					Delete All Tasks
				</button>
			</div>
		);
	}
}

export default DeleteButtons;
