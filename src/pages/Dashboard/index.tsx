import { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const {signOut} = useContext(AuthContext)

  return (
    <>
      <View>
        <Text>Dashboard</Text>
      </View>
      <TouchableOpacity onPress={signOut}>
        <Text>LOGOUT</Text>
      </TouchableOpacity>
    </>
  );
};

export default Dashboard;
