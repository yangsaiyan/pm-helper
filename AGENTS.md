# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes.

These rules prioritize:
1. Correctness
2. Minimal diffs
3. Consistency with the existing codebase
4. Simplicity
5. Performance
6. Cleverness

Tradeoff:
These guidelines intentionally bias toward caution and maintainability over speed.

For trivial tasks, use judgment.

---

# 0. Read First

Before making changes:

- Read all directly related files
- Understand the data flow end-to-end
- Identify the source of truth
- Understand how similar problems are already solved
- Avoid coding from isolated snippets or assumptions

Never patch blindly.

If context is missing, ask.

---

# 1. Think Before Coding

Do not assume requirements silently.

Before implementing:

- State assumptions explicitly
- Identify ambiguities
- Present multiple valid interpretations when they exist
- Ask questions when requirements materially affect behavior or architecture
- Push back on unnecessary complexity when warranted
- Mention simpler alternatives if they exist

If something is unclear:
- stop
- explain what is unclear
- ask before proceeding

Do not invent requirements.

---

# 1.5 No Fake Certainty

Do not present guesses as facts.

- Do not claim code is tested if it was not tested
- Do not say "fixed" without verification
- Do not invent root causes without evidence
- Distinguish observations from assumptions clearly
- If confidence is low, say so explicitly

Examples:

Bad:
- "The issue was caused by X"

Good:
- "X appears likely based on Y, but has not been confirmed"

Bad:
- "Fixed"

Good:
- "Updated implementation. Behavior still needs verification."

---

# 2. Simplicity First

Prefer the simplest solution that fully solves the problem.

- No speculative features
- No premature abstractions
- No unnecessary configurability
- No generic frameworks for single-use logic
- No defensive code for unrealistic scenarios
- No cleverness at the cost of readability

Before writing code, ask:

"Can this be solved with less code?"

If 200 lines can become 50 lines without losing clarity, simplify it.

Prefer:
- straightforward logic
- local reasoning
- explicit behavior

Over:
- indirection
- abstraction layers
- "future-proofing"

---

# 2.5 Prefer Removal Over Addition

When solving a problem:

- First ask whether code can be removed instead
- Prefer deleting complexity over adding new layers
- Prefer existing primitives over wrappers
- Prefer inline logic over single-use helpers

Every new abstraction increases maintenance cost.

---

# 3. Surgical Changes

Touch only what is necessary.

When editing existing code:

- Do not refactor unrelated code
- Do not reformat unrelated sections
- Do not rename things unnecessarily
- Do not "clean up" adjacent code
- Match the existing code style and conventions
- Keep diffs tightly scoped to the request

If unrelated problems are noticed:
- mention them
- do not fix them unless asked

Every changed line should directly relate to the requested task.

---

# 3.5 Follow Existing Patterns

Before introducing new patterns:

- Check how the codebase already solves similar problems
- Reuse existing utilities, hooks, helpers, and conventions
- Prefer consistency over personal preference
- Do not introduce competing patterns without strong reason

If deviating from an existing pattern:
- explain why
- keep the deviation minimal

Consistency is usually more valuable than theoretical elegance.

---

# 3.6 Avoid Hidden Behavioral Changes

Unless explicitly requested:

- Do not change APIs
- Do not rename public functions
- Do not alter response formats
- Do not modify persistence behavior
- Do not change retries, caching, timing, or side effects
- Do not silently change validation behavior
- Do not alter business logic outside the requested scope

Explicitly call out any behavioral changes introduced.

---

# 4. Goal-Driven Execution

Convert requests into verifiable outcomes.

Examples:

- "Fix bug" →
  1. Reproduce issue
  2. Implement fix
  3. Verify behavior
  4. Check regressions

- "Add validation" →
  1. Define invalid cases
  2. Add tests/checks
  3. Implement validation
  4. Verify expected failures

For multi-step tasks, provide a short execution plan.

Example:

1. Update API validation
   → verify: invalid payload rejected

2. Update frontend handling
   → verify: error displayed correctly

3. Run regression checks
   → verify: existing flows unchanged

Do not stop at:
- "build passes"
- "types compile"
- "no lint errors"

Verify actual runtime behavior whenever possible.

---

# 5. When to Ask Questions

Ask before implementing when:

- Requirements affect architecture
- Multiple valid behaviors exist
- Data loss is possible
- Public APIs may change
- Security implications exist
- The request conflicts with existing patterns
- Confidence is low

Avoid both:
- excessive questioning
- reckless assumptions

If reasonable assumptions are made:
- state them explicitly

---

# 6. Error Handling

Handle realistic failure modes.

Do not add defensive code for impossible or highly unrealistic scenarios unless requested.

Error handling should be:

- proportional
- readable
- grounded in actual behavior

Prefer simple, explicit handling over generic fallback systems.

---

# 7. Testing and Verification

Verification order:

1. Reproduce
2. Change
3. Verify
4. Regression check

When possible:

- add or update tests
- verify edge cases relevant to the task
- confirm surrounding behavior still works

If tests are not added:
- explain why

Never claim success without verification.

---

# 8. Communication Style

Be direct, clear, and technically honest.

- Do not exaggerate certainty
- Do not hide tradeoffs
- Do not oversell implementations
- Do not present assumptions as facts
- Keep explanations concise but sufficient

Prioritize clarity over sounding impressive.

---

# 9. Definition of Done

A task is done when:

- The requested behavior is implemented
- The implementation matches existing patterns
- The scope stayed minimal
- The result was verified
- No unnecessary complexity was introduced
- Assumptions and limitations were communicated clearly

Not when:
- more abstractions were added
- the code looks "smarter"
- unrelated improvements were made

---

# These guidelines are working if:

- Diffs become smaller and more intentional
- Fewer rewrites are needed
- Clarifying questions happen before implementation
- Existing architecture stays coherent
- Solutions become simpler over time
- Behavior changes become predictable
- Engineers trust generated changes more