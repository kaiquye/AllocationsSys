import './Style.css'

export default function Form (props){

    return(
        <>
            <form className={props.className} onSubmit={props.onSubmit} className={props.className} >
                {props.children}
            </form>
        </>
    )
}