import { Outlet, useNavigation } from "react-router";
import Header from "./Header";
import Hero from "./Hero";

export default function AppLayout() {
  const navigation = useNavigation();

  return (
    <div>
      <Header />
      {navigation.state === "loading" && <p>Loading...</p>}
      <main>
        <Hero />
        <Outlet />
      </main>
    </div>
  );
}
