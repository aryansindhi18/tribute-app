// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Lock, Check, X } from "lucide-react"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"

// export default function TributeContent({ friendData }: { friendData: any }) {
//   const sortedQuestions = friendData.questions.filter(q => q.type !== "open-ended");
//   const openEndedQuestion = friendData.questions.find(q => q.type === "open-ended");

//   const [unlockedMemories, setUnlockedMemories] = useState<number[]>([])
//   const [currentQuiz, setCurrentQuiz] = useState<number | null>(null)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
//   const [openEndedAnswer, setOpenEndedAnswer] = useState("")
//   const [showOpenEndedMessage, setShowOpenEndedMessage] = useState(false)
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     setProgress((unlockedMemories.length / friendData.memories.length) * 100)
//   }, [unlockedMemories, friendData.memories.length])

//   /*const handleMemoryCardClick = (index: number) => {
//     if (unlockedMemories.includes(index)) {
//       // Memory is already unlocked, do nothing
//       return
//     }

//     // Find the next unanswered question
//     const nextQuestionIndex = friendData.questions.findIndex(
//       (q: any, idx: number) => !unlockedMemories.includes(idx) && q.type !== "open-ended",
//     )

//     if (nextQuestionIndex !== -1) {
//       setCurrentQuiz(nextQuestionIndex)
//       setSelectedAnswer(null)
//       setIsAnswerCorrect(null)
//     } else {
//       // All MCQs answered, show open-ended question
//       setCurrentQuiz(friendData.questions.length - 1)
//     }
//   }*/
//   const handleMemoryCardClick = (index: number) => {
//   if (unlockedMemories.includes(index)) return;

//   // Find the question(s) that unlock this memory, excluding open-ended
//   const relevantMCQIndex = sortedQuestions.findIndex(
//     (q: any, idx: number) => q.unlocksMemories?.includes(index) && q.type !== "open-ended"
//   );

//   if (relevantMCQIndex !== -1) {
//     setCurrentQuiz(relevantMCQIndex);
//     setSelectedAnswer(null);
//     setIsAnswerCorrect(null);
//   } else {
//     // If all MCQs are done, ask the open-ended question
//     setCurrentQuiz(sortedQuestions.length - 1);
//   }
// };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//   }

//   const handleSubmitAnswer = () => {
//     if (currentQuiz === null || selectedAnswer === null) return

//     const question = sortedQuestions[currentQuiz]

//     if (selectedAnswer === question.correctAnswer) {
//       setIsAnswerCorrect(true)

//       // Add a delay before unlocking the memories
//       setTimeout(() => {
//         const newUnlockedMemories = [...unlockedMemories, ...question.unlocksMemories]
//         setUnlockedMemories([...new Set(newUnlockedMemories)])
//         setCurrentQuiz(null)
//         setSelectedAnswer(null)
//         setIsAnswerCorrect(null)
//       }, 1500)
//     } else {
//       setIsAnswerCorrect(false)
//     }
//   }

//   const handleOpenEndedSubmit = () => {
//     if (openEndedAnswer.trim() !== "") {
//       setShowOpenEndedMessage(true)

//       // // Add a delay before unlocking all remaining memories
//       // setTimeout(() => {
//       //   const allMemoryIndices = friendData.memories.map((_: any, index: number) => index)
//       //   setUnlockedMemories(allMemoryIndices)
//       //   setCurrentQuiz(null)
//       //   // setOpenEndedAnswer("")
//       // }, 5000)
//     }
//   }

//   const getThemeTextColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "text-purple-600"
//       case "blue":
//         return "text-blue-600"
//       case "red":
//         return "text-red-600"
//       default:
//         return "text-gray-900"
//     }
//   }

//   const getThemeBgColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "bg-purple-600"
//       case "blue":
//         return "bg-blue-600"
//       case "red":
//         return "bg-red-600"
//       default:
//         return "bg-gray-900"
//     }
//   }

//   const getThemeHoverColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "hover:bg-purple-700"
//       case "blue":
//         return "hover:bg-blue-700"
//       case "red":
//         return "hover:bg-red-700"
//       default:
//         return "hover:bg-gray-800"
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Tribute to {friendData.name}</h1>
//       <p className="text-white/80 text-center mb-4 text-lg">
//         Unlock memories by answering questions about our friendship!
//       </p>

//       {/* Progress Bar */}
//       <div className="mb-8">
//         <Progress value={progress} className="w-full" />
//         <p className="text-center text-white mt-2">
//           {unlockedMemories.length} / {friendData.memories.length} Memories Unlocked
//         </p>
//       </div>

//       {/* Memory Cards Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
//         {friendData.memories.map((memory: any, index: number) => (
//           <div
//             key={index}
//             className={`memory-card ${unlockedMemories.includes(index) ? "flipped" : ""}`}
//             onClick={() => handleMemoryCardClick(index)}
//           >
//             <div className="card-inner">
//               {/* Front of card (locked state) */}
//               <Card className="card-front h-48 sm:h-56 flex flex-col items-center justify-center p-4 cursor-pointer bg-white shadow-md">
//                 {!unlockedMemories.includes(index) && (
//                   <div className="text-center">
//                     <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                     <p className="text-gray-600 text-sm">Locked</p>
//                   </div>
//                 )}
//               </Card>

//               {/* Back of card (unlocked polaroid style) */}
//               {/* <Card className="card-back h-48 sm:h-56 flex flex-col bg-white shadow-md border-4 border-white">
//                 <div className="relative flex-grow">
//                   <Image src={memory.image || "/placeholder.svg"} alt={memory.title} fill className="object-cover" />
//                 </div>
//                 <div className="p-2 text-center border-t">
//                   <h3 className={`font-bold text-sm ${getThemeTextColor()}`}>{memory.title}</h3>
//                 </div>
//               </Card> */}
//                <Card className="card-back h-64 sm:h-72 flex flex-col bg-white shadow-md border-4 border-white rounded-lg min-h-[250px] ">
//                 <div className="relative w-full h-4/5 overflow-hidden rounded-t-lg">
//                   <Image
//                     src={memory.image}
//                     alt={memory.title}
//                     layout="fill"
//                     objectFit="cover"
//                     objectPosition="50% 30%"
//                   />
//                 </div>
//                 <div className="h-1/5 flex items-center justify-center p-2 border-t bg-white min-h-[60px]">
//                   <h3 className="font-bold text-xs md:text-sm text-purple-700">{memory.title}</h3>
//                 </div>
//               </Card> 
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quiz Modal */}
//       {currentQuiz !== null && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
//           <Card className="max-w-md w-full p-6 bg-white/95 backdrop-blur-sm">
//             {sortedQuestions[currentQuiz]?.type === "open-ended" ? (
//               // Open-ended question
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz].question}</h3>

// {/*                 {showOpenEndedMessage ? (
//                   <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                     <p className="text-green-800">{sortedQuestions[currentQuiz].message}</p>
//                   </div>
//                 ) : ( */}
//                     <Textarea
//                       value={openEndedAnswer}
//                       onChange={(e) => setOpenEndedAnswer(e.target.value)}
//                       placeholder="Type your answer here..."
//                       className="mb-4"
//                       rows={4}
//                       disabled={showOpenEndedMessage} // Disable input after submission, but keep text visible
//                     />

//                     {showOpenEndedMessage && (
//                       <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                         <p className="text-green-800">
//                           ❤️ That's the right answer! Now, send this to me on WhatsApp because I won't see your answer here. 
//                           Also, just know that I'm forever grateful for you being in my life. 😊
//                         </p>
//                       </div>
//                     )}

//                     <div className="flex justify-between">
//                       <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                         Cancel
//                       </Button>
//                       <Button
//                         className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                         onClick={handleOpenEndedSubmit}
//                         disabled={openEndedAnswer.trim() === "" || showOpenEndedMessage} // Prevent resubmission
//                       >
//                         Submit Answer
//                       </Button>
//                     </div>
// {/*                 ) */}
//                   }
//               </div>
//             ) : (
//               // Multiple choice question
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz]?.question}</h3>

//                 <div className="space-y-3 mb-6">
//                   {sortedQuestions[currentQuiz]?.options.map((option: string, idx: number) => (
//                     <div
//                       key={idx}
//                       className={`p-3 rounded-lg border cursor-pointer transition-all ${
//                         selectedAnswer === idx
//                           ? isAnswerCorrect === null
//                             ? `${getThemeBgColor()} text-white`
//                             : isAnswerCorrect
//                               ? "bg-green-100 border-green-300"
//                               : "bg-red-100 border-red-300"
//                           : "hover:bg-gray-50"
//                       }`}
//                       onClick={() => isAnswerCorrect === null && handleAnswerSelect(idx)}
//                     >
//                       <div className="flex items-center">
//                         {selectedAnswer === idx &&
//                           isAnswerCorrect !== null &&
//                           (isAnswerCorrect ? (
//                             <Check className="w-5 h-5 mr-2 text-green-600" />
//                           ) : (
//                             <X className="w-5 h-5 mr-2 text-red-600" />
//                           ))}
//                         <span>{option}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-between">
//                   <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                     Cancel
//                   </Button>
//                   <Button
//                     className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                     onClick={handleSubmitAnswer}
//                     disabled={selectedAnswer === null || isAnswerCorrect !== null}
//                   >
//                     {isAnswerCorrect === null ? "Submit Answer" : "Correct!"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Card>
//         </div>
//       )}

