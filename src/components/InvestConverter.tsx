import React, { useState } from "react";
import { TokenSelect } from "./TokenSelect";
import useTicker from "@/hooks/useTicker";

export const InvestConverter = () => {
  const [investAmt, setInvestAmt] = useState<number | undefined>();
  const [convertedAmt, setConvertedAmt] = useState<number>(0.0);
  const priceList: { symbol: string; price: string }[] = useTicker();
  const [selectedPrice, setSelectedPrice] = useState<number>(
    parseFloat(priceList[0]?.price) ?? 0.0005
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setConvertedAmt(0.0);
      setInvestAmt(undefined);
    }
    const value = parseFloat(e.target.value);
    if (!Number.isNaN(value)) {
      setInvestAmt(value);
      setConvertedAmt(value / (80 * selectedPrice));
    }
  };

  return (
    <div className="flex flex-col bg-[#0B0819] items-center p-8 gap-4 rounded-xl">
      <div className="flex w-full justify-between gap-2 items-center">
        <div className="text-[#C5C5C5] text-sm">Current Value</div>
        <div className="text-[#627EEA] text-2xl font-semibold">$ 24882</div>
      </div>
      <TokenSelect
        tokenPrice={selectedPrice}
        updateTokenPrice={(value: number) => {
          setSelectedPrice(value);
          setInvestAmt(0.0);
          setConvertedAmt(0.0);
        }}
      />
      <div className="w-full text-[#C5C5C5] text-sm">
        Amount you want to invest
      </div>
      <input
        className="w-full bg-[#6E56F840] text-[#C5C5C5] rounded-xl p-2"
        value={investAmt}
        placeholder="0.00"
        onChange={handleChange}
        type="number"
      />
      <div className="w-full text-[#C5C5C5] text-sm">
        Estimate Number of ETH You will Get
      </div>
      <input
        className="w-full bg-[#6E56F840] text-[] rounded-xl p-2"
        disabled
        value={convertedAmt}
      />
      {/* <div className=""> */}
      <button className="w-full bg-gradient-to-r from-[#3387D5] from-[-5.94%] to-[#7A06C9] to-[115.34%] font-bold rounded-full p-2">
        Buy
      </button>
      {/* </div> */}
    </div>
  );
};
