# 📘 Documentation et Comparatif du Registre Space-UI

> Ce document constitue le **README de référence** pour l'analyse et la comparaison de tous les composants présents dans le registre. Il vise à guider la future unification du système en identifiant les meilleures implémentations parmi de multiples origines.

## 📁 Structure du Registre

- **`primitives/`** : Composants de très bas niveau (les fondations de l'UI).
- **`demo/components/`** : Blocs, démos et composants interactifs complexes, souvent composés de primitives.

Les origines principales en compétition sont : `base`, `coss`, `animate`, `reui`, `fab-ui`, `community`, etc.

## 🧱 1. Comparaison des PRIMITIVES

Voici l'analyse exhaustive des fondations (boutons de base, inputs, etc.) :

| Composant             | Origines Disponibles (Variantes) | 🏆 Choix Recommandé                 | 📝 Justification du Classement                             |
| --------------------- | -------------------------------- | ----------------------------------- | ---------------------------------------------------------- |
| **ACCORDION**         | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **ALERT-DIALOG**      | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **AUTO-HEIGHT**       | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **AVATAR-GROUP**      | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **BLUR**              | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **BUTTON**            | **buttons** (1)                  | **buttons**                         | Spécialiste absolu de ce composant spécifique.             |
| **CHECKBOX**          | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **CLICK**             | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **CODE-BLOCK**        | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **COLLAPSIBLE**       | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **COUNTING-NUMBER**   | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **CURSOR**            | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **DIALOG**            | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **EFFECT**            | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **FADE**              | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **FILES**             | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **FLIP**              | **buttons** (1)                  | **buttons**                         | Spécialiste absolu de ce composant spécifique.             |
| **GITHUB-STARS**      | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **GRADIENT**          | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **HIGHLIGHT**         | **effects** (1), **texts** (1)   | **effects**<br>_Alternative: texts_ | La version la plus complète disponible ici.                |
| **IMAGE-ZOOM**        | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **LIQUID**            | **buttons** (1)                  | **buttons**                         | Spécialiste absolu de ce composant spécifique.             |
| **MAGNETIC**          | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **MENU**              | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **MORPHING**          | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **MOTION-GRID**       | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **PARTICLES**         | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **PINNED-LIST**       | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **POPOVER**           | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **PREVIEW-CARD**      | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **PREVIEW-LINK-CARD** | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **PROGRESS**          | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **RADIO**             | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **RIPPLE**            | **buttons** (1)                  | **buttons**                         | Spécialiste absolu de ce composant spécifique.             |
| **ROLLING**           | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **ROTATING**          | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **SCROLL-PROGRESS**   | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **SCROLLING-NUMBER**  | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **SHIMMERING**        | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **SHINE**             | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **SLIDE**             | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **SLIDING-NUMBER**    | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **SLOT**              | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **SPLITTING**         | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **SPRING**            | **animate** (1)                  | **animate**                         | Meilleures micro-interactions et fluidité (Framer Motion). |
| **SWITCH**            | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **TABS**              | **animate** (1), **base** (1)    | **animate**<br>_Alternative: base_  | Meilleures micro-interactions et fluidité (Framer Motion). |
| **THEME-TOGGLER**     | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **TILT**              | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |
| **TOGGLE**            | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **TOGGLE-GROUP**      | **base** (1)                     | **base**                            | Fondation propre et accessible, mais basique.              |
| **TOOLTIP**           | **animate** (1), **base** (1)    | **animate**<br>_Alternative: base_  | Meilleures micro-interactions et fluidité (Framer Motion). |
| **TYPING**            | **texts** (1)                    | **texts**                           | La version la plus complète disponible ici.                |
| **ZOOM**              | **effects** (1)                  | **effects**                         | La version la plus complète disponible ici.                |

## 🎨 2. Comparaison des DEMOS & BLOCS AVANCÉS

Voici l'analyse exhaustive des composants interactifs (carrousels, accordéons, blocs complexes) :

| Composant                           | Origines Disponibles (Variantes)                           | 🏆 Choix Recommandé             | 📝 Justification du Classement                             |
| ----------------------------------- | ---------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| **ACCORDION**                       | **reui** (11), **coss** (4), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **ALERT**                           | **reui** (20), **coss** (7)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **ALERT-DIALOG**                    | **reui** (14), **coss** (2), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **ASPECT-RATIO**                    | **reui** (8)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **AUTOCOMPLETE**                    | **coss** (16), **reui** (12)                               | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **AVATAR**                          | **reui** (35), **coss** (14)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **AVATAR-GROUP**                    | **animate** (1)                                            | **animate**                     | Meilleures micro-interactions et fluidité (Framer Motion). |
| **BADGE**                           | **reui** (25), **coss** (20)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **BREADCRUMB**                      | **reui** (15), **coss** (7)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **BUBBLE**                          | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **BUTTON**                          | **reui** (61), **coss** (40), **buttons** (1)              | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **BUTTON-GROUP**                    | **reui** (57)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **CALENDAR**                        | **reui** (30), **coss** (25)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **CARD**                            | **reui** (18), **coss** (11)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **CAROUSEL**                        | **reui** (11)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **CHART**                           | **reui** (25)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **CHECKBOX**                        | **reui** (22), **coss** (5), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **CHECKBOX-GROUP**                  | **coss** (5)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **CODE**                            | **animate** (1)                                            | **animate**                     | Meilleures micro-interactions et fluidité (Framer Motion). |
| **CODE-TABS**                       | **animate** (1)                                            | **animate**                     | Meilleures micro-interactions et fluidité (Framer Motion). |
| **COLLAPSIBLE**                     | **reui** (10), **coss** (1)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **COMBOBOX**                        | **reui** (28), **coss** (20)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **COMMAND**                         | **reui** (8), **coss** (2)                                 | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **CONTEXT-MENU**                    | **coss** (8), **reui** (10)                                | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **COPY**                            | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **CURSOR**                          | **animate** (1)                                            | **animate**                     | Meilleures micro-interactions et fluidité (Framer Motion). |
| **DATA-GRID**                       | **reui** (29)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **DATE-PICKER**                     | **coss** (9)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **DATE-SELECTOR**                   | **reui** (4)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **DIALOG**                          | **coss** (6), **reui** (10), **base** (1)                  | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **DRAWER**                          | **coss** (14), **reui** (5)                                | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **DROPDOWN-MENU**                   | **reui** (18)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **EMPTY**                           | **reui** (20), **coss** (1)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **EVENT-CALENDAR**                  | **reui** (5)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **FIELD**                           | **coss** (18), **reui** (11)                               | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **FIELDSET**                        | **coss** (1)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **FILE-UPLOAD**                     | **reui** (10)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **FILES**                           | **base** (1)                                               | **base**                        | Fondation propre et accessible, mais basique.              |
| **FILTERS**                         | **reui** (12)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **FIREWORKS**                       | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **FIREWORKS-CIRCLE**                | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **FLIP**                            | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **FLIP-CARD**                       | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **FORM**                            | **coss** (2)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **FRAME**                           | **reui** (19), **coss** (4)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **GANTT**                           | **reui** (5)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **GITHUB-STARS**                    | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **GITHUB-STARS-WHEEL**              | **animate** (1)                                            | **animate**                     | Meilleures micro-interactions et fluidité (Framer Motion). |
| **GRADIENT**                        | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **GRAVITY-STARS**                   | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **GROUP**                           | **coss** (22)                                              | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **HEXAGON**                         | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **HOLE**                            | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **HOVER-CARD**                      | **reui** (8)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **ICON**                            | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **ICON-STACK**                      | **reui** (6)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **ICON-TILE**                       | **reui** (17)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **INPUT**                           | **reui** (31), **coss** (19)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **INPUT-GROUP**                     | **reui** (40), **coss** (28)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **INPUT-OTP**                       | **reui** (6)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **ITEM**                            | **reui** (12)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **KANBAN**                          | **reui** (6)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **KBD**                             | **reui** (6), **coss** (1)                                 | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **LABEL**                           | **reui** (13)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **LIQUID**                          | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **LIQUID-METAL-AVATAR-CUSTOM**      | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-AVATAR-DEFAULT**     | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-AVATAR-FALLBACK**    | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-AVATAR-SIZES**       | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-BUTTON-CUSTOM**      | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-BUTTON-DEFAULT**     | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-BUTTON-SIZES**       | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-CARD-CUSTOM**        | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-CARD-DEFAULT**       | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-CARD-LOGIN**         | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **LIQUID-METAL-CARD-PLAYER**        | **fab-ui** (1)                                             | **fab-ui**                      | La version la plus complète disponible ici.                |
| **MANAGEMENT-BAR**                  | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **MENU**                            | **coss** (9), **base** (1)                                 | **coss**<br>_Alternative: base_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **MENU-CHECKBOX**                   | **base** (1)                                               | **base**                        | Fondation propre et accessible, mais basique.              |
| **MENU-RADIO**                      | **base** (1)                                               | **base**                        | Fondation propre et accessible, mais basique.              |
| **MENUBAR**                         | **reui** (5)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **METER**                           | **coss** (4)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **MOTION-CAROUSEL**                 | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **NATIVE-SELECT**                   | **reui** (6)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **NAVIGATION-MENU**                 | **reui** (4)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **NOTIFICATION-LIST**               | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **NUMBER-FIELD**                    | **coss** (11), **reui** (6)                                | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **OTP-FIELD**                       | **coss** (9)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **PAGINATION**                      | **reui** (15), **coss** (3)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **PHONE-INPUT**                     | **reui** (8)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **PIN-LIST**                        | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **PLAYFUL-TODOLIST**                | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **POPOVER**                         | **reui** (11), **coss** (4), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **PREVIEW-CARD**                    | **coss** (1), **base** (1)                                 | **coss**<br>_Alternative: base_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **PREVIEW-LINK-CARD**               | **base** (1)                                               | **base**                        | Fondation propre et accessible, mais basique.              |
| **PROGRESS**                        | **reui** (8), **coss** (3), **base** (1)                   | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **RADIAL-INTRO**                    | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **RADIAL-MENU**                     | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **RADIAL-NAV**                      | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **RADIO**                           | **base** (1)                                               | **base**                        | Fondation propre et accessible, mais basique.              |
| **RADIO-GROUP**                     | **reui** (17), **coss** (6)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **RATING**                          | **reui** (9)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **RESIZABLE**                       | **reui** (10)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **RIPPLE**                          | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **SCROLL-AREA**                     | **coss** (5), **reui** (5)                                 | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **SCROLLSPY**                       | **reui** (2)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **SELECT**                          | **reui** (33), **coss** (23)                               | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **SEPARATOR**                       | **reui** (6), **coss** (1)                                 | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **SHARE-BUTTON**                    | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |
| **SHEET**                           | **coss** (3), **reui** (4)                                 | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **SKELETON**                        | **reui** (10), **coss** (2)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **SLIDER**                          | **coss** (23), **reui** (12)                               | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **SONNER**                          | **reui** (21)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **SORTABLE**                        | **reui** (8)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **SPINNER**                         | **reui** (12), **coss** (1)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **STARS**                           | **backgrounds** (1)                                        | **backgrounds**                 | La version la plus complète disponible ici.                |
| **STEPPER**                         | **reui** (15)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **SWITCH**                          | **reui** (14), **coss** (9), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **TABLE**                           | **reui** (17), **coss** (8)                                | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **TABS**                            | **coss** (13), **reui** (9), **animate** (1), **base** (1) | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **TEXTAREA**                        | **coss** (15), **reui** (6)                                | **coss**<br>_Alternative: reui_ | Richesse massive de variantes. Domine l'utilitaire.        |
| **THEME-TOGGLER**                   | **buttons** (1)                                            | **buttons**                     | Spécialiste absolu de ce composant spécifique.             |
| **TIMELINE**                        | **reui** (12)                                              | **reui**                        | Approche très robuste et structurée.                       |
| **TOAST**                           | **coss** (13)                                              | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **TOGGLE**                          | **reui** (14), **coss** (8), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **TOGGLE-GROUP**                    | **reui** (16), **coss** (9), **base** (1)                  | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **TOOLBAR**                         | **coss** (1)                                               | **coss**                        | Richesse massive de variantes. Domine l'utilitaire.        |
| **TOOLTIP**                         | **reui** (16), **coss** (4), **animate** (1), **base** (1) | **reui**<br>_Alternative: coss_ | Approche très robuste et structurée.                       |
| **TREE**                            | **reui** (7)                                               | **reui**                        | Approche très robuste et structurée.                       |
| **USER-PRESENCE-AVATAR**            | **community** (1)                                          | **community**                   | La version la plus complète disponible ici.                |

## 🛠️ Recommandations de Fusion (Next Steps)

1. **Conserver `coss`** pour tout ce qui touche à la **donnée et l'utilitaire** (Select, Table, Formulaires). Sa richesse en variantes (parfois plus de 30 pour un seul composant) est inégalée.
2. **Conserver `animate`** pour tout ce qui touche au **visuel et à l'interaction** (Hero, Tabs animés, Boutons magnétiques).
3. **Nettoyer `base`** qui sert souvent de doublon inutile une fois les meilleures versions adoptées.
