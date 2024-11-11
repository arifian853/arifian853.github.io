import { Helmet } from "react-helmet";
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";

export const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo! Ada yang bisa saya bantu?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        // Tambahkan respons dummy dari bot
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'Soon, I will answer correctly.' }
            ]);
        }, 1000);
    };

    const handleKeyDown = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };
    return (
        <>
            <Navbar />
            <div className="bg-[#E0E0E0] dark:bg-[#1C1D24] h-screen flex justify-center items-center p-5">
                <Helmet>
                    <title>Soon! | Arifian.AI</title>
                </Helmet>
                <div className="min-h-dvh max-h-dvh w-full flex items-center md:justify-center justify-start flex-col bg-[#E0E0E0] dark:bg-[#1C1D24]">
                    <h1 className="text-4xl text-center p-5">Hello! Welcome to Arifian.AI</h1>
                    <p className="text-center w-2/3">This AI chatbot is an impersonation of myself. Build with ***** </p>
                    <Card className="max-h-dvh md:w-2/3 w-full p-4 bg-[#BABFBF] m-5 dark:bg-[#30323D]  shadow-lg rounded-lg">
                        <div className="overflow-y-auto mb-4 md:max-h-[700px] max-h-[550px]">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`mb-2 ${message.sender === 'bot' ? 'text-left' : 'text-right'
                                        }`}
                                >
                                    <div
                                        className={`inline-block px-3 py-2 rounded-lg ${message.sender === 'bot'
                                            ? 'bg-gray-300 dark:bg-gray-700'
                                            : 'bg-[#1C1D24] text-white'
                                            }`}
                                    >
                                        {message.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik pesan..."
                                className="flex-1"
                            />
                            <Button onClick={handleSend} className="ml-2">
                                Kirim
                            </Button>
                        </div>
                    </Card>
                </div>

            </div>
        </>
    )
}