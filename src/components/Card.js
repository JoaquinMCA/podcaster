import classes from "../styles/Card.module.css";

function Card(props) {
  return (
    <div
      className={`${props.extraClasses ? props.extraClasses : ""} ${
        classes.card
      } `}
    >
      {props.children}
    </div>
  );
}

export default Card;
