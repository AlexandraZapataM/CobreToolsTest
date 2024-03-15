import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const config = defineConfig({
  testDir: './tests',
  maxFailures: 2,
  timeout: 270000,
  workers: '100%',
  reporter: [['html', { open: 'never' }], ['json', { outputFile: 'test-results.json' }]],
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    testIdAttribute: 'id'
    // bypassCSP: true,
    // launchOptions: {
    //   args: ['--disable-web-security']
    // }
  },
  fullyParallel: false,
  retries: 1,
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json'
      },
      dependencies: ['setup']
    }
  ]
})

export default config
