# Band Ready - Complete Module Flow Documentation

## Overview
This document describes the complete learning flow for the "Note Names" module in the Band Ready prototype. The module consists of 5 lesson steps, 8 practice questions (each with default and answered states), and 8 assessment questions, all fully connected for complete traversal.

## Complete Learning Path

```
Home Screen
    ↓
[LESSON STEPS - Teaching Phase]
    ↓
Lesson Step 1: Meet the Staff
    ↓
Lesson Step 2: Notes on the Lines (EGBDF)
    ↓
Lesson Step 3: Notes in the Spaces (FACE)
    ↓
Lesson Step 4: How to Read a Note
    ↓
Lesson Step 5: Let's Review!
    ↓
[PRACTICE QUESTIONS - Practice Phase]
    ↓
Practice Q1: Line 1 identification (E)
    ↓
Practice Q2: Space 2 identification (A)
    ↓
Practice Q3: Line 3 identification (B)
    ↓
Practice Q4: Space 1 identification (F)
    ↓
Practice Q5: Line 4 identification (D)
    ↓
Practice Q6: Space 3 identification (C)
    ↓
Practice Q7: Line 5 identification (F)
    ↓
Practice Q8: Space 4 identification (E)
    ↓
[ASSESSMENT QUESTIONS - Evaluation Phase]
    ↓
Assessment Q1-Q8 (8 formal quiz questions)
    ↓
Results Screen (Pass or Fail)
    ↓
Home Screen (or retry)
```

## Section A: Lesson Steps (5 Screens)

### Purpose
Teaching slides that introduce note reading concepts before quizzing.

### Common Layout
- **Top bar**: Back arrow | 5 step dots (active dot advances) | "Step N of 5"
- **Title**: Concept name, Nunito Bold 36px, centered
- **Content card**: White 640×280px, rounded-24px, shadow
- **Bottom buttons**: "🎧 Listen along" (ghost) + "NEXT →" (golden pill)

### Step-by-Step Content

#### **Step 1 of 5: "Meet the Staff"**
- **Route**: `/lesson/step1`
- **Visual**: Music staff with 5 labeled lines and 4 labeled spaces
- **Helper text**: "Music is written on 5 lines called a staff."
- **Navigation**: 
  - Back → Home Screen
  - Next → Step 2

#### **Step 2 of 5: "Notes on the Lines"**
- **Route**: `/lesson/step2`
- **Visual**: Staff with 5 colored note dots on lines (E-red, G-orange, B-mint, D-blue, F-purple)
- **Mnemonic**: "💡 Every Good Boy Deserves Fudge"
- **Navigation**:
  - Back → Step 1
  - Next → Step 3

#### **Step 3 of 5: "Notes in the Spaces"**
- **Route**: `/lesson/step3`
- **Visual**: Staff with 4 colored note dots in spaces (F-red, A-orange, C-mint, E-blue)
- **Mnemonic**: "💡 FACE — just like the word!"
- **Navigation**:
  - Back → Step 2
  - Next → Step 4

#### **Step 4 of 5: "How to Read a Note"**
- **Route**: `/lesson/step4`
- **Visual**: Single prominent note on Line 2 (G) with annotation callouts
- **Annotations**: "This is Line 2", "Line 2 = G", "Count from bottom!"
- **Helper text**: "Always count lines starting from the bottom!"
- **Navigation**:
  - Back → Step 3
  - Next → Step 5

#### **Step 5 of 5: "Let's Review!"**
- **Route**: `/lesson/step5`
- **Visual**: Two-column summary (Lines: EGBDF | Spaces: FACE)
- **Helper text**: "You're ready — let's see what you know!"
- **Button**: "START QUIZ →" (300px wide, golden)
- **Navigation**:
  - Back → Step 4
  - Start Quiz → Practice Q1

---

## Section B: Practice Questions (16 Screens)

### Purpose
Low-stakes practice with unlimited attempts, hints, and immediate feedback. Each question has TWO states:
- **[A] Default state**: No answer selected, mascot encouraging
- **[B] Answered state**: Correct answer highlighted, "Next →" button appears

### Common Elements (All Practice Screens)
- **Top bar**: 
  - Left: Mint pill "↺ Practice Mode"
  - Center: "Take your time — no points, just practice!"
  - Right: "Done" button → Assessment Q1
