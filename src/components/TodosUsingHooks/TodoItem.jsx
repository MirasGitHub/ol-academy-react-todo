import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleCheck,
	faPen,
	faTrashCan,
	faArrowUp,
	faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

const TodoItem = (props) => {
	const {
		todos,
		handleCheckedTasks,
		handleMove,
		handleCompleteTodo,
		handleEdit,
		handleDeleteTodo,
	} = props;
	return (
		<div>
			<ul>
				{todos.map((todo, index) => (
					<li key={todo.id} className={todo.isDone ? "isDone" : ""}>
						<div className="todoItemContainer" style={{ margin: "auto" }}>
							<div>
								<input
									type="checkbox"
									checked={todo.isChecked}
									onChange={() => handleCheckedTasks(todo.id)}
									className="checkbox"
								/>

								<span>{todo.name}</span>
							</div>

							<div className="upDownContainer">
								<button
									className="btn btn-info"
									disabled={index === 0 ? true : false}
									onClick={() => handleMove(index, "up")}
								>
									<FontAwesomeIcon icon={faArrowUp} />
								</button>

								<button
									className="btn btn-info"
									disabled={index === todos.length - 1 ? true : false}
									onClick={() => handleMove(index, "down")}
								>
									<FontAwesomeIcon icon={faArrowDown} />
								</button>
							</div>

							<div className="iconsWrap">
								<span
									className="btn btn-success"
									onClick={() => handleCompleteTodo(todo.id)}
								>
									<FontAwesomeIcon icon={faCircleCheck} />
								</span>

								{todo.isDone ? null : (
									<span
										className="btn btn-warning"
										title="Edit"
										onClick={() => handleEdit(todo.id, todo.name)}
									>
										<FontAwesomeIcon icon={faPen} />
									</span>
								)}

								<span
									className="btn btn-danger"
									onClick={() => handleDeleteTodo(todo.id)}
								>
									<FontAwesomeIcon icon={faTrashCan} />
								</span>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export { TodoItem };
