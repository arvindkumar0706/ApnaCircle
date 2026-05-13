import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import api from '../api/axios'

const PostCard = ({ post }) => {

    const navigate = useNavigate()
    const {getToken} = useAuth()

    const currentUser = useSelector((state) => state.user.value)

    // Content
    const caption =
        typeof post.content === 'string'
            ? post.content
            : ''

    // Hashtags
    const postWithHashtags = caption.replace(
        /(#\w+)/g,
        '<span class="text-indigo-600">$1</span>'
    )

    // Likes
    const [likes, setLikes] = useState(post.likes || [])

    // Current media index
    const [currentIndex, setCurrentIndex] = useState(0)

    // Media array
    const mediaList = Array.isArray(post.media)
        ? post.media
        : []

    // Like handler
    const handleLike = async () => {
        try {
            const {data} = await api.post(`/api/post/like`,{postId:post._id},
                {headers :{Authorization:`Bearer ${await getToken()}`}}
            )
            if (data.success) {
                toast.success(data.message)
                setLikes(prev=>{
                    if (prev.includes(currentUser._id)) {
                        return prev.filter(id=> id !== currentUser._id)
                    }else{
                        return [...prev,currentUser._id]
                    }
                })
            }else{
                toast(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>

            {/* USER INFO */}
            <div
                onClick={() => navigate('/profile/' + post.user._id)}
                className='inline-flex items-center gap-3 cursor-pointer'
            >

                <img
                    src={post.user?.profile_picture}
                    alt=""
                    className='w-10 h-10 rounded-full shadow'
                />

                <div>
                    <div className='flex items-center space-x-1'>

                        <span>
                            {post.user?.full_name}
                        </span>

                        <BadgeCheck className='w-4 h-4 text-blue-500' />

                        <div className='text-gray-500 text-sm'>
                            @{post.user?.username} ·{' '}
                            {moment(post.createdAt).fromNow()}
                        </div>

                    </div>
                </div>

            </div>

            {/* CAPTION */}
            {caption && (
                <div
                    className='text-gray-800 text-sm whitespace-pre-line'
                    dangerouslySetInnerHTML={{
                        __html: postWithHashtags
                    }}
                />
            )}

            {/* MEDIA */}
            {mediaList.length > 0 && (

                <div className='relative w-full'>

                    {/* Counter */}
                    {mediaList.length > 1 && (
                        <div className='absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10'>
                            {currentIndex + 1}/{mediaList.length}
                        </div>
                    )}

                    {/* Media Container */}
                    <div className='w-full h-[400px] flex items-center justify-center overflow-hidden rounded-lg bg-black'>

                        {/* IMAGE */}
                        {mediaList[currentIndex]?.type === 'image' ? (

                            <img
                                src={mediaList[currentIndex]?.url}
                                className='w-full h-full object-cover'
                                alt=""
                            />

                        ) : (

                            /* VIDEO */
                            <video
                                src={mediaList[currentIndex]?.url}
                                className='w-full h-full object-cover'
                                controls
                            />

                        )}

                    </div>

                    {/* Navigation Buttons */}
                    {mediaList.length > 1 && (
                        <>

                            {/* Previous */}
                            <button
                                onClick={() =>
                                    setCurrentIndex(prev =>
                                        Math.max(prev - 1, 0)
                                    )
                                }
                                className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded'
                            >
                                ‹
                            </button>

                            {/* Next */}
                            <button
                                onClick={() =>
                                    setCurrentIndex(prev =>
                                        Math.min(
                                            prev + 1,
                                            mediaList.length - 1
                                        )
                                    )
                                }
                                className='absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded'
                            >
                                ›
                            </button>

                        </>
                    )}

                </div>

            )}

            {/* ACTIONS */}
            <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>

                {/* LIKE */}
                <div className='flex items-center gap-1'>

                    <Heart
                        className={`w-4 h-4 cursor-pointer ${
                            likes?.includes(currentUser?._id)
                                ? 'text-red-500 fill-red-500'
                                : ''
                        }`}
                        onClick={handleLike}
                    />

                    <span>{likes?.length || 0}</span>

                </div>

                {/* COMMENTS */}
                <div className='flex items-center gap-1'>

                    <MessageCircle className='w-4 h-4' />

                    <span>12</span>

                </div>

                {/* SHARE */}
                <div className='flex items-center gap-1'>

                    <Share2 className='w-4 h-4' />

                    <span>7</span>

                </div>

            </div>

        </div>
    )
}

export default PostCard