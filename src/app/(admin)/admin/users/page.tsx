export default function UsersPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Users Directory</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                    This module will allow you to view, ban, and manage all registered users and donors on the platform.
                </p>
            </div>
        </div>
    );
}
