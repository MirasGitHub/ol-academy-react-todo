import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

class TodoItem extends React.Component {
	render() {
		return (
			<div>
				<li
					key={this.props.todo.id}
					style={{
						textDecoration: this.props.todo.isDone ? "line-through" : "none",
					}}
				>
					<div className="listItemsContainer">
						<div className="todoTitleContainer">
							<div>
								<input
									type="checkbox"
									checked={this.props.todo.isChecked}
									onChange={() =>
										this.props.handleCheckedTodos(this.props.todo.id)
									}
								/>
							</div>
							<div>
								<p>{this.props.todo.name}</p>
							</div>
						</div>

						<div className="upDownContainer">
							<button
								className="btn btn-info"
								onClick={() => this.props.handleMoveUp(this.props.todo.id)}
							>
								<FontAwesomeIcon icon={faArrowUp} />
							</button>

							<button
								className="btn btn-info"
								onClick={() => this.props.handleMoveDown(this.props.todo.id)}
							>
								<FontAwesomeIcon icon={faArrowDown} />
							</button>
						</div>

						<div className="buttonsContainer">
							<button
								onClick={this.props.handleEdit}
								type="button"
								className="btn btn-secondary"
							>
								{" "}
								Edit{" "}
							</button>

							<button
								onClick={() => this.props.handleDone(this.props.todo.id)}
								type="button"
								className="btn btn-success"
							>
								{" "}
								Done{" "}
							</button>

							<button
								onClick={() => this.props.handleDelete(this.props.todo.id)}
								type="button"
								className="btn btn-danger"
							>
								{" "}
								Delete{" "}
							</button>
						</div>
					</div>
				</li>
			</div>
		);
	}
}

export default TodoItem;
