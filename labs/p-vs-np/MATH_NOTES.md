# Mathematical notes — P vs NP — Inside the Computation (V1)

These are the guardrails for the film. The animation is an intuition pump about verification and
search; it is not a proof, a benchmark, or a claim about the status of the P vs NP problem.
Anything said about the film in a caption, a description or a voiceover should be consistent
with what follows.

## 1. The definitions, stated properly

**P** is the class of decision problems solvable by a deterministic algorithm in time polynomial
in the length of the input.

**NP** is the class of decision problems whose YES instances have certificates of length
polynomial in the input, which a deterministic algorithm can verify in polynomial time. The
initials stand for **nondeterministic polynomial time**.

**P ⊆ NP.** A problem solvable in polynomial time is verifiable in polynomial time: ignore the
certificate and solve it. So the two classes are not alternatives, and the open question is
whether the containment is strict.

**Never gloss NP as "non-polynomial".** It is a common and damaging error. NP is not the
complement of P, it is not the class of hard problems, and it does not mean "cannot be done in
polynomial time". Every problem in P is in NP.

Two further points of precision worth keeping:

- The definition is **asymmetric**. NP guarantees short, checkable certificates for YES instances
  only. A satisfying assignment certifies satisfiability; there is no known short certificate for
  unsatisfiability. Whether there is one is the separate, also open, NP vs co-NP question.
- Polynomial time is a **worst-case, asymptotic** property of an algorithm on a model of
  computation. It is not a statement about any particular input, or about wall-clock speed.

## 2. What the film's framing is, and is not

The film uses "checking a supplied answer is fast; finding one without being given the answer is
unknown" as the way into the distinction. That contrast is an **intuition pump for the
definitions above, not the definitions themselves**. The formal statement is about classes of
decision problems, certificate lengths and polynomial-time verifiers; the film's checker is one
concrete instance of a verifier acting on one concrete certificate.

Two things the framing must not be read as saying:

- That P vs NP is about how humans feel when solving puzzles. It is about worst-case
  polynomial-time computability.
- That "verification" and "search" are the whole content of the classes. They are the useful
  handle on one distinction inside them.

## 3. Notation: n, m and L are three different things

| Symbol | Meaning | In the film's formula |
| --- | --- | --- |
| `n` | number of Boolean variables | 3 (A, B, C) |
| `m` | number of clauses | 3 |
| `L` | full length of the encoded input, in bits | the encoding of all three clauses |

These must not be equated casually.

- `n` and `m` are related only loosely. Every variable that actually occurs appears in some
  clause, so `n ≤ 3m` when there are no unused variables; and a 3-CNF formula with no repeated
  clauses has `m = O(n³)`, since there are only `O(n³)` distinct 3-literal clauses over `n`
  variables. Neither bound lets you substitute one for the other.
- `L` is not `n` and not `m`. Under a standard encoding in which each literal stores a variable
  index and a sign, `L = Θ(m log n)` bits. **Polynomial time means polynomial in `L`**, which is
  the convention that makes the classes well defined. In this setting a bound polynomial in `n`
  and `m` is also polynomial in `L`, since `m ≤ L` and `n ≤ 3m`.

**The cost of one complete check.** For a 3-CNF formula, a complete scan of every literal
examines **at most `3m` literal occurrences** — three per clause, `m` clauses — assuming
constant-time access to the supplied bit values. "At most" is the right phrasing: a checker that
stops at the first failing clause reads fewer, which is exactly what the film's enumerator does
via `firstFailing` when it rejects `000` on Rule 1. Verifying a supplied assignment is therefore
`O(m)` literal reads, which is polynomial in `L`. That is why SAT is in NP.

