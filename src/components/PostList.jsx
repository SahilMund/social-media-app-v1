
// 3. PostList.jsx
import React from 'react';
import PostCard from './PostCard';

const mockPosts = [
    {
        id: 1,
        userInitials: 'AB',
        datetime: 'May 25, 2025 9:00 AM',
        imageUrl: 'https://via.placeholder.com/400x250',
        caption: 'This is an awesome post!'
    },
    {
        id: 2,
        userInitials: 'CD',
        datetime: 'May 24, 2025 3:15 PM',
        imageUrl: 'https://via.placeholder.com/400x250',
        caption: 'Loving the weather today ☀️'
    },
    {
        id: 3,
        userInitials: 'EF',
        datetime: 'May 23, 2025 7:45 PM',
        imageUrl: 'https://via.placeholder.com/400x250',
        caption: 'Throwback to last summer!'
    },
    {
        id: 4,
        userInitials: 'GH',
        datetime: 'May 22, 2025 1:20 PM',
        imageUrl: 'https://via.placeholder.com/400x250',
        caption: 'Hustle mode: ON 💼🔥'
    },
];

const PostList = () => {
    return (
        <div className="post-list">
            {mockPosts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
