import React from 'react'

export const updateAlert = (registration) => {
  alert('새로운 업데이트가 있습니다.\n다시 시작하면 적용됩니다.')
  registration.update()
}
