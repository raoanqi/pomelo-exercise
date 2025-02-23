function fetchWithTimeout(url, timeout = 5000) {
  // 创建一个超时的 Promise
  const timeoutPromise = new Promise(resolve => {
    setTimeout(() => {
      resolve(null) // 超时后返回 null
    }, timeout)
  })

  // 发起网络请求的 Promise
  const fetchPromise = fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json() // 假设返回的是 JSON 数据
    })
    .catch(error => {
      console.error('Fetch error:', error)
      return null // 请求失败时返回 null
    })

  // 使用 Promise.race 竞争超时和网络请求
  return Promise.race([fetchPromise, timeoutPromise])
}

// 使用示例
fetchWithTimeout('https://api.example.com/data').then(data => {
  if (data === null) {
    console.log('Request timed out or failed')
  } else {
    console.log('Data received:', data)
  }
})
