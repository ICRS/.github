# MITF Video — Shot List

Production shot list for *Targeting MITF to Reduce Pigmentation* — Hamiltonian Labs.
12 shots × 5 s = 60 s, 9:16, 1080 × 1920.

All titles, subtitles, footers, motion notes, voiceover lines and labels below are taken
verbatim from the `SHOTS` array in `index.html`. Scene descriptions are written from the
corresponding `SCENES` builder. Coordinates are export pixels in the 1080 × 1920 frame.

---

## Summary

| Shot | Timecode | Title | Certainty |
| --- | --- | --- | --- |
| 01 | 00:00–00:05 | Pigmentation begins in the melanocyte | Established biology |
| 02 | 00:05–00:10 | α-MSH activates MC1R | Established biology |
| 03 | 00:10–00:15 | The signal moves to the nucleus | Established biology |
| 04 | 00:15–00:20 | CREB drives the MITF programme | Established biology |
| 05 | 00:20–00:25 | MITF activates pigment genes | Established biology |
| 06 | 00:25–00:30 | Melanin is made inside melanosomes | Established biology |
| 07 | 00:30–00:35 | Melanosomes move into keratinocytes | Established biology |
| 08 | 00:35–00:40 | The Hamiltonian candidate | Computational hypothesis |
| 09 | 00:40–00:45 | Proposed binding at the MITF kink pocket | Computational hypothesis |
| 10 | 00:45–00:50 | The testable prediction | Computational hypothesis |
| 11 | 00:50–00:55 | Two different intervention levels | Two intervention levels |
| 12 | 00:55–01:00 | The experimental question | Wet-lab question |

Certainty borders: shots 1–7 solid cyan; 8–10 dashed amber; 11 long-dash brown-gold;
12 dashed warning-amber.

---

## Shot 01 — Pigmentation begins in the melanocyte

| | |
| --- | --- |
| **Timecode** | 00:00–00:05 |
| **Subtitle** | Skin context |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `skin` / `epidermis` |

**Scene.** Five stratified epidermal bands fill the scene band, each with a sine-displaced
boundary and a faint upper rule, lightest at the surface (`#16405C`) and darkest at depth
(`#071D2C`). A dashed basal lamina runs across at y = 1456. Nine cool-blue keratinocytes sit
in a fixed layout across the upper two thirds. A single warm brown melanocyte, r = 132 with
six dendrites fanned upward over 1.35 π, sits at frame centre just above the basal lamina at
(540, 1342), haloed and pushing its dendrites up between the keratinocytes.

**Camera / motion.** *Slow camera push toward the basal layer; melanocyte pulses warm.*
The whole scene group scales `1 + t × 0.07` about (540, 916) — the only true camera move in
the film. The melanocyte halo breathes between 10% and 24%; each keratinocyte drifts a few
pixels on its own phase. Label anchors are rescaled by the push so leaders stay attached.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| Melanocyte | `--melanocyte-highlight` | right | 1180 |
| Keratinocytes | `--keratinocyte-highlight` | left | 560 |
| Epidermis | `--keratinocyte` | right | 380 |

**Footer.** Melanocytes make and distribute pigment through the epidermis.

**Voiceover.** "Skin pigmentation begins inside melanocytes."

---

## Shot 02 — α-MSH activates MC1R

| | |
| --- | --- |
| **Timecode** | 00:05–00:10 |
| **Subtitle** | Ligand binding at the cell surface |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `membrane` / `receptor` |

**Scene.** A source keratinocyte sits top-left at (250, 430), r = 128, with its own 17 px
caption "Keratinocyte". A phospholipid bilayer — drawn as two leaflet rails with head groups
and angled tails — arcs across the frame at y = 1010 with a −46 px crown; everything below it
is tinted with melanocyte cytoplasm. MC1R stands in the membrane at (580, 1010), seven tilted
transmembrane helices with two extracellular and one intracellular loop. The six-bead cyan
α-MSH peptide approaches from the upper left.

