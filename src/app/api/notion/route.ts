import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Client } from "@notionhq/client";

const notionSecret = process.env.NOTION_TOKEN;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({ auth: notionSecret });

export async function POST(request: NextRequest) {
  if (!notionDatabaseId || !notionSecret) return;

  try {
    // 클라이언트에서 보낸 body 데이터 가져오기
    const body = await request.json();
    const selectedKeywordList: string[] = body.selectedKeywordList || []; // 키워드 배열 받기

    // 필터를 동적으로 생성
    const filterConditions = selectedKeywordList.map((keyword) => ({
      property: "키워드",
      multi_select: {
        contains: keyword,
      },
    }));

    // Notion API 요청
    const response = await notion.databases.query({
      database_id: notionDatabaseId,
      filter: {
        or: filterConditions, // 필터 적용
      },
    });

    return NextResponse.json(response.results);
  } catch (error) {
    console.error("Notion API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
