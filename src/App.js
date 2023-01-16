import React from 'react'
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



function App() {
  return (
    <Container>
      <div>
        <h1>To-Do List</h1>
        <Text> value={input}</Text>
        <Button>Add</Button>
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
            {/* List items of tasks will go HERE */}
          </ul>
        </div>
       <Button>Clear</Button>
     </div>
    </Container>
  );
}

export default App;