**Camera / motion.** *Peptide travels from a keratinocyte and docks; receptor brightens and
pulses inward.* The peptide interpolates from (360, 560) to (580, 892) on `ramp(t, .04, .52)`,
rotating from −18° to level. On `ramp(t, .48, .62)` every MC1R helix swaps from `--mc1r` to
`--mc1r-active` and the receptor halo rises. A `--camp-signal` ring then expands from 12 px to
222 px while fading, reading as the signal entering the cell. The α-MSH label tracks the
peptide the whole way.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| α-MSH | `--alpha-msh` | right | 470 |
| MC1R | `--mc1r-active` | right | 900 |
| Melanocyte membrane | `--melanosome-membrane` | left | 1130 |

**Footer.** Keratinocyte-derived α-MSH switches on melanocyte MC1R.

**Voiceover.** "When α-MSH binds MC1R, the pigmentation pathway switches on."

---

## Shot 03 — The signal moves to the nucleus

| | |
| --- | --- |
| **Timecode** | 00:10–00:15 |
| **Subtitle** | Signal transduction cascade |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `cytoplasm` / `cascade` |

**Scene.** The membrane has moved to the top of the scene band (y = 410) with an
already-activated MC1R in it, and the frame becomes a vertical cascade spine down the centre:
26 cyan cAMP dots below the receptor with a "cAMP" caption at y = 562; an activation arrow to
a gold PKA body at y = 930; a second arrow to a gold CREB ellipse at y = 1190 carrying a
phosphate disc marked "P"; a third arrow down into a large nucleus ellipse at (540, 1532),
rx 400 / ry 250, captioned "Nucleus".

**Camera / motion.** *cAMP multiplies below the receptor; PKA lights gold; pCREB carries the
signal inward.* Camera is locked. cAMP dots spawn progressively over `ramp(t, 0, .5)` and
swirl downward on individual phases, each fading in and out across its run. The PKA halo
lifts on `ramp(t, .34, .5)`, the CREB halo and its phosphate on `ramp(t, .56, .72)`, and the
final arrow into the nucleus on `ramp(t, .74, .92)` — so the cascade reads strictly in order.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| cAMP | `--camp-signal` | right | 640 |
| PKA | `--pka` | left | 900 |
| pCREB | `--creb` | right | 1150 |

**Footer.** cAMP activates PKA, which phosphorylates CREB.

**Voiceover.** "This activates intracellular cAMP signalling."

---

## Shot 04 — CREB drives the MITF programme

| | |
| --- | --- |
| **Timecode** | 00:15–00:20 |
| **Subtitle** | Nuclear events |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `nucleus` / `transcription` |

**Scene.** We are inside the nucleus: a large rounded rectangle in nuclear blue with a dashed
inner rule and a "Nucleus" caption. A double helix runs across at y = 860 from x = 130 to
x = 950. A dashed violet box on the helix at (300, 790), 210 × 140, is captioned "MITF gene".
pCREB — a gold disc with a phosphate marker — approaches from the upper left. A smaller,
dimmer CRTC3 disc appears beside it. Below and right, an emerging MITF transcript, then two
brown subunits that converge into a full bHLH-LZ dimer at (700, 1310).

**Camera / motion.** *pCREB docks at the MITF regulatory region; a transcript emerges; two
subunits form the dimer.* pCREB translates from (300, 560) to (405, 726) on `ramp(t, .05, .30)`
and the gene box brightens as it lands. CRTC3 fades in behind it on `ramp(t, .26, .42)` —
deliberately after, and deliberately secondary. The transcript grows as a lengthening sine
polyline on `ramp(t, .34, .70)`. On `ramp(t, .60, .92)` the two subunits slide together from
x = 560 and x = 840; when the ramp completes they are replaced by the assembled dimer, whose
halo then breathes. The order on screen is transcription → translation → dimer.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| pCREB | `--creb` | left | 620 |
| MITF gene | `--dna-highlight` | right | 860 |
| MITF dimer | `--mitf-highlight` | right | 1290 |

**Footer.** CREB signalling increases the melanogenic MITF programme.

