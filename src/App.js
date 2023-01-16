import React, { useEffect, useState } from 'react'
import './App.css';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: green;
  width: 100px;
`;

const ButtonDelete = styled.button`
  float: right;
  background-color: red;
  width: 30px;
`

const Text = styled.input`
  width: 75%;
  margin: 15px;
  padding: 7px;
  border: 2px solid #000;
`;

const List = styled.li`
  margin: 10px;
  padding: 5px;
  listStyle: 'none';
  background-color: gainsboro;
  border: 0.5px solid #000;
  word-wrap: break-word;
`

function App() {
  // input is the variable to keep track of tasks user inputs
  // todoList is an array that will have a list of all tasks each task will be an object with id, task, and complete
  // use localStorage to save todoList
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState(() => {
    const savedTodoList = localStorage.getItem('todoList');
    if (savedTodoList) {
      return JSON.parse(savedTodoList);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const handleClickAdd = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id, // Unique id
        task: input, // Users input is the task
        complete: false, // False means task is incomplete, true means task is completed
      },
    ]);
    setInput('');
  }

  const handleClickDelete = (id) => {
    const deleteTask = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(deleteTask);
  }

  return (
    <Container>
      <div className='app-container'>
        <h1 className='app-title'>To-Do List</h1>
        <div className='input-container'>
          <Text value={input} onInput={(e) => setInput(e.target.value)} placeholder="Type todo task here!"/>
          <Button className='btn' onClick={() => handleClickAdd()}>Add</Button>
        </div>
        <div>
           <ul>
            {todoList.map((todo) => {
              return (
                <List 
                  complete={todo.complete}
                  id={todo.id}
                  style={{
                    listStyle: 'none',
                  }}>
                  {todo.task} <ButtonDelete className='btn' onClick={() => handleClickDelete(todo.id)}>X</ButtonDelete>
                </List>
              );
            })}
          </ul>
        </div>
     </div>
    </Container>
  );
}

export default App;