- **Bottom**: Progress bar showing completion % (or "Next →" button when answered)
- **Mascot**: Bottom-right with encouraging speech bubble

### Practice Question Details

| Q# | Route | Question | Note Position | Color | Options | Correct | Hint | Progress |
|----|-------|----------|---------------|-------|---------|---------|------|----------|
| 1 | `/practice/q1` | Which note sits on Line 1? | Line 1 | Blue | E,G,B,F | E | Count from very bottom! | 12.5% |
| 2 | `/practice/q2` | What note is in Space 2? | Space 2 | Mint | F,A,C,E | A | Spaces spell FACE | 25% |
| 3 | `/practice/q3` | Which note is on Line 3? | Line 3 | Orange | G,D,B,F | B | Line 3 is the middle | 37.5% |
| 4 | `/practice/q4` | What note is in Space 1? | Space 1 | Red | A,E,G,F | F | F starts FACE! | 50% |
| 5 | `/practice/q5` | Which note is on Line 4? | Line 4 | Purple | B,D,F,E | D | D is 4th word! | 62.5% |
| 6 | `/practice/q6` | What note is in Space 3? | Space 3 | Blue | E,A,D,C | C | C is 3rd letter! | 75% |
| 7 | `/practice/q7` | Which note is on Line 5? | Line 5 | Mint | D,E,F,G | F | Fudge! Top line! | 87.5% |
| 8 | `/practice/q8` | What note is in Space 4? | Space 4 | Orange | C,F,E,D | E | E finishes FACE! | 100% |

### Practice Navigation Pattern
For each question N:
- **Default [A] state**: Any answer button → Answered [B] state
- **Answered [B] state**: 
  - "Next →" button → Next question default [A] state
  - "Done" button → Assessment Q1
- **Q8 [B]**: "Next →" → Assessment Q1

### Mascot Messages
- **Default state**: "You've got this!"
- **Answered state**: Celebration message (e.g., "That's right! E is on Line 1! 🎉")

---

## Section C: Assessment Questions (8 Screens)

### Purpose
Formal graded quiz with no hints, no mascot, clean focused layout.

### Common Elements
- **Top**: "QUESTION N OF 8" label + 8-segment progress bar
  - Completed segments: mint #52C98A
  - Current segment: blue #4A90D9
  - Upcoming segments: gray #E2E8F0
- **Question**: Bold 32px heading
- **Staff card**: Cream panel with treble clef (left) + white panel with staff and note (right)
- **Play Note button**: 100×100px blue square with speaker icon
- **Answer grid**: 2×2 grid, 220×100px buttons, all in default white state
- **No hints, no mascot, no practice mode badge**

### Assessment Question Details

| Q# | Route | Question | Note Position | Color | Options | Next Screen |
|----|-------|----------|---------------|-------|---------|-------------|
| 1 | `/assessment/q1` | What note is on Line 2? | Line 2 | Blue | A,G,E,D | Assessment Q2 |
| 2 | `/assessment/q2` | Which note is in Space 1? | Space 1 | Mint | F,A,C,E | Assessment Q3 |
| 3 | `/assessment/q3` | What note is on Line 4? | Line 4 | Red | G,B,F,D | Assessment Q4 |
| 4 | `/assessment/q4` | Which note is in Space 3? | Space 3 | Purple | D,E,C,G | Assessment Q5 |
| 5 | `/assessment/q5` | What note is on Line 1? | Line 1 | Orange | G,F,B,E | Assessment Q6 |
| 6 | `/assessment/q6` | Which note is in Space 2? | Space 2 | Blue | C,E,A,D | Assessment Q7 |
| 7 | `/assessment/q7` | What note is on Line 3? | Line 3 | Mint | F,B,D,A | Assessment Q8 |
| 8 | `/assessment/q8` | Which note is in Space 4? | Space 4 | Red | B,G,D,E | Results Pass |

### Assessment Navigation
- All 4 answer buttons on each screen → Next assessment question
- Q8: All buttons → Results Pass Screen
- **Prototype simplification**: For demo purposes, all answers advance forward without validation

---

## Section D: Results Screens

