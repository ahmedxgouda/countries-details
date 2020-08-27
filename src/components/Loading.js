import React from 'react';
import { motion } from 'framer-motion';

const loadingCircleVariants = {
    start: {
        x: "0%"
        
    },
    end: {
        x: "100%"
    }
}

const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut'
}

const Loading = () => {
    return (
        <div className="container container-loading">
            <motion.div className="loading">
                <motion.div>
                    <motion.span className="loading-circle" variants={loadingCircleVariants} 
                    initial="start"
                    animate="end"
                    transition={loadingCircleTransition} />

                    <motion.span className="loading-circle" variants={loadingCircleVariants} 
                    initial="start"
                    animate="end"
                    transition={loadingCircleTransition} />
                    
                    <motion.span className="loading-circle" variants={loadingCircleVariants} 
                    initial="start"
                    animate="end"
                    transition={loadingCircleTransition} />
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Loading