//       {/* Final Message */}
//       {unlockedMemories.length === friendData.memories.length ? (
//   <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
//     <h2 className={`text-2xl font-bold mb-4 ${getThemeTextColor()}`}>🎉 Congratulations! 🎉</h2>
//     <p className="text-gray-700 mb-4">
//       You've unlocked all the memories! Now, there's just one last thing left:
//     </p>

//     {/* Open-Ended Question */}
//     {openEndedQuestion && (
//       <>
//         <h3 className="text-xl font-semibold mb-2">{openEndedQuestion.question}</h3>
        
//         {showOpenEndedMessage ? (
//           <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//             <p className="text-green-800">{openEndedQuestion.message}</p>
//           </div>
//         ) : (
//           <>
//             <Textarea
//               value={openEndedAnswer}
//               onChange={(e) => setOpenEndedAnswer(e.target.value)}
//               placeholder="Type your answer here..."
//               className="mb-4"
//               rows={4}
//             />
//             <Button
//               className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//               onClick={handleOpenEndedSubmit}
//               disabled={openEndedAnswer.trim() === ""}
//             >
//               Submit Answer
//             </Button>
//           </>
//         )}
//       </>
//     )}
//   </div>
// ) : null}
// {/* Final Heartfelt Letter */}
// <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center mt-8 shadow-lg">
//   <h2 className={`text-3xl font-bold mb-4 ${getThemeTextColor()}`}>A Letter to My Dearest Gupts</h2>
  
//   <p className="text-gray-700 text-left mb-4">
//     <strong>Dearest Arushi,</strong>
//   </p>
  
//   <p className="text-gray-700 text-left mb-4">
//     How do I begin to describe a friendship that has been my lifeline? Ten years ago, when life seemed like a complex maze of challenges, you emerged as my unexpected guardian angel. At 16, when my world was fragmenting—family tensions, a painful breakup, and drifting friendships—you walked into my life with a force of nature that I could never have anticipated.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     I was that quiet kid, lost in my own world of silence and struggle. You, with your vibrant energy, broke through my walls. Our first interactions were in that lakshya van, where your relentless conversation drew me out of my shell. You didn't just talk; you listened. You didn't just hear; you understood.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     When I found it difficult to express my tumultuous emotions, you gave me the most precious gift—the advice to write. Those words became my therapy, my salvation. You taught me that vulnerability isn't weakness; it's strength. In a world where I'm known for being intensely private, you became my safe haven—the one person with whom my guard completely drops.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     People often wonder why I share everything with you and nothing with others. The truth is, you're not just a friend. You're a rare human being who was perhaps strategically placed in my life by the universe. You've been my counselor, my cheerleader, my reality check, and my constant source of unwavering support.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     Remember the Garg fiasco? Even during our downs, our friendship emerged stronger. That's the magic of what we share—a bond that transcends momentary conflicts.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     If I seem overprotective, if I cancel plans, if I go out of my way for you, don't think that I am doing too much—understand that it's a mere fraction of gratitude for what you've done for me. You helped me grow, heal, and become a better version of myself. My journey of self-discovery has your fingerprints all over it.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     So, my dearest <strong className="font-bold">Gupts</strong>, this is more than a thank you. This is an acknowledgment of a friendship that feels divinely orchestrated. You're irreplaceable, incomparable, and infinite in your capacity to love and support.
//   </p>

//   <p className="text-gray-700 text-left italic mb-6">
//   <strong>
//     "Mannat se jo mila, qismat ne jo diya<br />
//     Tohfa hai yaar tu!!"
//     </strong>
//   </p>

//   <p className="text-gray-700 text-left">
//     <strong>Love you more than words can express,</strong><br />
//     Your Aryan (Sinds) 💜
//   </p>
// </div>


//     </div>
//   )
// }


// ========================================================================================================================



// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Lock, Check, X } from "lucide-react"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"

// export default function TributeContent({ friendData }: { friendData: any }) {
//   const sortedQuestions = friendData.questions.filter(q => q.type !== "open-ended");
//   const openEndedQuestion = friendData.questions.find(q => q.type === "open-ended");

//   const [unlockedMemories, setUnlockedMemories] = useState<number[]>([])
//   const [currentQuiz, setCurrentQuiz] = useState<number | null>(null)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
//   const [openEndedAnswer, setOpenEndedAnswer] = useState("")
//   const [showOpenEndedMessage, setShowOpenEndedMessage] = useState(false)
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     setProgress((unlockedMemories.length / friendData.memories.length) * 100)
//   }, [unlockedMemories, friendData.memories.length])

//   const handleMemoryCardClick = (index: number) => {
//     if (unlockedMemories.includes(index)) return;

//     const relevantMCQIndex = sortedQuestions.findIndex(
//       (q: any) => q.unlocksMemories?.includes(index) && q.type !== "open-ended"
//     );

//     if (relevantMCQIndex !== -1) {
//       setCurrentQuiz(relevantMCQIndex);
//       setSelectedAnswer(null);
//       setIsAnswerCorrect(null);
//     } else {
//       setCurrentQuiz(sortedQuestions.length - 1);
//     }
//   };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//   }

//   const handleSubmitAnswer = () => {
//     if (currentQuiz === null || selectedAnswer === null) return

//     const question = sortedQuestions[currentQuiz]

//     if (selectedAnswer === question.correctAnswer) {
//       setIsAnswerCorrect(true)

//       setTimeout(() => {
//         const newUnlockedMemories = [...unlockedMemories, ...question.unlocksMemories]
//         setUnlockedMemories([...new Set(newUnlockedMemories)])
//         setCurrentQuiz(null)
//         setSelectedAnswer(null)
//         setIsAnswerCorrect(null)
//       }, 1500)
//     } else {
//       setIsAnswerCorrect(false)
//     }
//   }

//   const handleOpenEndedSubmit = () => {
//     if (openEndedAnswer.trim() !== "") {
//       setShowOpenEndedMessage(true)
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Tribute to {friendData.name}</h1>
//       <p className="text-white/80 text-center mb-4 text-lg">
//         Unlock memories by answering questions about our friendship!
//       </p>

//       <div className="mb-8">
//         <Progress value={progress} className="w-full" />
//         <p className="text-center text-white mt-2">
//           {unlockedMemories.length} / {friendData.memories.length} Memories Unlocked
//         </p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
//         {friendData.memories.map((memory: any, index: number) => (
//           <Card key={index} className="flex flex-col items-center justify-center p-4 bg-white shadow-md border-4 border-white rounded-lg">
//             <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-lg">
//               <Image src={memory.image} alt={memory.title} layout="fill" objectFit="contain" />
//             </div>
//             <div className="h-16 flex items-center justify-center p-2 border-t bg-white w-full">
//               <h3 className="text-center font-bold text-sm text-purple-700">{memory.title}</h3>
//             </div>
//           </Card>
//         ))}
//       </div>

//       {unlockedMemories.length === friendData.memories.length && (
//         <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
//           <h2 className="text-2xl font-bold mb-4 text-purple-700">🎉 Congratulations! 🎉</h2>
//           <p className="text-gray-700 mb-4">
//             You've unlocked all the memories! Now, there's just one last thing left:
//           </p>
//           {openEndedQuestion && (
//             <>
//               <h3 className="text-xl font-semibold mb-2">{openEndedQuestion.question}</h3>
//               <Textarea
//                 value={openEndedAnswer}
//                 onChange={(e) => setOpenEndedAnswer(e.target.value)}
//                 placeholder="Type your answer here..."
//                 className="mb-4"
//                 rows={4}
//                 disabled={showOpenEndedMessage}
//               />
//               {showOpenEndedMessage && (
//                 <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                   <p className="text-green-800">
//                     ❤️ That's the right answer! Now, send this to me on WhatsApp because I won't see your answer here.
//                     Also, just know that I'm forever grateful for you being in my life. 😊
//                   </p>
//                 </div>
//               )}
//               <Button
//                 className="bg-purple-600 hover:bg-purple-700 text-white"
//                 onClick={handleOpenEndedSubmit}
//                 disabled={openEndedAnswer.trim() === "" || showOpenEndedMessage}
//               >
//                 Submit Answer
//               </Button>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// ========================================================================================================================
// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Lock, Check, X } from "lucide-react"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"

// export default function TributeContent({ friendData }: { friendData: any }) {
//   const sortedQuestions = friendData.questions.filter(q => q.type !== "open-ended");
//   const openEndedQuestion = friendData.questions.find(q => q.type === "open-ended");

//   const [unlockedMemories, setUnlockedMemories] = useState<number[]>([])
//   const [currentQuiz, setCurrentQuiz] = useState<number | null>(null)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
//   const [openEndedAnswer, setOpenEndedAnswer] = useState("")
//   const [showOpenEndedMessage, setShowOpenEndedMessage] = useState(false)
//   const [progress, setProgress] = useState(0)