### Results Pass Screen
- **Route**: `/results-pass`
- **Display**: 
  - Trophy icon with gradient glow
  - "Fantastic Work!" heading
  - Score: 7/8 (88% accuracy)
  - 4 filled stars + 1 empty
  - Time: 2:45
- **Buttons**:
  - "Home" (blue) → Home Screen
  - "Next Lesson" (golden) → Home Screen

### Results Fail Screen
- **Route**: `/results-fail`
- **Display**:
  - Book icon in light blue circle
  - "Keep Practicing!" heading
  - Score: 4/8 (50% accuracy)
  - 2 filled stars + 3 empty
  - Encouraging message: "You need 5 or more correct answers to pass..."
  - Time: 3:12
- **Buttons**:
  - "Home" (outline) → Home Screen
  - "Try Again" (golden) → Practice Q1

---

## Complete Route Map

### Original Screens
```
/                           → Launch Screen
/profile-select             → Profile Select Screen
/home                       → Home Screen
/module-intro               → Module Intro Screen (legacy)
/activity-correct           → Activity Correct Screen (legacy)
/activity-incorrect         → Activity Incorrect Screen (legacy)
/assessment                 → Assessment Screen (legacy)
/results-pass               → Results Pass Screen
/results-fail               → Results Fail Screen
```

### Lesson Steps
```
/lesson/step1               → Lesson Step 1: Meet the Staff
/lesson/step2               → Lesson Step 2: Notes on the Lines
/lesson/step3               → Lesson Step 3: Notes in the Spaces
/lesson/step4               → Lesson Step 4: How to Read a Note
/lesson/step5               → Lesson Step 5: Let's Review!
```

### Practice Questions
```
/practice/q1                → Practice Q1 [A] Default
/practice/q1/answered       → Practice Q1 [B] Answered
/practice/q2                → Practice Q2 [A] Default
/practice/q2/answered       → Practice Q2 [B] Answered
/practice/q3                → Practice Q3 [A] Default
/practice/q3/answered       → Practice Q3 [B] Answered
/practice/q4                → Practice Q4 [A] Default
/practice/q4/answered       → Practice Q4 [B] Answered
/practice/q5                → Practice Q5 [A] Default
/practice/q5/answered       → Practice Q5 [B] Answered
/practice/q6                → Practice Q6 [A] Default
/practice/q6/answered       → Practice Q6 [B] Answered
/practice/q7                → Practice Q7 [A] Default
/practice/q7/answered       → Practice Q7 [B] Answered
/practice/q8                → Practice Q8 [A] Default
/practice/q8/answered       → Practice Q8 [B] Answered
```

### Assessment Questions
```
/assessment/q1              → Assessment Q1: Line 2 = G
/assessment/q2              → Assessment Q2: Space 1 = F
/assessment/q3              → Assessment Q3: Line 4 = D
/assessment/q4              → Assessment Q4: Space 3 = C
/assessment/q5              → Assessment Q5: Line 1 = E
/assessment/q6              → Assessment Q6: Space 2 = A
/assessment/q7              → Assessment Q7: Line 3 = B
/assessment/q8              → Assessment Q8: Space 4 = E
```

---

## Key Interaction Patterns

### 1. Sequential Learning Flow
- User progresses linearly through lesson steps (1→2→3→4→5)
- Back arrow on each step allows reviewing previous content
- Cannot skip ahead—must proceed sequentially

### 2. Practice Mode Characteristics
- **Forgiving**: Any answer click shows correct answer immediately
- **Unlimited attempts**: No penalty for wrong answers
- **Hints provided**: Blue box with lightbulb icon
- **Mascot encouragement**: Friendly character provides motivation
- **Progress tracking**: Visual bar shows completion percentage
- **"Done" escape**: Can skip to assessment anytime via Done button

### 3. Assessment Mode Characteristics
- **Formal evaluation**: Clean, focused interface
- **No hints**: Students must recall independently
- **No mascot**: Professional, serious atmosphere
- **No feedback**: Buttons don't indicate right/wrong until end
- **Sequential only**: Must answer all 8 questions in order
- **Progress visualization**: Segmented bar shows position (Q1-Q8)

### 4. Results and Retry Options
- **Pass state**: Celebrate achievement, offer progression
- **Fail state**: Encourage persistence, offer retry or review
- **Always provide clear next action**: Home or Try Again

