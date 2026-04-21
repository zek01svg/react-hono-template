export default {
  "*.{js,jsx,ts,tsx}": ["oxlint --fix", "oxfmt --write"],
  "*.{json,css,md,html,yml,yaml}": ["oxfmt --write"],
};
