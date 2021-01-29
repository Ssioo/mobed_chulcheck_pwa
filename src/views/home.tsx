import React, { useEffect, useState } from 'react'
import moment from 'moment'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import { sendLocation, workOn } from '../apis/apis'
import { LatLng } from '../models/types'

const HomeScreen = () => {
  const [name, setName] = useState('')
  const [today, setToday] = useState(moment())
  const [location, setLocation] = useState<LatLng>({ latitude: 127, longitude: 37 })
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const savedName = localStorage.getItem('name')
    setName(savedName ?? '')
    firebase.messaging()
      .getToken({ vapidKey: 'BFuII-gSgT5PGZwFUktwc49VCUmQURyMGexOTzkOcdS3_rNPDgZ9PJIvvs-1FMCBfIx65CevzmZ2O1mduWlugYM' })
      .then((t) => setToken(t))

    const disposal: NodeJS.Timeout[] = []
    disposal.push(setInterval(() => {
      setToday(moment())
    }, 10000))

    if (navigator.geolocation) {
      initLocation()
      disposal.push(setInterval(() => {
        initLocation()
      }, 10000))
    }

    return () => {
      disposal.forEach((d) => clearInterval(d))
    }
  }, [])

  useEffect(() => {
    sendLocation(token, name, location)
  }, [token, location])

  const initLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
    })
  }

  const onClickSubmit = async () => {
    if (name.length < 2) {
      alert('올바른 이름을 입력해주세요')
      return
    }
    const proceed = confirm('출첵할까요?')
    if (!proceed) return
    if (!location) {
      alert('GPS를 수집하지 못했습니다.\n잠시 후 다시 시도해주세요.')
      return
    }
    localStorage.setItem('name', name)
    const res = await workOn(token, location, name)
    alert(res ? '출석했습니다' : '출석에 실패했습니다')
  }

  return (
    <div style={{
      alignItems: 'center',
      padding: 30,
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)'
    }}>
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
          fontFamily: 'Noto Sans KR',
          textAlign: 'center'
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
      }}>
        {today.format('M월 D일 H시 m분')}
      </div>
      <button
        style={{
          display: 'block',
          margin: 'auto',
          paddingTop: 8,
          paddingBottom: 8,
          width: 150,
          marginTop: 20,
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
      <Link style={{
        display: 'block',
        paddingTop: 8,
        paddingBottom: 8,
        fontWeight: 'bold',
        color: '#333',
        borderWidth: 0,
        outlineWidth: 0,
        borderRadius: 24,
        width: 150,
        margin: 'auto',
        marginTop: 4,
        fontSize: 12,
        textAlign: 'center',
        textDecoration: 'auto',
        fontFamily: 'Noto Sans KR'
      }} to='/members'>
        멤버
      </Link>
    </div>
  )
}

export default HomeScreen
