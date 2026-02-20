"use client";

import Image from "next/image";

interface MoodBoardProps {
  images: string[];
  altPrefix?: string;
  className?: string;
}

/**
 * 7-image mood board layout matching the Royal Van Lent reference:
 * Top row: [1 wide horizontal] [2 vertical]
 * Middle row: [3 square] [4 vertical] [5 vertical]
 * Bottom row: [6 vertical] [7 wide horizontal]
 */
export default function MoodBoard({ images, altPrefix = "Mood board", className = "" }: MoodBoardProps) {
  if (images.length < 7) return null;

  return (
    <div
      className={`grid gap-0.5 sm:gap-1 max-w-[20rem] sm:max-w-sm mx-auto w-full min-h-0 overflow-visible ${className}`}
      style={{
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr 1fr",
        aspectRatio: "3 / 4.5",
      }}
      role="img"
      aria-label="Mood board"
    >
      {/* Top left - wide horizontal */}
      <div className="relative col-span-2 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[0]}
            alt={`${altPrefix} 1`}
            fill
            className="object-cover"
          sizes="(max-width: 1024px) 66vw, 800px"
          unoptimized
          />
        </div>
      </div>
      {/* Top right - vertical */}
      <div className="relative col-span-1 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[1]}
            alt={`${altPrefix} 2`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 400px"
            unoptimized
          />
        </div>
      </div>
      {/* Middle left - square */}
      <div className="relative col-span-1 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[2]}
            alt={`${altPrefix} 3`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 400px"
            unoptimized
          />
        </div>
      </div>
      {/* Middle center - vertical */}
      <div className="relative col-span-1 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[3]}
            alt={`${altPrefix} 4`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 400px"
            unoptimized
          />
        </div>
      </div>
      {/* Middle right - vertical */}
      <div className="relative col-span-1 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[4]}
            alt={`${altPrefix} 5`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 400px"
            unoptimized
          />
        </div>
      </div>
      {/* Bottom left - vertical */}
      <div className="relative col-span-1 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[5]}
            alt={`${altPrefix} 6`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 33vw, 400px"
            unoptimized
          />
        </div>
      </div>
      {/* Bottom right - wide horizontal */}
      <div className="relative col-span-2 row-span-1 min-h-0 group cursor-pointer overflow-visible">
        <div className="absolute inset-0 overflow-hidden transition-transform duration-300 ease-out group-hover:scale-150 group-hover:z-10 rounded-sm">
          <Image
            src={images[6]}
            alt={`${altPrefix} 7`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 66vw, 800px"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
