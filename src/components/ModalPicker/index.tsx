import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { CategoryProps } from "../../pages/Order";

interface ModalPickerProps {
  selectedItem: (item: CategoryProps) => void;
  closeModal: () => void;
  category: CategoryProps[];
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const ModalPicker = ({
  category,
  closeModal,
  selectedItem,
}: ModalPickerProps) => {
    
  const onPressItem = (item: CategoryProps) => {
    selectedItem(item),
    closeModal();
  };

  return (
    <TouchableOpacity onPress={closeModal} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Selecione uma categoria</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {category.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => onPressItem(item)}
              style={styles.item}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: WIDTH - 25,
    height: HEIGHT / 2,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#8a8a8a",
    borderRadius: 4,
  },
  title: {
    fontSize: 28,
    color: "#333",
    textAlign: "center",
    paddingVertical: 8,
    fontWeight: "bold",
    borderBottomWidth: 1
  },
  item: {
    height: 50,
    backgroundColor: "#101026",
    borderRadius: 4,
    marginTop: 12,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ModalPicker;
