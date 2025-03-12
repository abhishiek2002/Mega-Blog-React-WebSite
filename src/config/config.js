export const config = {
  appwrite_url: String(import.meta.env.VITE_APPWRITE_URL),
  appwrite_database: String(import.meta.env.VITE_APPWRITE_DATABASE_KEY),
  appwrite_collection: String(import.meta.env.VITE_APPWRITE_COLLECTION_KEY),
  appwrite_bucket: String(import.meta.env.VITE_APPWRITE_BUCKET_KEY),
  appwrite_megablog: String(import.meta.env.VITE_APPWRITE_MEGABLOG_KEY),
};

export default config;
