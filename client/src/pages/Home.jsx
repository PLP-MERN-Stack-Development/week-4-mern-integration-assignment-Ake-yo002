// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { postService } from '../services/api';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await postService.getAllPosts();
        setPosts(data.posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map(post => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}