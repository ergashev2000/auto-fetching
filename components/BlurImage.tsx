'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

type BlurImageProps = {
    src: string
    alt: string
    width: number
    height: number
    className?: string
}

export default function BlurImage({ src, alt, width, height, className }: BlurImageProps) {
    const [isLoading, setLoading] = useState(true)
    const [isInView, setIsInView] = useState(false)
    const imgRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!imgRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            {
                rootMargin: '50px'
            }
        )

        observer.observe(imgRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    const shimmer = (w: number, h: number) => `
        <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <linearGradient id="g">
                    <stop stop-color="#353d44" offset="20%" />
                    <stop stop-color="#131518" offset="50%" />
                    <stop stop-color="#353d44" offset="70%" />
                </linearGradient>
            </defs>
            <rect width="${w}" height="${h}" fill="#353d44" />
            <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
            <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
        </svg>`

    const toBase64 = (str: string) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    return (
        <div
            ref={imgRef}
            className={`overflow-hidden rounded-lg bg-gray-300/50 relative ${isInView ? 'animate-none' : 'animate-pulse'}` + (className ? ` ${className}` : '')}
        >
            {isInView && (
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    loading="lazy"
                    quality={75}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
                    className={
                        "w-full h-full object-cover rounded-lg object-center duration-300 ease-in-out transform" +
                        (isLoading
                            ? 'scale-110 blur-2xl grayscale'
                            : 'scale-100 blur-0 grayscale-0')
                    }
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                    onLoadingComplete={() => setLoading(false)}
                />
            )}
        </div>
    )
}