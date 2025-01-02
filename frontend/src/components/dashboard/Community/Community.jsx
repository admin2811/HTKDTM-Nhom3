import React, { useState } from 'react';
import Post from './Post';
import './Community.css';
import Navbar from "../common/navbar/Navbar";
import Sidebar from "../common/sidebar/Sidebar";

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Minh',
      time: '2 giờ trước',
      content: 'Khóa học thật bổ ích!',
      reactions: { like: 0, love: 0, haha: 0 },
      comments: [{ user: 'Tuấn', text: 'Tôi cũng thấy vậy!' }],
    },
    {
      id: 2,
      user: 'Lâm',
      time: '5 giờ trước',
      content: 'Tôi muốn hỏi một số vấn đề về API, có ai online không?',
      reactions: { like: 0, love: 0, haha: 0 },
      comments: [{ user: 'Minh', text: 'Check ib' }],
    },
  ]);

  const handleReaction = (postId, reaction) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: {
                ...post.reactions,
                [reaction]: post.reactions[reaction] + 1,
              },
            }
          : post
      )
    );
  };

  const handleComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, { user: 'You', text: comment }] }
          : post
      )
    );
  };

  return (
    <div className="community">
      <Sidebar />
      <div className="container-community">
        <Navbar />
        <div className='postes'>
            <h1>Cộng đồng thảo luận</h1>
            {posts.map((post) => (
            <Post key={post.id} post={post} onReaction={handleReaction} onComment={handleComment} />
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default Community;
