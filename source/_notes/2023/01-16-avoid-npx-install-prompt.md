---
title: "#TIL | Avoid NPX install prompt"
date: 2023-01-16
syndication: 
- host: Mastodon
  url: 
---

Using `npx` ([Node Package Runner](https://docs.npmjs.com/cli/v7/commands/npx)) in a GitHub Action can be difficult, because for security reasons the command requires to type YES at a prompt if the package is not present in the local project dependencies. This can be suppressed by providing `--yes` in version 7. But there is a workaround for v6 and above, by passing yes or no via environment variable: `npm_config_yes=true npx ...`

[https://github.com/npm/cli/issues/2226](https://github.com/npm/cli/issues/2226)

#NPX #GitHubPages