**A caution about the film's HUD.** During beat 4 the HUD prints `m = 4n` and
`one full check ≤ 3m = 12n literal reads`. That `m = 4n` is an **illustrative** clause count for
a hypothetical larger input, chosen so the HUD has a plausible `m` to show as `n` grows. It is
not the film's formula, which has `n = 3` and `m = 3` and therefore `3m = 9`. The Scaling panel
says so in the interface: the three-variable formula is not being given more variables, the panel
is a schematic view of larger inputs.

## 4. Four quantities that must be kept apart

Conflating any two of these produces a false claim. They are measured in different units and they
grow for different reasons.

| Quantity | What it counts | Value in the film | Grows with |
| --- | --- | --- | --- |
| Candidate assignments | complete settings of the variables, `2^n` | 8 | `n`, exponentially |
| Literal inspections per check | literal occurrences read to verify **one** supplied assignment, at most `3m` | at most 9 | `m`, linearly |
| Objects rendered on screen | boxes, wires, labels and shadows the engine draws per frame | a few hundred; the scale bar is capped at 64 cells | the animation's design, nothing else |
| Elapsed animation seconds | running time of the film | 30.00 s exactly | nothing; it is fixed |

In particular: the film taking six seconds to walk through one verification says nothing about
the cost of that verification, and the scale bar's 64 cells are a drawing budget, not a count.
At `n = 50` the bar's 64 cells stand for 1,125,899,906,842,624 assignments, roughly 17.6 trillion
per cell.

## 5. 3-SAT is NP-complete; this instance is not hard

3-SAT is NP-complete: it is in NP, and every problem in NP reduces to it in polynomial time. That
is a statement about **the general problem** — about the worst case over all inputs, as the input
grows.

It says nothing about any individual instance. Individual 3-SAT instances, including the one in
the film, can be trivially easy:

- The film's formula has 3 variables and 3 clauses. Its entire candidate space is 8 assignments.
- Five of those 8 satisfy it, so a random guess succeeds with probability 5/8.
- The film's own enumerator finds a satisfying assignment on its second candidate.

**The tiny example teaches the mechanism. It is not evidence of hardness.** It shows what a
clause evaluation is, what a certificate is, and what a candidate space looks like. No conclusion
about difficulty can be drawn from it, and the film's footnote states this on screen.

It is also worth saying that NP-completeness is a worst-case notion. It does not imply that
typical or practical instances are hard, and in fact modern SAT solvers routinely dispatch
industrial instances with millions of variables.

## 6. A large candidate space does not force enumeration

`2^n` counts how many assignments exist. It does not establish that any algorithm must look at
them.

Counter-examples are ordinary. Sorting `n` items has `n!` possible orderings and is solved in
`O(n log n)`. Linear programming has an exponential number of vertices and is solvable in
polynomial time. Closer to hand: 2-SAT has the same `2^n` assignments as 3-SAT and is solvable in
linear time.

Brute force is **one method among many**, and the film says so twice: the caption "Brute force is
only one method." and a dashed alternative route that is deliberately drawn empty, labelled
"Another algorithm?". The route is empty because the film is not claiming such a route exists for
SAT — it is marking the place where the open question lives.

## 7. What P ≠ NP would and would not mean

**It would mean.** No algorithm decides SAT correctly on every instance in time polynomial in the
input length. Because SAT is NP-complete, the same follows for every NP-complete problem.

**It would not mean:**

- That every instance takes exponential time. Infinitely many instances are trivial; the film's
  is one. A worst-case separation is a statement about the hardest instances at each size, not
  about all of them.
- That brute force is unavoidable. Exhaustive search over `2^n` assignments is already beaten in
  the worst case by known algorithms for 3-SAT, and P ≠ NP would not change that. Superpolynomial
  is not the same as `2^n`.
- That heuristics, approximation, parameterised algorithms or average-case methods stop working.
  None of those are ruled out by a worst-case separation.

**And conversely, P = NP would not mean that hard problems become practical.** A polynomial-time
algorithm can be useless: `L^100`, or `L²` with an astronomical constant, is polynomial and
unusable. "Polynomial" is a classification boundary that happens to be robust and useful, not a
promise of speed.

