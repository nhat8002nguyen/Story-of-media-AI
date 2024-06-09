import axios from 'axios';

export const userAxios = axios.create({
  baseURL: process.env.API_USER_BASE_URL,
  timeout: 10000,
});

export const storyAxios = axios.create({
  baseURL: process.env.API_STORY_BASE_URL,
  timeout: 10000,
});
