import { LangProvider } from "@/contexts/LangContext";
import { SiteProvider, type PostSummary } from "@/contexts/SiteContext";
import { getPublishedPosts, getSiteContent } from "@/lib/content/get";
import { buildTranslations } from "@/lib/content/translations";
import Sidebar from "@/components/Sidebar";
import MobileProfile from "@/components/MobileProfile";
import RightNav from "@/components/RightNav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import GrainOverlay from "@/components/ui/GrainOverlay";

// Page statique régénérée dès qu'un contenu est modifié dans le dashboard
export const revalidate = 3600;

export default async function Home() {
  const [site, posts] = await Promise.all([getSiteContent(), getPublishedPosts(3)]);
  const dicts = { fr: buildTranslations(site, "fr"), en: buildTranslations(site, "en") };
  const postSummaries: PostSummary[] = posts.map((p) => ({
    slug: p.slug,
    lang: p.lang,
    title: p.title,
    excerpt: p.excerpt,
    coverImage: p.coverImage,
    videoUrl: p.videoUrl,
    tags: p.tags,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }));

  return (
    <SiteProvider site={site} posts={postSummaries}>
      <LangProvider dicts={dicts}>
        <div className="bg-dark min-h-screen">
          <ScrollProgressBar />
          <GrainOverlay />
          <Sidebar />
          <main className="lg:ml-[270px] lg:mr-10">
            <MobileProfile />
            <Hero />
            <About />
            <Resume />
            <Services />
            <Skills />
            <Projects />
            <Blog />
            <Contact />
          </main>
          <RightNav />
        </div>
      </LangProvider>
    </SiteProvider>
  );
}
