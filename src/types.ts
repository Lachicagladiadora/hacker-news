export type ArticleType = {
  author?: string;
  comment_text?: string;
  created_at?: string;
  created_at_i?: number;
  objectID?: string;
  parent_id?: number;
  story_id?: number;
  story_title?: string;
  title?: string;
  story_url?: string;
  updated_at?: string;
  _highlightResult?: {
    author: object;
    comment_text: object;
    story_title: object;
    story_url: string;
  };
  _tags?: string[];
  is_fave?: boolean;
};

export type DataType = {
  exhaustive?: { nbHits: boolean; typo: boolean };
  exhaustiveNbHits?: boolean;
  exhaustiveTypo?: boolean;
  hits: ArticleType[];
  hitsPerPage?: number;
  nbHits?: number;
  nbPages?: number;
  page?: number;
  params?: string;
  processingTimeMS?: number;
  processingTimingsMS?: {
    afterFetch?: number[] | object[];
    fetch: number[];
    _request: number[];
  };
  query?: string;
  serverTimeMS?: number;
};
