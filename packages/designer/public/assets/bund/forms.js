!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('loglevel'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'loglevel'], e)
    : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self).LEANUP = {}), t.loglevel);
})(this, function (t, e) {
  'use strict';
  class r {
    constructor() {}
    static getInstance() {
      return this._instance instanceof r == !1 && (this._instance = new r()), this._instance;
    }
    isNumber(t) {
      return !1 === isNaN(t) && 'number' == typeof t;
    }
    isArray(t, e = 0) {
      return Array.isArray(t) && t.length >= e;
    }
    isObject(t) {
      return 'object' == typeof t && null !== t && !1 === this.isArray(t);
    }
    isString(t, e = 0) {
      return 'string' == typeof t && t.length >= e;
    }
  }
  r._instance = null;
  const n = r.getInstance(),
    s = [];
  class i {
    constructor() {}
    static getInstance() {
      return this._instance instanceof i == !1 && (this._instance = new i()), this._instance;
    }
    log(t, r) {
      switch (
        (n.isObject(r.refObject) &&
          'function' == typeof r.refObject.constructor &&
          n.isString(r.refObject.constructor.name) &&
          (r.className = `[${r.refObject.constructor.name}]:`),
        s.push({ date: new Date().toUTCString(), level: t, message: r }),
        t)
      ) {
        case 'trace':
          e.trace(r);
          break;
        case 'debug':
          e.debug(r);
          break;
        case 'info':
          e.info(r);
          break;
        case 'warn':
          e.warn(r);
          break;
        case 'error':
          e.error(r);
      }
    }
    trace(t, e) {
      return this.log('trace', { messageText: t, refObject: e }), this;
    }
    debug(t, e) {
      return this.log('debug', { messageText: t, refObject: e }), this;
    }
    info(t, e) {
      return this.log('info', { messageText: t, refObject: e }), this;
    }
    warn(t, e) {
      return this.log('warn', { messageText: t, refObject: e }), this;
    }
    error(t, e) {
      return this.log('error', { messageText: t, refObject: e }), this;
    }
    get cache() {
      return [].concat(s);
    }
  }
  i._instance = null;
  const o = i.getInstance();
  function a(t) {
    return t instanceof l ? t.get() : Array.isArray(t) ? t : [t];
  }
  class l {
    constructor(t) {
      (this._instancesOf = []), (this._items = []), (this._protectedItems = []), (this._instancesOf = Array.isArray(t) ? t : [t]);
    }
    get empty() {
      return 0 === this._items.length;
    }
    get first() {
      return this._items.length > 0 ? this._items[0] : null;
    }
    forEach(t) {
      this._items.forEach(t);
    }
    filter(t) {
      return this._items.filter(t);
    }
    find(t) {
      return this._items.find(t);
    }
    get last() {
      return this._items.length > 0 ? this._items[this._items.length - 1] : null;
    }
    get length() {
      return this._items.length;
    }
    add(t, e = !1) {
      return (
        a(t).filter(t => {
          let r = !1;
          return (
            !1 === this.contains(t)
              ? !(function (t, e) {
                  return !!n.isArray(t) && void 0 !== t.find(t => e instanceof t);
                })(this._instancesOf, t)
                ? o.debug('The item does not have a valid instance type.', this)
                : (e && this._protectedItems.push(t), this._items.push(t), (r = !0))
              : o.debug('The item is already in the list.', this),
            r
          );
        }).length > 0
      );
    }
    remove(t) {
      return (
        a(t).filter(t => {
          let e = !1,
            r = this._protectedItems.indexOf(t);
          return (
            -1 === r
              ? ((r = this._items.indexOf(t)), r >= 0 ? (this._items.splice(r, 1), (e = !0)) : o.debug('The item is not in the list.', this))
              : o.debug('The item is protected and cannot be removed.', this),
            e
          );
        }).length > 0
      );
    }
    set(t, e = !1) {
      const r = this.clear(),
        n = this.add(t, e);
      return r || n;
    }
    get(t) {
      return !1 === isNaN(t) && 'number' == typeof t ? this._items.slice(0, t) : this._items;
    }
    clear() {
      const t = this._items.length;
      return (this._items = this._items.filter(t => this._protectedItems.indexOf(t) >= 0)), t !== this._items.length;
    }
    contains(t) {
      return this._items.indexOf(t) > -1;
    }
  }
  class h {
    constructor() {
      this.validators = new l(Function);
    }
    validate(t, e = !1) {
      const r = [];
      try {
        this.validators.forEach(n => {
          try {
            n(t);
          } catch (t) {
            if ((r.push(t), !0 === e)) throw new Error('Be quick and stop the execution of other validation functions. Only one error is enough.');
          }
        });
      } catch (t) {}
      return r;
    }
  }
  class c {
    constructor(t) {
      (this.errors = []), (this._name = 'unnamed'), (this._parentForms = []), (this._validationHandler = new h()), (this.name = t);
    }
    get name() {
      return this._name;
    }
    set name(t) {
      if ('string' != typeof t) throw new Error('The name of a control must be a string.');
      if (!(t.length > 0)) throw new Error('The name of a control must have a min-length of 1.');
      this._name = t;
    }
    get error() {
      return this.errors.length > 0 ? this.errors[0] : null;
    }
    get id() {
      let t = this.name;
      return this._parentForms.length > 0 && (t = `${this._parentForms[0].id}.${t}`), t;
    }
    get valid() {
      return 0 === this.errors.length;
    }
    findMeInParentForm(t) {
      if (this === t) return !0;
      if (t instanceof m) {
        const e = [];
        return (
          this._parentForms.forEach(r => {
            !0 === r.findMeInParentForm(t) && e.push(r);
          }),
          e.length > 0
        );
      }
      return !1;
    }
    addParentForm(t) {
      if (!1 !== this._parentForms.includes(t)) throw new Error(`An form control with the name '${t.name}' already exists.`);
      if (!1 !== t.findMeInParentForm(this)) throw new Error(`The same form control (${t.name}) leads to a form control loop.`);
      this._parentForms.push(t);
    }
    removeParentForm(t) {
      const e = this._parentForms.indexOf(t);
      if (!(e >= 0)) throw new Error(`An form control with the name '${t.name}' does not exists.`);
      this._parentForms.splice(e, 1);
    }
    setValidationHandler(t = new h()) {
      this._validationHandler = t;
    }
    validate(t) {
      (this.errors = this._validationHandler.validate(t)),
        this._parentForms.forEach(e => {
          e.validate(t);
        });
    }
  }
  class u extends c {
    constructor(t, e) {
      super(t),
        (this._label = ''),
        (this._value = null),
        (this._timeout = setTimeout(() => {}, 1)),
        e && ((this.label = e.label ? e.label : ''), (this.value = e.value ? e.value : null));
    }
    get label() {
      return this._label;
    }
    set label(t) {
      if ('string' != typeof t) throw new Error('The label of a input control must be a string.');
      this._label = t;
    }
    get value() {
      return this._value;
    }
    set value(t) {
      this._timeout && clearTimeout(this._timeout),
        (this._timeout = setTimeout(() => {
          (this._value = t), this.validate(t);
        }, 250));
    }
  }
  class m extends c {
    constructor() {
      super(...arguments), (this.controls = new l(c));
    }
    get valid() {
      return 0 === this.errors.length && 0 === this.controls.filter(t => !1 === t.valid).length;
    }
    addConrol(t) {
      if (!1 !== this.controls.contains(t)) throw new Error(`A control with the same name '${t.name}' already exists.`);
      t.addParentForm(this), this.controls.add(t);
    }
    removeControl(t) {
      if (!0 !== this.controls.contains(t)) throw new Error(`A control with the name '${t.name}' does not exists.`);
      t instanceof c && (t.removeParentForm(this), this.controls.remove(t));
    }
    getControls() {
      return this.controls.get();
    }
    getControl(t) {
      return this.controls.find(e => e.name === t);
    }
    getData() {
      const t = {};
      return (
        this.controls.forEach(e => {
          if (e instanceof m) t[e.name] = e.getData();
          else {
            if (!(e instanceof u)) throw new Error('The control is neither an instance of FormControl or InputControl.');
            t[e.name] = e.value;
          }
        }),
        t
      );
    }
  }
  class f {
    static createForm(t, e) {
      const r = new m(t);
      for (const t in e)
        if (e.hasOwnProperty(t))
          if ('object' == typeof e[t] && null !== e[t]) r.addConrol(f.createForm(t, e[t]));
          else {
            const n = new u(t);
            (n.value = e[t]), r.addConrol(n);
          }
      return r;
    }
  }
  (t.FormControl = m),
    (t.FormFactory = f),
    (t.InputControl = u),
    (t.ListOf = l),
    (t.Log = o),
    (t.ValidationHandler = h),
    (t.Validator = n),
    Object.defineProperty(t, '__esModule', { value: !0 });
});
