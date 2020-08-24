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
        <section className="container container-loading">
            <motion.section className="loading">
                <motion.section>
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
                </motion.section>
            </motion.section>
        </section>
    );
}

export default Loading
