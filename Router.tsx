import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins></Coins>}></Route>
      </Routes>
      <Routes>
        <Route path="/:coinId" element={<Coin></Coin>}></Route>
        <Route path="price" element={<Price/>}/>
        <Route path="chart" element={<Chart></Chart>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;