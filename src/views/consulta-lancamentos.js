import React from "react";
import {withRouter} from "react-router-dom";
import Card from "../componets/card";
import FormGroup from "../componets/form-group";
class ConsultaLancamentos extends React.Component{
    render() {
        return(
           <Card title="Consulta Lançamento">
               <div className="row">
                   <div className="col-md-6">
                       <div className="bs-component">
                           <FormGroup htmlFor="inputAno" label="Ano">
                               <input type="text" className="form-control" id="inputAno" aria-describedby="emailHelp" placeholder="Digite o Ano"/>
                           </FormGroup>
                           <FormGroup htmlFor="inputMes" label="Mes">

                           </FormGroup>
                       </div>
                   </div>
               </div>
           </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)