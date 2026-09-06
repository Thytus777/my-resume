# Resume Update — Reference

Schemas below mirror the code as of July 2026. If a component's interface has drifted,
the code wins — re-read the file before inserting.

## Projects — `components/sections/Projects.tsx`

Entries live in the `PROJECTS: CarouselProject[]` array:

```ts
interface CarouselProject {
  title: string;        // short product name, e.g. 'Car Crash AI'
  desc: string;         // 60–90 word paragraph: what it is, who it's for, why it's interesting
  bullets: string[];    // 5–7 resume bullets (see writing style)
  tech: string[];       // 6–8 display names, e.g. 'Spring Boot 3', 'PostgreSQL'
  cover: string;        // card image — /local.png in public/ or Unsplash '...?w=600&q=80'
  gallery: string[];    // 2–3 images shown in the modal (cover usually first)
  status: 'live' | 'wip';
  statusLabel: string;  // e.g. 'Live', 'In Progress', 'Live | Demo Available'
  live?: string;        // deployed URL
  github?: string;      // repo URL (only if public)
}
```

(The exported `Project` interface at the top of the file is unused — ignore it.)

## Experience — `components/sections/Experience.tsx`

Entries live in the `JOBS: Job[]` array, ordered oldest → newest (timeline renders top-down,
cards alternate left/right by index):

```ts
interface Job {
  year: string;         // '2025' or '2021 – Present' (en dash, spaces)
  title: string;        // role, e.g. 'Full Stack Developer (Intern)'
  company: string;      // emoji + name, e.g. '💻 1Lynx Solutions'
  snippet: string;      // one-line teaser on the card, ~8–12 words
  desc: string;         // 2–3 sentence paragraph for the modal
  highlights: string[]; // 4 bullets, mix of technical and soft skills
  tags: string[];       // 4–7 short tags (skills/tools), shown on card + modal
}
```

## Skills — `components/sections/Skills.tsx`

Entries live in the `SKILLS` array; categories in `CATEGORIES` (lang, frame, infra, data,
tools, db — don't add categories without discussing).

```ts
{ sym: "Sb", name: "Spring Boot", num: 15, pro: 82, cat: "frame", row: 2, col: 5 }
```

- `sym`: 2–3 chars, periodic-element style (first letter capitalized), unique
- `name`: ≤ ~13 chars or it overflows the tile (abbreviate: 'Spring Sec.', 'Testcontainer')
- `num`: next integer after current max (drives the stagger animation)
- `pro`: 0–100; labels: ≥90 Expert, ≥75 Advanced, ≥60 Proficient, else Familiar.
  Calibrate against neighbors — don't hand a brand-new tech 85.

### Grid placement (periodic-table layout)

| Block | Columns | Content |
|-------|---------|---------|
| s-block (left) | 1–2 | Languages |
| d-block (centre) | 3–8 | Frameworks (rows 1–2), frameworks+infra (row 3), db+data/AI (row 4), data/AI overflow (row 5) |
| p-block (right) | 9–10 | Tools & testing |

Rules:
- Every (`row`, `col`) pair must be unique — grep the array before picking a cell.
- Fill the first free cell within the correct block, left-to-right, extending to a new
  row at the bottom of the block if full. Keep the block silhouettes solid (no holes
  mid-row); shuffle neighboring cells if needed to stay contiguous.
- New category → new color pair in `CATEGORIES`; stay within the orange family
  (site accent) and discuss with the user first.

## Writing style for bullets

Match the existing entries — they are the bar:

- Past-tense action verb first: Built / Implemented / Designed / Integrated / Deployed / Configured
- One concrete engineering decision per bullet, with the *why* or *how* baked in
  ("GiST exclusion constraints to prevent overlapping booking times directly at the
  database level"), not task lists ("worked on the backend")
- Name exact technologies inline; numbers when real (collections count, endpoints, users)
- No first person, no filler ("successfully", "various", "etc.")
- Bullet length ~15–30 words; desc paragraphs are written for a non-technical recruiter,
  bullets for a technical reviewer

## Interview question bank (for the grill)

Use these to push past vague answers:

- What breaks if this project disappears — who actually uses it?
- What was the hardest bug or design decision? What did you reject and why?
- Where is the data model non-trivial (constraints, migrations, indexing, concurrency)?
- How is auth actually implemented (token type, storage, rotation, hashing, RBAC)?
- What's tested, with what, and what gave you confidence to ship?
- How is it deployed, and what secrets/config management does it use?
- Which of these techs would you defend in an interview vs. only touched?
  (drives `pro` scores and whether a tech belongs in `tech`/`tags` at all)
