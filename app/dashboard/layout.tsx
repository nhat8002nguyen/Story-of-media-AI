'use client'

import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { appDispatchContext } from '../context';
import { doFetchStories, doSignOut } from '../lib/actions';
import { Button } from '../ui/button';

interface DashboardLayoutProps {
  children?: ReactNode
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [state, dispathSignOut] = useFormState(doSignOut, undefined)
  const [stories, dispatchFetchStories] = useFormState(doFetchStories, null)
  const { dispatchChatSessionID } = useContext(appDispatchContext)
  const [selectedItem, setSelectedItem] = useState<string>("")

  useEffect(() => {
    (async () => {
      const email = localStorage.getItem('email')
      if (email) {
        const formData = new FormData()
        formData.set("email", email)
        dispatchFetchStories(formData)
      }
    })()
  }, [])

  const handleClickItem = (sessionID: string) => {
    dispatchChatSessionID({ type: "replace", payload: sessionID })
    setSelectedItem(sessionID)
  }

  return (
    <div className="min-h-screen max-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 bg-white text-text-black">
        <div className='px-8 py-8 flex flex-col gap-8 h-full'>
          <h1 className='text-left text-3xl text-primary-color-l'>
            Story of Media <span className='text-text-black'>AI</span>
          </h1>
          <div className='flex flex-col gap-4'>
            <div className=''>
              <Button onClick={() => window.location.reload()}>New Story</Button>
            </div>
            <StoriesList stories={stories} onClickItem={handleClickItem} selectedItem={selectedItem} />
          </div>
          <div className=''>
            <form action={dispathSignOut}>
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

const StoriesList = ({ stories, onClickItem, selectedItem }: {
  stories: string[] | null,
  onClickItem: (s: string) => void,
  selectedItem?: string
}) => {
  const uniqueStories = Array.from(new Set(stories))

  return (
    <div className='max-h-80 overflow-y-scroll'>
      <h3 className='text-lg font-bold'>Stories</h3>
      <div className='flex flex-col gap-1 cursor-pointer'>
        {stories === null ? "Loading..." : uniqueStories.length > 0 ? uniqueStories.map(s => (
          <p onClick={() => onClickItem(s)} key={s}
            className={`p-2 rounded-md ${selectedItem === s ? "bg-gray-300" : ""}`}>{s}</p>
        )) : "No story found"}
      </div>
    </div>
  )
}

export default DashboardLayout