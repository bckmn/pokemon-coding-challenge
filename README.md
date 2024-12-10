# Pokemon Battle Simulator

This project simulates Pokemon battles between two players. It consists of an API server located in `packages/api` and will contain a frontend located in `packages/app` in the future.

## Prerequisites

  - Node.js v22 or higher
  - npm v10 or higher

## Getting started

Create a `.env` file in the root directory and add `PORT=8000` to the file.

```
npm ci
npm run dev
```

Or using Docker:

```
docker compose up api --build
```

Note that the project deliberately uses `eslint@8.49.0` and as such will cause `npm ci` to warn that some package versions are depricated. This is done because I wanted to be able to use YAML for the Eslint config and Eslint 9 no longer supports that. I will have to migrate the config file to `.mjs` in the future.

Visit `http://localhost:{PORT}/api-docs` to interact with the API via an OpenAPI UI.

To run all checks:

```
npm run build
npm run lint
npm run test
```

### Example request

The `POST /battle` endpoint requires the user to send a request with the following structure:

```
{
  "team1": {
    "trainer": "Ash",
    "pokemon": ["Blastoise", "Ivysaur"]
  },
  "team2": {
    "trainer": "Gary",
    "pokemon": ["Charmander", "Charmeleon"]
  }
}
```

Trainer can be any `string`, but the members of the `pokemon` array have to be names from the response of the `GET /pokemon` endpoint.

## Contribute

If you want to propose changes to this repository, please create a Pull Request towards the `main` branch. The PR pipeline will ensure that all checks are passing before you will be allowed to merge the code to the `main` branch.

## Future improvements

A list of things I would like to improve:

  - Add proper error handling of the `/battle` endpoint. Errors should return proper HTTP error codes instead of being added to the battle log.
  - Add a simple GUI for creating your team and picking Pokemon.
  - Setup separate, stateless endpoints and let the client store the state of the battle.
  - Refine the tests.