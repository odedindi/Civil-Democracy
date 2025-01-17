'use client';

import { Book, HelpCircle, Play } from 'lucide-react';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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

type Article = {
  id: string;
  title: string;
  content: string;
  category: 'government' | 'participation' | 'platform';
};

type Tutorial = {
  id: string;
  title: string;
  steps: string[];
};

type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export default function EducationalResources() {
  const [articles] = useState<Article[]>([
    {
      id: 'gov1',
      title: 'Understanding Local Government Structure',
      content:
        'Local governments typically consist of elected officials who make decisions on behalf of the community. This includes roles such as mayor, city council members, and various department heads...',
      category: 'government',
    },
    {
      id: 'part1',
      title: 'Effective Ways to Participate in Local Decision Making',
      content:
        'Participating in local decision making can involve attending city council meetings, joining community committees, voting in local elections, and engaging with elected officials through various channels...',
      category: 'participation',
    },
    {
      id: 'plat1',
      title: 'Navigating the Civil Democracy Platform',
      content:
        'The Civil Democracy platform is designed to facilitate civic engagement. Key features include the social feed, trust network, participation tools, and the transparency dashboard...',
      category: 'platform',
    },
  ]);

  const [tutorials] = useState<Tutorial[]>([
    {
      id: 'tut1',
      title: 'How to Create a Proposal',
      steps: [
        'Navigate to the "Participate" section',
        'Click on "Create New Proposal"',
        'Fill in the required fields: Title, Description, and Category',
        'Add any relevant attachments or supporting documents',
        'Review your proposal and submit for community consideration',
      ],
    },
    {
      id: 'tut2',
      title: 'Building Your Trust Network',
      steps: [
        'Go to the "Network" tab',
        'Use the search function to find experts, organizations, or fellow citizens',
        'Review their profiles and participation history',
        'Click "Trust" to add them to your network',
        'Regularly review and update your trust network',
      ],
    },
  ]);

  const [faqs] = useState<FAQ[]>([
    {
      id: 'faq1',
      question: 'How is my trust score calculated?',
      answer:
        "Your trust score is based on several factors including your participation rate, the quality of your contributions as rated by peers, and the diversity of your trust network. It's updated regularly to reflect your ongoing engagement.",
    },
    {
      id: 'faq2',
      question: 'Can I change my vote after submitting it?',
      answer:
        'Yes, you can change your vote on any active proposal up until the voting deadline. Simply navigate to the proposal and select your new vote. The system will automatically update your choice.',
    },
    {
      id: 'faq3',
      question: 'How are proposals implemented after approval?',
      answer:
        'Once a proposal is approved, it moves to the implementation phase. The platform coordinates with local government officials to turn the proposal into action. You can track the progress of implementation in the Transparency Dashboard.',
    },
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Educational Resources</CardTitle>
          <CardDescription>
            Learn about civic processes, effective participation, and how to use
            the Civil Democracy platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="articles">
            <TabsList>
              <TabsTrigger value="articles">Articles</TabsTrigger>
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="articles">
              <ScrollArea className="h-[500px] pr-4">
                {articles.map((article) => (
                  <Card key={article.id} className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription>{article.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{article.content}</p>
                      <Button className="mt-4" variant="outline">
                        <Book className="mr-2 size-4" />
                        Read Full Article
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="tutorials">
              <ScrollArea className="h-[500px] pr-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {tutorial.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="list-inside list-decimal space-y-2">
                        {tutorial.steps.map((step, index) => (
                          <li key={index} className="text-sm">
                            {step}
                          </li>
                        ))}
                      </ol>
                      <Button className="mt-4" variant="outline">
                        <Play className="mr-2 size-4" />
                        Start Interactive Tutorial
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="faq">
              <ScrollArea className="h-[500px] pr-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button className="mt-4 w-full" variant="outline">
                  <HelpCircle className="mr-2 size-4" />
                  Ask a Question
                </Button>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
