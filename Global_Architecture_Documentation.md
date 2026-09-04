# Architecture Globale du Projet

Ce document détaille les décisions retenues concernant l'architecture de navigation et la structure des dossiers pour le projet Space UI.

---

## 1. Arborescence de Navigation (Le Site Web)

```text
Menu Principal (Top Nav)
│
├── Docs
│   ├── Getting Started
│   │   ├── Introduction
│   │   └── Installation
│   ├── Ecosystem
│   │   ├── Changelog
│   │   └── Roadmap
│   └── AI & Automation
│       ├── Agents
│       └── MCP (Model Context Protocol)
│
├── UI Kit
│   ├── Primitives (Les atomes)
│   │   ├── Button
│   │   ├── Input
│   │   ├── Tabs
│   │   └── Accordion
│   ├── Components (Les molécules & effets)
│   │   ├── Liquid Metal Card
│   │   ├── Date Range Picker
│   │   └── Mesh Background
│   ├── Blocks (Les sections de page)
│   │   ├── Authentication
│   │   ├── Hero Sections
│   │   └── Pricing
│   └── Templates (Les vues complètes)
│       ├── Dashboard
│       └── E-commerce
│
└── Resources
    ├── Avatars
    ├── Country Flags
    └── Icons
```

---

## 2. Arborescence des Dossiers (Le Code Source)

Voici comment cela se traduit physiquement dans le dossier `apps/www/` pour être parfaitement aligné avec la navigation.

```text
apps/www/
│
├── app/
│   ├── docs/                  # Routes pour le pôle "Docs" (fichiers MDX)
│   │   ├── introduction.mdx
│   │   ├── installation.mdx
│   │   ├── agents.mdx
│   │   └── mcp.mdx
│   │
│   ├── ui-kit/                # Routes pour le pôle "UI Kit"
│   │   ├── primitives/        # Pages de preview des primitives
│   │   ├── components/        # Pages de preview des composants complexes
│   │   ├── blocks/            # Pages de preview des blocs
│   │   └── templates/         # Pages de preview des templates
│   │
│   └── resources/             # Routes pour le pôle "Resources"
│       ├── avatars/
│       ├── flags/
│       └── icons/
│
├── registry/                  # Registre central (source de vérité)
│   ├── primitives/            # Code source des primitives (le dossier "space")
│   ├── components/            # Code source des composants complexes
│   ├── blocks/                # Code source des blocs
│   ├── templates/             # Code source des templates
│   └── resources/             # Code source des ressources (JSON, SVG bruts...)
│
└── config/                    # Configuration des menus
    ├── docs-config.ts         # Contient le menu de la sidebar "Docs"
    ├── ui-kit-config.ts       # Contient le menu de la sidebar "UI Kit"
    └── resources-config.ts    # Contient le menu de la sidebar "Resources"
```
