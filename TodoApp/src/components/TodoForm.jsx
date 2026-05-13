import { useState } from 'react'

function TodoForm({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    onAdd(inputValue)
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ajouter une tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>
  )
}

export default TodoForm
