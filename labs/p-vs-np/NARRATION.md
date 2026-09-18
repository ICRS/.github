# Narration — P vs NP — Inside the Computation (V1)

**No audio is bundled in V1.** There is no audio element, no audio file, no Web Audio and no
speech synthesis in `index.html`, and `render-mp4.mjs` pipes video frames to ffmpeg with no
audio input and no audio codec flag. The exported MP4 is silent.

**The film is designed to be understood without sound.** Every beat carries its own on-screen
text, and the mechanism is shown rather than described: lamps light, ports fill, a marker walks
the machine, the count grows. The script below is a spoken layer for a future pass, not a
requirement for comprehension. Nothing in it explains something the picture does not already
show.

The six lines are the narration copy. They are deliberately **not** identical to the on-screen
captions — the captions are the film's own voice, and a narrator reading them back word for word
would double up. The caption schedule further down is there so a narrator can see exactly what
is on screen while each line lands.

Timings are in seconds from the start of the film. At 30 fps, frame number = seconds × 30.

## The six lines

| # | Beat | In | Out | Length | Words | Rate | Line |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 (0 – 3.00) | 00.40 | 02.90 | 2.50 s | 6 | 144 wpm | "Can some setting satisfy every rule?" |
| 2 | 2 (3.00 – 9.20) | 03.20 | 07.00 | 3.80 s | 9 | 142 wpm | "Give me an answer, and I can check it." |
| 3 | 3 (9.20 – 15.20) | 09.40 | 13.30 | 3.90 s | 10 | 154 wpm | "Without that answer, I need a method to find one." |
| 4 | 4 (15.20 – 22.40) | 16.40 | 19.80 | 3.40 s | 8 | 141 wpm | "Each extra binary choice doubles the possible settings." |
| 5 | 5 (22.40 – 25.40) | 22.70 | 24.80 | 2.10 s | 5 | 143 wpm | "But must I search them?" |
| 6 | 6 (25.40 – 30.00) | 25.80 | 29.80 | 4.00 s | 10 | 150 wpm | "P versus NP: does efficient checking always imply efficient solving?" |

Totals: 48 words over 19.70 s of speech in a 30.00 s film. 10.30 s is unscored and should stay
that way — the silences are where the machine is doing the talking.

## Line-by-line direction

### 1 — "Can some setting satisfy every rule?" (00.40 → 02.90)

Six words, 2.50 s, 144 wpm. Open plainly and unhurried; this is a question being posed, not a
puzzle being teased. Land "satisfy" against the registers loading the supplied bits at 2.45–2.95
and let the line finish before the camera pushes into the machine at 3.00. The identical caption
is on screen for the whole line, so the delivery can be relaxed — the viewer is reading along.

### 2 — "Give me an answer, and I can check it." (03.20 → 07.00)

Nine words, 3.80 s, 142 wpm. Take the comma as a real beat: "Give me an answer" as the marker
leaves the registers, then "and I can check it" as it arrives at Rule 1 (evaluated 3.75–4.85).
Confident, matter-of-fact — the claim in this line is the easy half of the film and should sound
easy. Stop by 7.00 and leave Rules 2 and 3 to resolve in silence; the ALL gate fires at 8.62 and
the "Verified — not searched." caption carries the beat out on its own.

### 3 — "Without that answer, I need a method to find one." (09.40 → 13.30)

Ten words, 3.90 s, 154 wpm — the briskest line in the film, because the beat has to leave room
for the two candidate tags at the end. Slight lean on "method". Tone shifts here: the confidence
of line 2 gives way to a problem. The assignment tree is revealing underneath (11.90 → 13.25), so
the line lands its last word as the tree finishes drawing, and clears the frame before the `000`
tag fades in at 13.60. Do not narrate the two candidate tests; the amber tags do that better.

### 4 — "Each extra binary choice doubles the possible settings." (16.40 → 19.80)

Eight words, 3.40 s, 141 wpm. Even pace, no emphasis on "doubles" — the number on screen is
already doing the emphasis, stepping 3 → 4 → 10 → 20 → 50 at 15.40, 16.30, 17.60, 19.00 and
20.40. Finish at 19.80 so the jump to `n = 50` at 20.40 lands in silence; that is the moment the
count goes from a million to a quadrillion and it does not need help.

### 5 — "But must I search them?" (22.70 → 24.80)

Five words, 2.10 s, 143 wpm. The pivot of the film. "But" is the hinge; let a small gap sit in
front of it, coming out of the silence after the big number. Rising, genuinely interrogative —
this is the question the film refuses to answer. The dashed "Another algorithm?" route is drawing
itself between 23.00 and 24.00, and it is drawn empty on purpose; the line should not imply that
a route exists.

### 6 — "P versus NP: does efficient checking always imply efficient solving?" (25.80 → 29.80)

