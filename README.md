## About the app

-   This is a web app made for practicing Japanese particle use
-   Start drilling on the Home page
-   Choose a level from the Levels page
-   Select the particle that goes in the blank space
-   There can be more than any one answer to a single question
-   For any questions or feedback, please go to the bottom of the Stats page

This app is hosted for free on Vercel.
It is still a work in progress.

**🔗 Links:**

-   [The app](https://wonideto.seanv.dev/)
-   🧭 [The original Adobe XD wireframe](https://xd.adobe.com/view/fcda656c-e122-4ce5-a462-3c6e3448417a-a989/?fullscreen&hints=off)

## Feature List

-   The particle drill system
    -   Choose from grid of particles for entry
        -   Keyboard entry also possible
    -   Incorrect input will be treated as a wrong answer, user has another change to input correct answer
    -   Levels page
        -   Difficulty progression loosely based on JLPT
            -   Based on Dragon Ball Z storyline
        -   Level reset
        -   Level stats
        -   Graveyard Level for retrying wrong answers
-   Stats/Options page
    -   Options
        -   Audio on/off
        -   Furigana on/off
        -   Show English
        -   Reset progress/stats
    -   Stats
        -   Percentage correct
    -   Feedback form
-   Levels Page
    -   Select and clear
-   About / instructions page
    -   How to use the app
    -   About the author / SNS links
    -   Contributors + links
    -   Patreon
-   Landing Page

## Next to implement

-   Investigate possibility of merging _drillState.currentLevelNum_ & _progressCtx.ctx.state.currentLevelNum_
-   Finalize design/animations
-   Switch _getAll~_ /lib/ functions to use _flatMap_ array method

Work for version 1.0:

-   Thorough testing
-   Finalize initial question content
-   Implement SEO features and publish to message boards
-   About page (/w MD parsing?)

Work for version 2.0:

-   Merge multiple-particle answers into one question
    -   _Question.question_ could be array of questions/answers? English and ID would stay the same
-   Switch to purely keyboard system
-   Huge architecture refactor
    -   Architectually re-think storing **_all_** `answeredIds` in progressContext
    -   Think of system to store answered levels and `answeredIds` separately
    -   Reduce re-renders
-   Move data to Supabase & replace all `import drillData` with fetch methods
-   Add system for Feedback email backups /w Supabase
-   Replace nodemailer with proper mailing solution
-   Documentation
-   Create more tests cases

## Known Bugs

-   minor – On iOS Safari, NavItem icon SVG edges clip the container on mobile

## Wishlist

-   'Reset' button for entire stages
-   Double tap brings up modal with word details from Jisho.org
-   Advanced mode (すら・さえ・しか・だけ)
-   Backend
    -   Auth, storage of user statistics etc. on Supabase
-   Professional branding/design
-   Options
    -   Dark Mode
    -   Double tap/click to enter (character shows up as the placeholder)
    -   Voice Gender choose
-   Adding own questions/levels etc.
-   Entertainment feedback aspect
    -   Noises
    -   Graphics for each level

## Roadmap

-   Version 1 (WIP)
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

## Running it yourself:

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
| SMTP_HOST                       | Yes      | Host address by your SMTP server                                  |
| SMTP_PORT                       | Yes      | Port used by your SMTP server (e.g. 587)                          |
| SMTP_USER                       | Yes      | Username for your SMTP server (e.g. bob@mysite.com)               |
| SMTP_PASS                       | Yes      | Password for your SMTP server                                     |
