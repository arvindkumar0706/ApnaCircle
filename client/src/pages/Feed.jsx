import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
import PostCard from '../components/PostCard'
import RecentMessages from '../components/RecentMessages'
import { useAuth } from '@clerk/react'
import api from '../api/axios'
import toast from 'react-hot-toast'

const Feed = () => {

  const { getToken } = useAuth()

  const [feeds, setFeeds] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all feed posts
  const fetchFeeds = async () => {

    try {

      setLoading(true)

      const token = await getToken()

      const { data } = await api.get('/api/post/feed', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (data.success) {

        // Backend returns posts array
        setFeeds(data.posts || [])

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(error)

      toast.error(
        error.response?.data?.message || error.message
      )

    } finally {

      setLoading(false)

    }
  }

  // Load feed on page open
  useEffect(() => {
    fetchFeeds()
  }, [])

  // Loading screen
  if (loading) {
    return <Loading />
  }

  return (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>

      {/* Feed Section */}
      <div className='w-full max-w-2xl'>

        {/* Stories */}
        <StoriesBar />

        {/* Posts */}
        <div className='p-4 space-y-6'>

          {feeds.length > 0 ? (

            feeds.map((post) => (
              <PostCard key={post._id} post={post} />
            ))

          ) : (

            <div className='bg-white rounded-xl shadow p-8 text-center text-gray-500'>
              No posts available
            </div>

          )}

        </div>
      </div>

      {/* Right Sidebar */}
      <div className='max-xl:hidden sticky top-0'>

        {/* Sponsored */}
        <div className='max-w-xs bg-white text-xs p-4 rounded-md inline-flex flex-col gap-2 shadow'>

          <h3 className='font-semibold text-sm'>
            Sponsored
          </h3>

          <div className='flex gap-1'>
            <img
              src={assets.pamphlet1}
              className='w-25 h-auto rounded-md'
              alt=""
            />

            <img
              src={assets.pamphlet}
              className='w-25 h-auto rounded-md'
              alt=""
            />

            <img
              src={assets.pamphlet1}
              className='w-25 h-auto rounded-md'
              alt=""
            />
          </div>

          <p className='text-slate-600 font-medium'>
            Aarti Homemade Delight | Aarti Achaar
          </p>

          <p className='text-slate-400'>
            ताज़े कच्चे आम, देसी मसाले और शुद्ध तेल से बना स्वादिष्ट अचार |
            <br />
            हर निवाले में घर जैसा स्वाद |
            <br />
            Call Now on +91 9156145041
          </p>

        </div>

        {/* Recent Messages */}
        <RecentMessages />

      </div>

    </div>
  )
}

export default Feed