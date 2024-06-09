import { AxiosError } from 'axios';
import { storyAxios, userAxios } from './axiosInstance';
import {
  AddUserInput,
  AddUserOutput,
  MediaUploadInput,
  MediaUploadOutput,
  StoriesFetchOutput,
  UserData,
} from './interfaces';

export const getUser = async (email: string) => {
  try {
    const response = await userAxios.get<UserData>(`/api/user/${email}`);
    return response.data;
  } catch (err) {
    return null;
  }
};

export const addUser = async (data: AddUserInput) => {
  try {
    const response = await userAxios.post<AddUserOutput>(`/api/user`, data);
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data as AddUserOutput;
    } else {
      return {
        error: 'something went wrong, please try again later',
      } as AddUserOutput;
    }
  }
};

export const uploadMedia = async (
  data: MediaUploadInput,
): Promise<MediaUploadOutput> => {
  const formData = new FormData();
  formData.append('file', data.file);
  try {
    const response = await storyAxios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        user_id: data.userID,
        session_id: data.sessionID,
      },
    });
    console.log('File upload success');

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data;
    }
    return {
      error: 'something went wrong, please try again',
    } as MediaUploadOutput;
  }
};

const fetchStories = async (email: string): Promise<StoriesFetchOutput> => {
  try {
    const resp = await storyAxios.get('/api/stories', {
      params: { user_id: email },
    });
    return resp.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      return err.response?.data;
    } else {
      return {
        error: 'something went wrong, please try again',
      } as StoriesFetchOutput;
    }
  }
};

const external = {
  addUser,
  getUser,
  uploadMedia,
  fetchStories,
};

export default external;
