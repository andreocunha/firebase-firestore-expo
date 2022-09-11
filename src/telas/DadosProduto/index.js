import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import estilos from './estilos';
import { Input } from '../../componentes/Input';
import Botao from '../../componentes/Botao';
import { atualizarProduto, deletarProduto, salvarProduto } from '../../servicos/firebase/firestore';
import { Alerta } from '../../componentes/Alerta';
import Icon from 'react-native-vector-icons/Feather';

export default function DadosProduto({ route, navigation}){
  const [nome, setNome] = useState(route.params?.dados?.nome || '');
  const [preco, setPreco] = useState(route.params?.dados?.preco || '');
  const [mensagem, setMensagem] = useState('');
  const [mostrarMensagem, setMostrarMensagem] = useState(false);

  async function salvar() {
    if(nome == '' || preco == ''){
      setMensagem('Preencha todos os campos');
      setMostrarMensagem(true);
      return;
    }
    let resultado = '';
    if(route.params){
      resultado = await atualizarProduto(route.params?.dados.id, { nome, preco });
    } else {
      resultado = await salvarProduto({ nome, preco });
    }

    if(resultado != 'ok') {
      setMensagem("Erro ao salvar o produto");
      setMostrarMensagem(true);
      return
    }
    navigation.goBack();
  }

  async function deletar(){
    Alert.alert(
      'Deletar produto',
      'Tem certeza que deseja deletar esse produto?',
      [
        {
          text: 'Não',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Sim', onPress: () => {
          deletarProduto(route.params?.dados.id); navigation.goBack();}},
      ],
      {cancelable: false},
    );
  }

  return (
    <View style={estilos.container}>
      {
      route.params?.dados && (
      <TouchableOpacity onPress={deletar}>
        <Icon 
          name={'trash-2'} 
          size={20} 
          color="#000"
        />
      </TouchableOpacity>)
      }

      <Input 
        label="Nome do produto"
        value={nome}
        onChangeText={texto => setNome(texto)}
      />
      <Input 
        label="Preço do produto"
        value={preco}
        onChangeText={texto => setPreco(texto)}
      />

    <Botao onPress={salvar}>SALVAR</Botao>

    <Alerta 
      mensagem={mensagem}
      mostrar={mostrarMensagem} 
      setMostrar={setMostrarMensagem}
    />
    </View>
  );
}
