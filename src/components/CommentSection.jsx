import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { addComment, deleteComment } from "../service/comment";

const CommentSection = ({ postId, comments, refetch }) => {
  const [input, setInput] = useState("");

  const handleDelete = async (commentId) => {
    try {

      const { data } = await deleteComment(commentId);

      if (data.success) {
        await refetch();
        toast.success(data.message);
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong");
    }
  };

  const getInitials = (name) => name.split(" ")?.map((ele) => ele[0])?.join("")


  const handleAddComment = async () => {
    if (!input) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      const { data } = await addComment(postId, { text: input });

      console.log(data);

      if (data.success) {
        await refetch();
        toast.success(data.message);
      }
    } catch (error) {
      console.error("error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="comment-section">
      {/* lets loop over the comment */}
      {comments?.map((comment) => (
        <div className="comment-item" key={comment._id}>
          <div className="comment-user">
            <div className="user-avatar comment-initials">
              <span>{getInitials(comment?.user?.name)}</span>
            </div>

          </div>
          <p>{comment.text}</p>
          <FaTrash className="comment-delete" onClick={() => handleDelete(comment._id)} />
        </div>
      ))}

      <div className="comment-input-wrapper">
        <input
          type="text"
          placeholder="Add a comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" onClick={handleAddComment}>
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
