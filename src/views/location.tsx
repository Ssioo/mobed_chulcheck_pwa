import React, { useEffect, useState } from 'react'
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps'
import { Link } from 'react-router-dom'
import { fetchMembers } from '../apis/apis'
import { User } from '../models/types'

const LocationScreen = () => {
  const [members, setMembers] = useState<User[]>([])
  useEffect(() => {
    fetchMembers().then((d) => setMembers(d))
  }, [])
  return (
    <div style={{ width: '100%', height: window.screen.height, display: 'flex' }}>
      <RenderAfterNavermapsLoaded
        ncpClientId='q85oebl9tv'
        error={<p>Error</p>}
        loading={<p>Loading...</p>}
      >
        <NaverMap
          id='maps-getting-started-controlled'
          style={{ width: '100%', height: window.screen.height, flex: 1, display: 'flex' }}
          defaultCenter={{ lat: 37.5617963799624, lng: 126.93631072731567 }}
          defaultZoom={15}
        >
          {members.map((m) =>
            <Marker
              key={m.name}
              position={{
                lat: m.latLng.latitude - 0.00005 + 0.0001 * Math.random(),
                lng: m.latLng.longitude - 0.00005 + 0.0001 * Math.random()
              }}
              title={m.name}
            />)}
        </NaverMap>
      </RenderAfterNavermapsLoaded>
      <Link
        style={{
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
          position: 'absolute',
          left: 20,
          top: 20,
        }} to='/members'>
        Back
      </Link>
    </div>
  )
}

export default LocationScreen
