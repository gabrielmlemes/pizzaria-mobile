import { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);

  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [tableNumber, setTableNumber] = useState("");

  async function openOrder() {
    if (tableNumber === "") {
      alert("Preencha o número da mesa");
      return;
    }

    try {
      const response = await api.post("/order", {
        table: Number(tableNumber),
      });
      // console.log(response.data);

      navigation.navigate("Order", {
        number: response.data.table,
        order_id: response.data.id,
      });

      setTableNumber('')
    } catch (error) {
      console.log("Erro ao criar a mesa", error);
    }
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

      <TouchableOpacity style={styles.Signoutbutton} onPress={signOut}>
        <MaterialIcons name="logout" size={35} color="red" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  title: {
    fontSize: 48,
    marginBottom: 20,
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "gray",
    textAlign: "center",
    color: "#fff",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    fontSize: 18,
    backgroundColor: "#101026",
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    borderRadius: 4,
  },
  Signoutbutton: {
    width: "8%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#101026",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Dashboard;