//   useEffect(() => {
//     setProgress((unlockedMemories.length / friendData.memories.length) * 100)
//   }, [unlockedMemories, friendData.memories.length])

//   /*const handleMemoryCardClick = (index: number) => {
//     if (unlockedMemories.includes(index)) {
//       // Memory is already unlocked, do nothing
//       return
//     }

//     // Find the next unanswered question
//     const nextQuestionIndex = friendData.questions.findIndex(
//       (q: any, idx: number) => !unlockedMemories.includes(idx) && q.type !== "open-ended",
//     )

//     if (nextQuestionIndex !== -1) {
//       setCurrentQuiz(nextQuestionIndex)
//       setSelectedAnswer(null)
//       setIsAnswerCorrect(null)
//     } else {
//       // All MCQs answered, show open-ended question
//       setCurrentQuiz(friendData.questions.length - 1)
//     }
//   }*/
//   const handleMemoryCardClick = (index: number) => {
//   if (unlockedMemories.includes(index)) return;

//   // Find the question(s) that unlock this memory, excluding open-ended
//   const relevantMCQIndex = sortedQuestions.findIndex(
//     (q: any, idx: number) => q.unlocksMemories?.includes(index) && q.type !== "open-ended"
//   );

//   if (relevantMCQIndex !== -1) {
//     setCurrentQuiz(relevantMCQIndex);
//     setSelectedAnswer(null);
//     setIsAnswerCorrect(null);
//   } else {
//     // If all MCQs are done, ask the open-ended question
//     setCurrentQuiz(sortedQuestions.length - 1);
//   }
// };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//   }

//   const handleSubmitAnswer = () => {
//     if (currentQuiz === null || selectedAnswer === null) return

//     const question = sortedQuestions[currentQuiz]

//     if (selectedAnswer === question.correctAnswer) {
//       setIsAnswerCorrect(true)

//       // Add a delay before unlocking the memories
//       setTimeout(() => {
//         const newUnlockedMemories = [...unlockedMemories, ...question.unlocksMemories]
//         setUnlockedMemories([...new Set(newUnlockedMemories)])
//         setCurrentQuiz(null)
//         setSelectedAnswer(null)
//         setIsAnswerCorrect(null)
//       }, 1500)
//     } else {
//       setIsAnswerCorrect(false)
//     }
//   }

//   const handleOpenEndedSubmit = () => {
//     if (openEndedAnswer.trim() !== "") {
//       setShowOpenEndedMessage(true)

//       // // Add a delay before unlocking all remaining memories
//       // setTimeout(() => {
//       //   const allMemoryIndices = friendData.memories.map((_: any, index: number) => index)
//       //   setUnlockedMemories(allMemoryIndices)
//       //   setCurrentQuiz(null)
//       //   // setOpenEndedAnswer("")
//       // }, 5000)
//     }
//   }

//   const getThemeTextColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "text-purple-600"
//       case "blue":
//         return "text-blue-600"
//       case "red":
//         return "text-red-600"
//       default:
//         return "text-gray-900"
//     }
//   }

//   const getThemeBgColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "bg-purple-600"
//       case "blue":
//         return "bg-blue-600"
//       case "red":
//         return "bg-red-600"
//       default:
//         return "bg-gray-900"
//     }
//   }

//   const getThemeHoverColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "hover:bg-purple-700"
//       case "blue":
//         return "hover:bg-blue-700"
//       case "red":
//         return "hover:bg-red-700"
//       default:
//         return "hover:bg-gray-800"
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Tribute to {friendData.name}</h1>
//       <p className="text-white/80 text-center mb-4 text-lg">
//         Unlock memories by answering questions about our friendship!
//       </p>

//       {/* Progress Bar */}
//       <div className="mb-8">
//         <Progress value={progress} className="w-full" />
//         <p className="text-center text-white mt-2">
//           {unlockedMemories.length} / {friendData.memories.length} Memories Unlocked
//         </p>
//       </div>

//       {/* Memory Cards Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
//         {friendData.memories.map((memory: any, index: number) => (
//           <div
//             key={index}
//             className={`memory-card ${unlockedMemories.includes(index) ? "flipped" : ""}`}
//             onClick={() => handleMemoryCardClick(index)}
//           >
//             <div className="card-inner">
//               {/* Front of card (locked state) */}
//               <Card className="card-front h-48 sm:h-56 flex flex-col items-center justify-center p-4 cursor-pointer bg-white shadow-md">
//                 {!unlockedMemories.includes(index) && (
//                   <div className="text-center">
//                     <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                     <p className="text-gray-600 text-sm">Locked</p>
//                   </div>
//                 )}
//               </Card>

//               {/* Back of card (unlocked polaroid style) */}
//               {/* <Card className="card-back h-48 sm:h-56 flex flex-col bg-white shadow-md border-4 border-white">
//                 <div className="relative flex-grow">
//                   <Image src={memory.image || "/placeholder.svg"} alt={memory.title} fill className="object-cover" />
//                 </div>
//                 <div className="p-2 text-center border-t">
//                   <h3 className={`font-bold text-sm ${getThemeTextColor()}`}>{memory.title}</h3>
//                 </div>
//               </Card> */}
//                <Card className="card-back h-64 sm:h-72 flex flex-col bg-white shadow-md border-4 border-white rounded-lg min-h-[250px] ">
//                 <div className="relative w-full h-4/5 overflow-hidden rounded-t-lg">
//                   <Image
//                     src={memory.image}
//                     alt={memory.title}
//                     layout="fill"
//                     objectFit="cover"
//                     objectPosition="50% 30%"
//                   />
//                 </div>
//                 <div className="h-1/5 flex items-center justify-center p-2 border-t bg-white min-h-[60px]">
//                   <h3 className="font-bold text-xs md:text-sm text-purple-700 text-center">{memory.title}</h3>
//                 </div>
//               </Card> 
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quiz Modal */}
//       {currentQuiz !== null && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
//           <Card className="max-w-md w-full p-6 bg-white/95 backdrop-blur-sm">
//             {sortedQuestions[currentQuiz]?.type === "open-ended" ? (
//               // Open-ended question
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz].question}</h3>

// {/*                 {showOpenEndedMessage ? (
//                   <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                     <p className="text-green-800">{sortedQuestions[currentQuiz].message}</p>
//                   </div>
//                 ) : ( */}
//                     <Textarea
//                       value={openEndedAnswer}
//                       onChange={(e) => setOpenEndedAnswer(e.target.value)}
//                       placeholder="Type your answer here..."
//                       className="mb-4"
//                       rows={4}
//                       disabled={showOpenEndedMessage} // Disable input after submission, but keep text visible
//                     />

//                     {showOpenEndedMessage && (
//                       <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                         <p className="text-green-800">
//                           ❤️ That's the right answer! Now, send this to me on WhatsApp because I won't see your answer here. 
//                           Also, just know that I'm forever grateful for you being in my life. 😊
//                         </p>
//                       </div>
//                     )}

//                     <div className="flex justify-between">
//                       <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                         Cancel
//                       </Button>
//                       <Button
//                         className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                         onClick={handleOpenEndedSubmit}
//                         disabled={openEndedAnswer.trim() === "" || showOpenEndedMessage} // Prevent resubmission
//                       >
//                         Submit Answer
//                       </Button>
//                     </div>
// {/*                 ) */}
//                   }
//               </div>
//             ) : (
//               // Multiple choice question
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz]?.question}</h3>

//                 <div className="space-y-3 mb-6">
//                   {sortedQuestions[currentQuiz]?.options.map((option: string, idx: number) => (
//                     <div
//                       key={idx}
//                       className={`p-3 rounded-lg border cursor-pointer transition-all ${
//                         selectedAnswer === idx
//                           ? isAnswerCorrect === null
//                             ? `${getThemeBgColor()} text-white`
//                             : isAnswerCorrect
//                               ? "bg-green-100 border-green-300"
//                               : "bg-red-100 border-red-300"
//                           : "hover:bg-gray-50"
//                       }`}
//                       onClick={() => isAnswerCorrect === null && handleAnswerSelect(idx)}
//                     >
//                       <div className="flex items-center">
//                         {selectedAnswer === idx &&
//                           isAnswerCorrect !== null &&
//                           (isAnswerCorrect ? (
//                             <Check className="w-5 h-5 mr-2 text-green-600" />
//                           ) : (
//                             <X className="w-5 h-5 mr-2 text-red-600" />
//                           ))}
//                         <span>{option}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-between">
//                   <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                     Cancel
//                   </Button>
//                   <Button
//                     className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                     onClick={handleSubmitAnswer}
//                     disabled={selectedAnswer === null || isAnswerCorrect !== null}
//                   >
//                     {isAnswerCorrect === null ? "Submit Answer" : "Correct!"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Card>
//         </div>
//       )}

//       {/* Final Message */}
//       {unlockedMemories.length === friendData.memories.length ? (
//   <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
//     <h2 className={`text-2xl font-bold mb-4 ${getThemeTextColor()}`}>🎉 Congratulations! 🎉</h2>
//     <p className="text-gray-700 mb-4">
//       You've unlocked all the memories! Now, there's just one last thing left:
//     </p>

