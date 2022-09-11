import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Alerta } from '../../componentes/Alerta';
import Botao from '../../componentes/Botao';
import { Input } from '../../componentes/Input';
import { auth } from '../../config/firebase';
import { logar } from '../../servicos/firebase/auth';
import estilos from './estilos';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroEmail, setErroEmail] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [mostrarMensagem, setMostrarMensagem] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const estadoUsuario = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Principal")
      }
    });
    return () => estadoUsuario();
  }, [])

  async function efetuarLogin(){
    setErroEmail(false);
    setErroSenha(false);

    const resultado = await logar(email, senha);
    setMensagem(resultado.mensagem);
    setMostrarMensagem(true);
    if (resultado.erro) {
      if(resultado.tipo == 'email'){
        setErroEmail(true);
      }
      else if(resultado.tipo == 'senha'){
        setErroSenha(true)
      }
    }
    else {
      setEmail('');
      setSenha('');
      navigation.navigate('Principal');
    }
  }

  return (
    <View style={estilos.container}>
      <Input 
        label="E-mail"
        value={email}
        onChangeText={texto => setEmail(texto)}
        messageErro={mensagem}
        error={erroEmail}
      />
      <Input
        label="Senha"
        value={senha}
        onChangeText={texto => setSenha(texto)}
        error={erroSenha}
        messageErro={mensagem}
        secureTextEntry
      />
      
      <Botao onPress={() => { efetuarLogin() }}>LOGAR</Botao>
      <Botao 
        onPress={() => { navigation.navigate('Cadastro') }}
      >
        CADASTRAR USUÁRIO
      </Botao>

      <Alerta 
        mensagem={mensagem}
        mostrar={mostrarMensagem} 
        setMostrar={setMostrarMensagem}
      />
    </View>
  );
}
