import { routes, routesTS } from '../routes/sidebar'
import { Link, NavLink, useLocation } from 'react-router-dom'
//import SidebarSubmenu from './SidebarSubmenu';
import MinusSmallIcon from '@heroicons/react/24/outline/MinusSmallIcon';
import { useState } from 'react';
import { getUserInfo } from '../utils/localStorage';
import { ROLE } from '../utils/constant';
//import { useDispatch } from 'react-redux';
//import { motion } from 'framer-motion'



function LeftSidebar() {
    const location = useLocation();

    const [role, setRole] = useState(getUserInfo().role);

    //const dispatch = useDispatch()


    /*const close = (e) => {
        console.log(e);
        document.getElementById('left-sidebar-drawer').click()
    }*/

    return (
        <div className="drawer-side">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="menu  pt-2 w-60 h-full bg-base-100 text-base-content">
                <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
                    <MinusSmallIcon className="h-5 inline-block w-5" />
                </button>

                <li className="mb-2 font-semibold text-xl">
                    <Link to={'/app/welcome'}>Fraternidad</Link>
                </li>
                {role === ROLE.FRATERNO ?
                    routes.map((route, k) => {
                        return (
                            <li key={k}>
                                {
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200' : 'font-normal'}`} >

                                        <MinusSmallIcon className="h-6 w-6 inline-block" /> {route.name}
                                        {
                                            location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                        }
                                    </NavLink>)
                                }

                            </li>
                        )
                    })
                    : routesTS.map((route, k) => {
                        return (
                            <li key={k}>
                                {
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200' : 'font-normal'}`} >

                                        <MinusSmallIcon className="h-6 w-6 inline-block" /> {route.name}
                                        {
                                            location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                        }
                                    </NavLink>)
                                }

                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar