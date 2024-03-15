import * as fs from 'fs'
import type { Page } from '@playwright/test'
import { generateOtp } from './utils/otpGeneration'

const filePathOtp = 'tests/utils/currentOtp.json'

export const loginUser = async (page: Page) => {
  await page.goto(process.env.COBRE_TOOLS_URL ?? '')

    await page.fill('#username', process.env.COBRE_USER ?? '')
    await page.fill('#password', process.env.COBRE_PASS ?? '')
    await page.click('#kc-login')

    const loginOtp = await getDistinctOtp(page)
    console.log(loginOtp)
    await page.fill('#otp', loginOtp)
    await page.click('#kc-login')

    await page.locator('.co-avatar')
}

export const getDistinctOtp = async (page: Page, userKey = process.env.COBRE_USER_KEY): Promise<string> => {
  const randomTimeout = Math.floor(Math.random() * 8) * 1000 + 3000
  const currentOtp = JSON.parse(fs.readFileSync(filePathOtp, 'utf8')).otp
  const newOtp = generateOtp(userKey)

  const folderPath = filePathOtp.replace(/\/[^/]+$/, '')
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }

  if (newOtp === currentOtp) {
    await page.waitForTimeout(randomTimeout)
    return getDistinctOtp(page)
  }

  const jsonData = JSON.stringify({ otp: newOtp }, null, 2)

  fs.writeFileSync(filePathOtp, jsonData)

  return newOtp
}





