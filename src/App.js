import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import  Todo  from './components/TodosUsingHooks/Todo';



class App extends React.Component {
  render() {
    return (
      <div className="container App">

     {/* <Todo title='ToDo List' /> */}

     <Todo title='Todo List'/>
      
  

      </div>
    );
  }
}

export default App;



