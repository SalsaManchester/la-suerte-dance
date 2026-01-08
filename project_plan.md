# La Suerte Dance School - Platform Development Plan

## 1. Executive Summary
**Goal**: Build a high-energy, modern online dance academy platform for La Suerte Dance School.
**Core Value**: Organize extensive existing content (YouTube) and monetize premium structured courses (Vimeo) behind a paywall.
**Vibe**: Fresh, Bright, Energetic, Motivating. "Get up and dance!"

## 2. Design Direction: "Vibrant Motion"
The design must capture the passion of Salsa and Bachata while maintaining a clean, modern usability standard.

*   **Visual Language**:
    *   **Palette**: High contrast. Deep backgrounds (optional dark mode sections) or Clean White backgrounds with vibrant accent colors (Electric Blue, Hot Pink, Fiery Orange) to signify energy.
    *   **Typography**: Bold, modern Sans-Serif headings (e.g., *Outfit* or *Montserrat*) for impact; clean, readable body text (e.g., *Inter*).
    *   **Imagery**: High-quality action shots, dynamic video backgrounds on hero sections.
    *   **Micro-interactions**: Hover effects on course cards (zoom/tilt), progress bars that fill with animation, playful completion celebrations.
*   **User Experience (UX)**:
    *   **Mobile-First**: Dancers often use phones/tablets in studios. The site must be flawless on touch devices.
    *   **Navigation**: Simple, intuitive. "Start Dancing" should always be one click away.

## 3. Technical Architecture

### 3.1. Tech Stack
*   **Framework**: **Next.js 14+ (App Router)**
    *   *Why*: Best-in-class performance, SEO optimization for public pages, and robust server-side rendering for the course dashboard.
*   **Language**: **TypeScript**
    *   *Why*: Type safety ensures long-term maintainability and fewer bugs.
*   **Styling**: **Vanilla CSS (Module or Global)**
    *   *Why*: Full creative control to achieve the bespoke "energetic" look without fighting framework defaults. We will use CSS Variables for theming.
*   **Database & Auth**: **Supabase** (PostgreSQL)
    *   *Why*: Open source, scalable. Handles User Auth (Email/Social), Database (User profiles, Course progress), and Storage (User avatars) effortlessly.
*   **Payments**: **Stripe**
    *   *Why*: Industry standard. Easy to handle one-time purchases or subscriptions (Tiers).
*   **Video Hosting**:
    *   **Paid**: **Vimeo** (Private videos, domain restrictions).
    *   **Free**: **YouTube** (Embedded players for free content).

### 3.2. Implementation Phases

#### Phase 1: Foundation & Design System (Week 1-2)
*   **Setup**: Initialize Next.js, configure Supabase project.
*   **Design System**: Define CSS variables for colors, typography, spacing. Create base UI components (Buttons, Cards, Inputs).
*   **Landing Page**: Build a high-impact "Hero" section, generic "About" info, and "Featured Courses" preview.

#### Phase 2: Content Structure & Public Library (Week 3)
*   **Data Models**: Define Database schema for `Courses`, `Modules`, `Lessons`, `Instructors`.
*   **Library UI**: Grid view of courses with filters (Level: Beginner/Int/Adv, Style: Salsa/Bachata).
*   **Course Details**: Public page showing curriculum overview (locked vs unlocked icons).

#### Phase 3: Authentication & Progress Tracking (Week 4)
*   **Auth**: Sign Up / Login / Forgot Password flows.
*   **User Dashboard**: "My Courses", "Resume Learning" button.
*   **Progress Logic**: Tracking completed lessons. "Mark as Complete" functionality.

#### Phase 4: Payments & Premium Content (Week 5)
*   **Stripe Integration**: Checkout sessions for purchasing courses or subscriptions.
*   **Vimeo Integration**: Securely fetching and embedding signed URLs for paid videos.
*   **Access Control**: Middleware to block unpaid users from premium routes.

#### Phase 5: Polish & Launch (Week 6)
*   **Video Player Experience**: Add "Mirror Mode" (flip video horizontally for dancers), Speed Control (0.5x, 0.75x) - *Critical for dance learning*.
*   **SEO**: Metatags, sitemaps.
*   **Performance**: Image optimization, lazy loading.

## 4. Data Structure (Draft)

**Table: `users`**
*   `id` (UUID)
*   `email`
*   `full_name`
*   `subscription_tier` ('free', 'basic', 'premium')

**Table: `courses`**
*   `id`
*   `title`
*   `slug` (for URL)
*   `description`
*   `thumbnail_url`
*   `is_premium` (bool)
*   `video_source` ('vimeo' | 'youtube')

**Table: `lessons`**
*   `id`
*   `course_id`
*   `title`
*   `video_id` (Vimeo ID or YT ID)
*   `duration`
*   `order_index`

**Table: `enrollments`**
*   `user_id`
*   `course_id`
*   `status` ('active', 'completed')
*   `progress` (%)

## 5. Next Steps
1.  **Approval**: Review this plan.
2.  **Scaffolding**: Run `npx create-next-app` to start the codebase.
3.  **Design**: Create 3-4 key visual assets (Hero Image, Course Card Mockup).
