# Roadmap

10 working days. Days 1–5: markup on mocks. Days 6–10: data, state, polish, deploy.

## Priorities for markup

**P1, visible.** Without these a page looks broken: layout at 320, 640, 1200, 1440, grids, fonts, colours, cards, main blocks.

**P2, details.** Only an attentive eye notices them: hover, active, disabled, focus, fine spacing on tablet, counters, breadcrumbs.

Rule: finish P1 by the end of day 4. P2 only after that.

## Work areas

| Area                  | Scope                                                                        |
| --------------------- | ---------------------------------------------------------------------------- |
| App shell             | repo setup, assets, Header, Footer, BurgerMenu, NotFoundPage, Loader         |
| Product card, catalog | `ProductCard` (needed by every page, so merge it first), catalog, pagination |
| Product page, cart    | gallery, variants, product details, cart items                               |
| Home page             | sliders on Swiper, categories, cart summary                                  |

The areas are independent of each other, so they can be worked on in parallel without blocking.

## Stage 1: markup on mocks

| Day | Priority | Task                                                                     |
| --- | -------- | ------------------------------------------------------------------------ |
| 1   | P1       | Repo, branch protection, Jira, 30-minute kickoff on `STRUCTURE.md`       |
| 1   | P1       | Assets: SVG icons, logo, banners, categories from Figma; donor data      |
| 1–2 | P1       | `ProductCard`, `ProductPrice`, `ProductSpecs`. Merge by the end of day 2 |
| 1–2 | P1       | `PicturesSlider` on Swiper: banner, arrows, dots                         |
| 1   | P1       | `ProductGallery`                                                         |
| 2   | P1       | `Header`: desktop, tablet, mobile bar                                    |
| 2   | P1       | `ProductVariants`, `CapacityButton`                                      |
| 2–3 | P1       | `ProductsSlider` on Swiper: title, arrows, cards                         |
| 3   | P1       | `Footer` with "Back to top"                                              |
| 3   | P1       | `CatalogPage`: title, count, `ProductsList` grid                         |
| 3   | P1       | `CatalogControls`: sorting and items per page                            |
| 3   | P1       | `ProductAbout`, `ProductTechSpecs`                                       |
| 3   | P1       | `ProductDetailsPage` layout at all breakpoints                           |
| 3   | P1       | `Categories`, `CategoryCard`                                             |
| 3   | P1       | `HomePage` assembly at all breakpoints                                   |
| 3   | P2       | `NotFoundPage`, `Loader`                                                 |
| 4   | P1       | `Pagination`                                                             |
| 4   | P1       | `FavoritesPage`                                                          |
| 4   | P1       | `CartItem`, `QuantityCounter`                                            |
| 4   | P1       | `CartPage`, `CartSummary`                                                |
| 4   | P2       | `BurgerMenu`                                                             |
| 4   | P2       | Icon counters, active menu item                                          |
| 5   | P2       | `Breadcrumbs`, card hover, pagination states                             |
| 5   | P2       | Thumbnail, colour and capacity states, `BackLink`, "You may also like"   |
| 5   | P2       | Arrow and dot states, autoplay 5 s, loop                                 |
| 5   | P1       | Integration check of all pages, merge freeze for the evening             |

## Stage 2: data and state

| Day | Priority | Task                                                                           |
| --- | -------- | ------------------------------------------------------------------------------ |
| 6   | P1       | `services/products.ts`: `fetch` from `public/api`                              |
| 6–7 | P1       | Sorting, page and perPage in the URL; sorting and pagination utilities         |
| 7   | P1       | Loader, error with a reload button, empty list in the catalog                  |
| 6   | P1       | `getProductDetails`, `getSuggestedProducts`, "Product was not found"           |
| 6–7 | P1       | `cartStore` (Zustand + persist), "Added to cart" button                        |
| 7   | P1       | Cart: quantity, removal, total, checkout via `confirm()`                       |
| 6   | P1       | `favoritesStore`, heart button on the card                                     |
| 7   | P1       | Home page data: Hot prices by discount, Brand new by `year`, category counters |
| 6   | P1       | Cart and favourites counters in the Header                                     |
| 7–8 | Nice     | Light theme and the switcher in the Footer                                     |
| 8   | Nice     | `Reveal` on home page sections                                                 |
| 9   | P1       | Test deploy to GitHub Pages                                                    |

## Schedule

| Day | Focus                 | Result by the evening                                                                             |
| --- | --------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | Start                 | Repo, Jira, assets. Everyone has opened the project and started a first task                      |
| 2   | P1                    | `ProductCard` in `main`                                                                           |
| 3   | P1, checkpoint        | 50% of P1. If less, nice-to-have tasks are cancelled                                              |
| 4   | P1                    | All stage 1 P1 in `main`                                                                          |
| 5   | P2 and responsiveness | All pages at 320, 640, 1200, 1440. Evening: freeze, demo                                          |
| 6   | Data and state        | API, cart and favourites stores                                                                   |
| 7   | Data and state        | Catalog, product, cart and favourites work on real data                                           |
| 8   | Checkpoint, polish    | Decide: theme yes or no, Supabase yes or no, animations or plan B                                 |
| 9   | Cross QA              | Every area is checked at 4 breakpoints by someone who did not write it; bugs in Jira; test deploy |
| 10  | Finalisation          | Fixes until noon, then freeze, final deploy, demo preparation                                     |

## Review

- Every pull request gets at least one review from someone who did not write it.
- Changes to `atoms/`, `styles/`, `types/`, `constants/` get extra attention, because they affect the whole app.
- Other pull requests do not wait for any specific reviewer.

## Anti-crisis rules

1. Keep pull requests small and merge daily. A branch does not live longer than 2 days.
2. Stuck for more than 1 hour: ask in the chat. More than 2 hours: simplify the task or drop its P2 part.
3. Shared files (`atoms/`, `styles/`, `types/`, `constants/`) change only through a reviewed pull request.
4. Do not wait for someone else's component: every one already has a starter that renders.
5. No icon or image yet: put a text placeholder and move on.
6. P1 always comes before P2. Nice-to-have only after the day 8 checkpoint decision.
7. A daily 15-minute standup: what was done, what is next, what blocks.
