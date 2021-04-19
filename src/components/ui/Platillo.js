import React,{useContext,useRef} from 'react';

import {FirebaseContext} from '../../firebase'

const Platillo = ({platillo}) => {

    //Existencia ref para acceder alvalor directamente 
    const exitenciaRef = useRef(platillo.exitencia);

    //context firebase
    const {firebase} = useContext(FirebaseContext);

    //destructuring platillo
    const {id,nombre, descripcion ,precio,categoria,imagen,exitencia} = platillo;
    
    //modificar estado platillo en firebase
    const updateDisponibilidad =()=>{

        const exitencia =(exitenciaRef.current.value === "true");

        try {
            firebase.db.collection('productos').doc(id).update({exitencia});
            
        } catch (error) {
            console.log(error)
        }

        //console.log(existencia);

    }



    return (
        <div className="w-full -px-3  mb-4">
            <div className="p- shadow-md border-white" >
                <div className="lg:flex ">
                    <div className="lg:w-5/12 xl:w-3/12">
                            <img alt="img platillo" src={imagen}/>
                            <div className="sm:flex sm:-mx-2 mt-2 ">
                                <label className="ml-5  font-bold ">Disponibilidad:</label>
                                <select value={exitencia} onChange={()=>updateDisponibilidad()} ref={exitenciaRef} className="apparence-none rounded focus:shadow-outline focus:outline-none shadow ml-2 mb-2  border border-purple-800 bg-purple-500 text-white">
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </div>
                    </div>
                    <div className="lg:w-7/12  xl:w-9/12">
                        <p className="font-bold  pl-5 text-2xl text-purple-700 mb-4">{nombre}</p>
                        <p className="font-bold uppercase pl-5 mb-4 text-purple-800 ">categoria:<span className="ml-2 text-orange-500 text-bold">{categoria}</span></p>
                        <p className="font-bold  pl-5 text-1xl text-gray-800 mb-4">{descripcion}</p>
                        <p className="font-bold  pl-5 text-1xl text-orange-500 mb-4">$<span className="text-black"> {precio}</span> </p>
                    </div>

                </div>

            </div>
            
        </div>
      );
}
 
export default Platillo;