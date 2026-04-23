import { Routes, Route } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Laws from '@/pages/Laws'
import Enforcement from '@/pages/Enforcement'
import DPAs from '@/pages/DPAs'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/laws" element={<Laws />} />
          <Route path="/enforcement" element={<Enforcement />} />
          <Route path="/dpas" element={<DPAs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
