# How we work

Sources: "group project setup", "Working with Git and GitHub", "Task checklist", "Code review".

## Getting started after cloning

```bash
git clone <repo url>
cd product_catalog
git checkout develop
npm install
npm run dev
```

- `git checkout develop`: work from the `develop` branch, not from `main`.
- `npm install` installs every package from `package.json`: React, React Router, Swiper, Zustand and others. There is no need to install `react-router-dom` or other packages separately. Run it once after cloning and again after every `git pull` that changes `package.json`.
- `npm run dev` starts the site locally and opens the browser. Changes show up as soon as you save a file.
- Read `docs/TECH.md`, `docs/STRUCTURE.md` and `docs/HOW_TO_COMPONENT.md` before you start.

## Branches

- `main`: stable code, deployed from here. Direct pushes are not allowed. `main` changes only through a pull request from `develop`.
- `develop`: the shared working branch. No direct pushes, pull requests only.
- Task branch: `DEV-TP-1234_implement-home-page-slider` (Jira key plus a short English description). Created from `develop`.
- Delete the branch after it is merged.

## Working with a branch step by step

1. Starting a task:

```bash
git checkout develop
git pull origin develop
git checkout -b DEV-TP-1234_short-name
```

2. Working and committing (often, in small steps):

```bash
git add .
git commit -m "feat(DEV-TP-1234): what was done"
```

3. Before pushing:

```bash
npm run check
git pull origin develop
git push origin DEV-TP-1234_short-name
```

4. On GitHub, open a Pull Request into `develop` (not `main`). Wait for an approval and a green Lint check, merge, and delete the branch.
5. Next task: start again from step 1.

If a commit is rejected, run `npm run fix-style` and try again. If `git pull` causes a conflict, resolve it locally, run `git add .` and `git commit`, then `npm run check`. If you are unsure, ask the author of the code.

Do not: push directly to `develop` or `main`, use `--force`, `reset --hard` or `--no-verify`. One task means one branch and one pull request.

## Commits

Format: `<type>(DEV-TP-1234): <description>`.

| Type       | When                                   |
| ---------- | -------------------------------------- |
| `feat`     | new functionality                      |
| `fix`      | bug fix                                |
| `refactor` | code change without changing behaviour |
| `style`    | styles, formatting                     |
| `docs`     | documentation                          |
| `chore`    | dependencies, configs                  |

Example: `feat(DEV-TP-1234): add slider to home page`.

## Pull requests

- Title like a commit: `feat(DEV-TP-1234): implement home page slider`.
- Up to 500 changed lines. Split larger changes into several pull requests.
- Fill in the template: what was done, the Figma frame, screenshots at 320 / 640 / 1200 / 1440.
- There are no comments in the code. Explain non-obvious decisions in the pull request description.
- Merge after 1 approval and a green "Lint" check.

## Code review

- Suggest a solution, do not just point out a problem.
- If something is unclear, ask the author.
- Keep a friendly tone.
- Changes to shared code (`atoms/`, `styles/`, `types/`, `constants/`) need extra care: check that they do not break existing components.

## Dependencies

New npm packages are added in a dedicated pull request, so that `package-lock.json` does not conflict between branches.

## Roadmap

Priorities and the schedule are in `docs/PLAN.md`.
