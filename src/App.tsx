import { useEffect, useState } from "react";
import { Center, Grid, GridItem } from "@chakra-ui/react";

import { User } from "./hooks/useUser";
import AppRoutes from "./components/Routes";
import auth from "./services/auth";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <Grid
      templateAreas={{
        base: `"nav""main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{ base: "100%", lg: "150px 1fr" }}
    >
      <GridItem area="nav">
        <NavBar user={user} />
      </GridItem>
      <AppRoutes />
    </Grid>
  );
}

export default App;
