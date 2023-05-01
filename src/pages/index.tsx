import Image from 'next/image'
import { Inter } from 'next/font/google'
import { InvestConverter } from "@/components/InvestConverter";

export default function Home() {
  const TopNavArr = ["Trade", "Earn", "Support", "About"];
  return (
    <main>
      <div className="static mb-12 md:mb-0 md:absolute md:top-0 w-full flex flex-col md:flex-row bg-[#0B0819] gap-2 py-4 px-8 justify-between items-center">
        <Image
          src="/neofi_logo.svg"
          alt="NeoFi Logo"
          // className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <div className="flex flex-col md:flex-row gap-4 text-lg md:text-xl justify-center items-center">
          {TopNavArr.map((item, idx) => (
            <div
              className={
                idx === 0
                  ? "text-[#627EEA] border-b-2 border-[#627EEA]"
                  : "text-[#5A5A5A]"
              }
              key={idx}
            >
              {item}
            </div>
          ))}
        </div>
        <button className="bg-gradient-to-r from-[#3387D5] from-[-5.94%] to-[#7A06C9] to-[115.34%] font-bold rounded-full p-2">
          Connect Wallet
        </button>
      </div>
      <div className="md:h-screen flex justify-center items-center">
        <InvestConverter />
      </div>
    </main>
  );
}
