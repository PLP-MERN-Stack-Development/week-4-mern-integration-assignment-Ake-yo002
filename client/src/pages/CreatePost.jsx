import React from 'react';
import PostForm from '../components/PostForm';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import { useContext } from 'react';
import {AuthContext}  from '../context/AuthContext';

export default function CreatePost() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (postData) => {
    try {
      await postService.createPost({
        ...postData,
        author: currentUser._id
      });
      navigate('/');
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
}