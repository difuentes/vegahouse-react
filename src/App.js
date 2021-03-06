import React, { Fragment } from 'react';
import {Route,Routes} from 'react-router';

//firebase 

import firebase,{FirebaseContext} from './firebase'


//Componentes
import Ordenes from './components/pages/Ordenes';
import NuevoPlatillo from './components/pages/NuevoPlatillo';
import Menu from './components/pages/Menu';
import Sidebar from './components/ui/Sidebar';

function App() {
  return (
    <FirebaseContext.Provider
      value={{ firebase }}
    >
      <Fragment >    
      <div className="md:flex  min-h-screen">
        <Sidebar/>

          <div className="md:w3/5 xl:w-4/5 p-6">
          <Routes>
              <Route path="/" element={<Ordenes/>}/>
              <Route path="/nuevo-platillo" element={<NuevoPlatillo/>}/>
              <Route path="/menu" element={<Menu/>}/>
            </Routes>
          </div>
        
        </div>
      </Fragment>
    </FirebaseContext.Provider>
  );
}

export default App;
