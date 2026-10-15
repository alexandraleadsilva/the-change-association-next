@AGENTS.md

# Change tracking (always follow)

Every change to this site must be tracked, the same way as the existing history:

1. Make one focused commit per change, authored as Alexandra (alexandraleaddsilva@gmail.com, the existing git config). Never rewrite, squash or force-push history.
2. Commit message: a short imperative summary line (e.g. "Add certification verification system"), then a blank line and a bullet list of what changed when the change touches more than one thing, then the Co-Authored-By line.
3. Show Alexandra the change locally (`npm run dev`) before it goes live. Only push and deploy once she approves.
4. Deploy with `git push` then `vercel --prod` (add `--force` if the build cache causes problems). Vercel is not auto-deploying from GitHub, so pushing alone does not update the live site.
5. When a change adds or alters a page, tool, account, database table, environment variable or convention, update PROJECT-HANDOFF.md in the same commit and bump its "Last updated" date.
6. Follow the content conventions in PROJECT-HANDOFF.md ("Key Conventions & User Preferences").
