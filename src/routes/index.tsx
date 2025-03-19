import React from "react";
import { ActivityIndicator, View } from "react-native";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

const Routes = () => {
  const isAuthenticated = false;
  const loading = false;

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1d1d2e",
        }}
      >
        <ActivityIndicator size={60} color="#f5f7fb"/>
      </View>
    );
  }

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
