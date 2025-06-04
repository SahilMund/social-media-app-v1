import React from "react";
import { useState } from "react";
import { getuserInfo, updateUser } from "../service/user";
import { getAuthToken } from "../helpers/localstorage";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const handleNameChange = (e) => {
    setProfile({
      ...profile,
      name: e.target.value,
    });
  };

  const fetchLoggedInUserInfo = async () => {
    const token = getAuthToken();

    try {
      const { data } = await getuserInfo(token);
      console.log('data', data)
      if(data.success){
        setProfile({
          ...profile,
          name: data.data.user.name,
          email: data.data.user.email,
        });
      }
    } catch (error) {
        toast.error('something went wrong')
    }
  };

  const handleUpdateUser = async () => {
    const token = getAuthToken();

    try {
      const { data } = await updateUser({name: profile.name}, token);
      console.log('data', data)
      if(data.success){
        toast.success(data.message);
        await fetchLoggedInUserInfo();
      }
    } catch (error) {
        toast.error('something went wrong')
        console.log('error', error)
    }
  };

  useEffect(() => {
    fetchLoggedInUserInfo()
  },[])
  return (
    <div className="upload-form-container">
      <div>
        <label>Name</label>
        <input
          className="text-input-field"
          name="name"
          value={profile.name}
          onChange={handleNameChange}
        />
      </div>
      <div>
        <label>Email</label>

        <input
          className="text-input-field"
          name="email"
          value={profile.email}
          disabled
        />
      </div>
      <button className="post-btn" onClick={handleUpdateUser}>
        UPDATE
      </button>
    </div>
  );
};

export default UserProfile;
