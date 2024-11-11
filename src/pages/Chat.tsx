import { Helmet } from "react-helmet";
import { SetStateAction, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";

export const Chat = () => {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Halo! Ada yang bisa saya bantu?' }
    ]);
    const [input, setInput] = useState('');
    const [isResponding, setIsResponding] = useState(false);

    const handleSend = () => {
        if (input.trim() === '') return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        simulateBotResponse('Model belum tersedia :) Mohon menunggu!');
    };

    const simulateBotResponse = (responseText: string | never[]) => {
        setIsResponding(true);
        setMessages((prev) => [...prev, { sender: 'bot', text: '' }]); // Tambahkan elemen pesan kosong untuk diupdate

        let index = 0;
        const interval = setInterval(() => {
            if (index < responseText.length) {
                setMessages((prev) => {
                    // Update pesan terakhir dari bot
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1].text += responseText[index];
                    return updatedMessages;
                });
                index++;
            } else {
                clearInterval(interval);
                setIsResponding(false); // Set isResponding menjadi false setelah bot selesai merespons
            }
        }, 50); // Durasi streaming (50 ms per karakter)
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
                    <Card className="max-h-dvh md:w-2/3 w-full p-4 bg-[#BABFBF] m-5 dark:bg-[#30323D] shadow-lg rounded-lg">
                        <div className="overflow-y-auto mb-4 md:max-h-[700px] max-h-[550px]">
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
                                        className={`inline-block px-3 py-2 rounded-lg ${message.sender === 'bot'
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
                        <div className="flex items-center mb-2 border-t p-3 justify-center">
                            <a
                                onClick={() => handleSuggestionClick('Siapakah kamu, Arifian?')}
                                className={`mr-2 bg-[#1C1D24] text-white px-3 py-1 rounded-full text-sm hover:cursor-pointer ${isResponding ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                Siapakah kamu, Arifian?
                            </a>
                            <a
                                onClick={() => handleSuggestionClick('Kapan kamu lahir?')}
                                className={`mr-2 bg-[#1C1D24] text-white px-3 py-1 rounded-full text-sm hover:cursor-pointer ${isResponding ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                Kapan kamu lahir?
                            </a>
                            <a
                                onClick={() => handleSuggestionClick('Dari mana kamu berasal?')}
                                className={`mr-2 bg-[#1C1D24] text-white px-3 py-1 rounded-full text-sm hover:cursor-pointer ${isResponding ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                Dari mana kamu berasal?
                            </a>
                        </div>
                        <div className="flex items-center">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik pesan..."
                                className="flex-1"
                                disabled={isResponding} // Nonaktifkan input saat isResponding true
                            />
                            <Button onClick={handleSend} className="ml-2" disabled={isResponding}>
                                Kirim
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};
