# MITF Video — Science Notes

The scientific record for *Targeting MITF to Reduce Pigmentation* (Hamiltonian Labs,
12 shots × 5 s, 9:16). This document states what the reel claims, what it deliberately does
not claim, and where the structural content came from.

---

## 1. The canonical pathway as depicted

Shots 1–7 depict the established melanogenesis pathway in this order:

```
  α-MSH  (keratinocyte-derived)
     │
     ▼
  MC1R  (melanocyte plasma membrane, GPCR)
     │
     ▼
  cAMP  (second messenger)
     │
     ▼
  PKA
     │
     ▼
  phosphorylated CREB  (pCREB)
     │
     ▼
  increased MITF transcription  ──►  MITF bHLH-LZ dimer
     │
     ▼
  TYR / TYRP1 / DCT  (pigment gene expression, via the M-box)
     │
     ▼
  melanin  (synthesised inside melanosomes)
     │
     ▼
  melanosome transfer to keratinocytes  ──►  visible epidermal pigmentation
```

| Step | Shot | On-screen footer |
| --- | --- | --- |
| Melanocyte in epidermal context | 1 | Melanocytes make and distribute pigment through the epidermis. |
| α-MSH → MC1R | 2 | Keratinocyte-derived α-MSH switches on melanocyte MC1R. |
| cAMP → PKA → pCREB | 3 | cAMP activates PKA, which phosphorylates CREB. |
| pCREB → MITF programme | 4 | CREB signalling increases the melanogenic MITF programme. |
| MITF → TYR / TYRP1 / DCT | 5 | MITF increases TYR, TYRP1 and DCT expression. |
| Melanin synthesis | 6 | Tyrosinase initiates pigment synthesis inside melanosomes. |
| Melanosome transfer | 7 | Transferred melanosomes create visible epidermal pigmentation. |

Detail worth recording:

- **α-MSH is drawn as a peptide, not a blob.** `AlphaMSH` renders a six-residue bead chain,
  because α-MSH is a tridecapeptide and the shape carries that.
- **MC1R is drawn as a seven-transmembrane receptor**, with extracellular and intracellular
  loops, spanning a bilayer that is itself drawn as head groups and tails.
- **The biosynthetic sequence in shot 6 is explicit**: Tyrosine → DOPA → DOPAquinone →
  Melanin, with tyrosinase drawn as a membrane-anchored enzyme straddling the melanosome
  membrane rather than floating free in the lumen.
- **Transfer in shot 7 is directional and dendritic**: carriers travel melanocyte body →
  dendrite midpoint → dendrite tip → keratinocyte, along Bézier routes built from the
  melanocyte's actual drawn dendrite geometry, and keratinocytes accumulate supranuclear
  pigment caps as the shot progresses.

### CRTC3 as a secondary coactivator

CRTC3 appears in shot 4 only, and is deliberately subordinate:

- it is instantiated with `opacity: 0` and only reaches 0.9 on `ramp(t, .26, .42)`, i.e.
  **after** pCREB has already docked at the MITF regulatory region;
- it is a 34 px disc against pCREB's 62 px body;
- it is labelled at 17 px in `--crtc3`, a step warmer and dimmer than CREB's gold, and it
  carries no leader line;
- the code comment marks it "deliberately secondary".

The intended reading is: CREB is the driver at the MITF promoter; CRTC3 is a coactivator
present at the same event, not an independent arm of the pathway.

---

## 2. Corrections made

Three specific scientific errors were designed out. They are recorded here because the
current frames are the corrected version, and any future edit must not reintroduce them.

### 2.1 CREB is not shown physically activating MITF protein

**Wrong depiction (avoided):** pCREB docking onto, or transferring something to, an existing
MITF protein — implying post-translational activation of MITF by CREB.

**As built:** in shot 4 pCREB translates to and docks at the *MITF regulatory region on the
DNA* (`geneBox`, a dashed `--dna-highlight` box on the helix, labelled "MITF gene"). Only
after docking does a transcript emerge from that box (`ramp(t, .34, .70)`), and only after the
transcript does the protein appear — two subunits converge and assemble into the dimer on
`ramp(t, .60, .92)`. The causal order on screen is transcription → translation → dimer.

