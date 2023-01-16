import React, { useState } from 'react'
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

const Text = styled.input`
  border: 2px solid #000;
`;

const TaskCount = styled.span`
  margin: 10px;
`;

const Tasks = styled.span`
`;

const List = styled.li`
  listStyle: 'none';
  text-decoration: 'line-through';
`



function App() {
  // input is the variable to keep track of tasks user inputs
  // todoList is an array that will have a list of all tasks each task will be an object with id, task, and complete
  // completedTaskCount will keep track of how many tasks are completed
  const [input, setInput] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);

  const handleClick = () => {
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

  // If task is pending, change to complete and increase count
  // If task is complete, change back to pending decrease Complete count
  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1);
        }
        else {
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    })
    setTodoList(list);
  }

  return (
    <Container>
      <div>
        <h1>To-Do List</h1>
        <Text value={input} onInput={(e) => setInput(e.target.value)} />
        <Button onClick={() => handleClick()}>Add</Button>
        <Tasks>
          <TaskCount>
            <b>Pending</b>
          </TaskCount>
          <TaskCount>
           <b>Completed</b>
         </TaskCount>
       </Tasks>
        <div>
           <ul>
            {todoList.map((todo) => {
              return (
                <List
                  complete={todo.complete}
                  id={todo.id}
                  onClick={() => handleComplete(todo.id)}
                  style={{
                    listStyle: 'none',
                    textDecoration: todo.complete && 'line-through',
                  }}
                >
                  {todo.task}
                </List>
              );
            })}
          </ul>
        </div>
       <Button>Clear</Button>
     </div>
    </Container>
  );
}

export default App;
