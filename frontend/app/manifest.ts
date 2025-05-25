import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bacacerdas.ai";

export default function manifest(): MetadataRoute.Manifest {
    return {
        "theme_color": "#000000",
        "background_color": "#818cf9",
        "icons": [
            {
                "purpose": "maskable",
                "sizes": "512x512",
                "src": "/icon512_maskable.png",
                "type": "image/png"
            },
            {
                "purpose": "any",
                "sizes": "512x512",
                "src": "/icon512_rounded.png",
                "type": "image/png"
            }
        ],
        "orientation": "any",
        "display": "standalone",
        "dir": "auto",
        "lang": "id-ID",
        "name": "BacaCerdas-AI - Platform Membaca Cerdas",
        "short_name": "Baca Cerdas AI",
        "start_url": siteUrl.concat("/home"),
        "scope": siteUrl,
        "description": "Platform membaca dan pembelajaran berbasis AI untuk meningkatkan pemahaman dan akuisisi pengetahuan",
        "id": siteUrl.concat("/home"),
        
    }
}