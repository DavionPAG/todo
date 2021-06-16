import React from 'react';

import TodoAPI from './components/todo-connected.js';
import LoginContext from './auth/context.js';

export default function App() {
  return (
    <>
      <LoginContext>
        <TodoAPI />
      </LoginContext>
    </>
  );
}
