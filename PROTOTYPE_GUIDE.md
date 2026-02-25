# Band Ready - High-Fidelity Prototype

## Overview
Band Ready is a music education app designed for Grade 4-5 students (ages 9-11) preparing to join their school band. This is a complete horizontal prototype with 9 interconnected screens demonstrating the full user journey.

## Design Specifications

### Frame Size
- **1024 x 768px** (tablet landscape) for all screens

### Color Palette
- **Background page**: `#F0F4F8` (soft blue-gray)
- **Primary CTA**: `#F5A623` (golden yellow)
- **Active/Selected**: `#4A90D9` (calm blue)
- **Success/Completion**: `#52C98A` (mint green)
- **Body text**: `#3D4A5C` (dark slate)
- **Locked/Disabled**: `#B0BEC5` (muted gray)
- **White card**: `#FFFFFF` with shadow
- **Incorrect/Error**: `#E8524A` (warm red)
- **Hint accent**: `#EBF4FF` (light blue)

### Typography
- **Font Family**: Nunito (round, child-friendly)
- **Screen heading**: Nunito Bold, 36px
- **Section label**: Nunito SemiBold, 22px
- **Body copy**: Nunito Regular, 20px
- **Button label**: Nunito Bold, 22px

### Child-Safe UI Principles
- Minimum button height: **80px**
- Minimum touch targets: **80x80px**
- Card border-radius: **24px**
- Button border-radius: **16px**
- Minimum element gap: **24px**

## Screen Flow

### 1. Launch Screen (`/`)
**Purpose**: App introduction and entry point

**Elements**:
- Mascot character (cartoon music note)
- "Welcome!" subtext
- "Band Ready" title (64px, golden)
- Tagline
- "START" button (primary CTA)

**Navigation**: 
- START button → Profile Select Screen

---

### 2. Profile Select Screen (`/profile-select`)
**Purpose**: User profile selection

**Elements**:
- Back arrow (top-left)
- "Who's learning today?" heading
- 6 profile cards (Emma, Marcus, Sofia, James, Aisha, Noah)
- Each profile has colored avatar circle and name
- Selected state shows blue border and checkmark
- "Let's Go" button (bottom, fixed)

**Navigation**:
- Back arrow → Launch Screen
- "Let's Go" button → Home Screen

**Pre-selected**: Emma (blue)

---

### 3. Home Screen (`/home`)
**Purpose**: Main dashboard showing learning progress

**Elements**:
- Welcome message: "Welcome back, Emma!"
- Course Progress card (35% completion, 2 badges earned)
- "Your Learning Path" section
- 5 module cards in horizontal row:
  1. **Reading Music** (COMPLETED) - 4/5 stars, mint checkmark
  2. **Note Names** (COMPLETED) - 5/5 stars, mint checkmark
  3. **Rhythm Basics** (ACTIVE) - "CONTINUE" pill, "Start Lesson" button
  4. **Instrument Families** (LOCKED) - lock icon
  5. **Final Challenge** (LOCKED) - trophy icon

**Navigation**:
- "Start Lesson" on Rhythm Basics → Module Intro Screen
- Locked cards are not interactive

---

### 4. Module Intro Screen (`/module-intro`)
**Purpose**: Introduction to module content

**Elements**:
- Back arrow (top-left)
- 5 step indicators (step 1 active)
- "Step 1 of 5" text
- "Note Names" title
- Music staff visual card with:
  - 5 horizontal staff lines
  - Treble clef
  - 5 colored note dots (E, G, B, D, F)
  - Label bubble showing "G"
- "Listen along" ghost button
- "BEGIN MODULE" primary button (bottom, fixed)

**Navigation**:
- Back arrow → Home Screen
- "BEGIN MODULE" → Activity Correct Screen

---

### 5. Activity Screen — Correct State (`/activity-correct`)
**Purpose**: Practice mode with correct answer shown

**Elements**:
- "Practice Mode" badge (top-left, mint)
- "Take your time" message (center)
- "Done" button (top-right, blue)
- Question: "Which note is on the second line?"
- "Attempt 1 of unlimited" subtitle
- Staff card with note on second line (G)
- 2x2 answer grid:
  - E (default state)
  - **G (CORRECT state)** - mint background, checkmark
  - B (default state)
  - D (default state)
- Hint box: "Remember, lines are counted from the bottom up!"
- Mascot character with speech bubble: "You've got this!"
- Progress bar: 40% filled (blue)

**Navigation**:
- "Done" button → Assessment Screen

---

### 6. Activity Screen — Incorrect State (`/activity-incorrect`)
**Purpose**: Practice mode with incorrect answer feedback

**Elements**:
- Same layout as Activity Correct Screen
- Answer grid changes:
  - E (default state)
  - G (shows as CORRECT - mint, revealed)
  - **B (INCORRECT state)** - red background, X icon
  - D (default state)
- Mascot speech bubble: "Almost! Try again!" (red background)
- Progress bar: 40% filled (blue)

**Navigation**:
- "Done" button → Assessment Screen

---

### 7. Assessment Screen (`/assessment`)
**Purpose**: Formal quiz/assessment mode

