import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { dummyUsers } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostCard1 = ({ post }) => {

    // CONTENT FIX
    const caption = typeof post?.content === 'string' ? post.content : ''

    const postWithHashtags = (caption || '').replace(
        /(#\w+)/g,
        '<span class="text-indigo-600">$1</span>'
    )

    // LIKES SAFE
    const [likes, setLikes] = useState(post?.likes || [])

    const currentUser = useSelector((state)=>state.user.value)
    
    const [currentIndex, setCurrentIndex] = useState(0)

    //media_url & image_urls
    const mediaList =
        Array.isArray(post?.media_url)
            ? post.media_url
            : Array.isArray(post?.image_urls)
            ? post.image_urls
            : []

    // ✅ FIX: detect type automatically if missing
    const mediaType = post?.media_type || (post?.image_urls ? 'image' : 'text')

    const navigate = useNavigate()

    // ✅ LIKE TOGGLE
    const handleLike = () => {
        if (likes.includes(currentUser._id)) {
            setLikes(likes.filter(id => id !== currentUser._id))
        } else {
            setLikes([...likes, currentUser._id])
        }
    }

    return (
        <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>

            {/* USER */}
            <div
                onClick={() => navigate('/profile' + post?.user?._id)}
                className='inline-flex items-center gap-3 cursor-pointer'
            >
                <img
                    src={post?.user?.profile_picture}
                    alt=""
                    className='w-10 h-10 rounded-full shadow'
                />
                <div>
                    <div className='flex items-center space-x-1'>
                        <span>{post?.user?.full_name}</span>
                        <BadgeCheck className='w-4 h-4 text-blue-500' />
                        <div className='text-gray-500 text-sm'>
                            @{post?.user?.username} · {moment(post?.createdAt).fromNow()}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            {caption && (
                <div
                    className='text-gray-800 text-sm whitespace-pre-line'
                    dangerouslySetInnerHTML={{ __html: postWithHashtags }}
                />
            )}

            {/* MEDIA */}
            {mediaType !== 'text' && mediaList.length > 0 && (
                <div className='relative w-full'>

                    {/* COUNTER */}
                    {mediaList.length > 1 && (
                        <div className='absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10'>
                            {currentIndex + 1}/{mediaList.length}
                        </div>
                    )}

                    {/* VIEWER */}
                    <div className='w-full h-[400px] flex items-center justify-center overflow-hidden rounded-lg bg-black'>

                        {/* IMAGE */}
                        {mediaType === 'image' && (
                            <img
                                src={mediaList[currentIndex]}
                                className='w-full h-full object-cover'
                                alt=""
                            />
                        )}

                        {/* VIDEO */}
                        {mediaType === 'video' && (
                            <video
                                src={mediaList[currentIndex]}
                                className='w-full h-full object-cover'
                                controls
                            />
                        )}
                    </div>

                    {/* NAVIGATION */}
                    {mediaList.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
                                className='absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded'
                            >
                                ‹
                            </button>

                            <button
                                onClick={() => setCurrentIndex(prev => Math.min(prev + 1, mediaList.length - 1))}
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

                <div className='flex items-center gap-1'>
                    <Heart
                        className={`w-4 h-4 cursor-pointer ${
                            likes.includes(currentUser?._id)
                                ? 'text-red-500 fill-red-500'
                                : ''
                        }`}
                        onClick={handleLike}
                    />
                    <span>{likes.length}</span>
                </div>

                <div className='flex items-center gap-1'>
                    <MessageCircle className='w-4 h-4' />
                    <span>12</span>
                </div>

                <div className='flex items-center gap-1'>
                    <Share2 className='w-4 h-4' />
                    <span>7</span>
                </div>
            </div>
        </div>
    )
}

export default PostCard1