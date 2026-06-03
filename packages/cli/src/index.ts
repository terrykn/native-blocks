#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

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