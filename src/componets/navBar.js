import React from "react";
import NavBarItem from "./NavBarItem";
import AuthService from "../App/service/authService";
import provedorDeAutenticacao from "../main/provedorDeAutenticacao";

const deslogar=() =>{
    AuthService.removerUsuarioAutenticado();
}

const isUsuarioAutenticado = () =>{
    return AuthService.isUsuarioAutenticado();
}

function Navbar(){

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="https://bootswatch.com/" className="navbar-brand">Minhas Finanças</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" 
          aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
                <NavBarItem render={isUsuarioAutenticado()} href="#/home" label="Home"/>
                <NavBarItem render={isUsuarioAutenticado()} href="#/cadastro-usuarios" label="Usuario"/>
                <NavBarItem render={isUsuarioAutenticado()} href="#/consulta-lancamentos" label="Lancamento"/>
                <NavBarItem render={isUsuarioAutenticado()} onClick={deslogar} href="#/login" label="Sair"/>
          </ul>
          </div>
        </div>
      </div>
    )
}
export default Navbar