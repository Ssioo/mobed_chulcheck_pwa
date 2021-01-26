import React, { useState } from 'react'

const HomeScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  return (
    <div>
      <div>MOBED 출석체크</div>
      <input inputMode='text' placeholder='이름' value={name} onChange={({ target }) => setName(target.value)}/>
      <input inputMode='email' placeholder='이메일' value={email} onChange={({ target }) => setEmail(target.value)}/>
      <button onClick={async () => {
        const proceed = confirm('메일을 보낼까요?')
        if (!proceed) return
        try {
          const rawRes = await fetch(`http://localhost:3001/api/chulcheck?fromName=${name}&fromUser=${email}`, {
            method: 'POST',
          })
          const res = await rawRes.json()
          if (res.status !== 200) throw Error(res.message ?? 'Network Error')
          alert('메일을 보냈습니다.')
        } catch (e) {
          alert(e)
        }
      }}>출첵
      </button>
    </div>
  )
}

export default HomeScreen