import React, { useEffect, useState } from 'react'
import moment from 'moment'
import firebase from 'firebase'

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [today, setToday] = useState(moment())
  const [location, setLocation] = useState<{ latitude: number, longitude: number }>({ latitude: 127, longitude: 37 })

  useEffect(() => {
    const savedName = localStorage.getItem('name')
    setName(savedName ?? '')
    const interval = setInterval(() => {
      setToday(moment())
    }, 10000)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
      })
    }
    return () => {
      clearInterval(interval)
    }
  }, [])

  const onClickSubmit = async () => {
    if (name.length < 2) {
      alert('올바른 이름을 입력해주세요')
      return
    }
    const token = await firebase.messaging().getToken({ vapidKey: 'BFuII-gSgT5PGZwFUktwc49VCUmQURyMGexOTzkOcdS3_rNPDgZ9PJIvvs-1FMCBfIx65CevzmZ2O1mduWlugYM' })
    localStorage.setItem('name', name)
    const proceed = confirm('출첵할까요?')
    if (!proceed) return
    if (!location) {
      alert('GPS를 수집하지 못했습니다.\n잠시 후 다시 시도해주세요.')
      return
    }
    try {
      const rawRes = await fetch('https://us-central1-mobedchulcheck.cloudfunctions.net/workOn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          userName: name,
          deviceToken: token,
          workType: 1,
          latLng: {
            latitude: location.latitude,
            longitude: location.longitude,
          }
        })
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
      <div style={{
        fontSize: 12,
        color: '#888888',
        textAlign: 'center',
        marginTop: 16,
        fontWeight: 300,
        fontFamily: 'Noto Sans KR'
      }}>{today.format('M월 D일 H시 m분')}</div>
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
