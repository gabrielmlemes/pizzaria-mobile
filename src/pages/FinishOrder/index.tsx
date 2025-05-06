import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { api } from "../../services/api";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailsParams = {
  FinishOrder: {
    number: string | number;
    order_id: string;
  };
};

type FinishOrderRouteProps = RouteProp<RouteDetailsParams, "FinishOrder">;

const FinishOrder = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const route = useRoute<FinishOrderRouteProps>();

  const [loading, setLoading] = useState(false);

  async function handleFinishOrder() {
    setLoading(true);
    try {
      await api.put("/order/send", {
        order_id: route.params?.order_id,
      });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Erro ao finalizar o pedido", error);
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.finishText}>Deseja finalizar o pedido?</Text>
      <Text style={[styles.finishText, { fontWeight: "bold", marginTop: 20 }]}>
        Mesa: {route.params.number}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {loading ? "Enviando pedido" : "Finalizar pedido"}
        </Text>
        {loading ? (
          <ActivityIndicator size={25} color="black" />
        ) : (
          <FontAwesome5 name="cart-plus" size={24} color="black" />
        )}
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
    paddingHorizontal: "7%",
    paddingVertical: "5%",
    maxWidth: "100%",
  },
  finishText: {
    fontSize: 28,
    color: "#fff",
  },
  button: {
    backgroundColor: "green",
    paddingHorizontal: 12,
    width: "100%",
    maxWidth: "85%",
    borderRadius: 8,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginTop: 30,
  },
});

export default FinishOrder;
