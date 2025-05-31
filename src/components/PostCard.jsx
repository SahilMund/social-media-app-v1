import React, { useState } from 'react';
import { FaTrash, FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
import '../styles/post.css';
import { CommentSection } from './CommentSection';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [showComments, setShowComments] = useState(false);

    return (
        <div className="post-card">
            <div className="post-header">
                <div className="user-info">
                    <div className="user-avatar">{post.userInitials}</div>
                    <div className="datetime">{post.datetime}</div>
                </div>
                <FaTrash className="delete-icon" />
            </div>

            <div className="post-image">
                <img src={post.imageUrl} alt="post" />
            </div>

            <div className="post-caption">
                <p>{post.caption}</p>
            </div>

            <div className="post-actions">
                <span onClick={() => setLiked(!liked)}>
                    {liked ? <FaHeart className="liked" /> : <FaRegHeart />}
                </span>
                <span onClick={() => setShowComments(!showComments)}>
                    <FaComment />
                </span>
                <span>
                    <FaShare />
                </span>
            </div>

            {showComments && <CommentSection />}
        </div>
    );
};

export default PostCard;