//     {/* Open-Ended Question */}
//     {openEndedQuestion && (
//       <>
//         <h3 className="text-xl font-semibold mb-2">{openEndedQuestion.question}</h3>
        
//         <Textarea
//           value={openEndedAnswer}
//           onChange={(e) => setOpenEndedAnswer(e.target.value)}
//           placeholder="Type your answer here..."
//           className="mb-4"
//           rows={4}
//           disabled={showOpenEndedMessage}
//         />
          
//         {showOpenEndedMessage ? (
//           <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//             <p className="text-green-800">{openEndedQuestion.message}</p>
//           </div>
//         ) : (
//           <Button
//             className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//             onClick={handleOpenEndedSubmit}
//             disabled={openEndedAnswer.trim() === ""}
//           >
//             Submit Answer
//           </Button>
//         )}
//       </>
//     )}
//   </div>
// ) : null}
// {/* Final Heartfelt Letter */}
// <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center mt-8 shadow-lg">
//   <h2 className={`text-3xl font-bold mb-4 ${getThemeTextColor()}`}>A Letter to My Dearest Gupts</h2>
  
//   <p className="text-gray-700 text-left mb-4">
//     <strong>Dearest Arushi,</strong>
//   </p>
  
//   <p className="text-gray-700 text-left mb-4">
//     How do I begin to describe a friendship that has been my lifeline? Ten years ago, when life seemed like a complex maze of challenges, you emerged as my unexpected guardian angel. At 16, when my world was fragmenting—family tensions, a painful breakup, and drifting friendships—you walked into my life with a force of nature that I could never have anticipated.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     I was that quiet kid, lost in my own world of silence and struggle. You, with your vibrant energy, broke through my walls. Our first interactions were in that lakshya van, where your relentless conversation drew me out of my shell. You didn't just talk; you listened. You didn't just hear; you understood.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     When I found it difficult to express my tumultuous emotions, you gave me the most precious gift—the advice to write. Those words became my therapy, my salvation. You taught me that vulnerability isn't weakness; it's strength. In a world where I'm known for being intensely private, you became my safe haven—the one person with whom my guard completely drops.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     People often wonder why I share everything with you and nothing with others. The truth is, you're not just a friend. You're a rare human being who was perhaps strategically placed in my life by the universe. You've been my counselor, my cheerleader, my reality check, and my constant source of unwavering support.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     Remember the Garg fiasco? Even during our downs, our friendship emerged stronger. That's the magic of what we share—a bond that transcends momentary conflicts.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     If I seem overprotective, if I cancel plans, if I go out of my way for you, don't think that I am doing too much—understand that it's a mere fraction of gratitude for what you've done for me. You helped me grow, heal, and become a better version of myself. My journey of self-discovery has your fingerprints all over it.
//   </p>

//   <p className="text-gray-700 text-left mb-4">
//     So, my dearest <strong className="font-bold">Gupts</strong>, this is more than a thank you. This is an acknowledgment of a friendship that feels divinely orchestrated. You're irreplaceable, incomparable, and infinite in your capacity to love and support.
//   </p>

//   <p className="text-gray-700 text-left italic mb-6">
//   <strong>
//     "Mannat se jo mila, qismat ne jo diya<br />
//     Tohfa hai yaar tu!!"
//     </strong>
//   </p>

//   <p className="text-gray-700 text-left">
//     <strong>Love you more than words can express,</strong><br />
//     Your Aryan (Sinds) 💜
//   </p>
// </div>


//     </div>
//   )
// }
// ============================
//latest code updated - 10 March 2025
// "use client"

// import { useState, useEffect,useRef } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Lock, Check, X } from "lucide-react"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";

// export default function TributeContent({ friendData }: { friendData: any }) {
//   const targetDivRef = useRef(null);
//   const [showFinalUnlocking, setShowFinalUnlocking] = useState(false);
//   const [countdown, setCountdown] = useState(3);
//   const sortedQuestions = friendData.questions.filter((q:any) => q.type !== "open-ended");
//   const openEndedQuestion = friendData.questions.find((q:any) => q.type === "open-ended");

//   const [unlockedMemories, setUnlockedMemories] = useState<number[]>([])
//   const [currentQuiz, setCurrentQuiz] = useState<number | null>(null)
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
//   const [openEndedAnswer, setOpenEndedAnswer] = useState("")
//   const [showOpenEndedMessage, setShowOpenEndedMessage] = useState(false)
//   const [progress, setProgress] = useState(0)
//   const [showCelebration, setShowCelebration] = useState(false)
//   const [showLetter, setShowLetter] = useState(false)
//   const [showLetterEnd,setShowLetterEnd] = useState(false);

//   const scrollToDiv = () => {
//       setShowLetter(false);
//       setShowCelebration(false);
//       setShowLetterEnd(true); // Ensures the target div is rendered before scrolling
    

//     // Wait for the next DOM update to ensure the element exists before scrolling
//     setTimeout(() => {
//       if (targetDivRef.current) {
//         (targetDivRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
//       }
//     }, 100); // Adjust timeout if needed
//   };

//   useEffect(() => {
//     if (unlockedMemories.length === friendData.memories.length) {
//       setShowFinalUnlocking(true); // Show countdown overlay
//       setCountdown(3); // Reset countdown
  
//       let countdownInterval = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev === 1) {
//             clearInterval(countdownInterval); // Stop countdown at 1
//             setTimeout(() => {
//               setShowFinalUnlocking(false); // Hide countdown overlay
//               setShowCelebration(true); // Show celebration popup
//             }, 1000); // Small delay after 1
//           }
//           return prev - 1;
//         });
//       }, 1000); // Countdown updates every 1s
//     }
//   }, [unlockedMemories, friendData.memories.length]);

 
//   const handleMemoryCardClick = (index: number) => {
//   if (unlockedMemories.includes(index)) return;

//   // Find the question(s) that unlock this memory, excluding open-ended
//   const relevantMCQIndex = sortedQuestions.findIndex(
//     (q: any, idx: number) => q.unlocksMemories?.includes(index) && q.type !== "open-ended"
//   );

//   if (relevantMCQIndex !== -1) {
//     setCurrentQuiz(relevantMCQIndex);
//     setSelectedAnswer(null);
//     setIsAnswerCorrect(null);
//   } else {
//     // If all MCQs are done, ask the open-ended question
//     setCurrentQuiz(sortedQuestions.length - 1);
//   }
// };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex)
//   }

//   const handleSubmitAnswer = () => {
//       if (currentQuiz === null || selectedAnswer === null) return;
    
//       const question = sortedQuestions[currentQuiz];
    
//       if (selectedAnswer === question.correctAnswer) {
//         setIsAnswerCorrect(true);
    
//         setTimeout(() => {
//           const newUnlockedMemories = [...unlockedMemories, ...question.unlocksMemories];
//           setUnlockedMemories([...new Set(newUnlockedMemories)]);
//           setCurrentQuiz(null);
//           setSelectedAnswer(null);
//           setIsAnswerCorrect(null);
    
//           // Find next locked memory card and scroll to it
//           setTimeout(() => {
//             const lockedMemoryCard = document.querySelector(".memory-card:not(.flipped)");
//             if (lockedMemoryCard) {
//               lockedMemoryCard.scrollIntoView({ behavior: "smooth", block: "center" });
//             }
//           }, 500); // Small delay to allow UI update before scrolling
    
//         }, 1500); // Delay after showing correct answer feedback
//       } else {
//         setIsAnswerCorrect(false);
//       }
//     };

//   const handleOpenEndedSubmit = () => {
//     if (openEndedAnswer.trim() !== "") {
//       setShowOpenEndedMessage(true)

//       // Add a delay before unlocking all remaining memories
//       setTimeout(() => {
//         const allMemoryIndices = friendData.memories.map((_: any, index: number) => index)
//         setUnlockedMemories(allMemoryIndices)
//         setCurrentQuiz(null)
//         setOpenEndedAnswer("")
//       }, 5000)
//     }
//   }

//   const getThemeTextColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "text-purple-600"
//       case "blue":
//         return "text-blue-600"
//       case "red":
//         return "text-red-600"
//       default:
//         return "text-gray-900"
//     }
//   }

//   const getThemeBgColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "bg-purple-600"
//       case "blue":
//         return "bg-blue-600"
//       case "red":
//         return "bg-red-600"
//       default:
//         return "bg-gray-900"
//     }
//   }

//   const getThemeHoverColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "hover:bg-purple-700"
//       case "blue":
//         return "hover:bg-blue-700"
//       case "red":
//         return "hover:bg-red-700"
//       default:
//         return "hover:bg-gray-800"
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Tribute to {friendData.name}</h1>
//       <p className="text-white/80 text-center mb-4 text-lg">
//         Unlock memories by answering questions about our friendship!
//       </p>

//       {/* Progress Bar */}
//       <div className="mb-8">
//         <Progress value={progress} className="w-full" />
//         <p className="text-center text-white mt-2">
//           {unlockedMemories.length} / {friendData.memories.length} Memories Unlocked
//         </p>
//       </div>