**Voiceover.** "The signal reaches the nucleus and increases MITF, a master regulator of
melanogenesis."

---

## Shot 05 — MITF activates pigment genes

| | |
| --- | --- |
| **Timecode** | 00:20–00:25 |
| **Subtitle** | One factor, three targets |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `nucleus` / `genes` |

**Scene.** Still in the nucleus. A double helix runs at y = 620; a dashed 130 × 130 box on it
at (372, 556) is captioned "M-box". The MITF dimer sits above the M-box at (437, 470), basic
regions pointing down at the DNA. Below, three gene tracks stack at y = 1010, 1190 and 1370 —
**TYR**, **TYRP1**, **DCT** — each a labelled box with a transcribed RNA wave running 470 px to
the right. An orange spine drops from the dimer, turns left to x = 190 and feeds all three
tracks through arrowheads.

**Camera / motion.** *MITF binds the M-box; the three gene tracks illuminate and transcribe in
sequence.* The dimer descends 162 px onto the M-box on `ramp(t, .02, .22)`, brightening the
binding box as it lands. The connecting spine fades up on `ramp(t, .2, .4)`. The three tracks
switch on staggered — `ramp(t, .26 + i × .12, .46 + i × .12)` — so TYR leads, TYRP1 follows,
DCT last. Each wave's amplitude grows from 5 px to 35 px and a head bead runs along it.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| MITF dimer | `--mitf-highlight` | left | 560 |
| Pigment genes | `--tyr` | right | 1010 |

**Footer.** MITF increases TYR, TYRP1 and DCT expression.

**Voiceover.** "MITF activates genes like TYR, TYRP1 and DCT."

---

## Shot 06 — Melanin is made inside melanosomes

| | |
| --- | --- |
| **Timecode** | 00:25–00:30 |
| **Subtitle** | Enzymatic pigment synthesis |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `melanosome` / `melanin` |

**Scene.** One large melanosome dominates the left of the frame at (470, 940), rx 330 / ry 396,
double membrane ring, 30 seeded granules. Tyrosinase straddles the membrane at the organelle's
left pole — an orange enzyme body with a shadowed active site and a transmembrane anchor
rectangle dropping into the bilayer, captioned "Tyrosinase". To the right, the biosynthetic
sequence runs down in four boxes at y = 700, 866, 1032 and 1198: **Tyrosine → DOPA →
DOPAquinone → Melanin**, joined by orange arrows, with the final box outlined and lettered in
melanin brown rather than orange.

**Camera / motion.** *Membrane-bound tyrosinase pulses; substrate converts stepwise; granules
accumulate and darken.* The tyrosinase halo and a catalytic ring at its active site pulse on a
fast 7 rad/s cycle, the ring expanding from 22 px to 42 px each beat. Each reaction node
brightens in turn on `ramp(t, .1 + i × .18, .3 + i × .18)`. Across the shot the melanosome's
`setFill` runs `ramp(t, .12, .95)`, filling the lumen and revealing granules in order — pigment
load as a single rising value.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| Tyrosinase | `--tyr` | left | 700 |
| Melanosome | `--melanosome-membrane` | left | 470 |
| Melanin | `--melanin-highlight` | right | 1330 |

**Footer.** Tyrosinase initiates pigment synthesis inside melanosomes.

**Voiceover.** "These genes drive melanin production inside melanosomes."

---

## Shot 07 — Melanosomes move into keratinocytes

| | |
| --- | --- |
| **Timecode** | 00:30–00:35 |
| **Subtitle** | Pigment distribution |
| **Certainty** | Established biology (solid cyan border) |
| **Phase / scene** | `tissue` / `transfer` |

**Scene.** A melanocyte sits low-left at (250, 1240), r = 118, with three dendrites reaching up
and right. Three keratinocytes receive from it: (700, 560) r = 138, (880, 880) r = 128 and
(660, 1140) r = 132. Three visible brown hand-off paths arc from each dendrite tip to its
keratinocyte. Nine dark melanosome carriers travel the routes.

