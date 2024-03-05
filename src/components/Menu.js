import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil,faEraser,faRotateLeft,faRotateRight,faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.css'
import { actionItemClick,menuItemClick } from '@/slice/menuSlice'
import { MENU_ITEMS } from '@/constants'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

export default function Menu() {

  const activeMenuItem= useSelector((state)=> state.menu.activeMenuItem)
  const dispatch= useDispatch()

const handleMenuClick=(item)=>{
  dispatch(menuItemClick(item))
}

const handleActionClick=(item)=>{
  dispatch(actionItemClick(item))
}


  return (
    <div className={styles.menuContainer}>
        <div className={classNames(styles.iconWrapper,{[styles.active]: activeMenuItem=== MENU_ITEMS.PENCIL })} onClick={()=>handleMenuClick(MENU_ITEMS.PENCIL)} >
        <FontAwesomeIcon className={styles.icon}  icon={faPencil} />
        </div>
        <div className={classNames(styles.iconWrapper,{[styles.active]: activeMenuItem=== MENU_ITEMS.ERASER })} onClick={()=>handleMenuClick(MENU_ITEMS.ERASER)}>
        <FontAwesomeIcon className={styles.icon} icon={faEraser} />
        </div>
        <div className={styles.iconWrapper} onClick={()=>handleActionClick(MENU_ITEMS.UNDO)} >
        <FontAwesomeIcon className={styles.icon}  icon={faRotateLeft} />
        </div>
        <div className={styles.iconWrapper} onClick={()=>handleActionClick(MENU_ITEMS.REDO)} >
        <FontAwesomeIcon className={styles.icon}   icon={faRotateRight} />
        </div>
        <div className={styles.iconWrapper} onClick={()=>handleActionClick(MENU_ITEMS.DOWNLOAD)} >
        <FontAwesomeIcon className={styles.icon}  icon={faFileArrowDown} />
        </div>
    </div>
  )
}
