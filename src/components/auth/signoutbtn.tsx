import { signOut } from "@/auth"
 
export default function SignOutBtn() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
} 