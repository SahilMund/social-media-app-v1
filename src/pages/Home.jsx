import React, { useEffect } from 'react'
import { getMyPosts, getPost } from '../service/post';
import PostCard from '../components/PostCard';

import '../styles/post.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../toolkit/postSlice';

const Home = () => {
    const fetcherFunction = window.location.href.includes('/my-posts') ? getMyPosts : getPost;

    const dispatch = useDispatch();

    const handleFetchPost = async () => {
        dispatch(fetchPosts(fetcherFunction))
    }

    const { posts, isLoading } = useSelector((state) => state.posts)


    useEffect(() => {
        handleFetchPost();
    }, [fetcherFunction])

    if (!isLoading && posts && posts.length === 0) {
        return <div>No posts found</div>
    }

    if (isLoading) return <div>Loading....</div>
    return (
        <div>
            <div className="post-list">
                {/* Render the list of posts here */}
                {posts?.map((post) => (
                    <PostCard post={post} key={post._id} reFetch={handleFetchPost} />
                ))}
            </div>
        </div>
    )
}

export default Home