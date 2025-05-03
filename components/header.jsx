import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { LayoutDashboard, PenBox } from "lucide-react"
import { checkUser } from "@/lib/checkUser"


const Header = async() => {
  await checkUser();


  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-17 px-0 py-4 flex items-center justify-between">
        <Link href ="/">
          <Image src="/images.png" alt="myExpense logo" height={48} width={150}
          className="h-12 w-auto object-contain"/>
        </Link>
      
    <div className="flex items-center space-x-4">
      <SignedIn>
        <Link href={"/dashboard"} className="text-gray-600 hover:text-blue-600 flex items-center ">
        < Button variant="outline">
        <LayoutDashboard size={18} />
        <span className="hidden md:inline">Dashbord</span>
        </Button>
        </Link>

        <Link href={"/transaction/create"}>
        < Button className="flex items-center gap-2">
        <PenBox size={18} />
        <span className="hidden md:inline">Add Transaction</span>
        </Button>
        </Link>
      </SignedIn>



       <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
          < Button variant="outline">Login</Button>
              </SignInButton >
             
            </SignedOut>
            <SignedIn>
            <UserButton 
  appearance={{
    elements: {
      avatarBox: {
        width: "45px",
        height: "45px",
      },
    },
  }}
/>

              
            </SignedIn>

            </div>
        </nav>
    </div>
  )
}

export default Header
