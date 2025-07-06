import React from 'react';
import { notFound } from 'next/navigation';
import ProblemDescription from '@/components/solve/ProblemDescription';
import AllSubmissions from '@/components/solve/AllSubmissions';

const page: React.FC<{
  params: Promise<{ sections: string; slug: string }>;
}> = async ({ params }) => {
  const { sections, slug } = await params;

  // ✅ Allowed sections
  const validSections = ['description', 'submissions', 'solutions'];

  // ❌ If the section is not valid, throw 404
  if (!validSections.includes(sections)) {
    notFound(); // this will render the 404 page
  }

  switch (sections) {
    case "description":
      return <ProblemDescription slug={slug} />
    case "submissions":
      return <AllSubmissions slug={slug}/> 
  }

  return (
    <div className="p-4">
      Page: <strong>{sections}</strong> for problem <strong>{slug}</strong>
    </div>
  );
};

export default page;
