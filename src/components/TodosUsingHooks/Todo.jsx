import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { DeleteButtons } from "./DeleteButtons";
import { TaskEditForm } from "./TaskEditForm";
import TodoForm from "./TodoForm";
import { TodoItem } from "./TodoItem";

const Todo = (props) => {
	const [todos, setTodos] = useState([
		{
			name: "Learn React",
			id: 1,
			isDone: false,
			isChecked: false,
			errorMessage: "",
		},
		{
			name: "Learn Angular",
			id: 2,
			isDone: false,
			isChecked: false,
			errorMessage: "",
		},
		{
			name: "Learn Vue",
			id: 3,
			isDone: false,
			isChecked: false,
			errorMessage: "",
		},
	]);
	const [inputValue, setInputValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [updateTask, setUpdateTask] = useState([
		{
			id: undefined,
			inputVal: "",
			isEditing: false,
		},
	]);

	const handleCompleteTodo = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			)
		);
	};

	const handleCheckedTasks = (id) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
			)
		);
	};

	const addTask = () => {
		const usedTaskNames = todos.map((todo) => todo.name);

		if (inputValue.trim() && !usedTaskNames.includes(inputValue.trim())) {
			setTodos([
				...todos,
				{
					id: uuidv4(),
					name: inputValue.trim(),
					isDone: false,
					isChecked: false,
					errorMessage: "",
				},
			]);

			setInputValue("");
			setErrorMessage("");
		} else if (usedTaskNames.includes) {
			setErrorMessage("This task already exists");
		}

		if (inputValue.trim() === "") {
			setErrorMessage("Please enter your task");
		}
	};

	const handleDeleteTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const deleteCheckedTasks = () => {
		setTodos(todos.filter((todo) => !todo.isChecked));
	};

	const deleteAllTask = () => {
		setTodos([]);
		setErrorMessage("");
		setInputValue("");
		setUpdateTask({
			isEditing: false,
		});
	};

	const deleteCompleteTasks = () => {
		setTodos(todos.filter((todo) => !todo.isDone));
	};

	const changeHolder = (e) => {
		setUpdateTask({
			...updateTask,
			inputVal: e.target.value,
		});
	};

	const handleEdit = (id, inputVal) => {
		todos.map((todo) => {
			if (todo.id === id) {
				setUpdateTask({
					id,
					inputVal,
					isEditing: true,
				});
			}
			return todo;
		});
	};

	const updateTodo = () => {
		todos.map((todo) => {
			if (todo.id === updateTask.id && updateTask.inputVal.length > 0) {
				todo.name = updateTask.inputVal;
			}
			return todo;
		});

		console.log(updateTask.inputVal);
		setTodos([...todos]);
		setUpdateTask({
			inputVal: "",
		});
	};

	const handleCancelUpdating = () => {
		setUpdateTask([]);
	};

	const handleMove = (index, direction) => {
		let temp = todos[index];
		if (direction === "up") {
			setTodos((prevTodos) => {
				let todos = [...prevTodos];
				todos[index] = todos[index - 1];
				todos[index - 1] = temp;

				return todos;
			});
		}
		if (direction === "down") {
			setTodos((prevTodos) => {
				let todos = [...prevTodos];
				todos[index] = todos[index + 1];
				todos[index + 1] = temp;

				return todos;
			});
		}
	};

	const handleOnKeyDownOnAdd = (event) => {
		if (event.key === "Enter") {
			addTask();
		}
	};

	const handleOnKeyDownOnSave = (event) => {
		if (event.key === "Enter") {
			updateTodo();
		}
	};

	const { title } = props;

	return (
		<div>
			<br />
			<h1>{title}</h1>
			<br />
			{updateTask && updateTask.isEditing ? (
				<TaskEditForm
					key={todos.id}
					inputVal={updateTask.inputVal}
					changeHolder={changeHolder}
					handleCancelUpdating={handleCancelUpdating}
					updateTodo={updateTodo}
					setInputValue={setInputValue}
					value={inputValue}
					handleOnKeyDownOnSave={handleOnKeyDownOnSave}
				/>
			) : (
				<TodoForm
					addTask={addTask}
					setTodos={setTodos}
					errorMessage={errorMessage}
					inputValue={inputValue}
					setInputValue={setInputValue}
					handleOnKeyDownOnAdd={handleOnKeyDownOnAdd}
				/>
			)}
			{todos && todos.length > 0 ? (
				<TodoItem
					todos={todos}
					key={todos.id}
					handleCompleteTodo={handleCompleteTodo}
					handleDeleteTodo={handleDeleteTodo}
					handleCheckedTasks={handleCheckedTasks}
					handleEdit={handleEdit}
					handleMove={handleMove}
				/>
			) : (
				<h3>No tasks...</h3>
			)}
			<DeleteButtons
				deleteCheckedTasks={deleteCheckedTasks}
				deleteCompleteTasks={deleteCompleteTasks}
				deleteAllTask={deleteAllTask}
				todos={todos}
			/>
		</div>
	);
};
export default Todo;
