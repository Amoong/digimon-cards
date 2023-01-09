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
      <h1>Digimon Cards</h1>
      {dataList ? <CardList dataList={dataList} /> : <span>Loading...</span>}
    </div>
  );
}

export default App;
