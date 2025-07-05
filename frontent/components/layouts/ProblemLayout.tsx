import Link from 'next/link';
import React from 'react';

const ProblemLayout: React.FC<{
  children: React.ReactNode;
  problemSlug: string;
  activeSection: string;
}> = ({ problemSlug, activeSection, children }) => {
  const navItems = [
    { label: 'Description', value: 'description' },
    { label: 'Submissions', value: 'submissions' },
    { label: 'Solutions', value: 'solutions' },
  ];

  return (
    <section className="flex flex-col w-full h-[100vh] overflow-y-scroll gap-2 custom-scrollbar">
      <nav className="flex flex-row w-full items-center gap-5 px-4 py-2 border-b border-zinc-700">
        {navItems.map((item) => (
          <Link
            key={item.value}
            href={`/general/${problemSlug}/${item.value}`}
            className={`px-3 py-1 rounded-md transition-all duration-200
              ${activeSection === item.value
                ? 'bg-white text-black font-semibold'
                : 'text-gray-400 hover:text-white hover:bg-zinc-700'
              }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      {children}
    </section>
  );
};

export default ProblemLayout;
