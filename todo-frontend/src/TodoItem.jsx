import React from 'react';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <div style={{
      ...styles.card,
      opacity: todo.completed ? 0.6 : 1,
    }}>
      <div style={styles.left}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
          style={styles.checkbox}
        />
        <div>
          <p style={{
            ...styles.title,
            textDecoration: todo.completed ? 'line-through' : 'none',
          }}>
            {todo.title}
          </p>
          {todo.description && (
            <p style={styles.description}>{todo.description}</p>
          )}
        </div>
      </div>
      <button style={styles.deleteButton} onClick={() => onDelete(todo.id)}>
        🗑 Delete
      </button>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    marginBottom: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  title: {
    margin: 0,
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2937',
  },
  description: {
    margin: '2px 0 0 0',
    fontSize: '13px',
    color: '#6b7280',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default TodoItem;
