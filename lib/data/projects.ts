// Project data - ID tertinggi = project terbaru
// Untuk menambah project baru, tambahkan di akhir array dengan ID baru (id terakhir + 1)

export interface ProjectLink {
    repo_link?: string;
    demo_link?: string;
    btn_name: string;
}

export interface ProjectTag {
    iconName: string; // Nama icon untuk di-render di component
    name: string;
}

export interface Project {
    id: number;
    title: string;
    year: string;
    description: string;
    image: string;
    link: { repo_link: string; btn_name: string }[];
    demo: { demo_link: string; btn_name: string }[];
    tags: ProjectTag[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "#PeduliCOVID-19",
        year: "2021",
        description: "Peduli COVID-19 is a website that contains information about **COVID-19 (Corona Virus Disease 2019) global pandemic**. Starting from the history of pandemics in the world, health information, health protocols to avoid the COVID-19 virus, preparations for the new normal and what people can do to stop the spread of the COVID-19 virus. This website is also responsive and can be accessed from desktop or android.",
        image: "/projects/project1.webp",
        link: [
            { repo_link: "https://github.com/arifian853/pedulicovid-19", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://arifian853.github.io/pedulicovid-19/", btn_name: "Live Demo" }
        ],
        tags: [
            { iconName: "SiHtml5", name: "HTML" },
            { iconName: "SiCss3", name: "CSS" },
            { iconName: "SiJavascript", name: "JavaScript" },
        ]
    },
    {
        id: 2,
        title: "Bring Back The Nature",
        year: "2022",
        description: "Simple survival 3D game made with **Unity** and **C#.** This game was a project of Computer Graphics subject at college when at 4th semester back in 2022 as a final project. The game has a simple mechanic for the player to **collect 5 seeds** to open the portal in the middle of the corrupted island with a lot of obstacles, then win after goes to the portal.",
        image: "/projects/project2.webp",
        link: [
            { repo_link: "https://github.com/arifian853/BringBackTheNature", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://drive.google.com/drive/u/2/folders/1P0Cy4KdjiF9cXpwTo05E8zn5nzsbrB8m", btn_name: "Download" }
        ],
        tags: [
            { iconName: "SiUnity", name: "Unity" },
            { iconName: "SiSharp", name: "C# (C-Sharp)" },
        ]
    },
    {
        id: 3,
        title: "MakanCuy App (PWA)",
        year: "2022",
        description: "Restaurant Catalogue named MakanCuy made with **Progressive Web App (PWA)** with **WebPack** environment. The project was for Front-End Developer Expert module on Frontend and React Developer Dicoding X MSIB back in 2022.",
        image: "/projects/project3.webp",
        link: [
            { repo_link: "https://github.com/arifian853/pwa-restaurant-catalog", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://makancuy-finals.netlify.app/", btn_name: "Live Demo" }
        ],
        tags: [
            { iconName: "SiHtml5", name: "HTML" },
            { iconName: "SiCss3", name: "CSS" },
            { iconName: "SiJavascript", name: "JavaScript" },
            { iconName: "SiWebpack", name: "WebPack" }
        ]
    },
    {
        id: 4,
        title: "Desa Wisata Pengudang Website",
        year: "2022",
        description: "Web for **Pengudang Tourism Village.** Focusing on how tourist can know more about Pengudang Village. The site is made with **WordPress** and a project for **KOSABANGSA** back in 2022 for promoting Pengudang Tourism Village.",
        image: "/projects/project4.webp",
        link: [],
        demo: [
            { demo_link: "https://pengudangbintanmangrove.id/", btn_name: "Demo (No longer live)" }
        ],
        tags: [
            { iconName: "SiWordpress", name: "WordPress" },
        ]
    },
    {
        id: 5,
        title: "Herbal.in",
        year: "2022",
        description: "Web-based app to buy herbal medicines with Google Pay gateway payment. Made with **Create React App (CRA)** and **Google Firebase** authentication. The project was for capstone project on Frontend and React Developer Dicoding X MSIB back in 2022.",
        image: "/projects/project5.webp",
        link: [
            { repo_link: "https://github.com/arifian853/Herbal.in", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://herbal-in.vercel.app/", btn_name: "Live Demo" }
        ],
        tags: [
            { iconName: "FaReact", name: "React" },
            { iconName: "SiFirebase", name: "Firebase" }
        ]
    },
    {
        id: 6,
        title: "RhythmPlayer Music App: Music Player",
        year: "2023",
        description: "Simple Android app for playing music made with **Flutter** and **Dart.** This project is made for **Mobile Programming** subject in college back in 6th semester at 2023.",
        image: "/projects/project6.webp",
        link: [
            { repo_link: "https://github.com/arifian853/RhythmPlayer", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://drive.google.com/file/d/1uJt_jfDJ8cc9hdlqCRH9p-BdkmxtSL9c/view", btn_name: "APK Download" }
        ],
        tags: [
            { iconName: "SiFlutter", name: "Flutter" },
            { iconName: "SiDart", name: "Dart" }
        ]
    },
    {
        id: 7,
        title: "InfiniteTalk: A place for Mentors and Mentee connect and grow!",
        year: "2023",
        description: "A place for Mentors and Mentees connect and grow! This is a mini-forum for mentors and mentees from Infinite Learning to collaborate and connect. In this forum, mentors and mentees can make posts and comment on each other's posts to help or share information! This site is built with **React + Vite**, **Tailwind CSS**, and **Flowbite React** for the frontend. Global state management in this site uses **Redux** with **React Query** for database data management and **Axios** for API handling. The backend is built with **Node.js** and **Express.js**, with a security system implemented using **BCryptJS** and **JSON Web Token (JWT)**. The database used in this system is **MongoDB**.",
        image: "/projects/project7.webp",
        link: [
            { repo_link: "https://github.com/arifian853/InfiniteTalk", btn_name: "Repository" }
        ],
        demo: [],
        tags: [
            { iconName: "FaReact", name: "React" },
            { iconName: "SiTailwindcss", name: "Tailwind CSS" },
            { iconName: "SiMongodb", name: "MongoDB" },
            { iconName: "SiExpress", name: "Express.js" },
            { iconName: "FaNodeJs", name: "Node.js" },
            { iconName: "SiRedux", name: "Redux" }
        ]
    },
    {
        id: 8,
        title: "Simple AI Chat with Google Generative Language API (Gemini API)",
        year: "2024",
        description: "Just a simple chatbot (without history) for asking anything to **Google Gemini** model (Gemini 1.5 Flash 002) with **Google Generative Language API (Gemini API)** from Google AI Studio. This site is protected by Vercel Security Checkpoint for security.",
        image: "/projects/project8.webp",
        link: [
            { repo_link: "https://github.com/arifian853/simple-ai-chat", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://ai-chat-lite.vercel.app/", btn_name: "Live Demo" }
        ],
        tags: [
            { iconName: "FaReact", name: "React" },
            { iconName: "SiTailwindcss", name: "Tailwind CSS" },
            { iconName: "SiGooglegemini", name: "Google Gemini API" }
        ]
    },
    {
        id: 9,
        title: "AI Real-Time Audio Translation",
        year: "2024",
        description: "Developing a generative AI project using AMD PC AI technologies for the international **AMD Pervasive AI Developer Contest** with **Hackster**, in collaboration with a team of IBM Academy: Advance AI mentors from Infinite Learning. Open-Source pre-trained models used in this projects are : **OpenAI Whisper** as **Automatic Speech Recognition (ASR)** Pre-trained Model, **MarianMT** as **Machine Translation (MT)** Pre-trained Model, **tacotron2-DDC** as **Text to Speech (TTS)** Pre-trained Model, and **HiFi-GAN** as **vocoder** Model. Device used in this development is: Minisforum Venus UM790 Pro with AMD Ryzen™ 9 with Ryzen 9 7940HS as a hardware sponsorship.",
        image: "/projects/project9.webp",
        link: [
            { repo_link: "https://github.com/arifian853/realtime-audio-translation", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://www.hackster.io/arifian-saputra/ai-real-time-audio-translation-dcb020", btn_name: "Submission" }
        ],
        tags: [
            { iconName: "FaReact", name: "React" },
            { iconName: "SiTailwindcss", name: "Tailwind CSS" },
            { iconName: "SiFlask", name: "Flask" },
            { iconName: "SiPytorch", name: "PyTorch" }
        ]
    },
    {
        id: 10,
        title: "Rainfall Prediction with LSTM + Attention",
        year: "2024",
        description: "This project explores the use of LSTM (Long Short-Term Memory) and LSTM with an Attention Layer to predict daily rainfall rates in Batam City. The primary goal is to assess the performance difference between the two models when the Attention Layer is implemented. The study leverages the BMKG DataOnline climate dataset and aims to improve prediction accuracy, especially in the context of dynamic and extreme weather changes.",
        image: "/projects/project10.webp",
        link: [
            { repo_link: "https://github.com/arifian853/rainfall-predict-lstm-attention", btn_name: "Repository" }
        ],
        demo: [
            { demo_link: "https://colab.research.google.com/drive/19z8MfcXmCLceR8rKIeCDZSHNxUnvU1oH?usp=sharing", btn_name: "Notebook" }
        ],
        tags: [
            { iconName: "FaPython", name: "Python" },
            { iconName: "SiJupyter", name: "Jupyter" },
            { iconName: "SiTensorflow", name: "TensorFlow" },
            { iconName: "SiKeras", name: "Keras" },
            { iconName: "SiScikitlearn", name: "Scikit-learn" },
            { iconName: "SiFlask", name: "Flask" }
        ]
    },
    {
        id: 11,
        title: "Arifian.AI",
        year: "2025",
        description: "Arifian.ai is a personalized my-own-AI-persona chatbot designed to answer general or public questions about myself. Made from Google T5-small and USE Feature Extraction. Hosted as a Spaces to serve API backend functionality in HuggingFace Spaces.",
        image: "/projects/project11.webp",
        link: [
            { repo_link: "https://github.com/arifian853/arifian.ai", btn_name: "Repo" }
        ],
        demo: [
            { demo_link: "https://arifian.dev/ai", btn_name: "Demo" }
        ],
        tags: [
            { iconName: "FaPython", name: "Python" },
            { iconName: "SiTensorflow", name: "TensorFlow" },
            { iconName: "SiFlask", name: "Flask" },
            { iconName: "SiPytorch", name: "PyTorch" }
        ]
    },
];

// Helper: Get projects sorted by newest first (highest ID first)
export const getProjectsSortedByNewest = () => {
    return [...projects].sort((a, b) => b.id - a.id);
};

// Helper: Get featured projects (top 6 newest)
export const getFeaturedProjects = () => {
    return getProjectsSortedByNewest().slice(0, 6);
};

// Helper: Get older projects (7th onwards)
export const getOlderProjects = () => {
    return getProjectsSortedByNewest().slice(6);
};

// Helper: Get project by ID
export const getProjectById = (id: number) => {
    return projects.find(p => p.id === id);
};
