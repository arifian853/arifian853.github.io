<h1 align="center">  Arifian Saputra's Personal Portfolio Page </h1>

<p align="center"> 
Arifian Saputra's personal portfolio page
</p>

<div align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
</div>

### Hosting

- Hosted on: ![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
- Link : [Github Pages](https://arifian853.github.io) , [Vercel](https://arifian853.vercel.app)

### Site routes

- Home
```
http://localhost:5173
```

- About
```
http://localhost:5173/about
```

- Projects
```
http://localhost:5173/project
```

- Project Details
```
http://localhost:5173/project/:id
```

- Arifian.AI  (Now offline)
```
http://localhost:5173/chat-ai
```

- Say something to me! (Soon)
```
http://localhost:5173/say
```

### Chatbot tech stack

Arifian.ai is a personalized my-own-AI-persona chatbot designed to answer general or public questions about myself.

**Current Version (v1.0 Alpha) - RAG Technology:**

Technologies used:

- **Google Gemini 2.5 Flash** (Base LLM)
- **Google Embedding 001** (Vector embeddings)
- **RAG (Retrieval-Augmented Generation)** architecture
- **NodeJS + Express** (Backend)
- **MongoDB** (Vector database storage)
- **Real-time knowledge retrieval** with context injection
- **Multi-format support** (PDF, JSON, TXT)
- Hosted on **Hugging Face Spaces**

**Major Update:** Migrated from fine-tuned T5-Small model to RAG technology for improved response accuracy and dynamic knowledge base.

**Previous Version (v0.4.1) - Deprecated:**

Technologies used:

- Google T5-Small (Fine-tuned)
- Universal Sentence Encoder (USE)
- Flask
- Docker
- Hosted as serverless service at IBM Cloud Code Engine

Latest fine-tuned model performance (v0.4.1):

- ROUGE-1: 0.6640
- ROUGE-2: 0.5327
- ROUGE-L: 0.6441
- BLEU Score: 52.0508%
- Average Training Loss: 0.0819
- Training Data: 297 question-answer pairs

**Note:** The fine-tuned model approach has been replaced by RAG technology in v1.0 for better scalability and accuracy.

Check here: [Arifian.ai](https://github.com/arifian853/arifian.ai) repository.

