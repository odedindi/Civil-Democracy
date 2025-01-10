'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
};

export default function MessageCenter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'John Doe',
      content: 'Hello, how are you?',
      timestamp: '2023-06-01 10:00',
    },
    {
      id: 2,
      sender: 'Jane Smith',
      content: "I'm good, thanks!",
      timestamp: '2023-06-01 10:05',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: 'You',
          content: newMessage,
          timestamp: new Date().toLocaleString(),
        },
      ]);
      setNewMessage('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Center</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 h-96 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt={message.sender} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{message.sender}</p>
                <p>{message.content}</p>
                <p className="text-sm text-gray-500">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
