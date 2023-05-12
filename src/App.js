import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Todo from "./components/TodosUsingClasses/Todo";

const App = () => {
	return (
		<div className="container App">
			<Todo title="Todo App" />
		</div>
	);
};

export default App;
