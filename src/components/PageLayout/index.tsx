import { Outlet } from 'react-router-dom'
import GNB from 'components/GNB'

const PageLayout = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
      <footer>
        <GNB />
      </footer>
    </div>
  )
}
export default PageLayout
