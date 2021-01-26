import React, { useEffect, useState } from 'react'
import moment from 'moment'

const HomeScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [today, setToday] = useState(moment())
  const [mailText, setMailText] = useState('')

  useEffect(() => {
    const savedEmail = localStorage.getItem('email')
    const savedName = localStorage.getItem('name')
    setEmail(savedEmail ?? '')
    setName(savedName ?? '')
    const interval = setInterval(() => {
      setToday(moment())
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    setMailText(`제목) ${today.format('YYMMDD')} ${name.length === 0 ? '(이름)' : name} 출근했습니다.\n내용) ${today.format('M월 D일 HH:mm')} ${name.length === 0 ? '(이름)' : name} 출근했습니다.\n\n감사합니다.`)
  }, [today, name])

  const onClickSubmit = async () => {
    if (name.length < 2 || !email.includes('@')) {
      alert('올바른 이름과 이메일을 입력해주세요')
      return
    }
    localStorage.setItem('email', email)
    localStorage.setItem('name', name)
    const isDev = process.env.NODE_ENV !== 'production'
    const proceed = confirm(`출석 메일을 보낼까요?${isDev ? '개발모드입니다.' : '프로덕션입니다. 실제로 전송됨 주의!'}`)
    if (!proceed) return
    try {
      const rawRes = await fetch(`${isDev ? 'http://localhost:3001': 'https://mobedchulcheck.netlify.app:3001'}/api/chulcheck?fromName=${name}&fromUser=${email}`, {
        method: 'POST',
      })
      const res = await rawRes.json()
      if (res.status !== 200) throw Error(res.message ?? 'Network Error')
      alert('메일을 보냈습니다.')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div style={{ alignItems: 'center', padding: 30 }}>
      <div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#333', fontFamily: 'Noto Sans KR' }}>
        MOBED 출석체크
      </div>
      <input
        style={{
          display: 'block',
          margin: 'auto',
          marginTop: 50,
          padding: 10,
          borderRadius: 24,
          paddingTop: 8,
          outlineColor: '#c4c4c4',
          outlineWidth: 0.5,
          borderWidth: 0.5,
          paddingBottom: 8,
          fontFamily: 'Noto Sans KR'
        }}
        inputMode='text'
        placeholder='이름'
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <input
        style={{
          display: 'block',
          margin: 'auto',
          marginTop: 12,
          paddingRight: 12,
          paddingLeft: 12,
          borderRadius: 24,
          paddingTop: 8,
          paddingBottom: 8,
          borderWidth: 0.5,
          outlineColor: '#c4c4c4',
          outlineWidth: 0.5,
          fontFamily: 'Noto Sans KR'
        }}
        inputMode='email'
        placeholder='이메일'
        value={email}
        onChange={({ target }) => setEmail(target.value)}
      />
      <div style={{
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        marginTop: 16,
        fontWeight: 300,
        fontFamily: 'Noto Sans KR'
      }}>{mailText.split('\n').map((s) => <p>{s}</p>)}</div>
      <div style={{ marginTop: 20 }}>
        <button
          style={{
            display: 'block',
            margin: 'auto',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 64,
            paddingRight: 64,
            fontWeight: 300,
            color: '#fff',
            borderWidth: 0,
            outlineWidth: 0,
            borderRadius: 24,
            backgroundColor: '#333',
            fontFamily: 'Noto Sans KR'
          }}
          onClick={onClickSubmit}
        >
          출첵
        </button>
      </div>
    </div>
  )
}

export default HomeScreen