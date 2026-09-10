# AI Usage

I used AI during the development of CodeLab mainly as a development and debugging assistant.

It helped me with implementation, understanding errors, improving the UI, integrating APIs, and designing the AI-based feedback system.

## 1. AI Evaluation

I used Gemini to evaluate the LLD solutions submitted by users.

The feedback is based on four areas:

- Design: 0–4
- Extensibility: 0–3
- Code Quality: 0–2
- Edge Cases: 0–1

The application calculates the final score out of 10.

I chose this approach because LLD problems can have multiple valid solutions. Instead of checking for one exact answer, the AI can review the overall design and give useful feedback.

## 2. Structured Feedback

I asked Gemini to return feedback in a fixed structure containing:

- Scores
- Strengths
- Weaknesses
- Suggestions

This made it easier to save the feedback in Supabase and display it on the feedback page.

## 3. Debugging and Error Fixes

AI was also used to help find and fix errors during development.

Some examples were:

- Fixing a `405 Method Not Allowed` error in the evaluation API.
- Fixing TypeScript errors caused by Supabase returning related data as arrays.
- Troubleshooting Gemini API/model errors.
- Fixing dependency and build issues while integrating Monaco Editor.
- Helping with Next.js and Supabase integration issues.

For these issues, I used the error messages to understand the problem and then applied and tested the suggested fixes.

## 4. UI and Development Help

AI was also used while building and improving:

- Next.js pages and components
- Tailwind CSS styling
- Monaco Editor integration
- Supabase database integration
- Gemini API integration
- Attempt History
- Feedback page
- Navigation and overall UI

I reviewed the suggestions and changed them whenever they did not fit the project requirements.

## 5. What I Decided Myself

AI was used as a helper, but the final decisions were made based on the assignment requirements and the limited MVP scope.

I kept the project simple and focused on the main flow:

**Choose Problem → Submit Solution → Get Feedback → Review → Try Again**

The goal was to build a working LLD practice platform rather than add unnecessary features.