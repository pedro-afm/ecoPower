import './Button.css'

export default function Button (props){
    return(
        <button className="rounded-button">{props.name}</button>
    )
}