The title and footer reinforce it: "CREB drives the MITF programme" and "CREB signalling
increases the melanogenic MITF programme". The word is *programme*, not *protein*.

### 2.2 MITF is a dimeric bHLH-LZ, not a globular blob

**Wrong depiction (avoided):** MITF as a generic rounded protein shape.

**As built:** `MITFDimer` draws two subunits, each as two coiled-coil helices meeting at a
visible kink — a basic region running down onto the DNA, through the helix-loop-helix, up
into the leucine zipper. Two loops join the lobes (a dark `--mitf-shadow` loop at the HLH
junction, a `--mitf` loop across the zipper tips). The source comment reads: *"Deliberately
NOT a globular blob."*

The consequence matters for the rest of the film: because the zipper is drawn, the **kink
pocket between the two zipper helices** is a real place on the object, and shots 9–12 can
point at it. In shot 5 the dimer's basic regions descend onto the M-box, which is the correct
DNA-binding mode for a bHLH-LZ factor.

### 2.3 The candidate molecule is always separate from MITF

**Wrong depiction (avoided):** the candidate merging into, recolouring, or replacing MITF, so
that a viewer cannot tell protein from ligand.

**As built, three separations:**

1. **Colour.** `--candidate-molecule` is `#FFFFFF`, reserved. MITF is brown (`--mitf`,
   `--mitf-highlight`, `--mitf-shadow`). No shared value anywhere in the palette.
2. **Form.** The candidate is always rendered as discrete ball-and-stick atoms with CPK
   colouring and visible bonds. MITF is always rendered as continuous helical ribbon or tube.
   Even at `scale(0.34)` in shot 8 the two remain different classes of object.
3. **Label.** The two are labelled separately in every shot where both appear —
   shot 8: "Candidate molecule" and "MITF target"; shot 9: "MITF dimer" and "Proposed binder".
   The candidate is never labelled as part of MITF, and MITF is never labelled as inhibited.

---

## 3. Structural provenance

### 3.1 The deposit

| Field | Value |
| --- | --- |
| PDB ID | **9H7Q** |
| Title | *MITF in complex with 5-chloro-3-phenyl-1H-indole-2-carboxylic acid* |
| Method | **X-ray diffraction** |
| Resolution | 1.72 Å |
| R-work / R-free | 0.2145 / 0.2456 |
| Space group | P 4₁ 2₁ 2 |
| Polymer entity | Isoform M1 of Microphthalmia-associated transcription factor (bHLHe32), 3 copies in the asymmetric unit |
| Ligand entity | `A1IS6` — 5-chloranyl-3-phenyl-1H-indole-2-carboxylic acid, C₁₅H₁₀ClNO₂, 271.698 Da, 1 copy |
| Other heteroatoms | 2 sulfate ions, 63 waters (not rendered) |
| Deposited / released | 2024-10-28 / 2025-11-05 (PDBe) |
| Authors | Renatus, M.; Wirth, E.; Gutmann, S. |

Local copy of the deposit: `9h7q.cif`. Extract used by the app: `mitf-9h7q-extract.json`.

### 3.2 What shot 9 actually renders

- **Chains A and B** of the bHLH-LZ dimer — the two chains that jointly form the ligand
  pocket. Chain A contributes 78 Cα rows (residues 219–293), chain B contributes 79
  (residues 216–293): **157 Cα in total**, which is the number shown in the frame note
  ("Chains A + B · 157 Cα · deposited ligand") and in the topbar tag.
- **The deposited ligand**, all **19 atoms** (15 C, 1 N, 2 O, 1 Cl) with its **21 bonds**,
  CPK-coloured.
- Nothing else. Chain C, the sulfates and the waters are not rendered.

**Coordinate handling.** The embedded array `MITF9H7Q` is the extract's chain A, chain B and
ligand coordinates translated by a single rigid offset of `(−14.48, −7.16, −11.16) Å`, applied
identically to every atom in every chain — a recentring on the origin, with no rotation, no
scaling and no idealisation. Verified atom-by-atom against `mitf-9h7q-extract.json`. The
geometry on screen is the deposited geometry.

