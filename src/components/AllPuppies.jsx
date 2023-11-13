import { useEffect, useState } from "react"
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom"

function AllPuppies () {

  const [ puppies, setPuppies ] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    // Runs the fetchPuppies function after the page loads
    fetchPuppies()

    //only runs once because of the [] second argument
  }, [])

  async function fetchPuppies () {
    // grab puppies from API

    let API = 'https://fsa-puppy-bowl.herokuapp.com/api/2309-FTB-ET-WEB-FT/'

    try {

    const { data: response } = await Axios.get(`${API}/players`)

    const players = response.data.players

    // console.log ('response', response)
    // console.log ('players', players)

    setPuppies (players)
    }
    catch (err){
      console.error (err.message)
    }
  }
  
  async function removePuppy(id) {
    let API = 'https://fsa-puppy-bowl.herokuapp.com/api/2309-FTB-ET-WEB-FT/'

    try {

      await Axios.delete(`${API}/players/${id}`)

      fetchPuppies()
    }
    catch(err) {
      console.error(err)
    }
  }

  return (
    <>
      <ul className="puppies-container">
        {
          puppies.length ?
          puppies.map(puppy => {
            return (
              <li key={puppy.id}>
                <h3>{puppy.name}</h3>
                <img src={puppy.imageUrl} />
                <button onClick={() => navigate(`/details/${puppy.id}`)}>Show Details</button>
                <button className="deleteBtn" onClick={() => removePuppy(puppy.id)}>X</button>
              </li>
            )
          }) :
          <h2>Loading ...</h2>
        }
      </ul>
    </>
  )
}

export default AllPuppies