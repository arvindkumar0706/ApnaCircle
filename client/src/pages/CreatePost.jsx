import React, { useState, useEffect, useRef } from 'react'
import { Image, Smile, X } from 'lucide-react'
import toast from 'react-hot-toast'
import EmojiPicker from 'emoji-picker-react'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const navigate = useNavigate()
  const { getToken } = useAuth()

  const user = useSelector((state) => state.user.value)

  const [content, setContent] = useState('')
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)

  const pickerRef = useRef()

  // Submit post
  const handleSubmit = async () => {

    // Prevent empty post
    if (!content && media.length === 0) {
      return toast.error("Post cannot be empty")
    }

    try {

      setLoading(true)

      // Create form data
      const formData = new FormData()

      formData.append('content', content)

      // Determine post type
      const postType =
        media.length > 0
          ? 'mixed'
          : 'text'

      formData.append('post_type', postType)

      // Append all selected files
      media.forEach((file) => {
        formData.append('media', file)
      })

      // Send request
      const { data } = await api.post(
        '/api/post/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`
          }
        }
      )

      // Success response
      if (data.success) {

        toast.success('Post Added Successfully')

        navigate('/')

      } else {

        toast.error(data.message)
      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message ||
        error.message
      )

    } finally {

      setLoading(false)
    }
  }

  // Add emoji to textarea
  const onEmojiClick = (emojiData) => {
    setContent((prev) => prev + emojiData.emoji)
  }

  // Close emoji picker when clicking outside
  useEffect(() => {

    const handleClickOutside = (e) => {

      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target)
      ) {
        setShowEmoji(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }

  }, [])

  // Handle media selection
  const handleMediaChange = (e) => {

    const files = Array.from(e.target.files)

    // Limit max files
    if (media.length + files.length > 5) {
      toast.error("Maximum 5 files allowed")
      return
    }

    // Validate files
    const validFiles = files.filter((file) => {

      // Check file type exists
      if (!file.type) return false

      // Validate video size
      if (
        file.type.startsWith('video') &&
        file.size > 20 * 1024 * 1024
      ) {
        toast.error("Video must be less than 20MB")
        return false
      }

      // Allow only image and video
      if (
        !file.type.startsWith('image') &&
        !file.type.startsWith('video')
      ) {
        toast.error("Only images and videos allowed")
        return false
      }

      return true
    })

    // Add new files
    setMedia((prev) => [...prev, ...validFiles])

    // Reset input so same file can be selected again
    e.target.value = null
  }

  // Remove selected media
  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index))
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>

      <div className='max-w-6xl mx-auto p-6'>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2'>
            Create Post
          </h1>

          <p className='text-slate-600'>
            Share your thoughts with the world
          </p>
        </div>

        {/* Main Card */}
        <div className='max-w-xl bg-white p-4 sm:p-8 sm:pb-3 rounded-xl shadow-md space-y-4'>

          {/* User Info */}
          <div className='flex items-center gap-3'>

            <img
              src={user.profile_picture}
              className='w-12 h-12 rounded-full shadow'
              alt=""
            />

            <div>
              <h2 className='font-semibold'>
                {user.full_name}
              </h2>

              <p className='text-sm text-gray-500'>
                @{user.username}
              </p>
            </div>
          </div>

          {/* Textarea */}
          <div className='relative mt-4'>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='w-full resize-none max-h-24 mt-4 pt-2 text-lg outline-none placeholder-gray-400 pr-10'
              placeholder='Write your caption...'
            />

            {/* Emoji Toggle Button */}
            <button
              type="button"
              onClick={() => setShowEmoji((prev) => !prev)}
              className='absolute right-2 bottom-2 top-2 text-xl cursor-pointer'
            >
              <Smile className='w-7 h-7' />
            </button>

            {/* Emoji Picker */}
            {showEmoji && (
              <div
                ref={pickerRef}
                className='absolute right-0 top-12 z-50 shadow-lg'
              >
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}

          </div>

          {/* Media Preview */}
          {media.length > 0 && (

            <div className='flex flex-wrap gap-2 mt-4'>

              {media.map((file, index) => (

                <div
                  key={index}
                  className='relative group'
                >

                  {/* Image Preview */}
                  {file.type.startsWith('image') ? (

                    <img
                      src={URL.createObjectURL(file)}
                      className='h-24 w-32 object-cover rounded-md'
                      alt=""
                    />

                  ) : (

                    /* Video Preview */
                    <video
                      src={URL.createObjectURL(file)}
                      className='h-24 w-32 object-cover rounded-md'
                      controls
                    />

                  )}

                  {/* Remove Media */}
                  <div
                    onClick={() => removeMedia(index)}
                    className='absolute hidden group-hover:flex justify-center items-center top-0 right-0 bottom-0 left-0 bg-black/40 rounded-md cursor-pointer'
                  >
                    <X className='w-6 h-6 text-white' />
                  </div>

                </div>

              ))}

            </div>

          )}

          {/* Bottom Actions */}
          <div className='flex items-center justify-between pt-3 border-t border-gray-300'>

            {/* File Upload */}
            <label
              htmlFor="media"
              className='flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer'
            >
              <Image className='w-6 h-6' />
              Add Media
            </label>

            <input
              type="file"
              id='media'
              accept='image/*,video/*'
              hidden
              multiple
              onChange={handleMediaChange}
            />

            {/* Submit Button */}
            <button
              disabled={loading}
              onClick={handleSubmit}
              className='text-sm bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white font-medium px-8 py-2 rounded-md cursor-pointer disabled:opacity-50'
            >
              {loading ? "Posting..." : "Publish"}
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default CreatePost