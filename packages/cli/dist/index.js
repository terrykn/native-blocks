#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const program = new commander_1.Command();
program
    .name("native-blocks")
    .description("Mobile-first React Native component registry")
    .version("0.1.0");
program
    .command("init")
    .description("Initialize Native Blocks in your project")
    .action(() => {
    console.log("🚀 Initializing Native Blocks...");
    (0, child_process_1.spawnSync)("npx", ["@react-native-reusables/cli@latest", "init"], {
        stdio: "inherit",
        shell: true,
    });
});
program
    .command("add <component>")
    .description("Add a component to your project")
    .action((component) => {
    console.log(`📦 Adding ${component} to your project...`);
    (0, child_process_1.spawnSync)("npx", ["@react-native-reusables/cli@latest", "add", component], {
        stdio: "inherit",
        shell: true,
    });
});
program.parse();
