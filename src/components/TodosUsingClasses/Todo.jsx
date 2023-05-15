import React from "react";
import { v4 as uuidv4 } from "uuid";

import TodoItem from "./TodoItem";
import TodoAdd from "./TodoAdd";
import DeleteButtons from "./DeleteButtons";
import EditorComponent from "./EditorComponent";

import "./Todo.css";

const v4Id = uuidv4();

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
	}

	handleInputChange = (event) => {
		this.setState({
			inputValue: event.target.value,
		});
	};

	handleAddTodo() {
		const { inputValue, todos } = this.state;

		const inputVal = inputValue;
		const usedTodoArr = todos.map((todo) => todo.name);

		if (inputVal.trim() !== "" && !usedTodoArr.includes(inputVal.trim())) {
			this.setState({
				todos: [
					...todos,
					{
						name: inputVal,
						id: v4Id,
						isDone: false,
						isChecked: false,
					},
				],
				inputValue: "",
				error: "",
			});
		} else if (usedTodoArr.includes(inputVal.trim())) {
			this.setState({
				error: "This Task Already Exists.",
			});
		}

		if (inputVal.trim() === "") {
			this.setState({
				error: "Please Enter Your Task",
			});
		}
	}

	handleDelete = (id) => {
		const { todos } = this.state;
		const filteredTodos = todos.filter((todo) => todo.id !== id);

		this.setState({
			todos: filteredTodos,
			editor: {
				isEditing: false,
			},
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

	handleEditorCancel = () => {
		this.setState({
			editor: {
				isEditing: false,
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
			error: "",
		});
	};

	handleKeyDownOnAdd = (event) => {
		if (event.key === "Enter") {
			this.handleAddTodo();
		}
	};

	handleKeyDownOnSave = (event) => {
		if (event.key === "Enter") {
			this.handleEditorSave();
		}
	};

	handleMoveUp = (id) => {
		this.setState((prevState) => {
			const todos = [...prevState.todos];
			const temp = todos[id];
			todos[id] = todos[id - 1];
			todos[id - 1] = temp;
			return { todos };
		});
	};

	handleMoveDown = (id) => {
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
		const { todos, error, editor, inputValue } = this.state;
		const {
			handleDelete,
			handleCheckedTodos,
			handleDone,
			handleEdit,
			handleMoveUp,
			handleMoveDown,
			deleteCheckedTasks,
			deleteDoneTasks,
			deleteAllTasks,
			handleEditorChange,
			handleEditorSave,
			handleInputChange,
			handleAddTodo,
			handleKeyDownOnAdd,
			handleKeyDownOnSave,
			handleEditorCancel,
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
									index={index}
									todos={todos}
								/>
							))}
						</ul>
					</div>
				) : (
					<div>No Tasks...</div>
				)}
				<TodoAdd
					handleAddTodo={handleAddTodo}
					handleKeyDownOnAdd={handleKeyDownOnAdd}
					handleInputChange={handleInputChange}
					inputValue={inputValue}
					error={error}
				/>
				<br />
				<br />
				<DeleteButtons
					deleteCheckedTasks={deleteCheckedTasks}
					deleteDoneTasks={deleteDoneTasks}
					deleteAllTasks={deleteAllTasks}
					todos={todos}
				/>
				<br />
				{editor.isEditing && (
					<div>
						<EditorComponent
							key={todos.id}
							value={editor.inputValue}
							handleEditorChange={handleEditorChange}
							handleEditorSave={handleEditorSave}
							handleKeyDownOnSave={handleKeyDownOnSave}
							handleEditorCancel={handleEditorCancel}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Todo;
