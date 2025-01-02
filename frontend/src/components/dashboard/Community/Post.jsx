import React, { useState } from 'react';
import './Community.css';
import { FaThumbsUp, FaHeart, FaLaugh } from 'react-icons/fa';

const Post = ({ post, onReaction, onComment }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    onComment(post.id, comment);
    setComment('');
  };

  return (
    <div className="post">
      <div className="post-header">
        <span className="post-user">{post.user}</span>
        <span className="post-time">{post.time}</span>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="post-actions">
        <div className="reactions">
          <button onClick={() => onReaction(post.id, 'like')}><FaThumbsUp /></button>
          <button onClick={() => onReaction(post.id, 'love')}><FaHeart /></button>
          <button onClick={() => onReaction(post.id, 'haha')}><FaLaugh /></button>
        </div>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Viết bình luận..."
          />
          <button type="submit">Đăng bài</button>
        </form>
      </div>
      <div className="comments">
        {post.comments.map((comment, idx) => (
          <div key={idx} className="comment">
            <span>{comment.user}</span>: {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
