import React, { useRef, useState } from 'react';
import { FaPlus, FaTimes, FaSpinner } from 'react-icons/fa';
import '../styles/postForm.css';
import axios from 'axios';
import { BASE_URL } from '../service/endpoint';
import { getAuthToken } from '../helpers/localstorage';

const PostUploadForm = () => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [caption, setCaption] = useState('');
    const [loading, setLoading] = useState(false);
    const fileRef = useRef(null);

    const handleRemoveImage = (e) => {
        e.stopPropagation();
        setFile(null);
        setPreviewUrl('');
        fileRef.current.value = null;
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile)); // 👈 Fix image preview
        }
    };

    const handleCreatePost = async () => {
        if (!file && !caption.trim()) {
            alert("Please provide a caption or an image");
            return;
        }

        const token = getAuthToken();

        setLoading(true);
        try {
            let uploadedUrl = '';

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await axios.post(BASE_URL + '/post/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true,
                });
                uploadedUrl = data.data.file_url;
            }

            const payload = {
                text: caption,
                image: uploadedUrl,
            };

            const { data } = await axios.post(BASE_URL + '/post/create', payload, {
                headers: { Authorization: 'Bearer ' + token },
                withCredentials: true,
            });

            console.log('Post created:', data);

            // Clear form
            setCaption('');
            handleRemoveImage();
        } catch (err) {
            console.error('Post creation error', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-form-container">
            <div className="upload-box" onClick={() => fileRef.current.click()}>
                {!previewUrl ? (
                    <FaPlus size={32} className="upload-icon" />
                ) : (
                    <div className="image-preview">
                        <img src={previewUrl} alt="Preview" />
                        <FaTimes className="remove-image-icon" onClick={handleRemoveImage} />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    hidden
                    onChange={handleFileChange}
                />
            </div>

            <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="caption-input"
            />

            <button
                className="post-btn"
                onClick={handleCreatePost}
                disabled={loading}
            >
                {loading ? <FaSpinner className="spinner" /> : 'Post'}
            </button>
        </div>
    );
};

export default PostUploadForm;