## 8. Rejecting one candidate proves nothing about satisfiability

When a candidate fails a clause, the only sound conclusion is that **that candidate** does not
satisfy the formula. The correct label is **"candidate rejected"**, never "unsatisfiable",
"no solution" or "fail".

To conclude that a formula is unsatisfiable by enumeration you must reject **all** `2^n`
candidates — which is precisely the asymmetry noted in section 1: a satisfying assignment is a
short certificate for YES, whereas a proof of NO is not known to have one.

The code already holds this line, and it should stay held: the Inspect verdict reads
"Candidate rejected — Rule N fails", the in-frame readout reads "CANDIDATE REJECTED", and the
film's tag caption reads "000 — candidate rejected (Rule 1 fails)". The assignment tree makes the
same point visually with its legend "dim = not yet tested" — an untested leaf is unknown, not
failed.

## 9. The film's formula, in full

```
F = (A ∨ B ∨ C) ∧ (¬A ∨ B ∨ ¬C) ∧ (A ∨ ¬B ∨ ¬C)
```

Rule 1 = `(A ∨ B ∨ C)`, Rule 2 = `(¬A ∨ B ∨ ¬C)`, Rule 3 = `(A ∨ ¬B ∨ ¬C)`.

All eight assignments, with per-clause values. Leaf `i` in the film's assignment tree is the
three-bit binary representation of `i`, with A as the leading bit.

| i | Assignment (ABC) | A | B | C | Rule 1 | Rule 2 | Rule 3 | F | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | 000 | 0 | 0 | 0 | 0 | 1 | 1 | 0 | Candidate rejected — Rule 1 fails |
| 1 | 001 | 0 | 0 | 1 | 1 | 1 | 1 | 1 | Satisfies F |
| 2 | 010 | 0 | 1 | 0 | 1 | 1 | 1 | 1 | Satisfies F |
| 3 | 011 | 0 | 1 | 1 | 1 | 1 | 0 | 0 | Candidate rejected — Rule 3 fails |
| 4 | 100 | 1 | 0 | 0 | 1 | 1 | 1 | 1 | Satisfies F |
| 5 | 101 | 1 | 0 | 1 | 1 | 0 | 1 | 0 | Candidate rejected — Rule 2 fails |
| 6 | 110 | 1 | 1 | 0 | 1 | 1 | 1 | 1 | Satisfies F |
| 7 | 111 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | Satisfies F |

Five of the eight assignments satisfy `F`: `001`, `010`, `100`, `110`, `111`. The three failures
each fail exactly one rule: `000` on Rule 1, `011` on Rule 3, `101` on Rule 2.

The candidate supplied to the checker in beat 2 is `A = B = C = 1`, row 7 — a satisfying
assignment, which is why the ALL gate reads "ALL 3 RULES PASS". The enumerator in beat 3 tests
row 0 (`000`, rejected on Rule 1) and then row 1 (`001`, satisfying) and stops there.

Every figure in this table is produced by the evaluator in `index.html` — `CLAUSES`, `litValue`,
`clauseValue`, `formulaValue` and `firstFailing` — which is the same code that lights the lamps
on screen. Inspect mode recomputes the whole table live, so any of these eight rows can be
checked by clicking.

## 10. Status of the problem

The animation **illustrates the open question and does not resolve it**. It shows what
verification looks like, what a candidate space looks like, and where the unknown sits. It offers
no argument either way.

P vs NP was posed in 1971 by Stephen Cook, with Leonid Levin arriving independently at the same
result. It is one of the seven Clay Mathematics Institute Millennium Prize Problems, named in
2000, and it **remains open**. No proof of either P = NP or P ≠ NP is known, and none of the
Millennium problems apart from the Poincaré conjecture has been settled.

The film's closing cards say exactly this — "P = NP?" followed by "Still an open question." — and
any description written around the film should not say more.
