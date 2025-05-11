import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flag, Calendar, Users, Utensils } from "lucide-react";
import { NorwegianFlag } from "@/components/norwegian-flag";

export default function Home() {
  return (
    <div className="norwegian-pattern">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/20 pointer-events-none" />
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4 z-30">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-norway-red/10 px-3 py-1 text-sm text-norway-red">
                  17. Mai Feiring
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-norway-red">
                  Norges Nasjonaldag
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Bli med og feir Norges grunnlovsdag med en nydelig frokost for
                  20 personer.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button
                    size="lg"
                    className="bg-norway-red hover:bg-norway-red/90"
                  >
                    Bli med på feiringen
                  </Button>
                </Link>
                <Link href="#about">
                  <Button size="lg" variant="outline">
                    Les mer
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[250px] w-[350px] md:h-[350px] md:w-[450px] lg:h-[400px] lg:w-[500px]">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.75] md:scale-[2]">
                  <NorwegianFlag className="h-32 w-48 shadow-xl" />
                </div>
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-norway-blue/10 md:h-32 md:w-32" />
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-norway-red/10 md:h-32 md:w-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-norway-blue text-white">
                Om Arrangementet
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-norway-blue">
                Tapas-Feiring
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                17. mai feiringen vår vil by på et utvalg tradisjonelle norske
                retter. Vi trenger din hjelp for å få det til!
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-norway-red/10 text-norway-red">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Dato for Arrangementet</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  17. mai 2025 – Norges Grunnlovsdag
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-norway-red/10 text-norway-red">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Deltakere</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  En samling på 20 personer som feirer norsk kulturarv
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-norway-red/10 text-norway-red">
                <Utensils className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Matstil</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Tapasstil med et utvalg av tradisjonelle norske retter
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-norway-red/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-norway-red">
                Klar for å bli med på feiringen?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Meld deg på nå for å velge hvilke retter du vil ta med til vår
                feiring av nasjonaldagen.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-norway-red hover:bg-norway-red/90"
                >
                  <Flag className="mr-2 h-4 w-4" />
                  Kom i gang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
