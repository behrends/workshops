'use client';

import { usePathname } from 'next/navigation';

export default function SectionLinks({ meta }) {
  const pathname = usePathname();

  return (
    <div className="grid gap-3 mt-4">
      {Object.entries(meta).map(([slug, title], index) => (
        <a
          key={slug}
          href={`${pathname}/${slug}`}
          className="block p-4 border border-gray-200 dark:border-neutral-800 rounded-lg no-underline hover:border-primary hover:shadow-md transition-all"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {index + 1}.
          </span>
          <span className="ml-2 font-medium">{title}</span>
        </a>
      ))}
    </div>
  );
}
