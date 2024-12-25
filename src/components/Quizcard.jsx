import React from 'react'

export function QuizCard(props) {
  return (
    <div className='flex flex-col font-poppins w-60 justify-center items-center rounded-lg bg-[#0c0e0c]'>
        <h1 className='text-lg text-yellow-400 pb-2'>{props.obj.title}</h1>
        <h1 className='text-white pb-2'>{props.obj.desc}</h1>
        <img src='./card/quiz1.svg' className='w-36 pb-10'/>
    </div>
  )
}