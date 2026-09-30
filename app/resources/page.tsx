import ResourcesClient from "@/components/resources/ResourcesClient";
import { getBibleStudies, getArticles, getSermons, getBooks } from "@/lib/supabase/queries";

export const metadata = { title: "Resources | Enoch's Outpost Ministry" };

export default async function ResourcesPage() {
  const [bibleStudies, articles, sermons, books] = await Promise.all([
    getBibleStudies(),
    getArticles(),
    getSermons(),
    getBooks(),
  ]);

  return <ResourcesClient bibleStudies={bibleStudies} articles={articles} sermons={sermons} books={books} />;
}
