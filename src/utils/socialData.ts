export const fetchSocialData = async () => {
  const res = await fetch('/api/social', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return res.json()
}
