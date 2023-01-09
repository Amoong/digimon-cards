import Card from "./Card";

import "./CardList.css";

function CardList(props) {
  const { dataList } = props;

  return (
    <div className="CardList">
      {dataList.map((data) => (
        <Card key={data.id} data={data} />
      ))}
    </div>
  );
}

export default CardList;
