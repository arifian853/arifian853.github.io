import { Helmet } from "react-helmet";
import { SetStateAction, useEffect, useRef, useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { MdRefresh, MdSend } from "react-icons/md";
import { BsStars } from "react-icons/bs";

export const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo! Ada yang bisa saya bantu?' }
    ]);
    const [input, setInput] = useState('');
    const [isResponding, setIsResponding] = useState(false);

    const handleSend = async () => {
        if (input.trim() === '') return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        try {
            const response = await fetch("http://127.0.0.1:5000/ask", {
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
            { "message": "Tanggal berapa kamu lahir, Arifian?" },
            { "message": "Dari mana kamu berasal?" },
            { "message": "Apa pekerjaanmu?" },
            { "message": "Dimana kamu tinggal?" },
            { "message": "Apa hobimu?" },
            { "message": "Apa keahlian utama kamu?" },
            { "message": "Apa kamu ada keahlian AI?" },
            { "message": "Berapa umurmu?" },
            { "message": "Apa profil Instagram Anda?" },
            { "message": "Apa profil LinkedIn Anda?" },
            { "message": "Apa yang kamu gemari?" },
        ];

        return suggestedMessage.sort(() => 0.5 - Math.random()).slice(0, 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [suggestionsKey]);

    const handleNewSuggestions = () => {
        setSuggestionsKey(prevKey => prevKey + 1); // Update kunci untuk memicu useMemo
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
                    <p data-aos="fade-out" data-aos-duration='800' className="text-center md:w-2/3 w-full">
                        This AI chatbot is an impersonation of myself. <br />
                        Build with <span className="border-b border-red-500">T5 (Text-to-Text Transfer Transformer) and USE (Universal Sentence Encoder)</span>
                    </p>
                    <Card data-aos="fade-out" data-aos-duration='900' className="md:w-2/3 w-full px-4 pb-4 bg-[#BABFBF] m-5 dark:bg-[#30323D] shadow-lg rounded-lg border-none">
                        <div className="flex items-center mb-2 border-b p-4 justify-center gap-2">
                            <span className="display-font">Arifian<span className="text-red-500">.AI</span> v0.3 Beta </span> <BsStars />
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
                        <div className="flex items-center border-t p-4 justify-center md:flex-row flex-col gap-2">
                            {
                                isResponding ? (
                                    <>...</>
                                ) : (
                                    renderedSuggestions.map((text, index) => (
                                        <a
                                            key={index}
                                            data-aos="fade-in"
                                            data-aos-duration='900'
                                            onClick={() => handleSuggestionClick(text.message)}
                                            className={`mr-2 dark:bg-[#1C1D24] bg-[#E0E0E0] dark:text-white text-black px-3 py-1 rounded-full text-sm hover:cursor-pointer border border-red-400 hover:border-red-500`}
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
                        <span className="border-b border-yellow-500">Warning:</span> Using your own words may resulting in an awkward or poor result, prioritize using suggested message. See the development <a className="border-b border-red-500" href="https://github.com/arifian853/arifian.ai" target="_blank" rel="noopener noreferrer">repository.</a>
                    </p>
                </div>
            </div>
        </>
    );
};
