#!/usr/bin/env node

import { Command } from "commander";
import { spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

const program = new Command();

program
    .name("native-blocks")
    .description("Mobile-first React Native component and block registry")
    .version("0.1.0");

program
    .command("init")
    .description("Initialize Native Blocks in your project")
    .action(() => {
        console.log("Initializing Native Blocks...");
        spawnSync("npx", ["@react-native-reusables/cli@latest", "init"], {
            stdio: "inherit",
            shell: true,
        });

        const cwd = process.cwd();

        const globalCssPaths = [path.join(cwd, "global.css"), path.join(cwd, "app", "global.css")];
        for (const cssPath of globalCssPaths) {
            if (fs.existsSync(cssPath)) {
                let content = fs.readFileSync(cssPath, "utf8");
                content = content.replace(/--radius:\s*[^;]+;/g, "--radius: 1.25rem;");
                
                if (!content.includes("--border-width:")) {
                    content = content.replace(
                        /(:root|.dark:root)\s*{([^}]*)}/gs,
                        (match, p1, p2) => `${p1} {${p2}    --border-width: 0.5px;\n    --shadow-color-sm: rgba(0, 0, 0, 0);\n    --shadow-color-md: rgba(0, 0, 0, 0);\n    --shadow-color-lg: rgba(0, 0, 0, 0);\n    --shadow-color-xl: rgba(0, 0, 0, 0);\n    --shadow-color-2xl: rgba(0, 0, 0, 0);\n    --shadow-xs: none;\n    --shadow-sm: none;\n    --shadow: none;\n    --shadow-md: none;\n    --shadow-lg: none;\n    --shadow-xl: none;\n    --shadow-2xl: none;\n  }`
                    );
                    
                    if (!content.includes("@layer utilities {")) {
                        content += `\n@layer utilities {\n  /* Enforce global shadow control while supporting color utilities */\n  .shadow-xs { box-shadow: var(--shadow-xs) !important; }\n  .shadow-sm { box-shadow: var(--shadow-sm) !important; }\n  .shadow { box-shadow: var(--shadow) !important; }\n  .shadow-md { box-shadow: var(--shadow-md) !important; }\n  .shadow-lg { box-shadow: var(--shadow-lg) !important; }\n  .shadow-xl { box-shadow: var(--shadow-xl) !important; }\n  .shadow-2xl { box-shadow: var(--shadow-2xl) !important; }\n}\n`;
                    }
                }
                fs.writeFileSync(cssPath, content);
                console.log(`Updated ${path.basename(cssPath)}`);
            }
        }

        const tailwindPath = path.join(cwd, "tailwind.config.js");
        if (fs.existsSync(tailwindPath)) {
            let content = fs.readFileSync(tailwindPath, "utf8");

            if (!content.includes("DEFAULT: 'var(--border-width)'")) {
                content = content.replace(
                    /borderWidth:\s*{([^}]*)}/s,
                    (match, p1) => `borderWidth: {\n        DEFAULT: 'var(--border-width)',${p1}}`
                );
            }

            if (!content.includes("boxShadow:")) {
                content = content.replace(
                    /extend:\s*{([^}]*)}/s,
                    (match, p1) => `extend: {${p1}      boxShadow: {\n        xs: 'var(--shadow-xs, 0 1px 2px var(--shadow-color-sm))',\n        sm: 'var(--shadow-sm, 0 1px 3px var(--shadow-color-sm))',\n        DEFAULT: 'var(--shadow, 0 2px 8px var(--shadow-color-md))',\n        md: 'var(--shadow-md, 0 4px 12px var(--shadow-color-md))',\n        lg: 'var(--shadow-lg, 0 8px 20px var(--shadow-color-lg))',\n        xl: 'var(--shadow-xl, 0 12px 30px var(--shadow-color-xl))',\n        '2xl': 'var(--shadow-2xl, 0 15px 50px var(--shadow-color-2xl))',\n        none: 'none',\n      },\n`
                );
            }
            
            fs.writeFileSync(tailwindPath, content);
            console.log("Updated tailwind.config.js");
        }

        const themePath = path.join(cwd, "lib", "theme.ts");
        if (fs.existsSync(themePath)) {
            let content = fs.readFileSync(themePath, "utf8");
            content = content.replace(/radius:\s*['"][^'"]+['"]/g, "radius: '1.25rem'");
            
            if (!content.includes("borderWidth:")) {
                content = content.replace(
                    /radius:\s*['"]1.25rem['"]/g,
                    "radius: '1.25rem',\n    borderWidth: '0.5px'"
                );
            }
            
            fs.writeFileSync(themePath, content);
            console.log("Updated lib/theme.ts");
        }
    });

program
    .command("add <component>")
    .description("Add a component to your project")
    .action((component) => {
        const REUSABLES = [
            "accordion",
            "alert",
            "alert-dialog",
            "aspect-ratio",
            "avatar",
            "badge",
            "button",
            "card",
            "checkbox",
            "collapsible",
            "context-menu",
            "dialog",
            "dropdown-menu",
            "hover-card",
            "input",
            "label",
            "menubar",
            "popover",
            "progress",
            "radio-group",
            "select",
            "separator",
            "skeleton",
            "switch",
            "tabs",
            "text",
            "textarea",
            "toggle",
            "toggle-group",
            "tooltip",
        ];

        if (REUSABLES.includes(component)) {
            console.log(`Adding ${component} from React Native Reusables...`);
            spawnSync("npx", ["@react-native-reusables/cli@latest", "add", component], {
                stdio: "inherit",
                shell: true,
            });
        } else {
            console.log(`Adding ${component} from Native Blocks...`);
            const url = `https://native-blocks.vercel.app/r/${component}.json`;
            spawnSync("npx", ["shadcn@latest", "add", url], {
                stdio: "inherit",
                shell: true,
            });
        }
    });

program.parse();
