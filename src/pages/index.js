import Image from "next/image";
import { Inter } from "next/font/google";
import Menu from "@/components/Menu";
import Toolkit from "@/components/Toolkit";
import Canvas from "@/components/Canvas";
import { Provider } from "react-redux";
import store from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
  <Provider store={store}>
  <Menu/>
   <Toolkit/>
   <Canvas/>
  </Provider>
    </>
  );
}
