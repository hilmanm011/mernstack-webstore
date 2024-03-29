import Footer from "./Footer"
import Profile from "./Profile"
import MenuItem from "./MenuItem"
import Cookies from "js-cookie"
import { useRouter } from "next/router"

interface SideBarProps {
  activeMenu: 'overview' | 'transactions' | 'settings'
}
const SideBar = (props: SideBarProps) => {
  const { activeMenu } = props

  const router = useRouter()
  const onLogout = ()=>{
    Cookies.remove('token')
    router.push('/')
  }

  return (
    <section className="sidebar">
        <div className="content pt-50 pb-30 ps-30">
            <Profile />
            <div className="menus">
                <MenuItem 
                  title="Overview" 
                  icon="ic-menu-overview" 
                  active={ activeMenu === 'overview' } 
                  href="/member" 
                />
                <MenuItem 
                  title="Transactions" 
                  icon="ic-menu-transactions" 
                  active={ activeMenu === 'transactions' } 
                  href="/member/transactions" 
                />
                <MenuItem 
                  title="Messages" 
                  icon="ic-menu-messages" 
                  href="/member" 
                />
                <MenuItem 
                  title="Card" 
                  icon="ic-menu-card" 
                  href="/member" 
                />
                <MenuItem 
                  title="Rewards" 
                  icon="ic-menu-rewards" 
                  href="/member" 
                />
                <MenuItem 
                  title="Settings" 
                  icon="ic-menu-settings" 
                  active={ activeMenu === 'settings' } 
                  href="/member/edit-profile" 
                />
                <MenuItem 
                  title="Log Out" 
                  icon="ic-menu-logout" 
                  onClick={onLogout}
                />
            </div>
            <Footer />
        </div>
    </section>
  )
}

export default SideBar