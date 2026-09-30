// Default/fallback copy for editable homepage & about sections.
// Overridden by the `site_content` table once Supabase is connected and
// an admin edits it from /admin/site-content. Mirrors site-config.ts.
export const siteContentDefaults = {
  hero_eyebrow: "Enoch's Outpost Ministry",
  hero_title: "Pointing Hearts to Jesus and the Everlasting Gospel",
  hero_subtitle:
    "A Bible-based ministry serving Nyeri and beyond through prophecy, health, family, and children's outreach.",
  about_mission:
    "To proclaim the everlasting gospel and the soon return of Jesus Christ through Bible truth, health education, and practical family ministry.",
  about_vision: "A community transformed by the character of God, prepared to meet Him in peace.",
  about_history:
    "Enoch's Outpost began as a small group of believers in Nyeri committed to sharing present truth through evangelism, literature, and health outreach, and has since grown into a multi-ministry outreach.",
  ministry_health_blurb:
    "Biblical health principles, nutrition, and natural living for whole-person restoration.",
  ministry_prophecy_blurb:
    "Daniel, Revelation, the Sanctuary, and the Three Angels' Messages explained simply.",
  ministry_children_blurb:
    "Bible stories, Sabbath resources, and devotionals that plant Scripture in young hearts.",
  ministry_family_blurb: "Marriage, parenting, and family worship resources for Christ-centered homes.",
};

export type SiteContent = typeof siteContentDefaults;
