import React from 'react'

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b border-gray-300 dark:border-white/20 bg-background/50 p-6 text-4xl backdrop-blur-lg">
                <span>Dashboard</span>
            </h1>
            <div className="flex flex-col gap-10 p-6">
                <div>
                    <h2 className="text-2xl font-bold">Dashboard coming soon</h2>
                    <p className="text-base text-white/50">
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage