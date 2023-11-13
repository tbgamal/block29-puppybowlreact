import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddPuppyForm () {

  const [ name, setName ] = useState ('')
  const [ breed, setBreed ] = useState ('')
  const [ status, setStatus ] = useState ('bench')
  const [ imageUrl, setImageUrl ] = useState ('')
  const [ successMsg, setSuccessMsg ] = useState ('')

  const navigate = useNavigate()
  
  async function handleSubmit(evt) {
    evt.preventDefault() // prevents default behavior of the form
    let API = 'https://fsa-puppy-bowl.herokuapp.com/api/2309-FTB-ET-WEB-FT/'

    try {
      const { data: json } = await axios.post(`${API}/players`, {
        name, breed, status, imageUrl
      })

      if (json.success) {
        setSuccessMsg ('A new player was successfully added')
      }
      else {
        setSuccessMsg ('There was an error in adding new player')
      }

      navigate ('/')
    }
    catch(err){
      console.error (err.message)
    }
  }


  return (
    <div>
      <form onSubmit={handleSubmit}> 
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Breed:
          <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)}/>
        </label>
        <label>
          Status:
          {/* <input type="text" value={status} onChange={(e) => setStatus(e.target.value)}/>
          { status === 'field' || status === 'bench' ? <></> : <h5>status must be either "Bench" or "Field"</h5>}  */}
          <select onChange={(e) => setStatus(e.target.value)}>
            <option value="bench">Bench</option>
            <option value="field">Field</option>
          </select>
        </label>
        <label>
          ImageUrl:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}/>
        </label>

        <button type="submit">Add new puppy</button>
      </form>

      { successMsg }
    </div>
  )
}

export default AddPuppyForm