'use client'

import React, { createContext, Dispatch, ReactNode, useReducer } from "react"

export const appContext = createContext<{
  chatSessionID: string | null
}>({
  chatSessionID: null
})

export const appDispatchContext = createContext<{
  dispatchChatSessionID: Dispatch<ChatSessionIDReducerAction>
}>({
  dispatchChatSessionID: () => { },
})

const AppContextProvider = appContext.Provider
const AppDispatchContextProvider = appDispatchContext.Provider


export const AppContextAllProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [chatSessionID, dispatchChatSessionID] = useReducer(chatSessionIDReducer, null);

  return (
    <AppContextProvider value={{ chatSessionID }}>
      <AppDispatchContextProvider value={{ dispatchChatSessionID: dispatchChatSessionID }} >
        {children}
      </AppDispatchContextProvider>
    </ AppContextProvider >
  )
}

export interface ChatSessionIDReducerAction {
  type: "replace" | "default",
  payload: string | null
}

const chatSessionIDReducer = (chatSessionID: string | null, action: ChatSessionIDReducerAction) => {
  switch (action.type) {
    case "replace":
      return action.payload
    case "default":
      return chatSessionID
  }
}