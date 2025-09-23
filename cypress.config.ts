import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
    baseUrl: 'https://parabank.parasoft.com/parabank/index.htm',
  },
});
