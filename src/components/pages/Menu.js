import React from 'react';
import {Link} from 'react-router-dom';
const Menu = () => {
    return ( 
        <>
         <h1 className="text-3xl font-bold pl-2 text-ligth">Menu</h1>
         <Link to="/nuevo-platillo" className="ml-3 rounded bg-purple-800 hover:bg-purple-600 inline-block mb-5 p-2 text-white uppercase font-bold">
            Agregar Platillo
         </Link>
        </>
     );
}
 
export default Menu;