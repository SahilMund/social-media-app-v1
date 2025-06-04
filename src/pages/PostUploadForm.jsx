import React, { useState, useRef } from "react";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import "../styles/post-form.css";
import { toast } from "react-toastify";
import { createPost, fileUpload, getPostById, updatePost } from "../service/post";
import { getAuthToken } from "../helpers/localstorage";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PostUploadForm = () => {
  const [caption, setCaption] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  const currentMode = window.location.href.includes('/edit-post') ? 'edit' : 'add';

  const fetchPostsById = async (postId) => {
    const token = getAuthToken();
    const {data} = await getPostById(postId, token);

    if(data.success){
        setCaption(data.data.text);
        setPreview(data.data.image);
    }
  }

  const navigate = useNavigate();


  useEffect(() => {
    if(currentMode === 'add') return;


    const postId = window.location.href.split('/').pop(); // TODO: use useLocation hook over here
    console.log('postId', postId);

    fetchPostsById(postId)
  },[])

  const inputRef = useRef(null);

  const handlePost = async () => {
    if (!file && !caption.trim()) {
      toast.error("Please fill all the required details");
      return;
    }

    if(currentMode ==='edit' && !file){
      toast.error("Please change the image");
      return;
    }

    setIsLoading(true);

    try {
      let uploadedUrl = "";

      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      const response = await fileUpload(formData);
      console.log("formData", { formData, response });

      uploadedUrl = response?.data?.data?.file_url;

      const payload = {
        text: caption,
        image: uploadedUrl,
      };

      const token = getAuthToken();

      if(currentMode === 'edit'){
        //edit flow
        const postId = window.location.href.split('/')?.pop(); // TODO: use useLocation hook over here

        const {data} = await updatePost(payload, token, postId);

        if(!data.success) return;

        toast.success("post updated successfully !!");
        setCaption("");
  
        setFile(null);
        setPreview(null);
        inputRef.current.value = null;
        navigate('/my-posts');

        return;
      }


      const {data:createResponse} = await createPost(payload, token);
      console.log('createResponse', createResponse)
      if(!createResponse.success) return;

      toast.success("post created successfully !!");
      setCaption("");

      setFile(null);
      setPreview(null);
      inputRef.current.value = null;
    } catch (error) {
      console.error("errr", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    inputRef.current.value = null;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
   
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <div className="upload-form-container">
      <div className="upload-box" onClick={() => inputRef.current.click()}>
        {preview ? (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
            <FaTimes
              className="remove-image-icon"
              onClick={handleRemoveImage}
            />
          </div>
        ) : (
          <FaPlus className="upload-icon" size={32} />
        )}
        <input
          type="file"
          id="file-input"
          accept="image/*"
          hidden
          ref={inputRef}
          onChange={handleFileChange}
        />
      </div>

      <textarea
        placeholder="Write a caption..."
        className="caption-input"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

     {currentMode === 'add' ? <button className="post-btn" onClick={handlePost} disabled={loading}>
        {loading ? <FaSpinner className="spinner" /> : "Post"}
      </button> :  <button className="post-btn" onClick={handlePost} disabled={loading}>
        {loading ? <FaSpinner className="spinner" /> : "Update Post"}
      </button>}
    </div>
  );
};

export default PostUploadForm;
