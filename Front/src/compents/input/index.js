import './Style.css'

export default function Input(props){
    //as propriedades de um elemento são passadas pela props e não pelo context
    return(
        <>
            <input className={props.className} type={props.type} value={props.value} className={props.className} onChange={(resp)=>props.onChange(resp.target.value)}/>
        </>
    )
}
