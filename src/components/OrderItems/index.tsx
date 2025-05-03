import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { api } from "../../services/api";

interface OrderItemsProps {
  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };
  deleteItem: (id: string) => void;
}

const OrderItems = ({ data, deleteItem }: OrderItemsProps) => {

  function handleDeleteItem() {
    deleteItem(data.id);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {data.amount} - {data.name}
      </Text>
      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101026",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 12,
  },

  text: {
    fontSize: 18,
    color: "#f0f0f0",
  },
});
export default OrderItems;
