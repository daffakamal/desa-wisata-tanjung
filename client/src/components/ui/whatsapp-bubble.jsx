'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateWhatsAppLink = () => {
    const phoneNumber = '+6288229856345'
    const message = 'Halo, saya ingin bertanya tentang Desa Wisata Tanjung'
    
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);

    // Link untuk versi web (fallback)
    const webLink = `https://wa.me/${cleanedPhoneNumber}?text=${encodedMessage}`;

    // Link untuk deep link ke aplikasi WhatsApp
    const mobileLink = `whatsapp://send?phone=${cleanedPhoneNumber}&text=${encodedMessage}`;

    return { webLink, mobileLink };
};
  
const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const { webLink, mobileLink } = generateWhatsAppLink();

    if (typeof window !== 'undefined') {
        window.location.href = mobileLink;

        setTimeout(() => {
            window.open(webLink, '_blank');
        }, 500);
    }
};

const WhatsappPill = () => {
  const [isClient, setIsClient] = useState(false);
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 20, y: 0 })
  const [delayedPosition, setDelayedPosition] = useState({ x: 20, y: 0 })
  const pillRef = useRef(null)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [textPosition, setTextPosition] = useState('right')
  
  // Untuk melacak apakah sedang drag
  const isDraggingRef = useRef(false)

  useEffect(() => {
        setIsClient(true);

        const updateInitialPosition = () => {
          if (typeof window !== 'undefined') {
            setPosition({ 
              x: window.innerWidth - 40 - 20, 
              y: window.innerHeight - 40 - 20 
            });
            setDelayedPosition({ 
              x: window.innerWidth - 40 - 20, 
              y: window.innerHeight - 100 
            });
          }
        };
    
        updateInitialPosition();
  },[])

  useEffect(() => {

    const handleMouseMove = (e) => {
      if (!isDragging) return
      
      const pill = pillRef.current
      if (!pill) return

      // Set flag drag
      isDraggingRef.current = true

      const pillRect = pill.getBoundingClientRect()
      const maxX = window.innerWidth - pillRect.width - 20
      const maxY = window.innerHeight - pillRect.height - 20

      const newX = Math.max(20, Math.min(maxX, e.clientX - dragStartRef.current.offsetX))
      const newY = Math.max(20, Math.min(maxY, e.clientY - dragStartRef.current.offsetY))

      setPosition({ x: newX, y: newY })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      
      // Reset flag drag setelah selesai drag
      setTimeout(() => {
        isDraggingRef.current = false
      }, 100)

      if (pillRef.current) {
        const pillRect = pillRef.current.getBoundingClientRect()
        const centerX = pillRect.left + pillRect.width / 2
        const centerY = pillRect.top + pillRect.height / 2

        const padding = 20
        const navHeight = 65
        const snapPositions = [
          { x: padding, y: padding + navHeight }, // Posisi kiri atas
          { x: window.innerWidth - padding - pillRect.width, y: padding + navHeight }, // Posisi kanan atas
          { x: padding, y: window.innerHeight - padding - pillRect.height }, // Posisi kiri bawah
          { x: window.innerWidth - padding - pillRect.width, y: window.innerHeight - padding - pillRect.height }, // Posisi kanan bawah
          { x: (window.innerWidth - pillRect.width) / 2, y: window.innerHeight - padding - pillRect.height }, // Posisi tengah bawah
          { x: padding, y: (window.innerHeight - pillRect.height) / 2 }, // Posisi tengah kiri
          { x: window.innerWidth - padding - pillRect.width, y: (window.innerHeight - pillRect.height) / 2 }, // Posisi tengah kanan
        ]

        let closestPosition = snapPositions[0]
        let minDistance = Number.MAX_VALUE

        snapPositions.forEach(pos => {
          const distance = Math.hypot(centerX - (pos.x + pillRect.width/2), centerY - (pos.y + pillRect.height/2))
          if (distance < minDistance) {
            minDistance = distance
            closestPosition = pos
          }
        })

        setPosition(closestPosition)
      }
    }

    const handleResize = () => {
      if (pillRef.current) {
        const pillRect = pillRef.current.getBoundingClientRect()
        setPosition(prev => ({
          x: Math.min(prev.x, window.innerWidth - pillRect.width - 20),
          y: Math.min(prev.y, window.innerHeight - pillRect.height - 20)
        }))
      }
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('resize', handleResize)
    }
  }, [isDragging])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDelayedPosition(position)
      if (position.x > window.innerWidth / 2) {
        setTextPosition('left')
      } else {
        setTextPosition('right')
      }
    }
  }, [position])

  const handleMouseDown = (e) => {
    if (pillRef.current) {
      const pillRect = pillRef.current.getBoundingClientRect()
      dragStartRef.current = {
        offsetX: e.clientX - pillRect.left,
        offsetY: e.clientY - pillRect.top
      }
    }
    setIsDragging(true)
  }

  const handleClick = (e) => {
    // Hanya jalankan click jika bukan drag
    if (!isDraggingRef.current) {
      handleWhatsAppClick(e)
    }
  }

  // Render nothing on server
  if (!isClient) {
    return null;
  }

  return (
    <motion.span 
      ref={pillRef}
      className={`fixed flex items-center border-2 border-[#25D366] bg-white shadow-lg ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} select-none`}
      style={{
        zIndex: 9999
      }}
      initial={{ 
        borderRadius: '12px', 
        opacity: 0, 
        scale: 0.6, 
        x: delayedPosition.x,
        y: delayedPosition.y }} 
      animate={{
        borderRadius: isDragging ? '99px' : '12px',
        scale: isDragging ? 0.95 : 1,
        opacity: 1,
        x: delayedPosition.x,
        y: delayedPosition.y
      }}
      transition={{
        opacity: {
          type: "spring",
          delay: 3, 
          duration: 1
        },
        scale: {
          type: "spring", 
          delay: 3, 
          duration: 1
        },
        borderRadius: {
          type: "spring", 
          stiffness: 260,
          damping: 20
        },
        x: { type: "spring", damping: 20, stiffness: 300 },
        y: { type: "spring", damping: 20, stiffness: 300 }
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center justify-center w-10 h-10">
        <div className="bg-[#00000000] absolute w-10 h-10" />
        <img src='/images/whatsapp.png' className='h-4 w-4 select-none' alt="WhatsApp" />
        
        {isHovered && (
          <motion.div
            className={`absolute whitespace-nowrap bg-white shadow-lg rounded-lg px-4 py-2 ${
              textPosition === 'left' ? 'right-full mr-2' : 'left-full ml-2'
            }`}
            initial={{ opacity: 0, x: textPosition === 'left' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: textPosition === 'left' ? 20 : -20 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm text-gray-500">Hubungi Kami</span>
          </motion.div>
        )}
      </div>
    </motion.span>
  )
}

export default WhatsappPill