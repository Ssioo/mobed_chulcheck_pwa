import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMembers } from '../apis/apis'
import { User } from '../models/types'
import moment from 'moment'

const MembersScreen = () => {
  const [members, setMembers] = useState<User[]>([])

  useEffect(() => {
    fetchMembers().then((data) => setMembers(data))
  }, [])

  return (<div>
    <Link style={{
      textDecoration: 'auto',
      color: '#fff',
      fontFamily: 'Noto Sans KR',
      background: '#333',
      borderRadius: 24,
      paddingLeft: 12,
      paddingRight: 12,
      paddingTop: 6,
      paddingBottom: 6,
      fontSize: 14,
      margin: 10,
    }} to='/'>Back</Link>
    <div style={{
      fontFamily: 'Noto Sans KR',
      alignSelf: 'center',
      textAlign: 'center',
      margin: 'auto',
      color: '#333',
      marginTop: 20,
    }}>{moment().format('M월 D일')} 출근보고
    </div>
    <div style={{ marginTop: 20 }}>{members.map((m) => <Member key={m.name} user={m}/>)}</div>
  </div>)
}

const Member: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div style={{
      flexDirection: 'row',
      display: 'flex',
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 24,
      paddingLeft: 24,
      alignItems: 'center'
    }}>
      <div style={{
        display: 'flex',
        flex: 1,
        fontFamily: 'Noto Sans KR',
        fontWeight: 'bold',
        color: '#333'
      }}>{user.name}</div>
      <div style={{
        display: 'inline-block',
        fontFamily: 'Noto Sans KR',
        fontSize: 13,
        fontWeight: 300,
        color: user.lastWorkType === 1 ? '#33da33' : '#c4c4c4'
      }}>
        {moment(user.lastCommutedAt).format('H시 m분')} {user.lastWorkType === 1 ? '출근' : '퇴근'}
      </div>
    </div>
  )
}

export default MembersScreen
