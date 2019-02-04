#!/usr/bin/env node
const program  = require('commander');
const pkg = require('./package.json');
const { create } = require('./reagent/create');
const { eject } = require('./reagent/eject');

// Usage
program.usage(`
  Reagent
    reagent <cmd> --option

  Examples:
    reagent create
    reagent eject --path=./InnerTemplates
    reagent set --path=./MyTemplates
  
  For additional info, please, visit to ${pkg.homepage}
`);

// Version & Description
program.version(pkg.version)
program.description(pkg.description);

// Options
program.option('-p, --path', 'Path for ejecting inner templates or set custom user templates')

// Commands
program
  .command('create')
  .alias('new')
  .description('Creating new component/container/redux section')
  .action(() => {
    create();
  });

program
  .command('eject')
  .description('Ejecting inner templates to folder with theirs config file')
  .action(pathname => {
    eject(pathname);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
};
