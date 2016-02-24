udc - Underdog.io Candidates Web App

## Description

This is a simple pure JS web app that uses ReactJS to display some
data about potential Underdog.io candidates

## Data

The data for this web app is fetched from:

    http://underdog-candidates.herokuapp.com/candidates


## Build Requirements

None

## Testing Requirements

The author was unable to implement any automatted testing within rough
3 hour timeframe. Moving forward, this should be a high priority.

## Deployment Requirements

For development and demonstration purposes, all JS libraries are
loaded from the project directory. This is sub-optimal for production
deployment where the JS libraries should be loaded from a CDN or
concatenated and minified if served from the host.

To run the web app locally, simply clone the git repo, and open
`public/index.html` in your web browser of choice. Your browser must be set
to execute javascript (so this will not work in Dillo for example).

To deploy the web app for real, you should clone the git repo onto
your server, and configure your server of choice (nginx, apache, etc.)
to serve the `public/index.html` file.
