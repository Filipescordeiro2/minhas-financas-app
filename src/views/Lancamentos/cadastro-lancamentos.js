import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import LancamentoService from "../../App/service/lancamentoService";
import SelectMenu from "../../componets/selectMenu";
import * as messages from '../../componets/toastr'
import Localstorage from "../../App/service/localstorage";
import localStorageService from "../../App/service/localstorage";
class CadastroLancamentos extends React.Component{

    state={

        id:null,
        descricao:'',
        valor:'',
        mes:'',
        ano:'',
        tipo:'',
        status:''

    }
    constructor() {
        super();
        this.service=new LancamentoService();
    }
    subimit =() =>{
        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        const{descricao,valor,mes,ano,tipo} = this.state;

        const lancamento ={descricao,valor,mes,ano,tipo,usuario:usuarioLogado.id}

       this.service.salvar(lancamento)
           .then(response=>{
               this.props.history.push('/consulta-lancamentos')
             messages.mensagemSucesso('lancamentoCadatrado com Sucesso')
           }).catch(error =>{
               messages.mensagemErro(error.response.data)
       })
    }
    handleChange = (event)=>{
        const value=event.target.value;
        const name =event.target.name;

        this.setState({ [name]: value });
    }
    render() {
        const tipos =this.service.obterListaTipo();
        const  meses = this.service.obterListaMeses();

        return(
            <Card title="Cadastro de Lancamento">
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input id="inputDescricao" type="text" className="form-control"
                               name="descricao" value={this.state.descricao} onChange={this.handleChange}/>
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                     <FormGroup id="inputAno" label="Ano: *">
                         <input id="inputAno" type="text" className="form-control"
                               name="ano" value={this.state.ano} onChange={this.handleChange}/>
                     </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control"
                           name="mes" value={this.state.mes} onChange={this.handleChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="text" className="form-control"
                                   name="valor" value={this.state.valor} onChange={this.handleChange}/>

                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu id="inputTipo" lista={tipos} className="form-control"
                                    name="tipo" value={this.state.tipo} onChange={this.handleChange}/>
                    </FormGroup>
                    </div>
                </div>
                    <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: *">
                    <input id="inputStatus" type="text" className="form-control" disabled={true}
                           name="status" value={this.state.status}/>

                </FormGroup>
                    </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">

                <button onClick={this.subimit} className="btn btn-success">Salvar</button>
                <button onClick={e=> this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>

                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroLancamentos)