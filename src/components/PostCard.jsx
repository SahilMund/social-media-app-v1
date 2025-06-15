import React from "react";
import {
  FaComment,
  FaEdit,
  FaHeart,
  FaHeartbeat,
  FaRegHeart,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import "../styles/post.css";
import { likePost, UnlikePost } from "../service/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CommentSection from "./CommentSection";
import { useState } from "react";
import { getCommentsByPostId } from "../service/comment";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deletePostById } from "../../toolkit/postSlice";

const PostCard = ({ post, refetch }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();

  const handlePostDelete = async (id) => {

    await dispatch(deletePostById(id)).unwrap();
    toast.success('success')
  };

  const fetchComments = async () => {
    try {

      const { data } = await getCommentsByPostId(post._id);
      setComments(data.data);
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePostEdit = (id) => {
    navigate(`/edit-post/${id}`);
  };

  const handleLike = async () => {
    const postId = post._id;

    try {
      const { data } = await likePost(postId);

      if (data.success) {
        await reFetch();
        toast.success(data.message);
      }
    } catch (error) {
      console.log("errr", error);
      toast.error("something went wrong");
    }
  };

  const handleDisLike = async () => {
    const postId = post._id;

    try {
      const { data } = await UnlikePost(postId);

      if (data.success) {
        await reFetch();
        toast.success(data.message);
      }
    } catch (error) {
      console.log("errr", error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="user-info">
          {/* <div className="user-avatar user-initials">
                {post.user}
            </div> */}
          <div className="datetime">{post.createdAt?.split("T")[0]}</div>
          {window.location.href.includes("/my-posts") && (
            <>
              <FaTrash
                className="delete-icon"
                onClick={() => handlePostDelete(post._id)}
              />
              <FaEdit
                className="edit-icon"
                onClick={() => handlePostEdit(post._id)}
              />
            </>
          )}
        </div>
      </div>
      <div className="post-image">
        <img src={post?.image} alt="post" />
      </div>

      <div className="post-caption">
        <p>{post?.text}</p>
      </div>

      <div className="post-actions">
        <span>
          {post.likes.includes(user?.userId) ? (
            <FaHeart onClick={handleDisLike} />
          ) : (
            <FaRegHeart onClick={handleLike} />
          )}
          ({post?.likesCount})
        </span>
        <span>
          <FaComment onClick={() => setShowComments((prev) => !prev)} />
        </span>
        <span>
          <FaShare />
        </span>
      </div>

      {showComments && <CommentSection postId={post._id} comments={comments} refetch={fetchComments} />}
    </div>
  );
};

export default PostCard;
