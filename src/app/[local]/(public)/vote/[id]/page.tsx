import { VoteScreen } from '@/components/vote-screen';

// Mock function to fetch survey data
function getSurveyData(id: string) {
  return {
    id,
    title: 'City Development Initiative',
    description:
      "A comprehensive plan to improve our city's infrastructure and quality of life.",
    questions: [
      {
        id: 'q1',
        title: 'Environmental Sustainability Measure',
        description:
          'Should the city implement a new recycling program and invest in renewable energy sources?',
        type: 'yesno' as const,
        options: [],
      },
      {
        id: 'q2',
        title: 'Public Transportation Expansion',
        description:
          "Rank the following options for expanding the city's public transportation system:",
        type: 'multiple' as const,
        options: [
          {
            id: '1',
            title: 'Expand Bus Network',
            description:
              'Increase the number of bus routes and frequency of service',
            trustedActorSupport: 75,
            actorInsights: [
              { name: 'Transit Authority', support: 80, certainty: 85 },
              { name: 'Environmental Group', support: 70, certainty: 75 },
            ],
            rationale:
              'This option provides the most immediate impact and flexibility for future adjustments.',
          },
          {
            id: '2',
            title: 'Build Light Rail System',
            description:
              'Construct a new light rail system connecting major city areas',
            trustedActorSupport: 60,
            actorInsights: [
              { name: 'Urban Planning Committee', support: 65, certainty: 70 },
              {
                name: 'Local Business Association',
                support: 55,
                certainty: 60,
              },
            ],
            rationale:
              'While more expensive initially, this could provide long-term benefits and reduce traffic congestion.',
          },
          {
            id: '3',
            title: 'Implement Bike-Sharing Program',
            description:
              'Set up a city-wide bike-sharing system with dedicated bike lanes',
            trustedActorSupport: 80,
            actorInsights: [
              { name: 'Health Department', support: 85, certainty: 90 },
              { name: 'Tourism Board', support: 75, certainty: 80 },
            ],
            rationale:
              'This eco-friendly option promotes health and could attract more tourists.',
          },
          {
            id: '4',
            title: 'Upgrade Existing Infrastructure',
            description:
              'Improve and maintain current roads, bridges, and public transit',
            trustedActorSupport: 70,
            actorInsights: [
              { name: 'City Engineer', support: 75, certainty: 85 },
              { name: 'Budget Committee', support: 65, certainty: 70 },
            ],
            rationale:
              'This focuses on immediate needs and could be more cost-effective in the short term.',
          },
        ],
      },
      {
        id: 'q3',
        title: 'City Center Redevelopment',
        description:
          'Do you support the proposed plan to redevelop the city center, including new housing and commercial spaces?',
        type: 'yesno' as const,
        options: [],
      },
    ],
    expiryTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  };
}

export default function VotePage({ params }: { params: { id: string } }) {
  const surveyData = getSurveyData(params.id);

  return (
    <div className="container py-8">
      <VoteScreen survey={surveyData} />
    </div>
  );
}
