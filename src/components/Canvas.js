import { MENU_ITEMS } from '@/constants'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionItemClick } from '@/slice/menuSlice'

function Canvas() {
    const canvasRef= useRef(null)
    const isDrawing= useRef(false)
    const dispatch= useDispatch()
    const {activeActionItem,activeMenuItem}= useSelector((state)=> state.menu)
    const {size,color}= useSelector((state)=> state.toolbox[activeMenuItem])

    useEffect(()=>{
        if(!canvasRef.current) return

        const canvas= canvasRef.current
        const context= canvas.getContext('2d')

        // when mounting
        canvas.width= window.innerWidth
        canvas.height= window.innerHeight

        // to make the canvas background as white
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

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

       

       return ()=>{
        canvas.removeEventListener('mousedown',handleMouseDown)
        canvas.removeEventListener('mousemove',handleMouseMove)
        canvas.removeEventListener('mouseup',handleMouseUp)
       }
    },[])

    useEffect(()=>{
      if(!canvasRef.current) return

      const canvas= canvasRef.current
      const context= canvas.getContext('2d')

      context.strokeStyle=color
      context.lineWidth=size
    },[size,color])

    useEffect(()=>{
      if(!canvasRef.current) return

      if(activeActionItem=== MENU_ITEMS.DOWNLOAD){
        const canvas= canvasRef.current

        const URL= canvas.toDataURL()
        const anchor= document.createElement("a")
        anchor.href=URL
        anchor.download="sketch.jpg"
        anchor.click()
        dispatch(actionItemClick(null))
      }
    },[activeActionItem])

  return (
   <canvas ref={canvasRef}>
   </canvas>
  )
}

export default Canvas
