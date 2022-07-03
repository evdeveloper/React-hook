import React, { useState } from 'react';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';

import styles from './index.module.scss';

export const generateId = () => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const App = () => {

  const [tasks, setTask] = useState([]);


  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
          <InputPlus 
          onClack={ title => {
            if (!title.length) return false;
            setTask(
              [...tasks, { id: generateId(), title }]
            )
          }} />
      </section>
      <section className={styles.articleSection}>
        {tasks.length <= 0 && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={id=> {
              setTask(tasks.filter((task)=> task.id !== id))
            }}
            onEdited={(id, value)=> {
              setTask(tasks.map((task)=> task.id === id ? {...tasks, title: value} : task))
            }}
          />
        ))}
      </section>
    </article>
  );
}