import ApiService from "../apiservice";
import ErroValidacao from "./exeption/ErroValidacao";

class usuarioService extends ApiService{

    constructor(){
            super('/api/usuarios')
   }

   autenticar(credenciais){
    return this.post('/autenticar',credenciais);
}
obterSaldoPorUsuario(id){
    return this.get(`/${id}/saldo`);
}
salvarUsuario(usuario){
    return this.post('', usuario)
}
validar(usuario){

    const erros =[]
   
    if(!usuario.nome){

        erros.push('O campo nome é obrigatorio.')
    }
    if(!usuario.email){

        erros.push('O campo email é obrigatorio.')

    } else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){

        erros.push('informe um email invalido')

    }
    if(!usuario.senha || !usuario.senhaRepeticao){

        erros.push('Digite a senha 2x')

    }else if (usuario.senha !== usuario.senhaRepeticao){

        erros.push('As senhas não batem.')

    }
    if(erros && erros.length>0){

        throw new ErroValidacao(erros);
    }

}

}

export default usuarioService