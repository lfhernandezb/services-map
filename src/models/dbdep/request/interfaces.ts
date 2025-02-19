interface Query {
    term: {
      [key: string]: string;
    };
  }
  
  interface TermsAggregation {
    terms: {
      field: string;
    };
    aggs?: Record<string, TermsAggregation>;
  }
  
  interface Aggregation {
    [key: string]: TermsAggregation;
  }
  
  interface ElasticsearchQuery {
    query: Query;
    aggs: Aggregation;
    size: number;
  }
  