import React, { useEffect, useRef, useState } from 'react'
import { dummyMessagesData, dummyUserData } from '../assets/assets'
import { ImageIcon, SendHorizonal, Paperclip, FileText, Video, SmileIcon } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import toast, { Toaster } from 'react-hot-toast'

const ChatBox = () => {

  const messages = dummyMessagesData
  const [text, setText] = useState('')
  const [files, setFiles] = useState([])
  const [user, setUser] = useState(dummyUserData)
  const messagesEndRef = useRef(null)
  const [showAttach, setShowAttach] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const toastShownRef = useRef(false)

  const MAX_FILES = 10

  const handleEmojiClick = (emojiData) => {
    setText(prev => prev + emojiData.emoji)
  }

  const handleFiles = (selectedFiles, type) => {
    const newFiles = Array.from(selectedFiles).map(file => ({
      file,
      type,
      preview: URL.createObjectURL(file)
    }))

    const total = files.length + newFiles.length

    if (total > MAX_FILES) {
      const allowed = MAX_FILES - files.length

      if (!toastShownRef.current) {
        toastShownRef.current = true

        toast.error(`You can only add upto 10 Files at a time`)

        setTimeout(() => {
          toastShownRef.current = false
        }, 1000)
      }

      setFiles(prev => [...prev, ...newFiles.slice(0, allowed)])
    } else {
      setFiles(prev => [...prev, ...newFiles])
    }

    setShowAttach(false)
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const sendMessage = async () => {
    if (!text && files.length === 0) return

    console.log("Text:", text)
    console.log("Files:", files)

    setText('')
    setFiles([])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className='flex flex-col h-screen'>

      <Toaster position="top-right" />

      <div className='flex items-center gap-2 p-2 md:px-10 xl:pl-42 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-300'>
        <img src={user.profile_picture} className='size-8 rounded-full' alt="" />
        <div>
          <p className='font-medium'>{user.full_name}</p>
          <p className='text-sm text-gray-500 -mt-1.5'>@{user.username}</p>
        </div>
      </div>

      <div className='p-5 md:px-10 h-full overflow-hidden'>
        <div className='space-y-4 max-w-4xl mx-auto'>
          {
            messages.toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((message, index) => (
              <div key={index} className={`flex flex-col ${message.to_user_id !== user._id ? 'items-start' : 'items-end'}`}>
                <div className={`p-2 text-sm max-w-sm bg-white text-slate-700 rounded-lg shadow ${message.to_user_id !== user._id ? 'rounded-bl-none' : 'rounded-br-none'}`}>
                  {message.message_type === 'image' && <img src={message.media_url} className='w-full max-w-sm rounded-lg mb-1' alt="" />}
                  <p>{message.text}</p>
                </div>
              </div>
            ))
          }
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className='px-4 relative'>

        {files.length > 0 && (
          <div className='max-w-2xl mx-auto mb-2'>
            <div className='flex gap-2 flex-wrap'>
              {files.map((item, index) => (
                <div key={index} className='relative'>

                  <span
                    onClick={() => removeFile(index)}
                    className='absolute -top-2 -right-2 bg-black text-white rounded-full text-xs px-1 cursor-pointer z-10'
                  >
                    ✕
                  </span>

                  {item.type === 'image' && (
                    <img src={item.preview} className='h-10 w-10 object-cover rounded-md shadow' />
                  )}

                  {item.type === 'video' && (
                    <video src={item.preview} className='h-10 w-10 object-cover rounded-md shadow' />
                  )}

                  {item.type === 'document' && (
                    <div className='h-10 w-10 flex items-center justify-center bg-gray-200 rounded-md shadow text-sm'>
                      📄
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        <div className='flex items-center gap-2 pl-3 pr-2 py-2 bg-white w-full max-w-2xl mx-auto border border-gray-200 shadow rounded-full mb-5'>

          <div className='relative flex-shrink-0'>
            <Paperclip
              className='size-6 text-gray-500 cursor-pointer'
              onClick={() => setShowAttach(prev => !prev)}
            />

            {showAttach && (
              <div className='absolute bottom-12 left-0 bg-white shadow-lg rounded-lg p-2 flex flex-col gap-2 w-40'>

                <label className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded'>
                  <ImageIcon size={18} /> Image
                  <input
                    type="file"
                    hidden
                    multiple
                    accept='image/*'
                    disabled={files.length >= MAX_FILES}
                    onChange={(e) => handleFiles(e.target.files, 'image')}
                  />
                </label>

                <label className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded'>
                  <Video size={18} /> Video
                  <input
                    type="file"
                    hidden
                    multiple
                    accept='video/*'
                    disabled={files.length >= MAX_FILES}
                    onChange={(e) => handleFiles(e.target.files, 'video')}
                  />
                </label>

                <label className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded'>
                  <FileText size={18} /> Document
                  <input
                    type="file"
                    hidden
                    multiple
                    accept='.pdf,.doc,.docx,.txt'
                    disabled={files.length >= MAX_FILES}
                    onChange={(e) => handleFiles(e.target.files, 'document')}
                  />
                </label>

              </div>
            )}
          </div>

          <input
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            onChange={(e) => setText(e.target.value)}
            value={text}
            type="text"
            className='flex-1 min-w-0 outline-none text-slate-700 ml-2'
            placeholder='Type a Message...'
          />

          <div className='relative flex-shrink-0'>
            <span
              className='cursor-pointer text-xl'
              onClick={() => setShowEmoji(prev => !prev)}
            >
              <SmileIcon size={30} color='indigo' />
            </span>

            {showEmoji && (
              <div className='absolute bottom-12 right-0 z-50'>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>

          <button
            onClick={sendMessage}
            className='bg-gradient-to-r flex-shrink-0 from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800 active:scale-95 cursor-pointer text-white p-2 rounded-full'
          >
            <SendHorizonal size={18} />
          </button>

        </div>
      </div>
    </div>
  )
}

export default ChatBox