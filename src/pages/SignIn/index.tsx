import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

const SignIn = () => {
  const { signIn } = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (login === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    await signIn({ email: login, password: password });

    setLogin("");
    setPassword("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.textLogo1}>The </Text>
        <Text style={styles.textLogo2}>Pizza</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={login}
          onChangeText={(text) => setLogin(text)}
        />
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1d1d2e",
  },
  logo: {
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textLogo1: {
    fontSize: 54,
    color: "white",
  },
  textLogo2: {
    fontSize: 54,
    color: "red",
  },
  inputContainer: {
    maxWidth: "85%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#fff",
    marginBottom: 22,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    height: 45,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 12,
    width: "100%",
    maxWidth: "85%",
    borderRadius: 8,
    height: 45,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default SignIn;
