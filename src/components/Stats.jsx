import { stats } from "@/lib/docs";
import { useTranslations } from 'next-intl';

export default function Stats() {
    const t = useTranslations('HomePage');
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base/7 text-gray-600 dark:text-gray-400">{t(stat.title)}</dt>
                            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-200 sm:text-5xl">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}

