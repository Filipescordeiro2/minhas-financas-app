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
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



class ConsultaLancamentos extends React.Component{

    state={
        ano:'',
        mes:'',
        tipo:'',
        descricao: '',
        showConfirmDialog:false,
        lancamentoDeletar:{},
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
    abrirConfirmacao=(lancamento)=>{

        this.setState({showConfirmDialog:true,lancamentoDeletar:lancamento})

    }
    preparaFormularioCadastro =() =>{
        this.props.history.push('/cadastro-lancamentos')
    }

    cancelarDelecao=()=>{
        this.setState({showConfirmDialog:false,lancamentoDeletar:{}})
    }
    deletar = () =>{
     this.service.deletar(this.state.lancamentoDeletar.id)
         .then(response=>{
            const lancamentos= this.state.lancamentos;
            const index=lancamentos.indexOf(this.state.lancamentoDeletar);
            lancamentos.slice(index,1);
            this.setState({lancamentos:lancamentos,showConfirmDialog:false})
             messages.mensagemSucesso('Lancamento deletado com sucesso')
     }).catch(error =>{
         messages.mensagemErro('Erro ao deletar')
     })
    }
    render() {
        const  meses = this.service.obterListaMeses();
        const tipo = this.service.obterListaTipo();

        const confirmDialogFooter=(
            <div>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.cancelarDelecao} className="p-button-text" />
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} autoFocus />
            </div>
        );

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
                           <button onClick={this.preparaFormularioCadastro} type="button" className="btn btn-danger">Cadastrar</button>
                       </div>
                   </div>
               </div>
               <br/>
               <div className="row">
                   <div className="col-md-12">
                     <div className="bs-component">
                      <LancamentosTable lancamentos={this.state.lancamentos} deleteAction={this.abrirConfirmacao} editAction={this.editar}/>
                     </div>
                   </div>
               </div>
               <div>
                   <Dialog
                       header="Header"
                       visible={this.state.showConfirmDialog}
                       style={{ width: '50vw' }}
                       footer={confirmDialogFooter}
                       onHide={() => this.setState({showConfirmDialog: false})}>
                       <p className="m-0">
                           Confirma a exclusão deste lancamento?
                       </p>
                   </Dialog>
               </div>
           </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)