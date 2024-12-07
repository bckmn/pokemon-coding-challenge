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

To run all checks:

```
npm run build
npm run lint
npm run test
```

## Contribute

If you want to propose changes to this repository, please create a Pull Request towards the `main` branch. The PR pipeline will ensure that all checks are passing before you will be allowed to merge the code to the `main` branch.

## Future improvements

A list of things I would like to improve:

  - Add proper error handling of the `/battle` endpoint. Errors should return proper HTTP error codes instead of being added to the battle log.
  - Add a simple GUI for creating your team and picking Pokemon.
  - Use `tiny-decoders` to decode the data sent to the API.
  - Setup separate, stateless endpoints and let the client store the state of the battle.
  - Refine the tests.