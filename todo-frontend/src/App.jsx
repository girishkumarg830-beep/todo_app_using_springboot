import React, { useState, useEffect } from 'react';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from './api';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getAllTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAdd = async (todo) => {
    try {
      const response = await createTodo(todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggle = async (todo) => {
    try {
      const updated = { ...todo, completed: !todo.completed };
      const response = await updateTodo(todo.id, updated);
      setTodos(todos.map((t) => (t.id === todo.id ? response.data : t)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.filter((t) => !t.completed).length;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.heading}>📝 My Todo App</h1>
          <p style={styles.subheading}>Stay organized, stay productive</p>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statNumber}>{todos.length}</span>
            <span style={styles.statLabel}>Total</span>
          </div>
          <div style={{...styles.statCard, borderTop: '4px solid #f59e0b'}}>
            <span style={styles.statNumber}>{pending}</span>
            <span style={styles.statLabel}>Pending</span>
          </div>
          <div style={{...styles.statCard, borderTop: '4px solid #10b981'}}>
            <span style={styles.statNumber}>{completed}</span>
            <span style={styles.statLabel}>Completed</span>
          </div>
        </div>

        {/* Form */}
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Add New Task</h2>
          <TodoForm onAdd={handleAdd} />
        </div>

        {/* Todo List */}
        <div style={styles.listSection}>
          <h2 style={styles.listTitle}>
            {todos.length > 0 ? `Your Tasks (${todos.length})` : 'No Tasks Yet'}
          </h2>
          {todos.length === 0 ? (
            <div style={styles.emptyState}>
              <p style={styles.emptyIcon}>🎯</p>
              <p style={styles.emptyText}>No todos yet. Add one above!</p>
              <p style={styles.emptySubText}>Start by adding your first task</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#eef2ff',
    padding: '40px 16px',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '760px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  heading: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#1e1b4b',
    margin: '0 0 8px 0',
  },
  subheading: {
    color: '#6b7280',
    fontSize: '16px',
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    gap: '16px',
    marginBottom: '24px',
    justifyContent: 'center',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    borderTop: '4px solid #6366f1',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: '13px',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  formTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#374151',
    margin: '0 0 16px 0',
  },
  listSection: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
  },
  listTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#374151',
    margin: '0 0 16px 0',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 0',
  },
  emptyIcon: {
    fontSize: '48px',
    margin: '0 0 12px 0',
  },
  emptyText: {
    fontSize: '16px',
    color: '#6b7280',
    margin: '0 0 4px 0',
  },
  emptySubText: {
    fontSize: '13px',
    color: '#9ca3af',
    margin: 0,
  },
};

export default App;
