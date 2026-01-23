import { Outlet, useNavigation } from "react-router";
import Header from "./Header";

export default function AppLayout() {
  const navigation = useNavigation();

  return (
    <div>
      <Header />
      {navigation.state === "loading" && <p>Loading...</p>}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
