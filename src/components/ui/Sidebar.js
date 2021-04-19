import React from 'react';
import {NavLink} from 'react-router-dom';
const Sidebar = () => {
    return (
        <>
        <div className="md:w-2/5 xl:w-1/5 bg-purple-700">
            <div className="py-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Vega House</p>
                <p className="mt-3 text-white text-center">Administrador de Restaurant </p>
                
                <nav className="mt-10">
                    <NavLink className="uppercase font-bold text-white p-1 block hover:bg-purple-500 hover:text-yellow-300 " activeClassName="text-yellow-300 bg-purple-500"  exact="true" to="/">Ordenes</NavLink>
                    <NavLink className="uppercase font-bold text-white p-1 block hover:bg-purple-500 hover:text-yellow-300"  activeClassName="text-yellow-300 bg-purple-500" exact="true" to="/menu">Menu</NavLink>
                
                </nav>
                
            </div>
        </div>
           
        </>
      );
}
 
export default Sidebar;