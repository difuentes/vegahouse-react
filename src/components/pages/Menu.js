import React ,{useState,useEffect,useContext} from 'react';
import {Link} from 'react-router-dom';

import {FirebaseContext} from '../../firebase'

//ui 
import Platillo from '../ui/Platillo';

const Menu = () => {

   //state  
   const [platillos, guardarPlatillos ] = useState([])

   //extrar context firebase
   const {firebase} = useContext(FirebaseContext);

   //consultar bd al cargar 
   useEffect(()=>{
      const obtenerPlatillo =async  () => {
         await firebase.db.collection('productos').onSnapshot(handleSnapshot);

      }
      obtenerPlatillo();

   },[])
   
   //snapshot permite la base de datos de firestore en tiempo real 
   function handleSnapshot(snapshot){
      const platillos = snapshot.docs.map(doc =>{
         return {
            id: doc.id,
            ...doc.data()
         }
      });
      //almacenar platillos en el state
      guardarPlatillos(platillos);
   }

    return ( 
        <>
         <h1 className="text-3xl font-bold pl-4 uppercase text-center text-ligth text-purple-800">Menu</h1>
      
         <div className="grid justify-items-center ">
            <div className="">
               <Link to="/nuevo-platillo" className="mt-10   block text-center rounded bg-purple-800 hover:bg-purple-600  mb-5 px-48 py-3 text-white uppercase font-bold">
                  Agregar Platillo
               </Link>
            </div>

            {platillos.map(platillo =>(
               <Platillo
                  key={platillo.id}
                  platillo={platillo}
               />
            ))}
           
         </div>
        </>
     );
}
 
export default Menu;