import React , { useEffect, useState }from 'react'
import { getMyPosts, getPost } from '../service/post';
import { getAuthToken } from '../helpers/localstorage';
import PostCard from '../components/PostCard';

import '../styles/post.css'

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetcherFunction = window.location.href.includes('/my-posts') ? getMyPosts : getPost;

    const handleFetchPost = async () => {
        setLoading(true);
       try {
        const token = getAuthToken();
        const {data} = await fetcherFunction(token);

        if(data.success){
            setPosts(data.data);
        }

       } catch (error) {
        console.log('error', error)
       }finally{
        setLoading(false);

       }

    }


    useEffect(() => {
        handleFetchPost();
    },[fetcherFunction])

    if(!loading && posts && posts.length === 0){
        return <div>No posts found</div>
    }

    if(loading) return <div>Loading....</div>
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