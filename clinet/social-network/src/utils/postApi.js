import axios from "axios";
import Cookies from "js-cookie";

const base_url = `http://localhost:3000`;

export const createPost = async (postData) => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.post(
      `${base_url}/api/post/cratePost`,
      postData,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${base_url}/api/post`);

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const getAllPostsByUser = async () => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.get(`${base_url}/api/post/myPosts`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const deletePost = async (postId) => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.delete(`${base_url}/api/post/byId/${postId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const likePost = async (postId) => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.put(`${base_url}/api/post/like/${postId}`, 
      {},
      { headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
        return response.data;
      } 
  catch (error) {
        return {
          success: false,
          error: error.response?.data || error.message,
        };
    }
};
