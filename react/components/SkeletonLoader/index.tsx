import React from 'react'

import styles from './skeletonLoader.css'


const SkeletonLoader: React.FC<{className: string}> = ({className}) => {
  
  return (
    <section className={`${className} ${styles.skeletonLoader}`} />
  )
}

export default SkeletonLoader
