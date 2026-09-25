// Generates each flavor's Firefox theme manifest from palette.json.
// Usage: node scripts/sync-palette.mjs && node scripts/build.mjs
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const VERSION = "0.2";
const root = new URL("../", import.meta.url);
const palette = JSON.parse(readFileSync(new URL("palette.json", root)));

// Firefox surfaces mapped to palette roles (see the palette's porting guide).
const ROLES = {
	// Tab strip and tabs
	frame: "mantle",
	frame_inactive: "crust",
	tab_selected: "base",
	tab_text: "text",
	tab_background_text: "subtext",
	tab_line: "jade",
	tab_loading: "jade",
	// Toolbar and icons
	toolbar: "base",
	toolbar_text: "text",
	toolbar_top_separator: "crust",
	toolbar_bottom_separator: "crust",
	icons: "subtext",
	icons_attention: "jade",
	button_background_hover: "surface1",
	button_background_active: "surface2",
	// Address and search fields
	toolbar_field: "surface0",
	toolbar_field_text: "text",
	toolbar_field_border: "surface1",
	toolbar_field_focus: "surface0",
	toolbar_field_text_focus: "text",
	toolbar_field_border_focus: "jade",
	toolbar_field_highlight: "jade",
	toolbar_field_highlight_text: "base",
	// Menus and dropdowns
	popup: "mantle",
	popup_text: "text",
	popup_border: "surface0",
	popup_highlight: "surface1",
	popup_highlight_text: "text",
	// Sidebar
	sidebar: "mantle",
	sidebar_text: "text",
	sidebar_border: "crust",
	sidebar_highlight: "surface1",
	sidebar_highlight_text: "text",
	// New tab page
	ntp_background: "base",
	ntp_text: "text",
	ntp_card_background: "surface0",
};

const ICONS = ["icon16.png", "icon48.png", "icon128.png"];

for (const [key, flavor] of Object.entries(palette.flavors)) {
	const dir = new URL(`themes/Nephrite ${flavor.name}/`, root);
	mkdirSync(new URL("icons/", dir), { recursive: true });
	// The package only contains its own folder, so each flavor gets its icons.
	for (const icon of ICONS) {
		copyFileSync(new URL(`icons/${icon}`, root), new URL(`icons/${icon}`, dir));
	}

	const colors = Object.fromEntries(
		Object.entries(ROLES).map(([surface, role]) => [surface, flavor.colors[role]]),
	);
	const scheme = flavor.dark ? "dark" : "light";

	const manifest = {
		manifest_version: 3,
		name: `Nephrite ${flavor.name}`,
		version: VERSION,
		description: `A calm, jade-inspired theme for Firefox. ${flavor.name} flavor of the Nephrite palette.`,
		homepage_url: "https://getnephrite.dev",
		icons: { 16: "icons/icon16.png", 48: "icons/icon48.png", 128: "icons/icon128.png" },
		browser_specific_settings: {
			gecko: {
				// A fixed ID keeps updates tied to the same AMO listing.
				id: `nephrite-${key}@getnephrite.dev`,
				data_collection_permissions: { required: ["none"] },
			},
		},
		theme: {
			colors,
			// Menus, about: pages and web content follow the flavor's lightness.
			properties: { color_scheme: scheme, content_color_scheme: scheme },
		},
	};

	writeFileSync(new URL("manifest.json", dir), `${JSON.stringify(manifest, null, 2)}\n`);
	console.log(`${key}: themes/Nephrite ${flavor.name}/manifest.json v${VERSION}`);
}