**Rendering.** A custom in-file canvas projector, `Mol3D`: orthographic rotation about the
vertical axis, a fixed −0.28 rad tilt, a perspective divide of `620 / (620 + z × 1.5)`, and
per-primitive depth sorting of every backbone tube, surface blob, ligand bond and ligand atom
before painting. Backbone segments belonging to a pocket-contact residue are drawn thicker and
in `--mitf-highlight`; the rest are `--mitf`. An amber radial halo is placed at the projected
centroid of the contact residues.

**No molecular-visualisation software was used.** PyMOL, ChimeraX, Mol* and NGL are not
installed in this environment, and the page's CSP blocks external CDNs, so no viewer library
could be loaded even if one were wanted. The projector, the depth sort and the CPK colouring
are all written by hand in `index.html`.

### 3.3 Pocket contact residues

Computed at a **< 4.5 Å** cutoff from any ligand atom. Distances are the minimum
ligand-atom-to-residue distances recorded in `mitf-9h7q-extract.json`.

| Chain | Residue | Distance (Å) | Surfaced as an on-screen callout |
| --- | --- | --- | --- |
| A | LEU 257 | 3.47 | |
| A | GLU 260 | 2.92 | **E260** |
| A | GLN 261 | 3.40 | **Q261** |
| A | ARG 263 | 3.72 | |
| A | ALA 264 | 3.49 | |
| A | LEU 267 | 4.39 | |
| B | LEU 257 | 3.84 | |
| B | GLU 260 | 3.53 | **E260** |
| B | GLN 261 | 2.81 | **Q261** |
| B | ALA 264 | 3.57 | |
| B | LYS 265 | 3.97 | **K265** |
| B | GLU 268 | 3.07 | |

Twelve contacts, six from each chain, spanning residues 257–268 in both. **The ligand sits at
the A/B dimer interface** — it is not a single-chain pocket, and the pocket only exists
because the two zipper helices are packed against one another. This is why the film calls the
site the "kink pocket" and why the mechanism it suggests is one of altered leucine-zipper
dynamics rather than direct occlusion of the DNA-binding basic region.

The three residues surfaced as amber callouts in shot 9 — **E260, Q261, K265** — are all
confirmed real contacts from this list, not illustrative choices. E260 and Q261 contact from
both chains; K265 contacts from chain B. The shortest contacts in the whole set are B:GLN261
at 2.81 Å and A:GLU260 at 2.92 Å.

### 3.4 What is real and what is illustrative

> **Shot 9 renders real deposited coordinates from PDB 9H7Q. All other eleven shots are
> illustrative scientific illustration built from reusable SVG components, and depict
> relationships and sequence rather than structural data.**

Concretely:

- **Real (shot 9):** every backbone position, the ligand geometry, the contact-residue set,
  the pocket location and the interface placement.
- **Illustrative (shots 1–8, 10–12):** cell shapes, membrane geometry, receptor topology,
  DNA geometry, MITF ribbon geometry, melanosome and granule layouts, gene tracks, arrows,
  and all spatial arrangements.
- **One nuance to declare:** the white ball-and-stick candidate that appears in shots 8, 10,
  11 and 12 is *not* a cartoon. `Molecule({kind: "candidate"})` projects the same deposited
  19-atom ligand — its y–z plane, scaled to 132 units wide — with the same 21 bonds. So the
  molecule's shape is real everywhere it appears; only its surroundings are illustrative.
- **The Thiamidol scaffold in shot 11 is not a real structure.** It is a deliberately
  distinct comparator scaffold drawn by hand (a resorcinol-like ring, a linker and a
  heterocycle) in `--thiamidol` light blue. It is there to be visually unmistakable from the
  candidate, not to be a structural depiction of Thiamidol. Do not present it as one.

---

## 4. Claims discipline

### 4.1 Permitted wording

These are the exact phrasings the reel is allowed to use, and does use:

