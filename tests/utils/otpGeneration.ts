import crypto from 'crypto'
import base32 from 'thirty-two'

export const generateOtp = (key) => {
  const timestamp = Math.floor(Date.now() / 1000)

  const otp = generateTOTP(key, timestamp)

  return otp
}

const generateTOTP = (secret, timestamp) => {
  const decodedSecret = base32.decode(secret)
  const timeStep = 30 // Time step in seconds (default: 30 seconds)
  let counter = Math.floor(timestamp / timeStep)

  const counterBuffer = Buffer.alloc(8)
  for (let i = 7; i >= 0; i--) {
    counterBuffer[i] = counter & 0xff
    counter >>= 8
  }

  const hmac = crypto
    .createHmac('sha1', decodedSecret)
    .update(counterBuffer)
    .digest()

  const offset = hmac[hmac.length - 1] & 0xf
  const otpValue =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  const otpDigits = 6 // Number of digits in the OTP (default: 6 digits)
  const otpModulo = Math.pow(10, otpDigits)
  let otp = (otpValue % otpModulo).toString()

  // Pad the OTP with leading zeros if necessary
  while (otp.length < otpDigits) {
    otp = '0' + otp
  }

  return otp
}
