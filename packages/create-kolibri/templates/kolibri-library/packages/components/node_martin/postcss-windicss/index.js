'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) =>
  key in obj
    ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value })
    : (obj[key] = value);
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.ts
var _exithook = require('exit-hook');
var _exithook2 = _interopRequireDefault(_exithook);
var _postcss = require('postcss');
var _pluginutils = require('@windicss/plugin-utils');

// src/dev.ts
var _fs = require('fs');
var _chokidar = require('chokidar');
var _chokidar2 = _interopRequireDefault(_chokidar);

// src/utils.ts

async function fileExists(path) {
  try {
    const stats = await _fs.promises.stat(path);
    return stats.isFile();
  } catch (e) {
    return false;
  }
}
async function touch(path, mode = 'utime') {
  path = path.replace(/.[^.]+$/, '.');
  ['css', 'less', 'sass', 'scss'].forEach(async (ext) => {
    if (await fileExists(path + ext)) {
      if (mode === 'utime') return await touchUtime(path + ext);
      else return touchInsert(path + ext);
    }
  });
}
var TOUCH_REG = /\/\*\s*windicss-touch:.*\*\//g;
function touchInsert(path) {
  let css = _fs.readFileSync(path, 'utf-8');
  const banner = `/* windicss-touch: ${Date.now()} */`;
  let replaced = false;
  css = css.replace(TOUCH_REG, () => {
    replaced = true;
    return banner;
  });
  if (!replaced)
    css = `${banner}
${css}`;
  _fs.writeFileSync(path, css, 'utf-8');
}
async function touchUtime(path) {
  return new Promise((resolve, reject) => {
    const time = new Date();
    _fs.utimes.call(void 0, path, time, time, (err) => {
      if (err) {
        return _fs.open.call(void 0, path, 'w', (err2, fd) => {
          if (err2) return reject(err2);
          _fs.close.call(void 0, fd, (err3) => (err3 ? reject(err3) : resolve(fd)));
        });
      }
      resolve(false);
    });
  });
}

// src/context.ts
var _debug2 = require('debug');
var _debug3 = _interopRequireDefault(_debug2);
var context = {};
var isDev = process.env.NODE_ENV === 'development';
var debug = _debug3.default.call(void 0, 'postcss-windicss');

// src/dev.ts
var watcher;
function shutdownWatcher() {
  if (watcher) {
    debug('shutting down watcher');
    watcher.close();
    watcher = void 0;
  }
}
async function startDevWatcher(options = {}) {
  shutdownWatcher();
  debug('starting dev watcher');
  const utils = context.utils;
  await utils.ensureInit();
  const { touchMode = 'utime' } = options;
  watcher = _chokidar2.default.watch(utils.options.scanOptions.include, {
    ignored: utils.options.scanOptions.exclude,
    ignoreInitial: true,
  });
  if (utils.configFilePath) watcher.add(utils.configFilePath);
  watcher.on('change', async (path) => {
    if (path === context.entry) return;
    if (path === utils.configFilePath) {
      debug('reload config', utils.configFilePath);
      utils.init();
      return;
    }
    debug('update from', path);
    await utils.extractFile(await _fs.promises.readFile(path, 'utf-8'));
    if (context.entry) touch(context.entry, touchMode);
  });
  if (context.entry) touch(context.entry, touchMode);
}

// src/index.ts
var plugin = (options) => {
  if (!context.utils) {
    context.utils = _pluginutils.createUtils.call(
      void 0,
      __spreadProps(__spreadValues({}, options), {
        onOptionsResolved() {
          if (isDev) setTimeout(() => startDevWatcher(options));
        },
      }),
      {
        name: 'postcss-windicss',
      }
    );
    if (isDev) _exithook2.default.call(void 0, shutdownWatcher);
    debug(isDev ? 'development mode' : 'production mode');
  }
  const utils = context.utils;
  return {
    postcssPlugin: 'postcss-windicss',
    async AtRule(atRule) {
      var _a;
      const entry = (_a = atRule.root().source) == null ? void 0 : _a.input.from;
      if (atRule.name === 'windicss') {
        context.entry = entry;
        atRule.replaceWith(_postcss.parse.call(void 0, await utils.generateCSS()));
      } else if (['apply'].includes(atRule.name)) {
        const rule = atRule.parent;
        if (!rule) return;
        await utils.ensureInit();
        const css = rule.toString();
        const transformed = css ? utils.transformCSS(css, entry || '') : void 0;
        if (transformed) rule.replaceWith(_postcss.parse.call(void 0, transformed));
      } else if (['screen', 'variants'].includes(atRule.name)) {
        await utils.ensureInit();
        const css = atRule.toString();
        const transformed = css ? utils.transformCSS(css, entry || '') : void 0;
        if (transformed) atRule.replaceWith(_postcss.parse.call(void 0, transformed));
      }
    },
    Declaration(decl) {
      const match = decl.value.match(/^\s*theme\((['"])(.*)\1\)\s*$/);
      if (match && match[2]) decl.value = utils.processor.theme(match[2]).toString();
    },
  };
};
var postcss = true;
plugin.postcss = true;
module.exports = plugin;

exports.postcss = postcss;
