#!/usr/bin/env node

import { Command } from "commander";
import { spawnSync } from "child_process";

const program = new Command();

program
    .name("native-blocks")
    .description("Mobile-first React Native component and block registry")
    .version("0.1.0");

program
    .command("init")
    .description("Initialize Native Blocks in your project")
    .action(() => {
        console.log("🚀 Initializing Native Blocks...");
        spawnSync("npx", ["@react-native-reusables/cli@latest", "init"], {
            stdio: "inherit",
            shell: true,
        });
    });

program
    .command("add <component>")
    .description("Add a component to your project")
    .action((component) => {
        console.log(`📦 Adding ${component} to your project...`);
        spawnSync("npx", ["@react-native-reusables/cli@latest", "add", component], {
            stdio: "inherit",
            shell: true,
        });
    });

program.parse();
