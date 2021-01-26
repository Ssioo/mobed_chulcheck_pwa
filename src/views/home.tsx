import React from 'react'

const HomeScreen = () => (
  <div>
    <div>MOBED 출석체크</div>
    <button onClick={async () => {
      try {
        const res = await fetch('http://localhost:3001/api/chulcheck', {
          method: 'POST',
          body: JSON.stringify({})
        })
      } catch (e) {
        console.log(e)
      }
    }}>출첵
    </button>
  </div>
)

export default HomeScreen