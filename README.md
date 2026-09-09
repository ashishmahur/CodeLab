# CodeLab

CodeLab is a focused Low Level Design (LLD) practice platform that helps developers practice designing real-world software systems and improve their object-oriented design skills through structured feedback.

The platform provides a set of LLD problems where learners can design their solution, submit it, receive AI-powered evaluation, and review their previous attempts.

## Features

- Practice real-world Low Level Design problems
- 5 LLD problems covering common software systems
- Read problem descriptions and requirements
- Write solutions using the Monaco Editor
- Support for programming languages such as Python and TypeScript
- Submit design solutions
- AI-powered solution evaluation using Google Gemini
- Structured feedback for every submission
- Score out of 10
- Feedback across multiple design dimensions
- View strengths and areas for improvement
- Get suggestions for improving the design
- Store attempts and feedback persistently
- Review previous submissions through Attempt History
- About page with project information and author details

## Available Problems

CodeLab currently includes:

1. Parking Lot
2. Elevator System
3. Vending Machine
4. Movie Ticket Booking
5. ATM System

>>> Each problem focuses on important LLD concepts such as classes, interfaces, responsibilities, relationships, extensibility, and edge-case handling.

## Core User Flow

Choose a Problem
       ↓
Read Requirements
       ↓
Design Your Solution
       ↓
Submit Solution
       ↓
AI Evaluation
       ↓
Score + Structured Feedback
       ↓
Review Attempt History
       ↓
Try Another Problem


## Evaluation System

>>> Each submitted solution is evaluated across four categories:
---------------------------------
| Category      | Maximum Score |
|---------------|---------------|
| Designc       | 4             |
| Extensibility | 3             |
| Code Quality  | 2             |
| Edge Cases    | 1             |
| Total         | 10            |
---------------------------------

The evaluation provides:

- Strengths
- Areas for improvement
- Practical suggestions

>>> The AI generates scores for the individual categories, while the application calculates the final score out of 10 from those category scores.

## Technology Stack

- Frontend: Next.js, React, TypeScript
- Styling: Tailwind CSS
- Code Editor: Monaco Editor
- Backend Platform: Supabase
- Database: PostgreSQL
- AI Evaluation: Google Gemini API
- Icons: Lucide React
- Testing: Vitest
- Deployment: Vercel

## Architecture

CodeLab follows a simple architecture focused on the core LLD practice workflow.


                    CodeLab
                       │
                       ↓
              Next.js Application
                       │
             ┌─────────┴─────────┐
             ↓                   ↓
       Supabase Client       Gemini API
             │                   │
             ↓                   ↓
       Supabase API         AI Evaluation
             │
             ↓
         PostgreSQL
             │
       ┌─────┴─────┐
       ↓           ↓
   Problems     Attempts
                    │
                    ↓
                 Feedback


## Database Design

The main database entities are:


problems
   │
   │ problem_id
   ↓
attempts
   │
   │ attempt_id
   ↓
feedback

- Problems: Stores LLD problems.
- Attempts: Stores user submissions.
- Feedback: Stores evaluation results.

## AI Evaluation

Google Gemini evaluates submitted solutions and provides scores, strengths, weaknesses, and suggestions.

The AI generates scores for the individual categories, while the application calculates the final score out of 10.

## About

The About page provides information about CodeLab, its purpose, workflow, and author.

## Project Structure

CodeLab/
├── app/
│   ├── about/
│   ├── api/
│   ├── feedback/
│   ├── history/
│   └── problems/
├── components/
│   └── Navbar.tsx
├── lib/
│   ├── evaluation/
│   └── supabase/
├── public/
├── package.json
└── README.md

Author:
Ashish Mahur