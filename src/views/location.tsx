import React, { useEffect } from 'react'
import { RenderAfterNavermapsLoaded, NaverMap } from 'react-naver-maps'

const LocationScreen = () => {
  useEffect(() => {
  }, [])
  return (<div style={{ width: '100%', height: 600, display: 'flex' }}>
    <RenderAfterNavermapsLoaded
      clientId='q85oebl9tv'
      error={<p>Error</p>}
      loading={<p>Loading...</p>}
    >
      <NaverMap
        id='maps-getting-started-controlled'
        style={{ width: '100%', height: 600, flex: 1, display: 'flex' }}
        defaultZoom={10}
      />
    </RenderAfterNavermapsLoaded>
  </div>)
}

export default LocationScreen
