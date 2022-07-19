module.exports = {
  images: {
    domains: ["cdn.shopify.com", "tailwindui.com", "files.stripe.com"],
  },
  async redirects() {
    return [
      {
        source: "/:path*(.html)",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};
