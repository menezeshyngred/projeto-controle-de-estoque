---
name: Preview port discovery
description: Why editing port mappings alone may not fix a multi-server preview
---

Do not rely on editing port mappings alone when a launcher exposes both an
internal API and a frontend. Workflow startup can regenerate the mappings based
on detected listeners.

**Why:** During imported-project setup, the backend opened first and repeatedly
received the primary public mapping even after a validated configuration edit.
The frontend screenshot worked locally while the public root returned API JSON.

**How to apply:** Keep internal services on loopback when the frontend proxies
their requests. Verify the public development root returns the frontend as well
as checking the local screenshot; these checks cover different routing paths.
