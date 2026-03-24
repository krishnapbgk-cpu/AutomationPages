/**
 * Application Profiles
 *
 * Each profile defines navigation selectors, wait strategies, locator
 * preferences, and element-discovery hints tuned for that app type.
 * The Playwright agent reads the active profile and adjusts every
 * aspect of its behaviour accordingly.
 *
 * Profiles:
 *   spa-angular  — Angular + PrimeNG / Angular Material
 *   spa-react    — React + MUI / Ant Design / Chakra
 *   spa-vue      — Vue 3 + Vuetify / Element-Plus
 *   web          — Server-rendered (Django, Rails, .NET Razor, JSP)
 *   hybrid       — Mix of SSR and client-side (Next.js, Nuxt, Remix)
 *   electron     — Electron desktop shell
 */

const PROFILES = {

  // ─── Angular SPA (default for enterprise Angular + PrimeNG) ───────────────
  'spa-angular': {
    name: 'Angular SPA',
    waitStrategy: 'networkidle',        // Angular Zone.js settles network
    extraWaitMs:  1500,                 // Zone.js change detection cycle
    routerAttr:   '[routerLink],[ng-reflect-router-link],[routerlink]',

    navSelectors: [
      // PrimeNG (most common in enterprise Angular)
      '.p-menuitem-link', 'p-menuitem > a', '.p-panelmenu-header-link',
      '.p-tieredmenu .p-menuitem-link', '.p-submenu-list .p-menuitem-link',
      'p-tabmenu .p-tabmenuitem a', '.p-sidebar .p-menuitem-link',
      '.p-tree .p-treenode-content', '.p-panelmenu-content a',
      // Angular Material
      'mat-nav-list a', '[mat-list-item]', 'mat-list-item',
      'mat-tab-link', '.mat-tab-label', 'mat-toolbar a',
      // Angular Router direct attributes
      '[routerLink]:not([disabled])', '[ng-reflect-router-link]', '[routerlink]',
      // Bootstrap / custom
      'nav a', '[class*="sidebar"] a', '[class*="menu"] a', '[class*="nav"] a',
      '.nav-link', '[role="menuitem"]', '[role="tab"]',
    ],

    expandSelectors: [
      '.p-panelmenu-header:not(.p-highlight)',
      '.p-accordion-header:not(.p-highlight)',
      '[aria-expanded="false"]:not(input):not(select)',
      '.mat-expansion-panel-header:not(.mat-expanded)',
      '[class*="collapse-toggle"]', '[class*="expand"]',
    ],

    // Extra DOM attributes Angular apps commonly put on elements
    domRouteAttrs: ['routerLink', 'ng-reflect-router-link', 'routerlink', 'data-routerlink'],

    // Preferred locator strategy for Angular apps
    locatorPreference: ['data-testid', 'id', 'aria-label', 'ng-reflect-name', 'placeholder', 'text', 'xpath'],

    // Extra element selectors Angular-specific
    extraElementSelectors: [
      'mat-button', 'mat-raised-button', 'button[mat-button]', 'button[mat-raised-button]',
      'mat-select', 'mat-checkbox', 'mat-radio-button',
      'p-button', 'p-dropdown', 'p-inputtext', 'p-checkbox', 'p-radiobutton', 'p-calendar',
      'p-multiselect', 'p-autocomplete', 'p-datatable',
    ],
  },

  // ─── React SPA ────────────────────────────────────────────────────────────
  'spa-react': {
    name: 'React SPA',
    waitStrategy: 'domcontentloaded',   // React renders fast
    extraWaitMs:  800,

    navSelectors: [
      // React Router Link components render as <a>
      'nav a', 'nav [role="menuitem"]', 'nav li a',
      '[class*="sidebar"] a', '[class*="drawer"] a',
      '[class*="menu"] a', '[class*="nav"] a',
      // MUI
      '.MuiListItem-root a', '.MuiListItemButton-root', '.MuiTab-root',
      '.MuiBottomNavigationAction-root', '.MuiButtonBase-root[href]',
      // Ant Design
      '.ant-menu-item a', '.ant-menu-submenu-title', '.ant-tabs-tab',
      // Chakra / general
      '[role="tab"]', '[role="menuitem"]', '[role="navigation"] a', '.nav-link',
      '[data-testid*="nav"]', '[data-testid*="menu"]', '[data-testid*="link"]',
    ],

    expandSelectors: [
      '[aria-expanded="false"]:not(input):not(select)',
      '.ant-collapse-header', '.MuiAccordionSummary-root:not(.Mui-expanded)',
      '[class*="collapse"]:not([class*="in"])',
    ],

    domRouteAttrs: ['data-href', 'data-path', 'data-route', 'to'], // React Router 'to' prop

    locatorPreference: ['data-testid', 'id', 'aria-label', 'placeholder', 'text', 'class', 'xpath'],

    extraElementSelectors: [
      '.MuiButton-root', '.MuiTextField-root input', '.MuiSelect-root',
      '.MuiCheckbox-root', '.MuiSwitch-root',
      '.ant-btn', '.ant-input', '.ant-select', '.ant-checkbox',
    ],
  },

  // ─── Vue SPA ──────────────────────────────────────────────────────────────
  'spa-vue': {
    name: 'Vue SPA',
    waitStrategy: 'domcontentloaded',
    extraWaitMs:  700,

    navSelectors: [
      // Vue Router renders as <a>
      'nav a', '[class*="sidebar"] a', '[class*="menu"] a',
      // Vuetify
      '.v-list-item', '.v-list-item__title', '.v-tab', '.v-navigation-drawer a',
      '.v-app-bar a', '.v-btn[to]',
      // Element Plus
      '.el-menu-item', '.el-submenu__title', '.el-tabs__item',
      // Generic
      '[role="tab"]', '[role="menuitem"]', '.nav-link', '[class*="nav"] a',
    ],

    expandSelectors: [
      '[aria-expanded="false"]:not(input):not(select)',
      '.el-submenu:not(.is-opened) .el-submenu__title',
      '.v-expansion-panel-header:not(.v-expansion-panel-header--active)',
    ],

    domRouteAttrs: ['to', 'data-path', 'data-route'],

    locatorPreference: ['data-testid', 'id', 'aria-label', 'placeholder', 'text', 'xpath'],

    extraElementSelectors: [
      '.v-btn', '.v-text-field input', '.v-select', '.v-checkbox',
      '.el-button', '.el-input__inner', '.el-select',
    ],
  },

  // ─── Traditional / Server-rendered Web ───────────────────────────────────
  'web': {
    name: 'Web (Server-rendered)',
    waitStrategy: 'load',               // full page load
    extraWaitMs:  500,

    navSelectors: [
      'nav a', '.navbar-nav a', '.nav-link', '.nav-item a',
      '[class*="sidebar"] a', '[class*="menu"] a',
      'header a', '.breadcrumb a', '[role="navigation"] a',
      '[role="menuitem"]', '[role="tab"]',
    ],

    expandSelectors: [
      '[aria-expanded="false"]:not(input):not(select)',
      '.accordion-button.collapsed',
      '[data-bs-toggle="collapse"]',
    ],

    domRouteAttrs: [],  // plain hrefs only

    locatorPreference: ['id', 'name', 'data-testid', 'aria-label', 'placeholder', 'text', 'xpath'],

    extraElementSelectors: [],
  },

  // ─── Hybrid (Next.js / Nuxt / Remix / SvelteKit) ─────────────────────────
  'hybrid': {
    name: 'Hybrid (SSR + SPA)',
    waitStrategy: 'networkidle',
    extraWaitMs:  1000,

    navSelectors: [
      'nav a', '[class*="sidebar"] a', '[class*="menu"] a',
      '.nav-link', '[role="menuitem"]', '[role="tab"]', '[role="navigation"] a',
      '[data-testid*="nav"]', '[data-testid*="menu"]',
      // Next.js Link renders as <a>
      'a[href^="/"]',
    ],

    expandSelectors: [
      '[aria-expanded="false"]:not(input):not(select)',
      '.accordion-button.collapsed',
    ],

    domRouteAttrs: ['data-href', 'data-path'],

    locatorPreference: ['data-testid', 'id', 'aria-label', 'placeholder', 'text', 'xpath'],

    extraElementSelectors: [],
  },

  // ─── Electron ─────────────────────────────────────────────────────────────
  'electron': {
    name: 'Electron Desktop',
    waitStrategy: 'domcontentloaded',
    extraWaitMs:  1200,

    navSelectors: [
      'nav a', '[class*="sidebar"] a', '[class*="menu"] a',
      '[role="tab"]', '[role="menuitem"]', '[role="treeitem"]',
      '[class*="nav"] a', '[class*="toolbar"] button',
    ],

    expandSelectors: [
      '[aria-expanded="false"]:not(input):not(select)',
      '[class*="tree-item"]:not([class*="expanded"])',
    ],

    domRouteAttrs: [],

    locatorPreference: ['data-testid', 'id', 'aria-label', 'text', 'class', 'xpath'],

    extraElementSelectors: [
      '[class*="tab"]', '[class*="panel"]', '[class*="toolbar"] button',
    ],
  },
};

/**
 * Resolve an appType string from the config to a profile object.
 * Falls back to 'spa-angular' if unrecognised (most common enterprise stack).
 */
function getProfile(appType = 'spa') {
  // Direct key match
  if (PROFILES[appType]) return { key: appType, ...PROFILES[appType] };

  // Normalise legacy / simplified values
  const map = {
    spa:      'spa-angular',
    angular:  'spa-angular',
    react:    'spa-react',
    vue:      'spa-vue',
    web:      'web',
    hybrid:   'hybrid',
    electron: 'electron',
  };
  const key = map[appType?.toLowerCase()] || 'spa-angular';
  return { key, ...PROFILES[key] };
}

module.exports = { getProfile, PROFILES };
