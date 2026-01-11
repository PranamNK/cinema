import React from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
  style?: React.CSSProperties;
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  width, 
  height, 
  borderRadius, 
  className = '',
  style = {} 
}) => {
  const customStyle = {
    width,
    height,
    borderRadius,
    ...style,
  };

  return (
    <div 
      className={`${styles.skeleton} ${className}`} 
      style={customStyle}
    />
  );
};

export default Skeleton;
