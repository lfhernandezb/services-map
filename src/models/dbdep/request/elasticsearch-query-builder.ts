export class ElasticsearchQueryBuilder {
    private query: ElasticsearchQuery;
  
    constructor() {
      this.query = {
        query: {
          term: {
            "span.type": "db"
          }
        },
        aggs: {
          service: {
            terms: {
              field: "service.name"
            },
            aggs: {
              engine_type: {
                terms: {
                  field: "span.subtype"
                },
                aggs: {
                  host: {
                    terms: {
                      field: "destination.address"
                    },
                    aggs: {
                      instance: {
                        terms: {
                          field: "span.db.instance"
                        },
                        aggs: {
                          sentence: {
                            terms: {
                              field: "span.name"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        size: 0
      };
    }
  
    public build(): ElasticsearchQuery {
      return this.query;
    }
  }
  