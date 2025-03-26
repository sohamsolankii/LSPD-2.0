import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import {SidebarData} from './SidebarData'
import {AdminSidebarData} from './AdminSideBarData'
import * as AiIcons from 'react-icons/ai'
import {UserContext} from '../../context/userContext'


const Sidebar = ({sidebar, showSidebar}) => {
    const {passkey} = useContext(UserContext)
	
    return (
        <>
            <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className="menu-bars">
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {(!passkey || passkey.every((digit) => digit === ''))
                        ? SidebarData.map((item, index) => (
                              <li key={index} className={item.cName}>
                                  <Link to={item.path}>
                                      {item.icon}
                                      <span>{item.title}</span>
                                  </Link>
                              </li>
                          ))
                        : AdminSidebarData.map((item, index) => (
                              <li key={index} className={item.cName}>
                                  <Link to={item.path}>
                                      {item.icon}
                                      <span>{item.title}</span>
                                  </Link>
                              </li>
                          ))}
                </ul>
            </div>
            {sidebar && <div className="overlay" onClick={showSidebar}></div>}
        </>
    )
}

export default Sidebar