**Camera / motion.** *Granules travel directionally along dendrites; keratinocytes build
supranuclear pigment caps.* Each carrier runs a two-stage Bézier — cell body → dendrite
midpoint → tip for the first 55% of its cycle, then tip → keratinocyte for the rest — built
from the melanocyte's own drawn dendrite geometry, so transport follows real arms rather than
abstract lines. Carriers rotate to face their direction of travel and blink out at the end of
each cycle. Keratinocyte pigment caps and cap dots fade in across `ramp(t, .25, 1)`, so the
tissue visibly darkens over the five seconds. The "Melanosome transfer" label rides the fifth
carrier.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| Melanocyte dendrite | `--melanocyte-highlight` | left | 620 |
| Melanosome transfer | `--melanin-highlight` | right | 900 |
| Keratinocyte | `--keratinocyte-highlight` | right | 1230 |

**Footer.** Transferred melanosomes create visible epidermal pigmentation.

**Voiceover.** "Melanosomes are transferred to keratinocytes, producing visible skin
pigmentation."

---

## Shot 08 — The Hamiltonian candidate

| | |
| --- | --- |
| **Timecode** | 00:35–00:40 |
| **Subtitle** | Computational hypothesis |
| **Certainty** | Computational hypothesis (dashed amber border) |
| **Phase / scene** | `hypothesis` / `entry` |

**Scene.** The certainty system flips here: dashed amber border, amber badge. An intact
melanocyte silhouette fills the frame — ellipse at (540, 1080), rx 400 / ry 440, captioned
"Melanocyte" — containing a nucleus at (540, 1230), rx 208 / ry 190, captioned "Nucleus", with
a small MITF dimer inside it at 34% scale. An amber dashed cubic route runs from (830, 400)
down and left through the membrane to the nucleus, ending in an arrowhead. The white
ball-and-stick candidate travels that route; a dashed 34 px circle marks the membrane-crossing
point at 58% of the path length.

**Camera / motion.** *Candidate travels an amber dashed path across the membrane toward the
nucleus.* The molecule is positioned by arc length along the path on `ramp(t, .05, .88)`,
rotating up to 90° as it goes, its amber halo pulsing between 16% and 32%. The route's dash
offset scrolls at −60 units per second, giving the path direction of flow. Its label tracks it.
Nothing in this shot asserts binding — the molecule has not arrived by the end of the shot.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| Candidate molecule | `--candidate-molecule` | right | 470 |
| Proposed cellular entry | `--hypothesis-border` | left | 820 |
| MITF target | `--mitf-highlight` | right | 1240 |

**Footer.** Activity requires cell entry, nuclear access and target engagement.

**Voiceover.** "Our strategy is a small molecule proposed to bind MITF directly."

---

## Shot 09 — Proposed binding at the MITF kink pocket

| | |
| --- | --- |
| **Timecode** | 00:40–00:45 |
| **Subtitle** | PDB 9H7Q · deposited coordinates |
| **Certainty** | Computational hypothesis (dashed amber border) |
| **Phase / scene** | `molecular` / `hero` |

**Scene.** The hero shot, and the only shot rendered from real structural data. The canvas
underlay carries a live 3D render of **PDB 9H7Q** — chains A and B of the MITF bHLH-LZ dimer,
**157 Cα**, drawn as depth-sorted interpolated backbone tubes with a soft surface impression,
plus the deposited **19-atom ligand** (5-chloro-3-phenyl-1H-indole-2-carboxylic acid, component
`A1IS6`) in CPK ball-and-stick. Backbone segments belonging to the twelve real contact residues
are drawn thicker and in `--mitf-highlight`; an amber radial halo marks the projected pocket
centroid. Over it, three amber residue callouts — **E260**, **Q261**, **K265** — and a 17 px
frame note reading "Chains A + B · 157 Cα · deposited ligand".

