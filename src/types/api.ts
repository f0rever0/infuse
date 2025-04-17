export interface NotionFilter {
  property: string;
  multi_select: {
    contains: string;
  };
}

export interface NotionQueryParams {
  selectedKeywordList: string[];
}

export interface ApiError {
  error: string;
  status: number;
}
