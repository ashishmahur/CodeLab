# Design Note — CodeLab

## 1. Overview

CodeLab is a web-based Low Level Design (LLD) practice platform.

The main goal is to provide a simple practice loop where a learner can choose an LLD problem, design a solution, submit it, receive structured feedback, review the attempt, and try the problem again.

The application is intentionally designed as a simple monolithic web application because the assignment focuses on LLD and the learning experience rather than distributed system architecture.


## 2. Architecture

CodeLab uses the following architecture:

                User
                  |
                  v
        +-------------------+
        |    Next.js App    |
        |                   |
        |  Problems / UI    |
        |  Monaco Editor    |
        |  History / Retry  |
        +---------+---------+
                  |
          +-------+-------+
          |               |
          v               v
   +-------------+   +-------------+
   |  Supabase   |   |   Gemini    |
   | PostgreSQL  |   | AI Evaluator|
   +-------------+   +-------------+

## 3. Core Domain Model

CodeLab mainly consists of three entities:

### Problem
Stores the LLD problem details, difficulty, requirements, and submission points.

### Attempt
Stores each solution submitted by the learner, including the selected language and submission status.

### Feedback
Stores the evaluation result for an attempt, including scores, strengths, weaknesses, and suggestions.

## 4. Database Relationship

Problem
   |
   | 1
   | 
   | many
   v
Attempt
   |
   | 1
   |
   | 1
   v
Feedback

## 5. Application Flow

Choose Problem
      ↓
Design Solution
      ↓
Submit
      ↓
Save Attempt
      ↓
Gemini Evaluation
      ↓
Save Feedback
      ↓
Review
      ↓
Try Again

## 6. Evaluation Design

LLD problems can have multiple valid solutions, so CodeLab does not use exact answer matching.

Instead, Gemini evaluates the solution using a fixed rubric:

| Category      | Score |
|---------------|------:|
| Design        | 4     |
| Extensibility | 3     |
| Code Quality  | 2     |
| Edge Cases    | 1     |
|  Total        | 10    |

The evaluator also provides strengths, weaknesses, and suggestions.

## 7. Extensibility

Problems are stored in Supabase instead of being hardcoded in the frontend, so new problems can be added through the database.
The evaluation logic is separated into its own module, allowing other evaluation methods to be added in the future.

For example:

Deterministic Checks
        +
AI Evaluation
        +
Human Review

## 8. Important Design Decisions

### Multiple Valid Solutions

LLD does not have one correct implementation, so CodeLab evaluates design quality instead of exact answer matching.

### Structured Feedback

Scores alone are not enough. Strengths, weaknesses, and suggestions help learners understand how to improve.

### Attempt History

Every submission is stored separately so learners can retry problems and review previous attempts.

### Simple Architecture

A monolithic Next.js application was chosen because the assignment focuses on LLD practice without unnecessary infrastructure complexity.


## 9. Failure Handling

AI evaluation depends on an external service and may fail due to API or network issues.

The evaluation API returns an error response when evaluation fails.

For a larger production system, evaluation could use an asynchronous queue with retry support.

For this MVP, synchronous evaluation keeps the implementation simple and focused.


## 10. Conclusion

CodeLab is built around the learning loop:

**Choose Problem → Design → Submit → Get Feedback → Review → Try Again**

The design keeps the application simple while separating problems, attempts, feedback, and evaluation responsibilities.

The database-driven problem model and separate evaluator module also make the platform easier to extend with more problems and evaluation methods in the future.