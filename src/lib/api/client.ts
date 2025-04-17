import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

if (!notionSecret || !notionDatabaseId) {
  throw new Error("Notion API credentials are not properly configured");
}

export const notionClient = new Client({ auth: notionSecret });
export const notionDatabase = notionDatabaseId;
