'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { signIn, signOut } from '../api/auth/[...nextauth]';
import external from '../external';
import { MediaUploadOutput } from '../external/interfaces';

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
};

export const register = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  const creds = z
    .object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })
    .safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
  if (!creds.success) {
    return 'Failed to parse credentials.';
  }
  const resp = await external.addUser({
    name: creds.data.name,
    email: creds.data.email,
    password: creds.data.password,
  });
  if (resp.success) {
    redirect('/login');
  } else {
    return resp.error;
  }
};

export const doSignOut = async (
  prevState: string | undefined,
  formData: FormData,
) => {
  await signOut();
  return undefined;
};

export const uploadMedia = async (
  prevState: MediaUploadOutput,
  formData: FormData,
): Promise<MediaUploadOutput> => {
  if (formData.get('reset')) {
    return { error: undefined, story: undefined };
  }

  const resp = await external.uploadMedia({
    file: formData.get('mediaInput') as File,
    userID: formData.get('userID') as string,
    sessionID: formData.get('sessionID') as string,
  });
  return resp;
};

export const doFetchStories = async (
  prevState: string[],
  formData: FormData,
): Promise<string[]> => {
  const data = await external.fetchStories(formData.get('email') as string);
  return data.stories;
};
