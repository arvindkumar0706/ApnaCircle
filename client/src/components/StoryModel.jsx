import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const StoryModel = ({ setShowModel, fetchStories }) => {


    const bgColors = ["#4f46e5", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#1d4ed8", "#9333ea", "#be185d", "#7c2d12", "#374151", "#111827", "#f87171", "linear-gradient(to right,#4f46e5,#8b5cf6)", "linear-gradient(to right,#ec4899,#f43f5e)", "linear-gradient(to right,#f97316,#f59e0b)", "linear-gradient(to right,#22c55e,#10b981)", "linear-gradient(to right,#06b6d4,#3b82f6)", "linear-gradient(to right,#9333ea,#d946ef)", "linear-gradient(to right,#0ea5e9,#38bdf8)", "linear-gradient(to right,#f43f5e,#fb7185)", "linear-gradient(to right,#34d399,#059669)", "linear-gradient(to right,#facc15,#f97316)", "linear-gradient(to right,#c084fc,#9333ea)", "linear-gradient(to right,#38bdf8,#6366f1)", "linear-gradient(to right,#fb7185,#be185d)", "linear-gradient(to right,#4ade80,#22c55e)", "linear-gradient(to right,#f87171,#ef4444)"]
    const [mode, setMode] = useState("text")
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setpreviewUrl] = useState(null)
    const handledMediaUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            setMedia(file)
            setpreviewUrl(URL.createObjectURL(file))
        }
    }

    const handledCreateStory = async () => {

    }

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
                        <input type="file" accept='image/* ,video/*' className='hidden' onChange={(e) => { handledMediaUpload(e); setMode('media') }} />
                        <Upload size={18}/> Image/Video
                    </label>

                </div>
                <button onClick={()=>toast.promise(handledCreateStory(),{
                    loading:'Uploading....',
                    success:<p>Story Uploaded</p>,
                    error:e=><p>{e.message}</p>,
                })} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer '>
                    <Sparkle size={18}/> Create Story
                </button>
            </div>
        </div>
    )
}

export default StoryModel