import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { queryNotionDatabase } from "@/lib/api/notion";
import type { NotionQueryParams } from "@/types/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params: NotionQueryParams = {
      selectedKeywordList: body.selectedKeywordList || [],
    };

    const response = await queryNotionDatabase(params);
    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Notion API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