**Elements**:
- "QUESTION 3 OF 8" label (small caps)
- 8-segment progress bar:
  - Segments 1-2: mint (completed)
  - Segment 3: blue (current)
  - Segments 4-8: gray (upcoming)
- Question: "What note is this?"
- Staff card with:
  - Cream background panel (left third) with treble clef
  - White area with staff and note (F position)
- "Play Note" button (100x100px, blue, speaker icon)
- 2x2 answer grid: A, B, G, E (all default state)
- No hints, no mascot (cleaner, focused)

**Navigation**:
- Any answer button → Results Pass Screen (for demo)

---

### 8. Results Screen — Pass State (`/results-pass`)
**Purpose**: Success celebration and next steps

**Elements**:
- Trophy icon (large, gradient glow: mint to blue)
- "Fantastic Work!" heading (48px)
- "You passed the assessment!" subtitle
- Results card:
  - Score: "7/8" (large, mint)
  - 4 filled gold stars + 1 empty
  - Stats: 88% Accuracy, 2:45 Time
- Two buttons:
  - "Home" (blue, secondary)
  - "Next Lesson" (golden, primary)

**Navigation**:
- "Home" button → Home Screen
- "Next Lesson" button → Module Intro Screen

---

### 9. Results Screen — Fail State (`/results-fail`)
**Purpose**: Encouraging feedback and retry options

**Elements**:
- Book icon (large, light blue circle with blue border)
- "Keep Practicing!" heading (48px)
- "You're learning! Try reviewing..." subtitle
- Results card:
  - Score: "4/8" (large, blue)
  - 2 filled gold stars + 3 empty
  - Encouraging message box (light blue): "You need 5 or more correct answers to pass..."
  - Stats: 50% Accuracy, 3:12 Time
- Two buttons:
  - "Home" (ghost style, blue outline)
  - "Try Again" (golden, primary, refresh icon)

**Navigation**:
- "Home" button → Home Screen
- "Try Again" button → Module Intro Screen

---

## Technical Implementation

### Technology Stack
- **React** with TypeScript
- **React Router** for navigation
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **Custom CSS variables** for design system

### File Structure
```
/src/app/
  ├── screens/
  │   ├── LaunchScreen.tsx
  │   ├── ProfileSelectScreen.tsx
  │   ├── HomeScreen.tsx
  │   ├── ModuleIntroScreen.tsx
  │   ├── ActivityCorrectScreen.tsx
  │   ├── ActivityIncorrectScreen.tsx
  │   ├── AssessmentScreen.tsx
  │   ├── ResultsPassScreen.tsx
  │   └── ResultsFailScreen.tsx
  ├── routes.ts
  └── App.tsx
```

### Navigation Map
```
Launch (/)
  ↓
Profile Select (/profile-select)
  ↓
Home (/home)
  ↓
Module Intro (/module-intro)
  ↓
Activity Correct (/activity-correct) OR Activity Incorrect (/activity-incorrect)
  ↓
Assessment (/assessment)
  ↓
Results Pass (/results-pass) OR Results Fail (/results-fail)
  ↓
Back to Home OR Try Again (Module Intro)
```

## HCI Design Considerations

### Age-Appropriate Design (9-11 years)
1. **Large touch targets** (minimum 80px) for developing motor skills
2. **Round, friendly typography** (Nunito) for approachability
3. **High contrast colors** for readability
4. **Generous spacing** to prevent mis-taps
5. **Clear visual hierarchy** with icons and colors
6. **Positive reinforcement** throughout (mascot, encouraging messages)

### Pedagogical Features
1. **Practice Mode** (unlimited attempts, hints) vs **Assessment Mode** (formal evaluation)
2. **Progressive disclosure** (locked modules, step-by-step)
3. **Visual learning** (music staff, colored notes, treble clef)
4. **Immediate feedback** (correct/incorrect states)
5. **Gamification** (stars, badges, progress tracking)
6. **Positive error handling** ("Almost! Try again!" instead of harsh negative feedback)

### Accessibility Considerations
1. **Consistent color meanings** (mint = success, blue = active, red = error)
2. **Icon + text labels** for clarity
3. **Clear state indicators** (borders, backgrounds, icons)
4. **Large, readable text** (minimum 14px, most text 18px+)
5. **Generous padding and margins** for visual comfort

## Testing the Prototype

### Quick Navigation Guide
To test specific screens, navigate directly:
- Launch: `/`
- Profile: `/profile-select`
- Home: `/home`
- Module Intro: `/module-intro`
- Activity (Correct): `/activity-correct`
- Activity (Incorrect): `/activity-incorrect`
- Assessment: `/assessment`
- Results (Pass): `/results-pass`
- Results (Fail): `/results-fail`

### Key User Flows to Test
1. **First-time user flow**: Launch → Profile → Home → Module → Activity → Assessment → Results
2. **Returning user flow**: Launch → Profile → Home (see progress)
3. **Practice flow**: Home → Module → Activity (multiple attempts) → Assessment
4. **Success flow**: Assessment → Results Pass → Next Lesson
5. **Retry flow**: Assessment → Results Fail → Try Again → Module

---

## Design Credits
This prototype was created for an HCI academic project, demonstrating best practices in educational interface design for elementary school students.
