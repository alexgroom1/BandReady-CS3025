# Band Ready — Claude Code Reference

## Project Overview

**Band Ready** is a child-centered music education web application designed to prepare Grade 4–5 students for their school band. The system teaches foundational music literacy — staff reading, note names, rhythm basics, and instrument families — through a structured sequence of lessons, interactive practice, and assessed quizzes. It is built to run in a browser without installation, accessible on both tablets and laptops.

The application serves two distinct user groups:
- **Students (primary):** Grade 4–5 learners who interact independently with learning content
- **Teachers/Facilitators (secondary):** Educators who monitor progress and quiz results through a PIN-protected dashboard

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | TypeScript, HTML, CSS |
| Build Tool | Vite (SPA, hot module replacement) |
| Backend | Flask (RESTful API) |
| Architecture | Three-tier: Presentation → Application → Data |

The frontend is a **Single Page Application (SPA)** that communicates with the Flask API. The decoupled architecture separates concerns clearly — the client handles rendering and interaction while the server manages state persistence and data retrieval.

---

## Application Structure & Screen Flow

The interaction flow is intentionally **linear and progressive**. Users cannot skip ahead; each stage unlocks the next. This is a deliberate HCI decision to reduce cognitive load and guide young users without requiring external instruction.

```
Homescreen (Welcome / START)
    └── Profile Selection ("Who's learning today?")
            └── Home Dashboard (Learning Path + Progress KPIs)
                    └── Module Menu (Lessons → Practice → Final Quiz)
                            ├── Lesson View (Step-by-step, e.g. "Meet the Staff")
                            ├── Practice Mode (Interactive Q&A, immediate feedback)
                            ├── Final Quiz (Locked until practice complete; 80% pass threshold)
                            └── Results Screen (Score, time, answer review)
                                    └── Return to Home Dashboard (progress updated)

[From Homescreen] → Teacher Access (PIN gate) → Teacher Dashboard
```

### Screen Inventory

| Screen | Key UI Elements | HCI Purpose |
|---|---|---|
| **Homescreen** | Mascot, "Band Ready" wordmark, START CTA | Low-friction entry point; single action |
| **Profile Selection** | Avatar initials, scrollable list, "Let's Go" CTA | Shared-device support; identity without passwords |
| **Home Dashboard** | Course progress %, completed modules counter, module cards with status badges | Ambient progress awareness; motivational scaffolding |
| **Module Menu** | Visual of staff/concept, Lessons / Practice Progress / Final Quiz columns | Three-phase structure made visible upfront |
| **Lesson View** | Step indicator (dots + "Step X of 5"), diagram, audio button, Next CTA | Progressive disclosure; multimodal learning |
| **Practice/Quiz** | Question, visual diagram, 4-option answer grid, inline feedback, progress bar | Immediate corrective feedback; low-stakes repetition |
| **Results Screen** | Score, percentage, time, answer review table | Reflective learning; actionable failure messaging |
| **Teacher Login** | PIN entry, "Unlock Dashboard" CTA | Access control without student-facing complexity |
| **Teacher Dashboard** | Per-student module status, latest scores, attempt counts, last active timestamp | Formative assessment at a glance |

---

## HCI Principles — Implementation Guide

This is an **HCI-evaluated project**. Every UI decision must be intentional and defensible. The following principles are actively implemented throughout the system and must be preserved and extended in any new feature work.

### 1. Nielsen's Heuristics (Core Reference)

| Heuristic | How Band Ready Applies It |
|---|---|
| **Visibility of system status** | Step indicators ("Step 1 of 5"), progress bars, module completion percentages, and status badges ("READY", "In Progress", "Completed") keep users continuously informed |
| **Match between system and real world** | Music terminology is introduced before it is used. Diagrams show a real treble clef staff with labeled lines (L1–L5) and spaces (S1–S4) — concrete visual anchors for abstract concepts |
| **User control and freedom** | Back arrows (`<`) on all screens allow navigation reversal. "Switch Learner" button accessible from the home dashboard |
| **Consistency and standards** | Orange CTA buttons, blue informational buttons, and green action buttons are used consistently. Card layouts repeat across module selection and teacher dashboard |
| **Error prevention** | Final quiz is locked behind practice completion. The 80% pass threshold is stated before the quiz begins, not after failure |
| **Recognition over recall** | Profile selection uses name + color-coded avatar initials rather than requiring students to type or remember a username |
| **Flexibility and efficiency** | Linear flow for students; teacher dashboard provides a high-density summary view for educators who need to scan many students quickly |
| **Aesthetic and minimalist design** | Screens present only the information needed for the current task. No sidebars, no global nav bar in student flow |
| **Help users recognize, diagnose, recover from errors** | Failed quiz results show the pass threshold, the student's score, and a full answer review with correct answers. The call-to-action is "Practice More And Try Again" — constructive, not punitive |
| **Help and documentation** | "Hear the staff pattern" audio button provides in-context support without breaking the flow to external help |

