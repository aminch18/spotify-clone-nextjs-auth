
import Center from '../components/Center.js'
import Sidebar from '../components/Sidebar.js'

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">

      <main className="flex">
        <Sidebar/>
        <Center/>
        {/* Center component*/}
      </main>

      <div>
        { /* Player component*/}
      </div>
    </div>
  )
}
