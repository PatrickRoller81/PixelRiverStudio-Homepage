module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  // Cache-Busting: neue CSS-Version nach jedem Deploy, sonst zeigen Browser altes Layout
  eleventyConfig.addGlobalData("buildTime", () => Date.now().toString(36));

  eleventyConfig.addCollection("devlog", function(collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/devlog/posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addFilter("dateDisplay", (date) => {
    return new Date(date).toLocaleDateString("de-DE", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
