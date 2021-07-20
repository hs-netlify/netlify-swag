// The Shopify Admin API uses IDs in this form:
// "gid://shopify/Product/6719664718021"
// But the Storefront API uses this form:
// "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3MTk2NjQ3MTgwMjE="
// Which is the Admin API ID encoded using base64
export function adminApiIdtoStorefrontId(adminApiId) {
  return Buffer.from(adminApiId).toString("base64");
}
