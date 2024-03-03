import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil,faEraser,faRotateLeft,faRotateRight,faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import { actionItemClick,menuItemClick } from '@/slice/toolBoxSlice'
import { MENU_ITEMS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'

export default function Menu() {

  const value= useSelector((state)=> state.menu.menuOption)
  const dispatch= useDispatch()

const handleMenuClick=(item)=>{
  dispatch(menuItemClick(item))
}


  return (
    <div className={styles.menuContainer}>
        <div className={styles.iconWrapper} onClick={()=>handleMenuClick(MENU_ITEMS.PENCIL)} >
        <FontAwesomeIcon className={styles.icon}  icon={faPencil} />
        </div>
        <div className={styles.iconWrapper} onClick={()=>handleMenuClick(MENU_ITEMS.ERASER)}>
        <FontAwesomeIcon className={styles.icon} icon={faEraser} />
        </div>
        <div className={styles.iconWrapper} >
        <FontAwesomeIcon className={styles.icon}  icon={faRotateLeft} />
        </div>
        <div className={styles.iconWrapper} >
        <FontAwesomeIcon className={styles.icon}   icon={faRotateRight} />
        </div>
        <div className={styles.iconWrapper} >
        <FontAwesomeIcon className={styles.icon}  icon={faFileArrowDown} />
        </div>
    </div>
  )
}