**Camera / motion.** *Slow orbit; the ligand slides into the pocket and settles with thermal
jitter.* The structure rotates π/2 radians across the five seconds at a fixed −0.28 rad tilt
with perspective. The ligand approaches along its real displacement vector from the pocket
centroid, closing over `ramp(t, .05, .45)`, then holds with a `sin(t × 34) × 0.22` thermal
jitter. Residue callouts orbit the pocket at r = 190 (× 0.6 vertically) and fade in on
`ramp(t, .5, .75)`. All three SVG label anchors are back-projected from the live 3D render each
frame, so the leaders stay locked to the spinning structure.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| MITF dimer | `--mitf-highlight` | left | 500 |
| Kink pocket | `--hypothesis-border` | right | 780 |
| Proposed binder | `--candidate-molecule` | right | 1320 |

**Footer.** Predicted binding may alter MITF leucine-zipper dynamics.

**Voiceover.** "The molecule is proposed to occupy the MITF kink pocket."

---

## Shot 10 — The testable prediction

| | |
| --- | --- |
| **Timecode** | 00:45–00:50 |
| **Subtitle** | Partial modulation, viable cell |
| **Certainty** | Computational hypothesis (dashed amber border) |
| **Phase / scene** | `hypothesis` / `prediction` |

**Scene.** Back inside the nucleus, captioned **"Nucleus intact"**. A helix runs at y = 700. The
MITF dimer at (470, 560) now carries the white candidate in its kink pocket. Three gene tracks
— TYR, TYRP1, DCT — stack at y = 1020, 1180 and 1340, each preceded by a downward grey-blue
suppression arrow. Two melanosomes sit right, at (830, 1150) and (950, 1370). A cyan pill with
a tick at (540, 1490) reads **"Cell remains viable"**.

**Camera / motion.** *Transcription amplitude falls to roughly half and desaturates; the cell
stays intact.* Gene level runs `lerp(1, 0.45, ramp(t, .10, .80))` — a fall to about 45%, never
to zero, with wave amplitude, wave opacity and box stroke all falling together. Melanosome fill
drops 0.85 → 0.38 and 0.75 → 0.30, so pigment reduces but remains. The pocket glow breathes
while the dimer's halo dims from 16% to 7%. The viability pill fades in on `ramp(t, .45, .70)`.

**On-screen labels.**

| Text | Colour token | Side | Slot |
| --- | --- | --- | --- |
| Predicted MITF modulation | `--mitf-highlight` | left | 560 |
| ↓ TYR / TYRP1 / DCT | `--downregulation-arrow` | right | 1000 |
| Cell remains viable | `--established-border` | right | 1410 |

**Footer.** Prediction: less pigment gene output without killing the cell.

**Voiceover.** "If MITF activity falls, pigment gene expression should decrease."

---

## Shot 11 — Two different intervention levels

| | |
| --- | --- |
| **Timecode** | 00:50–00:55 |
| **Subtitle** | Upstream MITF vs downstream Thiamidol |
| **Certainty** | Two intervention levels (long-dash brown-gold border) |
| **Phase / scene** | `comparison` / `split` |

**Scene.** A split frame. The left panel is warm — melanocyte tint, `--mitf-highlight` stroke —
headed "Proposed MITF route" / "UPSTREAM". The right panel is cool — Thiamidol tint,
`--thiamidol` stroke — headed "Thiamidol route" / "DOWNSTREAM". Two dashed rails cross both
panels and are labelled **NUCLEUS** (y = 640) and **MELANOSOME** (y = 1150): the same axis, two
different levels of intervention.

Left: a liganded MITF dimer on the nuclear rail, three small gene tracks below it, a grey-blue
suppression arrow, a melanosome at y = 1290, and the caption "Fewer enzymes made".
Right: a dimmed nucleus captioned "Transcription unchanged", a large melanosome on the
melanosome rail containing orange tyrosinase, and the light-blue Thiamidol comparator scaffold
approaching it, with the captions "Thiamidol", "Tyrosinase" and "Enzyme blocked directly".

