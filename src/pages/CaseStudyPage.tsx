import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { ClippedButton } from "../components/ui/design-system";
import type { SetPage } from "@/lib/navigation";
import { getStudy } from "@/lib/caseStudies";
import { CaseStudyPoster } from "@/components/home/CaseStudyPoster";

/**
 * Every published study renders through the cinematic poster layout
 * (CaseStudyPoster). This page just resolves the slug and hands off; the
 * not-found state covers an unknown or unpublished slug.
 */
export function CaseStudyPage({ slug, setPage }: { slug: string; setPage: SetPage }) {
  const study = getStudy(slug);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (study?.poster) {
    return <CaseStudyPoster study={study} setPage={setPage} />;
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-3xl font-bold text-white">Case study not found</h1>
      <p className="mt-3 text-slate-400">That project isn't one we can show — yet.</p>
      <ClippedButton variant="cyan" onClick={() => setPage("home", "work")} className="mt-8">
        <ArrowLeft size={16} /> Back to work
      </ClippedButton>
    </div>
  );
}
