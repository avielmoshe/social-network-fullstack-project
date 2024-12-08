import axios from "axios";
import Cookies from "js-cookie";

const base_url = `http://localhost:3000`;
export const signUp = async (user) => {
  try {
    const response = await axios.post(`${base_url}/api/user/signup`, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const signIn = async (user) => {
  try {
    const response = await axios.post(`${base_url}/api/user/signIn`, user, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const isUserValid = async () => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.get(`${base_url}/api/user/validateToken`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    return {
      userLogout: true,
      error: error.response?.data || error.message,
    };
  }
};

export const updateUser = async (updateUser) => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.patch(
      `${base_url}/api/user/updateUser`,
      updateUser,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const deleteUser = async () => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.delete(`${base_url}/api/user/deleteUser`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
