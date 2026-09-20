import Image from "next/image"
import { Container } from "@/components/ui/Container"
import { LoginForm } from "@/components/auth/LoginForm"

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ callbackUrl?: string; tab?: string }>
}

export default async function LoginPage({ searchParams }: Props) {
  const { callbackUrl, tab } = await searchParams
  const initialMode = tab === "register" ? "register" : "login"

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Background Image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/hero-bg.jpg"
          alt="NileLink Freight & Logistics"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </div>
      {/* Dark Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary-900/90 via-secondary-900/75 to-secondary-900/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-secondary-950/60 via-transparent to-secondary-950/40" />

      <Container className="relative z-10 flex w-full items-center justify-center">
        <LoginForm callbackUrl={callbackUrl} initialMode={initialMode} />
      </Container>
    </div>
  )
}
