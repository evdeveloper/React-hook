import React, { useState, useCallback } from 'react';
import styles from './index.module.scss';

export const InputPlus = ({ onClack }) => {

  const [inputValue, setInputValue] = useState([]);
  const memoizedCallback = useCallback(()=> {
    onClack(inputValue);
    setInputValue('');
  },[inputValue])

  return (
    <div className={styles.inputPlus}>
        <input
          type="text"
          value={inputValue}
          className={styles.inputPlusValue}
          placeholder="Type here..."
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e)=> {
            if (e.key === 'Enter') {
              memoizedCallback();
            }
          }}
        />
        <button
          onClick={memoizedCallback}
          aria-label="Add"
          className={styles.inputPlusButton}
        />
    </div>
  );
}
