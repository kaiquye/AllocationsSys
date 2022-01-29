import './Style.css'

export default function Table(props){

    return(
        <>
            <table className={props.className}>
                {props.children}
            </table>
        </>
    )
}