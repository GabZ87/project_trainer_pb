import { defineConfig } from 'cypress';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  projectId: 'xxczck',
  e2e: {
    baseUrl: 'https://parabank.parasoft.com/parabank/index.htm',
    setupNodeEvents(on: any, config: any) {
      on('task', {
        getUserFiles() {
          const dir = path.join(__dirname, 'cypress/fixtures/userlogin');
          return fs.readdirSync(dir)
            .filter((file: string) => file.endsWith('.json'))
            .map((file: string) => file.replace('.json', ''));
        }
      });
      // implement node event listeners here
      return config;
    },
  },
});
