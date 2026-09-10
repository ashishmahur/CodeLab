# Research Note — CodeLab

## 1. Problem Understanding

Low Level Design (LLD) is mainly about designing the structure of a software system before implementation. Unlike many programming problems, LLD problems usually do not have one single correct answer.
For example, a Parking Lot system can be designed using different class structures, interfaces, and design patterns while still satisfying the same requirements.
This creates an important challenge for an LLD practice platform: simply checking whether the submitted code matches a predefined answer is not enough.
A useful platform should help a learner understand:

- Whether the responsibilities are assigned correctly
- Whether classes and interfaces are well designed
- Whether the design can be extended
- Whether the solution handles important edge cases
- What could be improved in the current approach

Therefore, CodeLab focuses on evaluating the quality of a design rather than trying to find one exact implementation.

## 2. What Makes LLD Practice Different?

Traditional programming platforms can often evaluate submissions using test cases. If the output matches the expected output, the solution can be considered correct.
LLD is different because multiple implementations can satisfy the same requirements.
For example, two developers may use different class structures or design patterns for a Vending Machine while both designs are valid.
Because of this, a useful LLD platform should evaluate multiple dimensions of a solution instead of using only pass/fail evaluation.

For CodeLab, the evaluation is divided into four areas:

- **Design — 0 to 4**
- **Extensibility — 0 to 3**
- **Code Quality — 0 to 2**
- **Edge Cases — 0 to 1**

The final score is calculated out of 10.
This makes the evaluation more aligned with the actual nature of LLD.

## 3. Deterministic Evaluation vs AI Evaluation

There are two main approaches that could be used for evaluating LLD submissions.

### Deterministic Evaluation

A deterministic evaluator can check predefined conditions such as:

- Required classes exist
- Required methods exist
- Code compiles
- Certain test cases pass
- Specific interfaces are implemented

This approach is predictable and repeatable.

However, it is difficult to use as the only evaluator for LLD because it can reject valid alternative designs simply because they do not match the expected structure.

### AI-Based Evaluation
An LLM can analyze the submitted design and provide natural-language feedback.
This is more suitable for LLD because it can reason about concepts such as:

- Class responsibilities
- Relationships between objects
- Separation of concerns
- Extensibility
- Design patterns
- Missing edge cases

Recent research also shows the potential of LLMs for generating formative programming feedback, while highlighting that reliability and consistency still need attention. 
For CodeLab, I therefore chose an AI-assisted evaluation approach using Gemini.
However, AI feedback is not treated as an absolute source of truth. The platform uses a fixed evaluation rubric and structured output so that feedback remains focused and easier to understand.

## 4. Designing Useful Feedback

A score alone is not very useful for learning.
For example, telling a learner that their solution received 5/10 does not explain what they should change.
Therefore, CodeLab returns three types of qualitative feedback:

### Strengths

What the learner did well.

### Weaknesses

Important design problems or missing concepts.

### Suggestions

Specific improvements that the learner can apply in another attempt.
The evaluator also provides scores for the four predefined categories.
This creates a feedback loop:

**Submit → Receive Feedback → Understand Mistakes → Improve → Try Again**

This approach is important because the purpose of CodeLab is practice and improvement, not only grading.
Research on AI-assisted programming feedback similarly points toward the value of timely, actionable feedback, while also showing that AI-generated feedback can contain incorrect suggestions and therefore should be treated carefully. :contentReference

## 5. Handling Multiple Attempts

LLD skills improve through iteration.
A learner may receive a score of 5/10 on the first attempt and improve the design after understanding the feedback.
Therefore, CodeLab stores every submission as a separate attempt.

The learner can:

1. Submit a solution
2. View the generated feedback
3. Review the previous attempt
4. Try the same problem again
5. Compare their progress through attempt history

This makes the platform practice-oriented rather than simply evaluation-oriented.

## 6. Evaluation Reliability and Limitations

AI evaluation introduces some limitations.
LLMs can sometimes:

- Give inconsistent feedback
- Misinterpret a design decision
- Identify an issue that is not actually a problem
- Miss a valid edge case
- Produce different feedback for similar submissions

Research on LLM-based software engineering evaluation also highlights the difficulty of evaluating open-ended tasks where multiple answers can be valid and model outputs can be non-deterministic. 
Because of this, CodeLab does not attempt to claim that its AI score is equivalent to a human expert's final judgement.
Instead, the score is presented as structured guidance for practice.

For a larger production system, the evaluator could be improved using:

- Deterministic checks for syntax and required behaviour
- Human review for disputed evaluations
- Evaluation of the AI evaluator itself
- Multiple evaluation passes
- Better problem-specific rubrics

## 7. Research Conclusion

The main finding from this research is that LLD practice requires a different evaluation approach from traditional programming problems.
Since multiple designs can be correct, a platform should focus on design quality, extensibility, responsibilities, and edge cases instead of matching a single reference solution.
CodeLab therefore combines a fixed evaluation rubric with AI-generated qualitative feedback.
The goal is not to replace a human LLD interviewer or reviewer. The goal is to provide fast, structured feedback that helps learners identify weaknesses and iterate on their designs.

The resulting learning loop is:

**Choose Problem → Design Solution → Submit → Get Feedback → Review → Try Again**

This forms the core idea behind CodeLab.