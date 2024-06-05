import { Button } from '@/app/ui/button';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dashboard"
}

export default async function Page() {
  return (
    <main className='h-full'>
      {false ? <div>
        <div className='flex flex-col mt-16 justify-center items-center p-8 border rounded-lg bg-white cursor-pointer shadow-primary-button'>
          <ClipboardDocumentListIcon className='w-32 h-32' />
          <p>Upload a media file to generate a story</p>
        </div>
      </div>
        : <div className='flex h-full items-end gap-4'>
          <div className='flex-2 flex flex-col gap-4 h-full justify-between'>
            <div className='flex flex-col flex-1 gap-4 h-full justify-start overflow-y-scroll'>
              <div className='p-4 bg-white rounded-lg'>
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
                <br />
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
                <br />
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
              </div>
              <div className='p-4 bg-gray-300 rounded-lg'>
                <p>
                  Are you looking to find out the current width and height of your browser window.
                </p>
              </div>
              <div className='p-4 bg-white rounded-lg'>
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
              </div>
              <div className='p-4 bg-gray-300 rounded-lg'>
                <p>
                  Are you looking to find out the current width and height of your browser window.
                </p>
              </div>
              <div className='p-4 bg-white rounded-lg'>
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
                <br />
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
                <br />
                <p>
                  Are you looking to find out the current width and height of your browser window, or do you need to set specific dimensions for testing or development purposes? If it's the latter, are you working with JavaScript, CSS, or another language?
                </p>
              </div>
            </div>
            <div className='flex gap-4 items-end'>
              <textarea className='rounded-md w-full max-h-40' placeholder="Enter your message" />
              <Button>Submit</Button>
            </div>
          </div>
        </div>}
    </main>
  );
}