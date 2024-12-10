'use client'

import { getCuratedPhotos, PexelsPhoto } from "@/services/pexelsService";
import React, { useState, useEffect, useRef } from "react";
import BlurImage from "./BlurImage";

const PhotoGallery = () => {
    const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
    const [loadingPhotos, setLoadingPhotos] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement | null>(null);

    const loadMorePhotos = async () => {
        if (!hasMore || loadingPhotos) return;

        try {
            setLoadingPhotos(true);
            const response = await getCuratedPhotos(page, 30);
            if (response.photos.length > 0) {
                setPhotos((prev) => [...prev, ...response.photos]);
                setPage((prev) => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching more photos:", error);
        } finally {
            setLoadingPhotos(false);
        }
    };

    useEffect(() => {
        const fetchInitialPhotos = async () => {
            try {
                setLoadingPhotos(true);
                const response = await getCuratedPhotos(1, 30);
                setPhotos(response.photos);
                setHasMore(response.photos.length > 0);
                setPage(2);
            } catch (error) {
                console.error("Error fetching initial photos:", error);
            } finally {
                setLoadingPhotos(false);
            }
        };

        fetchInitialPhotos();
    }, []);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loadingPhotos) {
                    loadMorePhotos();
                }
            },
            { rootMargin: "100px" }
        );

        if (loadingRef.current) observer.current.observe(loadingRef.current);

        return () => observer.current?.disconnect();
    }, [loadingPhotos, hasMore]);

    const getOptimizedImageUrl = (photo: PexelsPhoto) => {
        if (!photo.src) return "";
        const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1200;
        return viewportWidth <= 768 ? photo.src.medium : photo.src.large;
    };

    return (
        <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
                {photos.map((photo, i) => (
                    <BlurImage
                        key={i}
                        src={getOptimizedImageUrl(photo)}
                        alt={photo.alt || "Pexels Image"}
                        width={photo.width}
                        height={photo.height}
                        className="w-full aspect-[4/3] object-cover"
                    />
                ))}
            </div>

            <div ref={loadingRef} className="w-full h-20 flex items-center justify-center">
                {loadingPhotos && (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                )}
            </div>
        </div>
    );
};

export default PhotoGallery;
