import { getOpenApiSpec } from "@/lib/docs";
import { ApiReferenceReact } from "@scalar/api-reference-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference — LobsterMail Docs",
  description:
    "Complete API reference for the LobsterMail email infrastructure.",
  alternates: {
    canonical: "https://lobstermail.ai/docs/api-reference",
  },
  openGraph: {
    title: "API Reference — LobsterMail Docs",
    description:
      "Complete API reference for the LobsterMail email infrastructure.",
    url: "https://lobstermail.ai/docs/api-reference",
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "API Reference — LobsterMail Docs",
    description:
      "Complete API reference for the LobsterMail email infrastructure.",
    images: ["/og-image.png"],
  },
};

export default async function ApiReferencePage() {
  const spec = await getOpenApiSpec();

  return (
    <div className="min-w-0">
      <ApiReferenceReact
        configuration={{
          content: spec,
          darkMode: true,
          hideModels: false,
          theme: "deepSpace",
        }}
      />
    </div>
  );
}
