# Move `source/blogs` Posts To `~/projects/blog`

## Scope

Move these two Middleman posts from `utensil.github.io` to the Hugo/PaperMod blog repo:

- `source/blogs/2016-05-20-on-tech-dev-and-doomsday.md`
- `source/blogs/2016-06-09-on-love-in-the-context-of-super-ai.md`

The target repo is `/Users/utensil/projects/blog`.

## Required Behavior

- The new posts must follow the target blog repo's existing post structure, frontmatter style, slug convention, and URL convention.
- Do not make the new Hugo URLs imitate the old Middleman dated URL format.
- Preserve the original titles, publication dates, Markdown body, and external links.
- Keep the old Middleman `/blogs/YYYY/MM/DD/...` URLs valid as redirects to the new Hugo URLs.
- The old URLs must not continue rendering duplicated article content.

## Verification

- Build or serve `/Users/utensil/projects/blog` with the repo's normal Hugo workflow for Markdown posts.
- Confirm both migrated posts render at the target repo's normal post URLs.
- Check titles, dates, representative body excerpts, and the external Numenta links.
- Build `/Users/utensil/projects/utensil.github.io` with Middleman.
- Update any local route/content verification so old `/blogs/...` paths are asserted as redirects, not rendered article pages.
- Confirm each old dated URL redirects to the exact new Hugo post URL.
- Confirm no stale links, duplicate rendered post pages, or broken indexes remain.

## Delivery

Commit the two repositories separately with focused commit messages, and push only after all verification passes.
