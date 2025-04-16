import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>
      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#f0f0f0"
        style={styles.input}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button}>
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
