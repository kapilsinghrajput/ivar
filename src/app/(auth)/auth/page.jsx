import Authtabs from '@/components/auth/Authtabs'
import React from 'react'


export default function authpage() {
  return (
    <div className='mx-auto w-full'>
         <div
          className="absolute inset-0 bg-cover bg-center opacity-90  "
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-vector/gradient-style-abstract-wireframe-background_23-2148993321.jpg?t=st=1732713791~exp=1732717391~hmac=9bc24bc17da53fe874995eaa69d35decf0546806b1a877f6370b9d7d6dec217d&w=826')",
          }}
        >
          <h2 className='text-center mt-5 text-white  text-3xl font-bold z-["900"] '>
            Please Login Form
          </h2>
 <Authtabs/>
        </div>
    </div>
  )
}
