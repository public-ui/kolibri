# Migration

## Introduction

New major versions of KoliBri are developed with the aim of simplifying maintenance and support and promoting further development.

This means that components, features or functionalities may be removed and technological prerequisites created to promote future innovative change.

- **Maintenance and care strategy:**<br/>
  We will always maintain the latest and previous major version of KoliBri. This means that we will fix bugs and close security gaps for these versions. For all other versions, we will no longer provide bug fixes or security updates without further notice.
- **Further development:**<br/>
  We will always continue to develop the latest major version of KoliBri. This means that we will provide new features and functionalities for these versions. For all other versions, we will no longer provide any new features or functionalities without further ado.
- **Save an executable version before migration:**<br/>
  Before the migration takes place, we recommend checking in an executable version so that there are no uncommitted changes to the source code to be migrated. This means that all changes can be easily tracked and checked during and after the migration.
- **Migrationstool:**<br/>
  We provide a migration tool that generally supports the migration of source code with KoliBri. This tool is able to migrate most breaking changes automatically. Further information can be found in the [Tool-Dokumentation (EN)](https://www.npmjs.com/package/@public-ui/kolibri-cli).
- **Help and feedback:**<br/>
  If there are any problems with the migration, we are happy to help. Please open an [Issue on GitHub](https://github.com/public-ui/kolibri/issues/new/choose).

## Migration from version 1 to version 2

### Notes on upgrading to version 2

1. **New features in version 2 already available from version 1.7:**<br/>
   Most of the new features introduced in version 2 are already available from version 1.7 and higher. This means that applications based on version 1.7 or higher may already have the necessary functions to enable a smooth migration.

2. **Removed properties, components and functionalities were already marked as obsolete in version 1.7 and higher:**<br/>
   All features, components and functionalities that were removed in version 2 were already marked as deprecated in version 1.7 and higher. So if you have regularly updated your code base, you should already be prepared to replace these elements.

3. **Migration from version 1.7 minimizes potential changes:**<br/>
   A migration from version 1.7 and higher to version 2 will probably require the least adjustments. The likelihood of incompatibilities is low, as most changes and removals have already been marked as obsolete in previous versions.

4. **Migration from version 1.4 is possible:**<br/>
   Although a migration from version 1.7 is recommended, it is also possible to migrate from version 1.4 to version 2. Please note, however, that this may require additional adjustments, as some of the necessary functions may only be available from version 1.7.

5. **Note simplified registration:**<br/>
   We have simplified the modularization of KoliBri in version 1 and for version 2. The module `@public-ui/core` has been removed and the functionalities moved to the module `@public-ui/components`.

```diff
  - import { register } from '@public-ui/core';
  + import { register } from '@public-ui/components';
  import { defineCustomElements } from '@public-ui/components/dist/loader';
  import { MyTheme } from '...';
  await register(MyTheme, defineCustomElements);
```

### Breaking changes for version 2

You can find more information about Breaking Changes in the documentation [BREAKING_CHANGES.v2.md (EN)](https://github.com/public-ui/kolibri/blob/develop/docs/BREAKING_CHANGES.v2.md).

## Perform migration

> [!TIP]
> We recommend carrying out the migration with the migration tool. This tool is able to migrate most breaking changes automatically. Further information can be found in the [Tool-Dokumentation (EN)](https://www.npmjs.com/package/@public-ui/kolibri-cli).

### Migration with migration tool

1. **Preparation:**<br/>
   The project is on an earlier version, all dependencies are installed, the project is executable and all changes are checked in and safely pushed.
2. **Execute migration:**<br/>
   Execute the following command to perform the migration: `npx @public-ui/kolibri-cli migrate src`
3. **Check migration:**<br/>
   Check the changes and run the application to make sure everything works as expected.

### Perform migration manually

1. **Preparation:**<br/>
   The project is on an earlier version, all dependencies are installed, the project is executable and all changes are checked in and safely pushed.
2. **Perform migration:**<br/>
   Carry out the migration by making the breaking changes in the respective documentation.