//       {/* Memory Cards Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
//         {friendData.memories.map((memory: any, index: number) => (
//           <div
//             key={index}
//             className={`memory-card ${unlockedMemories.includes(index) ? "flipped" : ""}`}
//             onClick={() => handleMemoryCardClick(index)}
//           >
//             <div className="card-inner">
//               {/* Front of card (locked state) */}
//               <Card className="card-front h-48 sm:h-56 flex flex-col items-center justify-center p-4 cursor-pointer bg-white shadow-md">
//                 {!unlockedMemories.includes(index) && (
//                   <div className="text-center">
//                     <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                     <p className="text-gray-600 text-sm">Locked</p>
//                   </div>
//                 )}
//               </Card>

//               {/* Back of card (unlocked polaroid style) */}
//               {/* <Card className="card-back h-48 sm:h-56 flex flex-col bg-white shadow-md border-4 border-white">
//                 <div className="relative flex-grow">
//                   <Image src={memory.image || "/placeholder.svg"} alt={memory.title} fill className="object-cover" />
//                 </div>
//                 <div className="p-2 text-center border-t">
//                   <h3 className={`font-bold text-sm ${getThemeTextColor()}`}>{memory.title}</h3>
//                 </div>
//               </Card> */}
//               <Card className="card-back h-64 sm:h-72 flex flex-col bg-white shadow-md border-4 border-white rounded-lg">
//                 <div className="relative w-full h-4/5 overflow-hidden rounded-t-lg">
//                   <Image
//                           src={memory.image}
//                           alt={memory.title}
//                           fill
//                           style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
//                   />
//                 </div>
//                 <div className="h-1/5 flex items-center justify-center p-2 border-t bg-white">
//                   <h3 className="font-bold text-xs md:text-sm text-purple-700">{memory.title}</h3>
//                 </div>
//               </Card>

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Quiz Modal */}
//       {currentQuiz !== null && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
//           <Card className="max-w-md w-full p-6 bg-white/95 backdrop-blur-sm">
//             {sortedQuestions[currentQuiz]?.type === "open-ended" ? (
//               // Open-ended question
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz].question}</h3>

//                 {showOpenEndedMessage ? (
//                   <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                     <p className="text-green-800">{sortedQuestions[currentQuiz].message}</p>
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       value={openEndedAnswer}
//                       onChange={(e) => setOpenEndedAnswer(e.target.value)}
//                       placeholder="Type your answer here..."
//                       className="mb-4"
//                       rows={4}
//                     />

//                     <div className="flex justify-between">
//                       <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                         Cancel
//                       </Button>
//                       <Button
//                         className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                         onClick={handleOpenEndedSubmit}
//                         disabled={openEndedAnswer.trim() === ""}
//                       >
//                         Submit Answer
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               // Multiple choice question
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz]?.question}</h3>

//                 <div className="space-y-3 mb-6">
//                   {sortedQuestions[currentQuiz]?.options.map((option: string, idx: number) => (
//                     <div
//                       key={idx}
//                       className={`p-3 rounded-lg border cursor-pointer transition-all ${
//                         selectedAnswer === idx
//                           ? isAnswerCorrect === null
//                             ? `${getThemeBgColor()} text-white`
//                             : isAnswerCorrect
//                               ? "bg-green-100 border-green-300"
//                               : "bg-red-100 border-red-300"
//                           : "hover:bg-gray-50"
//                       }`}
//                       onClick={() => isAnswerCorrect === null && handleAnswerSelect(idx)}
//                     >
//                       <div className="flex items-center">
//                         {selectedAnswer === idx &&
//                           isAnswerCorrect !== null &&
//                           (isAnswerCorrect ? (
//                             <Check className="w-5 h-5 mr-2 text-green-600" />
//                           ) : (
//                             <X className="w-5 h-5 mr-2 text-red-600" />
//                           ))}
//                         <span>{option}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-between">
//                   <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                     Cancel
//                   </Button>
//                   <Button
//                     className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                     onClick={handleSubmitAnswer}
//                     disabled={selectedAnswer === null || isAnswerCorrect !== null}
//                   >
//                     {isAnswerCorrect === null ? "Submit Answer" : "Correct!"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Card>
//         </div>
//       )}
//       {showLetterEnd && <div ref={targetDivRef} dangerouslySetInnerHTML={{ __html: friendData.letter }}>
//       </div>
//       }
//       <br />

//       {/* Final Message */}
//       {unlockedMemories.length === friendData.memories.length ? (
//   <div targetDivRef className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
//     <h2 className={`text-2xl font-bold mb-4 ${getThemeTextColor()}`}>🎉 Congratulations! 🎉</h2>
//     <p className="text-gray-700 mb-4">
//       You've unlocked all the memories! Now, there's just one last thing left:
//     </p>

//     {/* Open-Ended Question */}
//     {openEndedQuestion && (
//       <>
//         <h3 className="text-xl font-semibold mb-2">{openEndedQuestion.question}</h3>
        
//         {showOpenEndedMessage ? (
//           <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//             <p className="text-green-800">{openEndedQuestion.message}</p>
//           </div>
//         ) : (
//           <>
//             <Textarea
//               value={openEndedAnswer}
//               onChange={(e) => setOpenEndedAnswer(e.target.value)}
//               placeholder="Type your answer here..."
//               className="mb-4"
//               rows={4}
//             />
//             <Button
//               className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//               onClick={handleOpenEndedSubmit}
//               disabled={openEndedAnswer.trim() === ""}
//             >
//               Submit Answer
//             </Button>
//           </>
//         )}
//       </>
//     )}
//   </div>
// ) : null}



// {/* Celebration Modal */}
// {showCelebration && !showLetter && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50">
//           <Card className="max-w-lg w-full p-6 bg-white text-center shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">🎊 Woohooo, you did it! 🎊</h2>
//             <p className="text-gray-700 mb-4">You’ve unlocked all our memories! You truly know our moments, our journey, and me like no one else.</p>
//             <p className="text-gray-700 mb-6">But wait... I have something even more special for you. 💜</p>
//             <motion.button 
//               className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 text-lg animate-pulse"
//               onClick={scrollToDiv}>
//               💌 Click Here for a Special Message from Your Dearest Sinds
//             </motion.button>
//           </Card>
//           <Confetti />
//         </div>
//       )}


//     {/* Letter Reveal (Scrollable, Square, Centered) */}
//     {showLetter && (
//         <motion.div 
//           className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}>
//           <Card className="max-w-lg w-full p-6 bg-white shadow-lg border-2 border-purple-600 rounded-lg text-center relative">
//             <motion.div 
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 1, ease: "easeOut" }}>
//               <h2 className="text-3xl font-bold mb-4 text-purple-600">A Letter to My Dearest Gupts</h2>
//               <p className="text-gray-700 italic mb-4">"Before you read this, just know… you are the best thing that has ever happened to me."</p>
              
//               {/* Scrollable Letter */}
//               <div className="bg-white p-4 border-2 border-gray-300 shadow-lg rounded-lg max-h-[400px] overflow-y-auto">
//                 <div dangerouslySetInnerHTML={{ __html: friendData.letter }} />
//               </div>

//               <p className="mt-4 text-purple-700 font-handwritten text-xl">With infinite love, Your Dearest Sinds ❤️</p>
//                   <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white" onClick={scrollToDiv}>Close</Button>
//             </motion.div>
//           </Card>
//         </motion.div>
//       )}

//       {showFinalUnlocking && (
//   <div className="fixed inset-0 flex items-start justify-center p-4 z-50">
//     {/* Countdown box at the top */}
//     <motion.div 
//       initial={{ opacity: 0, y: -20 }} 
//       animate={{ opacity: 1, y: 0 }} 
//       transition={{ duration: 0.5 }}
//       className="absolute top-10 bg-white/90 shadow-lg px-6 py-3 rounded-lg text-center">
//       <h2 className="text-lg font-semibold text-gray-800">✨ Celebrations unveiling in... ✨</h2>
//       <motion.div 
//         key={countdown} 
//         initial={{ scale: 0.5, opacity: 0 }} 
//         animate={{ scale: 1.2, opacity: 1 }} 
//         transition={{ duration: 0.5 }}
//         className="text-4xl font-bold text-purple-600 mt-1">
//         {countdown}
//       </motion.div>
//     </motion.div>

//     {/* Show final celebration modal AFTER countdown */}
//     {countdown === 0 && (
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.8 }} 
//         animate={{ opacity: 1, scale: 1 }} 
//         transition={{ duration: 0.5 }}
//         className="fixed inset-0 flex items-center justify-center bg-black/70 p-4">
//         <Card className="max-w-md w-full p-6 bg-white text-center shadow-lg">
//           <h2 className="text-xl font-bold mb-4">🎉 Celebration Time! 🎉</h2>
//           <p className="text-gray-700">You've unlocked all the memories! 🎊</p>
//         </Card>
//       </motion.div>
//     )}
//   </div>
// )}
      

//     </div>
    

    
//   )
// }

// =======================
//Latest Code - Updated 12th March
// "use client"

// import { useState, useEffect, useRef } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import { Lock, Check, X } from "lucide-react"
// import { Textarea } from "@/components/ui/textarea"
// import { Progress } from "@/components/ui/progress"
// import { motion } from "framer-motion";
// import Confetti from "react-confetti";

// export default function TributeContent({ friendData }: { friendData: any }) {
//   const targetDivRef = useRef(null);
//   const [showFinalUnlocking, setShowFinalUnlocking] = useState(false);
//   const [countdown, setCountdown] = useState(3);
//   const sortedQuestions = friendData.questions.filter((q: any) => q.type !== "open-ended");
//   const openEndedQuestion = friendData.questions.find((q: any) => q.type === "open-ended");

//   const [latestUnlockedIndex, setLatestUnlockedIndex] = useState<number | null>(null);
//   const [unlockedMemories, setUnlockedMemories] = useState<number[]>([]);
//   const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
//   const [openEndedAnswer, setOpenEndedAnswer] = useState("");
//   const [showOpenEndedMessage, setShowOpenEndedMessage] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showCelebration, setShowCelebration] = useState(false);
//   const [showLetter, setShowLetter] = useState(false);
//   const [showLetterEnd, setShowLetterEnd] = useState(false);
//   const [showSkipButton, setShowSkipButton] = useState(false); // New state for controlling the Skip button visibility

//   const scrollToDiv = () => {
//     setShowLetter(false);
//     setShowCelebration(false);
//     setShowLetterEnd(true);

//     setTimeout(() => {
//       if (targetDivRef.current) {
//         (targetDivRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
//       }
//     }, 100);
//   };

//   useEffect(() => {
//     if (unlockedMemories.length === friendData.memories.length) {
//       setShowFinalUnlocking(true);
//       setCountdown(3);

//       let countdownInterval = setInterval(() => {
//         setCountdown((prev) => {
//           if (prev === 1) {
//             clearInterval(countdownInterval);
//             setTimeout(() => {
//               setShowFinalUnlocking(false);
//               setShowCelebration(true);
//             }, 1000);
//           }
//           return prev - 1;
//         });
//       }, 1000);
//     }
//   }, [unlockedMemories, friendData.memories.length]);

//   // New effect to manage the Skip button visibility
//   useEffect(() => {
//     if (latestUnlockedIndex !== null && unlockedMemories.length < friendData.memories.length) {
//       setShowSkipButton(true);

//       // Auto-hide the button after 15 seconds if not clicked
//       const hideTimeout = setTimeout(() => {
//         setShowSkipButton(false);
//       }, 15000);

//       return () => clearTimeout(hideTimeout); // Cleanup timeout on unmount or re-render
//     } else {
//       setShowSkipButton(false); // Hide button if all memories are unlocked
//     }
//   }, [latestUnlockedIndex, unlockedMemories.length, friendData.memories.length]);

//   const handleMemoryCardClick = (index: number) => {
//     if (unlockedMemories.includes(index)) return;

//     const relevantMCQIndex = sortedQuestions.findIndex(
//       (q: any, idx: number) => q.unlocksMemories?.includes(index) && q.type !== "open-ended"
//     );

//     if (relevantMCQIndex !== -1) {
//       setCurrentQuiz(relevantMCQIndex);
//       setSelectedAnswer(null);
//       setIsAnswerCorrect(null);
//     } else {
//       setCurrentQuiz(sortedQuestions.length - 1);
//     }
//   };

//   const handleAnswerSelect = (answerIndex: number) => {
//     setSelectedAnswer(answerIndex);
//   };

//   const handleSubmitAnswer = () => {
//     if (currentQuiz === null || selectedAnswer === null) return;

//     const question = sortedQuestions[currentQuiz];

//     if (selectedAnswer === question.correctAnswer) {
//       setIsAnswerCorrect(true);

//       setTimeout(() => {
//         const newUnlockedMemories = [...unlockedMemories, ...question.unlocksMemories];
//         const uniqueUnlocked = [...new Set(newUnlockedMemories)];
//         setUnlockedMemories(uniqueUnlocked);

//         setLatestUnlockedIndex(question.unlocksMemories[0]);
//         setCurrentQuiz(null);
//         setSelectedAnswer(null);
//         setIsAnswerCorrect(null);
//       }, 1500);
//     } else {
//       setIsAnswerCorrect(false);
//     }
//   };

//   const handleOpenEndedSubmit = () => {
//     if (openEndedAnswer.trim() !== "") {
//       setShowOpenEndedMessage(true);

//       setTimeout(() => {
//         const allMemoryIndices = friendData.memories.map((_: any, index: number) => index);
//         setUnlockedMemories(allMemoryIndices);
//         setCurrentQuiz(null);
//         setOpenEndedAnswer("");
//       }, 5000);
//     }
//   };

//   const getThemeTextColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "text-purple-600";
//       case "blue":
//         return "text-blue-600";
//       case "red":
//         return "text-red-600";
//       default:
//         return "text-gray-900";
//     }
//   };

//   const getThemeBgColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "bg-purple-600";
//       case "blue":
//         return "bg-blue-600";
//       case "red":
//         return "bg-red-600";
//       default:
//         return "bg-gray-900";
//     }
//   };

//   const getThemeHoverColor = () => {
//     switch (friendData.themeColor) {
//       case "purple":
//         return "hover:bg-purple-700";
//       case "blue":
//         return "hover:bg-blue-700";
//       case "red":
//         return "hover:bg-red-700";
//       default:
//         return "hover:bg-gray-800";
//     }
//   };

//   const scrollToNextLockedCard = () => {
//     const nextLockedIndex = friendData.memories.findIndex(
//       (memory: any, index: number) => !unlockedMemories.includes(index)
//     );
//     if (nextLockedIndex !== -1) {
//       const nextLockedCard = document.querySelector(`.memory-card:nth-child(${nextLockedIndex + 1})`);
//       if (nextLockedCard) {
//         nextLockedCard.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//     setShowSkipButton(false); // Hide the button after clicking
//   };

//   return (
//     <div className="max-w-4xl mx-auto relative">
//       <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Tribute to {friendData.name}</h1>
//       <p className="text-white/80 text-center mb-4 text-lg">
//         Unlock memories by answering questions about our friendship!
//       </p>

//       {/* Progress Bar */}
//       <div className="mb-8">
//         <Progress value={progress} className="w-full" />
//         <p className="text-center text-white mt-2">
//           {unlockedMemories.length} / {friendData.memories.length} Memories Unlocked
//         </p>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
//         {friendData.memories.map((memory: any, index: number) => (
//           <div
//             key={index}
//             className={`memory-card ${unlockedMemories.includes(index) ? "flipped" : ""}`}
//             onClick={() => handleMemoryCardClick(index)}
//           >
//             <div className="card-inner">
//               {/* Front of card (locked state) */}
//               <Card className="card-front h-40 sm:h-48 lg:h-56 flex flex-col items-center justify-center p-4 cursor-pointer bg-white shadow-md">
//                 {!unlockedMemories.includes(index) && (
//                   <div className="text-center">
//                     <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                     <p className="text-gray-600 text-sm">Locked</p>
//                   </div>
//                 )}
//               </Card>

//               {/* Back of card (unlocked polaroid style) */}
//               <Card className="card-back h-56 sm:h-64 lg:h-72 flex flex-col bg-white shadow-md border-4 border-white rounded-lg">
//                 <div className="relative w-full h-4/5 overflow-hidden rounded-t-lg">
//                   <Image
//                     src={memory.image}
//                     alt={memory.title}
//                     fill
//                     style={{ objectFit: "cover", objectPosition: "50% 30%" }}
//                   />
//                 </div>
//                 <div className="h-1/5 flex items-center justify-center p-2 border-t bg-white">
//                   <h3 className="font-bold text-xs sm:text-sm text-purple-700">{memory.title}</h3>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Skip to Next Locked Memory Button */}
//             {showSkipButton && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-4 sm:right-4 z-20"
//         >
//           <Button
//             className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white text-sm py-2 px-4 sm:py-2 sm:px-6 rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2`}
//             onClick={scrollToNextLockedCard}
//           >
//             <span>Next Memory</span>
//             <span className="text-xs">↑</span>
//           </Button>
//         </motion.div>
//       )}

//       {/* Quiz Modal */}
//       {currentQuiz !== null && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
//           <Card className="max-w-md w-full p-6 bg-white/95 backdrop-blur-sm">
//             {sortedQuestions[currentQuiz]?.type === "open-ended" ? (
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz].question}</h3>

//                 {showOpenEndedMessage ? (
//                   <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                     <p className="text-green-800">{sortedQuestions[currentQuiz].message}</p>
//                   </div>
//                 ) : (
//                   <>
//                     <Textarea
//                       value={openEndedAnswer}
//                       onChange={(e) => setOpenEndedAnswer(e.target.value)}
//                       placeholder="Type your answer here..."
//                       className="mb-4"
//                       rows={4}
//                     />
//                     <div className="flex justify-between">
//                       <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                         Cancel
//                       </Button>
//                       <Button
//                         className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                         onClick={handleOpenEndedSubmit}
//                         disabled={openEndedAnswer.trim() === ""}
//                       >
//                         Submit Answer
//                       </Button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             ) : (
//               <div>
//                 <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz]?.question}</h3>

//                 <div className="space-y-3 mb-6">
//                   {sortedQuestions[currentQuiz]?.options.map((option: string, idx: number) => (
//                     <div
//                       key={idx}
//                       className={`p-3 rounded-lg border cursor-pointer transition-all ${
//                         selectedAnswer === idx
//                           ? isAnswerCorrect === null
//                             ? `${getThemeBgColor()} text-white`
//                             : isAnswerCorrect
//                               ? "bg-green-100 border-green-300"
//                               : "bg-red-100 border-red-300"
//                           : "hover:bg-gray-50"
//                       }`}
//                       onClick={() => isAnswerCorrect === null && handleAnswerSelect(idx)}
//                     >
//                       <div className="flex items-center">
//                         {selectedAnswer === idx &&
//                           isAnswerCorrect !== null &&
//                           (isAnswerCorrect ? (
//                             <Check className="w-5 h-5 mr-2 text-green-600" />
//                           ) : (
//                             <X className="w-5 h-5 mr-2 text-red-600" />
//                           ))}
//                         <span>{option}</span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex justify-between">
//                   <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
//                     Cancel
//                   </Button>
//                   <Button
//                     className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                     onClick={handleSubmitAnswer}
//                     disabled={selectedAnswer === null || isAnswerCorrect !== null}
//                   >
//                     {isAnswerCorrect === null ? "Submit Answer" : "Correct!"}
//                   </Button>
//                 </div>
//               </div>
//             )}
//           </Card>
//         </div>
//       )}

//       {showLetterEnd && (
//         <div ref={targetDivRef} dangerouslySetInnerHTML={{ __html: friendData.letter }} />
//       )}
//       <br />

//       {/* Final Message */}
//       {unlockedMemories.length === friendData.memories.length ? (
//         <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
//           <h2 className={`text-2xl font-bold mb-4 ${getThemeTextColor()}`}>🎉 Congratulations! 🎉</h2>
//           <p className="text-gray-700 mb-4">
//             You've unlocked all the memories! Now, there's just one last thing left:
//           </p>

//           {openEndedQuestion && (
//             <div>
//               <h3 className="text-xl font-semibold mb-2">{openEndedQuestion.question}</h3>

//               {showOpenEndedMessage ? (
//                 <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
//                   <p className="text-green-800">{openEndedQuestion.message}</p>
//                 </div>
//               ) : (
//                 <>
//                   <Textarea
//                     value={openEndedAnswer}
//                     onChange={(e) => setOpenEndedAnswer(e.target.value)}
//                     placeholder="Type your answer here..."
//                     className="mb-4"
//                     rows={4}
//                   />
//                   <Button
//                     className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
//                     onClick={handleOpenEndedSubmit}
//                     disabled={openEndedAnswer.trim() === ""}
//                   >
//                     Submit Answer
//                   </Button>
//                 </>
//               )}
//             </div>
//           )}
//         </div>
//       ) : null}

//       {/* Celebration Modal */}
//       {showCelebration && !showLetter && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50">
//           <Card className="max-w-lg w-full p-6 bg-white text-center shadow-lg">
//             <h2 className="text-2xl font-bold mb-4">🎊 Woohooo, you did it! 🎊</h2>
//             <p className="text-gray-700 mb-4">You’ve unlocked all our memories! You truly know our moments, our journey, and me like no one else.</p>
//             <p className="text-gray-700 mb-6">But wait... I have something even more special for you. 💜</p>
//             <motion.button
//               className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 text-lg animate-pulse"
//               onClick={scrollToDiv}
//             >
//               💌 Click Here for a Special Message from Your Dearest Sinds
//             </motion.button>
//           </Card>
//           <Confetti />
//         </div>
//       )}

//       {/* Letter Reveal */}
//       {showLetter && (
//         <motion.div
//           className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <Card className="max-w-lg w-full p-6 bg-white shadow-lg border-2 border-purple-600 rounded-lg text-center relative max-h-[70vh] overflow-y-auto">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 1, ease: "easeOut" }}
//             >
//               <h2 className="text-3xl font-bold mb-4 text-purple-600">A Letter to My Dearest Gupts</h2>
//               <p className="text-gray-700 italic mb-4">"Before you read this, just know… you are the best thing that has ever happened to me."</p>
//               <div className="bg-white p-4 border-2 border-gray-300 shadow-lg rounded-lg max-h-[400px] overflow-y-auto">
//                 <div dangerouslySetInnerHTML={{ __html: friendData.letter }} />
//               </div>
//               <p className="mt-4 text-purple-700 font-handwritten text-xl">With infinite love, Your Dearest Sinds ❤️</p>
//               <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white" onClick={scrollToDiv}>
//                 Close
//               </Button>
//             </motion.div>
//           </Card>
//         </motion.div>
//       )}

//       {/* Final Unlock Countdown */}
//       {showFinalUnlocking && (
//         <div className="fixed inset-0 flex items-start justify-center p-4 z-50">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="absolute top-10 bg-white/90 shadow-lg px-6 py-3 rounded-lg text-center"
//           >
//             <h2 className="text-lg font-semibold text-gray-800">✨ Celebrations unveiling in... ✨</h2>
//             <motion.div
//               key={countdown}
//               initial={{ scale: 0.5, opacity: 0 }}
//               animate={{ scale: 1.2, opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               className="text-4xl font-bold text-purple-600 mt-1"
//             >
//               {countdown}
//             </motion.div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }




      
      
      
  
