import { useEffect, useState } from 'react'
import Hero from './Hero.jsx'
import Loading from './Loading.jsx'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => {
      setIsLoading(false)
    }, 2400)

    return () => window.clearTimeout(loadingTimer)
  }, [])

  return (
    <div>
      {isLoading ? <Loading /> : <Hero />}
    </div>
  )
}

export default App
