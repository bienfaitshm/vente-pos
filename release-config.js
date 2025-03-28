// .releaserc.js
module.exports = {
    branches: [
      "main",
      { name: "develop", prerelease: true },
    ],
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/npm",
      "@semantic-release/git",
    ],
  };