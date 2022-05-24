🧭 **[Wireframe](https://xd.adobe.com/view/fcda656c-e122-4ce5-a462-3c6e3448417a-a989/?fullscreen&hints=off)**

## Getting Started

### Installation

To install:

```
yarn create next-app -e https://github.com/veritasnz/wonideto
# or
npx create-next-app -e https://github.com/veritasnz/wonideto
```

To run the project locally:

```
yarn dev
# or
npm run dev
```

Build the project using:

```
yarn build
# or
npm run build
```

This also builds all the audio files used by drill

The project should now be available at http://localhost:3000!

### Environment Variables

A few environment variables are needed to get this project working.
Create a new file locally called `.env.local` and add the following:

| Name                            | Required | Description                                                       |
| ------------------------------- | -------- | ----------------------------------------------------------------- |
| GOOGLE_CREDENTIALS_CLIENT_EMAIL | Yes      | The client email from your Google Cloud API credentials JSON file |
| GOOGLE_CREDENTIALS_PRIV_KEY     | Yes      | The private key from your Google Cloud API credentials JSON file  |

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
        -   Audio on/off
        -   Furigana on/off
        -   Show English
        -   Reset progress/stats
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

-   Bugfixing
-   Refactor logic
    -   Add useMemo for drillData?
    -   Refactor Drill/Question/useDrill
-   Rough testing
-   Test cases for duplicate IDs (Vitest?)
-   Fill out question content properly
-   Fix loading state for SEO
    -   Top page displays "Finished! Choose next level" when viewing page source
    -   Add loading spinner before context has finished loading
-   Stats page
    -   Feedback form
-   Move data to Supabase
-   Finalize design/animations
-   About page
-   Documentation
-   Create more tests cases
-   Thorough testing

## Known Bugs

-   Browser denying JS autoplay (_audioElement.play()_) not working on mobile browsers
    -   Inside try/catch, create modal with button to allow user to enable audio
-   On load, half finished levels are displayed as if nothing has been answered before
-   On iOS Safari, NavItem icon SVG edges clip the container on mobile

## Wishlist

-   Double tap brings up modal with word details from Jisho.org
-   Advanced mode (すら・さえ・しか・だけ)
-   Backend
    -   Auth, storage of user statistics etc. on Supabase
-   Actual branding/design
-   Options
    -   Dark Mode
    -   Language (English/Japanese)
    -   Double tap/click to enter (character shows up as the placeholder)
    -   Voice Gender
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
