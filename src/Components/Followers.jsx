

function GetFollowers(props){

    return(
        <div id='followerscontainer'>
            <p id='repolist' onClick={() => {
                
                props.setHideRepo(!props.hideRepo)
                
                }} 
            >
                Repositories: {props.repoLength}
            </p>

            <p id='followersP'>Followers: {props.followers}</p>
            <p id='followingP'>Following: {props.following}</p>
        </div>
    )
}

export default GetFollowers;