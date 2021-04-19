import React from 'react';
import {Link} from 'react-router-dom';
const Menu = () => {
    return ( 
        <>
         <h1 className="text-3xl font-bold pl-4 uppercase text-center text-ligth text-purple-800">Menu</h1>
      
         <div className="grid justify-items-center ">
            <div className="">
               <Link to="/nuevo-platillo" className="mt-10   block text-center rounded bg-purple-800 hover:bg-purple-600  mb-5 px-48 py-3 text-white uppercase font-bold">
                  Agregar Platillo
               </Link>
            </div>
           
         </div>
        </>
     );
}
 
export default Menu;