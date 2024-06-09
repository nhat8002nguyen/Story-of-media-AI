'use client'

import { appContext, appDispatchContext } from '@/app/context';
import { MediaUploadOutput } from '@/app/external/interfaces';
import { uploadMedia } from '@/app/lib/actions';
import { cleanAIText, isImageFile } from '@/app/lib/utils';
import { Button } from '@/app/ui/button';
import usePrevious from '@/hooks';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { v4 } from 'uuid';


export default function Page() {
  const initialState: MediaUploadOutput = { error: undefined, story: undefined }
  const [state, dispatch] = useFormState(uploadMedia, initialState)
  const [formFile, setFormFile] = useState<File | null>(null)

  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [socketPending, setSocketPending] = useState<boolean>(false)

  const { chatSessionID } = useContext(appContext)
  const prevSessionID = usePrevious(chatSessionID)
  const { dispatchChatSessionID } = useContext(appDispatchContext)

  useEffect(() => {
    // if users choose a historic chat.
    if (prevSessionID !== null && chatSessionID !== prevSessionID) {
      const data = new FormData()
      data.set("reset", "ok")
      dispatch(data)
    }
    const newSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_STORY_WEB_SOCKET_BASE}/api/story/ws?user_id=${localStorage.getItem('email')}&session_id=${chatSessionID}`
    );
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('New WebSocket Client Connected');
      setChatMessages([])
    };

    newSocket.onmessage = (message: MessageEvent<string>) => {
      setChatMessages((prev) => [...prev, message.data]);
      console.log('Received: ', message.data);
      setSocketPending(false)
    };

    return () => {
      newSocket.close();
    };
  }, [chatSessionID, prevSessionID]);

  const sendMessage = () => {
    if (socket && inputMessage.trim() !== '') {
      setChatMessages((prev) => [...prev, inputMessage])
      socket.send(inputMessage);
      setInputMessage('');
      setSocketPending(true)
    }
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(event.target.value);
  };

  const handleClickFileArea = () => {
    document.getElementById("mediaInput")?.click()
  }

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFormFile(e.target.files?.[0] ?? null)
  }

  const handleAction = async (formData: FormData) => {
    formData.set("userID", localStorage.getItem("email") as string)
    const sessionID = v4()
    dispatchChatSessionID({ type: "replace", payload: sessionID })
    formData.set("sessionID", sessionID)
    dispatch(formData)
  }

  const getImgSrc = (data: string, mimeType: string) => {
    return `data:${mimeType};base64,${data}`;
  }

  const parseSocketMessage = (m: string) => {
    try {
      const messages: ChatMessage[] = JSON.parse(m)

      // if have state?.story, ignore the first 2 messages to avoid duplicates. 
      return messages.slice(state?.story ? 2 : 0).map((m, i) => (
        <div key={i} className={`p-4 ${m.Role === "model" ? "bg-white" : "bg-gray-300"} rounded-lg`}>
          {typeof m.Parts[0] === "string" ?
            <p style={{ whiteSpace: "pre-line" }}>
              {cleanAIText(m.Parts[0])}
            </p> : m.Parts[0].MIMEType.includes('image')
              ? <Image width={700} height={700} src={getImgSrc(m.Parts[0].Data, m.Parts[0].MIMEType)} alt='Image' />
              : <p>Original file</p>}
        </div>
      ))
    } catch (err) {
      return (
        <div className={`p-4 bg-white rounded-lg`}>
          <p style={{ whiteSpace: "pre-line" }}>
            {cleanAIText(m)}
          </p>
        </div>
      )
    }
  }

  const handleTextareaKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        sendMessage();
      } else {
        const textarea = e.target as HTMLTextAreaElement;
        const cursorPosition = textarea.selectionStart;
        textarea.selectionStart = cursorPosition + 1;
        textarea.selectionEnd = cursorPosition + 1;
      }
    }
  }

  return (
    <main className='h-full'>
      {(state == undefined || !state.story) && !chatSessionID
        ? <form className='flex flex-col items-center gap-4' action={handleAction}>
          <div onClick={() => handleClickFileArea()} className='flex flex-col mt-16 justify-center items-center p-8 border rounded-lg bg-white cursor-pointer shadow-primary-button'>
            <input accept=".jpg,.jpeg,.png,.pdf,.txt" type='file' id='mediaInput' name='mediaInput' hidden onChange={handleChangeFile} />
            <ClipboardDocumentListIcon className='w-32 h-32' />
            <p>{formFile ? formFile.name : "Upload a media file to generate a story"}</p>
          </div>
          <Button>Submit</Button>
        </form>
        : <div className='flex h-full items-end gap-4'>
          <div className='flex-2 flex flex-col gap-4 h-full justify-between'>
            <div className='flex flex-col flex-1 gap-4 h-full justify-start overflow-y-scroll'>
              {state?.story && <>
                {formFile && <div className={`p-4 bg-gray-300 rounded-lg`}>
                  {isImageFile(formFile.name)
                    ? <Image width={700} height={700} src={URL.createObjectURL(formFile)} alt='input file' />
                    : <p>File: {formFile.name}</p>
                  }
                </div>}
                <div className={`p-4 ${state.story.sender === "model" ? "bg-white" : "bg-gray-300"} rounded-lg`}>
                  <p style={{ whiteSpace: "pre-line" }}>
                    {cleanAIText(state.story.content)}
                  </p>
                </div>
              </>}
              {chatMessages.map(m => parseSocketMessage(m))}
            </div>
            <div>
              <form action={sendMessage} className='flex gap-4 items-end'>
                <textarea onKeyDown={handleTextareaKeydown} value={inputMessage} onChange={handleChangeMessage} className='rounded-md w-full max-h-40' placeholder="Enter your message" />
                <Button disabled={socketPending} className={`${socketPending ? "pointer-events-none opacity-50" : ""}`}>
                  Submit
                </Button>
              </form>
              <p className='text-tiny text-gray-700 text-center'>
                Powered by story-of-media, Nhat&apos;s Mindful AI, with <Link href={"https://deepmind.google/technologies/gemini/flash/"}>Gemini-1.5-flash
                </Link>.
              </p>
            </div>
          </div>
        </div>}
    </main>
  );
}