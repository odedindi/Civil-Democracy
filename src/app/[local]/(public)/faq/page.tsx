'use client';

import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is the Civil Democracy Platform?',
    answer:
      'The Civil Democracy Platform is an online system that allows citizens to participate directly in democratic decision-making processes. It combines direct voting with a trust-based representation system for more complex issues.',
  },
  {
    question: 'How do I sign up?',
    answer:
      "You can sign up by clicking the 'Get Started' button on our homepage. You'll need to provide some basic information and verify your identity to ensure the integrity of the voting process.",
  },
  {
    question: 'Is my vote really secure and anonymous?',
    answer:
      'Yes, we use state-of-the-art encryption and blockchain technology to ensure that all votes are secure, verifiable, and anonymous. Your personal information is never linked directly to your voting record.',
  },
  {
    question: 'What is the trust-based representation system?',
    answer:
      'The trust-based system allows you to assign your voting power to individuals or groups you trust on specific issues. This is useful for more complex topics where you might not feel fully informed to make a direct decision.',
  },
  {
    question: 'How often can I change my trust assignments?',
    answer:
      'You can change your trust assignments at any time. We encourage users to regularly review and update their trust networks based on the performance and decisions of their chosen representatives.',
  },
  {
    question: 'Are the results of votes binding?',
    answer:
      'The binding nature of votes depends on the specific implementation and agreements with local governments. In some cases, votes may be advisory, while in others they may be legally binding. Check the details of each voting event for more information.',
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="multiple"
        value={openItems}
        className="mx-auto max-w-3xl"
      >
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger onClick={() => toggleItem(`item-${index}`)}>
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
