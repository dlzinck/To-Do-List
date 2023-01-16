import React, { useEffect, useState } from 'react'
import './App.css';
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  display: inline-block;
  flex: 1;
  border: none;
  background-color: green;
  color: white;
  height: 30px;
  width: 50px;
  boarder-radius: 2px;
  cursor: pointer;
`;

const ButtonDelete = styled.button`
  display: inline-block;
  float: right;
  border: none;
  background-color: red;
  color: white;
  height: 20px;
  width: 60px;
  border-radius: 30px;
  cursor: pointer;
`

const Text = styled.input`
  border: 2px solid #000;
`;

const List = styled.li`
  min-width: 100%;
  margin: 5px;
  padding: 3px;
  listStyle: 'none';
  background-color: gainsboro;
  border: 0.5px solid #000;
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
      <div>
        <h1>To-Do List</h1>
        <Text value={input} onInput={(e) => setInput(e.target.value)} />
        <Button onClick={() => handleClickAdd()}>Add</Button>
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
                  {todo.task} <ButtonDelete onClick={() => handleClickDelete(todo.id)}>Remove</ButtonDelete>
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
