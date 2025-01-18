import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemas } from "./schema/scema";

export const SanityConfig = defineConfig({
    name: "n8x",
    title: "shop nike",
    projectId: "j0s9z1tm",
    dataset: "production",
    basePath: "/studio",
    plugins: [structureTool(), visionTool()],
    schema: {types: schemas}
})