# Working on Boilerplate Repo

## Upgrading Mobile Pkgs

1. Upgrade expo `npx expo install expo@latest`
2. Fix deps based on expo SDK respecting semver `npx expo install --fix`
3. Spin up app and check it still works
4. Make a commit
5. Upgrading 3rd party deps `npx npm-check-updates -u`
6. If you hit conflicts (often happens). Do a `git reset --hard` and do piecemeal approach using `npx npm-check-updates -i`
7. Spin up app and check it still works
8. Make a commit
