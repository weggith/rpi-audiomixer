import { AnimatePresence, delay, motion } from "framer-motion"
import styles from "./recordIcon.module.css"
import { useEffect, useRef, useState } from "react"

// 33rpm = 1.8181" seconds per rotation
// 45rpm = 1.3333" seconds per rotation
// 78rpm = 0.76923 seconds per rotation

export default function RecordIcon({isPlaying=true, recordSpeed=1.8181}, isActive=true) {

    const [speed, setSpeed] = useState(recordSpeed) // 33rpm to start
    const [playing, setPlaying] = useState(isPlaying)
    const [active, setActive] = useState(isActive)
    const [playState, setPlayState] = useState("Play")
    const [armAngle, setArmAngle] = useState(10)

    function playRecord() {
        setPlaying((playing) => !playing)
    }

    useEffect(() => {
        if(playing == true){
            setPlayState(() => "Pause")
        }
        else{
            setPlayState(() => "Play")
        }
    },[playing])

    return (
        <AnimatePresence>
            {active && 
                <motion.div className={styles.recordBase}>
                    {/* record arm div */}
                    <motion.div 
                        className={styles.pivot}
                        initial={{rotate: 0}}
                        animate={{rotate: playing ? armAngle : 0}}
                        transition={{delay: playing ? 1.2 : 0, velocity: 1}}
                    >
                        <motion.div 
                            className={styles.recordArm}
                        />
                    </motion.div>
                    <AnimatePresence>
                        {playing &&
                            <motion.img
                                key={[playing, speed]}
                                className={styles.iconImage} 
                                src={"/record.png"} 
                                alt="record"
                                initial={{x:-130}}
                                animate={{
                                    x: 0,
                                    rotate: [0,360],
                                }}
                                exit={{
                                    opacity: 0,
                                }}
                                transition={{
                                    x: {
                                        duration: speed / 2,
                                        type: playing,
                                        ease: "linear",
                                    },
                                    rotate: {
                                        type: playing,
                                        duration: speed,
                                        ease: "linear",
                                        repeat: Infinity,
                                    },
                                }}
                            >
                            </motion.img>
                        }
                    </AnimatePresence>
                    {/* visible button that appears under the record */}
                    <button style={{position:"absolute", bottom:"5px", left:"5px", fontSize:"6pt", zIndex:"-1"}} onClick={playRecord}>
                        {playState}
                    </button>
                    {/* actual button  being clicked, but invisible */}
                    <button style={{position:"absolute", bottom:"5px", left:"5px", fontSize:"6pt", zIndex:"1", opacity:"0"}} onClick={playRecord}>
                        {playState}
                    </button>
                </motion.div>
            }
        </AnimatePresence>
    )   
}