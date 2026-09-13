import { useEffect, useLayoutEffect, useState } from 'react'
import Hero from './Hero.jsx'
import Loading from './Loading.jsx'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

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
