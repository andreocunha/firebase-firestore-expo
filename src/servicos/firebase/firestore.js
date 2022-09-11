import { db } from "../../config/firebase";
import { 
  addDoc, 
  collection, 
  deleteDoc, 
  doc, 
  getDocs, 
  onSnapshot, 
  query, 
  updateDoc 
} from "firebase/firestore";

const tipo = "produtos"

export async function pegarProdutosTempoReal(setProdutos){
  const q = query(collection(db, tipo));
  onSnapshot(q, (querySnapshot) => {
    const produtos = [];
    querySnapshot.forEach((doc) => {
        produtos.push({ ...doc.data(), id: doc.id });
    });
    setProdutos(produtos);
  });
}

// pega os dados dos produtos
export async function pegarProdutos() {
  return new Promise(async (resolve, reject) => {
    try {
      const querySnapshot = await getDocs(collection(db, tipo));
      resolve(querySnapshot?.docs?.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    catch (error) {
      reject(error);
    }
  });
}

// adiciona um novo post
export async function salvarProduto(data) {
  try {
    await addDoc(collection(db, tipo), data);
    return 'ok';
  } catch (e) {
    console.error("Error adding document: ", e);
    return 'error';
  }
}

// atualizar um produto
export async function atualizarProduto(produtoID, data) {
  try {
    const docRef = doc(db, tipo, produtoID);
    await updateDoc(docRef, data);
    return 'ok';
  } catch (e) {
    console.error("Error adding document: ", e);
    return 'error';
  }
}

// deletar um produto
export async function deletarProduto(produtoID) {
  try {
    const docRef = doc(db, tipo, produtoID);
    await deleteDoc(docRef);
    return 'ok';
  } catch (e) {
    console.error("Error adding document: ", e);
    return 'error';
  }
}