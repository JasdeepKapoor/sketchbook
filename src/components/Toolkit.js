import React, { useEffect } from 'react'
import styles from './index.module.css'
import { COLORS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { changeColor,changeSize } from '@/slice/toolSlice'
import classNames from 'classnames'
import { socket } from '@/socket'

function Toolkit() {

    const colorarr= Object.keys(COLORS)
    const showColorPalette= useSelector((state)=> state.menu.showColorPalette)
    const activeMenuItem= useSelector((state)=> state.menu.activeMenuItem)
    const {size,color}= useSelector((state)=> state.toolbox[activeMenuItem])
    const dispatch= useDispatch()

    useEffect(()=>{
      socket.on("changeColor",(arg)=>{
        dispatch(changeColor({item:activeMenuItem,color:arg.color}))
      })

      socket.on("changeSize",(arg)=>{
        dispatch(changeSize({item:activeMenuItem,size:arg.size}))
      })

      return ()=>{
        socket.off("changeColor")
        socket.off("changeSize")
      }
    },[])

    
    const handleColorChange =(color)=>{
      dispatch(changeColor({item:activeMenuItem,color:color}))
      socket.emit("changeColor",{color})
    }
    const handleSizeChange=(e)=>{
      dispatch(changeSize({item:activeMenuItem,size:e.target.value}))
      socket.emit("changeSize",{size:e.target.value})
    }

    

  return (
    <div className={styles.toolkitContainer}>
      {showColorPalette && <div>
        <h4>Stroke Color</h4>
        <div className={styles.toolkitColorContainer}>
            {colorarr.map((c,index)=>(
                <span className={classNames({[styles.active]:COLORS[c]=== color})} key={index} style={{backgroundColor:COLORS[c]}} onClick={()=>handleColorChange(COLORS[c])}></span>
            ))}
       
        </div>
      </div>}
      <div>
        <h4>Brush Size</h4>
        <div>
            <input type='range' min={1} max={10} step={1} value={size} onChange={handleSizeChange}/>
        </div>
      </div>
    </div>
  )
}

export default Toolkit
