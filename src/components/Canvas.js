import { MENU_ITEMS } from '@/constants'
import React, { useEffect, useRef } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { actionItemClick } from '@/slice/menuSlice'
import { socket } from '@/socket'

function Canvas() {
    const canvasRef= useRef(null)
    const isDrawing= useRef(false)
    const dispatch= useDispatch()
    const historyArray= useRef([])
    const historyPointer= useRef(-1)
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

        const beginPath= (x,y)=>{
          context.beginPath()
          context.moveTo(x,y)
        }

        const drawLine=(x,y)=>{
          context.lineTo(x,y)
          context.stroke()
        }

        socket.on('beginPath',(arg)=>{
          const {x,y}=arg
          beginPath(x,y)
        })

        socket.on('drawLine',(arg)=>{
          const {x,y}=arg
          drawLine(x,y)
        })

        socket.on('undoRedo',(imgdata)=>{
          context.putImageData(imgdata,0,0)
        })

        const handleMouseDown =(e)=>{
          isDrawing.current=true
          beginPath(e.clientX,e.clientY)
          socket.emit('beginPath',{x:e.clientX,y:e.clientY})
        }

        const handleMouseMove =(e)=>{
          if(!isDrawing.current) return
          drawLine(e.clientX,e.clientY)
          socket.emit('drawLine',{x:e.clientX,y:e.clientY})
        }

        const handleMouseUp= ()=>{
          isDrawing.current=false
          const imgdata= context.getImageData(0,0,canvas.width,canvas.height)
          historyArray.current.push(imgdata)
          historyPointer.current ++

        }

        canvas.addEventListener('mousedown',handleMouseDown)
        canvas.addEventListener('mousemove',handleMouseMove)
        canvas.addEventListener('mouseup',handleMouseUp)

       return ()=>{
        canvas.removeEventListener('mousedown',handleMouseDown)
        canvas.removeEventListener('mousemove',handleMouseMove)
        canvas.removeEventListener('mouseup',handleMouseUp)
        socket.off('beginPath')
        socket.off('drawLine')
       }
    },[])


    useEffect(()=>{
      if(!canvasRef.current) return
      const canvas= canvasRef.current
      const context= canvas.getContext('2d')


      const changeConfig =(color,size)=>{
        
      context.strokeStyle=color
      context.lineWidth=size
      }

      changeConfig(color,size)

      const handleConfigChange =(arg)=>{
        changeConfig(arg.color,arg.size)
      }
      socket.on("changeConfig",handleConfigChange)

     

    },[size,color])

    useEffect(()=>{
      if(!canvasRef.current) return
      const canvas= canvasRef.current
      const context= canvas.getContext('2d')

      if(activeActionItem=== MENU_ITEMS.DOWNLOAD){
        const URL= canvas.toDataURL()
        const anchor= document.createElement("a")
        anchor.href=URL
        anchor.download="sketch.jpg"
        anchor.click()
        dispatch(actionItemClick(null))
      }

      if(activeActionItem === MENU_ITEMS.UNDO){
        if(historyPointer.current>0){
          historyPointer.current --
        const imgdata= historyArray.current[historyPointer.current]
        context.putImageData(imgdata,0,0)
        console.log(imgdata)
        dispatch(actionItemClick(null))
        }
      }

      if(activeActionItem === MENU_ITEMS.REDO){
        if(historyPointer.current<historyArray.current.length){
          console.log(historyPointer.current,historyArray.current.length)
        historyPointer.current ++
        const imgdata= historyArray.current[historyPointer.current]
        context.putImageData(imgdata,0,0)
        socket.emit('undoRedo',imgdata)
        dispatch(actionItemClick(null))
        }
      }
      
    },[activeActionItem])


  return (
   <canvas style={{ cursor: activeMenuItem === MENU_ITEMS.PENCIL ? 'url("https://img.icons8.com/ios/50/pencil--v1.png"), auto': 'url("https://img.icons8.com/ios/50/eraser.png"), auto' }} ref={canvasRef}>
   </canvas>
  )
}

export default Canvas
