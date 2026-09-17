import { useEffect, useLayoutEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Hero from './Hero.jsx'
import Loading from './Loading.jsx'
import Fire from './Fire.jsx'
import Sorcers from './Sorcers.jsx'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isFireUnlocked, setIsFireUnlocked] = useState(false)

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

  if (isLoading) {
    return <Loading />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<><Hero onReality={() => setIsFireUnlocked(true)} /><Fire isUnlocked={isFireUnlocked} /></>}
      />
      <Route path="/sorcerers" element={<Sorcers />} />
    </Routes>
  )
}

export default App
