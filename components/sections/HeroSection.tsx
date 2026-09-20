"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Container } from "@/components/ui/Container"
import { Link } from "@/navigation"

export function HeroSection() {
  const t = useTranslations("hero")

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-ship-bg.jpg"
          alt="Container ship at sea"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[80%_center] lg:object-[85%_center] xl:object-right"
        />
        {/* Uniform dark overlay — same as login page */}
        <div className="absolute inset-0 z-10 bg-secondary-900/60" />
        {/* Directional gradients for content readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-secondary-950/95 via-secondary-950/70 to-transparent rtl:bg-gradient-to-l rtl:from-secondary-950/95 rtl:via-secondary-950/70 rtl:to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-secondary-950/60 via-transparent to-secondary-950/30" />
      </div>

      <Container className="relative z-10 pt-32">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm"
          >
            <Shield className="h-4 w-4" />
            {t("subtitle")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            {t("description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/request-quote">
              <Button size="lg" className="gap-2">
                {t("ctaQuote")}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-secondary-900"
              >
                {t("ctaServices")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs font-medium uppercase tracking-widest">
            Scroll
          </span>
          <div className="h-10 w-[1px] animate-pulse bg-white/30" />
        </div>
      </motion.div>
    </section>
  )
}
