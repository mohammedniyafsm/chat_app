const BASE_URL = import.meta.env.VITE_API_BASE_URL;

import axios from "axios";

interface SignupType {
  email: string;
  username: string;
  password: string;
}

interface SigninType {
  email: string;
  password: string;
}

interface sendMessageType {
  token: string;
  receiverId: string;
  message: string;
}

export const SignupUser = async (data: SignupType) => {
  const response = await axios.post(`${BASE_URL}/user/signup`, data);
  return response;
};

export const SigninUser = async (data: SigninType) => {
  const response = await axios.post(`${BASE_URL}/user/signin`, data);
  return response;
};

export const AllUserList = async (token: string, query?: string) => {
  const url = query
    ? `${BASE_URL}/user/users?search=${query}`
    : `${BASE_URL}/user/users`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const sendMessage = async ({ receiverId, message, token }: sendMessageType) => {
  const response = await axios.post(
    `${BASE_URL}/user/send`,
    { receiverId, message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getMessage = async (token: string, query: string) => {
  const response = await axios.get(`${BASE_URL}/user/getmessage?receiverId=${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserDetails = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/user/mydata`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