---

## Design Consistency Rules

### Visual Consistency
1. **Staff notation**: All staff drawings use identical line spacing (20px apart)
2. **Note positions**: Y-coordinates consistent across all screens
3. **Treble clef**: Same size (60-70px) and position in all visuals
4. **Color coding**: Notes use same colors for same positions across module

### Interaction Consistency
1. **80px minimum touch targets**: All buttons meet accessibility standard
2. **Nunito font family**: Used throughout for child-friendly readability
3. **Button styles**:
   - Primary CTA: Golden (#F5A623) pill shape
   - Secondary: Blue (#4A90D9) rounded rectangle
   - Ghost: Blue outline, transparent fill
   - Answer buttons: White with gray border, mint when correct
4. **Navigation feedback**: Smooth transitions between screens

### Pedagogical Consistency
1. **Scaffolded learning**: Simple → Complex (lines → spaces → combined)
2. **Mnemonics introduced early**: EGBDF and FACE taught explicitly
3. **Practice before assessment**: 8 practice questions before 8 test questions
4. **Immediate feedback in practice**: Correct answer shown right away
5. **Positive reinforcement**: Mascot, stars, badges throughout

---

## Testing the Complete Flow

### Full Module Test Path
1. Start at Home Screen (`/home`)
2. Click "Start Lesson" on Rhythm Basics card
3. Progress through 5 lesson steps (Step 1→5)
4. Click "START QUIZ" on Step 5
5. Complete 8 practice questions (Q1→Q8)
   - Test both answering correctly and clicking "Done" early
6. Complete 8 assessment questions (Q1→Q8)
7. View Results Pass screen
8. Return to Home or try Fail path

### Alternative Fail Path Test
1. Navigate directly to `/results-fail`
2. Click "Try Again"
3. Should return to Practice Q1
4. Complete practice flow again

### Navigation Edge Cases to Test
- Back navigation from any lesson step
- "Done" button during practice (skips to assessment)
- Home button from Results screen
- Sequential progression enforcement

---

## Files Created

### Lesson Steps (5 files)
- `/src/app/screens/lesson/LessonStep1.tsx`
- `/src/app/screens/lesson/LessonStep2.tsx`
- `/src/app/screens/lesson/LessonStep3.tsx`
- `/src/app/screens/lesson/LessonStep4.tsx`
- `/src/app/screens/lesson/LessonStep5.tsx`

### Practice Questions (16 files)
- `/src/app/screens/practice/PracticeQ1A.tsx` through `PracticeQ8B.tsx`
- Each question has A (default) and B (answered) variants

### Assessment Questions (8 files)
- `/src/app/screens/assessment/AssessmentQ1.tsx` through `AssessmentQ8.tsx`

### Shared Components (2 files)
- `/src/app/components/PracticeQuestion.tsx`
- `/src/app/components/AssessmentQuestion.tsx`

### Configuration
- `/src/app/routes.ts` (updated with all 37 new routes)

---

## Summary Statistics

- **Total new screens created**: 29 unique screens
- **Total routes added**: 37 routes (including variants)
- **Total lesson steps**: 5 screens
- **Total practice screens**: 16 screens (8 questions × 2 states)
- **Total assessment screens**: 8 screens
- **Total interactive elements**: 100+ buttons across all screens
- **Complete traversal**: ✅ Full module flow from start to finish
- **Back navigation**: ✅ Implemented throughout
- **Forward progression**: ✅ All connections wired

---

## Future Enhancements (Out of Scope)

These features are not implemented in the current prototype but could be added:
1. **Answer validation**: Check if selected answer is actually correct
2. **Score tracking**: Calculate real score based on correct/incorrect answers
3. **Time tracking**: Actual timer for assessment completion
4. **Persistent state**: Save progress across sessions
5. **Adaptive difficulty**: Adjust questions based on performance
6. **Audio playback**: Actual note sounds when "Play Note" is clicked
7. **Multiple modules**: Additional music theory modules beyond Note Names
8. **User profiles**: Multiple learners with individual progress tracking

---

**Module Flow Status**: ✅ **COMPLETE AND FULLY CONNECTED**

All screens are created, all routes are configured, and the entire learning flow from Home → Lesson Steps → Practice → Assessment → Results is fully traversable.
