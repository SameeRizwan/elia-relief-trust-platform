"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Info, HelpCircle, Calculator, ChevronDown, ChevronUp } from "lucide-react";

export function ZakatCalculator() {
    const { addToCart } = useCart();
    const router = useRouter();

    // Prices (Editable by user)
    const [goldPrice, setGoldPrice] = useState(65.50); // Approx GBP per gram
    const [silverPrice, setSilverPrice] = useState(0.85); // Approx GBP per gram

    // Assets
    const [assets, setAssets] = useState({
        gold: 0, // grams
        silver: 0, // grams
        cashInHand: 0,
        cashInBank: 0,
        shares: 0,
        moneyOwedToYou: 0,
        businessGoods: 0,
        pension: 0,
        other: 0
    });

    // Liabilities
    const [liabilities, setLiabilities] = useState({
        debtsYouOwe: 0,
        expensesDue: 0
    });

    // Results
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalLiabilities, setTotalLiabilities] = useState(0);
    const [netAssets, setNetAssets] = useState(0);
    const [zakatDue, setZakatDue] = useState(0);

    const [nisabThreshold, setNisabThreshold] = useState(0);
    const [activeNisab, setActiveNisab] = useState<'gold' | 'silver'>('silver'); // Silver is safer for poor

    // Calculate Totals
    useEffect(() => {
        const assetTotal =
            (assets.gold * goldPrice) +
            (assets.silver * silverPrice) +
            assets.cashInHand +
            assets.cashInBank +
            assets.shares +
            assets.moneyOwedToYou +
            assets.businessGoods +
            assets.pension +
            assets.other;

        const liabilityTotal = liabilities.debtsYouOwe + liabilities.expensesDue;

        setTotalAssets(assetTotal);
        setTotalLiabilities(liabilityTotal);
        setNetAssets(assetTotal - liabilityTotal);

        // Nisab Calculation
        // Gold Nisab: 87.48g
        // Silver Nisab: 612.36g
        const goldNisabVal = 87.48 * goldPrice;
        const silverNisabVal = 612.36 * silverPrice;

        const threshold = activeNisab === 'gold' ? goldNisabVal : silverNisabVal;
        setNisabThreshold(threshold);

        if ((assetTotal - liabilityTotal) >= threshold) {
            setZakatDue((assetTotal - liabilityTotal) * 0.025);
        } else {
            setZakatDue(0);
        }

    }, [assets, liabilities, goldPrice, silverPrice, activeNisab]);

    const handlePayZakat = () => {
        if (zakatDue <= 0) return;

        addToCart({
            id: 'zakat-payment',
            title: 'Zakat Payment',
            amount: parseFloat(zakatDue.toFixed(2)),
            type: 'single',
            image: '/assets/zakat-icon.png' // Would need a customized icon or generic
        });
        router.push("/checkout");
    };

    const handleInputChange = (category: 'assets' | 'liabilities', field: string, value: string) => {
        const numVal = parseFloat(value) || 0;
        if (category === 'assets') {
            setAssets(prev => ({ ...prev, [field]: numVal }));
        } else {
            setLiabilities(prev => ({ ...prev, [field]: numVal }));
        }
    };

    const [showPrices, setShowPrices] = useState(false);

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-[#0F5E36] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Calculator className="w-8 h-8" />
                        Your Zakat Calculation
                    </h2>
                    <p className="opacity-90">Based on Nisab threshold of £{nisabThreshold.toLocaleString('en-GB', { minimumFractionDigits: 2 })} ({activeNisab === 'gold' ? 'Gold' : 'Silver'})</p>
                </div>
                <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-bottom-right"></div>
            </div>

            <div className="p-8">
                {/* Configuration: Prices & Nisab Choice */}
                <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowPrices(!showPrices)}>
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            Configuration <span className="text-xs font-normal text-gray-500">(Gold/Silver Prices)</span>
                        </h3>
                        {showPrices ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>

                    {showPrices && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-top-2">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Calculation Basis</label>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveNisab('silver')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg border ${activeNisab === 'silver' ? 'bg-gray-200 border-gray-300' : 'bg-white'}`}
                                    >
                                        Silver (Recommended)
                                    </button>
                                    <button
                                        onClick={() => setActiveNisab('gold')}
                                        className={`flex-1 py-2 text-sm font-medium rounded-lg border ${activeNisab === 'gold' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-white'}`}
                                    >
                                        Gold
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Gold Price (£/g)</label>
                                <input
                                    type="number"
                                    value={goldPrice}
                                    onChange={(e) => setGoldPrice(parseFloat(e.target.value))}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">Silver Price (£/g)</label>
                                <input
                                    type="number"
                                    value={silverPrice}
                                    onChange={(e) => setSilverPrice(parseFloat(e.target.value))}
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Col: Inputs */}
                    <div className="space-y-8">
                        {/* Precious Metals */}
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Precious Metals</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Gold (grams)" value={assets.gold} onChange={(v) => handleInputChange('assets', 'gold', v)} />
                                <InputGroup label="Silver (grams)" value={assets.silver} onChange={(v) => handleInputChange('assets', 'silver', v)} />
                            </div>
                        </div>

                        {/* Cash */}
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Cash & Savings</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Cash in Hand" value={assets.cashInHand} onChange={(v) => handleInputChange('assets', 'cashInHand', v)} prefix="£" />
                                <InputGroup label="Cash in Bank" value={assets.cashInBank} onChange={(v) => handleInputChange('assets', 'cashInBank', v)} prefix="£" />
                                <InputGroup label="Money Owed to You" value={assets.moneyOwedToYou} onChange={(v) => handleInputChange('assets', 'moneyOwedToYou', v)} prefix="£" />
                            </div>
                        </div>

                        {/* Investments */}
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Investments & Business</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Shares / Crypto" value={assets.shares} onChange={(v) => handleInputChange('assets', 'shares', v)} prefix="£" />
                                <InputGroup label="Business Goods" value={assets.businessGoods} onChange={(v) => handleInputChange('assets', 'businessGoods', v)} prefix="£" />
                                <InputGroup label="Pension" value={assets.pension} onChange={(v) => handleInputChange('assets', 'pension', v)} prefix="£" />
                                <InputGroup label="Other Assets" value={assets.other} onChange={(v) => handleInputChange('assets', 'other', v)} prefix="£" />
                            </div>
                        </div>

                        {/* Liabilities */}
                        <div>
                            <h3 className="font-bold text-lg text-red-800 mb-4 border-b border-red-100 pb-2">Liabilities (Deductible)</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Debts You Owe" value={liabilities.debtsYouOwe} onChange={(v) => handleInputChange('liabilities', 'debtsYouOwe', v)} prefix="£" />
                                <InputGroup label="Expenses Due Now" value={liabilities.expensesDue} onChange={(v) => handleInputChange('liabilities', 'expensesDue', v)} prefix="£" />
                            </div>
                        </div>
                    </div>

                    {/* Right Col: Summary Card */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                            <h3 className="font-bold text-xl text-gray-900 mb-6">Summary</h3>

                            <div className="space-y-4 mb-8">
                                <SummaryRow label="Total Assets" value={totalAssets} />
                                <SummaryRow label="Total Liabilities" value={totalLiabilities} isNegative />
                                <div className="h-px bg-gray-300 my-2"></div>
                                <SummaryRow label="Net Assets" value={netAssets} isBold />
                                <div className="text-xs text-right text-gray-500">
                                    {netAssets >= nisabThreshold
                                        ? <span className="text-green-600 font-bold">Above Nisab Threshold (Eligible)</span>
                                        : <span className="text-red-500">Below Nisab Threshold (Not Eligible)</span>
                                    }
                                </div>
                            </div>

                            <div className="bg-[#0F5E36] text-white p-6 rounded-xl shadow-lg mb-6 text-center">
                                <p className="text-sm opacity-90 mb-1">Total Zakat Payable (2.5%)</p>
                                <p className="text-4xl font-extrabold">£{zakatDue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>

                            <Button
                                onClick={handlePayZakat}
                                disabled={zakatDue <= 0}
                                className="w-full h-14 text-lg font-bold bg-[#D4AF37] hover:bg-[#b5952f] text-white shadow-lg shadow-yellow-600/20"
                            >
                                Pay Your Zakat Now
                            </Button>

                            <p className="text-xs text-center text-gray-500 mt-4 leading-relaxed">
                                Calculate with ease. Allah rewards those who purify their wealth.
                                <br />Please consult a scholar for complex financial situations.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

function InputGroup({ label, value, onChange, prefix }: { label: string, value: number, onChange: (v: string) => void, prefix?: string }) {
    return (
        <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">{label}</label>
            <div className="relative">
                {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">{prefix}</span>}
                <input
                    type="number"
                    min="0"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0"
                    className={`block w-full ${prefix ? 'pl-7' : 'pl-3'} pr-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#0F5E36] focus:border-transparent transition-all outline-none`}
                />
            </div>
        </div>
    )
}

function SummaryRow({ label, value, isNegative, isBold }: { label: string, value: number, isNegative?: boolean, isBold?: boolean }) {
    return (
        <div className={`flex justify-between items-center text-gray-700 ${isBold ? 'font-bold text-lg text-gray-900' : ''}`}>
            <span>{label}</span>
            <span className={isNegative ? 'text-red-600' : ''}>
                {isNegative ? '-' : ''}£{value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
        </div>
    )
}
