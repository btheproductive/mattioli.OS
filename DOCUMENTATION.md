# Documentation - Update Habit Statistics Colors

## Overview
Updated the habit statistics page to enforce a consistent color scheme for single habit views. Regardless of the habit's configured color, the statistics now use Green for completion and Red for missed/incomplete status to provide clear visual feedback.

## Implementation Details

### File: `src/pages/Stats.tsx`

#### 1. Trend Data Logic
-   Modified the `trendData` mapping to include the `status` field explicitly.
-   This allows the UI to differentiate between 'done' and 'missed' states in the trend chart.

#### 2. Visual Updates
-   **Trend Chart ("Trend Ultimi 30 Giorni")**:
    -   Updated background color logic:
        -   `status === 'done'` -> `#11FF00` (Green)
        -   `status === 'missed'` -> `#FF0000` (Red)
    -   Updated the legend to show the fixed Green color for "Completato".

-   **Annual Calendar ("Calendario Annuale")**:
    -   Updated heatmap color logic:
        -   `count === 1` (Done) -> `#11FF00` (Green)
        -   `count === -1` (Missed) -> `#FF0000` (Red)
    -   Updated the legend to match.

-   **Performance Chart ("Performance per Giorno")**:
    -   Updated bar color logic:
    -   Updated bar color logic:
        -   High performance (`rate >= 70%`) -> `#11FF00` (Green)
        -   Medium performance (`rate >= 40%`) -> `#f59e0b` (Orange - unchanged)
        -   Low performance -> `#FF0000` (Red)

## Justification
This change ensures that positive reinforcement (Green) and attention to improvement areas (Red) are consistent across all habits, improving readability and user experience in the detailed statistics view.
