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
        status:'',
        usuario:null,
        atualizando:false

    }
    constructor() {
        super();
        this.service=new LancamentoService();
    }

    componentDidMount() {
        const params=this.props.match.params;
        if (params.id){
            this.service.obterPorId(params.id)
                .then(response =>{
                    this.setState({...response.data,atualizando:true})
                }).catch(erros =>{
                    messages.mensagemErro(erros.response.data)
            })
        }
    }

    subimit =() =>{
        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        const{descricao,valor,mes,ano,tipo} = this.state;

        const lancamento ={descricao,valor,mes,ano,tipo,usuario:usuarioLogado.id}

        try {
            this.service.validar(lancamento)

        }catch (erro){
          const mensagens = erro.mensagens;
          mensagens.forEach(msg=>messages.mensagemErro(msg));
          return false;
        }

       this.service.salvar(lancamento)
           .then(response=>{
               this.props.history.push('/consulta-lancamentos')
             messages.mensagemSucesso('lancamento Cadatrado com Sucesso')
           }).catch(error =>{
               messages.mensagemErro(error.response.data)
       })
    }
    atualizar=()=>{

        const{descricao,valor,mes,ano,tipo,status,id,usuario} = this.state;

        const lancamento ={descricao,valor,mes,ano,tipo,status,id,usuario}

        this.service.atualizar(lancamento)
            .then(response=>{
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('lancamento Atualizado com Sucesso')
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
            <Card title={this.state.atualizando? 'Atualização de lancamento':'Cadastro de Lancamento'}>
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
                        {
                            this.state.atualizando?
                                (
                                    <button onClick={this.atualizar} className="btn btn-success"><i className="pi pi-refresh"></i>  Atualizar</button>
                                ) :(
                                    <button onClick={this.subimit} className="btn btn-success"><i className="pi pi-save"></i>  Salvar</button>
                                )
                        }
                        <button onClick={e=> this.props.history.push('/consulta-lancamentos')} className="btn btn-danger"><i className="pi pi-times-circle"></i>  Cancelar</button>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroLancamentos)