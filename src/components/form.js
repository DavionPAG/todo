import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'

function TodoForm(props) {

  const [item, setItem] = useState({})

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    e.target.reset();
    props.handleSubmit(item);
    setItem({})
  };

  return (
    <>
      <h3>Add</h3>
      <form className='todo'onSubmit={handleSubmit}>
        <label>
          <span>Thing To Do</span>
          <input
            name="text"
            placeholder="Add A Thing"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Difficulty Rating</span>
          <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
        </label>
        <label>
          <span>Assign To</span>
          <input type="text" name="assignee" placeholder="Name" onChange={handleInputChange} />
        </label>
        <Button>
          <button>Add Thing</button>
        </Button>
      </form>
    </>
  );
}


export default TodoForm;
