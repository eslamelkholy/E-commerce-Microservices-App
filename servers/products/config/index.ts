import dotenv from 'dotenv';
import { ProcessEnv } from '../types/Enviroment/index';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) throw new Error("⚠️  Couldn't find .env file  ⚠️");

export default {
  PORT: process.env.PORT,
  IN_PROD: process.env.IN_PROD,
  LOGGER: process.env.LOGGER,
  NODE_ENV: process.env.NODE_ENV,
  APP_ID: process.env.APP_ID,
  PARSE_URL: process.env.PARSE_SERVER_URL,
  MASTER_KEY: process.env.MASTER_KEY,

  SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
  SCOPES: `read_products,write_products,read_customers,write_customers,read_orders,write_orders,read_shipping,unauthenticated_read_product_listings,read_checkouts,write_checkouts,read_shopify_payments_payouts,read_shopify_payments_disputes,unauthenticated_read_checkouts,unauthenticated_write_checkouts,unauthenticated_write_customers,unauthenticated_read_customer_tags,unauthenticated_read_content,unauthenticated_read_product_tags,read_fulfillments`,
  FORWARDING_ADDRESS: process.env.FORWARDING_ADDRESS, // Replace this with your HTTPS Forwarding address
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_TOKEN_TITLE: process.env.ACCESS_TOKEN_TITLE,
  SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
} as ProcessEnv;
