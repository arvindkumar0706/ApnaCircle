import { BadgeCheck, Heart, MessageCircle, Share2 } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'
import { dummyUsers } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
    const caption = typeof post.caption === 'string' ? post.caption : ''
    const postWithHashtags = (post.caption || '').replace(/(#\w+)/g,'<span class="text-indigo-600">$1</span>')
    const [likes, setLikes] = useState(post.likes)
    const currentUser = dummyUsers[0]
    const [currentIndex, setCurrentIndex] = useState(0)
    const handleLike = async () => {

    }

    const mediaList = Array.isArray(post.media_url) ? post.media_url : []



    const nextSlide = () => {
        if (currentIndex < mediaList.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1)
        }
    }

    const navigate  = useNavigate()

    return (
        <div className='bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl'>
            <div onClick={()=>navigate('/profile/'+post.user._id)} className='inline-flex items-center gap-3 cursor-pointer'>
                <img src={post.user.profile_picture} alt="" className='w-10 h-10 rounded-full shadow' />
                <div>
                    <div className='flex items-center space-x-1'>
                        <span>{post.user.full_name}</span>
                        <BadgeCheck className='w-4 h-4 text-blue-500' />
                        <div className='text-gray-500 text-sm'>@{post.user.username} · {moment(post.createdAt).fromNow()} </div>
                    </div>
                </div>

            </div>

            {post.caption && (<div
                className='text-gray-800 text-sm whitespace-pre-line'
                dangerouslySetInnerHTML={{ __html: postWithHashtags }}
            />
            )}

            {post.media_type !== 'text' && mediaList.length > 0 && (
                <div className='relative w-full'>

                    {/* Counter */}
                    {mediaList.length > 1 && (
                        <div className='absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10'>
                            {currentIndex + 1}/{mediaList.length}
                        </div>
                    )}

                    {/* Media */}
                    <div className='w-full h-[400px] flex items-center justify-center overflow-hidden rounded-lg bg-black'>

                        {/* IMAGE */}
                        {post.media_type === 'image' && (
                            <img
                                src={mediaList[currentIndex]}
                                className='w-full h-full object-cover'
                            />
                        )}

                        {/* VIDEO */}
                        {post.media_type === 'video' && (
                            <video
                                src={mediaList[currentIndex]}
                                className='w-full h-full object-cover'
                                controls
                                
                            />
                        )}

                    </div>

                    {/* Navigation */}
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

            <div className='flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300'>
                <div className='flex items-center gap-1'>
                    <Heart className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`} onClick={handleLike} />
                    <span>{likes.length}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <MessageCircle className='w-4 h-4' />
                    <span>{12}</span>
                </div>
                <div className='flex items-center gap-1'>
                    <Share2 className='w-4 h-4' />
                    <span>{7}</span>
                </div>
            </div>



        </div>
    )
}

export default PostCard