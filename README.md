🧭 **[Wireframe](https://xd.adobe.com/view/fcda656c-e122-4ce5-a462-3c6e3448417a-a989/?fullscreen&hints=off)**

## Feature List

-   Particle drill system

    -   Choose from grid of particles for entry
    -   Incorrect input will be treated as a wrong answer, user will have another change to input correct particle

    -   Levels
        -   Difficulty progression (like Wanikani's heaven/hell progression)
            -   Based on DBZ QuestionHistorycharacters?
            -   English
        -   Level reset
        -   Dynamic Level for wrong answers (Graveyard)
        -   Level stats

-   Stats/Options page

    -   Options
        -   Language (English/Japanese)
        -   Audio on/off
        -   Furigana on/off
        -   Voice Gender
        -   Show English
        -   Reset progress/stats
        -   Double tap/click to enter (character shows up as the placeholder)
    -   Stats
        -   Percentage correct
    -   Feedback

-   Levels Page
    -   Select and clear
-   About / instructions page

    -   How to use the app
    -   About the author / SNS links
    -   Contributors + links
    -   Patreon

-   Landing Page

## Next to implement

-   Refactor useDrill hook & LevelProgress component
-   Progress bar
-   Question section
    -   Japanese parsing /w Furigana
    -   Google Speech API integration
    -   English display
    -   Integration with Settings context
-   Settings page
-   Level page
-   Fill out question content properly
-   Stats page
-   Design/animations
-   About page
-   Documentation
-   Create tests
-   Testing

## Wishlist

-   Double tap brings up modal with word details from Jisho.org
-   Auto say answer after entering
-   Advanced mode (すら・さえ・しか・だけ)
-   Backend
    -   Auth, storage of user statistics etc. on Supabase
-   Actual branding/design
-   Dark Mode
-   Adding own questions/levels etc.
-   Entertainment feedback aspect
    -   Noises
    -   Graphics for each level

## Roadmap

-   Version 1
    -   Get the app off the ground
-   Version 2

    -   Introduce back end
    -   Hide raw data
        -   Add proper hashed IDs
    -   Add new levels

-   Version 3
    -   User system
-   Version 4
    -   Visual overhaul
