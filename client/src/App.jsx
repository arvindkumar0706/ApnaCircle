import React, { useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import ChatBox from './pages/ChatBox'
import Friends from './pages/Friends'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CreatePost from './pages/CreatePost'
import { useAuth, useUser } from '@clerk/react'
import Layout from './pages/Layout'
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from './features/user/userSlice'
import { fetchConnections } from './features/connections/connectionsSlice'
import { addMessages } from './features/messages/messagesSlice'
import Notifications from './components/Notifications'

const App = () => {
  const { user } = useUser()
  const { currentUser } = useSelector((state) => state.user)
  const { getToken } = useAuth()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const pathnameRef = useRef(pathname)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const token = await getToken()
        dispatch(fetchUser(token))
        dispatch(fetchConnections(token))
      }
    }
    fetchData()

  }, [user, getToken, dispatch])

  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

  useEffect(() => {

    if (!user) return

    const eventSource = new EventSource(
      `${import.meta.env.VITE_BASEURL}/api/message/sse/${user.id}`
    )

    eventSource.onopen = () => {
      console.log("SSE Connected")
    }

    eventSource.onmessage = (event) => {

      if (event.data === "connected") return

      const message = JSON.parse(event.data)

      if (pathnameRef.current === `/messages/${message.from_user_id}`) {

        dispatch(addMessages(message))

      } else {

        toast.custom(
          (t) => (
            <Notifications
              t={t}
              message={message}
            />
          ),
          {
            position: "bottom-right",
            duration: 4000
          }
        )
      }
    }

    eventSource.onerror = (error) => {
      console.log("SSE Error", error)
    }

    return () => {
      eventSource.close()
    }

  }, [user])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={!user ? <Login /> : <Layout />}>
          <Route index element={<Feed />} />
          <Route path='messages' element={<Messages />} />
          <Route path='messages/:userId' element={<ChatBox />} />
          <Route path='friends' element={<Friends />} />
          <Route path='search' element={<Discover />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:profileId?' element={<Profile />} />
          <Route path='create-post' element={<CreatePost />} />
        </Route>
      </Routes>
    </>
  )

}

export default App