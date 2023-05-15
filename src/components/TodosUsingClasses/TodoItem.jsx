import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

class TodoItem extends React.Component {
	render() {
		const {
			todo,
			handleEdit,
			handleCheckedTodos,
			handleDone,
			handleDelete,
			handleMoveUp,
			handleMoveDown,
			index,
			todos,
		} = this.props;
		return (
			<div>
				<li
					key={todo.id}
					style={{
						textDecoration: todo.isDone ? "line-through" : "none",
					}}
				>
					<div className="listItemsContainer">
						<div className="todoTitleContainer">
							<div>
								<input
									type="checkbox"
									checked={todo.isChecked}
									onChange={() => handleCheckedTodos(todo.id)}
								/>
							</div>
							<div>
								<p>{todo.name}</p>
							</div>
						</div>

						<div className="upDownContainer">
							<button
								disabled={index === 0 ? true : false}
								className="btn btn-info"
								onClick={() => handleMoveUp(todo.id)}
							>
								<FontAwesomeIcon icon={faArrowUp} />
							</button>

							<button
								disabled={index === todos.length - 1 ? true : false}
								className="btn btn-info"
								onClick={() => handleMoveDown(todo.id)}
							>
								<FontAwesomeIcon icon={faArrowDown} />
							</button>
						</div>

						<div className="buttonsContainer">
							<button
								onClick={handleEdit}
								type="button"
								className="btn btn-secondary"
							>
								{" "}
								Edit{" "}
							</button>

							<button
								onClick={() => handleDone(todo.id)}
								type="button"
								className="btn btn-success"
							>
								{" "}
								Done{" "}
							</button>

							<button
								onClick={() => handleDelete(todo.id)}
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
