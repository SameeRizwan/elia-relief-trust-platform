export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-[#0F5E36]/30">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
                        <span className="text-[#0F5E36]">ELIA</span> RELIEF TRUST
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Empowering communities and individual lives through direct, transparent giving. 100% Donation Policy.
                    </p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 text-[#0F5E36]">About</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/about" className="hover:text-[#0F5E36] transition-colors">Our Mission</a></li>
                        <li><a href="/admin" className="hover:text-[#0F5E36] transition-colors">Admin Login</a></li>
                        <li><a href="/dashboard" className="hover:text-[#0F5E36] transition-colors">My Profile</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 text-[#0F5E36]">Get Involved</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/appeals" className="hover:text-[#0F5E36] transition-colors">Donate</a></li>
                        <li><a href="/contact" className="hover:text-[#0F5E36] transition-colors">Contact Us</a></li>
                        <li><a href="/family-registration" className="hover:text-[#0F5E36] transition-colors">Register as Family</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4 text-[#0F5E36]">Connect</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-[#0F5E36] transition-colors">Twitter</a></li>
                        <li><a href="#" className="hover:text-[#0F5E36] transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-[#0F5E36] transition-colors">Facebook</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Elia Relief Trust. Registered Charity No. 1234567. All rights reserved.
            </div>
        </footer>
    );
}
