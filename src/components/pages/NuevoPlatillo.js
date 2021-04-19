import React,{useContext,useState} from 'react';
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {useNavigate} from 'react-router-dom';

import {FirebaseContext} from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {


    //state imagenes
    const [subiendo,guardarSubiendo] = useState(false);
    const [progreso,guardarProgreso] = useState(0);
    const [urlImg,guardarUrlImagen] = useState('');

    //context con las operaciones de firebase
    const {firebase} = useContext(FirebaseContext); 

    //hook para redirreccionar 
    const naviga = useNavigate();
   
    //codigo upload imagenes firebase
    const handleUploadStart = ()=>{
        guardarProgreso(0);
        guardarSubiendo(true) ;
    }

    const handleUploadError = error =>{
        guardarSubiendo=false;
        console.log(error);
    }


    const handleUploadSuccess = async nombre =>{
          guardarProgreso(100);
          guardarSubiendo(false);
          //almacenar la url de destino 
          const url = await firebase.storage.ref("productos").child(nombre).getDownloadURL();
          console.log(url);
          guardarUrlImagen(url);
    }

 
    const handleProgress = progreso =>{
        guardarProgreso(progreso);
        console.log(progreso);
    }

    

    //validacion y leer los datos del formulario
    const formik = useFormik({
        initialValues:{
            nombre:'',
            precio:'',
            categoria:'',
            imagen:'',
            descripcion:''
        },
        validationSchema:Yup.object({
            nombre: Yup.string().min(3,'Los platillos deben tener al menos 3 caracteres').required('El nombre es obligatorio'),
            precio: Yup.number().min(1,'Debe agregar un numero').required('El precio es obligatorio'),
            categoria: Yup.string().required('La categoria es obligatorio'),
            descripcion: Yup.string().min(3,'La descripcion debe tener minino 3 caracteres').required('La Descripcion es obligatorio'),

        }),
        onSubmit: platillo =>{
            try {
                platillo.exitencia=true;
                platillo.imagen = urlImg;
                firebase.db.collection('productos').add(platillo);
                //redireccionar
                naviga('/menu');
                
            } catch (error) {
                console.log(error);
            }
          
        }
    })


    return ( 
        <>
         <h1 className="text-3xl text-center text-ligth uppercase text-purple-600 font-bold ">Nuevo Platillo</h1>
         <div className="flex justify-center mt-5 bg-gray-100 pt-5 rounded-lg">
                <div className="w-full max-w-3xl ">
                       <form
                        onSubmit={formik.handleSubmit}
                       >
                            <div className="mb-4">
                                <label htmlFor="nombre" className="uppercase text-purple-600 font-bold ">Nombre :</label>
                                <input
                                    className="shadow appearence-none mt-2 hover:bg-purple-200  rouded w-full py-2 px-3 text-purple-600 focus:outline-none focus:shadow-outline"
                                    id="nombre"
                                    type="text"
                                    placeholder="ingrese nombre platillo"
                                    value={formik.values.nombre}
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            { formik.touched.nombre && formik.errors.nombre ?(
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="">{formik.errors.nombre}</p>
                                </div>
                            ) :null
                            }
                            <div className="mb-4">
                                <label htmlFor="precio" className="uppercase text-purple-600 font-bold ">precio :</label>
                                <input
                                    className="shadow appearence-none mt-2 hover:bg-purple-200  rouded w-full py-2 px-3 text-purple-600 focus:outline-none focus:shadow-outline"
                                    id="precio"
                                    type="number"
                                    placeholder="ingrese precio $"
                                    min="0"
                                    value={formik.values.precio}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            { formik.touched.precio && formik.errors.precio ?(
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="">{formik.errors.precio}</p>
                                </div>
                            ) :null
                            }
                            
                            <div className="mb-4">
                                <label htmlFor="categoria" className="uppercase text-purple-600 font-bold ">categoria :</label>
                                <select
                                 className="shadow appearence-none mt-2 hover:bg-purple-100  rouded w-full py-2 px-3 text-purple-900 focus:outline-none focus:shadow-outline"
                                 id="categoria"
                                 name="categoria"
                                 value={formik.values.categoria}
                                 onBlur={formik.handleBlur}
                                 onChange={formik.handleChange}
                                >
                                    <option value="">--Seleccione--</option>
                                    <option value="desayuno">Desayuno</option>
                                    <option value="comida">Comida</option>
                                    <option value="cena">Cena</option>
                                    <option value="postre">Postre</option>
                                    <option value="bebida">Bebida</option>
                                    <option value="ensalada">Ensalada</option>

                                </select>
                            
                            </div>
                            { formik.touched.categoria && formik.errors.categoria ?(
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="">{formik.errors.categoria}</p>
                                </div>
                            ) :null
                            }

                            <div className="mb-4">
                                <label htmlFor="imagen" className="uppercase text-purple-600 font-bold ">Imagen </label>
                                <FileUploader
                                    accept="image/*"
                                    id="imagen"
                                    name="imagen"
                                    randomizeFilename
                                    storageRef={firebase.storage.ref("productos")}
                                    onUploadStart={handleUploadStart}
                                    onUploadError={handleUploadError}
                                    onUploadSuccess={handleUploadSuccess}
                                    onProgress={handleProgress}
                                />
                            </div>
                            {subiendo && (
                                <div className="h-12 relative w-full border">
                                    <div className="bg-green-600 rounded-md absolute left-0 top-0 text-white px-2 text-sm h-12 flex  items-center " style={{ width:`${progreso}%`}} >
                                    {progreso} % 
                                    </div>
                                </div>)
                            }

                            {urlImg && (
                                <p className="bg-green-600  text-white p-3 rounded-md text-center my-5">
                                    La imagen se subio correctamente
                                </p>
                            )}

                            <div className="mb-4">
                                <label htmlFor="descripcion" className="uppercase text-purple-600 font-bold ">descripcion :</label>
                                <textarea
                                    className="shadow appearence-none mt-2 hover:bg-purple-200  rouded w-full py-2 px-3 text-purple-600 focus:outline-none focus:shadow-outline"
                                    id="descripcion"
                                    type="text"
                                    placeholder="Descripcion del platillo"
                                    value={formik.values.descripcion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} 
                                ></textarea>
                            </div>
                            { formik.touched.descripcion && formik.errors.descripcion ?(
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                    <p className="">{formik.errors.descripcion}</p>
                                </div>
                            ) :null
                            }
                            <input
                                type="submit"
                                value="Agregar Platillo"
                                className="uppercase rounded-lg font-bold bg-purple-700 hover:bg-purple-500 w-full mt-2 p-2 text-white text-center "
                            />
                       </form>


                </div>
         </div>
        </>
     );
}
 
export default NuevoPlatillo;