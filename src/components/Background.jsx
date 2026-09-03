import React, { useEffect, useRef } from "react"

const AnimatedBackground = () => {
    const blobRefs = useRef([])
    const initialPositions = [
        { x: -4, y: 0 },
        { x: -4, y: 0 },
        { x: 20, y: -8 },
        { x: 20, y: -8 },
    ]

    useEffect(() => {
        let currentScroll = window.pageYOffset
        let requestId

        const handleScroll = () => {
            const newScroll = window.pageYOffset
            currentScroll = newScroll

            blobRefs.current.forEach((blob, index) => {
                if (!blob) return
                const initialPos = initialPositions[index]

                // Adjusted movement scaling for smooth performance in Apple minimalist look
                const xOffset = Math.sin(newScroll / 120 + index * 0.5) * 200 
                const yOffset = Math.cos(newScroll / 120 + index * 0.5) * 30 

                const x = initialPos.x + xOffset
                const y = initialPos.y + yOffset

                blob.style.transform = `translate(${x}px, ${y}px)`
                blob.style.transition = "transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)"
            })
        }

        const onScroll = () => {
            if (requestId) cancelAnimationFrame(requestId)
            requestId = requestAnimationFrame(handleScroll)
        }

        window.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            window.removeEventListener("scroll", onScroll)
            if (requestId) cancelAnimationFrame(requestId)
        }
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    ref={(ref) => (blobRefs.current[0] = ref)}
                    className="absolute top-[10%] left-[-10%] md:w-[30vw] md:h-[30vw] w-72 h-72 bg-[#0071E3]/15 rounded-full filter blur-[100px]"
                />
                <div
                    ref={(ref) => (blobRefs.current[1] = ref)}
                    className="absolute top-[20%] right-[-10%] md:w-[30vw] md:h-[30vw] w-72 h-72 bg-indigo-600/10 rounded-full filter blur-[120px]"
                />
                <div
                    ref={(ref) => (blobRefs.current[2] = ref)}
                    className="absolute bottom-[10%] left-[10%] md:w-[35vw] md:h-[35vw] w-80 h-80 bg-blue-500/10 rounded-full filter blur-[140px]"
                />
                <div
                    ref={(ref) => (blobRefs.current[3] = ref)}
                    className="absolute bottom-[20%] right-[15%] md:w-[30vw] md:h-[30vw] w-80 h-80 bg-slate-500/10 rounded-full filter blur-[120px]"
                />
            </div>
            
            {/* Apple-style subtle grid overlay texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
        </div>
    )
}

export default AnimatedBackground