import React, { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, description, completed: false });
    setTitle('');
    setDescription('');
  };

  return (
    <div style={styles.formContainer}>
      <input
        style={styles.input}
        type="text"
        placeholder="Todo title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        style={styles.input}
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button style={styles.addButton} onClick={handleSubmit}>
        + Add Todo
      </button>
    </div>
  );
}

const styles = {
  formContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    minWidth: '150px',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold',
  },
};

export default TodoForm;
