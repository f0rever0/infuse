export interface NotionFilter {
  property: string;
  multi_select: {
    contains: string;
  };
}

export interface NotionQueryParams {
  selectedKeywordList: string[];
}

export interface NotionResponse {
  results: any[]; // TODO: Notion 응답 타입 정의 필요
}

export interface ApiError {
  error: string;
  status: number;
}
