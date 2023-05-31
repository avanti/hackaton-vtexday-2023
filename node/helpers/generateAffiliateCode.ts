export const generateAffiliateCode = (size = 15): string => {
  let text = ''

  let charset = 'abcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < size; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length))

  return text
}
