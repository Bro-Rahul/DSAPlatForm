'use client';

import useProblem from '@/store/useProblem';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ProblemTabs: React.FC<{
  slug: string,
  children: React.ReactNode
}> = ({ children, slug }) => {
  const pathname = usePathname();
  const { data:{submissionResult} } = useProblem();

  const activeTab = pathname.split('/').pop();
  const tabs = [
    { label: 'Description', value: 'description' },
    { label: 'Submissions', value: 'submissions' },
    { label: 'Solutions', value: 'solutions' },
  ];
  return (
    <div className='flex flex-col w-full h-full gap-5'>
      <nav className='flex flex-row w-full gap-5'>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <Link
              key={tab.value}
              href={`/problems/${slug}/${tab.value}`}
              className={`px-4 py-2 rounded-md transition-all ${isActive
                ? 'bg-zinc-600/50 text-white font-semibold'
                : 'text-white'
                }`}
            >
              {tab.label}
            </Link>
          );
        })}
        {submissionResult?.statue && <Link
          key={submissionResult.statue}
          href={`/problems/${slug}/result`}
          className={`px-4 py-2 rounded-md transition-all ${activeTab === 'result'
            ? 'bg-zinc-600/50 text-white font-semibold'
            : 'text-white'
            }`}
        >
          {submissionResult.statue}
        </Link>}
      </nav>
      {children}
    </div>
  );
};

export default ProblemTabs;
