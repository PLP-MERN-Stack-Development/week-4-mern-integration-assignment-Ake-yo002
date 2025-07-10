// src/components/PostCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          <Link to={`/posts/${post.slug}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {post.category?.name}
          </span>
        </div>
      </div>
    </div>
  );
}