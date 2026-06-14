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
                        (match, p1, p2) => `${p1} {${p2}    --border-width: 0.5px;\n    --shadow-sm: rgba(0, 0, 0, 0);\n    --shadow-md: rgba(0, 0, 0, 0);\n    --shadow-lg: rgba(0, 0, 0, 0);\n    --shadow-xl: rgba(0, 0, 0, 0);\n    --shadow-2xl: rgba(0, 0, 0, 0);\n  }`
                    );
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
                    (match, p1) => `extend: {${p1}      boxShadow: {\n        sm: '0 1px 3px var(--shadow-sm)',\n        DEFAULT: '0 2px 8px var(--shadow-md)',\n        md: '0 4px 12px var(--shadow-md)',\n        lg: '0 8px 20px var(--shadow-lg)',\n        xl: '0 12px 30px var(--shadow-xl)',\n        '2xl': '0 15px 50px var(--shadow-2xl)',\n        none: 'none',\n      },\n`
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
