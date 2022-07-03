import React, { useLayoutEffect, useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';

export const InputTask = ({
  id,
  title,
  onDone,
  onEdited
}) => {

  const [checked, setCheked] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [value, setValue] = useState(title);
  const inputFocus = useRef(null);

  useEffect(()=> {
    if (isEdit && inputFocus) {
      inputFocus.current.focus();
    }
  },[isEdit]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          key={id}
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(e)=> {
            setCheked(e.target.checked);
            setTimeout(()=> {
              onDone(id)
            },300);
          }}
        />
        {isEdit 
        ? (
          <input 
          value={value}
          ref={inputFocus}
          className={styles.inputTaskTitleEdit}
          onChange={(e)=> {
            setValue(e.target.value);
          }}
          />
        ) 
        : (<h3 className={styles.inputTaskTitle}>{title}</h3>)}
        
        
      </label>
      { isEdit ? 
      (
        <button
          onClick={() => { 
            onEdited(id, value);
            setEdit(false);
           }}
          aria-label="Save"
          className={styles.inputTaskSave}
        />
      ) 
      : (
        <button
          onClick={() => { setEdit(!isEdit) }}
          aria-label="Edit"
          className={styles.inputTaskEdit}
        />
      )}
      
      <button
        onClick={() => {
          if (confirm("Are you sure?")) {
            onDone(id);
          }
        }}
        aria-label="Remove"
        className={styles.inputTaskRemove}
      />
    </div>
  );
}