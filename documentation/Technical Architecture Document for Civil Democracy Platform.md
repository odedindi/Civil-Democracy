# Technical Architecture Document for Civil Democracy Online Platform (MVP)

**Date**: 6.1.2025  
**Version**: 0.1  
**Author**: Oded Winberger  
**Status**: Draft

---

## 1. Overview

The Civil Democracy platform is a new model of democracy that allows citizens to participate directly in decision-making or delegate their preferences to trusted actors. This document outlines the technical architecture for the MVP, including system design, database schemas, deployment strategies, and workflows. The architecture prioritizes modularity, scalability, and performance while maintaining simplicity to avoid scope creep and adherence to data-driven design principles.

---

## 2. Objectives of the Technical Architecture

- **Modularity**: Ensure each component is independent and easy to extend or replace.
- **Data-Centric Design**: Define data structures and workflows first to drive system functionality.
- **Multi-Tenancy**: Support multiple tenants (e.g., civic organizations) with schema-based data isolation.
- **Scalability**: Start lean while ensuring the architecture supports future growth.
- **User Experience**: Prioritize responsive, intuitive interactions.
- **Security**: Protect user data and ensure compliance with privacy standards.

---

## 3. Architecture Overview

The architecture is based on a **TypeScript and Next.js Fullstack Framework** deployed to **Vercel** for the frontend and serverless backend, with **PostgreSQL** for data management.

### Core Components

#### Frontend:

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind](https://tailwindcss.com/)
- **UI Library**: [Shadcn](https://ui.shadcn.com/)
- **I18n**: [next-intl](https://next-intl.dev/)

#### Backend:

- **Framework**: Next.js API routes.

#### Database:

- **Technology**: PostgreSQL
- **Provider**: [Vercel PostgreSQL](https://vercel.com) or [Neon](https://neon.tech/)
- **Features**:
  - Automatic backups.
  - Serverless scaling.
  - SSL-enabled connections for security.
  - Multi-tenancy supported via schemas.
  - Structured relationships for users, actors, votes, and trust assignments.

#### Local Development:

- **Setup**: PostgreSQL via Docker.
- **Seeding**: Use Prisma's seeding feature with fixture data to populate the local database.

#### Deployment Platform:

- **Provider**: Vercel
- **Features**:
  - Serverless infrastructure for fast deployments.
  - Global CDN for low-latency access.

### Multi-Tenancy Design

Multi-tenancy is critical to isolate data for different tenant organizations, ensuring scalability and security. The platform will adopt a shared database with schema separation to support multiple tenants efficiently. Each tenant will have its own schema in the PostgreSQL database.

#### Approach:

- Shared database with schema-based separation.
- Each tenant (e.g., local civic groups or regional organizations) has its own schema, ensuring data isolation while leveraging a single database instance.

#### Implementation Details:

- **Schema Per Tenant**: Each tenant has its own schema for data isolation.
- **Global Metadata Table**: Tracks tenant configurations (e.g., schema name, tenant-specific settings).
- **Dynamic Schema Switching**: Logic determines the schema based on the tenant context (e.g., from subdomain, tenant ID, or API token).

#### Implementation in Next.js:

- Use middleware to determine the tenant context based on the request.
- Use Prisma's schema feature or PostgreSQL's `SET search_path` for schema-specific queries.

---

## 4. Data-Driven Design

### Key Data Entities and Relationships

#### Users

- **Attributes**: id, name, email, role (citizen/actor), created_at, updated_at.
- **Relationships**:
  - Users can vote (Votes).
  - Users can assign trust to Actors.

#### Actors

- **Attributes**: id, name, type (individual/group), description, created_at, updated_at.
- **Relationships**:
  - Actors can be trusted by Users.
  - Actors express preferences on Votes.

#### Groups

- **Attributes**: id, name, description, created_at, updated_at.
- **Relationships**:
  - Groups can contain multiple Actors.
  - Groups can be trusted by Users.

#### Votes

- **Attributes**: id, topic, description, options (array), start_date, end_date, created_at, updated_at.
- **Relationships**:
  - Votes are participated in by Users.
  - Results are influenced by trust-weighted preferences from Actors (TBD).

#### Trust Assignments

- **Attributes**: id, user_id, actor_id, trust_level (e.g., 0-100), created_at, updated_at.
- **Relationships**:
  - Users assign trust to Actors.
  - Aggregated trust levels influence decision-making.

#### Workflows

- Voting Workflow:
  - User logs in and views active votes.
  - User selects a vote and either:
    - Directly casts their vote.
    - Defers voting by assigning trust to an actor.
  - Vote results are calculated in real time and displayed on the dashboard.
- Trust Assignment Workflow:
- User browses actor profiles.
- User assigns trust levels to selected actors.
- Trust assignments influence future vote outcomes when the user defers voting.

---

### Database Schema Overview (Prisma-Compatible)

```prisma
model Tenant {
  id         String   @id @default(cuid())
  name       String
  schemaName String   @unique
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  users      User[]
}

model User {
  id         String   @id @default(cuid())
  email      String   @unique
  name       String
  role       String
  tenantId   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  tenant     Tenant   @relation(fields: [tenantId], references: [id])
  trust      Trust[]
}

model Actor {
  id          String   @id @default(cuid())
  name        String
  type        String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  votes       Vote[]
  trust       Trust[]
}

model Group {
  id          String   @id @default(cuid())
  name        String
  description String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Vote {
  id          String   @id @default(cuid())
  title       String
  description String
  Tags        String[]
  options     Json
  startDate   DateTime
  endDate     DateTime
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Trust {
  id        String   @id @default(cuid())
  userId    String
  actorId   String
  trustLevel Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User   @relation(fields: [userId], references: [id])
  actor     Actor  @relation(fields: [actorId], references: [id])
}

model Trust {
  id        String   @id @default(cuid())
  userId    String
  actorId   String
  trustLevel Int /// value between 0 and 100
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User   @relation(fields: [userId], references: [id])
  actor     Actor  @relation(fields: [actorId], references: [id])
}
```

## 5. Future Scalability Considerations

- **Backend Migration**: Move backend logic to a dedicated server (Node.js/Django) as demands grow.
- **Database Scaling**: Use managed PostgreSQL services for better performance and scaling.
- **APIs for Integrations**: Develop REST or GraphQL APIs for external integrations.
- **Real-Time Features**: Introduce WebSocket support for live updates.

---

## 6. Security and Privacy

- **Authentication**: Use [Clerk](https://clerk.com/) for scalable user management.
- **Data Protection**: Encrypt sensitive data and enforce HTTPS for all transfers.
- **Compliance**: Adhere to global standards like GDPR and CCPA.

---

## 7. Deployment Strategy

- **Development Environment**: Use Docker for local development.
- **Production Deployment**: Deploy the Next.js app to Vercel, using cloud-hosted PostgreSQL.
- **Monitoring**: Implement tools like [Sentry](https://sentry.io/) for error tracking.

---

## 8. Open Questions and Feedback

- Should trust levels decay over time to reflect user engagement?
- Should users be able to switch between tenants?
- When should advanced features like AI insights or blockchain voting be prioritized?

---

## 9. Next Steps

- Finalize tenant-aware middleware implementation in Next.js.
- Develop seed scripts for consistent local development.
- Create test cases for schema-based multi-tenancy.
- Implement monitoring tools like [Sentry](https://sentry.io/).
