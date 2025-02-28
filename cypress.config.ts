import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "cypress/fixtures",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    env: {
        BACKEND_URL: 'https://capy-back-inky.vercel.app',
      admin_token: 'votre_token_admin_ici',
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
