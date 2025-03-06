"use client"
import { Suspense } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 sm:p-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500">
          Tribute to Atbss
        </h1>

        <p className="text-gray-700 mb-8 text-lg">Select a friend to view their special tribute page!</p>

        <div className="space-y-6">
          <Suspense fallback={<div>Loading...</div>}>
            <FriendSelector />
          </Suspense>
        </div>
      </div>

      <footer className="mt-8 text-white/80 text-sm">Made with ❤️ for the best friend group ever</footer>
    </div>
  )
}
;

import React from "react"

function FriendSelector() {
  const [selectedFriend, setSelectedFriend] = React.useState("")

  return (
    <>
      <Select onValueChange={setSelectedFriend}>
        <SelectTrigger className="w-full text-lg">
          <SelectValue placeholder="Choose a friend" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="arushi" className="text-purple-600 font-medium">
            Arushi The Best
          </SelectItem>
          <SelectItem value="chui" className="text-blue-600 font-medium">
            Chui Ka Bacha
          </SelectItem>
          <SelectItem value="bhatia" className="text-red-600 font-medium">
            Bhatia The Casanova
          </SelectItem>
        </SelectContent>
      </Select>

      <Button
        disabled={!selectedFriend}
        className="w-full text-lg py-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
        asChild
      >
        <Link href={selectedFriend ? `/tribute/${selectedFriend}` : "#"}>
          View Tribute <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </>
  )
}

