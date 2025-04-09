import { notionClient, notionDatabase } from "./client";
import type {
  NotionFilter,
  NotionQueryParams,
  NotionResponse,
} from "@/types/api";

export async function queryNotionDatabase(
  params: NotionQueryParams
): Promise<NotionResponse> {
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
