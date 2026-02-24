import { getOpenApiSpec } from "@/lib/docs";
import { ApiReferenceReact } from "@scalar/api-reference-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference — LobsterMail Docs",
  description:
    "Complete API reference for the LobsterMail email infrastructure.",
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
