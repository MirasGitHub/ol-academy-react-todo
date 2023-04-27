import React from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Todo from './components/Todo';



class App extends React.Component {
  render() {
    return (
      <div className="container App">

     <Todo title='ToDo List' />
      
  

      </div>
    );
  }
}

export default App;