### 2. Progressive Disclosure

Content is revealed in structured layers — students cannot access the quiz until practice is complete, and practice is only meaningful after lessons. The module menu shows all three phases and their locked/unlocked state transparently, so users understand the path without being overwhelmed by it upfront.

**Implementation rule:** Never surface advanced options or secondary information at the same visual weight as primary actions. Use unlock states, greyed buttons, and lock icons to communicate unavailability rather than hiding features entirely.

### 3. Cognitive Load Reduction

The primary audience (ages 9–11) has limited working memory capacity. The design addresses this through:

- **Chunked content:** Each lesson is broken into 5 discrete steps with a visible progress indicator
- **Single primary action per screen:** Each screen has one prominent CTA (Next, Start Module, Start Lessons, Let's Go). Secondary actions are visually subordinate
- **Visual anchors:** Every music concept is paired with a diagram. Abstract questions ("How many lines are on a staff?") are accompanied by the labeled staff diagram for reference
- **Minimal navigation depth:** The deepest path (Home → Module → Lesson → Step 5) is only 4 levels; students never lose their place

### 4. Feedback and Feedforward

- **Immediate feedback:** After selecting a quiz answer, the correct answer highlights in teal and explanatory text appears inline before the "Next Practice" button becomes active. Students cannot proceed without seeing the correction
- **Feedforward:** Progress bars, step counters, and module status cards tell students exactly where they are and what comes next before they commit to an action
- **Motivational framing:** Failure states ("Practice More And Try Again") emphasize the path forward. Pass states should be designed with equivalent positivity

### 5. Touch Target Sizing

Per established guidelines for child users (Irwin, 2013; Donker & Reitsma, 2007), all interactive elements must meet minimum sizing requirements for tablet use:

- **Minimum touch target:** 44×44px (Apple HIG) or 48×48dp (Material Design)
- Answer option buttons in the quiz view use large rectangular cards occupying roughly half the screen width each
- Profile list items are full-width rows with generous vertical padding
- Primary CTAs are pill-shaped buttons with large text — designed for a child's index finger, not a mouse cursor

**Development rule:** Never use small clickable text links as primary actions in student-facing screens. All primary interactions must be button elements with sufficient padding.

### 6. Multimodal Learning Support

Music is an auditory domain. The interface bridges visual and auditory modalities:

- **"Hear the staff pattern"** audio button in lessons
- **"Play Example"** button in practice questions
- Visual staff diagrams accompany every music theory question
- Text labels (L1–L5, S1–S4) are displayed on the diagrams, not just implied

**Development rule:** Any new music concept introduced in a lesson must include both a visual diagram and an audio example trigger.

### 7. Role-Based Interface Separation

The teacher interface is architecturally hidden from the student experience — accessible only via a PIN from the homescreen. This is an explicit HCI choice: teacher-facing information density (scores, attempts, timestamps, nav errors) would be cognitively overwhelming and inappropriate for child users.

**Development rule:** Never surface teacher analytics, error counts, or performance data in any student-facing screen. The two modes are intentionally siloed.

---

## Usability Evaluation Design

The project includes a formal usability study. The following variables are tracked and should be supported by the system's logging infrastructure:

### Dependent Variables (Measurable Outcomes)
- Task completion rate (% completing each task without researcher assistance)
- Time on task per lesson/activity
- Accuracy in note/instrument identification activities
- Number of navigation errors
- Number of help requests to researchers
- Post-task satisfaction score (child-friendly rating scale)

### Data Collection Methods
- **Automatic system logs:** Task completion, accuracy scores, timestamps
- **Screen recording:** Navigation patterns, error moments, interaction behavior
- **Observer notes:** Confusion, hesitation, frustration, unexpected behaviors
- **Post-test questionnaire:** Satisfaction, ease of use, perceived difficulty (qualitative themes: difficulty, clarity, enjoyment)

### Key Metrics to Expose in Logs

The teacher dashboard already surfaces: module status, latest score, attempts, last active date, and nav errors. Ensure the backend records:

- `task_completion: boolean` per task per session
- `time_on_task: seconds` per lesson step
- `accuracy_pct: float` per practice/quiz attempt
- `nav_errors: int` (back navigations from unexpected screens)
- `help_requests: int` (manual entry by researcher or triggered event)

---

## Design System Reference

### Color Usage (as implemented)
| Color | Usage |
|---|---|
| **Orange / Amber** | Primary CTA buttons (START, Let's Go, Next, Start Module for Reading Music) |
| **Green** | Success states, "Start Module" for active modules, "Next Practice" after correct answers |
| **Blue / Teal** | Module cards (Note Names), informational buttons, correct answer highlights, progress indicators |
| **Purple** | Module card accent (used for specific module types) |
| **Red / Coral** | Failure state indicator on results screen; "Switch Learner" button |
| **Light grey (`#F0F2F5` approx)** | Page background — low-stimulation, reduces visual fatigue |
| **White** | Card surfaces — creates layering and depth |
| **Dark navy/charcoal** | Headings and body text — high contrast for readability |

### Typography Hierarchy
- **Display / Module titles:** Bold, large (28–32px+), dark charcoal — e.g. "Band Ready", "Reading Music", "Meet the Staff"
- **Body / Instructions:** Regular weight, 14–16px, muted grey — supporting text below headings
- **Labels / Badges:** Small caps or small bold — status badges ("READY", "Completed"), metadata
- **Feedback text:** Teal/green colored, slightly smaller — inline answer feedback

### Component Patterns
- **Cards:** White surface, soft border-radius (~12px), subtle shadow. Used for modules, profile rows, answer options, and stats
- **CTA Buttons:** Pill shape (high border-radius), bold text, color-coded by function (see above)
- **Progress indicators:** Thin horizontal bars below card content; dot indicators in lesson steps
- **Status badges:** Small rounded-rectangle pills with color-coded borders (orange = READY, green = Completed)
- **Avatar initials:** Circular, color-coded per student, used in profile selection and teacher dashboard

---

## Content Modules

| Module | Concept | Mnemonic |
|---|---|---|
| **Reading Music** | Staff lines (L1–L5) and spaces (S1–S4), treble clef | Count from the bottom up |
| **Note Names** | Treble clef note identification | Every Good Boy Deserves Fudge (lines); FACE (spaces) |
| **Rhythm Basics** | Note values and rhythm patterns | TBD |
| **Instrument Families** | Woodwind, brass, percussion, strings | TBD |
| **Final Challenge** | Cross-module assessment | All five modules must be completed |

Each module follows the identical structure: **5 lessons → 5 practice questions → Final quiz (80% pass threshold, 5 questions).**

---

## Key Constraints & Non-Negotiables

1. **No installation required** — must run entirely in browser
3. **Independent use by 9–11 year olds** — no login, no passwords, no external links, no advertising
4. **Linear progression enforcement** — quiz remains locked until all practice questions are answered
5. **80% pass threshold** — hardcoded per module; do not make configurable without teacher-side UI
6. **Teacher view is PIN-gated** — never surface teacher data in the student flow
7. **Immediate feedback on every interaction** — no question should advance without showing correct/incorrect state

---

## References

- Nielsen's Heuristics: Warje, K. (2024). *The Decision Lab.*
- Progressive Disclosure: Spillers, F. (2015). *IxDF.*
- Touch interfaces for children: Irwin, G. (2013). *Personal and Ubiquitous Computing.*
- Children and mouse targeting: Donker, A. & Reitsma, P. (2007). *Computers in Human Behavior.*
- Designing apps for kids: Anderson, E. (2022). *LunarLab.*
- Children's app emotional design: Chen, K. (2022). *Interacting with Computers, 34(3).*
- Music pedagogy for young children: Izzul, M. & Zakaria, J. (2022).
- Tablets in primary education: Crelin, J. (2024). *EBSCO Research.*
- Mobile devices in classrooms: Dorris et al. (2024). *Campbell Systematic Reviews.*