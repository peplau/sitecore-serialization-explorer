# Sitecore Serialization Explorer

A Visual Studio Code extension that helps Sitecore developers visualize, inspect, validate, and edit Sitecore Content Serialization (SCS) configuration from inside the IDE.

* [Main Features](#main-features)
* [Installation](#installation)
* [Configuration](#configuration)
* [Authentication](#authentication)
* [Features](#features)
  1. [Sitecore Serialization Explorer](#1-sitecore-serialization-explorer)
  2. [Explain Panel](#2-explain-panel)
  3. [Modules Listing Panel](#3-modules-listing-panel)
  4. [Module Items Listing Panel](#4-module-items-listing-panel)
  5. [Module JSON Editor](#5-module-json-editor)
* [Requirements](#requirements)
* [Full Configuration](#full-configuration)
* [Known Issues](#known-issues)
* [Release Notes](#release-notes)

## Main Features

**1) A live Sitecore Content Tree (via Authoring GraphQL):**

![](assets/20260529_141823_image.png)

**2) Serialization status visualization (direct, indirect, untracked, not serialized):**

| Serialized (colored) | Not Serialized (grayed out) |
| --- | --- | 
| ![](assets/20260529_123850_image.png) | ![](assets/20260529_123910_image.png) |

**3) Integrated `Explain` analysis.**
<img src="assets/20260529_124503_image.png" width="700"/>

**4) Module-level exploration across configured `json` files.**
<img src="assets/20260529_125144_image.png" width="700"/>

**5) In-editor module configuration editing for includes, rules, excluded fields, roles, and users.**
<img src="assets/20260529_125331_image.png" width="700"/>

## Installation

Install the module using one of the options below:

* Search for "Sitecore Serialization Explorer" and install using Visual Studio Code Extensions
  or
* Search for "Sitecore Serialization Explorer" and install using [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
  or
* Download and install from the [GitHub Repository](https://github.com/peplau/sitecore-serialization-explorer)

## Configuration

1. Open your solution folder in Visual Studio Code
2. Create a file for environment variables (Eg:/.env.local) at the root of your folder and add the variables:

| Variable Name | How to obtain it |
| --- | --- |
| SITECORE_EDGE_HOSTNAME | SitecoreAI Deploy > Projects > [Your Project] > [Environment] > Details > Scroll down to "Preview GraphQL IDE" > Launch IDE > Copy the CURL |
| SITECORE_EDGE_CONTEXT_ID | SitecoreAI Deploy > Projects > [Your Project] > [Environment] > Developer settings > Make sure Context has "Preview" as selected > Copy the SITECORE_EDGE_CONTEXT_ID variable from here |

> It is recommended that you point to the "Preview" version of your "Development" Environment for serialization

3. Restart Visual Studio Code (CTRL+R)

## Authentication

This extension uses the same session used by the Sitecore CLI Serialization, reading its configurations from the .sitecore/user. The authentication is typically made by opening the root of your repository in a terminal window and typing:

```
dotnet sitecore cloud login --allow-write true
```

After that, click on the Refresh button at the Sitecore Serialization Explorer window, at the left column of VSCode's Explorer tab:

![](assets/20260529_121406_image.png)

## Features

### 1) Sitecore Serialization Explorer

Adds a custom view in File Explorer: **Sitecore Serialization Explorer**.

![](assets/20260531_194122_image.png)

- Items are listed in a content tree in the same way as in Sitecore's Content Editor
- Refresh reloads the tree from scratch
- Items can be quickly searched by **Path** or **ID** - Reveals the item in the tree and opens the Explain Panel for it
- A list of serialization modules is easily available from here

At the bottom of Visual Studio Code there are two aditional filters:

![](assets/20260531_201047_image.png)

**Database Filtering** - Refreshes tree state for the selected database.

![](assets/20260531_200559_image.png)

**Module Filtering** - Content is filtered to the selected module scope.

![](assets/20260531_200903_image.png)

### 2) Explain Panel

Command: **Show Details** (also opens when clicking tree nodes)

![](assets/20260529_124503_image.png)

For each item, the panel shows:

- Item path.
- Effective serialized/not-serialized status.
- Module match and module description.
  - Click "EDIT" opens the module in Edition Mode
  - Click "VIEW ITEMS" shows a list of items serialized by this module
- Human-readable explain reasons parsed from CLI output.
- YAML physical file (when available).

### 3) Modules Listing Panel

Command: **Show all modules**

- Shows all active modules resolved from `sitecore.json` module globs.
- Displays module namespace, description, references, and resolved JSON path.
- Includes actions to open JSON, edit module, and view module items.

![](assets/20260529_125144_image.png)

* Click "EDIT" opens the module in Edition Mode
* Click "VIEW ITEMS" shows a list of items serialized by this module

### 4) Module Items Listing Panel

From Explain or Modules panel, **View Items** opens a module items breakdown:

![](assets/20260531_203955_image.png)

- Groups results by:
  - Master database items
  - Core database items
  - Roles
  - Users
- For each row, shows path/value, status (direct/indirect), include/rule source, and YAML path.
- Supports:
  - Open YAML
  - Copy item path
  - Copy item ID

### 5) Module JSON Editor

From Explain/Modules panel, **Edit** opens a rich module editor with save support.

![](assets/20260529_125331_image.png)

Editable areas:

- Module namespace and description
- References
- Includes
- Include rules
- Excluded fields
- Role predicates
- User predicates

Editor capabilities:

- Add/remove includes and rules.
- Add/remove excluded fields, role predicates, user predicates.
- Expand/collapse all includes.
- Drag-and-drop reorder includes.
- Jump navigation to Module / Includes / Excluded Fields / Roles / Users sections.
- Reveal a specific include or rule when opened from Explain actions.

Each include has 3 tabs:

1. "Overview" tab shows quick information about the include

![](assets/20260531_212047_image.png)

2. "Edit" tab offers the edition form

![](assets/20260531_212213_image.png)

3. "Content Tree" tree shows the items affected by the include (serialized or not) in a Content Tree format

![](assets/20260531_212409_image.png)

## Requirements

The extension assumes a Sitecore development workspace with serialization assets.

### Required

- Visual Studio Code
- .NET SDK and Sitecore CLI (`dotnet sitecore`).
- A valid Sitecore solution/workspace containing serialization configuration and YAML items.

### Recommended workspace files

- One or more `sitecore.json` files with `modules` globs.
- Resolved module JSON files (`*.module.json`, `*.json`, etc.) containing `items.includes`.
- Serialized YAML trees under each module root in `items/`.

## Full Configuration

All options can be set either as a **VS Code setting** (via `settings.json` or the Settings UI) or as a **`.env.local` variable** in the workspace root. VS Code settings take precedence over `.env.local` variables when both are present.

| VS Code Setting | `.env.local` Variable | Default | Description |
|---|---|---|---|
| `sitecoreSerializationExplorer.authoringGraphqlUrl` | `SITECORE_EDGE_HOSTNAME` | — | Authoring GraphQL endpoint. The VS Code setting accepts a full URL; the env var accepts a hostname or full URL (the API path is appended automatically). The VS Code setting takes precedence. |
| `sitecoreSerializationExplorer.edgeContextId` | `SITECORE_EDGE_CONTEXT_ID` | — | Sitecore Edge context ID sent as the `SC-Edge-Context-Id` request header. |
| `sitecoreSerializationExplorer.endpoint` | `ENDPOINT` | `xmCloud` | Endpoint key inside `.sitecore/user.json → endpoints` from which the `accessToken` is read (for example, `dev` if your CLI login stored the token under a `dev` key). |
| `sitecoreSerializationExplorer.defaultLanguage` | `LANGUAGE` | `en` | Default Sitecore language for GraphQL requests. |
| `sitecoreSerializationExplorer.defaultDatabase` | `DATABASE` | `master` | Default Sitecore database for tree queries. |
| `sitecoreSerializationExplorer.debug` | `DEBUG` | `false` | Set to `true` to enable the performance diagnostics output channel: **Sitecore Serialization Performance**. |

## Known Issues

- If `dotnet sitecore ser explain` is unavailable or slow, some status reconciliation may be delayed or remain unresolved.
- GraphQL errors (missing endpoint, invalid token, insufficient permissions, unavailable authoring host) prevent live tree loading.

## Release Notes

### 1.0.4

- When attempting to close a Module Edit window with unsaved data, the system now shows a modal and permits the user to save before closing
- Any delete button will show a confirmation modal

### 1.0.3

- New modules can now be added via UI at the Modules List
- When a new module is created, either via UI or downloaded from source control, all lists that depends on modules are updated automatically (Modules Listing Page, Modules Dropdown)

### 1.0.2

Fine tuned the README documentation

### 1.0.1

Added an icon to our extension

### 1.0.0

Initial public version of Sitecore Serialization Explorer with:

- Explorer tree integration and serialization status indicators.
- Path/GUID search and reveal.
- Database and module filtering.
- Explain panel with YAML/module navigation.
- Modules listing and module items breakdown.
- In-editor module JSON editing experience.
- Optional performance tracing output.



