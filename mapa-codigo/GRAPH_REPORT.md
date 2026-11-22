# Graph Report - src-coberturas-sociales-landing  (2026-11-22)

## Corpus Check
- 203 files · ~88,625 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 9 file(s) not represented in the graph (top: .css 6, .woff2 2, .ico 1)

## Summary
- 1674 nodes · 4359 edges · 83 communities (53 shown, 30 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- toolbar.js
- color-action.js
- edit-mode-script.js
- cn
- index.server.ts
- theme.js
- panel.js
- lucide-react
- react
- sidebar.tsx
- api.server.ts
- draft.js
- carousel.tsx
- devDependencies
- dependencies
- vite.config.ts
- annotation-markers.js
- style-actions.js
- seo-guias.tsx
- article-page.tsx
- use-toast.ts
- source-writer.js
- vite-plugin-react-inline-editor.js
- package.json
- edit-action.js
- field.tsx
- session-journal-client.ts
- brand.ts
- selectors.js
- item.tsx
- sitemap.xml.ts
- root.tsx
- compilerOptions
- components.json
- selection-mode-metadata.js
- command.tsx
- class-variance-authority
- menubar.tsx
- client.ts
- lead-form.tsx
- html-utils.js
- chart.tsx
- seo-cotizador.tsx
- use-auth.ts
- vite-plugin-edit-mode.js
- drawer.tsx
- empty.tsx
- navigation-menu.tsx
- vite-env.d.ts
- scripts
- sonner.tsx
- credencial-3d.ts
- indexnow.mjs
- tailwindcss-animate
- vite-plugin-globals.d.ts
- eslint.unicode-escapes-formatter.mjs
- @radix-ui/react-aspect-ratio
- @radix-ui/react-collapsible
- pocketbase-auth-client.ts
- clsx
- cmdk
- input-otp
- @radix-ui/react-accordion
- @radix-ui/react-avatar
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-label
- @radix-ui/react-navigation-menu
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-slider
- @radix-ui/react-tabs
- @radix-ui/react-tooltip
- rate-limiter-flexible
- react-dom@^19.2.7
- @react-router/node@^8.3.0
- recharts
- three
- zod@^4.3.6
- iframe-route-restoration-client.ts
- bannerAttrs
- isDev

## God Nodes (most connected - your core abstractions)
1. `cn()` - 272 edges
2. `react` - 66 edges
3. `lucide-react` - 33 edges
4. `initColorAction()` - 32 edges
5. `hideAnnotationPanel()` - 30 edges
6. `handleClick()` - 29 edges
7. `showColorAction()` - 27 edges
8. `initToolbar()` - 27 edges
9. `disableEditMode()` - 26 edges
10. `getEditing()` - 26 edges

## Surprising Connections (you probably didn't know these)
- `positionPanel()` --indirect_call--> `elementZIndex()`  [INFERRED]
  apps/web/plugins/visual-editor/ui/annotation-panel/panel.js → apps/web/plugins/visual-editor/utils/dom-utils.js
- `openOrCreateAnnotation()` --indirect_call--> `captureElementMetadata()`  [INFERRED]
  apps/web/plugins/visual-editor/ui/annotation-panel/panel.js → apps/web/plugins/visual-editor/utils/selection-mode-metadata.js
- `commitCurrentEdit()` --indirect_call--> `onSelectionChange()`  [INFERRED]
  apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js → apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js
- `startInlineEdit()` --indirect_call--> `onSelectionChange()`  [INFERRED]
  apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js → apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js
- `Page()` --calls--> `ArticlePage()`  [EXTRACTED]
  apps/web/src/routes/seo-guias-slug.tsx → apps/web/src/components/articulo/article-page.tsx

## Import Cycles
- 2-file cycle: `apps/web/plugins/visual-editor/ui/annotation-panel/panel.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/annotation-panel/panel.js`
- 2-file cycle: `apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js`
- 2-file cycle: `apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js`
- 2-file cycle: `apps/web/plugins/visual-editor/ui/text-format/color-action/color-action.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/color-action/color-action.js`
- 2-file cycle: `apps/web/plugins/visual-editor/ui/text-format/font-family-action/font-family-action.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/font-family-action/font-family-action.js`
- 2-file cycle: `apps/web/plugins/visual-editor/ui/text-format/size-action/size-action.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/size-action/size-action.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/size-action/size-action.js -> apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/size-action/size-action.js -> apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/color-action/color-action.js -> apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/text-format/color-action/color-action.js -> apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/color-action/color-action.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/font-family-action/font-family-action.js -> apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/link-action/link-action.js -> apps/web/plugins/visual-editor/ui/text-format/dropdown-panel.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/annotation-panel/panel.js -> apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/annotation-panel/panel.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js -> apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js`
- 3-file cycle: `apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/text-format/font-family-action/font-family-action.js -> apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js`
- 4-file cycle: `apps/web/plugins/visual-editor/ui/annotation-panel/panel.js -> apps/web/plugins/visual-editor/ui/inline-edit/edit-action.js -> apps/web/plugins/visual-editor/ui/inline-edit/cursor-styles.js -> apps/web/plugins/visual-editor/ui/text-format/toolbar/toolbar.js -> apps/web/plugins/visual-editor/ui/annotation-panel/panel.js`

## Communities (83 total, 30 thin omitted)

### Community 0 - "toolbar.js"
Cohesion: 0.06
Nodes (102): ANNOTATION_PANEL_ESTIMATED_HEIGHT, ANNOTATION_PANEL_WIDTH, DRAG_SELECT_THRESHOLD, HOVER_OUTLINE_STROKE_WIDTH, MAX_ANNOTATION_ATTACHMENTS, PANEL_GAP, PANEL_MARGIN, PARENT_TOOLBAR_HEIGHT (+94 more)

### Community 1 - "color-action.js"
Cohesion: 0.06
Nodes (96): applyColor(), applyColorAction(), applyGradientFull(), applyLive(), applySolidFull(), canApplyColor(), findGradientWrapper(), findReusableAncestor() (+88 more)

### Community 2 - "edit-mode-script.js"
Cohesion: 0.09
Nodes (70): MAX_SELECTED_ELEMENTS, MIN_SELECTION_CANDIDATE_SIZE, isEditModeEnabled(), isInsideEditorUi(), SELECTION_RECT_Z_INDEX, beginDragSelect(), cancelDragSelect(), cancelImageEdit() (+62 more)

### Community 3 - "cn"
Cohesion: 0.05
Nodes (58): AccordionContent, AccordionItem, AccordionTrigger, Avatar, AvatarFallback, AvatarImage, Breadcrumb, BreadcrumbEllipsis() (+50 more)

### Community 4 - "index.server.ts"
Cohesion: 0.05
Nodes (55): base, cotizadorPage, guiaPages, ALL, BY_PATH, getGuiasHub(), getPageData(), HUBS (+47 more)

### Community 5 - "theme.js"
Cohesion: 0.06
Nodes (51): ASSISTED_EDIT_LABEL, ICON_ALIGN_LEFT, ICON_BOLD, ICON_CHEVRON_DOWN, ICON_CHEVRON_DOWN_SMALL, ICON_CLOSE, ICON_DELETE, ICON_IMAGE (+43 more)

### Community 6 - "panel.js"
Cohesion: 0.11
Nodes (51): _comments, _editorTranslations, getAnnotationClickX(), getAnnotationClickY(), getComments(), getEditingComment(), getPanelMode(), getPendingAttachments() (+43 more)

### Community 7 - "lucide-react"
Cohesion: 0.09
Nodes (33): Aportes(), filas, Recibo(), Comparacion(), criterios, opciones, ContactForm(), Fields (+25 more)

### Community 8 - "react"
Cohesion: 0.07
Nodes (30): Checkbox, HoverCardContent, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput() (+22 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.07
Nodes (36): SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle, sheetVariants (+28 more)

### Community 10 - "api.server.ts"
Cohesion: 0.08
Nodes (36): ApiArgs, apiError(), ApiHandler, BODY_LIMIT_BYTES, json(), readBodyWithinLimit(), readFormData(), readJsonBody() (+28 more)

### Community 11 - "draft.js"
Cohesion: 0.13
Nodes (34): discardAllEdits(), handleDraftDiscard(), handleDraftSave(), applyDraftSnapshot(), buildDraftSnapshot(), notifyDraftStateChanged(), ChildMessage, ParentMessage (+26 more)

### Community 12 - "carousel.tsx"
Cohesion: 0.08
Nodes (34): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle (+26 more)

### Community 13 - "devDependencies"
Cohesion: 0.06
Nodes (34): devDependencies, autoprefixer@^10.4.20, esbuild@^0.28.1, eslint@^9.39.4, eslint-import-resolver-alias@^1.1.2, eslint-plugin-import@^2.32.0, eslint-plugin-react@^7.37.5, eslint-plugin-react-hooks@^5.1.0 (+26 more)

### Community 14 - "dependencies"
Cohesion: 0.06
Nodes (36): dependencies, class-variance-authority@^0.7.1, date-fns@^4.1.0, framer-motion@^11.15.0, gsap@3.13.0, @hookform/resolvers@^5.2.2, ipaddr.js@^1.9.1, lucide-react@^0.469.0 (+28 more)

### Community 15 - "vite.config.ts"
Cohesion: 0.10
Nodes (22): getTemplateBannerAttrs(), AllowedEditorOrigins, CLIENT_PATH, horizonsRuntimePlugin(), PLUGIN_DIR, CLIENT_PATH, formatEntry(), formatTime() (+14 more)

### Community 16 - "annotation-markers.js"
Cohesion: 0.15
Nodes (33): addAnnotationMarker(), addRestoredAnnotationMarker(), captureAnchor(), clampX(), clampY(), createMarkerEntry(), currentRoute(), disambiguateSiblings() (+25 more)

### Community 17 - "style-actions.js"
Cohesion: 0.15
Nodes (33): ancestorDepthWithin(), applyBold(), applyItalic(), applyUnderline(), buildUnderlineWrapStyle(), findCssUnderlineAncestor(), findStyledAncestorWrappingRange(), getActiveRange() (+25 more)

### Community 18 - "seo-guias.tsx"
Cohesion: 0.12
Nodes (26): FIRM_NAME, SHARE_IMAGE_URL, pageMeta(), withBrand(), AMBA, articleSchema(), breadcrumbSchema(), businessSchema() (+18 more)

### Community 19 - "article-page.tsx"
Cohesion: 0.14
Nodes (22): ArticlePage(), HubGroups(), LinkRows(), Props, Blocks(), ContactButtons(), Props, DocHero() (+14 more)

### Community 20 - "use-toast.ts"
Cohesion: 0.13
Nodes (25): Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle, toastVariants (+17 more)

### Community 21 - "source-writer.js"
Cohesion: 0.13
Nodes (22): COMPONENT_BLACKLIST, __dirname, extractCodeBlocks(), __filename, findJSXElementAtPosition(), generateCode(), isBlacklistedComponent(), parseFileToAST() (+14 more)

### Community 22 - "vite-plugin-react-inline-editor.js"
Cohesion: 0.17
Nodes (19): generateSourceWithMap(), isSameOriginRequest(), renderEditedSource(), checkTagNameEditable(), EDITABLE_HTML_TAGS, evalChildComposition(), hasEditableAncestor(), hasMeaningfulTextContent() (+11 more)

### Community 23 - "package.json"
Cohesion: 0.07
Nodes (26): embla-carousel-react@^8.6.0, isbot@^5.2.1, @radix-ui/react-checkbox@^1.3.3, @radix-ui/react-dialog@^1.1.15, @radix-ui/react-popover@^1.1.15, @radix-ui/react-progress@^1.1.8, @radix-ui/react-toast@^1.2.15, react-hook-form@^7.71.2 (+18 more)

### Community 24 - "edit-action.js"
Cohesion: 0.17
Nodes (24): startImageEdit(), clearEditing(), setEditing(), beginEditSession(), recordEdit(), applyEditingCaretColor(), buildStyleDiff(), captureInlineStyles() (+16 more)

### Community 25 - "field.tsx"
Cohesion: 0.10
Nodes (23): Field(), FieldContent(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), FieldLegend(), FieldSeparator() (+15 more)

### Community 26 - "session-journal-client.ts"
Cohesion: 0.15
Nodes (23): CODE_LIKE_ELEMENTS, create(), check(), isInsideCodeLikeElement(), compactText(), describeElement(), fieldLabel(), fieldValue() (+15 more)

### Community 27 - "brand.ts"
Cohesion: 0.12
Nodes (21): react-router@^8.3.0, Enlace, enlaces, ADDRESS, EMAIL, FACEBOOK_URL, HERO_IMAGE_URL, INDEXNOW_KEY (+13 more)

### Community 28 - "selectors.js"
Cohesion: 0.12
Nodes (22): TOOLTIP_VIEWPORT_MARGIN, TYPE_TOOLTIP_CURSOR_OFFSET, ACTIONABLE_SELECTOR, ANNOTATION_UI_SELECTOR, EDIT_TARGET_SELECTOR, EDITOR_UI_SELECTOR, ELEMENT_TYPE_MAP, ELEMENT_TYPE_TRANSLATIONS (+14 more)

### Community 29 - "item.tsx"
Cohesion: 0.12
Nodes (20): @radix-ui/react-slot@^1.2.4, ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Item(), ItemActions(), ItemContent() (+12 more)

### Community 30 - "sitemap.xml.ts"
Cohesion: 0.14
Nodes (18): SITE_URL, sitemapEntries(), LOCAL_HOSTNAMES, publicOrigin(), siteOrigin(), loader(), AI_ANSWER_AGENTS, AI_TRAINING_AGENTS (+10 more)

### Community 31 - "root.tsx"
Cohesion: 0.11
Nodes (7): SiteFooter(), VERIFICATION, HorizonsPreviewScripts(), viteVirtualSrc(), App(), Layout(), RevealObserver()

### Community 32 - "compilerOptions"
Cohesion: 0.10
Nodes (20): compilerOptions, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib, module (+12 more)

### Community 33 - "components.json"
Cohesion: 0.10
Nodes (19): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+11 more)

### Community 34 - "selection-mode-metadata.js"
Cohesion: 0.24
Nodes (17): appendSvgContext(), appendTextContext(), buildCssSelector(), captureElementMetadata(), cloneElementContext(), cloneElementShell(), collectVisibleText(), contextAttributeEntries() (+9 more)

### Community 35 - "command.tsx"
Cohesion: 0.14
Nodes (15): Command, CommandDialog(), CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator (+7 more)

### Community 36 - "class-variance-authority"
Cohesion: 0.16
Nodes (13): Alert, AlertDescription, AlertTitle, alertVariants, Badge(), BadgeProps, badgeVariants, ToggleGroup (+5 more)

### Community 37 - "menubar.tsx"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 38 - "client.ts"
Cohesion: 0.18
Nodes (12): DataRouter, describeRouterError(), firstAppStackFrame(), formatConsoleMessage(), formatRouterError(), getFilePathFromStack(), hasValidationCode(), isValidationFetchWarning() (+4 more)

### Community 39 - "lead-form.tsx"
Cohesion: 0.15
Nodes (14): Fields, options, Props, required, SelectName, ConsultaTipo, Lead, LEADS_PROVIDER (+6 more)

### Community 40 - "html-utils.js"
Cohesion: 0.22
Nodes (10): buildCssSelector(), extractDOMContext(), getComputedStylesForElement(), HTML_TO_JSX_ATTRIBUTE_RENAME_MAP, isAtLineEnd(), nextNodeInFlow(), normalizeContentEditableHtml(), preserveTrailingSpacesInTextNodes() (+2 more)

### Community 41 - "chart.tsx"
Cohesion: 0.27
Nodes (10): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartStyle(), ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 42 - "seo-cotizador.tsx"
Cohesion: 0.31
Nodes (6): Cotizador(), parse(), pesos, loader(), meta(), Page()

### Community 43 - "use-auth.ts"
Cohesion: 0.32
Nodes (3): pocketbase@^0.28.1, pocketbaseClient, pocketbase

### Community 44 - "vite-plugin-edit-mode.js"
Cohesion: 0.25
Nodes (4): EDIT_MODE_STYLES, __dirname, __filename, inlineEditDevPlugin()

### Community 45 - "drawer.tsx"
Cohesion: 0.29
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 46 - "empty.tsx"
Cohesion: 0.29
Nodes (7): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle()

### Community 47 - "navigation-menu.tsx"
Cohesion: 0.32
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 48 - "vite-env.d.ts"
Cohesion: 0.25
Nodes (7): HorizonsBannerAttrs, virtual:horizons-banner, virtual:horizons-edit-mode, virtual:horizons-iframe-route-restoration, virtual:horizons-pocketbase-auth, virtual:horizons-runtime, virtual:session-journal-client

### Community 49 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, lint:warn, start, typecheck

### Community 50 - "sonner.tsx"
Cohesion: 0.33
Nodes (4): next-themes@^0.4.6, sonner@^2.0.7, next-themes, sonner

### Community 51 - "credencial-3d.ts"
Cohesion: 0.33
Nodes (4): Caja, Campo, Entorno, Three

### Community 52 - "indexnow.mjs"
Cohesion: 0.40
Nodes (4): base, key, [origin, ...paths], urlList

## Knowledge Gaps
- **2 isolated node(s):** `bannerAttrs`, `isDev`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 312 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `esbuild` connect `devDependencies` to `vite-plugin-edit-mode.js`, `package.json`?**
  _High betweenness centrality (0.375) - this node is a cross-community bridge._
- **What connects `bannerAttrs`, `isDev` to the rest of the system?**
  _2 weakly-connected nodes found - possible missing edges._
- **Should `toolbar.js` be split into smaller, more focused modules?**
  _Cohesion score 0.05546776232616941 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `cn`, `lucide-react`, `sidebar.tsx`, `carousel.tsx`, `dependencies`, `article-page.tsx`, `use-toast.ts`, `package.json`, `field.tsx`, `brand.ts`, `item.tsx`, `root.tsx`, `command.tsx`, `class-variance-authority`, `menubar.tsx`, `lead-form.tsx`, `chart.tsx`, `seo-cotizador.tsx`, `use-auth.ts`, `drawer.tsx`, `empty.tsx`, `navigation-menu.tsx`?**
  _High betweenness centrality (0.222) - this node is a cross-community bridge._
- **Should `color-action.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06282051282051282 - nodes in this community are weakly interconnected._
- **Why does `react-router` connect `brand.ts` to `index.server.ts`, `lucide-react`, `seo-cotizador.tsx`, `use-auth.ts`, `seo-guias.tsx`, `article-page.tsx`, `package.json`, `root.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `edit-mode-script.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08942161339421613 - nodes in this community are weakly interconnected._