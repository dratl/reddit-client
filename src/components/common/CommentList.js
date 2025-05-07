// src/components/common/CommentList.js
import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/CommentList.css';

const CommentList = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <div className="no-comments">No comments yet</div>;
  }

  // Function to recursively render comment threads
  const renderComments = (commentList, depth = 0) => {
    return commentList.map((comment) => (
      <div 
        key={comment.id} 
        className={`comment ${depth > 0 ? 'comment-reply' : ''}`}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div className="comment-header">
          <span className="comment-author">{comment.author}</span>
          <span className="comment-score">
            {comment.score > 0 ? '+' : ''}{comment.score} points
          </span>
          <span className="comment-time">
            {new Date(comment.created_utc * 1000).toLocaleString()}
          </span>
        </div>
        <div className="comment-body">
          {comment.body && (
            <div 
              className="comment-text" 
              dangerouslySetInnerHTML={{ __html: comment.body_html || comment.body }}
            />
          )}
        </div>
        {comment.replies && comment.replies.data && (
          <div className="comment-replies">
            {renderComments(comment.replies.data.children.map(c => c.data), depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="comment-list">
      {renderComments(comments)}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string,
      score: PropTypes.number,
      created_utc: PropTypes.number,
      body: PropTypes.string,
      body_html: PropTypes.string,
      replies: PropTypes.oneOfType([
        PropTypes.string, // "more" replies indicator
        PropTypes.shape({
          data: PropTypes.shape({
            children: PropTypes.array
          })
        })
      ])
    })
  )
};

CommentList.defaultProps = {
  comments: []
};

export default CommentList;