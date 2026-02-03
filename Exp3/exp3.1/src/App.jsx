import { Routes, Route } from 'react-router-dom'
import './App.css'

function Home() {
  return <h2>Home Page</h2>
}

function About() {
  return <h2>About Page</h2>
}

function Contact() {
  return <h2>Contact Page</h2>
}

function NotFound() {
  return <h2> 404 - Page Not Found</h2>
}

function App() {
  return (
    <div className="container">
      <h1>Client-Side Routing Using URL</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
