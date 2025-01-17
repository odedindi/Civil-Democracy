'use client';

import { Bot, Send } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

type AIResponse = {
  summary: string;
  impacts: string[];
  proArguments: string[];
  conArguments: string[];
};

export default function AIAssistant() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = () => {
    setIsLoading(true);
    // Simulating AI response generation
    setTimeout(() => {
      setAIResponse({
        summary:
          'This proposal suggests implementing a city-wide bike-sharing program to reduce traffic congestion and promote eco-friendly transportation.',
        impacts: [
          'Potential reduction in carbon emissions',
          'Improved public health through increased physical activity',
          'Possible decrease in parking demand in urban areas',
        ],
        proArguments: [
          'Promotes sustainable transportation',
          'Reduces traffic congestion in city centers',
          'Provides affordable transportation option for residents and tourists',
        ],
        conArguments: [
          'Initial implementation costs could be high',
          'May require reallocation of road space, potentially affecting car users',
          'Maintenance and redistribution of bikes could be challenging',
        ],
      });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI-Assisted Analysis</CardTitle>
          <CardTitle>AI-Assisted Analysis</CardTitle>
          <CardDescription>
            Get AI-powered summaries, impact analysis, and balanced arguments
            for proposals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea
              placeholder="Enter a proposal or topic for analysis..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="min-h-[100px]"
            />
            <Button onClick={generateAIResponse} disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze'}
              {isLoading ? (
                <Bot className="ml-2 size-4 animate-spin" />
              ) : (
                <Send className="ml-2 size-4" />
              )}
            </Button>
          </div>

          {aiResponse && (
            <Tabs defaultValue="summary" className="mt-6">
              <TabsList>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="impacts">Impacts</TabsTrigger>
                <TabsTrigger value="arguments">Arguments</TabsTrigger>
              </TabsList>
              <TabsContent value="summary">
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <p>{aiResponse.summary}</p>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="impacts">
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <ul className="list-disc space-y-2 pl-4">
                    {aiResponse.impacts.map((impact, index) => (
                      <li key={index}>{impact}</li>
                    ))}
                  </ul>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="arguments">
                <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="mb-2 font-semibold">Pro Arguments:</h4>
                      <ul className="list-disc space-y-1 pl-4">
                        {aiResponse.proArguments.map((arg, index) => (
                          <li key={index}>{arg}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 font-semibold">Con Arguments:</h4>
                      <ul className="list-disc space-y-1 pl-4">
                        {aiResponse.conArguments.map((arg, index) => (
                          <li key={index}>{arg}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
