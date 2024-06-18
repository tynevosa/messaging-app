module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
  },
};
