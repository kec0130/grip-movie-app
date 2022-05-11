import { Outlet } from 'react-router-dom'
import GNB from 'components/GNB'

const PageLayout = () => {
  return (
    <>
      <Outlet />
      <footer>
        <GNB />
      </footer>
    </>
  )
}
export default PageLayout
