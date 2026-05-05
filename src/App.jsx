import { useState } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Apprendre React', completed: false },
    { id: 2, text: 'Faire l\'exercice ESTIAM', completed: true },
  ])

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="todo-container">
      <h1>Ma Liste de Tâches</h1>
      
      <TodoForm onAdd={addTodo} />

      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        ))}
      </ul>
      
      {todos.length === 0 && <p className="empty-msg">Aucune tâche pour le moment !</p>}
    </div>
  )
}

export default App