| Permitted | Where it appears |
| --- | --- |
| **"proposed binder"** | Shot 9 label. |
| **"predicted modulation"** | Shot 10 label ("Predicted MITF modulation"). |
| **"computational hypothesis"** | Shot 8 subtitle and the shots 8–10 certainty badge. |
| **"wet-lab validation required"** | Shot 12 certainty badge ("Wet-lab question") and subtitle ("Computational prioritisation → wet-lab validation"). |

Supporting phrasings in the same register, all present in the frames: "proposed to bind MITF
directly", "Proposed binding at the MITF kink pocket", "Proposed cellular entry", "Predicted
binding **may** alter MITF leucine-zipper dynamics", "The testable prediction", "Prediction:
less pigment gene output without killing the cell", "**If** MITF activity falls, pigment gene
expression **should** decrease", "Hypothesis, not proof of efficacy", and the closing
question, "Can a proposed MITF kink-pocket binder reduce melanin without harming
melanocytes?"

The grammatical rule: **hypothesis content is always conditional, modal or interrogative.**
"If … should", "may", "proposed", "predicted", "can … ?" Never the indicative.

### 4.2 Forbidden wording

None of these appear in the reel, and none may be added:

| Forbidden | Why |
| --- | --- |
| "proven MITF inhibitor" | Nothing has been proven; no inhibition assay exists here. |
| "blocks DNA" | The ligand binds at the zipper interface, not the DNA-binding basic region. The structure does not show DNA occlusion. |
| "stops MITF" | The depicted and predicted effect is partial modulation, not cessation. |
| "validated drug" | This is a computationally prioritised hypothesis. It is not a drug and it is not validated. |
| "guaranteed pigmentation reduction" | No efficacy has been measured; the endpoint is a prediction. |
| **Any claim that binding is proven to inhibit transcription** | Occupancy of a pocket in a crystal structure is not evidence of a functional transcriptional consequence. The link from binding → altered MITF activity → reduced pigment gene output is exactly the untested step, and is drawn in shot 12 as the amber dashed question mark hanging off the MITF → TYR/TYRP1/DCT arrow. |

That last point is the crux of the whole reel. What the crystal structure establishes is that
a small molecule occupies a pocket at the MITF dimer interface. What it does **not**
establish is that occupying that pocket changes MITF's transcriptional output. Shot 12
exists to name that gap: the causal chain MITF → TYR/TYRP1/DCT → melanin is drawn, and the
unresolved step is marked with a dashed `--warning` question mark, followed by the validation
sequence Docking → Cell assay → Viability → Mechanism.

### 4.3 The endpoint: partial suppression, viable cell

**The depicted endpoint is partial pathway suppression with the melanocyte remaining viable.
Cell death is never depicted, implied, or offered as a mechanism.**

This is enforced numerically in the animation, not merely stated:

| Quantity | Start | End | Shot |
| --- | --- | --- | --- |
| Gene track level (TYR / TYRP1 / DCT) | 1.00 | **0.45** | 10 |
| Gene track level, MITF panel | 1.00 | **0.38** | 11 (left) |
| Melanosome A fill | 0.85 | **0.38** | 10 |
| Melanosome B fill | 0.75 | **0.30** | 10 |
| Melanosome fill, MITF panel | 0.80 | **0.34** | 11 (left) |

Every one of these floors is well above zero, and the code comment at shot 10 states the
intent directly: *"1.0 → ~0.45: partial modulation, explicitly not a shutdown."* Melanosomes
still contain pigment at the end of shot 10. The gene tracks still transcribe.

Alongside that, the frame carries three positive viability signals:

- the nucleus is labelled **"Nucleus intact"** and drawn unbroken;
- a cyan pill in `--established-border` with a tick reads **"Cell remains viable"**, fading in
  on `ramp(t, .45, .70)`;
- the shot's own subtitle is **"Partial modulation, viable cell"**, and its label list
  includes "Cell remains viable".

The comparison in shot 11 closes the argument at the level of framing rather than efficacy:
"Different intervention levels; the same phenotypic endpoint." The proposed MITF route acts
upstream in the nucleus (fewer enzymes made); Thiamidol acts downstream in the melanosome
(enzyme blocked directly). The reel claims a difference in *level of intervention*, not a
difference in potency, safety or superiority.
