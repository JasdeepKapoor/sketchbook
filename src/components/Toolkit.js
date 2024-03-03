import React from 'react'
import styles from './index.module.css'
import { COLORS } from '@/constants'
import { useSelector } from 'react-redux'

function Toolkit() {

    const colorarr= Object.keys(COLORS)
    const showColorPalette= useSelector((state)=> state.menu.showColorPalette)
    
  return (
    <div className={styles.toolkitContainer}>
      {showColorPalette && <div>
        <h4>Stroke Color</h4>
        <div className={styles.toolkitColorContainer}>
            {colorarr.map((c)=>(
                <span style={{backgroundColor:COLORS[c]}}></span>
            ))}
       
        </div>
      </div>}
      <div>
        <h4>Brush Size</h4>
        <div>
            <input type='range' min={1} max={10} step={1}/>
        </div>
      </div>
    </div>
  )
}

export default Toolkit
