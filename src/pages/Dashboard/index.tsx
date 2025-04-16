import { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";

import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Dashboard = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const [tableNumber, setTableNumber] = useState('')

  const { signOut } = useContext(AuthContext);

  async function openOrder() {
    if (tableNumber === '') {
      alert('Preencha o número da mesa')
      return
    }

    navigation.navigate('Order', {
      number: tableNumber,
      order_id: '5a0be079-338f-4f50-80ea-d6f9bdd285fe'
    })

    // try {
    //   axios.post('http://localhost:5432/orders', { 
    //     tableNumber: tableNumber,
    //   })
    // } catch (error) {
    //   console.log('Erro ao criar a mesa', error);
      
    // }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#f0f0f0"
        style={styles.input}
        keyboardType="numeric"
        value={tableNumber}
        onChangeText={(text) => setTableNumber(text)}
      />
      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>ABRIR MESA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e"
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    color: '#fff',
    fontWeight: '600'
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    textAlign: 'center',
    color: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: '#101026'
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    color: '#101026',
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default Dashboard;
