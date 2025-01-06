'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Music, SpaceIcon as Yoga, GlassWater, Eye, Ship, ArrowUp } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface VenueArea {
  id: string
  name: string
  description: string
  images: string[]
  icon: typeof Music | typeof Yoga | typeof GlassWater | typeof Eye
  position: { x: number; y: number }
}

const venueAreas: VenueArea[] = [
  {
    id: 'third-eye',
    name: 'Third Eye Beacon',
    description: 'Our iconic symbol of consciousness and awareness, bridging the physical and spiritual realms.',
    images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    icon: Eye,
    position: { x: 25, y: 30 }
  },
  {
    id: 'top-deck',
    name: 'Celestial Deck',
    description: 'Experience sunrise meditation and sunset celebrations under the open sky.',
    images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    icon: Yoga,
    position: { x: 75, y: 25 }
  },
  {
    id: 'mid-deck',
    name: 'Harmony Haven',
    description: 'Where music and movement merge to create transformative experiences.',
    images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    icon: Music,
    position: { x: 45, y: 55 }
  },
  {
    id: 'lower-deck',
    name: 'Elixir Lounge',
    description: 'Savor conscious refreshments and connect with kindred spirits.',
    images: ['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600'],
    icon: GlassWater,
    position: { x: 85, y: 75 }
  },
]

const Particle = ({ delay }: { delay: number }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Return null on server-side and first client-side render
  }

  return (
    <motion.div
      className="absolute rounded-full bg-white opacity-60"
      style={{
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: delay,
      }}
    />
  );
};

export default function InteractiveVenue() {
  const [selectedArea, setSelectedArea] = useState<VenueArea | null>(null)
  const [showBooking, setShowBooking] = useState(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsAudioPlaying(!isAudioPlaying)
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-rose-400 via-rose-300 to-green-200">
      <div className="relative w-full h-full">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/yacht-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Particle effect */}
        {[...Array(20)].map((_, i) => (
          <Particle key={i} delay={i * 0.2} />
        ))}

        {venueAreas.map((area) => (
          <motion.button
            key={area.id}
            className="absolute group"
            style={{
              left: `${area.position.x}%`,
              top: `${area.position.y}%`,
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => setSelectedArea(area)}
          >
            <div className="relative w-12 h-12 bg-green-400 rounded-full shadow-lg cursor-pointer flex items-center justify-center">
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <area.icon className="w-6 h-6 text-rose-600" />
              </motion.div>
              <div className="absolute -inset-1 bg-green-400/30 rounded-full animate-pulse" />
            </div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/75 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {area.name}
            </div>
          </motion.button>
        ))}

        {/* Yacht Booking Button */}
        <motion.button
          className="absolute top-4 right-4 z-10"
          whileHover={{ scale: 1.1 }}
          onClick={() => setShowBooking(true)}
        >
          <div className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
            <Ship className="w-5 h-5" />
            <span>Book Yacht Experience</span>
          </div>
        </motion.button>

        {/* Subscribe Sheet Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <motion.button
              className="fixed bottom-4 right-4 z-10"
              whileHover={{ scale: 1.1 }}
            >
              <div className="flex items-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-full shadow-lg">
                <ArrowUp className="w-5 h-5" />
                <span>Subscribe Now</span>
              </div>
            </motion.button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[400px] bg-gradient-to-r from-rose-100 to-green-100">
            <SheetHeader>
              <SheetTitle className="text-rose-600">Join The Morning Party</SheetTitle>
              <SheetDescription className="text-green-700">
                Subscribe to get exclusive access to our sunrise experiences and special events.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-rose-600">
                  Name
                </Label>
                <Input id="name" className="col-span-3 border-green-300 focus:ring-rose-500" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-rose-600">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3 border-green-300 focus:ring-rose-500" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right text-rose-600">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3 border-green-300 focus:ring-rose-500" />
              </div>
              <Button className="ml-auto bg-green-500 hover:bg-green-600 text-white">
                Subscribe
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Yacht Booking Modal */}
        <AnimatePresence>
          {showBooking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20"
            >
              <Card className="w-full max-w-2xl mx-4 bg-gradient-to-br from-rose-100 to-green-100">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                        <Ship className="w-6 h-6 text-rose-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-rose-600">Book Yacht Experience</h2>
                    </div>
                    <button
                      onClick={() => setShowBooking(false)}
                      className="text-green-700 hover:text-green-900"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-rose-600">Date</Label>
                        <Input id="date" type="date" className="border-green-300 focus:ring-rose-500" />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-rose-600">Time</Label>
                        <Input id="time" type="time" className="border-green-300 focus:ring-rose-500" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="guests" className="text-rose-600">Number of Guests</Label>
                      <Input id="guests" type="number" min="1" max="12" className="border-green-300 focus:ring-rose-500" />
                    </div>
                    <div>
                      <Label htmlFor="notes" className="text-rose-600">Special Requests</Label>
                      <Input id="notes" className="border-green-300 focus:ring-rose-500" />
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedArea && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <Card className="w-full max-w-2xl mx-4 bg-gradient-to-br from-rose-100 to-green-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                      <selectedArea.icon className="w-6 h-6 text-rose-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-rose-600">{selectedArea.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedArea(null)}
                    className="text-green-700 hover:text-green-900"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="mb-4 text-green-700">{selectedArea.description}</p>
                <Carousel className="w-full max-w-xl mx-auto">
                  <CarouselContent>
                    {selectedArea.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <Image
                          src={image}
                          alt={`${selectedArea.name} image ${index + 1}`}
                          width={600}
                          height={400}
                          className="rounded-lg"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio toggle button */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-4 left-4 z-10 bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        {isAudioPlaying ? '🔇' : '🔊'}
      </button>

      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        src="/morning-ambience.mp3"
      />
    </div>
  )
}

