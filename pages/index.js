
import Sidebar from '../components/Sidebar.js'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">

      <main>
        <Sidebar/>
        {/* Center component*/}
      </main>

      <div>
        { /* Player component*/}
      </div>
    </div>
  )
}
