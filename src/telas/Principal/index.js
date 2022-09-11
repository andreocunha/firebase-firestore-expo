import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BotaoAdicao from '../../componentes/BotaoAdicao';
import Cabecalho from '../../componentes/Cabecalho';
import Produto from '../../componentes/Produtos';
import { auth } from '../../config/firebase';
import { pegarProdutosTempoReal } from '../../servicos/firebase/firestore';
import estilos from './estilos';

export default function Principal({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const usuario = auth.currentUser;

  useEffect(() => {
    pegarProdutosTempoReal(setProdutos);
  }, []);

  return (
    <View style={estilos.container}>
      <Cabecalho navigation={navigation} />
      <Text style={estilos.texto}>Usuário: {usuario?.email}</Text>

      {
        produtos.map((produto, index) => (
          <TouchableOpacity 
          style={{ width: '100%' }}
          key={index} 
          onPress={() => navigation.navigate('DadosProduto', { dados: produto })}>
            <Produto nome={produto.nome} preco={produto.preco} />
          </TouchableOpacity>
        ))
      }
      <BotaoAdicao onPress={() => navigation.navigate('DadosProduto')} />
     </View>
  );
}
