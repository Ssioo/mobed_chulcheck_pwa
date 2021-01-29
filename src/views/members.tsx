import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMembers } from '../apis/apis'
import { User } from '../models/types'
import moment from 'moment'

const MembersScreen = () => {
  const [members, setMembers] = useState<User[]>([])

  useEffect(() => {
    const today = moment()
    fetchMembers().then((data) =>
      setMembers(data.filter((d) => moment(d.lastCommutedAt).isSame(today, 'day')).sort((a, b) => a.lastCommutedAt < b.lastCommutedAt ? -1 : 1))
    )
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
      fontWeight: 'bold',
      color: '#333',
      marginTop: 20,
    }}>{moment().format('M월 D일')} 출근보고
    </div>
    <div style={{ marginTop: 20 }}>
      {members.map((m, idx) =>
        <Fragment key={m.name}>
          <Member idx={idx} user={m}/>
          <div style={{ height: 0.5, backgroundColor: '#e5e5e5', width: '90%', margin: 'auto' }}/>
        </Fragment>
      )}
    </div>
  </div>)
}

const Member: React.FC<{ user: User, idx: number }> = ({ user, idx }) => {
  return (
    <div style={{
      flexDirection: 'row',
      display: 'flex',
      paddingTop: 14,
      paddingBottom: 12,
      paddingRight: 24,
      paddingLeft: 24,
      alignItems: 'center'
    }}>
      <div style={{
        display: 'inline-block',
        fontFamily: 'Noto Sans KR',
        fontSize: 12,
        fontWeight: 300,
        color: '#c4c4c4',
        marginRight: 16
      }}>{idx + 1}</div>
      <div style={{
        display: 'flex',
        flex: 1,
        fontFamily: 'Noto Sans KR',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333'
      }}>{user.name}</div>
      <div style={{
        display: 'inline-block',
        fontFamily: 'Noto Sans KR',
        fontSize: 13,
        fontWeight: 'bold',
        color: user.lastWorkType === 1 ? '#54d054' : '#c4c4c4'
      }}>
        {moment(user.lastCommutedAt).format('H시 m분')}
        <span style={{
          backgroundColor: user.lastWorkType === 1 ? '#54d054' : '#c4c4c4',
          color: '#fff',
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 2,
          paddingBottom: 2,
          borderRadius: 20,
          marginLeft: 12,
        }}>
          {user.lastWorkType === 1 ? '출근' : '퇴근'}
        </span>
      </div>
    </div>
  )
}

export default MembersScreen
