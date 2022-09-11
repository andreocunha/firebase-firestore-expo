import { auth } from "../../config/firebase";
import { 
  AuthErrorCodes,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

export async function logar(email, senha){
  if (email === '') {
    return {
      erro: true,
      tipo: 'email',
      mensagem: "O email é obrigatório"
    };
  }

  if (senha === '') {
    return {
      erro: true,
      tipo: 'senha',
      mensagem: "A senha é obrigatória"
    };
  }
  
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((usuario) => {
      console.log(usuario);
      return {
        erro: false,
        mensagem: "Login realizado com sucesso"
      }
    })
    .catch((error) => {
      console.log(error);
      return {
        erro: true,
        tipo: 'firebase',
        mensagem: "E-mail ou senha inválidos"
      }
    });
  return resultado;
}

export async function cadastrar(email, senha, confirmaSenha){
  if (email === '') {
    return {
      erro: true,
      tipo: 'email',
      mensagem: "O email é obrigatório"
    };
  }

  if (senha === '') {
    return {
      erro: true,
      tipo: 'senha',
      mensagem: "A senha é obrigatória"
    };
  }

  if (confirmaSenha !== senha ) {
    return {
      erro: true,
      tipo: 'confirmaSenha',
      mensagem: "As senhas não conferem"
    };
  }

  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      console.log(userCredential);
      return {
        erro: false,
        mensagem: "Usuário cadastrado com sucesso"
      }
    })
    .catch((error) => {
      console.log(error.message);
      
      let mensagem = "";

      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          mensagem = "E-mail já cadastrado";
          break;
        case AuthErrorCodes.INVALID_EMAIL:
          mensagem = "E-mail inválido";
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          mensagem = "A senha deve ter no mínimo 6 caracteres";
          break;
        default:
          mensagem = "Erro desconhecido";
          break;
      }

      return {
        erro: true,
        tipo: 'firebase',
        mensagem: mensagem
      }
    });

  return resultado;
}