import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">
        About the Civil Democracy Platform
      </h1>
      <div className="mx-auto max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              The Civil Democracy Platform aims to revolutionize the way
              citizens participate in democratic processes. We believe in
              empowering individuals to have a direct say in the decisions that
              affect their lives, while also providing a trust-based
              representation system for more complex issues.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                Citizens register on the platform and verify their identity.
              </li>
              <li>
                Users can participate directly in voting on various issues and
                policies.
              </li>
              <li>
                For more complex topics, users can assign trust to knowledgeable
                individuals or groups.
              </li>
              <li>
                The platform uses a transparent algorithm to weigh votes based
                on direct participation and trust networks.
              </li>
              <li>
                Results are published in real-time, ensuring full transparency
                in the decision-making process.
              </li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>
                Transparency: All processes and decisions are open and
                accessible to all users.
              </li>
              <li>
                Accountability: Representatives and decision-makers are held
                accountable through the trust system.
              </li>
              <li>
                Inclusivity: We strive to make the platform accessible to all
                citizens, regardless of their background.
              </li>
              <li>
                Education: We provide resources to help users make informed
                decisions on complex issues.
              </li>
              <li>
                Security: We use state-of-the-art technology to ensure the
                integrity and security of all votes and data.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
