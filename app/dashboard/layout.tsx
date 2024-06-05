import { signOut } from '@/auth';
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

interface DashboardLayoutProps {
  children?: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen max-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-white text-text-black">
        <div className='px-8 py-8 flex flex-col gap-8 h-full'>
          <h1 className='text-left text-3xl text-primary-color-l'>
            Story of Media <span className='text-text-black'>AI</span>
          </h1>
          <div className='flex flex-col gap-4'>
            <div className=''>
              <Button>New Story</Button>
            </div>
            <div className='max-h-80 overflow-y-scroll'>
              <h3 className='text-lg font-bold'>Stories</h3>
              <div className='flex flex-col gap-1'>
                <p className='p-2 rounded-md'>This is the story 1 This is...</p>
                <p className='p-2 bg-gray-300 rounded-md'>This is the story 1 This is...</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
                <p className='p-2 rounded-md'>This is the story 1</p>
              </div>
            </div>
          </div>
          <div className=''>
            <form action={async () => {
              'use server'
              await signOut()
            }}>
              <Button>Sign out</Button>
            </form>
          </div>
        </div>
      </div>
      <div className="App h-screen flex-1 px-4 md:px-8 lg:px-16 pt-20 pb-4 flex flex-col items-center bg-gradient-to-r from-bg-blue-left to-bg-blue-right">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout