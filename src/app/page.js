import LoginBtn from "@/components/Login"
import { signIn } from "next-auth/react"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginBtn></LoginBtn>
    </main>
  )
}
