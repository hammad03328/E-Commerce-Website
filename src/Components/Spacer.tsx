import React from 'react'
import { FC } from 'react'

const Spacer:FC<{children:React.ReactNode}>=({children})=> {
  return (
    <div className='mx-24'>{children}</div>
  )
}

export default Spacer