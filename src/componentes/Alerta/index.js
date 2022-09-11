import React from "react";
import { Snackbar } from "react-native-paper";

export function Alerta({ mensagem, mostrar=false, setMostrar }) {

  return (
    <Snackbar
        visible={mostrar}
        onDismiss={() => setMostrar(false)}
        duration={1500}
        action={{
          label: 'OK',
          onPress: () => {
            setMostrar(false);
          }
        }}
      >
        {mensagem}
      </Snackbar>
  )
}