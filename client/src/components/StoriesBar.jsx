import React, { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import moment from 'moment'
import StoryModel from './StoryModel'
import StoryViewer from './StoryViewer'
import { useAuth } from '@clerk/react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const StoriesBar = () => {

    const { getToken } = useAuth()

    const [stories, setStories] = useState([])

    const [showModel, setShowModel] = useState(false)

    const [viewStory, setViewStory] = useState(null)

    // Fetch stories
    const fetchStories = async () => {

        try {

            const token = await getToken()

            const { data } = await api.get(
                '/api/story/get',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(data)

            if (data.success) {

                setStories(data.stories || [])

            } else {

                toast.error(data.message)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message || error.message
            )
        }
    }

    useEffect(() => {

        fetchStories()

    }, [])

    return (

        <div className='w-screen sm:w-[calc(100vw-240px)] lg:max-w-2xl no-scrollbar overflow-x-auto px-4'>

            <div className='flex gap-4 pb-5'>

                {/* Create Story Card */}
                <div
                    onClick={() => setShowModel(true)}
                    className='rounded-lg shadow-sm min-w-30 max-w-30 h-40 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed border-indigo-300 bg-white'
                >

                    <div className='h-full flex flex-col items-center justify-center p-4'>

                        <div className='size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3'>

                            <Plus className='w-5 h-5 text-white' />

                        </div>

                        <p className='text-sm font-medium text-slate-700 text-center'>
                            Create Story
                        </p>

                    </div>

                </div>

                {/* Stories */}
                {
                    stories.length > 0 &&
                    stories.map((story, index) => (

                        <div
                            key={index}
                            onClick={() => setViewStory(story)}
                            className='relative rounded-lg shadow min-w-30 max-w-30 h-40 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-b from-indigo-500 to-purple-600'
                        >

                            {/* User Profile */}
                            <img
                                src={story.user?.profile_picture}
                                className='absolute size-8 top-3 left-3 z-10 rounded-full ring-2 ring-white object-cover'
                                alt=""
                            />

                            {/* Text Story */}
                            {
                                story.media_type === 'text' && (

                                    <div
                                        className='absolute inset-0 flex items-center justify-center p-3 text-white text-sm font-medium text-center'
                                        style={{
                                            background: story.background_color
                                        }}
                                    >
                                        {story.content}
                                    </div>
                                )
                            }

                            {/* Image Story */}
                            {
                                story.media_type === 'image' && (

                                    <img
                                        src={story.media}
                                        alt=""
                                        className='h-full w-full object-cover'
                                    />
                                )
                            }

                            {/* Video Story */}
                            {
                                story.media_type === 'video' && (

                                    <video
                                        src={story.media}
                                        className='h-full w-full object-cover'
                                    />
                                )
                            }

                            {/* Story Content */}
                            {
                                story.media_type !== 'text' && (

                                    <div className='absolute bottom-0 left-0 right-0 bg-black/40 p-2'>

                                        <p className='text-white text-xs truncate'>
                                            {story.content}
                                        </p>

                                    </div>
                                )
                            }

                            {/* Time */}
                            <p className='absolute bottom-1 right-2 z-10 text-[10px] text-white'>
                                {moment(story.createdAt).fromNow()}
                            </p>

                        </div>
                    ))
                }

            </div>

            {/* Story Modal */}
            {
                showModel && (
                    <StoryModel
                        setShowModel={setShowModel}
                        fetchStories={fetchStories}
                    />
                )
            }

            {/* Story Viewer */}
            {
                viewStory && (
                    <StoryViewer
                        viewStory={viewStory}
                        setViewStory={setViewStory}
                    />
                )
            }

        </div>
    )
}

export default StoriesBar