**Camera / motion.** *Left: transcription dims in the nucleus. Right: the enzyme reaction stops
in the melanosome.* On the left, gene level runs `lerp(1, 0.38, ramp(t, .12, .8))` and the
melanosome fill 0.80 → 0.34, while the dimer's pocket glow breathes. On the right, the
Thiamidol molecule docks onto tyrosinase over `ramp(t, .18, .55)`, a red circle-and-cross
"catalysis halted" mark appears on `ramp(t, .5, .68)`, and only then does the right melanosome's
fill fall, 0.85 → 0.36. Both panels reach a reduced-pigment endpoint from opposite directions.

**On-screen labels.** None slotted — this shot has an empty `labels` array. All text is drawn
in-scene: the two panel headers and their UPSTREAM / DOWNSTREAM eyebrows, the NUCLEUS and
MELANOSOME rail labels, the three gene names, "Fewer enzymes made", "Transcription unchanged",
"Thiamidol", "Tyrosinase" and "Enzyme blocked directly".

**Footer.** Different intervention levels; the same phenotypic endpoint.

**Voiceover.** "This differs from Thiamidol, which works downstream by inhibiting tyrosinase."

---

## Shot 12 — The experimental question

| | |
| --- | --- |
| **Timecode** | 00:55–01:00 |
| **Subtitle** | Computational prioritisation → wet-lab validation |
| **Certainty** | Wet-lab question (dashed warning-amber border) |
| **Phase / scene** | `conclusion` / `question` |

**Scene.** The bound complex sits at the top of the frame — MITF dimer at (540, 560) with the
candidate in its pocket. Beneath it, the causal chain the experiment must actually test is
drawn as three boxes joined by grey-blue arrows: **MITF** → **TYR / TYRP1 / DCT** →
**Melanin**. Off to the right at (802, 900), a dashed amber disc containing a 60 px "**?**" is
tethered by a dashed curve to the top of the chain — the unresolved step. Below, four validation
chips in cyan: **Docking → Cell assay → Viability → Mechanism**. Then the closing question in
two 30 px lines, a hairline rule and the "Hamiltonian Labs" wordmark.

**Camera / motion.** *Slow orbit on the bound complex; the validation sequence resolves
beneath.* The complex rocks `sin(t × 1.4) × 4°` about its own centre while the pocket glow
breathes at 3.4 rad/s. The question mark fades in on `ramp(t, .15, .35)`; the four chips
resolve in sequence on `ramp(t, .30 + i × .07, .46 + i × .07)`; the two question lines fade in
on `ramp(t, .5 + i × .07, .68 + i × .07)`; the brand line last, on `ramp(t, .74, .92)`.

**On-screen labels.** None slotted — this shot has an empty `labels` array. In-scene text is:
the three chain boxes, the "?" glyph, the four validation chips with their "→" separators, the
two-line question "Can a proposed MITF kink-pocket binder / reduce melanin without harming
melanocytes?", and "Hamiltonian Labs".

**Footer.** Hypothesis, not proof of efficacy.

**Voiceover.** "Can a proposed MITF kink-pocket binder reduce melanin without harming
melanocytes?"

---

## Voiceover script, continuous

| In | Line |
| --- | --- |
| 00:00 | Skin pigmentation begins inside melanocytes. |
| 00:05 | When α-MSH binds MC1R, the pigmentation pathway switches on. |
| 00:10 | This activates intracellular cAMP signalling. |
| 00:15 | The signal reaches the nucleus and increases MITF, a master regulator of melanogenesis. |
| 00:20 | MITF activates genes like TYR, TYRP1 and DCT. |
| 00:25 | These genes drive melanin production inside melanosomes. |
| 00:30 | Melanosomes are transferred to keratinocytes, producing visible skin pigmentation. |
| 00:35 | Our strategy is a small molecule proposed to bind MITF directly. |
| 00:40 | The molecule is proposed to occupy the MITF kink pocket. |
| 00:45 | If MITF activity falls, pigment gene expression should decrease. |
| 00:50 | This differs from Thiamidol, which works downstream by inhibiting tyrosinase. |
| 00:55 | Can a proposed MITF kink-pocket binder reduce melanin without harming melanocytes? |
