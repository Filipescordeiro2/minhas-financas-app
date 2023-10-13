import Localstorage from "./localstorage";

export const USUARIO_LOGADO='_usuario_logado'
export default class AuthService{
    static isUsuarioAutenticado(){
        const usuario = Localstorage.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado(){
        Localstorage.removerItem(USUARIO_LOGADO)
    }
   static logar(usuario){

        Localstorage.adicioanarItem(USUARIO_LOGADO,usuario)
    }
   static obterUsuarioAutenticado(){
        return Localstorage.obterItem(USUARIO_LOGADO)
    }
}