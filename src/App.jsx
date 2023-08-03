import { useState, useEffect } from 'react'
import GetName from './Components/Getname'
import GetFollowers from './Components/Followers'
import Link from './Components/Link'
import GithubButton from './Components/GithubButton'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [newRepo, setNewRepo] = useState([])
  const [hideRepo, setHideRepo] = useState(true)

  const [pic, setPic] = useState(null)

  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)

  const [name, setName] = useState(null)
  const [location, setLocation] = useState(null)
  
  useEffect(() => {
    fetch('https://api.github.com/users/coymags')
    .then((res) => {
      return res.json()
    })
    .then(data => {
      setPic(data.avatar_url)
      setFollowers(data.followers)
      setFollowing(data.following)
      setName(data.name)
      setLocation(data.location)
    })
  }, [])

  useEffect(() =>{
    fetch('https://api.github.com/users/coymags/repos')
    .then((res) =>{
        return res.json()
    })
    .then(data => setNewRepo(data))
},[])
/*
const getPokemon = async () => {
  try {
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
    return pokemon.data
  } catch (error) {
    console.log("Error: ", error)
  }
}
*/
useEffect(() =>{
  fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
  .then((res) => {
    return res.json()
  })
  .then((data) =>{
    console.log(data)
  })
  .catch((err) =>{
    console.log(err)
  })

},[])

  return(
    <>
      <h1>My GitHub Profile</h1>
      <div id='profilecontainer'>
        <div id='imgbox'>
          {
            (pic == null)? 'loading...':<img src={pic} alt=""  id='avatar'/>
          }
        </div>

        <div id='infocontainer'>
          <GetName name={name} location={location}/>
          <GetFollowers followers={followers} following={following} hideRepo={hideRepo} setHideRepo={setHideRepo} repoLength={newRepo.length}/>
          <Link/>
          <GithubButton/>
        </div>
      </div>

      <div id='repocontainer'>
        {

          (hideRepo == true) ? "" : newRepo.map(repo =>{
            const dateUpdated = new Date(repo.created_at).toLocaleDateString({
              year: "numeric",
              month: "long",
              day: "numeric"
            })
            return(
              <div key={repo.id} id='repobox'>
                <p id='reponame'>{repo.name}</p>
                <p id='reponame'>{dateUpdated}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App
