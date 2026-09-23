import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './components/Home'
import PostView from './components/PostView'
import { getPost } from './data/posts'
import { useHashRoute } from './lib/useHashRoute'
import { useTheme } from './lib/useTheme'

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [route, navigate] = useHashRoute()
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)

  const post = route ? getPost(route) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [route])

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} onHome={() => navigate('')} />

      <main className="main">
        <AnimatePresence mode="wait">
          {post ? (
            <PostView
              key={post.slug}
              post={post}
              onBack={() => navigate('')}
              onTagSelect={(selected) => {
                setTag(selected)
                navigate('')
              }}
            />
          ) : (
            <Home
              key="home"
              query={query}
              onQueryChange={setQuery}
              tag={tag}
              onTagChange={setTag}
              onOpen={navigate}
            />
          )}
        </AnimatePresence>
      </main>

      <footer className="sitefooter">
        <p>
          Technical Blog · contenidos sobre DevOps agéntico, GitHub Copilot e IA aplicada.
        </p>
      </footer>
    </div>
  )
}
