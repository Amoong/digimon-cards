import "./Card.css";

function Card(props) {
  const {
    data: { imageSrc, name },
  } = props;

  return (
    <div className="Card">
      <div className="Card__translater">
        <button className="Card__rotator">
          <img
            className="Card__back"
            src="/back.png"
            alt="Back of digimon card"
          />
          <div className="Card__front">
            <img src={imageSrc} alt={name} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Card;
