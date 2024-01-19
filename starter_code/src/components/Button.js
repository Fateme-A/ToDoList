const Button = ({ icon, onClick }) => {
  return (
    <button className="card-button" onClick={onClick}>
      {icon && <span className="button-icon">{icon}</span>}
    </button>
  );
};

export default Button;
