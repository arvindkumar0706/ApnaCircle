import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets'
import Loading from '../components/Loading'
import UserProfileInfo from '../components/UserProfileInfo'
import PostCard1 from '../components/PostCard1'
import moment from 'moment'
import ProfileModel from '../components/ProfileModel'
import { useAuth } from '@clerk/react'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import PostCard from '../components/PostCard'

const Profile = () => {
  const currentUser = useSelector((state) => state.user.value)
  const { getToken } = useAuth()
  const { profileId } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async (profileId) => {
    const token = await getToken()
    try {
      const { data } = await api.post(`/api/user/profiles`, { profileId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (data.success) {
        setUser(data.profile)
        setPosts(data.posts)
      } else {
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {

    if (profileId) {
      fetchUser(profileId)
    }
    else if (currentUser?._id) {
      fetchUser(currentUser._id)
    }

  }, [profileId, currentUser])

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
      <div className='max-w-3xl mx-auto'>

        {/* PROFILE HEADER */}
        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
            {user?.cover_photo && (
              <img src={user.cover_photo} alt='' className='w-full h-full object-cover' />
            )}
          </div>

          <UserProfileInfo
            user={user}
            posts={posts}
            profileId={profileId}
            setShowEdit={setShowEdit}
          />
        </div>

        {/* TABS */}
        <div className='mt-6'>
          <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
            {["posts", "media", "likes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* POSTS */}
          {activeTab === 'posts' && (
            <div className='mt-6 flex flex-col items-center gap-6'>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))
              ) : (
                <p className='text-gray-500'>No posts available</p>
              )}
            </div>
          )}
          {activeTab === 'media' && (
            <div className='flex flex-wrap mt-6 max-w-7xl'>

              {posts.map((post) => (

                <React.Fragment key={post._id}>

                  {post.media_type === 'image' &&
                    post.media_url?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        className='w-62 aspect-video m-1 object-cover rounded-2xl'
                        alt=""
                      />
                    ))}

                  {post.media_type === 'video' &&
                    post.media_url?.map((video, index) => (
                      <video
                        key={index}
                        src={video}
                        className='w-62 aspect-video m-1 object-cover rounded-2xl'
                        controls
                      />
                    ))}

                </React.Fragment>

              ))}

            </div>
          )}
        </div>
      </div>
      {showEdit && <ProfileModel setShowEdit={setShowEdit} />}
    </div>
  ) : (
    <Loading />
  )
}

export default Profile