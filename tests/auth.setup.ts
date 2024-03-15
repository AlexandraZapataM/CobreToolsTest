import { test as setup } from '@playwright/test'
import {loginUser} from './utils'

const authFile = 'playwright/.auth/user.json'
setup('authenticate', async ({ page }) => {
  await loginUser(page)
  await page.context().storageState({ path: authFile })
})

