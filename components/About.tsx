import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="bg-brand-black text-brand-white flex min-h-screen flex-col items-center justify-center p-4">
      <section className="flex flex-row items-center justify-center gap-4 w-full max-w-4xl mt-3 mb-1">
        <Image
          src="/images/tree-3.png"
          alt="Tree"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/images/home_peach_bite.png"
          alt="Peach Bite"
          width={100}
          height={100}
          className="object-contain"
        />
        <Image
          src="/images/peach-box-12.png"
          alt="Peach Box"
          width={100}
          height={100}
          className="object-contain"
        />
      </section>
      <p className="text-xs text-brand-orange">Buy now, munch later.</p>

      {/* Step 1 Content */}
      <section className="w-full max-w-4xl mt-4">
        <div className="bg-brand-black/80 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">1.</h2>
                <span className="bg-brand-green text-brand-black px-3 py-1 rounded-none text-sm font-semibold">
                  • Tree Sales Open •
                </span>
              </div>
              <h4 className="text-5xl font-bold mb-4 font-heading">
                Get Trees!
              </h4>
              <p className="mb-4 text-sm">
                Welcome to PΞACH Tycoon Season 3! For this season, we are once
                again inviting all humble farmers to try their hand at growing
                peaches.
              </p>
              <p className="mb-4 text-sm">
                Every tree NFT purchased is guaranteed to produce two (2) peach
                boxes that each include a farmer&apos;s dozen (13) delicious,
                Palisade peaches.
              </p>
              <p className="text-sm">
                Palisade peaches are amongst the best in the world due to the
                unique climate that produces high sugars and tender fruit.
              </p>
            </div>

            {/* Visual Area */}
            <div className="bg-brand-green/20 flex-1 rounded-lg p-6 flex flex-col items-center justify-center">
              <div className="text-center mb-4 font-heading">
                <p className="text-xl font-bold">1 tree =</p>
                <p className="text-xl font-bold">2 boxes of peaches*</p>
              </div>
              <p className="text-xs text-center mb-6">
                * One tree guarantees two boxes of peaches. Water, prune,
                fertilize and protect your trees from pests in order to earn
                additional peach boxes.
              </p>
              <Link
                href="/orchard"
                className="my-2 px-8 py-2 text-base font-headline text-brand-orange bg-brand-green/20 border-2 border-brand-green rounded-full hover:bg-orange-500/10 transition-colors duration-200"
              >
                GET TREES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2 Content */}
      <section className="w-full max-w-4xl mt-2">
        <div className="bg-brand-black/80 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">2.</h2>
                <span className="bg-brand-green text-brand-black px-3 py-1 rounded-none text-sm font-semibold">
                  • Boost Sales Open •
                </span>
              </div>
              <h4 className="text-5xl font-bold mb-4 font-heading">
                Get Growing!
              </h4>
              <p className="mb-4 text-sm">
                Nurture your trees from winter dormancy through spring blossom
                until harvest season in late summer. Prune, fertilize and
                protect your trees from pests in order to earn additional peach
                boxes. You are in control of how many peaches you produce.
              </p>
              <p className="text-sm">
                In addition, a portion of all transactions will be added to the
                &apos;Farmer&apos;s Pot&apos;. The better you farm, the more
                points you earn and a larger percentage of the pot you can win!
              </p>
            </div>

            {/* Visual Area - 2x2 Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-green/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Image
                    src="/images/icon_prune.png"
                    alt="Prune"
                    width={80}
                    height={80}
                    className="object-contain mb-2"
                  />
                  <span className="text-sm font-semibold">Prune</span>
                </div>
                <div className="bg-brand-green/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Image
                    src="/images/icon_fert.png"
                    alt="Fertilize"
                    width={80}
                    height={80}
                    className="object-contain mb-2"
                  />
                  <span className="text-sm font-semibold">Fertilize</span>
                </div>
                <div className="bg-brand-green/20 rounded-lg p-4 flex flex-col items-center justify-center">
                  <Image
                    src="/images/icon_spray.png"
                    alt="Spray"
                    width={80}
                    height={80}
                    className="object-contain mb-2"
                  />
                  <span className="text-sm font-semibold">Spray</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3 Content */}
      <section className="w-full max-w-4xl mt-2">
        <div className="bg-brand-black/80 rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">3.</h2>
                <span className="bg-brand-orange text-brand-black px-3 py-1 rounded-none text-sm font-semibold">
                  • PEACH SEASON OPENS IN AUGUST •
                </span>
              </div>
              <h4 className="text-5xl font-bold mb-4 font-heading">
                Get peaches!
              </h4>
              <p className="mb-4 text-sm">
                Upon harvest, you will be able to redeem your peach boxes to
                enjoy yourself, send to a friend or sell them at the Peach
                Market at a price you set. Peach lovers will be invited to
                purchase peach boxes from the marketplace. Every peach box
                includes a unique, generative PΞACH NFT.
              </p>
              <p className="text-sm">
                Upon redemption, your PΞACH will evolve to reveal a juicy bite
                and your unique PΞACH pit design. All buyers within the
                continental US will receive a box of fresh, juicy peaches.
                International orders will receive freeze-dried peaches (suitable
                for overseas shipping) equivalent to a peach box, but don&apos;t
                worry, they are just as delicious!
              </p>
            </div>

            {/* Visual Area */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-brand-green/20 rounded-lg p-4 w-full">
                <Image
                  src="/images/peach-cards.png"
                  alt="Peach Cards"
                  width={400}
                  height={400}
                  className="object-contain w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://peachtycoon.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="my-3 text-sm font-sans text-brand-orange hover:bg-red-500/10 transition-colors duration-200 underline"
      >
        Learn more about PΞACH Tycoon
      </a>

      {/* Proof-of-peach Section */}
      <section className="w-full max-w-4xl mt-8 mb-6">
        <h2 className="text-4xl font-bold mb-6 text-center font-heading text-brand-orange">
          Proof-of-peach
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-brand-green/20 rounded-lg p-4">
            <Image
              src="/images/box-2.jpg"
              alt="Peach Box 2"
              width={400}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="bg-brand-green/20 rounded-lg p-4">
            <Image
              src="/images/box-3.jpg"
              alt="Peach Box 3"
              width={400}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="bg-brand-green/20 rounded-lg p-4">
            <Image
              src="/images/freeze-dried.jpg"
              alt="Freeze Dried Peaches"
              width={400}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <div className="bg-brand-green/20 rounded-lg p-4">
            <Image
              src="/images/palisades_orchard.jpeg"
              alt="Palisades Orchard"
              width={400}
              height={400}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        </div>
      </section>

      <Link
        href="/orchard"
        className="my-6 px-12 py-6 text-2xl font-headline text-brand-red bg-brand-black border-2 border-brand-orange rounded-full hover:bg-orange-500/10 transition-colors duration-200"
      >
        GET TREES
      </Link>

      <div className="text-xs">
        From frens at{" "}
        <a href="https://www.metacartel.org/" target="_blank">
          🌶️{" "}
        </a>
        and{" "}
        <a href="https://www.raidguild.org/" target="_blank">
          ⚔️
        </a>
      </div>
    </div>
  );
}
