# Grid and breakpoints (from Figma)

| Breakpoint | Frame width | Container | Padding | Columns    | Gutter | Card |
| ---------- | ----------- | --------- | ------- | ---------- | ------ | ---- |
| mobile     | 320         | 288       | 16      | 1 (slider) | 16     | 212  |
| tablet     | 640         | 592       | 24      | 2          | 16     | 288  |
| desktop    | 1200        | 1136      | 32      | 4          | 16     | 272  |
| wide       | 1440        | 1136      | 152     | 4          | 16     | 272  |

Rules:

- Breakpoints are mobile-first: `min-width` from 640, 1200, 1440.
- On wide screens the container is centred, max-width 1440.
- Formula for 4 columns: (1136 − 3 × 16) / 4 = 272.
- Formula for 2 columns: (592 − 16) / 2 = 288.
