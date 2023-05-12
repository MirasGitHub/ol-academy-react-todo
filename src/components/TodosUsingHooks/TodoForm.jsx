import React from "react";
import "./TodoForm.css";

const TodoForm = ({
	handleOnKeyDownOnAdd,
	inputValue,
	addTask,
	errorMessage,
	setInputValue,
}) => {
	return (
		<div>
			<div className="todoFormContainer">
				<input
					type="text"
					className="form-control"
					placeholder="Type your task here"
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleOnKeyDownOnAdd}
					value={inputValue}
				/>

				<button className="btn btn-primary" onClick={addTask}>
					<span>Add </span>
				</button>
			</div>

			<p style={{ color: "red" }}>{errorMessage}</p>
		</div>
	);
};

export default TodoForm;