Ten words, 4.00 s, 150 wpm. Take the colon as a full stop: "P versus NP." — pause — then the
question. Say the name while the fast/unknown contrast is on screen (fading in 25.60 → 26.30),
and let the question clause run across the `P = NP?` card as it rises (27.40 → 28.20). Land
"solving" by 29.80 and leave the last 0.20 s silent under "Still an open question." Do not
inflect the ending as though it resolves; it does not.

## On-screen caption schedule

Exact strings, read from `stateAt` and the overlay drawing functions. "Fade in" and "Fade out"
are smoothstep ramps; between them the element sits at full opacity. All positions are in the
1080 × 1920 frame. Re-read these from `stateAt` if the timeline is ever retimed — they are
literals in the code, not derived from anything.

### Caption layers

| Layer | Style | Position |
| --- | --- | --- |
| main | 600 weight, 60 px system sans, `#EDEDEA`, centred, reflowed over multiple lines rather than shrunk | baseline y = 1584, extra lines stack upward at 76 px |
| sub | 500 weight, 42 px system sans, `#74747C`, centred | y = 1682 |
| tag | 600 weight, 38 px system mono, `#D99B3C`, centred | y = 1762 |
| HUD | panel, 26/30/27 px, sans then mono | x = 90, y = 150, 900 × 150 |
| final | screen-space cards, sizes below | see the table |

### Schedule

| Beat | Layer | Text | Fade in | Fade out |
| --- | --- | --- | --- | --- |
| 1 | main | Can some setting satisfy every rule? | 0.35 → 1.10 | 2.60 → 3.00 |
| 2 | main | An answer is supplied. Check it. | 3.10 → 3.70 | 4.70 → 5.20 |
| 2 | world | ALL 3 RULES PASS (over the ALL gate) | 8.62 → 8.95 | held to 9.20 |
| 2 | sub | Verified — not searched. | 8.75 → 9.05 | 9.05 → 9.20, cut at ~35 % |
| 3 | main | Now solve without a supplied answer. | 9.45 → 10.00 | 12.40 → 12.90 |
| 3 | world | dim = not yet tested (under the leaves) | 12.90 → 13.40 | 14.70 → 15.20 |
| 3 | sub | One approach: test candidates. | 12.95 → 13.40 | 14.80 → 15.20 |
| 3 | tag | 000 — candidate rejected (Rule 1 fails) | 13.60 → 13.85 | 14.00 → 14.15 |
| 3 | tag | 001 — all rules pass. Stop. | 14.40 → 14.65 | 15.00 → 15.20 |
| 4 | HUD | CHECKER — still the same mechanism / illustrative input: n = … vars, m = … clauses / one full check ≤ 3m = … literal reads | 15.40 → 16.40 | 21.90 → 22.40 |
| 4 | main | Each extra binary choice doubles the possibilities. | 16.50 → 17.10 | 21.40 → 22.00 |
| 5 | main | But must we search them? | 22.60 → 23.10 | 24.80 → 25.30 |
| 5 | world | Another algorithm? (on the dashed, empty route) | 23.00 → 24.00 | 24.90 → 25.40 |
| 5 | sub | Brute force is only one method. | 23.30 → 23.80 | 24.80 → 25.30 |
| 6 | final | Checking a supplied answer / fast / Solving without one / unknown | 25.60 → 26.30 | dims 35 % under the big card |
| 6 | final | Does efficient checking always imply efficient solving? | 26.30 → 27.10 | 27.40 → 28.20 |
| 6 | final | P = NP? (700 weight, 150 px) | 27.40 → 28.20 | held to 30.00 |
| 6 | final | Still an open question. (500 weight, 38 px) | 28.50 → 29.20 | held to 30.00 |

### Numbers on screen during beat 4

The scale bar and HUD step through a checkpoint list. A narrator reading over this beat should
know what is visible when — the values are exact, computed with `BigInt`.

| From | n | Possible assignments (2^n) | HUD: m = 4n | HUD: one full check ≤ 3m |
| --- | --- | --- | --- | --- |
| 15.40 | 3 | 8 | 12 | 36 |
| 16.30 | 4 | 16 | 16 | 48 |
| 17.60 | 10 | 1,024 | 40 | 120 |
| 19.00 | 20 | 1,048,576 | 80 | 240 |
| 20.40 | 50 | 1,125,899,906,842,624 | 200 | 600 |

The HUD's `m = 4n` is an illustrative clause count for a hypothetical larger input, not the
film's own formula, which has n = 3 and m = 3. See `MATH_NOTES.md`.

## If audio is added later

The renderer produces video only, so a soundtrack would be a second ffmpeg pass muxing an audio
file against the finished MP4 rather than a change to `render-mp4.mjs`. Any mix should keep the
film legible with the sound off: the captions are the primary channel and the narration is the
secondary one, not the other way round.
