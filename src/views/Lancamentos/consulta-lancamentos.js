import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../../componets/card";
import FormGroup from "../../componets/form-group";
import selectMenu from "../../componets/selectMenu";
import SelectMenu from "../../componets/selectMenu";
import lancamentosTable from "./lancamentosTable";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../App/service/lancamentoService";
import localStorageService from "../../App/service/localstorage";
import * as messages from '../../componets/toastr'

class ConsultaLancamentos extends React.Component{

    state={
        ano:'',
        mes:'',
        tipo:'',
        descricao: '',
        lancamentos:[]
    }
    constructor() {
        super();
        this.service=new LancamentoService();
    }
    buscar =() =>{
        if (!this.state.ano){
            messages.mensagemErro('O preenchimento do campo Ano é obrigatorio')
            return false;

        }
        const usuarioLogado = localStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro ={
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao:this.state.descricao,
            usuario: usuarioLogado.id
        }
       this.service.consultar(lancamentoFiltro).then(responsa => {
           this.setState({lancamentos:responsa.data})
       }).catch(error =>{
           console.log(error)
       })
    }
    editar =(id) =>{
        console.log('editando',id)
    }
    deletar = (id) =>{
        console.log('deletando',id)
    }
    render() {
        const  meses = this.service.obterListaMeses();
        const tipo = this.service.obterListaTipo();

        return(
           <Card title="Consulta Lançamento">
               <div className="row">
                   <div className="col-md-6">
                       <div className="bs-component">
                           <FormGroup htmlFor="inputAno" label="Ano">
                               <input type="text" className="form-control" id="inputAno" value={this.state.ano} onChange={e => this.setState({ano:e.target.value})} placeholder="Digite o Ano"/>
                           </FormGroup>
                           <FormGroup htmlFor="inputMes" label="Mes">
                             <SelectMenu id="inputMes"  value={this.state.mes} onChange={e => this.setState({mes:e.target.value})} className="form-control" lista={meses}/>
                           </FormGroup>
                           <FormGroup htmlFor="inputDescricao" label="Descrição">
                               <input type="text" className="form-control" id="inputDescricao" value={this.state.descricao} onChange={e => this.setState({descricao:e.target.value})} placeholder="Digite a Descrição"/>
                           </FormGroup>
                           <FormGroup htmlFor="inpuTipo" label="Tipo Lançamento: ">
                               <SelectMenu id="inputTipo" value={this.state.tipo} onChange={e => this.setState({tipo:e.target.value})}  className="form-control" lista={tipo}/>
                           </FormGroup>
                           <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                           <button type="button" className="btn btn-danger">Cadastrar</button>
                       </div>
                   </div>
               </div>
               <br/>
               <div className="row">
                   <div className="col-md-12">
                     <div className="bs-component">
                      <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.deletar} editAction={this.editar}/>
                     </div>
                   </div>
               </div>
           </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)