import { asset } from "../utils/assets";

export const samfireProfile = {
  handle: "samfire",
  name: "Hello there",
  bio: "general kenobi, you're a bold one",
  status: "Online",
  avatar: asset("/images/avatar.jpg"),
  avatarFallback: "https://pub-a56bebf01cf34815873f44877e90a86e.r2.dev/codeishot-link-previews/705/075a5db31be74b38864c270fba741f66",
  originUrl: "https://samfire2k2.github.io/Portfolio/",
};

export const bentoItems = [
  // 0. Instagram
  {
    index: 0,
    id: "website-07ac178b-b0b0-402a-b0bc-930e5fdbb1fb",
    type: "widget",
    widgetType: "instagram",
    platform: "Instagram",
    title: "Instagram Art",
    handle: "@sfire.art",
    url: "https://instagram.com/sfire.art",
    badge: "140+ Créations",
    brandColor: "#E1306C"
  },

  // 1. Artwork 01
  {
    index: 1,
    id: "media-98058171-b38c-4104-9b72-c974d0c5790c",
    type: "media",
    widgetType: "artwork",
    platform: "Artwork",
    title: "Crimson Reverie",
    handle: "sfire.art • 4K",
    src: asset("/images/art1.jpg"),
    srcFallback: "https://pub-a56bebf01cf34815873f44877e90a86e.r2.dev/codeishot-link-previews/705/ad306ea50cf146fb88fa1524d5bdec16.jpg",
    description: "Original character illustration showcase",
    brandColor: "#ffffff"
  },

  // 2. Artwork 02
  {
    index: 2,
    id: "media-d1072921-8405-45f2-94f9-8aa05a87c0fe",
    type: "media",
    widgetType: "artwork",
    platform: "Artwork",
    title: "Cyber Synthesis",
    handle: "sfire.art • 4K",
    src: asset("/images/art2.png"),
    srcFallback: "https://pub-a56bebf01cf34815873f44877e90a86e.r2.dev/codeishot-link-previews/705/1a207127204b4f7480b64252c7adb3df.png",
    description: "High-resolution sci-fi canvas render",
    brandColor: "#ffffff"
  },

  // 3. Spotify Profile
  {
    index: 3,
    id: "website-5f683b39-0538-4020-b488-37512e503443",
    type: "widget",
    widgetType: "spotify-user",
    platform: "Spotify",
    title: "Spotify Profil",
    handle: "samuelkebab2k2",
    url: "https://open.spotify.com/user/samuelkebab2k2?si=b8714d7d61244888",
    description: "Curated playlists, electro & ambient tracks",
    badge: "Playlists & Likes",
    brandColor: "#1DB954"
  },

  // 4. Spotify Artist (SamfireMusic)
  {
    index: 4,
    id: "website-2cf6abb8-7796-47d3-a80d-ce397bee6e8e",
    type: "widget",
    widgetType: "spotify-artist",
    platform: "Spotify Artist",
    title: "SamfireMusic",
    handle: "Artiste Officiel",
    url: "https://open.spotify.com/artist/4UVeb63pjdS4f8YYVMRYjM?si=Ff8CEmDxTbamsz10ZoI5KA",
    spotifyEmbedUrl: "https://open.spotify.com/embed/artist/4UVeb63pjdS4f8YYVMRYjM?utm_source=generator&theme=0",
    description: "Original synthwave tracks & atmospheric beats",
    badge: "Productions",
    brandColor: "#1DB954"
  },

  // 5. Artwork 03
  {
    index: 5,
    id: "media-445a8b65-edc8-46bd-84b2-9c0c88baaf42",
    type: "media",
    widgetType: "artwork",
    platform: "Visual",
    title: "Soundscapes Visual",
    handle: "Cover concept",
    focalPoint: { x: 50, y: 59.21 },
    src: asset("/images/art3.webp"),
    srcFallback: "https://pub-a56bebf01cf34815873f44877e90a86e.r2.dev/codeishot-link-previews/705/00195e2407f94cc9933fcfa20d8e4e8b.webp",
    description: "Visual identity & cyber moodboard",
    brandColor: "#ffffff"
  },

  // 7. Twitter / X
  {
    index: 7,
    id: "website-a9f3b38a-86e1-4cf7-883a-f94478e0fd56",
    type: "widget",
    widgetType: "twitter",
    platform: "Twitter",
    title: "Twitter / X",
    handle: "@_Samfire_",
    url: "https://twitter.com/_Samfire_",
    description: "News, creative process, thoughts & sketches",
    badge: "Fil d'actualité",
    brandColor: "#FFFFFF"
  },

  // 8. YouTube Channel
  {
    index: 8,
    id: "website-366d6294-802e-4f3e-abbd-838efd2a8909",
    type: "widget",
    widgetType: "youtube-channel",
    platform: "YouTube",
    title: "YouTube Chaîne",
    handle: "@Samfire",
    url: "https://youtube.com/@Samfire",
    description: "Vidéos créatives, montages, animations & audio",
    badge: "Vidéos & Shorts",
    brandColor: "#FF0000"
  },

  // 9. Last.fm
  {
    index: 9,
    id: "website-37f7ea91-ccc3-4883-85e2-7e922be3d115",
    type: "widget",
    widgetType: "lastfm",
    platform: "Last.fm",
    title: "Last.fm Scrobbles",
    handle: "SamfireNinja",
    url: "https://last.fm/user/SamfireNinja",
    description: "Live scrobbles, top tracks & artists analytics",
    brandColor: "#D51007"
  },

  // 10. Twitch
  {
    index: 10,
    id: "website-0503c7a8-1b07-441a-843e-ab8a069e2983",
    type: "widget",
    widgetType: "twitch",
    platform: "Twitch",
    title: "Twitch Stream",
    handle: "samfireninja",
    url: "https://twitch.tv/samfireninja",
    description: "Live streaming sessions, gaming & digital art",
    badge: "Streamer",
    brandColor: "#9146FF"
  },

  // 11. Letterboxd
  {
    index: 11,
    id: "website-a7b0abe7-d185-4a1b-af65-c05baa7f688a",
    type: "widget",
    widgetType: "letterboxd",
    platform: "Letterboxd",
    title: "Letterboxd",
    handle: "Samfire",
    url: "https://letterboxd.com/Samfire/",
    description: "Film diary, 5★ ratings & watchlists",
    badge: "Journal Ciné",
    brandColor: "#00E054"
  },

  // 12. GitHub
  {
    index: 12,
    id: "website-365c9c20-0a31-4fd3-8f9b-174c3d455822",
    type: "widget",
    widgetType: "github",
    platform: "GitHub",
    title: "GitHub Hub",
    handle: "Samfire2k2",
    url: "https://github.com/Samfire2k2",
    description: "Open source repositories & creative web apps",
    badge: "Repositories",
    brandColor: "#F0F6FC"
  },

  // 13. Serializd
  {
    index: 13,
    id: "website-72f5d8f0-b08c-45e2-bd19-35adf3eaaad6",
    type: "widget",
    widgetType: "serializd",
    platform: "Serializd",
    title: "Serializd Séries",
    handle: "Samfire",
    url: "https://www.serializd.com/user/Samfire/profile",
    description: "TV shows tracker, episode ratings & logs",
    badge: "Journal Séries",
    brandColor: "#2575FC"
  },

  // 14. Reddit
  {
    index: 14,
    id: "website-314d18ca-15bc-4c80-b494-7f09049e7e8d",
    type: "widget",
    widgetType: "reddit",
    platform: "Reddit",
    title: "Reddit",
    handle: "u/SamfireNinja5051",
    url: "https://reddit.com/user/SamfireNinja5051",
    description: "Community discussions & creative subreddits",
    badge: "Membre Actif",
    brandColor: "#FF4500"
  },

  // 15. TikTok
  {
    index: 15,
    id: "website-a219287f-945a-4fd9-a912-b09c5ca98a91",
    type: "widget",
    widgetType: "tiktok",
    platform: "TikTok",
    title: "TikTok",
    handle: "@samfire2k2",
    url: "https://tiktok.com/@samfire2k2",
    description: "Short clips, speedpaints & video edits",
    badge: "Vidéos Courtes",
    brandColor: "#FE2C55"
  },

  // 16. Wattpad
  {
    index: 16,
    id: "website-3347818c-3294-4db0-bbf7-4b7effa6bfed",
    type: "widget",
    widgetType: "wattpad",
    platform: "Wattpad",
    title: "Wattpad Écrits",
    handle: "Samfire_",
    url: "https://www.wattpad.com/user/Samfire_",
    description: "Original stories, fiction & narrative writings",
    badge: "Littérature",
    brandColor: "#FF6122"
  },

  // 17. Discord Server
  {
    index: 17,
    id: "website-7d63d4b1-f24f-4f32-a5a2-6294d9302e2a",
    type: "widget",
    widgetType: "discord",
    platform: "Discord",
    title: "Samfire's Community!ホ火",
    handle: "Discord Server",
    url: "https://discord.com/invite/FVchfHZxKh",
    description: "Serveur Discord officiel : art, chat vocal & partages",
    badge: "Communauté Active",
    brandColor: "#5865F2"
  },

  // 18. ArtStation
  {
    index: 18,
    id: "website-f5a06f8f-1a50-449a-a842-5c56452d9782",
    type: "widget",
    widgetType: "artstation",
    platform: "ArtStation",
    title: "ArtStation Pro",
    handle: "samfireninja",
    url: "https://www.artstation.com/samfireninja",
    description: "Professional digital art & 3D renders portfolio",
    badge: "Portfolio Pro",
    previewImage: asset("/images/art2.png"),
    brandColor: "#13AFF0"
  },

  // 19. GG App
  {
    index: 19,
    id: "website-359d224e-4300-403c-b08e-675e81fadef4",
    type: "widget",
    widgetType: "ggapp",
    platform: "GG App",
    title: "GG | Game Tracker",
    handle: "SamfireNinja",
    url: "https://ggapp.io/SamfireNinja",
    description: "Video games collection, backlog & completed games",
    badge: "Jeux Vidéo",
    brandColor: "#FF5E5B"
  },

  // 20. Nocteller
  {
    index: 20,
    id: "website-nocteller-samfire",
    type: "widget",
    widgetType: "nocteller",
    platform: "Nocteller",
    title: "Nocteller",
    handle: "Samfire",
    url: "https://nocteller.com/user/Samfire",
    description: "Profil sur la plateforme de lecture et d'écriture",
    badge: "Nocteller",
    brandColor: "#00E054"
  },

  // 21. End of Line (Full Width Showcase)
  {
    index: 21,
    id: "website-c4e99e55-072c-4014-8564-f7e6dfacf561",
    type: "widget",
    widgetType: "endofline",
    platform: "End of Line",
    title: "Portfolio • Writings",
    handle: "samfire2k2.github.io/end-of-line",
    url: "https://samfire2k2.github.io/end-of-line/",
    description: "Univers narratif complet : textes cyberpunk, citations & interface futuriste interactive.",
    badge: "Univers Phare",
    isFullWidth: true,
    brandColor: "#00E5FF"
  }
];
