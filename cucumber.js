module.exports = {
    default: `--require-module ts-node/register --require src/test/steps/**/*.ts --format progress-bar --format @cucumber/pretty-formatter --format json:reports/results.json src/test/features/**/*.feature`
  };