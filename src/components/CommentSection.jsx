import React, { useReducer, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { commentReducer, initialState } from '../reducers/commentReducer'
const CommentSection = () => {
  const [state, dispatch] = useReducer(commentReducer, initialState);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_COMMENT', payload: input });
      setInput('');
    }
  };

  const handleDelete = (index) => {
    dispatch({ type: 'DELETE_COMMENT', payload: index });
  };

  return (
    <div className="comment-section">
      {state.comments.map((comment, index) => (
        <div className="comment-item" key={index}>
          <div className="comment-user">
            <div className="user-avatar comment-initials">JS</div>
            <div className="comment-date">{new Date().toLocaleString()}</div>
          </div>
          <p>{comment}</p>
          <FaTrash className="comment-delete" onClick={() => handleDelete(index)} />
        </div>
      ))}
      <div className="comment-input-wrapper">
        <input
          type="text"
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAddComment}>Submit</button>
      </div>
    </div>
  );
};

export { CommentSection };
