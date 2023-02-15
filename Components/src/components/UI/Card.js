import './Card.css';


// children is a reserved keyword
function Card(props){
    const classes = 'card ' + props.className;
    return(
        <div className={classes}>{props.children}</div>
    )

}

export default Card;