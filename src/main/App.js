import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Rotas from './rotas';
import NavBar from '../componets/navBar'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ProvedorDeAutenticacao from "./provedorDeAutenticacao";

class App extends React.Component{
  render(){
    return(
      <ProvedorDeAutenticacao>
      <NavBar/>
    <div className='container'>
    <Rotas/>
    </div>
      </ProvedorDeAutenticacao>
    )
  }
}

export default App;
