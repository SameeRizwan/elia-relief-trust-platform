import Link from "next/link";
import { Button } from "@/components/ui/button";

export function UrgentBanner() {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Image Parallax Effect */}
            <div
                className="absolute inset-0 bg-cover bg-fixed bg-center"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=2832&auto=format&fit=crop")',
                }}
            />
            <div className="absolute inset-0 bg-[#0F5E36]/90 mix-blend-multiply" />

            <div className="container mx-auto px-4 relative z-10 text-center text-white">
                <span className="inline-block bg-white text-[#0F5E36] px-4 py-1 rounded-full font-bold uppercase tracking-wider text-sm mb-6">
                    Emergency Alert
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                    Yemen Needs You Now
                </h2>
                <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 font-light">
                    Millions are on the brink of famine. $50 can feed a family for a whole month. Do not delay your charity.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/donate">
                        <Button size="lg" className="bg-white text-[#0F5E36] hover:bg-gray-100 font-bold px-10 py-6 text-lg rounded-full">
                            Donate Now
                        </Button>
                    </Link>
                    <Link href="/appeals">
                        <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-6 text-lg rounded-full bg-transparent">
                            Read More
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
