import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./schema/scema";

import { projectId, dataset, token } from "./env/initalize";

export const SanityConfig = defineConfig({
    name: "n8x",
    title: "shop nike",
    projectId,
    dataset,
    token,
    basePath: "/studio",
    plugins: [structureTool(), visionTool()],
    schema: {types: schemas},
})