import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ResultTable: React.FC = () => {
  const [data, setData] = useState([])
  async function getData() {
    const res = await axios.get('/leaderboard')
    setData(res.data)
  }

  useEffect(() => {
    getData()
  },[])

  return (
    <div className='table-container'>
      <h1>Top 10 Scores</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.map((player: {_id: String, name: String, score: Number}, index: number) => {
              return <tr key={`${player._id}`}>
                <td>{index + 1}</td>
                <td>{player.name}</td>
                <td>{(player.score).toString()}</td>
              </tr>
            })}
        </tbody>
      </table>
      <Link to="/" className='back-btn'>Back</Link>
    </div>
  )
}

export default ResultTable

/* Style the page */