// ==================================
// Latest code - 13 March 2025
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Check, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function TributeContent({ friendData }: { friendData: any }) {
  const targetDivRef = useRef(null);
  const [showFinalUnlocking, setShowFinalUnlocking] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isFinalUnlockComplete, setIsFinalUnlockComplete] = useState(false); // Still used for celebration loop
  const sortedQuestions = friendData.questions.filter((q: any) => q.type !== "open-ended");
  const openEndedQuestion = friendData.questions.find((q: any) => q.type === "open-ended");

  const [latestUnlockedIndex, setLatestUnlockedIndex] = useState<number | null>(null);
  const [unlockedMemories, setUnlockedMemories] = useState<number[]>([]);
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [openEndedAnswer, setOpenEndedAnswer] = useState("");
  const [showOpenEndedMessage, setShowOpenEndedMessage] = useState(false);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [progress, setProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showLetterEnd, setShowLetterEnd] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  const scrollToDiv = () => {
    setShowLetter(false);
    setShowCelebration(false);
    setShowLetterEnd(true);

    setTimeout(() => {
      if (targetDivRef.current) {
        (targetDivRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    if (unlockedMemories.length === friendData.memories.length && !isFinalUnlockComplete) {
      setShowFinalUnlocking(true);
      setCountdown(3);

      let countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setTimeout(() => {
              setShowFinalUnlocking(false);
              setShowCelebration(true);
              setIsFinalUnlockComplete(true);
            }, 1000);
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [unlockedMemories, friendData.memories.length, isFinalUnlockComplete]);

  useEffect(() => {
    if (latestUnlockedIndex !== null && unlockedMemories.length < friendData.memories.length) {
      setShowSkipButton(true);

      const hideTimeout = setTimeout(() => {
        setShowSkipButton(false);
      }, 9000);

      return () => clearTimeout(hideTimeout);
    } else {
      setShowSkipButton(false);
    }
  }, [latestUnlockedIndex, unlockedMemories.length, friendData.memories.length]);

  const handleMemoryCardClick = (index: number) => {
    if (unlockedMemories.includes(index)) return;

    const relevantMCQIndex = sortedQuestions.findIndex(
      (q: any, idx: number) => q.unlocksMemories?.includes(index) && q.type !== "open-ended"
    );

    if (relevantMCQIndex !== -1) {
      setCurrentQuiz(relevantMCQIndex);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    } else {
      setCurrentQuiz(sortedQuestions.length - 1);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (currentQuiz === null || selectedAnswer === null) return;

    const question = sortedQuestions[currentQuiz];

    if (selectedAnswer === question.correctAnswer) {
      setIsAnswerCorrect(true);

      setTimeout(() => {
        const newUnlockedMemories = [...unlockedMemories, ...question.unlocksMemories];
        const uniqueUnlocked = [...new Set(newUnlockedMemories)];
        setUnlockedMemories(uniqueUnlocked);

        setLatestUnlockedIndex(question.unlocksMemories[0]);
        setCurrentQuiz(null);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      }, 1500);
    } else {
      setIsAnswerCorrect(false);
    }
  };

  const handleOpenEndedSubmit = async () => {
    if (openEndedAnswer.trim() === "") return;

    setShowOpenEndedMessage(true);
    setSubmittedAnswer(openEndedAnswer);

    const answerData = {
      friendId: friendData.name,
      tributeId: friendData.name,
      question: openEndedQuestion.question,
      answer: openEndedAnswer,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/save-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answerData),
      });

      if (!response.ok) {
        console.error("Failed to save answer:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving answer:", error);
    }

    setTimeout(() => {
      const allMemoryIndices = friendData.memories.map((_: any, index: number) => index);
      setUnlockedMemories(allMemoryIndices);
      setCurrentQuiz(null);
      setOpenEndedAnswer("");
    }, 5000);
  };

  const getThemeTextColor = () => {
    switch (friendData.themeColor) {
      case "purple":
        return "text-purple-600";
      case "blue":
        return "text-blue-600";
      case "red":
        return "text-red-600";
      default:
        return "text-gray-900";
    }
  };

  const getThemeBgColor = () => {
    switch (friendData.themeColor) {
      case "purple":
        return "bg-purple-600";
      case "blue":
        return "bg-blue-600";
      case "red":
        return "bg-red-600";
      default:
        return "bg-gray-900";
    }
  };

  const getThemeHoverColor = () => {
    switch (friendData.themeColor) {
      case "purple":
        return "hover:bg-purple-700";
      case "blue":
        return "hover:bg-blue-700";
      case "red":
        return "hover:bg-red-700";
      default:
        return "hover:bg-gray-800";
    }
  };

  const scrollToNextLockedCard = () => {
    const nextLockedIndex = friendData.memories.findIndex(
      (memory: any, index: number) => !unlockedMemories.includes(index)
    );
    if (nextLockedIndex !== -1) {
      const nextLockedCard = document.querySelector(`.memory-card:nth-child(${nextLockedIndex + 1})`);
      if (nextLockedCard) {
        nextLockedCard.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    setShowSkipButton(false);
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">Tribute to {friendData.name}</h1>
      <p className="text-white/80 text-center mb-4 text-lg">
        Unlock memories by answering questions about our friendship!
      </p>

      <div className="mb-8">
        <Progress value={progress} className="w-full" />
        <p className="text-center text-white mt-2">
          {unlockedMemories.length} / {friendData.memories.length} Memories Unlocked
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {friendData.memories.map((memory: any, index: number) => (
          <div
            key={index}
            className={`memory-card ${unlockedMemories.includes(index) ? "flipped" : ""}`}
            onClick={() => handleMemoryCardClick(index)}
          >
            <div className="card-inner">
              <Card className="card-front h-40 sm:h-48 lg:h-56 flex flex-col items-center justify-center p-4 cursor-pointer bg-white shadow-md">
                {!unlockedMemories.includes(index) && (
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600 text-sm">Locked</p>
                  </div>
                )}
              </Card>
              <Card className="card-back h-56 sm:h-64 lg:h-72 flex flex-col bg-white shadow-md border-4 border-white rounded-lg">
                <div className="relative w-full h-4/5 overflow-hidden rounded-t-lg">
                  <Image
                    src={memory.image}
                    alt={memory.title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "50% 30%" }}
                  />
                </div>
                <div className="h-1/5 flex items-center justify-center p-2 border-t bg-white">
                  <h3 className="font-bold text-xs sm:text-sm text-purple-700">{memory.title}</h3>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {showSkipButton && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 sm:bottom-4 sm:right-4 z-20"
        >
          <Button
            className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white text-sm py-2 px-4 sm:py-2 sm:px-6 rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2`}
            onClick={scrollToNextLockedCard}
          >
            <span>Next Memory</span>
            <span className="text-xs">↑</span>
          </Button>
        </motion.div>
      )}

      {currentQuiz !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full p-6 bg-white/95 backdrop-blur-sm">
            {sortedQuestions[currentQuiz]?.type === "open-ended" ? (
              <div>
                <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz].question}</h3>
                {showOpenEndedMessage ? (
                  <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
                    <p className="text-green-800">
                      {submittedAnswer ? (
                        <>
                          Your answer: <strong>{submittedAnswer}</strong>
                          <br />
                          Please send this to me on WhatsApp because I won’t see it here. Also, just know that I’m forever grateful for you being in my life! 😊
                          <br />
                          <Button
                            className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white mt-2`}
                            onClick={() => setShowOpenEndedMessage(false)}
                          >
                            Close
                          </Button>
                        </>
                      ) : (
                        openEndedQuestion.message
                      )}
                    </p>
                  </div>
                ) : (
                  <>
                    <Textarea
                      value={openEndedAnswer}
                      onChange={(e) => setOpenEndedAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="mb-4"
                      rows={4}
                    />
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
                        Cancel
                      </Button>
                      <Button
                        className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
                        onClick={handleOpenEndedSubmit}
                        disabled={openEndedAnswer.trim() === ""}
                      >
                        Submit Answer
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4">{sortedQuestions[currentQuiz]?.question}</h3>
                <div className="space-y-3 mb-6">
                  {sortedQuestions[currentQuiz]?.options.map((option: string, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        selectedAnswer === idx
                          ? isAnswerCorrect === null
                            ? `${getThemeBgColor()} text-white`
                            : isAnswerCorrect
                              ? "bg-green-100 border-green-300"
                              : "bg-red-100 border-red-300"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => isAnswerCorrect === null && handleAnswerSelect(idx)}
                    >
                      <div className="flex items-center">
                        {selectedAnswer === idx &&
                          isAnswerCorrect !== null &&
                          (isAnswerCorrect ? (
                            <Check className="w-5 h-5 mr-2 text-green-600" />
                          ) : (
                            <X className="w-5 h-5 mr-2 text-red-600" />
                          ))}
                        <span>{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentQuiz(null)}>
                    Cancel
                  </Button>
                  <Button
                    className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null || isAnswerCorrect !== null}
                  >
                    {isAnswerCorrect === null ? "Submit Answer" : "Correct!"}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {showLetterEnd && <div ref={targetDivRef} dangerouslySetInnerHTML={{ __html: friendData.letter }} />}
      <br />

      {/* Final Message - Adjusted Condition */}
      {unlockedMemories.length === friendData.memories.length && showLetterEnd && openEndedQuestion && (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
          <h2 className={`text-2xl font-bold mb-4 ${getThemeTextColor()}`}>🎉 Congratulations! 🎉</h2>
          <p className="text-gray-700 mb-4">
            You've unlocked all the memories! Now, there's just one last thing left:
          </p>
          <div>
            <h3 className="text-xl font-semibold mb-2">{openEndedQuestion.question}</h3>
            {showOpenEndedMessage ? (
              <div className="text-center p-4 rounded-lg bg-green-50 border border-green-200 mb-4">
                <p className="text-green-800">
                  {submittedAnswer ? (
                    <>
                      Your answer: <strong>{submittedAnswer}</strong>
                      <br />
                      Please send this to me on WhatsApp because I won’t see it here. Also, just know that I’m forever grateful for you being in my life! 😊
                      <br />
                      <Button
                        className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white mt-2`}
                        onClick={() => setShowOpenEndedMessage(false)}
                      >
                        Close
                      </Button>
                    </>
                  ) : (
                    openEndedQuestion.message
                  )}
                </p>
              </div>
            ) : (
              <>
                <Textarea
                  value={openEndedAnswer}
                  onChange={(e) => setOpenEndedAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="mb-4"
                  rows={4}
                />
                <Button
                  className={`${getThemeBgColor()} ${getThemeHoverColor()} text-white`}
                  onClick={handleOpenEndedSubmit}
                  disabled={openEndedAnswer.trim() === ""}
                >
                  Submit Answer
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {showCelebration && !showLetter && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50">
          <Card className="max-w-lg w-full p-6 bg-white text-center shadow-lg">
            <h2 className="text-2xl font-bold mb-4">🎊 Woohooo, you did it! 🎊</h2>
            <p className="text-gray-700 mb-4">You’ve unlocked all our memories! You truly know our moments, our journey, and me like no one else.</p>
            <p className="text-gray-700 mb-6">But wait... I have something even more special for you. 💜</p>
            <motion.button
              className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 text-lg animate-pulse"
              onClick={scrollToDiv}
            >
              💌 Click Here for a Special Message from Your Dearest Sinds
            </motion.button>
          </Card>
          <Confetti />
        </div>
      )}

      {showLetter && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/70 p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Card className="max-w-lg w-full p-6 bg-white shadow-lg border-2 border-purple-600 rounded-lg text-center relative max-h-[70vh] overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold mb-4 text-purple-600">A Letter to My Dearest Gupts</h2>
              <p className="text-gray-700 italic mb-4">"Before you read this, just know… you are the best thing that has ever happened to me."</p>
              <div className="bg-white p-4 border-2 border-gray-300 shadow-lg rounded-lg max-h-[400px] overflow-y-auto">
                <div dangerouslySetInnerHTML={{ __html: friendData.letter }} />
              </div>
              <p className="mt-4 text-purple-700 font-handwritten text-xl">With infinite love, Your Dearest Sinds ❤️</p>
              <Button className="mt-4 bg-red-500 hover:bg-red-600 text-white" onClick={scrollToDiv}>
                Close
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      )}

      {showFinalUnlocking && (
        <div className="fixed inset-0 flex items-start justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-10 bg-white/90 shadow-lg px-6 py-3 rounded-lg text-center"
          >
            <h2 className="text-lg font-semibold text-gray-800">✨ Celebrations unveiling in... ✨</h2>
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-purple-600 mt-1"
            >
              {countdown}
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
