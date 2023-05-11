import React from "react";

import TodoItem from "./TodoItem";
import DeleteButtons from "./DeleteButtons";
import EditorComponent from "./EditorComponent";

import "./Todo.css";

class Todo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			todos: [
				{
					name: "Learn React",
					id: 1,
					isDone: false,
					isChecked: false,
				},
				{
					name: "Learn Angular",
					id: 2,
					isDone: false,
					isChecked: false,
				},
				{
					name: "Learn Vue",
					id: 3,
					isDone: false,
					isChecked: false,
				},
			],
			inputValue: "",
			error: "",
			editor: {
				isEditing: false,
				id: undefined,
				inputValue: "",
			},
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAddTodo = this.handleAddTodo.bind(this);

		const {
			handleDelete,
			handleCheckedTodos,
			handleDone,
			handleEdit,
			handleMoveUp,
			handleMoveDown,
			handleInputChange,
			handleAddTodo,
			deleteCheckedTasks,
			deleteDoneTasks,
			deleteAllTasks,
			handleEditorChange,
			handleEditorSave,
		} = this;

		const { todos, inputValue, error, editor } = this.state;
	}

	handleInputChange = (event) => {
		this.setState({
			inputValue: event.target.value,
		});
	};

	handleAddTodo() {
		const inputVal = this.state.inputValue;
		const usedTodoArr = this.state.todos.map((todo) => todo.name);

		const usedIds = this.state.todos.map((todo) => todo.id);
		let newId = 0;

		if (usedIds.length > 0) {
			newId = Math.max(...usedIds) + 1;
		}

		if (inputVal !== "" && !usedTodoArr.includes(inputVal)) {
			this.setState({
				todos: [
					...this.state.todos,
					{
						name: inputVal,
						id: newId,
						isDone: false,
						isChecked: false,
					},
				],
				inputValue: "",
				error: "",
			});
		} else if (usedTodoArr.includes(inputVal)) {
			this.setState({
				error: "This Task Already Exists.",
			});
		}

		if (inputVal === "") {
			this.setState({
				error: "Please Enter Your Task",
			});
		}
	}

	handleDelete = (id) => {
		const filteredTodos = this.state.todos.filter((todo) => todo.id !== id);

		this.setState({
			todos: filteredTodos,
		});
	};

	handleEdit = (id, inputValue) => {
		this.setState({
			editor: {
				id,
				inputValue,
				isEditing: true,
			},
		});
	};

	handleDone = (id) => {
		const doneTodos = this.state.todos.map((todo) => {
			if (todo.id === id) {
				todo.isDone = true;
			}
			return todo;
		});
		this.setState({ todos: doneTodos });
	};

	deleteDoneTasks = () => {
		this.setState((prevState) => {
			const todos = this.state.todos.filter((todo) => !todo.isDone);
			return {
				...prevState,
				todos,
				editor: {
					isEditing: false,
				},
			};
		});
	};

	deleteAllTasks = (clicked) => {
		if (clicked) {
			this.setState({
				todos: [],
				inputValue: "",
				error: "",
				editor: {
					isEditing: false,
				},
			});
		}
	};

	handleCheckedTodos = (id) => {
		this.setState((prevState) => {
			const todos = prevState.todos.map((todo) => {
				if (todo.id === id) {
					return { ...todo, isChecked: !todo.isChecked };
				}
				return todo;
			});

			return { todos };
		});
	};

	deleteCheckedTasks = () => {
		this.setState((prevState) => {
			const todos = prevState.todos.filter((todo) => !todo.isChecked);

			return {
				...prevState,
				todos,
				editor: {
					isEditing: false,
				},
			};
		});
	};

	handleEditorChange = (event) => {
		this.setState({
			editor: {
				...this.state.editor,
				inputValue: event.target.value,
			},
		});
	};

	handleEditorSave = () => {
		const todos = this.state.todos;

		todos.map((todo) => {
			if (todo.id === this.state.editor.id) {
				todo.name = this.state.editor.inputValue;
			}
			return todo;
		});

		this.setState({
			todos,
			editor: {
				isEditing: false,
			},
		});
	};

	handleMoveUp = (id) => {
		if (id === 0) {
			return;
		}

		this.setState((prevState) => {
			const todos = [...prevState.todos];
			const temp = todos[id];
			todos[id] = todos[id - 1];
			todos[id - 1] = temp;
			return { todos };
		});
	};

	handleMoveDown = (id) => {
		if (id === this.state.todos.length - 1) {
			return;
		}

		this.setState((prevState) => {
			const todos = [...prevState.todos];
			const temp = todos[id];
			todos[id] = todos[id + 1];
			todos[id + 1] = temp;
			return { todos };
		});
	};

	render() {
		const { title } = this.props;
		const { todos, inputValue, error, editor } = this.state;
		const {
			handleDelete,
			handleCheckedTodos,
			handleDone,
			handleEdit,
			handleMoveUp,
			handleMoveDown,
			handleInputChange,
			handleAddTodo,
			deleteCheckedTasks,
			deleteDoneTasks,
			deleteAllTasks,
			handleEditorChange,
			handleEditorSave,
		} = this;
		return (
			<div>
				<h1>{title}</h1>

				{todos && todos.length > 0 ? (
					<div>
						<ul>
							{todos.map((todo, index) => (
								<TodoItem
									key={todo.id}
									todo={todo}
									handleDelete={handleDelete}
									handleCheckedTodos={handleCheckedTodos}
									handleDone={handleDone}
									handleEdit={() => handleEdit(todo.id, todo.name)}
									handleMoveUp={() => handleMoveUp(index)}
									handleMoveDown={() => handleMoveDown(index)}
								/>
							))}
						</ul>
					</div>
				) : (
					<div>No Tasks...</div>
				)}

				<div className="inputContainer">
					<input
						onChange={this.handleInputChange}
						value={this.state.inputValue}
						className="form-control form-control-md"
						type="text"
					></input>

					<button
						onClick={this.handleAddTodo}
						type="button"
						className="btn btn-primary"
					>
						Add
					</button>
				</div>
				<div style={{ color: "red" }}> {error} </div>

				<br />
				<br />

				<DeleteButtons
					deleteCheckedTasks={deleteCheckedTasks}
					deleteDoneTasks={deleteDoneTasks}
					deleteAllTasks={deleteAllTasks}
				/>

				<br />

				{editor.isEditing && (
					<div>
						<EditorComponent
							key={todos.id}
							value={editor.inputValue}
							handleEditorChange={handleEditorChange}
							handleEditorSave={handleEditorSave}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Todo;
