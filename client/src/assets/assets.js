import logo from './Logo.svg'
import sample_cover from './sample_cover.jpg'
import sample_profile from './sample_profile.png'
import bg from './bg.jpg'
import group_users from './group_users.png'
import { Home, MessageCircle, Search, UserIcon, Users } from 'lucide-react'
import sponsored from './sponsored_img.jpg'
import pamphlet from './Achaar-Pamphlet.jpg'
import pamphlet1 from './Aam.png'

export const assets = {
    logo, sample_cover, sample_profile, bg, group_users, sponsored,pamphlet,pamphlet1
}

export const menuItemsData = [
    { to: '/', label: 'Feed', Icon: Home },
    { to: '/messages', label: 'Messages', Icon: MessageCircle },
    { to: '/friends', label: 'Connections', Icon: Users },
    { to: '/search', label: 'Discover', Icon: Search },
    { to: '/profile', label: 'Profile', Icon: UserIcon },
];


export const dummyUsers = [

    {
        _id: "user_1",
        email: "john@example.com",
        full_name: "John Cena",
        username: "john_cena",
        bio: "Dreamer | Learner",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "New York, USA",
        followers: ["user_2", "user_3", "user_4"],
        following: ["user_2", "user_5"],
        friends: ["user_2","user_50","user_3","user_4","user_5"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-01T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_2",
        email: "emma@example.com",
        full_name: "Emma Watson",
        username: "emma_w",
        bio: "Books & Coffee",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "London, UK",
        followers: ["user_1", "user_3", "user_6"],
        following: ["user_1", "user_4"],
        friends: ["user_1"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-02T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_3",
        email: "raj@example.com",
        full_name: "Raj Patel",
        username: "raj_codes",
        bio: "Full Stack Dev",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Mumbai, India",
        followers: ["user_1", "user_2", "user_7"],
        following: ["user_4", "user_5"],
        friends: ["user_4"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-03T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_4",
        email: "li@example.com",
        full_name: "Li Wei",
        username: "li_travels",
        bio: "Traveler 🌍",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Beijing, China",
        followers: ["user_3", "user_8"],
        following: ["user_1", "user_2"],
        friends: ["user_3"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-04T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_5",
        email: "sofia@example.com",
        full_name: "Sofia Garcia",
        username: "sofia_g",
        bio: "Food Lover 🍔",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Madrid, Spain",
        followers: ["user_1", "user_9"],
        following: ["user_3"],
        friends: ["user_9"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-05T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    {
        _id: "user_6",
        email: "noah@example.com",
        full_name: "Noah Smith",
        username: "noah_s",
        bio: "Fitness Freak 💪",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Toronto, Canada",
        followers: ["user_2"],
        following: ["user_7", "user_8"],
        friends: ["user_7"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-06T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_7",
        email: "ava@example.com",
        full_name: "Ava Brown",
        username: "ava_b",
        bio: "Artist 🎨",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Sydney, Australia",
        followers: ["user_3", "user_6"],
        following: ["user_6", "user_10"],
        friends: ["user_6"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-07T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_8",
        email: "lucas@example.com",
        full_name: "Lucas Martin",
        username: "lucas_m",
        bio: "Photographer 📸",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Paris, France",
        followers: ["user_4", "user_6"],
        following: ["user_9"],
        friends: ["user_9"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-08T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_9",
        email: "mia@example.com",
        full_name: "Mia Rossi",
        username: "mia_r",
        bio: "Fashion Blogger 👗",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Rome, Italy",
        followers: ["user_5", "user_8"],
        following: ["user_5"],
        friends: ["user_5"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-09T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_10",
        email: "ethan@example.com",
        full_name: "Ethan Kim",
        username: "ethan_k",
        bio: "Gamer 🎮",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Seoul, South Korea",
        followers: ["user_7"],
        following: ["user_11"],
        friends: ["user_11"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-10T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    // Continue same pattern up to user_50

    {
        _id: "user_11",
        email: "olivia@example.com",
        full_name: "Olivia Taylor",
        username: "olivia_t",
        bio: "Music Lover 🎶",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Berlin, Germany",
        followers: ["user_10"],
        following: ["user_12"],
        friends: ["user_10"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-11T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    {
        _id: "user_12",
        email: "william@example.com",
        full_name: "William Scott",
        username: "will_s",
        bio: "Tech Geek 💻",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "San Francisco, USA",
        followers: ["user_11"],
        following: ["user_13"],
        friends: ["user_11"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-12T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_13",
        email: "charlotte@example.com",
        full_name: "Charlotte Lee",
        username: "charlotte_l",
        bio: "Travel & Lifestyle ✈️",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Singapore",
        followers: ["user_12", "user_14"],
        following: ["user_14", "user_15"],
        friends: ["user_14"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-13T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_14",
        email: "james@example.com",
        full_name: "James Anderson",
        username: "james_a",
        bio: "Cricket Lover 🏏",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Manchester, UK",
        followers: ["user_13", "user_15"],
        following: ["user_13", "user_16"],
        friends: ["user_13"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-14T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_15",
        email: "isabella@example.com",
        full_name: "Isabella Fernandez",
        username: "bella_f",
        bio: "Dancer 💃",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Buenos Aires, Argentina",
        followers: ["user_13", "user_14"],
        following: ["user_16"],
        friends: ["user_16"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-15T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_16",
        email: "benjamin@example.com",
        full_name: "Benjamin Wilson",
        username: "ben_w",
        bio: "Entrepreneur 🚀",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Los Angeles, USA",
        followers: ["user_14", "user_15"],
        following: ["user_17"],
        friends: ["user_15"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-16T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_17",
        email: "amelia@example.com",
        full_name: "Amelia Clarke",
        username: "amelia_c",
        bio: "Acting & Drama 🎭",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Dublin, Ireland",
        followers: ["user_16"],
        following: ["user_18"],
        friends: ["user_18"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-17T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_18",
        email: "daniel@example.com",
        full_name: "Daniel Muller",
        username: "daniel_m",
        bio: "Engineer ⚙️",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Zurich, Switzerland",
        followers: ["user_17"],
        following: ["user_19"],
        friends: ["user_17"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-18T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_19",
        email: "harper@example.com",
        full_name: "Harper Johnson",
        username: "harper_j",
        bio: "Yoga & Wellness 🧘",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Vancouver, Canada",
        followers: ["user_18"],
        following: ["user_20"],
        friends: ["user_20"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-19T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_20",
        email: "michael@example.com",
        full_name: "Michael Brown",
        username: "mike_b",
        bio: "Food Blogger 🍕",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Chicago, USA",
        followers: ["user_19"],
        following: ["user_21"],
        friends: ["user_19"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-20T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    {
        _id: "user_21",
        email: "evelyn@example.com",
        full_name: "Evelyn Davis",
        username: "eve_d",
        bio: "Nature Lover 🌿",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Cape Town, South Africa",
        followers: ["user_20"],
        following: ["user_22"],
        friends: ["user_22"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-21T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_22",
        email: "alexander@example.com",
        full_name: "Alexander Novak",
        username: "alex_n",
        bio: "Photographer 📷",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Moscow, Russia",
        followers: ["user_21"],
        following: ["user_23"],
        friends: ["user_21"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-22T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_23",
        email: "ella@example.com",
        full_name: "Ella Williams",
        username: "ella_w",
        bio: "Singer 🎤",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Auckland, New Zealand",
        followers: ["user_22"],
        following: ["user_24"],
        friends: ["user_24"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-23T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_24",
        email: "logan@example.com",
        full_name: "Logan Miller",
        username: "logan_m",
        bio: "Cyclist 🚴",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Amsterdam, Netherlands",
        followers: ["user_23"],
        following: ["user_25"],
        friends: ["user_23"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-24T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_25",
        email: "grace@example.com",
        full_name: "Grace Kim",
        username: "grace_k",
        bio: "Makeup Artist 💄",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Seoul, South Korea",
        followers: ["user_24"],
        following: ["user_26"],
        friends: ["user_26"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-25T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },


    {
        _id: "user_26",
        email: "henry@example.com",
        full_name: "Henry Walker",
        username: "henry_w",
        bio: "Startup Builder 🚀",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Austin, USA",
        followers: ["user_25"],
        following: ["user_27"],
        friends: ["user_25"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-26T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    {
        _id: "user_27",
        email: "scarlett@example.com",
        full_name: "Scarlett Johansson",
        username: "scarlett_j",
        bio: "Actress 🎬",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Los Angeles, USA",
        followers: ["user_26"],
        following: ["user_28"],
        friends: ["user_28"],
        posts: [],
        is_verified: true,
        createdAt: "2026-02-27T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    {
        _id: "user_28",
        email: "jack@example.com",
        full_name: "Jack Wilson",
        username: "jack_w",
        bio: "Football Fan ⚽",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Barcelona, Spain",
        followers: ["user_27"],
        following: ["user_29"],
        friends: ["user_27"],
        posts: [],
        is_verified: false,
        createdAt: "2026-02-28T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    // ⚡ continuing pattern up to 50

    {
        _id: "user_29",
        email: "victoria@example.com",
        full_name: "Victoria Green",
        username: "victoria_g",
        bio: "Designer 🎨",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Milan, Italy",
        followers: ["user_28"],
        following: ["user_30"],
        friends: ["user_30"],
        posts: [],
        is_verified: true,
        createdAt: "2026-03-01T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    {
        _id: "user_30",
        email: "leo@example.com",
        full_name: "Leonardo Costa",
        username: "leo_c",
        bio: "Chef 👨‍🍳",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Lisbon, Portugal",
        followers: ["user_29"],
        following: ["user_31"],
        friends: ["user_29"],
        posts: [],
        is_verified: true,
        createdAt: "2026-03-02T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },



    {
        _id: "user_31",
        email: "nora@example.com",
        full_name: "Nora Ahmed",
        username: "nora_a",
        bio: "Writer ✍️",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Cairo, Egypt",
        followers: ["user_30"],
        following: ["user_32"],
        friends: ["user_32"],
        posts: [],
        is_verified: false,
        createdAt: "2026-03-03T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_32",
        email: "ryan@example.com",
        full_name: "Ryan Cooper",
        username: "ryan_c",
        bio: "Gym Trainer 💪",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Dubai, UAE",
        followers: ["user_31"],
        following: ["user_33"],
        friends: ["user_31"],
        posts: [],
        is_verified: true,
        createdAt: "2026-03-04T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },

    // FINAL USERS

    {
        _id: "user_48",
        email: "zara@example.com",
        full_name: "Zara Khan",
        username: "zara_k",
        bio: "Influencer ✨",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Delhi, India",
        followers: ["user_47"],
        following: ["user_49"],
        friends: ["user_49"],
        posts: [],
        is_verified: true,
        createdAt: "2026-03-20T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_49",
        email: "tom@example.com",
        full_name: "Tom Hardy",
        username: "tom_h",
        bio: "Actor 🎥",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "London, UK",
        followers: ["user_48"],
        following: ["user_50"],
        friends: ["user_48"],
        posts: [],
        is_verified: true,
        createdAt: "2026-03-21T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    },
    {
        _id: "user_50",
        email: "aarav@example.com",
        full_name: "Aarav Sharma",
        username: "aarav_s",
        bio: "Coder 💻",
        profile_picture: sample_profile,
        cover_photo: sample_cover,
        location: "Pune, India",
        followers: ["user_49"],
        following: ["user_1"],
        friends: ["user_1"],
        posts: [],
        is_verified: false,
        createdAt: "2026-03-22T09:00:00.000Z",
        updatedAt: "2026-02-10T09:00:00.000Z"
    }


];

export const dummyStories = [

    {
        _id: "story_1",
        user: "user_1",
        content: "Good Morning 🌅",
        media_url: "",
        media_type: "text",
        background_color: "#4f46e5",
        createdAt: "2026-04-13T08:00:00.000Z",
        updatedAt: "2026-02-25T08:00:00.000Z"
    },
    {
        _id: "story_2",
        user: "user_2",
        content: "",
        media_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        media_type: "image",
        background_color: "",
        createdAt: "2026-02-25T08:10:00.000Z",
        updatedAt: "2026-02-25T08:10:00.000Z"
    },
    {
        _id: "story_3",
        user: "user_3",
        content: "Late night coding 💻",
        media_url: "",
        media_type: "text",
        background_color: "#16a34a",
        createdAt: "2026-02-25T08:20:00.000Z",
        updatedAt: "2026-02-25T08:20:00.000Z"
    },
    {
        _id: "story_4",
        user: "user_4",
        content: "",
        media_url: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
        media_type: "image",
        background_color: "",
        createdAt: "2026-02-25T08:30:00.000Z",
        updatedAt: "2026-02-25T08:30:00.000Z"
    },
    {
        _id: "story_5",
        user: "user_5",
        content: "",
        media_url: "https://www.w3schools.com/html/mov_bbb.mp4",
        media_type: "video",
        background_color: "",
        createdAt: "2026-02-25T08:40:00.000Z",
        updatedAt: "2026-02-25T08:40:00.000Z"
    },
    {
        _id: "story_6",
        user: "user_6",
        content: "Gym done 💪",
        media_url: "",
        media_type: "text",
        background_color: "#dc2626",
        createdAt: "2026-02-25T08:50:00.000Z",
        updatedAt: "2026-02-25T08:50:00.000Z"
    },
    {
        _id: "story_7",
        user: "user_7",
        content: "",
        media_url: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
        media_type: "image",
        background_color: "",
        createdAt: "2026-02-25T09:00:00.000Z",
        updatedAt: "2026-02-25T09:00:00.000Z"
    },
    {
        _id: "story_8",
        user: "user_8",
        content: "",
        media_url: "https://www.w3schools.com/html/movie.mp4",
        media_type: "video",
        background_color: "",
        createdAt: "2026-02-25T09:10:00.000Z",
        updatedAt: "2026-02-25T09:10:00.000Z"
    },
    {
        _id: "story_9",
        user: "user_9",
        content: "Coffee time ☕",
        media_url: "",
        media_type: "text",
        background_color: "#f59e0b",
        createdAt: "2026-02-25T09:20:00.000Z",
        updatedAt: "2026-02-25T09:20:00.000Z"
    },
    {
        _id: "story_10",
        user: "user_10",
        content: "",
        media_url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        media_type: "image",
        background_color: "",
        createdAt: "2026-02-25T09:30:00.000Z",
        updatedAt: "2026-02-25T09:30:00.000Z"
    }

];

export const dummyPosts = [

    {
        _id: "post_1",
        user: "user_1",
        caption: "Enjoying the view 🌄",
        media_url: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"],
        media_type: "image",
        likes: ["user_2", "user_3"],
        comments: [
            { user: "user_2", text: "Nice pic!" },
            { user: "user_3", text: "Awesome 🔥" }
        ],
        createdAt: "2026-02-25T10:00:00.000Z",
        updatedAt: "2026-02-25T10:00:00.000Z"
    },
    {
        _id: "post_2",
        user: "user_2",
        caption: "Reading time 📚",
        media_url: ["https://images.unsplash.com/photo-1512820790803-83ca734da794"],
        media_type: "image",
        likes: ["user_1"],
        comments: [
            { user: "user_1", text: "Great choice!" }
        ],
        createdAt: "2026-02-25T10:10:00.000Z",
        updatedAt: "2026-02-25T10:10:00.000Z"
    },
    {
        _id: "post_3",
        user: "user_3",
        caption: "Coding life 💻",
        media_url: [],
        media_type: "text",
        likes: ["user_4"],
        comments: [
            { user: "user_4", text: "Keep going!" }
        ],
        createdAt: "2026-02-25T10:20:00.000Z",
        updatedAt: "2026-02-25T10:20:00.000Z"
    },
    {
        _id: "post_4",
        user: "user_4",
        caption: "Travel diaries ✈️",
        media_url: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e","https://images.unsplash.com/photo-1513104890138-7c749659a591"],
        media_type: "image",
        likes: ["user_1", "user_3"],
        comments: [],
        createdAt: "2026-02-25T10:30:00.000Z",
        updatedAt: "2026-02-25T10:30:00.000Z"
    },
    {
        _id: "post_5",
        user: "user_5",
        caption: "Delicious food 🍕",
        media_url: ["https://images.unsplash.com/photo-1513104890138-7c749659a591","https://images.unsplash.com/photo-1513104890138-7c749659a591","https://images.unsplash.com/photo-1513104890138-7c749659a591"],
        media_type: "image",
        likes: ["user_2"],
        comments: [],
        createdAt: "2026-02-25T10:40:00.000Z",
        updatedAt: "2026-02-25T10:40:00.000Z"
    },
    {
        _id: "post_6",
        user: "user_6",
        caption: "Workout session 💪",
        media_url: [],
        media_type: "text",
        likes: ["user_7"],
        comments: [],
        createdAt: "2026-02-25T10:50:00.000Z",
        updatedAt: "2026-02-25T10:50:00.000Z"
    },
    {
        _id: "post_7",
        user: "user_7",
        caption: "Art piece 🎨",
        media_url: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"],
        media_type: "image",
        likes: ["user_6"],
        comments: [],
        createdAt: "2026-02-25T11:00:00.000Z",
        updatedAt: "2026-02-25T11:00:00.000Z"
    },
    {
        _id: "post_8",
        user: "user_8",
        caption: "Photography 📸",
        media_url: ["https://images.unsplash.com/photo-1492724441997-5dc865305da7"],
        media_type: "image",
        likes: ["user_9"],
        comments: [],
        createdAt: "2026-02-25T11:10:00.000Z",
        updatedAt: "2026-02-25T11:10:00.000Z"
    },
    {
        _id: "post_9",
        user: "user_9",
        caption: "Fashion vibes 👗#fashion #style",
        media_url: [],
        media_type: "text",
        likes: ["user_5"],
        comments: [],
        createdAt: "2026-02-25T11:20:00.000Z",
        updatedAt: "2026-02-25T11:20:00.000Z"
    },
    {
        _id: "post_10",
        user: "user_10",
        caption: "Gaming time 🎮",
        media_url: ["https://www.w3schools.com/html/movie.mp4"],
        media_type: "video",
        likes: ["user_8"],
        comments: [],
        createdAt: "2026-02-25T11:30:00.000Z",
        updatedAt: "2026-02-25T11:30:00.000Z"
    }

];





export const dummyRecentMessages = [
  {
    _id: "msg_1",
    sender: "user_1",
    receiver: "user_2",
    text: "Hey, how are you?",
    createdAt: "2026-02-25T12:00:00.000Z",
    seen: false
  },
  {
    _id: "msg_2",
    sender: "user_2",
    receiver: "user_1",
    text: "Let's catch up tomorrow!",
    createdAt: "2026-02-25T12:05:00.000Z",
    seen: true
  },
  {
    _id: "msg_3",
    sender: "user_3",
    receiver: "user_1",
    text: "Check this out 🔥",
    createdAt: "2026-02-25T12:10:00.000Z",
    seen: false
  },
  {
    _id: "msg_4",
    sender: "user_4",
    receiver: "user_1",
    text: "Nice post!",
    createdAt: "2026-02-25T12:15:00.000Z",
    seen: true
  },
  {
    _id: "msg_5",
    sender: "user_5",
    receiver: "user_1",
    text: "Gym today? 💪",
    createdAt: "2026-02-25T12:20:00.000Z",
    seen: false
  },
  {
    _id: "msg_6",
    sender: "user_6",
    receiver: "user_1",
    text: "Working on project",
    createdAt: "2026-02-25T12:25:00.000Z",
    seen: true
  },
  {
    _id: "msg_7",
    sender: "user_7",
    receiver: "user_1",
    text: "Send me details",
    createdAt: "2026-02-25T12:30:00.000Z",
    seen: false
  },
  {
    _id: "msg_8",
    sender: "user_8",
    receiver: "user_1",
    text: "That looks amazing 😍",
    createdAt: "2026-02-25T12:35:00.000Z",
    seen: true
  },
  {
    _id: "msg_9",
    sender: "user_9",
    receiver: "user_1",
    text: "Call me when free",
    createdAt: "2026-02-25T12:40:00.000Z",
    seen: false
  },
  {
    _id: "msg_10",
    sender: "user_10",
    receiver: "user_1",
    text: "Let's go out 🍕",
    createdAt: "2026-02-25T12:45:00.000Z",
    seen: true
  }
]

export const storiesWithUser = dummyStories.map(story => ({
  ...story,
  user: dummyUsers.find(user => user._id === story.user)
}));

export const messagesWithUsers = dummyRecentMessages.map(msg => ({
  ...msg,
  senderData: dummyUsers.find(user => user._id === msg.sender)
}))

export const postsWithUser = dummyPosts.map(post => ({
  ...post,
  user: dummyUsers.find(user => user._id === post.user)
}))

export const dummyUserData = {
    "_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
    "email": "admin@example.com",
    "full_name": "John Warren",
    "username": "john_warren",
    "bio": "🌍 Dreamer | 📚 Learner | 🚀 Doer\r\nExploring life one step at a time.\r\n✨ Staying curious. Creating with purpose.",
    "profile_picture": sample_profile,
    "cover_photo": sample_cover,
    "location": "New York, NY",
    "followers": ["user_2", "user_3"],
    "following": ["user_2", "user_3"],
    "connections": ["user_2", "user_3"],
    "posts": [],
    "is_verified": true,
    "createdAt": "2025-07-09T09:26:59.231Z",
    "updatedAt": "2025-07-21T06:56:50.017Z",
}

const dummyUser2Data = {
    ...dummyUserData,
    _id: "user_2",
    username: "Richard Hendricks",
    full_name: "Richard Hendricks",
    profile_picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
}

const dummyUser3Data = {
    ...dummyUserData,
    _id: "user_3",
    username: "alexa_james",
    full_name: "Alexa james",
    profile_picture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
}

export const dummyPostsData = [
    {
        "_id": "68773e977db16954a783839c",
        "user": dummyUserData,
        "content": "We're a small #team with a big vision — working day and night to turn dreams into products, and #products into something people love.",
        "image_urls": [
            "https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-16T05:54:31.191Z",
        "updatedAt": "2025-07-16T05:54:31.191Z",
    },
    {
        "_id": "686e6d0407845749500c24cd",
        "user": dummyUserData,
        "content": "Unlock your potential—every small step counts. Stay consistent, stay focused, and trust the process. Growth takes time, but every day is a new chance to be better than yesterday. 🌱✨\r\n\r\n#Motivation #GrowthMindset #DailyInspiration #StayFocused #LevelUp #PositiveVibes #KeepGoing #SelfImprovement #MindsetMatters #SuccessJourney",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:22:12.601Z",
        "updatedAt": "2025-07-09T13:22:12.601Z",
    },
    {
        "_id": "686e6b21de877d29cf02e2a7",
        "user": dummyUserData,
        "content": "This is a sample paragraph with some #hashtags like #socialmedia and #marketing. Let's find them!",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T13:14:09.144Z",
        "updatedAt": "2025-07-09T13:14:09.144Z",
    },
    {
        "_id": "686e3e47ba0cf0fecba19947",
        "user": dummyUserData,
        "content": "",
        "image_urls": [
            "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg"
        ],
        "post_type": "image",
        "likes_count": [
            "user_2zdJbcAqiOX9jq2DIueBRQn0lMt"
        ],
        "createdAt": "2025-07-09T10:02:47.213Z",
        "updatedAt": "2025-07-09T10:09:37.075Z",
    },
    {
        "_id": "686e39e86e0585e9e2e58dd3",
        "user": dummyUserData,
        "content": "Finally , got the car !",
        "image_urls": [
            "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg"
        ],
        "post_type": "text_with_image",
        "likes_count": [],
        "createdAt": "2025-07-09T09:44:08.626Z",
        "updatedAt": "2025-07-09T09:44:08.626Z",
    },
    {
        "_id": "686e361389841ba9f2633201",
        "user": dummyUserData,
        "content": "Hello, Everyone this is my first Post",
        "image_urls": [],
        "post_type": "text",
        "likes_count": [],
        "createdAt": "2025-07-09T09:27:47.529Z",
        "updatedAt": "2025-07-09T09:27:47.529Z",
    }
]

export const dummyConnectionsData = [
    dummyUserData,
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowersData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyFollowingData = [
    dummyUser2Data,
    dummyUser3Data
]

export const dummyPendingConnectionsData = [
    dummyUserData
]

export const dummyRecentMessagesData = [
    {
        "_id": "68833af618623d2de81b5381",
        "from_user_id": dummyUser2Data,
        "to_user_id": dummyUserData,
        "text": "I seen your profile",
        "message_type": "text",
        "media_url": "",
        "seen": true,
        "createdAt": "2025-07-25T08:06:14.436Z",
        "updatedAt": "2025-07-25T08:47:47.768Z",
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": dummyUserData,
        "to_user_id": dummyUserData,
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T08:07:11.893Z",
        "seen": true
    },
    {
        "_id": "686fb66c7f0dcbff63b239e7",
        "from_user_id": dummyUser3Data,
        "to_user_id": dummyUserData,
        "text": "how are you",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-10T12:47:40.510Z",
        "updatedAt": "2025-07-10T12:47:40.510Z",
        "seen": false
    }
]

export const dummyMessagesData = [
    {
        "_id": "6878cc3217a54e4d37480122",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "",
        "message_type": "image",
        "media_url": "https://images.pexels.com/photos/106341/pexels-photo-106341.jpeg",
        "createdAt": "2025-07-17T10:10:58.524Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "6878cc3c17a54e4d3748012f",
        "from_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "to_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "text": "This is a Samsung Tablet",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-07-17T10:11:08.437Z",
        "updatedAt": "2025-07-25T10:43:50.346Z",
        "seen": true
    },
    {
        "_id": "68835ffc6e4b42b685069def",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "yah , this tablet is good",
        "message_type": "text",
        "media_url": "",
        "seen": false,
        "createdAt": "2025-07-25T10:44:12.753Z",
        "updatedAt": "2025-07-25T10:44:12.753Z",
    },
        {
        "_id": "6878cc2817a54e4d3748010c",
        "from_user_id": "user_2zdFoZib5lNr614LgkONdD8WG32",
        "to_user_id": "user_2zwZSCMRXQ9GaEEVLgm6akQo96i",
        "text": "you can purchase it from amazon",
        "message_type": "text",
        "media_url": "",
        "createdAt": "2025-08-17T10:10:48.956Z",
        "updatedAt": "2025-08-25T10:43:50.346Z",
        "seen": true
    },
]