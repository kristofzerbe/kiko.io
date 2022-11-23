---
title: Create Git pull request only for selected commits
date: 2022-11-14 12:01:00
hide: true
---

https://poanchen.github.io/blog/2017/11/12/How-to-create-a-GitHub-pull-request-with-a-specific-commits

https://stackoverflow.com/questions/34027850/how-to-pull-request-a-specific-commit

It is a fork...

Create new branch of origin repo
1. git checkout -b new-branch-name upstream/master

Cherry pick commits
2. git cherry-pick abc1234 -> ID of the commit

Remove unwanted files in commit
3. git rm <path>

Push branch
4. git push -u origin new-branch-name

Commit & Sync
5. ? 

Github: Branches -> New Pull Request
6. ? 