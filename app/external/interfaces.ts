export interface UserData {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
}

export interface AddUserInput {
  name: string;
  email: string;
  password: string;
}

export interface AddUserOutput {
  id: string;
  success: boolean;
  error: string;
}

export interface MediaUploadInput {
  file: File;
  userID: string;
  sessionID: string;
}

export interface MediaUploadOutput {
  error?: string;
  story?: {
    id: string;
    sender: 'user' | 'model';
    content: string;
  };
}

export interface StoriesFetchOutput {
  stories: string[];
  error?: string;
}
