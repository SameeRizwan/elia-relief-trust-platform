export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚙️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Configuration</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    Manage Stripe keys, email templates, and general platform configuration settings here.
                </p>
            </div>
        </div>
    );
}
