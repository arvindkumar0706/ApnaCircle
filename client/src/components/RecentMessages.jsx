// import React, { useEffect, useState } from 'react'
// import { messagesWithUsers } from '../assets/assets'
// import { Link } from 'react-router-dom'
// import moment from 'moment'

// const RecentMessages = () => {

//     const [messages, setMessages] = useState([])

//     const fetchRecentMessage = async () => {
//         setMessages(messagesWithUsers)
//     }

//     useEffect(() => {
//         fetchRecentMessage()
//     }, [])
//     return (
//         <div className='bg-white max-w-xs mt-4 p-4 max-h-20 rounded-md shadow text-xs text-slate-800'>
//             <h3 className='font-semibold text-slate-8 mb-4'>Recent Messages</h3>
//             <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
//                 {
//                     messages.map((message, index) => (
//                         <Link key={index} className='flex items-start gap-2 py-2 hover:bg-slate-100'>
//                             <img src={message.senderData?.profile_picture} className='w-8 h-8 rounded-full' alt="" />
//                             <div className='w-full'>
//                                 <div className='flex justify-between'>
//                                     <p className='font-medium'>{message.senderData?.full_name}</p>
//                                     <p className='text-[10px] text-slate-400'>{moment(message.createdAt).fromNow()}</p>
//                                 </div>
//                                 <div className='flex justify-between'>
//                                     <p className='text-gray-500'>{message.text ? message.text : 'Media'}</p>
//                                     {!message.seen && <p className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>1</p>}
//                                 </div>
//                             </div>
//                         </Link>
//                     ))
//                 }
//             </div>
//         </div>
//     )
// }
import React, { useEffect, useState } from 'react'
import { dummyRecentMessages, dummyUsers } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecentMessages = () => {

    const [messages, setMessages] = useState([])

    const fetchRecentMessage = async () => {
        const messagesWithUsers = dummyRecentMessages.map(msg => ({
            ...msg,
            senderData: dummyUsers.find(user => user._id === msg.sender)
        }))

        setMessages(messagesWithUsers)
    }

    useEffect(() => {
        fetchRecentMessage()
    }, [])

    return (
        <div className='bg-white max-w-xs mt-4 p-4 rounded-md shadow text-xs text-slate-800'>
            
            <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>

            <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
                
                {messages.map((message, index) => (
                    <Link to={`/message/${message.senderData?._id}`} key={index} className='flex items-start gap-2 py-2 hover:bg-slate-100 rounded'>

                        <img
                            src={message.senderData?.profile_picture}
                            className='w-8 h-8 rounded-full'
                            alt=""
                        />

                        <div className='w-full'>
                            
                            <div className='flex justify-between'>
                                <p className='font-medium'>
                                    {message.senderData?.full_name}
                                </p>

                                <p className='text-[10px] text-slate-400'>
                                    {moment(message.createdAt).fromNow()}
                                </p>
                            </div>

                            <div className='flex justify-between items-center'>
                                <p className='text-gray-500'>
                                    {message.text || 'Media'}
                                </p>

                                {!message.seen && (
                                    <span className='bg-indigo-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px]'>
                                        1
                                    </span>
                                )}
                            </div>

                        </div>

                    </Link>
                ))}

            </div>
        </div>
    )
}

export default RecentMessages
// export default RecentMessages

// import React, { useEffect, useState } from 'react'
// import { dummyRecentMessages, dummyUsers } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const RecentMessages = () => {

//     const [messages, setMessages] = useState([])

//     const fetchRecentMessage = async () => {
//         const messagesWithUser = dummyRecentMessages.map(msg => ({
//             ...msg,
//             senderData: dummyUsers.find(user => user._id === msg.sender)
//         }))

//         setMessages(messagesWithUser)
//     }

//     useEffect(() => {
//         fetchRecentMessage()
//     }, [])

//     return (
//         <div className='bg-white max-w-xs mt-4 p-4 rounded-md shadow text-xs text-slate-800'>
//             <h3 className='font-semibold text-slate-800 mb-4'>Recent Messages</h3>

//             <div className='flex flex-col max-h-56 overflow-y-scroll no-scrollbar'>
//                 {messages.map((message, index) => (
//                     <Link key={index} className='flex items-center gap-2 py-2 hover:bg-slate-100 rounded'>

//                         <img
//                             src={message.senderData?.profile_picture}
//                             className='w-8 h-8 rounded-full'
//                             alt=""
//                         />

//                         <div>
//                             <p className='font-medium'>
//                                 {message.senderData?.full_name}
//                             </p>
//                             <p className='text-gray-500 text-xs'>
//                                 {message.last_message}
//                             </p>
//                         </div>

//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default RecentMessages