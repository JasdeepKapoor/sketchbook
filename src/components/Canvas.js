import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Canvas() {
    const canvasRef= useRef(null)
    const isDrawing= useRef(false)
    const activeMenuItem= useSelector((state)=> state.menu.activeMenuItem)
    const {size,color}= useSelector((state)=> state.toolbox[activeMenuItem])

    useEffect(()=>{
        if(!canvasRef.current) return

        const canvas= canvasRef.current
        const context= canvas.getContext('2d')

        // when mounting
        canvas.width= window.innerWidth
        canvas.height= window.innerHeight

        const handleMouseDown =(e)=>{
          isDrawing.current=true
          context.beginPath()
          context.moveTo(e.clientX,e.clientY)
        }

        const handleMouseMove =(e)=>{
          if(!isDrawing.current) return
          context.lineTo(e.clientX,e.clientY)
          context.stroke()
        }

        const handleMouseUp= ()=>{
          isDrawing.current=false
        }

        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)

       

       
    },[])

    useEffect(()=>{
      if(!canvasRef.current) return

      const canvas= canvasRef.current
      const context= canvas.getContext('2d')

      context.strokeStyle=color
      context.lineWidth=size
    },[size,color])


  return (
   <canvas ref={canvasRef}>
   </canvas>
  )
}

export default Canvas
