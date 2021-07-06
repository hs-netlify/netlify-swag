module.exports = {
  target: "serverless",
  basePath:
    process.env.NEXT_PUBLIC_LOCALE === "en"
      ? ""
      : `/${process.env.NEXT_PUBLIC_LOCALE}`,
};
