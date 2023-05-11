import React, { Component } from "react";

export default class TodoAdd extends Component {
	render() {
		const {
			handleAddTodo,
			handleKeyDownOnAdd,
			handleInputChange,
			error,
			inputValue,
		} = this.props;

		return (
			<div>
				<div className="inputContainer">
					<input
						onKeyDown={handleKeyDownOnAdd}
						onChange={handleInputChange}
						value={inputValue}
						className="form-control form-control-md"
						type="text"
					></input>

					<button
						onClick={handleAddTodo}
						type="button"
						className="btn btn-primary"
					>
						Add
					</button>
				</div>
				<div style={{ color: "red" }}> {error} </div>
			</div>
		);
	}
}
