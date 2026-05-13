import { useAuth } from '@clerk/react'
import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const StoryModel = ({ setShowModel, fetchStories }) => {


    const bgColors = ["#4f46e5", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#1d4ed8", "#9333ea", "#be185d", "#7c2d12", "#374151", "#111827", "#f87171", "linear-gradient(to right,#4f46e5,#8b5cf6)", "linear-gradient(to right,#ec4899,#f43f5e)", "linear-gradient(to right,#f97316,#f59e0b)", "linear-gradient(to right,#22c55e,#10b981)", "linear-gradient(to right,#06b6d4,#3b82f6)", "linear-gradient(to right,#9333ea,#d946ef)", "linear-gradient(to right,#0ea5e9,#38bdf8)", "linear-gradient(to right,#f43f5e,#fb7185)", "linear-gradient(to right,#34d399,#059669)", "linear-gradient(to right,#facc15,#f97316)", "linear-gradient(to right,#c084fc,#9333ea)", "linear-gradient(to right,#38bdf8,#6366f1)", "linear-gradient(to right,#fb7185,#be185d)", "linear-gradient(to right,#4ade80,#22c55e)", "linear-gradient(to right,#f87171,#ef4444)"]
    const [mode, setMode] = useState("text")
    const { getToken } = useAuth()
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setpreviewUrl] = useState(null)
    const MAX_VIDEO_DURATION = 60
    const MAX_VIDEO_SIZE = 50

    const handledMediaUpload = (e) => {

        const file = e.target.files?.[0]

        if (!file) return

        // Video Validation
        if (file.type.startsWith('video')) {

            // File size check
            if (file.size > MAX_VIDEO_SIZE * 1024 * 1024) {

                toast.error('Video cannot exceed 50 MB')

                setMedia(null)
                setpreviewUrl(null)

                return
            }

            const video = document.createElement('video')

            video.preload = 'metadata'

            video.onloadedmetadata = () => {

                window.URL.revokeObjectURL(video.src)

                // Duration check
                if (video.duration > MAX_VIDEO_DURATION) {

                    toast.error('Video duration cannot exceed 1 minute')

                    setMedia(null)
                    setpreviewUrl(null)

                } else {

                    setMedia(file)

                    setpreviewUrl(URL.createObjectURL(file))

                    setText('')

                    setMode('media')
                }
            }

            video.src = URL.createObjectURL(file)
        }

        // Image Upload
        else if (file.type.startsWith('image')) {

            setMedia(file)

            setpreviewUrl(URL.createObjectURL(file))

            setText('')

            setMode('media')
        }

        // Invalid File
        else {

            toast.error('Only image and video files are allowed')
        }
    }
    const handledCreateStory = async () => {

        try {

            const media_type =
                mode === 'media'
                    ? media?.type.startsWith('image')
                        ? 'image'
                        : 'video'
                    : 'text';

            // Validation
            if (media_type === 'text' && !text.trim()) {

                toast.error('Please enter some content');

                return;
            }

            if (
                (media_type === 'image' || media_type === 'video')
                && !media
            ) {

                toast.error('Please select a media file');

                return;
            }

            const formData = new FormData();

            formData.append('content', text);

            formData.append('media_type', media_type);

            formData.append('background_color', background);

            // Append file only if exists
            if (media) {
                formData.append('media', media);
            }

            const token = await getToken();

            const { data } = await api.post(
                '/api/story/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {

                toast.success('Story created successfully');

                setShowModel(false);

                fetchStories();

            } else {

                toast.error(data.message);
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };
    return (
        <div className='fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-5'>
            <div className='w-full max-w-sm'>
                <div className='text-center mb-3 flex items-center justify-between'>
                    <button onClick={() => setShowModel(false)} className='text-white p-2 cursor-pointer'>
                        <ArrowLeft />
                    </button>
                    <h2 className='text-lg font-semibold'>Create Story</h2>
                    <span className='w-10'></span>
                </div>
                <div className='rounded-lg h-74 flex items-center justify-center relative' style={{ background: background }}>
                    {mode === 'text' && (
                        <textarea placeholder="what's on your mind ?" className='bg-transparent text-white w-full h-full p-4 text-lg resize-none focus:outline-none ' onChange={(e) => setText(e.target.value)} value={text} />
                    )}
                    {
                        mode === 'media' && previewUrl && (
                            media?.type.startsWith('image') ? (
                                <img src={previewUrl} className='object-contain max-h-full' alt="" />
                            ) :
                                (
                                    <video src={previewUrl} className='object-contain max-h-full' />
                                )
                        )
                    }
                </div>
                <div className='grid grid-cols-15 gap-2 mt-4'>
                    {bgColors.map((color) => (
                        <button
                            key={color}
                            onClick={() => setBackground(color)}
                            className={`w-5 h-5 rounded-full cursor-pointer border-2 ${background === color ? "border-white scale-110" : "border-transparent"
                                }`}
                            style={{ background: color }}
                        />
                    ))}
                </div>
                <div className='flex gap-2 mt-4'>
                    <button onClick={() => { setMode('text'); setMedia(null); setpreviewUrl(null) }} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'text' ? 'bg-white text-black' : 'bg-zinc-800'}`}>
                        <TextIcon size={18} />Text
                    </button>
                    <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? 'bg-white text-black' : 'bg-zinc-800'
                        }`}>
                        <input type="file" accept='image/* ,video/*' className='hidden' onChange={handledMediaUpload} />
                        <Upload size={18} /> Image/Video
                    </label>

                </div>
                <button onClick={() => toast.promise(handledCreateStory(), {
                    loading: 'Uploading....',
                })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer '>
                    <Sparkle size={18} /> Create Story
                </button>
            </div>
        </div>
    )
}

export default StoryModel