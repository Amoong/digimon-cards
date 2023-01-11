import CardList from "./components/CardList";

import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [dataList, setDataList] = useState();

  const initDatas = async () => {
    const cardFetch = await fetch("/data.json");
    const cards = await cardFetch.json();
    setDataList(cards);
  };

  useEffect(() => {
    initDatas();
  }, []);

  return (
    <div className="App">
      <h1 className="title">Digimon Cards</h1>
      <h2 className="subtitle">Common</h2>
      {dataList ? <CardList dataList={dataList.slice(0, 3)} /> : <span>Loading...</span>}
      <h2 className="subtitle">Rare Holo</h2>
      {dataList ? <CardList dataList={dataList.slice(3, 6)} /> : <span>Loading...</span>}
      <h2 className="subtitle">SuperRare</h2>
      {dataList ? <CardList dataList={dataList.slice(6, 9)} /> : <span>Loading...</span>}
    </div>
  );
}

export default App;
