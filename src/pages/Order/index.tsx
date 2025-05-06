import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";
import ModalPicker from "../../components/ModalPicker";
import OrderItems from "../../components/OrderItems";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";

type RouteDetailsParams = {
  Order: {
    number: string | number;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouteDetailsParams, "Order">;

interface ProductsProps {
  id: string;
  name: string;
}

export interface CategoryProps {
  id: string;
  name: string;
}

export interface ItemsProps {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

const Order = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const route = useRoute<OrderRouteProps>();

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryProps | undefined
  >();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductsProps[] | []>([]);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductsProps | undefined
  >();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [amount, setAmount] = useState("");
  const [items, setItems] = useState<ItemsProps[] | []>([]);

  const loadCategory = async () => {
    await api.get("/category").then((response) => {
      setCategory(response.data);
      setSelectedCategory(response.data[0]);
    });
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const loadProducts = async () => {
    const res = await api.get("/category/product", {
      params: {
        id: selectedCategory?.id,
      },
    });

    setProducts(res.data);
    setSelectedProduct(res.data[0]);
  };

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

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
  function handleChangeCategory(item: CategoryProps) {
    setSelectedCategory(item);
  }
  function handleChangeProducs(item: ProductsProps) {
    setSelectedProduct(item);
  }
  async function handleAddItem() {
    if (!selectedProduct || !selectedCategory || !amount) return;

    const res = await api.post("/order/item", {
      order_id: route.params?.order_id,
      product_id: selectedProduct?.id,
      amount: Number(amount),
    });

    const data = {
      id: res.data.id,
      product_id: selectedProduct?.id as string,
      name: selectedProduct?.name as string,
      amount: amount,
    };

    setItems((oldArray) => [...oldArray, data]);
  }

  async function handleDeleteItem(id: string) {
    await api.delete("/order/item", {
      params: {
        item_id: id,
      },
    });

    setItems((oldArray) => oldArray.filter((item) => item.id !== id));
  }

  async function sendOrder() {
    navigation.navigate("FinishOrder", {
      order_id: route.params?.order_id,
      number: route.params.number,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.tableNumber}>Mesa {route.params.number}</Text>
        {!items ||
          (items.length === 0 && (
            <TouchableOpacity
              onPress={() => handleDelete(route.params?.order_id)}
            >
              <Feather name="trash-2" size={32} color="red" />
            </TouchableOpacity>
          ))}
      </View>

      {/* categorias */}
      {category.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={styles.orderText}>
            {selectedCategory?.name
              ? selectedCategory?.name
              : "Nenhuma categoria disponível"}
          </Text>
        </TouchableOpacity>
      )}

      {/* modal de categorias */}
      {modalCategoryVisible && (
        <Modal
          transparent={true}
          visible={modalCategoryVisible}
          animationType="fade"
        >
          <ModalPicker
            selectedItem={handleChangeCategory}
            closeModal={() => setModalCategoryVisible(false)}
            options={category}
          />
        </Modal>
      )}

      {/* produtos */}
      {products.length !== 0 && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={styles.orderText}>{selectedProduct?.name}</Text>
        </TouchableOpacity>
      )}

      {/* modal de produtos por categoria */}
      {modalProductVisible && (
        <Modal
          transparent={true}
          visible={modalProductVisible}
          animationType="fade"
        >
          <ModalPicker
            selectedItem={handleChangeProducs}
            closeModal={() => setModalProductVisible(false)}
            options={products}
          />
        </Modal>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[
            styles.input,
            { width: "60%", fontSize: 20, textAlign: "center" },
          ]}
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddItem}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextBtn}
          disabled={items && items.length === 0}
          onPress={sendOrder}
        >
          <Text
            style={[
              styles.nextText,
              { opacity: items && items.length === 0 ? 0.3 : 1 },
            ]}
          >
            Avançar
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 20 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderItems data={item} deleteItem={handleDeleteItem} />
        )}
      />
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
    paddingTop: 25,
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
