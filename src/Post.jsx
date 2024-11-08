export const Post = ({ props }) => {

    console.log(props)
    return (
        <>
        <div className="col-6">
        <div className="card">
                <img src={props.image} max-width={300} height={400}/><br />
                {props.tags.map(tag => <span>{tag} </span>)}
                <p>{props.owner.firstName} {props.owner.lastName}</p>
            </div>
        </div>

        </>
    )
}