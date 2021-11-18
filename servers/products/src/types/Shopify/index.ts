export interface StoreFrontToken {
  storefront_access_token: {
    access_token: string;
    access_scope: string;
    created_at: Date;
    id: number;
    admin_graphql_api_id: string;
    title: string;
  }
}