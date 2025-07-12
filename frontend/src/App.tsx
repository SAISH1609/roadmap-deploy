import { Outlet } from 'react-router'
import Navbar from './components/shared/navbar/Navbar'
import Footer from './components/ui/Footer'

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App