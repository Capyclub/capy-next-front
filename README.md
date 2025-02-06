# Integration and Deployment with React.js
[![codecov](https://codecov.io/github/Capyclub/capy-next-front/graph/badge.svg?token=HUP4NW57IR)](https://codecov.io/github/Capyclub/capy-next-front)

Project for Ynov Capyclub form
## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Scripts](#scripts)
- [Testing](#testing)
- [Documentation](#documentation)
- [Deployment](#deployment)

## Overview

The application is built using React.js and implements a simple user registration form. It incorporates:
- Form validation logic to ensure data integrity.
- Unit and integration tests with 100% test coverage.
- Automated deployment to GitHub Pages using GitHub Actions.

The application adheres to industry best practices, including strict linting rules, clean code organization, and modular design.

## Technologies Used

- **Frontend**: NextJS, TailwindCSS
- **Testing**: Jest
- **Build Tool**: Babel
- **Deployment**: GitHub Pages, GitHub Actions

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (or yarn)

### Steps

1. Clone the repository:
   ```bash
   git clone git@github.com:Capyclub/capy-next-front.git
   cd capy-next-front 
   ```
2. Install the dependencies:
   ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
4. Run test on project:
    ```bash
    npm run test
    ```
5. Run coverage test on project:
    ```bash
    npm run test:coverage
    ```

### Generate a JsDocs file
1. Type this bash command
    ```bash
    npm run jsdoc
    ```
