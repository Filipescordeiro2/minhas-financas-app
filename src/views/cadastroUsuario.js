import React from "react";
import Card from "../componets/card";
import FormGroup from "../componets/form-group";
import {withRouter} from "react-router-dom";
import usuarioService from "../App/service/usuarioService";
import {mensagemSucesso,mensagemErro} from '../componets/toastr'

class CadastroUsuario extends React.Component{
    
    state ={
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service=new usuarioService();
    }

    cadastrar = () => {
        const {nome,email,senha,senhaRepeticao} = this.state
       const usuario={nome,email,senha,senhaRepeticao}

        try{
            this.service.validar(usuario);

        }catch (erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg=>mensagemErro(msg))
            return false;
        }

       this.service.salvarUsuario(usuario)
       .then(response => {
        mensagemSucesso('Usuario cadastrado com sucesso! Faça o login para acesso')
        this.props.history.push('/login')
    }).catch(error => {
        if (error.response && error.response.data) {
            mensagemErro(error.response.data);
        } else {
            mensagemErro('Ocorreu um erro ao cadastrar o usuário.');
        }
    })
    
    }

    cancelar = () =>{
        this.props.history.push('/login')
    }

    
    render(){
        return(
              <Card title="Cadastro de Usuario">
              <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *"htmlFor="inputNome">
                                   <input type="text" id="inputNome" className="form-control" name="nome" onChange={e => this.setState({nome:e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text" id="inputEmail" className="form-control"name="email" onChange={e => this.setState({email:e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Senha: *"htmlFor="inputSenha">
                                   <input type="password" id="inputSenha" className="form-control" name="senha" onChange={e => this.setState({senha:e.target.value})}/>
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" id="inputRepitaSenha" className="form-control"name="senha" onChange={e => this.setState({senhaRepeticao:e.target.value})}/>
                            </FormGroup>
                           <button onClick={this.cadastrar}  type="button" className="btn btn-success"><i className="pi pi-save"></i>  Salvar</button>
                           <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times-circle"></i> Cancelar</button>
                            </div>
                     </div>
                  </div>
            </Card>            

        )
    }
}

export default withRouter(CadastroUsuario)