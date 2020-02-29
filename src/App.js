import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import './App.css';
import Axios from 'axios';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount(){
    Axios.get('https://api.kraigh.net/todos', {headers: {"x-api-key" : "113b06d06c8fbb911917f8f0cb887d471da3e89e02b8ca04fab002ea3ed37eb3"}})
    .then(res => {
      console.log(res.data);
      this.setState({
        todos: res.data
      })
    });
  }

  deleteToDo = (id) => {
    const todos = this.state.todos.filter(todo => {
      return todo.id !== id
    });
    this.setState({
      todos
    })

    Axios({ method: 'DELETE', url: 'https://api.kraigh.net/todos/' + id , headers: {'x-api-key': "113b06d06c8fbb911917f8f0cb887d471da3e89e02b8ca04fab002ea3ed37eb3"}})
    .then(res => {
      console.log("DELETED!");
    });
  }

  addTodo = (todo) => {
    console.log("HERE: " + todo);
    Axios({ method: 'POST', url: 'https://api.kraigh.net/todos', headers: {'x-api-key': "113b06d06c8fbb911917f8f0cb887d471da3e89e02b8ca04fab002ea3ed37eb3"}, data: { completed: todo.completed,
    text: todo.text,
     } })
    .then(function (response) {
      console.log("RESSS" + response);
    })

    todo.id = Math.random();
    let todos = [...this.state.todos, todo]

    this.setState({
      todos
    })
  }

  sortToDo = (todo) => {
    Axios.get('https://api.kraigh.net/todos', {headers: {"x-api-key" : "113b06d06c8fbb911917f8f0cb887d471da3e89e02b8ca04fab002ea3ed37eb3"}})
    .then(res => {
      this.setState({
        todos:  res.data.sort((a, b) => (a.updated < b.updated) ? 1 : -1)
      })
      
    });
  }

  completedToDo = (id) => {
    const todos = this.state.todos.filter(todo => {
      if(todo.id === id){
        if(todo.completed === true){
          todo.completed = false;
        } else{
          todo.completed = true;
        }
        Axios({ method: 'PUT', url: 'https://api.kraigh.net/todos/' + id , headers: {'x-api-key': "113b06d06c8fbb911917f8f0cb887d471da3e89e02b8ca04fab002ea3ed37eb3"}, data: { completed: todo.completed }})
        .then(res => {
          console.log("UPDATED TODO!");
        });
      }
      return this.state;
    });
    this.setState({
      todos
    })
  }

  render() {
    return (
      <div className="App container">
        <h1>To-Do List <span onClick={() => { this.sortToDo(this.state) }} className="sort">Sort By Date</span></h1>
        <AddTodo addTodo={this.addTodo}/>
        <Todos todos={this.state.todos} deleteToDo={this.deleteToDo} completedToDo={this.completedToDo} />
      </div>
    );
  }
  
}

export default App;
