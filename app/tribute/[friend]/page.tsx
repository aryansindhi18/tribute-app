import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import TributeContent from "@/components/tribute-content"

// Define the friend data and questions
const friendsData = {
  arushi: {
    name: "Arushi The Best",
    theme: "theme-arushi",
    themeColor: "purple",
    questions: [
      {
        question: "Full form of ATBSSS?",
        options: [
          "Arushi, Aryan, Archit The Best",
          "A True Bond Stays Super Strong",
          "All Time Best Squad Super Strong",
          "Aryan, The Best Squad Superstars",
        ],
        correctAnswer: 0,
        unlocksMemories: [0,1, 2, 3],
      },
      {
        question: "How many years have we known each other?",
        options: ["5", "7", "10", "12"],
        correctAnswer: 2,
        unlocksMemories: [4, 5, 6],
      },
      {
        question: "Where did we first meet?",
        options: ["School", "College", "Lakshya", "Online"],
        correctAnswer: 2,
        unlocksMemories: [7, 8, 9],
      },
      {
        question: "Who's my favorite actress?",
        options: ["Alia Bhatt", "Shraddha Kapoor", "Deepika Padukone", "Katrina Kaif"],
        correctAnswer: 1,
        unlocksMemories: [10, 11,12],
      },
      {
        question: "What's my most used phrase?",
        options: ["I knew it", "Interesting", "Kya baat hai", "Let's do this"],
        correctAnswer: 1,
        unlocksMemories: [13,14,15,16],
      },
      {
        question: "What's one thing you admire most about me?",
        type: "open-ended",
        message:
          "That's the right answer! ❤️ Now, send this to me on WhatsApp because I won't see your answer here. Also, just know that I'm forever grateful for you being in my life. 😊",
        unlocksAllRemaining: true,
      },
    ],
    memories: [
      { title: "Lakshya Days!", image: "https://lh3.googleusercontent.com/d/1Dxn73J4LxofWyB-Czs1Se9RGLsBEUkvm=w500-h500", set: "Beginnings" },
      { title: "Chd Trip with chui and garg!", image: "https://lh3.googleusercontent.com/d/1PNki1MPvShSPhakagIWB6k6y2eyUk1RU=w500-h500", set: "Beginnings" },
      { title: "Graduation Day!", image: "https://lh3.googleusercontent.com/d/1fZuXPBAs4Xyxh22jKjCRFZIls-VeLrEh=w500-h500", set: "Beginnings" },
      { title: "The OG picture!", image: "https://lh3.googleusercontent.com/d/19QGAe-_3JyOd9YZQKb6o_W5JQPHY-X8B=w500-h500", set: "Beginnings" },
      { title: "Convocation@Shaurya", image: "https://lh3.googleusercontent.com/d/1b6hbZRxOLSqHBhklv-BCmYwxwfULjITs=w500-h500", set: "Beginnings" },
      { title: "Convocation@Elevate", image: "https://lh3.googleusercontent.com/d/1vw9pmVn9RmZLj7rZBshLooiJMutGa6WR=w500-h500", set: "Beginnings" },
      { title: "Chandigarh trip with simar, golu, bhatia, anjali", image: "https://lh3.googleusercontent.com/d/13mBMmzs1khCEqiwlo_nL1hOTMB-E3ZzC=w500-h500", set: "Celebrations" },
      { title: "Ooty <3 Coorg", image: "https://lh3.googleusercontent.com/d/11UtB9ve_nB8bRAqDWw-7XLYvxmoVy3SS=w500-h500", set: "Celebrations" },
      { title: "Ooty <3 Coorg", image: "https://lh3.googleusercontent.com/d/1W9KyOKGq7h16PqP1JlCPgQDusuzFbt10=w500-h500", set: "Celebrations" },
      { title: "Ooty <3 Coorg", image: "https://lh3.googleusercontent.com/d/1RHSwWanoJ35r-GBOj4COy9oh_w-wH96t=w500-h500", set: "Adventures" },
      { title: "My first visit to Worldmark", image: "https://lh3.googleusercontent.com/d/1QRVsXdNPtfoHXOUdliSRhSs8Fk9vYcBp=w500-h500", set: "Adventures" },
      { title: "The Pallette...", image: "https://lh3.googleusercontent.com/d/1V3-ngMxkR2bvVVzpahSZQKr7wMBCwyji=w500-h500", set: "Adventures" },
      { title: "India gate...", image: "https://lh3.googleusercontent.com/d/1NZ2aOwTXn71ARu1P8T55BmJhJL4nDGWi=w500-h500", set: "Fun Times" },
      { title: "Birthday Surprise!", image: "https://lh3.googleusercontent.com/d/1CdrHP0o8nniaZuB8--WyXAm0B6lqedE0=w500-h500", set: "Fun Times" },
      { title: "Select City Walk", image: "https://lh3.googleusercontent.com/d/1ozlCAPbrRxPj0fwSQc3dmQOYQf9_qqXW=w500-h500", set: "Challenges" },
      { title: "Cuties@Cyberhub", image: "https://lh3.googleusercontent.com/d/1wnrjASKxpWIkudzvjAfyWab-Mio19o1j=w500-h500", set: "Challenges" },
      { title: "Diluminatiiiiii!!", image: "https://lh3.googleusercontent.com/d/129r92FFCB_9HF4QWuh4_YDA-vBUSRCgG=w500-h500", set: "Special Moments" },
    ],
    finalMessage:
      "Arushi, you truly are the best friend anyone could ask for. Your kindness, intelligence, and humor make every day brighter. Here's to many more years of friendship! ❤️",
  },
  chui: {
    name: "Chui Ka Bacha",
    theme: "theme-chui",
    themeColor: "blue",
    questions: [
      {
        question: "What's my favorite sport?",
        options: ["Cricket", "Football", "Basketball", "Tennis"],
        correctAnswer: 1,
      },
      {
        question: "What nickname do I hate the most?",
        options: ["Chuchu", "Bacha", "Kitty", "Chui"],
        correctAnswer: 2,
      },
      {
        question: "What's my go-to food order?",
        options: ["Pizza", "Burger", "Biryani", "Noodles"],
        correctAnswer: 3,
      },
      {
        question: "Which game do I always win?",
        options: ["Chess", "Monopoly", "UNO", "Ludo"],
        correctAnswer: 0,
      },
      {
        question: "What's my favorite movie genre?",
        options: ["Action", "Comedy", "Sci-Fi", "Horror"],
        correctAnswer: 2,
      },
    ],
    memories: [
      {
        title: "Gaming Night",
        description: "That time we stayed up till 5 AM playing games and you still won every round!",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "Beach Day",
        description: "Building sandcastles and swimming until sunset. Perfect day!",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "First Day of College",
        description: "Both nervous but pretending to be cool. Look how far we've come!",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "Concert Night",
        description: "Dancing like nobody's watching at our first concert together.",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "Study Sessions",
        description: "Somehow we managed to study and have fun at the same time.",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    finalMessage:
      "Chui, your energy and enthusiasm make every moment memorable. Thanks for always being there through thick and thin. You're not just a friend, you're family! 💙",
  },
  bhatia: {
    name: "Bhatia The Casanova",
    theme: "theme-bhatia",
    themeColor: "red",
    questions: [
      {
        question: "How many crushes have I had this year?",
        options: ["Just 1", "Around 5", "Too many to count", "None, I'm loyal now"],
        correctAnswer: 2,
      },
      {
        question: "What's my signature pickup line?",
        options: [
          "Are you a camera? Because I smile every time I look at you",
          "Do you have a map? I keep getting lost in your eyes",
          "Are you made of copper and tellurium? Because you're Cu-Te",
          "Is your name Google? Because you have everything I'm searching for",
        ],
        correctAnswer: 3,
      },
      {
        question: "What's my dream destination?",
        options: ["Paris", "New York", "Santorini", "Bali"],
        correctAnswer: 2,
      },
      {
        question: "What's my favorite cologne?",
        options: ["Dior Sauvage", "Bleu de Chanel", "Versace Eros", "Tom Ford Tobacco Vanille"],
        correctAnswer: 1,
      },
      {
        question: "What's my biggest dating disaster?",
        options: [
          "Called the wrong name",
          "Spilled drink on date",
          "Forgot wallet at home",
          "Accidentally texted date about the date",
        ],
        correctAnswer: 3,
      },
    ],
    memories: [
      {
        title: "Wingman Duties",
        description: "All those times I was your wingman and somehow ended up third-wheeling!",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "Late Night Advice",
        description: "Those 2 AM calls asking for relationship advice that turned into philosophical discussions.",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "Double Date",
        description: "That awkward double date that we still laugh about to this day.",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "Gym Buddies",
        description: "Pushing each other to do one more rep and then heading straight for burgers!",
        image: "/placeholder.svg?height=300&width=300",
      },
      {
        title: "New Year's Party",
        description: "Ringing in the new year with promises we knew we wouldn't keep!",
        image: "/placeholder.svg?height=300&width=300",
      },
    ],
    finalMessage:
      "Bhatia, behind that casanova facade is the most loyal and caring friend. Thanks for all the laughs, advice, and unforgettable memories. You're one in a million! ❤️",
  },
}

export default function TributePage({ params }: { params: { friend: string } }) {
  const { friend } = params

  // Check if the friend exists in our data
  if (!friendsData[friend as keyof typeof friendsData]) {
    notFound()
  }

  const friendData = friendsData[friend as keyof typeof friendsData]

  return (
    <div
      className={`min-h-screen ${friendData.theme} bg-gradient-to-br from-[hsl(var(--theme-bg-start))] to-[hsl(var(--theme-bg-end))]`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link
            href="/"
            className="flex items-center text-white hover:text-[hsl(var(--theme-secondary))] transition-colors"
          >
            <ChevronLeft className="mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <TributeContent friendData={friendData} />
      </div>
    </div>
  )
}

