#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const program = new commander_1.Command();
program
    .name("native-blocks")
    .version("0.1.0");
program
    .command("init")
    .action(() => {
    console.log("Initializing Native Blocks");
});
program
    .command("add <component>")
    .action((component) => {
    console.log(`Installing ${component}`);
});
program.parse();
