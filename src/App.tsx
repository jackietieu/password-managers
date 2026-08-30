import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { StrengthChecker } from './components/StrengthChecker'
import { LeakVectors } from './components/LeakVectors'
import { LeakCheckers } from './components/LeakCheckers'
import { Managers } from './components/Managers'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <StrengthChecker />
        <LeakVectors />
        <LeakCheckers />
        <Managers />
      </main>
      <Footer />
    </>
  )
}
