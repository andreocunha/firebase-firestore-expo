import React, { useState } from 'react';
import { View } from 'react-native';
import Botao from '../../componentes/Botao';
import { Input } from '../../componentes/Input';
import estilos from './estilos';
import { Alerta } from '../../componentes/Alerta';
import { cadastrar } from '../../servicos/firebase/auth';

export default function Cadastro({ navigation }) {  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [erroConfirmaSenha, setErroConfirmaSenha] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState('');

  async function efetuarCadastro() {
    setErroEmail(false);
    setErroSenha(false);
    setErroConfirmaSenha(false);

    const resultado = await cadastrar(email, senha, confirmaSenha);
    setMensagem(resultado.mensagem);
    setMostrarMensagem(true);
    if (resultado.erro) {
      if(resultado.tipo == 'email'){
        setErroEmail(true);
      }
      else if(resultado.tipo == 'senha'){
        setErroSenha(true)
      }
      else if(resultado.tipo == 'confirmaSenha'){
        setErroConfirmaSenha(true)
      }
    }
    else {
      setEmail('');
      setSenha('');
      setConfirmaSenha('');
      navigation.goBack();
    }
  }

  return (
    <View style={estilos.container}>
      <Input 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        error={erroEmail}
        messageErro={mensagem}
      />
      <Input
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        error={erroSenha}
        messageErro={mensagem}
        secureTextEntry
      />

      <Input
        label="Confirmar Senha"
        value={confirmaSenha}
        onChangeText={texto => setConfirmaSenha(texto)}
        error={erroConfirmaSenha}
        messageErro={mensagem}
        secureTextEntry
      />
      
      <Botao onPress={() => { efetuarCadastro() }}>CADASTRAR</Botao>

      <Alerta 
        mensagem={mensagem}
        mostrar={mostrarMensagem} 
        setMostrar={setMostrarMensagem}
      />

    </View>
  );
}
