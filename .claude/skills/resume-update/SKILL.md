---
name: resume-update
description: Add or update entries in the resume site's Projects, Experience, and Skills sections. Gathers details from a project directory and/or a grilling interview, then edits the section components. Use when the user wants to add a new project, job, internship, or skill to the resume site, or says "add this project", "update my experience", "new skill", or gives a path to a project to feature.
---

# Resume Update

Turn a project directory or a few loose details into polished entries in
`components/sections/Projects.tsx`, `Experience.tsx`, and `Skills.tsx`.

Data schemas, placement rules, and writing style live in [REFERENCE.md](REFERENCE.md).
Read it before drafting any entry.

## Workflow

### 1. Harvest (if a directory was given)

Before asking the user anything, extract everything you can yourself:

- `README.md`, `package.json` / `pom.xml` / `pyproject.toml` / `requirements.txt` — purpose + tech stack
- `git log --oneline -30` — scope of work and timeline
- Source tree — architecture (layers, DB schema/migrations, auth, tests, CI, deploy configs)
- `.env.example`, Dockerfiles, workflow files — infra and deployment story

Draft a provisional entry from this. Never ask the user for something the repo already answers.

### 2. Grill

Invoke the **grill-me** skill (fall back to `AskUserQuestion` rounds if unavailable)
to close every gap. Keep interviewing until every schema field is resolved. Must-resolve list:

- **Target section(s)** — project, experience, or both (an internship project is often both)
- **Story**: what problem it solves, for whom, what's technically interesting about it
- **Claims with substance** — challenge vague answers. "Used PostgreSQL" → what schema
  decisions, constraints, indexing, migrations? "Added auth" → which flow, token strategy,
  hashing, RBAC? The existing bullets are specific and deep; new ones must match that bar.
- **Status + links**: live / wip, live URL, GitHub URL (public?)
- **Images**: real screenshots (place in `public/`) or pick topical Unsplash placeholders
- **Skills delta**: which techs are new to the site vs. already listed; self-rated
  proficiency 0–100 for each new one (calibrate against existing entries)
- For experience: exact dates, role title, company + a fitting emoji, soft-skill highlights

### 3. Draft and confirm

Show the complete entry (all fields, formatted as it will appear in code) and get
explicit approval before editing. Iterate on wording here, not after insertion.

### 4. Insert

- **Projects**: append/insert into `PROJECTS` in `Projects.tsx` per the `CarouselProject`
  schema. Order: strongest work first is fine to discuss with the user.
- **Experience**: insert into `JOBS` in `Experience.tsx` in chronological order (oldest first).
- **Skills**: add new techs to `SKILLS` in `Skills.tsx` following the periodic-table
  placement rules in REFERENCE.md (unique 2–3 char symbol, next `num`, free grid cell in the
  correct block). Also update proficiency of existing entries if the user's rating changed.

Match existing formatting exactly (alignment, quoting, trailing commas).

### 5. Verify

- `npx tsc --noEmit` must pass.
- Sanity-check the Skills grid: no two entries share a `row`/`col`; new cells don't
  break the table shape (see REFERENCE.md).
- Offer to run `npm run dev` so the user can eyeball the new entry; don't commit
  unless asked.
