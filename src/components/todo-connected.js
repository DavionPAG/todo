import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import Login from '../auth/Login.js'
// import { If, Then, Else } from 'react-if'

import './todo.scss';
import Home from './Home.js'
import { Container } from 'react-bootstrap';


const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';


const ToDo = (props) => {

  const [list, setList] = useState([]);

  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
  };

  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems = () => {
    fetch(todoAPI, {
      method: 'get',
      mode: 'cors',
    })
      .then(data => data.json())
      .then(data => setList(data.results))
      .catch(console.error);
  };

  

  // const _deleteTodoItem = (id) => {
  //   fetch(todoAPI+id, {
  //     method: 'delete',
  //     mode: 'cors',
  //   })
  //   .then(res => res.text())
  // }

  useEffect(_getTodoItems, []);

  return (
    <>
      <nav className='bg-primary' >
        <Home />
      </nav>
      <Login>
        <Container>
          <header >
            <div id='todo-header-div'>
              <h2 id='todo-header'>
                Things to do({list.filter(item => !item.complete).length})
              </h2>
            </div>
          </header>
          <section className="todo">

            <div id='todo-form'>
              <TodoForm handleSubmit={_addItem} />
            </div>

            <div>
              <TodoList
                list={list}
                handleComplete={_toggleComplete}
              />
            </div>
          </section>
        </Container>
      </Login>
    </>
  );
};

export default ToDo;
