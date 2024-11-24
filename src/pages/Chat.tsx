import { Helmet } from "react-helmet";
import { SetStateAction, useEffect, useRef, useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { MdRefresh, MdSend } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo! Ada yang bisa saya bantu?' }
    ]);
    const [input, setInput] = useState('');
    const [isResponding, setIsResponding] = useState(false);
    const [responseTime, setResponseTime] = useState(0);
    const [showChangelog, setShowChangelog] = useState(false);

    useEffect(() => {
        const dontShowAgain = localStorage.getItem("hideChangelog");
        if (!dontShowAgain) {
            setShowChangelog(true);
        }
    }, []);

    const handleDontShowAgain = () => {
        localStorage.setItem("hideChangelog", "true");
    };

    const handleSend = async () => {
        if (input.trim() === '') return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        try {
            const response = await fetch(import.meta.env.VITE_MODEL_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: input })
            });

            const data = await response.json();
            const botResponse = data.answer;

            simulateBotResponse(botResponse);
        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            simulateBotResponse("Sorry, model not yet deployed.");
        }
    };

    const simulateBotResponse = (responseText: string) => {
        const startTime = Date.now();
        setIsResponding(true);
        setMessages((prev) => [...prev, { sender: 'bot', text: '' }]);

        let index = 0;
        const interval = setInterval(() => {
            if (index < responseText.length) {
                setMessages((prev) => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1].text += responseText[index];
                    return updatedMessages;
                });
                index++;
            } else {
                clearInterval(interval);
                const endTime = Date.now();
                setResponseTime(endTime - startTime);
                setIsResponding(false);
            }
        }, 30);
    };

    const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === 'Enter' && !isResponding) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestionClick = (suggestedText: SetStateAction<string>) => {
        setInput(suggestedText);
    };

    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const [suggestionsKey, setSuggestionsKey] = useState(0);

    const renderedSuggestions = useMemo(() => {
        const suggestedMessage = [
            { "message": "Siapakah kamu, Arifian?" },
            { "message": "Tanggal berapa kamu lahir?" },
            { "message": "Dari mana kamu berasal?" },
            { "message": "Kamu bekerja dimana?" },
            { "message": "Dimana kamu tinggal?" },
            { "message": "Apa hobi kamu?" },
            { "message": "Apa keahlian utama Anda?" },
            { "message": "Chatbot apa ini?" },
            { "message": "Berapa umurmu?" },
            { "message": "Apa profil Instagram Anda?" },
            { "message": "Apa profil LinkedIn Anda?" },
            { "message": "Apa yang kamu gemari?" },
            { "message": "Halo, Arifian!" },
            { "message": "Kamu kuliah dimana?" },
        ];

        return suggestedMessage.sort(() => 0.5 - Math.random()).slice(0, 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suggestionsKey]);

    const handleNewSuggestions = () => {
        setSuggestionsKey(prevKey => prevKey + 1);
    };

    const handleClearChat = () => {
        setMessages([]);
        window.location.reload();
    };

    return (
        <>
            <Navbar />
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] h-auto flex justify-center items-center p-5">
                <Helmet>
                    <title>Arifian.AI</title>
                </Helmet>
                <div className="min-h-screen h-auto w-full flex items-center md:justify-center justify-start flex-col bg-[#E0E0E0] dark:bg-[#1C1D24]">
                    <h1 data-aos="fade-out" data-aos-duration='700' className="display-font md:text-4xl text-2xl text-center p-5">
                        Hello! <br /> Welcome to <span className="border-b border-red-500">Arifian<span className="text-red-500">.AI</span></span>
                    </h1>
                    <p data-aos="fade-out" data-aos-duration='800' className="text-center md:w-2/3 w-full text-sm">
                        Build with <span className="border-b border-red-500">fine-tuned Google T5-small and USE as feature extraction.</span>
                    </p>
                    <Card data-aos="fade-out" data-aos-duration='900' className="md:w-2/3 w-full px-4 pb-4 bg-[#BABFBF] m-5 dark:bg-[#30323D] shadow-lg rounded-lg border-none">
                        <div className="flex items-center mb-2 border-b p-4 gap-2 justify-between">
                            <span className=""></span> <span className="display-font flex justify-center items-center gap-1"> v0.4.1 Latest</span>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <FaTrash className="hover:cursor-pointer hover:text-red-500" />
                                </DialogTrigger>
                                <DialogContent className="md:w-full w-[330px] bg-[#BABFBF] dark:bg-[#30323D] shadow-lg rounded-md">
                                    <DialogHeader>
                                        <DialogTitle className="display-font">Delete all chat?</DialogTitle>
                                        <DialogDescription>
                                            Your chat will be deleted permanently. This action cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                        <Button onClick={handleClearChat} className="flex justify-center items-center gap-1 hover:bg-red-500">Delete <FaTrash /></Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div ref={chatContainerRef} className="overflow-y-auto md:max-h-[700px] max-h-[500px] md:p-3 p-2">

                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 flex ${message.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    {message.sender === 'bot' && (
                                        <img
                                            src="/user.jpeg"
                                            alt="Bot"
                                            className="w-8 h-8 rounded-full mr-2"
                                        />
                                    )}
                                    <div
                                        className={`md:text-base text-sm inline-block px-3 py-2 rounded-lg ${message.sender === 'bot'
                                            ? 'bg-gray-300 dark:bg-gray-700'
                                            : 'bg-[#1C1D24] text-white'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                    {message.sender === 'user' && (
                                        <img
                                            src="/guest.png"
                                            alt="User"
                                            className="w-8 h-8 rounded-full ml-2"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center items-center gap-2 p-4">
                            {responseTime > 0 && (
                                <p className="text-xs text-gray-500">
                                    Model response time: {responseTime} ms
                                </p>
                            )}
                        </div>
                        <div className="flex items-center border-t p-4 justify-center md:flex-row flex-col gap-2">

                            {
                                isResponding ? (
                                    <div className="loader"></div>
                                ) : (
                                    renderedSuggestions.map((text, index) => (
                                        <a
                                            key={index}
                                            data-aos="fade-in"
                                            data-aos-duration='900'
                                            onClick={() => handleSuggestionClick(text.message)}
                                            className={`mr-2 dark:bg-[#1C1D24] bg-[#E0E0E0] dark:text-white text-black px-3 py-1 rounded-full text-sm text-center hover:cursor-pointer border border-red-400 hover:border-red-500`}
                                        >
                                            {text.message}
                                        </a>
                                    ))
                                )
                            }
                            {
                                isResponding ? (
                                    <></>
                                ) : (
                                    <a onClick={() => handleNewSuggestions()} className="mr-2 hover:cursor-pointer text-xl"><MdRefresh /></a>
                                )
                            }
                        </div>
                        <div className="flex items-center">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Write message...."
                                className="flex-1 md:text-base text-sm"
                                disabled={isResponding}
                            />
                            <Button onClick={handleSend} className="ml-2 flex gap-2 justify-center items-center" disabled={isResponding}>
                                Send <MdSend />
                            </Button>
                        </div>
                    </Card>
                    <p className="text-center w-2/3 opacity-55 text-xs">
                        <span>This AI chatbot is an impersonation of Arifian. Not all answers are guaranteed to be true or accurate.<br /></span>
                        <span className="border-b border-yellow-500">Warning:</span> Using your own words may result in awkward or inaccurate responses. Prioritize using the suggested messages. <br /> See the development repository <a className="border-b border-red-500" href="https://github.com/arifian853/arifian.ai" target="_blank" rel="noopener noreferrer">here.</a>
                    </p>
                </div>
            </div>
            <Dialog open={showChangelog} onOpenChange={setShowChangelog}>
                <DialogContent className="md:w-full w-[330px] bg-[#BABFBF] dark:bg-[#30323D] shadow-lg rounded-md">
                    <DialogHeader>
                        <DialogTitle className="display-font text-left">Changelog</DialogTitle>
                        <DialogDescription className="overflow-y-scroll h-52 text-left">
                            <ul className="list-disc ml-5">
                                <li>
                                    <strong>v0.4.1 Latest: Performance Boost with 20 Epochs</strong>
                                    <ul className="list-disc ml-5">
                                        <li>ROUGE-1: 0.6640</li>
                                        <li>ROUGE-2: 0.5327</li>
                                        <li>ROUGE-L: 0.6441</li>
                                        <li>BLEU Score: 52.0508</li>
                                        <li>20 Epochs</li>
                                        <li>Count of question-answer pair: 297</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>v0.4: Performance Details with 16 Epochs</strong>
                                    <ul className="list-disc ml-5">
                                        <li>ROUGE-1: 0.6647</li>
                                        <li>ROUGE-2: 0.5067</li>
                                        <li>ROUGE-L: 0.6386</li>
                                        <li>BLEU Score: 50.0938</li>
                                        <li>16 Epochs</li>
                                        <li>Count of question-answer pair: 297</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>v0.3.1: Improved Performance with 12 Epochs</strong>
                                    <ul className="list-disc ml-5">
                                        <li>ROUGE-1: 0.5903</li>
                                        <li>ROUGE-2: 0.4748</li>
                                        <li>ROUGE-L: 0.5678</li>
                                        <li>BLEU Score: 42.4546</li>
                                        <li>12 Epochs</li>
                                        <li>Count of question-answer pair: 270</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>v0.3: Increased Q&A Data with Higher BLEU Score</strong>
                                    <ul className="list-disc ml-5">
                                        <li>ROUGE-1: 0.5548</li>
                                        <li>ROUGE-2: 0.4657</li>
                                        <li>ROUGE-L: 0.5456</li>
                                        <li>BLEU Score: 39.2361</li>
                                        <li>12 Epochs</li>
                                        <li>Count of question-answer pair: 268</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>v0.2: Quality Improved Despite Fewer Data Compared to v0.1</strong>
                                    <ul className="list-disc ml-5">
                                        <li>ROUGE-1: 0.5797</li>
                                        <li>ROUGE-2: 0.3899</li>
                                        <li>ROUGE-L: 0.5502</li>
                                        <li>BLEU Score: 26.8416</li>
                                        <li>12 Epochs</li>
                                        <li>Count of question-answer pair: 81</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>v0.1: First Version with ROUGE and BLEU Score Details</strong>
                                    <ul className="list-disc ml-5">
                                        <li>ROUGE-1: 0.4902</li>
                                        <li>ROUGE-2: 0.2448</li>
                                        <li>ROUGE-L: 0.4419</li>
                                        <li>BLEU Score: 24.6660</li>
                                        <li>12 Epochs</li>
                                        <li>Count of question-answer pair: 104</li>
                                    </ul>
                                </li>
                            </ul>

                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <div className="flex justify-between w-full">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="dont-show"
                                    onChange={handleDontShowAgain}
                                    className="mr-2"
                                />
                                <label htmlFor="dont-show" className="text-sm">
                                    Don't show this again
                                </label>
                            </div>
                            <Button onClick={() => setShowChangelog(false)}>Close</Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};