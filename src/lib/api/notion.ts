import { notionClient, notionDatabase } from "./client";
import type { NotionFilter, NotionQueryParams } from "@/types/api";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export async function queryNotionDatabase(
  params: NotionQueryParams
): Promise<QueryDatabaseResponse> {
  const filterConditions: NotionFilter[] = params.selectedKeywordList.map(
    (keyword) => ({
      property: "키워드",
      multi_select: {
        contains: keyword,
      },
    })
  );

  const response = await notionClient.databases.query({
    database_id: notionDatabase,
    filter: {
      or: filterConditions,
    },
  });

  return response;
}
