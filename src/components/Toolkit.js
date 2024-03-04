import React, { useEffect } from 'react'
import styles from './index.module.css'
import { COLORS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import { changeColor,changeSize } from '@/slice/toolboxSlice'
import classNames from 'classnames'

function Toolkit() {

    const colorarr= Object.keys(COLORS)
    const showColorPalette= useSelector((state)=> state.menu.showColorPalette)
    const activeMenuItem= useSelector((state)=> state.menu.activeMenuItem)
    const {size,color}= useSelector((state)=> state.toolbox[activeMenuItem])
    const dispatch= useDispatch()
    
    const handleColorChange =(color)=>{
      dispatch(changeColor({item:activeMenuItem,color:color}))
    }
    const handleSizeChange=(e)=>{
      dispatch(changeSize({item:activeMenuItem,size:e.target.value}))
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
