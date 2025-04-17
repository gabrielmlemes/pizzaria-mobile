import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import ModalPicker from "../../components/ModalPicker";

type RouteDetailsParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailsParams, "Order">;

export interface CategoryProps {
  id: string;
  name: string;
}

const Order = () => {
  const navigation = useNavigation();

  const route = useRoute<OrderRouteProps>();
  const [qtd, setQtd] = useState("");
  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryProps>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const fetchData = async () => {
    await api.get("/category").then((response) => {
      setCategory(response.data);
      setSelectedCategory(response.data[0]);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleDelete(id: string) {
    try {
      await api.delete("/order", {
        params: {
          id: id,
        },
      });

      navigation.goBack();
    } catch (error) {
      console.log("Erro ao excluir mesa", error);
    }
  }

  function handleModal() {
    setModalCategoryVisible(true);
  }

  function closeModal() {
    setModalCategoryVisible(false);
  }

  function handleChangeCategory(item:CategoryProps) {
    setSelectedCategory(item)
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.tableNumber}>Mesa {route.params.number}</Text>
        <TouchableOpacity onPress={() => handleDelete(route.params?.order_id)}>
          <Feather name="trash-2" size={32} color="red" />
        </TouchableOpacity>
      </View>

      {/* refact */}
      <TouchableOpacity style={styles.input} onPress={handleModal}>
        <Text style={styles.orderText}>
          {selectedCategory?.name
            ? selectedCategory?.name
            : "Nenhuma categoria disponível"}
        </Text>
      </TouchableOpacity>

      {modalCategoryVisible && (
        <Modal
          transparent={true}
          visible={modalCategoryVisible}
          animationType="fade"
         >
          <ModalPicker
            selectedItem={handleChangeCategory}
            closeModal={closeModal}
            category={category}
          />
        </Modal>
      )}

      <TouchableOpacity style={styles.input}></TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[
            styles.input,
            { width: "60%", fontSize: 20, textAlign: "center" },
          ]}
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          value={qtd}
          onChangeText={(text) => setQtd(text)}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.nextText}>Avançar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1d1d2e",
    paddingHorizontal: "7%",
    maxWidth: "100%",
  },
  table: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 22,
    marginBottom: 28,
  },
  tableNumber: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#101026",
    color: "#fff",
    borderRadius: 4,
    width: "100%",
    height: 50,
    marginBottom: 20,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18,
  },
  orderText: {
    fontSize: 18,
    color: "#f0f0f0",
    paddingLeft: 12,
  },
  qtdContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  qtdText: {
    fontSize: 24,
    color: "#f0f0f0",
    fontWeight: "bold",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  nextBtn: {
    backgroundColor: "green",
    height: 50,
    justifyContent: "center",
    width: "60%",
    borderRadius: 4,
  },
  nextText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "#32C5FF",
    height: 50,
    justifyContent: "center",
    width: "35%",
    borderRadius: 4,
  },
  addText: {
    fontSize: 30,
    fontWeight: "bold",
    borderRadius: 4,
    color: "#f0f0f0",
    textAlign: "center",
  },
});

export default Order;
