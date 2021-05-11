
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function set_store_value(store, ret, value = ret) {
        store.set(value);
        return ret;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function get_binding_group_value(group, __value, checked) {
        const value = new Set();
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.add(group[i].__value);
        }
        if (!checked) {
            value.delete(__value);
        }
        return Array.from(value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            callbacks.slice().forEach(fn => fn(event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : options.context || []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.37.0' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    function isObject(value) {
      const type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }

    function getColumnSizeClass(isXs, colWidth, colSize) {
      if (colSize === true || colSize === '') {
        return isXs ? 'col' : `col-${colWidth}`;
      } else if (colSize === 'auto') {
        return isXs ? 'col-auto' : `col-${colWidth}-auto`;
      }

      return isXs ? `col-${colSize}` : `col-${colWidth}-${colSize}`;
    }

    function toClassName(value) {
      let result = '';

      if (typeof value === 'string' || typeof value === 'number') {
        result += value;
      } else if (typeof value === 'object') {
        if (Array.isArray(value)) {
          result = value.map(toClassName).filter(Boolean).join(' ');
        } else {
          for (let key in value) {
            if (value[key]) {
              result && (result += ' ');
              result += key;
            }
          }
        }
      }

      return result;
    }

    function classnames(...args) {
      return args.map(toClassName).filter(Boolean).join(' ');
    }

    /* node_modules\sveltestrap\src\Button.svelte generated by Svelte v3.37.0 */
    const file$g = "node_modules\\sveltestrap\\src\\Button.svelte";

    // (48:0) {:else}
    function create_else_block_1(ctx) {
    	let button;
    	let button_aria_label_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);
    	const default_slot_or_fallback = default_slot || fallback_block(ctx);

    	let button_levels = [
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ value: /*value*/ ctx[5] },
    		{
    			"aria-label": button_aria_label_value = /*ariaLabel*/ ctx[6] || /*defaultAriaLabel*/ ctx[8]
    		},
    		{ style: /*style*/ ctx[4] }
    	];

    	let button_data = {};

    	for (let i = 0; i < button_levels.length; i += 1) {
    		button_data = assign(button_data, button_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			button = element("button");
    			if (default_slot_or_fallback) default_slot_or_fallback.c();
    			set_attributes(button, button_data);
    			add_location(button, file$g, 48, 2, 985);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot_or_fallback) {
    				default_slot_or_fallback.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[19], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 65536) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[16], dirty, null, null);
    				}
    			} else {
    				if (default_slot_or_fallback && default_slot_or_fallback.p && dirty & /*close, children, $$scope*/ 65539) {
    					default_slot_or_fallback.p(ctx, dirty);
    				}
    			}

    			set_attributes(button, button_data = get_spread_update(button_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
    				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
    				(!current || dirty & /*value*/ 32) && { value: /*value*/ ctx[5] },
    				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && button_aria_label_value !== (button_aria_label_value = /*ariaLabel*/ ctx[6] || /*defaultAriaLabel*/ ctx[8])) && { "aria-label": button_aria_label_value },
    				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot_or_fallback, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot_or_fallback, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot_or_fallback) default_slot_or_fallback.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(48:0) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (33:0) {#if href}
    function create_if_block$7(ctx) {
    	let a;
    	let current_block_type_index;
    	let if_block;
    	let a_aria_label_value;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_1$2, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*children*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	let a_levels = [
    		/*$$restProps*/ ctx[9],
    		{ class: /*classes*/ ctx[7] },
    		{ disabled: /*disabled*/ ctx[2] },
    		{ href: /*href*/ ctx[3] },
    		{
    			"aria-label": a_aria_label_value = /*ariaLabel*/ ctx[6] || /*defaultAriaLabel*/ ctx[8]
    		},
    		{ style: /*style*/ ctx[4] }
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block_1 = {
    		c: function create() {
    			a = element("a");
    			if_block.c();
    			set_attributes(a, a_data);
    			add_location(a, file$g, 33, 2, 752);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if_blocks[current_block_type_index].m(a, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*click_handler*/ ctx[18], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(a, null);
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				dirty & /*$$restProps*/ 512 && /*$$restProps*/ ctx[9],
    				(!current || dirty & /*classes*/ 128) && { class: /*classes*/ ctx[7] },
    				(!current || dirty & /*disabled*/ 4) && { disabled: /*disabled*/ ctx[2] },
    				(!current || dirty & /*href*/ 8) && { href: /*href*/ ctx[3] },
    				(!current || dirty & /*ariaLabel, defaultAriaLabel*/ 320 && a_aria_label_value !== (a_aria_label_value = /*ariaLabel*/ ctx[6] || /*defaultAriaLabel*/ ctx[8])) && { "aria-label": a_aria_label_value },
    				(!current || dirty & /*style*/ 16) && { style: /*style*/ ctx[4] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if_blocks[current_block_type_index].d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(33:0) {#if href}",
    		ctx
    	});

    	return block_1;
    }

    // (62:6) {:else}
    function create_else_block_2(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);

    	const block_1 = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 65536) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[16], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(62:6) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (60:25) 
    function create_if_block_3(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 1) set_data_dev(t, /*children*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(60:25) ",
    		ctx
    	});

    	return block_1;
    }

    // (58:6) {#if close}
    function create_if_block_2(ctx) {
    	let span;

    	const block_1 = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "×";
    			attr_dev(span, "aria-hidden", "true");
    			add_location(span, file$g, 58, 8, 1171);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(58:6) {#if close}",
    		ctx
    	});

    	return block_1;
    }

    // (57:10)        
    function fallback_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2, create_if_block_3, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*close*/ ctx[1]) return 0;
    		if (/*children*/ ctx[0]) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: fallback_block.name,
    		type: "fallback",
    		source: "(57:10)        ",
    		ctx
    	});

    	return block_1;
    }

    // (44:4) {:else}
    function create_else_block$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[17].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[16], null);

    	const block_1 = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 65536) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[16], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(44:4) {:else}",
    		ctx
    	});

    	return block_1;
    }

    // (42:4) {#if children}
    function create_if_block_1$2(ctx) {
    	let t;

    	const block_1 = {
    		c: function create() {
    			t = text(/*children*/ ctx[0]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*children*/ 1) set_data_dev(t, /*children*/ ctx[0]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(42:4) {#if children}",
    		ctx
    	});

    	return block_1;
    }

    function create_fragment$g(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$7, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*href*/ ctx[3]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block_1 = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block: block_1,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block_1;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let ariaLabel;
    	let classes;
    	let defaultAriaLabel;

    	const omit_props_names = [
    		"class","active","block","children","close","color","disabled","href","outline","size","style","value"
    	];

    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { active = false } = $$props;
    	let { block = false } = $$props;
    	let { children = undefined } = $$props;
    	let { close = false } = $$props;
    	let { color = "secondary" } = $$props;
    	let { disabled = false } = $$props;
    	let { href = "" } = $$props;
    	let { outline = false } = $$props;
    	let { size = null } = $$props;
    	let { style = "" } = $$props;
    	let { value = "" } = $$props;

    	function click_handler(event) {
    		bubble($$self, event);
    	}

    	function click_handler_1(event) {
    		bubble($$self, event);
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(20, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		$$invalidate(9, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("class" in $$new_props) $$invalidate(10, className = $$new_props.class);
    		if ("active" in $$new_props) $$invalidate(11, active = $$new_props.active);
    		if ("block" in $$new_props) $$invalidate(12, block = $$new_props.block);
    		if ("children" in $$new_props) $$invalidate(0, children = $$new_props.children);
    		if ("close" in $$new_props) $$invalidate(1, close = $$new_props.close);
    		if ("color" in $$new_props) $$invalidate(13, color = $$new_props.color);
    		if ("disabled" in $$new_props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ("href" in $$new_props) $$invalidate(3, href = $$new_props.href);
    		if ("outline" in $$new_props) $$invalidate(14, outline = $$new_props.outline);
    		if ("size" in $$new_props) $$invalidate(15, size = $$new_props.size);
    		if ("style" in $$new_props) $$invalidate(4, style = $$new_props.style);
    		if ("value" in $$new_props) $$invalidate(5, value = $$new_props.value);
    		if ("$$scope" in $$new_props) $$invalidate(16, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		active,
    		block,
    		children,
    		close,
    		color,
    		disabled,
    		href,
    		outline,
    		size,
    		style,
    		value,
    		ariaLabel,
    		classes,
    		defaultAriaLabel
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(20, $$props = assign(assign({}, $$props), $$new_props));
    		if ("className" in $$props) $$invalidate(10, className = $$new_props.className);
    		if ("active" in $$props) $$invalidate(11, active = $$new_props.active);
    		if ("block" in $$props) $$invalidate(12, block = $$new_props.block);
    		if ("children" in $$props) $$invalidate(0, children = $$new_props.children);
    		if ("close" in $$props) $$invalidate(1, close = $$new_props.close);
    		if ("color" in $$props) $$invalidate(13, color = $$new_props.color);
    		if ("disabled" in $$props) $$invalidate(2, disabled = $$new_props.disabled);
    		if ("href" in $$props) $$invalidate(3, href = $$new_props.href);
    		if ("outline" in $$props) $$invalidate(14, outline = $$new_props.outline);
    		if ("size" in $$props) $$invalidate(15, size = $$new_props.size);
    		if ("style" in $$props) $$invalidate(4, style = $$new_props.style);
    		if ("value" in $$props) $$invalidate(5, value = $$new_props.value);
    		if ("ariaLabel" in $$props) $$invalidate(6, ariaLabel = $$new_props.ariaLabel);
    		if ("classes" in $$props) $$invalidate(7, classes = $$new_props.classes);
    		if ("defaultAriaLabel" in $$props) $$invalidate(8, defaultAriaLabel = $$new_props.defaultAriaLabel);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		$$invalidate(6, ariaLabel = $$props["aria-label"]);

    		if ($$self.$$.dirty & /*className, close, outline, color, size, block, active*/ 64514) {
    			$$invalidate(7, classes = classnames(className, { close }, close || "btn", close || `btn${outline ? "-outline" : ""}-${color}`, size ? `btn-${size}` : false, block ? "btn-block" : false, { active }));
    		}

    		if ($$self.$$.dirty & /*close*/ 2) {
    			$$invalidate(8, defaultAriaLabel = close ? "Close" : null);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		children,
    		close,
    		disabled,
    		href,
    		style,
    		value,
    		ariaLabel,
    		classes,
    		defaultAriaLabel,
    		$$restProps,
    		className,
    		active,
    		block,
    		color,
    		outline,
    		size,
    		$$scope,
    		slots,
    		click_handler,
    		click_handler_1
    	];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {
    			class: 10,
    			active: 11,
    			block: 12,
    			children: 0,
    			close: 1,
    			color: 13,
    			disabled: 2,
    			href: 3,
    			outline: 14,
    			size: 15,
    			style: 4,
    			value: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get class() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get active() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set active(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get block() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set block(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get children() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set children(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get close() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set close(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get color() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set color(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get href() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get outline() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set outline(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get size() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set size(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules\sveltestrap\src\Col.svelte generated by Svelte v3.37.0 */
    const file$f = "node_modules\\sveltestrap\\src\\Col.svelte";

    function create_fragment$f(ctx) {
    	let div;
    	let div_class_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	let div_levels = [
    		/*$$restProps*/ ctx[1],
    		{
    			class: div_class_value = /*colClasses*/ ctx[0].join(" ")
    		}
    	];

    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$f, 58, 0, 1388);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 256) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[8], dirty, null, null);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				{ class: div_class_value }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	const omit_props_names = ["class","xs","sm","md","lg","xl"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Col", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { xs = undefined } = $$props;
    	let { sm = undefined } = $$props;
    	let { md = undefined } = $$props;
    	let { lg = undefined } = $$props;
    	let { xl = undefined } = $$props;
    	const colClasses = [];
    	const lookup = { xs, sm, md, lg, xl };

    	Object.keys(lookup).forEach(colWidth => {
    		const columnProp = lookup[colWidth];

    		if (!columnProp && columnProp !== "") {
    			return; //no value for this width
    		}

    		const isXs = colWidth === "xs";

    		if (isObject(columnProp)) {
    			const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
    			const colClass = getColumnSizeClass(isXs, colWidth, columnProp.size);

    			if (columnProp.size || columnProp.size === "") {
    				colClasses.push(colClass);
    			}

    			if (columnProp.push) {
    				colClasses.push(`push${colSizeInterfix}${columnProp.push}`);
    			}

    			if (columnProp.pull) {
    				colClasses.push(`pull${colSizeInterfix}${columnProp.pull}`);
    			}

    			if (columnProp.offset) {
    				colClasses.push(`offset${colSizeInterfix}${columnProp.offset}`);
    			}
    		} else {
    			colClasses.push(getColumnSizeClass(isXs, colWidth, columnProp));
    		}
    	});

    	if (!colClasses.length) {
    		colClasses.push("col");
    	}

    	if (className) {
    		colClasses.push(className);
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ("xs" in $$new_props) $$invalidate(3, xs = $$new_props.xs);
    		if ("sm" in $$new_props) $$invalidate(4, sm = $$new_props.sm);
    		if ("md" in $$new_props) $$invalidate(5, md = $$new_props.md);
    		if ("lg" in $$new_props) $$invalidate(6, lg = $$new_props.lg);
    		if ("xl" in $$new_props) $$invalidate(7, xl = $$new_props.xl);
    		if ("$$scope" in $$new_props) $$invalidate(8, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getColumnSizeClass,
    		isObject,
    		className,
    		xs,
    		sm,
    		md,
    		lg,
    		xl,
    		colClasses,
    		lookup
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    		if ("xs" in $$props) $$invalidate(3, xs = $$new_props.xs);
    		if ("sm" in $$props) $$invalidate(4, sm = $$new_props.sm);
    		if ("md" in $$props) $$invalidate(5, md = $$new_props.md);
    		if ("lg" in $$props) $$invalidate(6, lg = $$new_props.lg);
    		if ("xl" in $$props) $$invalidate(7, xl = $$new_props.xl);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [colClasses, $$restProps, className, xs, sm, md, lg, xl, $$scope, slots];
    }

    class Col extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {
    			class: 2,
    			xs: 3,
    			sm: 4,
    			md: 5,
    			lg: 6,
    			xl: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Col",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get class() {
    		throw new Error("<Col>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Col>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xs() {
    		throw new Error("<Col>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xs(value) {
    		throw new Error("<Col>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get sm() {
    		throw new Error("<Col>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sm(value) {
    		throw new Error("<Col>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get md() {
    		throw new Error("<Col>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set md(value) {
    		throw new Error("<Col>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get lg() {
    		throw new Error("<Col>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lg(value) {
    		throw new Error("<Col>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get xl() {
    		throw new Error("<Col>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set xl(value) {
    		throw new Error("<Col>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\sveltestrap\src\Row.svelte generated by Svelte v3.37.0 */
    const file$e = "node_modules\\sveltestrap\\src\\Row.svelte";

    function create_fragment$e(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[7].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[6], null);
    	let div_levels = [/*$$restProps*/ ctx[1], { class: /*classes*/ ctx[0] }];
    	let div_data = {};

    	for (let i = 0; i < div_levels.length; i += 1) {
    		div_data = assign(div_data, div_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			set_attributes(div, div_data);
    			add_location(div, file$e, 38, 0, 957);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 64) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[6], dirty, null, null);
    				}
    			}

    			set_attributes(div, div_data = get_spread_update(div_levels, [
    				dirty & /*$$restProps*/ 2 && /*$$restProps*/ ctx[1],
    				(!current || dirty & /*classes*/ 1) && { class: /*classes*/ ctx[0] }
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getCols(cols) {
    	const colsValue = parseInt(cols);

    	if (!isNaN(colsValue)) {
    		if (colsValue > 0) {
    			return [`row-cols-${colsValue}`];
    		}
    	} else if (typeof cols === "object") {
    		return ["xs", "sm", "md", "lg", "xl"].map(colWidth => {
    			const isXs = colWidth === "xs";
    			const colSizeInterfix = isXs ? "-" : `-${colWidth}-`;
    			const value = cols[colWidth];

    			if (typeof value === "number" && value > 0) {
    				return `row-cols${colSizeInterfix}${value}`;
    			}

    			return null;
    		}).filter(value => !!value);
    	}

    	return [];
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let classes;
    	const omit_props_names = ["class","noGutters","form","cols"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Row", slots, ['default']);
    	let { class: className = "" } = $$props;
    	let { noGutters = false } = $$props;
    	let { form = false } = $$props;
    	let { cols = 0 } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ("class" in $$new_props) $$invalidate(2, className = $$new_props.class);
    		if ("noGutters" in $$new_props) $$invalidate(3, noGutters = $$new_props.noGutters);
    		if ("form" in $$new_props) $$invalidate(4, form = $$new_props.form);
    		if ("cols" in $$new_props) $$invalidate(5, cols = $$new_props.cols);
    		if ("$$scope" in $$new_props) $$invalidate(6, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		classnames,
    		className,
    		noGutters,
    		form,
    		cols,
    		getCols,
    		classes
    	});

    	$$self.$inject_state = $$new_props => {
    		if ("className" in $$props) $$invalidate(2, className = $$new_props.className);
    		if ("noGutters" in $$props) $$invalidate(3, noGutters = $$new_props.noGutters);
    		if ("form" in $$props) $$invalidate(4, form = $$new_props.form);
    		if ("cols" in $$props) $$invalidate(5, cols = $$new_props.cols);
    		if ("classes" in $$props) $$invalidate(0, classes = $$new_props.classes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*className, noGutters, form, cols*/ 60) {
    			$$invalidate(0, classes = classnames(className, noGutters ? "no-gutters" : null, form ? "form-row" : "row", ...getCols(cols)));
    		}
    	};

    	return [classes, $$restProps, className, noGutters, form, cols, $$scope, slots];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, { class: 2, noGutters: 3, form: 4, cols: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get class() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get noGutters() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set noGutters(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get form() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set form(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cols() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cols(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const character = writable({
      name: '',
      bio: {
        description: '',
        title: '',
        player: '',
        nickname: '',
        faction: '',
        gender: ''
      },
      race: '',
      arcs: {
        saga: '',
        epic: '',
        glory: '',
        belief: '',
        flaw: ''
      },
      baseAttributes: [
        /*
        {name: 'Strength', value: 1},
        {name: 'Agility', value: 1},
        {name: 'Endurance', value: 1},
        {name: 'Health', value: 1},
        {name: 'Willpower', value: 1},
        {name: 'Wit', value: 1},
        {name: 'Intelligence', value: 1},
        {name: 'Perception', value: 1}
        */
      ],
      boonsAndBanes: [
        /*
        {
        name: '',
        level: 0
      }
        */
      ],
      schools: [
        /*
        {
        name: '',
        proficiencies: [],
        level: 0,
        talents: [],
        superiorManeuvers: [],
        mastery: {}
      }
        */
      ],
      skills: [
        /*
        {
        name: '',
        level: 0
      }
        */
      ],
      wealth: {
        socialClass: '',
        money: [], //go, sp, cp
        assets: [
          /*
          {
          name: '',
          value: 0 // minor, moderate, major
        }
          */
        ]
      },
      getTotalAttributes: function() {
        let obj = JSON.parse(JSON.stringify(this.baseAttributes));
        console.log("Get total attributes TODO");
        return obj;
      }
    });

    const races = [{
      name: "Human",
      tier: 1,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 0
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [{
        name: "Willing to Learn",
        description: `Humans are flexible creatures by nature, and learning is
something most can do very quickly, particularly when
instructed. When selecting a school, Humans do not pay to
add proficiencies to their schools, and may begin with the
full allotment of proficiencies in the school for no cost.`
      },
      {
        name: "The Human Condition",
        description: `Human beings live short, brutal lives by the standards
of the elder races. More-so than any other race, Humans
are characterized by their ability to overcome their own
weaknesses. Only Humans may benefit from the Flaw arc.`
      }
      ]
    }, {
      name: "Goblin",
      tier: 1,
      attributeMods: [{
        name: 'Strength',
        value: -2
      },
      {
        name: 'Agility',
        value: 1
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 1
      }
      ],
      characteristics: [{
        name: "Regeneration",
        description: `Goblins can recover from any injury that is not fatal. Lost
limbs, eyes, and so on, regrow after twice the healing time of
the wound has elapsed.
The exception to this is if the wound is sealed with fire or
acid or some other method. These wounds cannot be regenerated,
and are permanently lost.
Banes taken which represent wounds or lost body parts
are assumed to be of the burned sort, and thus may not be
healed in the regular manner.`
    },{
      name: "Small",
      description: `Goblins are shorter than other races, and they suffer -2 to
the reach of their weapons. Their MOB is also reduced by 2,
representing their shorter legs.`
    },
    {
      name: "Sneaky",
      description: `Goblins are naturally cautious and swift creatures. They gain
+1 bonus dice to the Stealth skill, and are always considered
trained in that skill.`
    },
    {
      name: "Scarce Environment",
      description: `Goblins only have to eat half as much as other races in order
to survive`
    },
    {
      name: "Tight Spot",
      description: `Goblins are very short, but also flexible and double-jointed.
They can fit through any space large enough for their small
heads to pass through, and can also contort their limbs to
climb in cramped spaces, or secure fingerholds too small to
otherwise be used.
Goblins gain a +2 bonus to Climbing, and a +2 bonus to
Thievery to squeeze through tight places.`
    },
    {
      name: "See in Darkness",
      description: `Goblins can see in Pitch Black, Poorly Lit and Dimly Lit as
though it were Evenly Lit.`
    },
    {
      name: "Photophobia",
      description: `When in Brightly Lit, Goblins count as being in Poorly Lit.
When in Evenly Lit, Goblins count as being in Dimly Lit.
Blinding is still Blinding. `
    },
    ]
    }, {
      name: "Dwarf",
      tier: 2,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 0
      },
      {
        name: 'Endurance',
        value: 2
      },
      {
        name: 'Health',
        value: 1
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [{
        name: "Short and Stout",
        description: `Dwarves have -1 reach and -2 MOB, due to their smaller
stature and considerable girth.`
      },
      {
        name: "Robust Immunities",
        description: `-1 to infection chance against all wounds, and +2 bonus to
bleed rolls`
      },
      {
        name: "Sturdy Build",
        description: `Dwarves have +1 TOU at character creation.`
      },
      {
        name: "See in Shadow",
        description: `Dwarves can see in Poorly Lit and Dimly Lit as though it were Evenly Lit.`
      },
      {
        name: "Prodigious Livers",
        description: `Dwarves gain a +6 bonus to their effective HLT when rolling to ` +
          `resist toxins (poisons, alcohol, general toxins) that are ingested, ` +
          `and +2 to their effective HLT against poisoned arrows, ` +
          `weapons or other toxins that enter the body through injury.`
      },
      ]
    }, {
      name: "Seablooded",
      tier: 2,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 1
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Long-Lived",
          description: `Seablooded do not have a Focus as Zells do, but they are not fully mortal as humans are. Rather, they tend to live for around 150 years, regardless of where they are or what they do. They are largely immune to disease, and like Zells, insects and vermin tend to die around them because their bodily oils are toxic. This does give them a vague chemical smell, akin to that of quinine or tonic water.`
        },
        {
          name: "Echoes of the Void",
          description: `Seablooded have some small connection to the realm of spirits, much as their Zellish kinsmen do, but it is less substantial than that of true Zells. Seablooded who are Thaumaturges gain +2 Credibility in any one realm of their choice.`
        },
        {
          name: "Between Two Worlds",
          description: `The Seablooded are hybrids of Zells and humans, and thus possess only some of the traits of each. Their ears are pointed like those of a Zell, but they tend to be shorter and stockier, like humans. Likewise, which traits precisely they possess vary depending on the genetics of the individual. A Seablooded may benefit from the Flaw Arc as though they possessed the trait The Human Condition, and suffer the penalty from the Zells’ trait Strange Tastes.`
        },
        {
          name: "Additional",
          description: `Additionally, a Seablooded may choose one of the following traits from the Zells’ trait list for their own: Echolocation, The Zellish Touch, Reistance to Disease`
        },
      ]
    }, {
      name: "Zell",
      tier: 3,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 1
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 2
      }
      ],
      characteristics: [
        {
          name: "Elvish Agelessness",
          description: "Elves reach physical maturity by the age of 20, much like Humans do. However, after that, their bodies’ aging process halts, so long as they retain their Focus."
        },
        {
          name: "Focus",
          description: `The Zells’ Focus is the Dream. They need to be members of a crew to be part of the Dream, and as long as they are members of a Dream, Zells do not age significantly past physical maturity. This effect does not stop the Zell’s ears from growing longer over time. Those in a Dream have a strong bond with one another, and have telepathic links with their crew. Those who leave their Dream begin to age normally, however.`
        },
        {
          name: "Autodirection",
          description: `A Zell will always be able to tell the direction of magnetic
north from their present position. Even when moved from
one position to another while unconscious, a Zell will be able
to estimate their position relative to a previous one with a
few moments of concentration. This is because Zells have an
organ in their brains that can gauge magnetic north naturally,
and keeps track of it even when they are asleep or unconscious. A sharp blow to the head may temporarily (1d10/2
hours) disable this ability as the organ reorientates itself.`
        },
        {
          name: "Zellish Dream",
          description: `The Dream is a sort of psychic connection that occurs between
Zells. It is a form of semi-voluntary communal bonding, the
trigger for which is simply spending a period of time on a
vessel on open water. When it takes root, the Zells begin to
share thoughts, become aware of each others’ well-being and
feelings, and perhaps more importantly, begin to hear the
thoughts of the ship itself, which is naturally drawn into the
bond. The Dream allows Zells to communicate non-verbally
over a distance of about a mile, and to communicate instructions to their ship (assuming it is a Zellislava). Being a member
of a Dream is the requirement for their Focus.
Becoming part of a Dream requires that two or more
Zells spend about a week as the sole occupants of any vessel.
Importantly, these Zells must at least agree on which of The
Seven Gods of Chaos has primacy. They do not need to be of
the same tribe or hold the same beliefs. Even Zells who
were raised on land with no contact with other Zells can
form crews by fulfilling these requirements. Zells that
are not part of a Dream may be incorporated into
a Dream by spending a similar amount
of time on the ship
with its crew.`
        },
        {
          name: "Zellislava",
          description: `Any ship that serves as the founding vessel for a Zellish
Dream (that is, the rowboat that Zells spend a week on to
merge their consciousnesses) becomes a Zellislava immediately. Alternatively, if a pre-established Dream of Zells
make up the primary crew of a vessel of any size for about
a year, that ship will gradually become a Zellislava over that
period. The Zellislava itself will be aligned to the member
of The Seven Gods of Chaos that the Zellish crew worship. A
Zellislava is a living ship that gradually grows and expands
from the framework of its original body, increasing evermore
in sophistication and complexity, and eventually gaining
moving components.`
        },
        {
          name: "Friends in Deep Places",
          description: `Zells in open water, either at sea, on inland oceans or large
lakes, have the peculiar ability to vanish into the depths, and
reappear at the nearest shore. This involves them emptying
their lungs, losing consciousness, and sinking into the deep.
Through a barely understood force (believed by the Zells
to be the machinations of their gods) the Zell will emerge
anywhere from a few hours to a month later on the nearest
coast, feeling reasonably well-rested, but hungry and sore.
Everything on their person, including objects held in all but
the most airtight containers, will be thoroughly soaked.
Additionally, anything that a Zell personally drops into
the ocean, intentionally or unintentionally, can be recovered
during the Zell’s time in the deep, but this requires a WIL roll
with an RS of at least 3, and possibly more if the item is very
heavy. Objects too large or heavy to be carried by one person
cannot be recovered.
If a Zell is somehow prevented from sinking while
attempting to use this ability, they do not vanish and reappear, but they also do not re-awaken until either released into
the deep, at which point the ability takes effect as normal, or
until they are pulled up to the surface, at which time they
awaken, confused and disoriented.
Regardless of the status of their Focus, a Zell does not age
while in this state, and fish and other animals will not eat or
even touch a Zell who is in this sort of stasis. Theoretically, a
Zell could spend centuries submerged in this manner…`
        },
        {
          name: "Echolocation",
          description: `A Zell’s ears are much more sensitive than that of a Human,
and Zells are capable of echolocation. By making small sounds
and listening to the echoes, Zells can form a very limited
picture of their surroundings without using their eyes.
So long as conditions are relatively quiet, a Zell can treat
even Pitch Dark lighting as Poorly Lit for the purposes of
movement, and even missile attacks. If the target of such
a missile attack has made a loud or audible noise, then this
improves to Dimly Lit. This also applies to blind Zells, who can
act as though the environment were Poorly Lit. See lighting
rules in Chapter 20: Adventuring on how this affects combat.
The range of this ability is generally 10 yards per point
of PER the Zell has. In a noisy (but not deafening) environment, it is 5 yards per point of PER, and in a deafeningly loud
environment it cannot be used at all. An interior muscular
reflex seals off the more sensitive parts of a Zell’s ears when
loud noises begin, so they rarely suffer significant damage
to their hearing, but echolocation is impossible in such an
environment.`
        },
        {
          name: "The Zellish Touch",
          description: `Zells always add their PER to their missile CP involving
any weapon with circular components. If this is compatible
with the Aim action’s PER bonus, the effects are cumulative.
Weapons that count for this rule include Zellish wheelbows,
wheellock firearms, throwing disks like frisbees, circular
sawblades, chakrams, and so on.`
        },
        {
          name: "Racial Glossophobia",
          description: `Zells have very keen senses of hearing, and this actually
proves a disadvantage when communicating verbally, because
the echoes of both their own and other voices makes it very
difficult to pick out small details like words and inflections.
As such, Zells often seem awkward, are prone to pausing in
conversation to ‘sift’ through the words they have just heard.
They also tend to prefer talking either very softly, or very
loudly, with little room in between. Zells suffer a -4 penalty
to CHA related tests involving communicating with others
verbally. This does not apply for Intimidation checks, or for
communicating with other Zells.`
        },
        {
          name: "Race of Sailors",
          description: `Zells gain a +2 bonus to Sailing tests. This bonus increases
to +4 if the boat being operated is a Zellislava. This bonus
decreases to -2 if the boat being operated is a Zellislava of a
Chaos God hostile to the Zell in question.`
        },
        {
          name: "Resistance to Disease",
          description: `Zells cannot contract some diseases, including any transmitted by insects or rats, and some vitamin deficiencies, like
scurvy. They also seem to be curiously immune to botulism.
Insects that touch a Zell’s bare skin generally die within five
or ten seconds depending on size.`
        },
        {
          name: "Strange Tastes",
          description: `Zells suffer a -2 penalty to PER to detect poison (or anything
else) in food or drink, because they have a dulled sense of
taste. They can barely taste salt, and they can’t taste sour
things at all. However, they may survive drinking seawater,
and cannot suffer nausea from smells or tastes, no matter
how vile.`
        },
      ]
    }, {
      name: "Burdinadin",
      tier: 3,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 1
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 1
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Elvish Agelessness",
          description: `Elves reach physical maturity by the age of 20, much like Humans do. However, after that, their bodies’ aging process halts, so long as they retain their Focus.`
        },
        {
          name: "Facts Over Feelings",
          description: `Burdinadin are naturally inclined to be very fact-oriented, and do not tend to take the emotions and sensibilities of others into account. This often makes them come across as strange at best and know-it-alls at worst.
      Burdinadin suffer a -2 to all Oration tests, and a -4 to all Persuasion and Subterfuge tests`
        },
        {
          name: "Focus",
          description: `The Burdinadin do not currently know what their Focus is, but so long as they are within the sanctuary of the Iron Glades or insulated while outside the Glade, they are protected from spirit contamination, and retain their Elvish Agelessness.`
        },
        {
          name: "Glade-Mandated Basic Education",
          description: `Iron Glades ensure that their citizens receive a level of basic education before they reach adulthood. Burdinadin start play with the Languages (1) and Literate boons, free of charge.`
        },
        {
          name: "Natural Philosophy",
          description: `So long as the Burdinadin is not suffering pain from spirit
contamination (see Sterile Soul) Burdinadin may make a
special Research test to discern the function, purpose, composition, and/or mechanics of any object, device or technology.
Instead of using just INT, Burdinadin adds PER and INT for
the skill pool calculation. This kind of check is omni-sensory,
utilizing sight, smell, touch, hearing, and even taste.
If the Burdinadin is allowed to disassemble and play with
the subject manually, a +4 bonus is gained to the Research test.
When used in this way, Natural Philosophy requires
time to study the object determined by the RS
of the test (see Table 5.2). After a successful
use of this ability to analyze something, any
Crafting rolls made to improve, redesign,
copy, forge, disable or otherwise take advantage of this knowledge gain a bonus equal to
the BS from the Natural Philosophy roll. The
same object can be analyzed multiple times,
but the Crafting bonus does not stack, only
the highest number of BS is used.
There is a cost to using this power. Every
hour that is spent using Natural Philosophy,
the Burdinadin must make a WIL test at
1 RS, +1 per hour they have already been
using the ability. If they fail, they attract
the attention of That Which Stares Back,
and begin suffering spirit contamination,
as when the Burdinadin is outside and uninsulated. Once this begins, the Burdinadin cannot break free of the trance, and thus the spirit contamination, until they make a WIL test at 1 RS, +1 per hour since That Which Stares Back has fixed its gaze upon them.`
        },
        {
          name: "Race of Engineers",
          description: `Burdinadin gain a +2 bonus to Engineering tests. This bonus increases
      to +4 if the task concerns Burdinadin devices and they have access to tools of Burdinadin
      manufacture. Additionally, Burdinadin never count as being Untrained in Engineering.`
        },
        {
          name: "The Stains of Time",
          description: `The Burdinadin can see trails of causality through the air
before them when in tense situations, much as Humans
see strange patterns on the insides of their eyelids after
looking at bright lights. Unlike the Human visions, which
are thoroughly ignorable traces of dying cells on the cornea,
the Burdinadin’s visions are glimpses of the future, brought
forth by their ability to gaze into the interior mechanics of
the universe’s functions.
So long as a Burdinadin is not suffering from spirit
contamination (see Sterile Soul) and is not suffering more
than Light encumbrance, the TN of all Void and Parry maneuvers is reduced by 1.
Additionally, The Stains of Time allows Burdinadin to Void
or Parry missile attacks from firearms.`
        },
        {
          name: "Sterile Soul",
          description: `The Burdinadin cannot handle contact with the outside world,
and all of its spirit contamination, without
proper insulation. If a Burdinadin
is ever outside an Iron Glade
without a protective suit or
other means of insulation,
he will suffer spirit contamination. The environmental
factors and spirit contamination formula for Sterile Soul
is described in Chapter 17:
Burdinadin Armory, where you
will find protective suits to mitigate spirit contamination.
For every point of spirit contamination suffered, the Burdinadin
must reduce their maximum combat
pool (CP) by 1, and reduce their skill
pool (SP) by 1.
 If their spirit contamination exceeds
their HLT + WIL, they must make a WIL
test at 3 RS or die, as their nervous system
is systematically dismantled by aggressive
spirits. This test must be performed once per
minute so long as the Burdinadin remains in
a contaminated environment, and their spirit
contamination exceeds their HLT + WIL.
If the Burdinadin finds shelter in a sterile location,
or is moved to a safe place after suffering spirit contamination, the contamination will fade at a rate of 8 points
per hour.
While recovering from spirit contamination in a
sterile environment, the WIL test must be performed
once per hour until the spirit contamination is less
than their HLT + WIL. `
        },
        {
          name: "Silver Spoon",
          description: `Burdinadin gain an additional 10gp to purchase equipment from the Burdinadin Armory during character creation. Any unspent money is lost. Not affected by the Rich or Poor boons/banes.`
        },
      ]
    }, {
      name: "Ohanedin",
      tier: 3,
      attributeMods: [{
        name: 'Strength',
        value: 1
      },
      {
        name: 'Agility',
        value: 1
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 1
      }
      ],
      characteristics: [
        {
          name: "Elvish Agelessness",
          description: `Elves reach physical maturity by the age of 20, much like
Humans do. However, after that, their bodies’ aging process
halts, so long as they retain their Focus. `
        },
        {
          name: "Focus",
          description: `To preserve their immortality, Ohanedin must obey the
mandates of their patron spirits. Never clothing themselves in metal (metal weapons are acceptable, as long as
the Ohanedin doesn’t actually have to touch the metal part),
never betraying an oath freely given, and never eating meat
from animals that cannot speak, are the three basic prerequisites, however many have significantly more. Due to the
complexity of the Ohanedin Focus, it is broken down into its
individual qualities below.
An Ohanedin that breaks the laws of consumption (eating
the flesh of an animal that cannot speak) will violently regurgitate its meal, and will lose access to Natural Awareness and
Rules of Nature for the next 24 hours.`
        },
        {
          name: "Metallophobia",
          description: `Ohanedin have a particularly rigid Focus, particularly when
it comes to metal. Wearing metal covering the torso inflicts
8 pain on an Ohanedin for as long as it is worn. Wearing it
on the head inflicts 10, whereas the limbs only inflict 4 each.
Wielding a weapon made of metal inflicts no pain, unless that
metal is part of the grip that must be touched. A wood grip
can insulate an Ohanedin from this effect, but cloth, leather
or similar materials do not.
Of course, the Ohanedin also age so long as metal is in
contact with their flesh, as its Focus is being denied, and
the Ohanedin cannot use his Natural Awareness or Rules of
Nature powers either.
Injuries inflicted by metal weapons do not inflict additional pain, but any missile made of metal that has a Stuck
Chance inflicts 2 additional pain on a successful wound if the
missile becomes Stuck.
When grappling with someone wearing metal armor, an
Ohanedin suffers 8 stun per move he remains grappling.
Grabbing onto something made of metal, say to climb it or
to avoid falling, requires a WIL test at 4 RS to avoid letting
go out of shock.`
        },
        {
          name: "Focus Oaths",
          description: `An Ohanedin who gives his word freely is compelled to keep it,
until such a time as he fulfils his promise, or the compact is
broken by the other party. An Ohanedin who breaks his oath
loses Focus for a year and a day, and is no longer immortal,
and does not benefit from Natural Awareness or Rules of
Nature. The Ohanedin does retain access to his Murderous
Speed ability, and is also still vulnerable to Metallophobia, as
well of course as still suffering from Unusual Bone Anchors,
as that is a matter of musculature and not supernatural in any
way. This period can be cut short if the individual to whom
he made the broken oath names a penance for him that is
deemed acceptable by the spirits (this is a fine art, and the
rules are not clear to anyone, even the highest wisemen of
the Ohanedin) which the guilty party then fulfils. A common
penance is for the Ohanedin to cut off one of their own fingers,
another is to agree to serve the offended party for ten years`
        },
        {
          name: "It's an Animal Thing",
          description: `Ohanedin start play with the Animal Affinity (2) boon free of charge.`
    },
        {
          name: "Natural Awareness",
          description: `An Ohanedin is automatically aware of any wounded or
frightened life forms within 100 yards of it in any natural
(non-urban) environment. This awareness is accurate to
an area of about 10 yards, at which point it cannot pinpoint
it any further. This ability does not work on other Ohanedin,
or creatures with the Undead descriptor. Ohanedin lose this
ability while their Focus is lost.`
        },
        {
          name: "Unusual Bone Anchors",
          description: `Ohanedin have stronger bone anchors than Humans do,
and their muscles are also denser, and better at explosive,
powerful movements. This makes them physically stronger
than Humans, while still remaining sleek and agile, but
they have poorer fine motor skills, which makes it difficult
for them to do things like writing, or operating fine devices.
Ohanedin suffer a -4 penalty to tasks that require a high
degree of manual finesse, like lockpicking or operating intricate machines. Their handwriting is also terrible. It is for this
reason that the Ohanedin written language is mostly made
up of large, straight lines.`
        },
        {
          name: "Murderous Speed",
          description: `Ohanedin at rest are nearly motionless. There are no nervous
tics, no ‘tells,’ and no involuntary flinches. They move like
spiders, from perfect stillness to rapid, explosive movements
in the blink of an eye.
In the orientation declaration stage of combat, Ohanedin
do not have to declare which orientation they are not
throwing.`
        },
        {
          name: "The Feeling Disappears",
          description: `The Ohanedin’s spirit senses, much like their Burdinadin
cousins, offer them an unusual insight into the world around
them and an ability to sense events before they occur. Unlike
the Burdinadin, however, the Ohanedin are not fettered by
their need to avoid spirit contamination. To the contrary, it
is through the spirits that this power is achieved.
As long as an Ohanedin currently has Focus, the TN of all
Void and Parry maneuvers is reduced by 1, and their missile
defense is increased by 2.
Additionally, The Feeling Disappears allows an Ohanedin to
Void or Parry missile attacks from firearms.`
        },
        {
          name: "Rules of Nature",
          description: `The Ohanedin have a delicate relationship with their patron
spirits, and it is possible to offer up their own life-force for
consumption in return for victory. This often results in blood
forcing its way out of the eyes, ears, mouth and other orifices,
but the sheer power granted in return is worth any sacrifice.
An Ohanedin may choose, when declaring an attack that
inflicts damage, to add their WIL score to the amount of
damage dealt. Doing so will immediately reduce the Ohanedin’s HLT
by 1, which recovers as HLT does
after bleed.`
        },
        {
          name: "Secret Ingredient",
          description: `Ohanedin receive a +2 bonus to Cooking tests made while using
      meat ingredients derived from speaking animals (Whales and parrots are allowed, mimes are not).`
        },
      ]
    }, {
      name: "Vampire",
      tier: 3,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 2
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Godless",
          description: `A Vampire is not psychologically capable of believing in anything larger than himself, or in any loyalty or purpose larger than the individual. Vampires cannot benefit from the Belief Arc, much as Complete Monsters cannot. Unlike the Complete Monster Bane, however, a Vampire is not necessarily totally devoid of empathy--they simply cannot commit to greater ideas, and find conceptsnotions of community, religion and ideology to be, at best, a confusing notion.`
        },
        {
          name: "Red Feast",
          description: `Vampires can consume blood by biting their victims, or by drinking it out of containers, etc. This inflicts Bleed 20 on the victim, which remains so long as the Vampire drinks. For each point of HLT lost (equivalent to 2 pints of blood) the Vampire gains one “Point” worth of Blood, a Blood Point. A Vampire can store 12 Blood Points (about 24 Pints) in its body for later usage. Once a character reaches 0 HLT, they die, and the Vampire can glean no further blood from them. An average human has about 9-12 pints of blood.

A victim bitten in this way suffers from terrible hallucinations during this process, and must make a WIL test at RS 4 to take any action while suffering Bloodloss from this ability. The hallucinations often take the form of terrible darkness, great eyes staring out of the cosmos, and shrill, all-consuming screaming (or is it laughter?) from a thousand inhuman throats. Othertimes, the hallucinations are intensely pleasurable and relaxing--this seems to depend on the vampire’s attitude during the feeding.

Any kind of mammalian blood will serve this ability, but non-sentient blood from animals like dogs, cows, etc. only has half the normal Blood Point value.

Human beings or Din who are killed as a result of this feeding will rise as Vampires exactly 24 hours after their hearts cease to beat.
`
        },
        {
          name: "Blood Requirements - Starvation",
          description: `A Vampire's spends the majority of its time in a sort of dormant state, conserving the blood he has and  during which time his supernatural abilities are not active, and he suffers a -2 penalty to all Attributes. Spending a Blood Point will restore these to full dice for 24 hours. A Vampire may spend a point of Blood at any time, but it takes a full minute for their abilities to come into effect. Vampires do not strictly speaking need blood in order to live (if they are even alive at all) but a bloodless existence is not pleasant for them--they tend to feel lethargic, irritable, anxious and vulnerable.
The state of a Vampire that is not presently using Blood to operate at full capacity is called “Starved.”
`
        },
        {
          name: "Creatures of the Night",
          description: `Animals will not normally attack or willingly come close to Vampires, as they can detect their alien nature and find them discomforting. Animals which remain in close contact with a Vampire for 2-4 months will eventually grow used to them and potentially trust them.`
        },
        {
          name: "Hypnotism",
          description: `When not Starved, a Vampire or Star Vampire making eye contact with and speaking to a sentient being can cause them to act more favorably towards them, as though they were a friend. The Vampire can simply induce an individual with whom he can make eye contact to obey and simple or reasonable request. They must make a WIL Test at RS 2 or obey that request. By expending one Blood Point, however, the Vampire can make an opposed Willpower Test against the target. If the Vampire is successful, the Target must obey the Vampire so long as they retain eye contact, which they will do unless told to do otherwise. Vampires do not normally blink, but having the eye contact disrupted for even a second would break the spell.
Vampires must be able to make eye contact with the target in order for this ability to work. If a target successfully resists the ability, they will be immune to it from any Vampire for a year and a day.
`
        },
        {
          name: "Blood-Charged Form",
          description: `A Vampire or Star Vampire that is not Starved may spend an additional point of Blood to gain a +2 bonus to all physical Attributes for one hour. During this time they take on a monstrous appearance as their skin draws back, exposing their fangs, elongating their fingers into talons, and giving them a hideous skeletal look.
This ability may not be used multiple times to increase Attributes beyond +2.
`
        },
        {
          name: "Sunlight",
          description: `A Vampire exposed to direct sunlight will immediately erupt into flames. This may be limited to specific body-parts exposed, but will always destroy instantly the part exposed to the sun. However, it is important to understand that this is not a result of sunlight or photons or solar radiation being fatal to a Vampire. Rather, the Sun itself hates Vampires, and will annihilate them with its divine power wherever it notices them. Sunlight is merely the Sun’s vision. A Vampire that can conceal itself from the sun, even if small parts of it are theoretically exposed to reflected light, will be safe from this threat.`
        },
        {
          name: "Regeneration",
          description: `Vampires heal Wounds at a rate of 1 Wound Level per day, so long as they are not Starved. Otherwise, they do not heal at all.
If in Full Form, a Vampire may spend 2 Blood Points to reduce all wounds by 1 level. This process takes 1 Round, and the Vampire cannot move while healing in this way.
Regenerating a lost limb, eye or other body part requires an expenditure of 10 Blood Points.
Vampires injured too greatly to move or act but who are not technically killed are simply rendered inert, and will enter a state of semi-conscious delirium as they wait for some happenstance or opportunity for them to imbibe blood with which to heal themselves.
`
        },
        {
          name: "Vampiric Anatomy",
          description: `Vampires cannot suffer Pain* from wounds. Stun is always halved for Vampires. They cannot suffer from Infection,  and cannot suffer death or Instant-Death with four exceptions:
- Decapitation
- Destruction of the brain
- Piercing of the central blood-sac of their body (located in the chest, Level 5 Wound) with a Wooden or Silver weapon object
- Burning of the body until death

Vampires cannot suffer from sickness, poison, radiation, or other forms of bodily harm from chemicals or energies that do not directly destroy the body. Fire and acid still work normally, for example.
Vampires can suffer Bleed, but Vampires do not lose HLT as normal if they fail Bleed Rolls, they instead lose 1 Blood Point per HLT that would be lost. Vampires cannot perish from Bleed, they can only run out of Blood Points.
*Weapons made of Silver (this includes Silversteel) do inflict Pain on Vampires as normal, which is reduced by the Vampire’s Willpower score.
Burn damage also inflicts Pain on Vampires as normal, which is reduced by the Vampire’s Willpower score.
Vampires that are killed immediately crumble into piles of powdered carbon, resembling ash.
`
        },
        {
          name: "Vampiric Weaknesses",
          description: `Vampires have a number of weaknesses.
1: They find the sight and proximity of religious symbols to be physically painful, akin to the sensation of burning alive. A Vampire suffers 20 Pain if within eyesight of a religious symbol. A Vampire may spend 6 Blood Points to cause any normal (man portable, non-magical) religious symbol in eyesight of them to erupt into flames and burn, melt, or disintegrate. This weakness only applies if the Vampire is aware that the object is a religious symbol--if the Vampire doesn’t recognize it, it does not count. The definition of a religious symbol in this context would be “an object, device, sign or symbol which

2: They detest plants with very strong smells, as their bodies refuse to process vegetable matter. Garlic is the stereotypical example, but onions, cabbage, a strong mustard, or even flowers all apply as well. A vampire cannot ingest Blood if the smell of vegetable matter is strong in the surroundings presently.

3: A Vampire can be instantly killed if it suffers a level 5 wound to the chest with either a wooden or silver spike. This includes arrows, crossbow bolts made of wood, swords or other weapons made of Silversteel, etc. Silver bullets also work.

4: Holy water, oil, or similar chemicals burn Vampires like boiling oil or burning sand burns humans (see burning rules for more details.) These wounds are the only sort which will leave actual scars on a Vampire.

5. Vampires always count as Enemies of Genosus for the purposes of Judgement. All Ascendants can detect Vampires on sight subconsciously.

6. Drinking the blood of a Zell causes a Vampire to immediately regurgitate every drop of blood they currently store, reducing them to 0 Blood Points and preventing them from acquiring more for at least an hour, until the nausea wears off. This is because the Zellish anatomy evolved to combat parasitic organisms, and their chemistry includes toxins which are even harmful to Vampires.
`
        },
      ]
    }, {
      name: "Orredin",
      tier: 4,
      attributeMods: [{
        name: 'Strength',
        value: -1
      },
      {
        name: 'Agility',
        value: 0
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: -2
      },
      {
        name: 'Willpower',
        value: 2
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 2
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Beautiful",
          description: `Always have the Beautiful Minor boon (can buy Beautiful Major at difference in cost`
        },
        {
          name: "Elvish Agelessness",
          description: `Elves reach physical maturity by the age of 20, much like
Humans do. However, after that, their bodies’ aging process
halts, so long as they retain their Focus.`
        },
        {
          name: "Focus",
          description: `Like all Din, the Orredin have a Focus which allows them to remain ageless and immortal. The Orredin focus is to simply be in a Warren with 50 or more Sorcerous Flow. The Flow can be utilized by devices or spells, so long as it is there, any Orredin in that Warren has Focus. Alternatively, consuming (usually drinking a solution of) about a teaspoon of powdered magestone (typically costing 10 gp)  will satisfy an Orredin's Focus for a year.`
        },
        {
          name: "Apotheosis",
          description: `Orredin have a special pool of points called Gnosis. Each point of Gnosis is a point of extra Flow that an Orredin has available to him regardless of what Warren they are in. Gnosis moves with the Orredin, and can be used, occupied etc. just like normal Flow, except that it can only be used by the Orredin themself.
Gnosis can also be spent to activate Bloodline Abilities. Doing this temporarily “spends” the Gnosis points, which cannot be used for Flow or other purposes until they return. Gnosis regenerates (up to the Orredin’s Gnosis Cap) at a rate of 1 Gnosis per [30-Willpower] minutes.
An Orredin starts with 1 Gnosis, and can increase their Gnosis cap in the following ways:
-An Orredin may spend 15 Arc Points to increase his Gnosis Cap by 1. Only 5 Gnosis can be gained in this manner.
-Consuming (usually drinking a solution of) two and a half tablespoons (about 100 gp worth) of Magestone will increase an Orredin's Maximum Gnosis by 1. Only 5 Gnosis can be gained in this manner.
-Absorbing energy from certain ancient relics, powerful artifacts and rare devices will increase an Orredin's Maximum Gnosis by 1. Only 10 Gnosis can be gained in this manner.
`
        },
        {
          name: "The Godhead is a Spring",
          description: `Every Orredin is at least a Minor Sorcerer, and is considered to have 1 points in the Magic Category devoted to Sorcery. The level can be increased with additional expenditure in the Magic Category at Character Creation.`
        },
        {
          name: "From it Flows Everything",
          description: `Each Orredin in a Sorcerous Warren increases the Flow value of that Warren by 2, and of all adjacent Warrens by 1.`
        },
        {
          name: "And then returns once more, and so is like a Spring",
          description: `All Orredin have a Bloodline Power that can be selected from the list below. Additional powers can be purchased in the Magic category at Character Creation. These are just examples. Confer with your GM about personalized Bloodline Powers that may fit your character better.`
        },
      ]
    }, {
      name: "Star Vampire",
      tier: 5,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 2
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Godless",
          description: `A Vampire is not psychologically capable of believing in anything larger than himself, or in any loyalty or purpose larger than the individual. Vampires cannot benefit from the Belief Arc, much as Complete Monsters cannot. Unlike the Complete Monster Bane, however, a Vampire is not necessarily totally devoid of empathy--they simply cannot commit to greater ideas, and find notions of community, religion and ideology to be, at best, a confusing notion.`
        },
        {
          name: "Red Feast",
          description: `Vampires can consume blood by biting their victims, or by drinking it out of containers, etc. This inflicts Bleed 20 on the victim, which remains so long as the Vampire drinks. For each point of HLT lost (equivalent to 2 pints of blood) the Vampire gains one “Point” worth of Blood, a Blood Point. A Vampire can store 12 Blood Points (about 24 Pints) in its body for later usage. Once a character reaches 0 HLT, they die, and the Vampire can glean no further blood from them. An average human has between 9-12 pints of blood. A victim bitten in this way suffers from terrible hallucinations during this process, and must make a WIL test at RS 4 to take any action while suffering Bloodloss from this ability. The hallucinations often take the form of terrible darkness, great eyes staring out of the cosmos, and shrill, all-consuming screaming (or is it laughter?) from a thousand inhuman throats. Othertimes, the hallucinations are intensely pleasurable and relaxing--this seems to depend on the vampire’s attitude during the feeding.

Any kind of mammalian blood will serve this ability, but non-sentient blood from animals like dogs, cows, etc. only has half the normal Blood Point value.

Human beings or Din who are killed as a result of this feeding will rise as Vampires exactly 24 hours after their hearts cease to beat.
`
        },
        {
          name: "Blood Requirements - Starvation",
          description: `A Vampire's spends the majority of its time in a sort of dormant state, conserving the blood he has and  during which time his supernatural abilities are not active, and he suffers a -2 penalty to all Attributes. Spending a Blood Point will restore these to full dice for 24 hours. A Vampire may spend a point of Blood at any time, but it takes a full minute for their abilities to come into effect. Vampires do not strictly speaking need blood in order to live (if they are even alive at all) but a bloodless existence is not pleasant for them--they tend to feel lethargic, irritable, anxious and vulnerable.
The state of a Vampire that is not presently using Blood to operate at full capacity is called “Starved.”
`
        },
        {
          name: "Blood-Charged Form",
          description: `A Vampire or Star Vampire that is not Starved may spend an additional point of Blood to gain a +2 bonus to all physical Attributes for one hour. During this time they take on a monstrous appearance as their skin draws back, exposing their fangs, elongating their fingers into talons, and giving them a hideous skeletal look.
This ability may not be used multiple times to increase Attributes beyond +2.`
        },
        {
          name: "Dark Swarm",
          description: `A Vampire that is not Starved can summon a swarm of shadowy, immaterial forms out of the ether to swarm an opponent, blinding and confusing them. The shapes range from dark grasping hands to skulls, formless tendrils, and even alien, winged shapes similar to bats--when used offensively, they tend to take the forms of their target’s greatest fears and insecurities. This counts as a Blind Toss Maneuver, but with -1 TN. This ability has no Blood cost.`
        },
        {
          name: "Wisp",
          description: `A Star Vampire that is not Starved may vanish and reappear an instant later into a cloud of dark smoke and spectral stars (or are they eyes?). The Vampire will be “gone” for about half of a second, and cannot see what is happening around itself until it reappears. The Vampire can reappear up to 5 yards from its current position, or may spend a Blood Point to appear up to 50 yards away.
This can be done in Combat. It counts as an Outmaneuver or a Flee Maneuver at -2 TN.
A Vampire cannot perform this ability if it is in within eyesight of a mirror or mirror-like object. (Not any reflective surface will suffice, it must be a mirror large and sufficiently reflective enough that the Vampire could look at it casually and see its reflectivity.) Star Vampires also cannot use this ability to cross running water, or to enter the dwelling of any being unless he has been invited inside.`
        },
        {
          name: "Creatures of the Night",
          description: `Animals will not normally attack or willingly come close to Vampires, as they can detect their alien nature and find them discomforting. Animals which remain in close contact with a Vampire for 2-4 months will eventually grow used to them and potentially trust them.`
        },
        {
          name: "Spiderclimb",
          description: `A Vampire that is not Starved may walk, crawl or climb on any surface as though it were a spider or gecko, adhering to surfaces through unnatural means.`
        },
        {
          name: "Hypnotism",
          description: `When not Starved, a Vampire making eye contact with and speaking to a sentient being can cause them to act more favorably towards them, as though they were a friend. The Vampire can simply induce an individual with whom he can make eye contact to obey and simple or reasonable request. They must make a WIL Test at RS 2 or obey that request. By expending one Blood Point, however, the Vampire can make an opposed Willpower Test against the target. If the Vampire is successful, the Target must obey the Vampire so long as they retain eye contact, which they will do unless told to do otherwise. Vampires do not normally blink, but having the eye contact disrupted for even a second would break the spell.
Vampires must be able to make eye contact with the target in order for this ability to work. If a target successfully resists the ability, they will be immune to it from any Vampire for a year and a day.
`
        },
        {
          name: "Sunlight",
          description: `Star Vampires are not harmed by sunlight in the way that conventional Vampires are, but instead count as being Starved when in contact with direct sunlight, and cannot use their Star Vampire powers.`
        },
        {
          name: "Regeneration",
          description: `Vampires heal Wounds at a rate of 1 Wound Level per day, so long as they are not Starved. Otherwise, they do not heal at all.
If in Full Form, a Vampire may spend 2 Blood Points to reduce all wounds by 1 level. This process takes 1 Round, and the Vampire cannot move while healing in this way.
Regenerating a lost limb, eye or other body part requires an expenditure of 10 Blood Points.
Vampires injured too greatly to move or act but who are not technically killed are simply rendered inert, and will enter a state of semi-conscious delirium as they wait for some happenstance or opportunity for them to imbibe blood with which to heal themselves.`
        },
        {
          name: "Star Vampire Weaknesses",
          description: `Star Vampires have a number of weaknesses.

1: They detest plants with very strong smells, as their bodies refuse to process vegetable matter. Garlic is the stereotypical example, but onions, cabbage, a strong mustard, or even flowers all apply as well. A vampire cannot ingest Blood if the smell of vegetable matter is strong in the surroundings presently.

2: A Star Vampire can be instantly killed if it suffers a level 5 wound to the chest with either a wooden or silver spike. This includes arrows, crossbow bolts made of wood, swords or other weapons made of Silversteel, etc. Silver bullets also work.

3. Star Vampires always count as Enemies of Genosus for the purposes of Judgement. All Paladins can innately sense that there is something wrong with a Star Vampire, but they cannot automatically discern their true nature unless they are in their Blood Charged form.

4. Drinking the blood of a Zell causes a Star Vampire to immediately regurgitate every drop of blood they currently store, reducing them to 0 Blood Points and preventing them from acquiring more for at least an hour, until the nausea wears off. This is because the Zellish anatomy evolved to combat parasitic organisms, and their chemistry includes toxins which are even harmful to Vampires.
`
        },
        {
          name: "Spurn the Earth, Consume the Stars",
          description: `If a Star Vampire is “killed” by a means other than one of its weaknesses or an Ascendant’s Judgement, it will, instead of truly perishing, transform back into the true form of the Star Vampire--a hideous morass of tentacles, polyps, and coral-like tubes.

Upon returning to its true form, a Star Vampire's only conscious goal can be to return to the Sky, smashing through the roof or simply flying straight upwards as quickly as possible. If it is somehow sealed underground or in a container it cannot easily break through or is otherwise contained, the Vampire will perish after about ten seconds. This will prevent any further reincarnation of the Star Vampire. These forms are not fully “matter” in the conventional sense, and cannot be injured through conventional means.

A Star Vampire who is forced to escape into the sky this way will return after a year and a day, reborn into the world fully restored but lacking any memory of the intervening events.
`
        },
        {
          name: "Infecting Mortals",
          description: `Star Vampires are born beyond the limits of the sky, and are not created out of human stock, as is commonly believed by mortals. However, they are capable of creating lesser versions of themselves out of mortal creatures, including humans, Din, and even (it is speculated) goblins.

Any being (with certain exceptions) who is drained of all blood by a Star Vampire and killed will arise as a regular Vampire at the next moonrise after their death. This will increase their Attributes as-per the Vampire profile, and force upon them the many curses and benefits of being a Vampire.

Only sentient races may be resurrected as Vampires.
Dwarves Zells, and Seablooded cannot become Vampires, they simply perish if drained to death by a Vampire.
Ascendants cannot be resurrected as Vampires, and drinking an Ascendant’s blood causes a Star Vampire to erupt into flames, inflicting damage as-per Boiling Oil to the head.
`
        },
      ]
    }, {
      name: "Sarturi Chosen",
      tier: 5,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 0
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Give unto Sartur…",
          description: `The Chosen gains Divinity in the following ways:
 Killing people. Divinity equal to the slain character’s
HLT score per Human killed, unless they were: pregnant
women, children, or those sworn to peace or poverty.
Killing such a person (or even being party to their death)
instead costs the Chosen 10 Divinity.
 Killing domesticated animals. 1 Divinity per 100 lbs that
the animal weighs (animals lighter than 100 lbs provide
no Divinity.)
 Making people bleed in combat. Every time anyone within
50 feet of a Sarturi fails a bleed test from wounds inflicted
by the Sarturi, the Sarturi gains Divinity equal to the
number of HLT points lost.
 Being injured. A Sarturi who suffers any cutting or piercing
damage in legitimate battle (practice or self-inflicted
wounds don’t count) gains Divinity equal to the level of the
wound (this Divinity cannot be used to negate the wound
that provided it with the Not Today! ability).
 Suffering bleed. If a Sarturi fails a bleed test, he gains
Divinity equal to 2x the HLT points lost.`
        },
        {
          name: "From the Depths to the Soil",
          description: `The Chosen have the ability to spend Divinity to enrich the
soil and life of an area. This can cause the accelerated growth
of plant life, the restoration of health to flora and fauna alike,
and the elimination of pollution. At base, wherever a Chosen
steps, dead plant matter quickly and visibly rejuvenates (if it’s
in season) and no animal kept in close proximity to a Chosen
will ever grow sick.
By spending Divinity, the Sarturi can cause a larger area to
burst into health and life. Flowers, water-lillies, reeds, grass,
Chapter 5: Races
46
whatever the appropriate life for the area will erupt from the
soil instantly, even in the middle of winter or the depths of a
wasteland. Any crops properly planted in this land will grow
to their full potential no matter the rain or cold, no animals
raised and grazed on this land will grow sick or die except
through external influence, and trees will grow at ten times
their regular speed. Even the weather will be milder and
better for crops and pastoralism here, even if it is horrible
all around the area.
The effect of this ability lasts for 1 month per Divinity
spent, so a 1 Divinity expenditure improves 1 square yard for
1 month. A 5 Divinity expenditure improves 10,000 square
yards for 5 months. Past 5 Divinity, the size of the area no
longer increases, but the duration does. So 300 Divinity will
improve a 10,000 square yard area for 300 months, or about
25 years.
Every time a member of a Sarturi Chosen’s Band (see
below) is killed, the Sarturi may activate this ability, centered
on his dead companion, rather than himself, as though it had
been activated with 1 Divinity. This has no cost.`
        },
        {
          name: "A River of Blood",
          description: `A Chosen may spend 4 Divinity to increase his STR by 1 for
one hour. He may do this multiply times to increase his STR
up to his current HLT. STR can also not be raised beyond 13 by
any means. Sarturi grow visibly more muscular and powerful
as they use this ability, then deflate down to their regular
size as it wears off. `
        },
        {
          name: "Not Today!",
          description: `Sarturi Chosen are held together by more than muscle and
sinew. When they sustain injuries, their flesh can be made
to close immediately upon being sustained, and blood will
visibly contract back into the body before the wound closes.
The process is not even truly painful to them.
Any time a Chosen would sustain a wound, they may
instead spend 2 Divinity per level of the wound to negate
it immediately. They still suffer half the stun, but none of
the pain of the wound, and of course, no bleed. Missiles and
weapons Stuck inside of them will be expelled instantly and
irresistibly—quite forcefully in fact. If the bearer of a spear
planted deep in a Sarturi’s breast attempts to keep it there, he
may even be shoved back several feet.
If inside an area under the effects of From the Depths to
the Soil, this ability costs 1 Divinity per level of the wound
instead of 2`
        },
        {
          name: "Band of Blood",
          description: `Before a battle, any companion of the Chosen may don a
bandana stained with the Chosen’s blood. If they do so, they
are considered part of that Chosen’s ‘Band’ until they remove
the bandana. The bandana cannot be removed by any means
except the wearer or the Sarturi’s will. A member of the Band
gains the following bonuses:
 +2 CP;
 Ignores the first 2 points of pain suffered; and
 Any time bleed is inflicted or suffered, increase the amount
of bleed gained by 3.
Whenever a member of a Sarturi Chosen’s Band is killed, all
remaining members of the Band recover from fatigue, and
benefit from the effects of Not Today! As though it had been
used with 2 Divinity. The Chosen gains 2 CP up to a maximum
of 2x his WIL for 24 hours, and 1 Divinity.
If the Chosen is killed, every member of the Band will
suffer 5 bleed per Turn until they take off the bandanas as
blood beguns to erupt from the nose and mouth.`
        },
        {
          name: "Sartur Hungers!",
          description: `Wounds just seem to want to bleed more when a Chosen is
on the battlefield. Any cutting or piercing damage inflicted
within 100 yards of a Sarturi suffers 1 additional bleed. This
does not go away if the sufferer leaves the vicinity of the
Chosen.`
        },
        {
          name: "No Hard Feelings",
          description: `If a Sarturi Chosen is killed in battle, whoever struck the
finishing blow gains a number of Glory arc points equal to
the total Divinity the Sarturi has, plus the amount spent in
the last 24 hours.`
        },
      ]
    }, {
      name: "Genosian Paladin",
      tier: 5,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 0
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Genosian Ideal",
          description: `Paladins cannot begin play with any sort of bane that would
physically cripple them, such as Scars, missing limbs, old
wounds, lasting pain, lost eyes, brain damage, and so on
(though being tall or short, fat or skinny is acceptable). These
banes can be gained during play, but cannot normally occur
at Character Creation.
At the GM’s discretion, a Paladin may have acquired an
injury during his career after emerging from the
gate, and so may have one or more of these
banes, but the cost of the bane is
halved for the purposes of
B&B points. For the purposes of Healing (Paladin ability, explained below)
or other requirements, the cost of the bane counts as normal.
Paladins cannot be Complete Monsters, because they must
have a Faith arc in order for them to become Ascendants.`
        },
        {
          name: "Glory, Amen",
          description: `Paladins gain Divinity in the following ways:
 Successfully using Smite to destroy something evil gains
the Paladin between 1 and 10 Divinity (depending on
seriousness of a threat, with 1 being a minor evil like
an arsonist or a madman who hates roads, and 10 being
an existential crisis to Genosism, like a demon bent on
destroying the world.)
 Spending a full day engaging in honest labor gains the
Paladin 1 Divinity.
 Organizing the honest labor of good Genosians (or potential converts) for a full day gains the Paladin between 1
and 3 Divinity.
 If an infidel genuinely converts to Genosism because of the
Paladin’s words or actions, he gains 1 Divinity.
 Killing any sort of infidel, heretic or apostate whose has
deliberately set themselves against Mighty Genosus, his
people, or his church(es) gains the Paladin between 1 and 5
Divinity depending on the severity of their crimes (1 being
a peasant who abandoned the faith out of frustration, 5
being a prominent priest who defected to Chaos Worship
or worse).`
        },
        {
          name: "Smite",
          description: `A Paladin can channel the power of Genosus through any
weapon—even his own hands—to strike the enemies of his
God with terrible vengeance. When a Paladin performs a
melee maneuver that inflicts damage (such as Swing and
Thrust, though Shoot and Melee Shoot do not count) he may
also declare that he is performing Smite.
If the attack hits, in addition to any damage from the
attack itself, Smite inflicts burn damage not just on the hit
location, but on all hit locations in the Target Zone. So, if a
Paladin uses Smite and strikes an opponent, aiming for the
lower arm target zone, and hits the victim on the hand hit
location, the victim’s elbow, forearm and hand all erupt into
flames. Smite’s burn damage is X/TN 5, 3
rounds. X is the Paladin’s WIL score.
Smite will not work on just any target.
The target must be one who is an enemy
of Genosus and Genosism, who has somehow
threatened, wronged, or attacked Genosians... or
someone who has mocked Genosus, Genosian teachings, or the divine works of Genosus. In short, it
must be someone Genosus would want dead. How they
feel about or view themselves, or how they justify
their actions, has no bearing on the effect of Smite.
If Smite is performed on an innocent person, not only does
the attack not inflict burn damage, but the Paladin loses 3
Divinity immediately.
If a target struck by Smite perishes as a result of the
attack (either the fire or the raw damage) the Paladin gains
an amount of Divinity based on how great of a threat the
victim was (see Glory, Amen). This is generally between 1 and
10, with 1 being a common criminal, and 10 being a threat to
the entirety of Genosism.`
        },
        {
          name: "Shield of Dawn",
          description: `Paladins are protected by the will of Genosus, the
Indefatigable Sun. This extends to the point that missiles
flung at them seem to be slowed by the very light itself.
Paladins gain AV versus missile attacks and explosions
(this counts as cover AV) of all varieties so long as they are in
contact with light. The amount of AV they gain depends on
the intensity of the light they are exposed to.
If there is no light to be had, the Paladin can spend 1
Divinity to produce radiance of their own light equivalent to
Dimly Lit for a span of about ten seconds.`
        },
        {
          name: "Healing",
          description: `A Paladin can use Divinity to work the miracle of healing on
the wounded or the sick. They can even, in extreme cases,
restore destroyed limbs, cure blindness, and even madness.
Spending 1 Divinity per level of the wound will heal, over
the course of a few seconds (in combat, one round for each
level of the wound) and halt the bleeding until it is healed.
The Paladin must remain in contact with the wounded party
for this entire time. The wound is not reduced over time, but
is entirely removed when the healing process is complete.
A Paladin can heal himself at double this speed (one round
per two levels of the wound) and can continue taking other
actions as he does so. A Paladin’s Healing Touch is doubly
effective against burn wounds, with each point of Divinity
curing two wound levels.
A Paladin can cure most diseases with 1 to 3 Divinity
(with 1 being for a cold, and 3 being The Red Death) by praying
for several moments, and then slapping the subject on the
side of the head. If it doesn’t hurt, it doesn’t count.
Injuries that involve a bane (a lost eye, a severed limb, a
crippled limb, brain damage, and so on) are more difficult to
repair. The Paladin must spend several moments collecting
himself (as long as a minute in some cases) and then strike
the subject with his hand, and shout. At this point, both the
Paladin AND the subject need to ‘buy off’ the injury bane. The
Paladin must spend an amount of Divinity equal to the cost
of the bane, whereas the subject must spend arc points (hey,
miracles don’t work themselves—you need faith!). If either
party doesn’t have enough points to do it, the Paladin will be
able to tell before actually performing the ritual.
If successful, limbs regrow instantly (the new flesh tends
to have a golden hue to it, and is numb and difficult to use for
about an hour), eyes regrow, bones reset themselves, scarred
lungs become pink and new, madness fades, and brains
restore themselves from damage.`
        },
        {
          name: "Judgment",
          description: `Judgment is perhaps a more direct use of a Paladin’s ability
to crush evil than Smite—it also uses up some of his Divinity
rather than granting him more. Judgment is a cone of white
light more brilliant than the sun (just kidding, heretic, that
isn’t possible!) that carries with it the power of Genosus, the
Master of Light, to obliterate darkness and evil. Judgment
costs 4+X Divinity to use, and creates a cone of white light
in which no evil can survive. The Paladin most commonly
casts out his arm, and the light erupts from it with a sound
like a thunderclap. The results vary upon the nature of those
caught in it.
Regular people will be blinded if they are looking towards
the light, and may suffer sunburns. Wicked people (those
whom Genosus would judge to be worthy of severe chastisement or death) will immediately suffer burn wounds at a level
equal to X to any exposed parts of their bodies. Covered parts
may be set on fire as-per burning sleeve (burn damage) and
exposed hair and other combustibles will be set ablaze. Metal
armor will suddenly become extremely hot as per hot metal
(burn damage).
Enemy Ascendents will be affected as wicked people, but
in each case the fire damage will be increased by 1/TN 5.
Undead will generally simply be destroyed if they are
caught in the area. Powerful undead may make a WIL test to
avoid being destroyed instantly, at RS X.
Star Vampires must make a WIL test to avoid losing all of
their abilities for 24 hours. If they fail the test by 2 or more
BS, the Vampire suffers as though set ablaze (burn damage).`
        },
        {
          name: "Wrath of God",
          description: `Smite isn’t a power fueled by Divinity. It is a fountain of
Divinity. Performing their duty to crush the wicked and the
depraved is one of the chief sources of a Paladin’s power. But
it is one thing to merely punish the wicked, and quite another
to bring their sinfulness to Genosus’ attention, and to let him
deal with it in his own way.
Wrath of God creates an explosion centered on the Paladin.
This explosion will not harm the Paladin himself, or individuals that he explicitly doesn’t want to injure, but it will harm
everything else around him, animate or inanimate. Wrath of
God automatically consumes all of a Paladin’s Divinity. Yes,
that does mean that the Paladin will perish immediately upon
using this ability, collapsing into white dust and dispersing to
the four winds by the explosion.
The explosion caused by Wrath of God has a hit value of 4,
radius equal to the Paladin’s Divinity, and causes 1 damage
per point of Divinity. This is bludgeoning damage, and also
inflicts burn damage of 3/TN 5 that burns for 3 rounds to any
hit location that suffers damage from the explosion. The burn
damage can be avoided if a character benefits from enough
cover that a hit location’s damage from the explosion itself is
reduced to 0, in which case that hit location suffers no burn
damage either.
Individuals killed or enemies destroyed by Wrath of God
can never give a Paladin Divinity. Essentially, it doesn’t count
as the Paladin killing them. It’s Genosus doing the heavy
lifting for once.`
        },
        {
          name: "I See You",
          description: `Paladins do not have any special ability to tell if someone
is an infidel or a heretic just by looking at them. However, a
Paladin can ‘mark’ any living thing that he would be able to
use Smite on as an enemy of Genosus. This involves touching
the target in any way—even just a light brush in passing will
do—and willing it to be so.
When this is done, the Paladin must spend 1 Divinity,
and assign a ‘name’ to the target. It doesn’t have to be the
thing’s real name, but as long as the Paladin associates that
name with it, that is enough. From then on, whenever ANY
Paladin thinks of the name assigned to this marked target
while concentrating, they will feel a pulling sensation in the
direction that the target is, varying in strength depending
on distance.
Two targets cannot share a name. If a Paladin attempts to
use a name that is already taken, it doesn’t stick. Of course,
once a target has been destroyed, its name is up for grabs
again.
The marked subject may not be initially aware of this
effect, but just as the Paladin feels a tugging sensation
towards his target, the target will itself become aware of the
Paladin. Sometimes this manifests in the same way it does for
the Paladin—a tugging sensation on the ear or tongue—other
times it manifests as phantasmal sounds.
Generally this effect is disturbing, and even if they don’t
realize that it signifies a Paladin’s coming, the marked individual will generally be aware that something bad is on its way.
Examples include the creaking of chains that grows louder
and more frantic as the Paladin approaches; the beating of
drums and chanting, growing more furious
as the Paladin approaches; a tugging
sensation on the tongue, and whispers that intensify as the Paladin
approaches; and a pleasant
tune in the distance that
grows more distorted
and ominous as the
Paladin approaches.`
        },
      ]
    }, {
      name: "Dessian Silver Guard",
      tier: 5,
      attributeMods: [{
        name: 'Strength',
        value: 0
      },
      {
        name: 'Agility',
        value: 0
      },
      {
        name: 'Endurance',
        value: 0
      },
      {
        name: 'Health',
        value: 0
      },
      {
        name: 'Willpower',
        value: 0
      },
      {
        name: 'Wit',
        value: 0
      },
      {
        name: 'Intelligence',
        value: 0
      },
      {
        name: 'Perception',
        value: 0
      }
      ],
      characteristics: [
        {
          name: "Perfect",
          description: `Silver Guards cannot begin play with any sort of bane that
would physically cripple them, such as scars, missing limbs,
old wounds, lasting pain, lost eyes, brain damage, and so on.
These banes may be gained during play, but cannot normally
occur at Character Creation. At the GM’s discretion, a Silver
Guard may have acquired an injury during his career after
emerging from the gate, and so may have one or more of these
banes, but the cost of the bane is halved for the purposes
of boons and banes points at Character Creation. For the
purpose of buying off banes, they are counted at the standard cost.
Silver Guards, like Paladins, cannot be Complete Monsters,
because they must have a Faith arc in order for them to
become Ascendants.
Unlike Paladins and the Sarturi Chosen, Silver Guards
cannot take any sort of bane that would displease the judging
eyes of their mother. They are chosen specifically for their
looks. They cannot take the Skinny, Fat, or Ugly banes.`
        },
        {
          name: "Moonlit Twostep",
          description: `The Silver Guard is not constrained by physical laws in the
same way men are. They move with an unearthly grace, sometimes seeming to glide rather than walk, and in battle, they
can briefly gain altitude and launch themselves like birds of
prey down upon their enemies.
Silver Guards gain a +4 bonus to their MOB for the
purposes of movement and for mobility maneuvers, as well
as a +2 bonus to skill and attribute tests made to jump, climb,
maneuver, or otherwise move. A Silver Guard may spend
1 Divinity to perform the Soaring Charge maneuver
in the first move of combat if his orientation is
aggressive.`
        },
        {
          name: "Mark of the Moon",
          description: `A Silver Guard can ‘Mark’ an individual as an ‘Adherent’ if
they are a true believer in Bocanadessia. This has no cost,
and can be done to any willing individual who has a Faith
arc that venerates Bocanadessia, or who is willing to convert
(the act of Marking instills a new and virtually unshakeable
faith in the individual), and isn’t a Complete Monster. Being
a Complete Monster prevents this ability from working.
Marking an Adherent involves putting a hand on their head
or face, and willing it to be so.
Marked Adherents gain a spectral imprint of a handprint and a moon (in the phase that it was in at the time the
Adherent was Marked) that can only be seen by Ascended
Humans. Paladins and Sarturi Chosen can see it as well.
Marked Adherents gain the following benefits so long as they
remain true to their faith:
 They have a +2 bonus to their HLT for the purpose of
resisting disease, poison, or bleed.
 They can hear the Song of the Moon more clearly.
 They can be granted Succor by any Silver Guard.
 They gain double the normal amount of arc points for
following their Faith.
The downsides, though, are noteworthy:
 If their Faith ever changes from the pure veneration of
Bocanadessia, the Moon-mark on their face will explode.
This will inflict bludgeoning damage equal to the Silver
Guard’s WIL, to the part of the Adherent’s body that the
mark is on. This damage is not reduced by TOU or armor,
but if the Adherent’s WIL is higher than the Silver Guard’s,
than the difference between the two scores is subtracted
from the damage received (that is, if the Adherent has
8 WIL and the Silver Guard has 5 WIL, then the damage
is reduced by 3, bringing it down from 5 to 2). If they
somehow survive this, they are no longer an Adherent.
 If the Silver Guard who Marked the Adherent gives the
Adherent an order, the Adherent must pass a WIL test at
an RS equal to the Silver Guard’s WIL in order to not obey
it. This includes an order to, say, ‘drop dead’ or ‘swallow
that carving knife.’
 If the Silver Guard is killed violently, all of his Adherents
must make a HLT test at 5 RS or die instantly. One Adherent
at random may be spared from this fate per point of Divinity
the Silver Guard had in his repository when he died (so, if
a Silver Guard has 30 Adherents and 25 Divinity, and is
crushed by a boulder, only 5 of his Adherents will have to
make HLT tests).
Marking can be removed by other Ascendants without triggering the death of the Adherent. The Adherent doesn’t need
to be willing, but the Ascendant must spend 15 Divinity,
and put their hand over the Mark. Then, a WIL contest is
made between the other Ascendant and the Silver Guard
who Marked the Adherent. If the Ascendant is successful,
the Adherent’s Mark is removed. If their Faith was changed
by the Marking, it is now changed back to what it originally
was. The Silver Guard may voluntarily fail this test—but why
would they?`
        },
        {
          name: "Moonstrike",
          description: `When a Silver Guard performs a melee maneuver that inflicts
damage (such as Swing and Thrust, though Shoot and
Melee Shoot do not count) he can declare that attack
to be a Moonstrike.
If the Moonstrike inflicts a wound of any sort,
the attack also inflicts cold damage (equal to
the Silver Guard’s WIL score) to the attack’s
hit location.
If the target of this ability is another
Ascendant, they can negate (or reduce the effects
of) Moonstrike by spending Divinity of their own, on a
1-for-1 basis.
The Silver Guard may spend any amount of Divinity. Each
point of Divinity spent has the following effects:
 The victim suffers 1 point of cold damage randomly allocated on the body;
 The victim loses the ability to benefit from one of his arcs
for one month, or until any Silver Guard grants him Succor
(this effect can stack); and
 The Silver Guard regains 1 CP.
`
        },
        {
          name: "The Moon Also Rises",
          description: `Silver Guards gain Divinity in the following ways:
 Completing a task set for the Silver Guard by Bocanadessia
or her Song grants between 1-5 Divinity, depending on the
importance or difficulty of the task (1 being a minor task
or a daily function, 5 being a great service to Dessianism
as a whole).
 Slaying or defeating any enemy of Sacred Karthack or
Bocanadessia herself grants a Silver Guard between 1-5
Divinity, depending on the severity of the threat (1 being
a minor foe, 5 being a mortal enemy of Bocanadessia).
 Each Adherent a Silver Guard has grants 1 Divinity per
month, on the night of the Eclipse.
 Marking an Adherent grants a Silver Guard 1 Divinity
immediately.`
        },
        {
          name: "The White Fog",
          description: `A Silver Guard may choose to passively drain the heat out of an
area around himself, and to cause a mist to envelop the area,
reducing visibility by one lighting stage. If there are multiple
Silver Guards and their fields of White Fog overlap, visibility
is reduced by one lighting stage per field overlapping. Silver
Guards and their Adherents can see through this fog clearly,
though they cannot normally see in the dark. Additionally,
within this area, the ambient temperature drops significantly.
As before, if there are multiple Silver Guards creating fields
of White Fog, the effects combine. Light sources still function
in the White Fog, but the range that the light carries is halved,
and weak flames, like candles, may be extinguished.
Additionally, any burn damage inflicted in the White Fog
has its duration reduced by 1 per overlapping field of White
Fog, to a minimum of 1 round of burning.
Any missile attack or explosion that would affect a Silver
Guard in the White Fog treats the White Fog as cover with an
AV value equal to the Silver Guard’s WIL, +1 per overlapping
White Fog from other Silver Guards.
The size of the White Fog field depends on the current
climate and time of day. By default, the area has a radius of
50 yards`
        },
        {
          name: "Forcible Marking",
          description: `It is actually possible to forcibly turn someone into an
Adherent, but this is a secret that most Silver Guards would
rather not be revealed, and not many of them are capable of
it to begin with; only the most powerful can do it.
This ability is not available to regular Silver Guards, but
can be purchased for 50 arc points. Performing it requires
the expenditure of Divinity equal to the WIL of the victim,
and an additional expenditure of X. The Silver Guard must
successfully grasp the victim’s face (trapping the head in a
grapple would work) before doing this.
The victim must make a WIL test at RS equal to X, or
become an Adherent against his will, complete with faith
in Bocanadessia. While generally the new Adherent will still
remember, and be confused by the fact that they weren’t an
Adherent until a few moments ago, the use of Succor to drain
away their negativity can keep them under control.
This ability cannot be used on characters with the
Complete Monster bane.`
        },
        {
          name: "A Thousand Stars, One Moon",
          description: `A Silver Guard can cause their Adherents to become stronger
by spending Divinity. This allows Silver Guards who are
leaders in war to empower their armies. It also has domestic
uses. Silver Guards can empower groups of farmers or laborers
in a similar manner.
Each point of Divinity spent has the following effects,
which last for 1 hour, at which time the Silver Guard must
pay the cost again to sustain the effects:
 Increase one core attribute by 1 point per point of Divinity
(Silver Guard may choose how these points are distributed);
 Increase pain resistance by 1 per point of Divinity;
 Ignore 1 point of total bleed per point of Divinity; and
 Complete immunity to cold or cold-related damage for the
full duration.`
        },
        {
          name: "Succor",
          description: `Silver Guards have the ability to grant healing to their
Adherents (or the Adherents of other Silver Guards) through
the use of Divinity. This is not as powerful as Paladin healing—
the Silver Guard cannot instantly close wounds, nor can they
regrow lost limbs, and it cannot be used on the Silver Guard
himself. However, it is much easier for the Silver Guard to do.
A Silver Guard can cure most diseases by praying over the
kneeling or prostrate Adherent, and then laying a hand on
the spectral brand they are marked with. This costs 0 Divinity
if the disease is something non-fatal but merely unpleasant,
and 1 Divinity if the disease is potentially or actively lethal.
A Silver Guard may cause a physical injury to heal at
double the normal speed by spending 1 Divinity per 2 levels
of the wound. Frostbite and other cold-related injuries can be
cured immediately at no Divinity cost. The infection chance
of such a wound is reduced by 4. Finally, for no Divinity cost, a Silver Guard can take away
all negative thoughts, emotions, or painful memories away
from an Adherent, by holding their head and willing it to
be so. An ethereal white mist emerges from the Adherent’s
mouth and nose, and enters the Silver Guard. The Adherent
will forget all of his negativity, while the Silver Guard will
have to bear it himself. Silver Guards live with some of the
most soul-crushingly horrific knowledge to begin with, the
petty problems of the un-Ascended are so trivial that most
Silver Guards wouldn’t notice.
After about a month, the memories taken away will start
to return, but can be relieved again through another Succor.`
        },
      ]
    }];

    /*
    {
      name: "",
      tier: 1,
      attributeMods: [{
          name: 'Strength',
          value: 0
        },
        {
          name: 'Agility',
          value: 0
        },
        {
          name: 'Endurance',
          value: 0
        },
        {
          name: 'Health',
          value: 0
        },
        {
          name: 'Willpower',
          value: 0
        },
        {
          name: 'Wit',
          value: 0
        },
        {
          name: 'Intelligence',
          value: 0
        },
        {
          name: 'Perception',
          value: 0
        }
      ],
      characteristics: [{
          name: "",
          description: ``
        },
      ]
    }
    */

    /* src\races\races.svelte generated by Svelte v3.37.0 */
    const file$d = "src\\races\\races.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    function get_each_context_3$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[18] = list[i];
    	return child_ctx;
    }

    // (58:6) {#each group as race}
    function create_each_block_3$2(ctx) {
    	let option;
    	let t_value = /*race*/ ctx[18].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*race*/ ctx[18].name;
    			option.value = option.__value;
    			add_location(option, file$d, 58, 8, 1344);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3$2.name,
    		type: "each",
    		source: "(58:6) {#each group as race}",
    		ctx
    	});

    	return block;
    }

    // (56:2) {#each sortRacesByTier(races) as group, n}
    function create_each_block_2$4(ctx) {
    	let optgroup;
    	let each_value_3 = /*group*/ ctx[15];
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3$2(get_each_context_3$2(ctx, each_value_3, i));
    	}

    	const block = {
    		c: function create() {
    			optgroup = element("optgroup");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(optgroup, "label", "Tier " + (/*n*/ ctx[17] + 1));
    			add_location(optgroup, file$d, 56, 4, 1276);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, optgroup, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(optgroup, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sortRacesByTier, races*/ 0) {
    				each_value_3 = /*group*/ ctx[15];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3$2(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(optgroup, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(optgroup);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$4.name,
    		type: "each",
    		source: "(56:2) {#each sortRacesByTier(races) as group, n}",
    		ctx
    	});

    	return block;
    }

    // (68:2) {#each selectedRace.characteristics as characteristic}
    function create_each_block_1$6(ctx) {
    	let div;
    	let p0;
    	let strong;
    	let t0_value = /*characteristic*/ ctx[12].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*characteristic*/ ctx[12].description + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p0 = element("p");
    			strong = element("strong");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			add_location(strong, file$d, 69, 9, 1635);
    			add_location(p0, file$d, 69, 6, 1632);
    			add_location(p1, file$d, 70, 6, 1684);
    			attr_dev(div, "class", "col-sm-4");
    			add_location(div, file$d, 68, 4, 1603);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p0);
    			append_dev(p0, strong);
    			append_dev(strong, t0);
    			append_dev(div, t1);
    			append_dev(div, p1);
    			append_dev(p1, t2);
    			append_dev(div, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedRace*/ 1 && t0_value !== (t0_value = /*characteristic*/ ctx[12].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*selectedRace*/ 1 && t2_value !== (t2_value = /*characteristic*/ ctx[12].description + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$6.name,
    		type: "each",
    		source: "(68:2) {#each selectedRace.characteristics as characteristic}",
    		ctx
    	});

    	return block;
    }

    // (81:0) {:else}
    function create_else_block$5(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot$8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope*/ 2097152) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(81:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (82:2) <Col>
    function create_default_slot$8(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "N/A";
    			add_location(p, file$d, 82, 4, 1957);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$8.name,
    		type: "slot",
    		source: "(82:2) <Col>",
    		ctx
    	});

    	return block;
    }

    // (79:4) {#if mod.value > 0}
    function create_if_block$6(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("+");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(79:4) {#if mod.value > 0}",
    		ctx
    	});

    	return block;
    }

    // (76:0) {#each selectedRace.attributeMods.filter((mod) => mod.value != 0) as mod}
    function create_each_block$9(ctx) {
    	let p;
    	let t0_value = /*mod*/ ctx[9].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*mod*/ ctx[9].value + "";
    	let t2;
    	let if_block = /*mod*/ ctx[9].value > 0 && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text(":\n    ");
    			if (if_block) if_block.c();
    			t2 = text(t2_value);
    			add_location(p, file$d, 76, 2, 1869);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			if (if_block) if_block.m(p, null);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedRace*/ 1 && t0_value !== (t0_value = /*mod*/ ctx[9].name + "")) set_data_dev(t0, t0_value);

    			if (/*mod*/ ctx[9].value > 0) {
    				if (if_block) ; else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(p, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*selectedRace*/ 1 && t2_value !== (t2_value = /*mod*/ ctx[9].value + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(76:0) {#each selectedRace.attributeMods.filter((mod) => mod.value != 0) as mod}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let h2;
    	let t1;
    	let select;
    	let t2;
    	let p0;
    	let t3;
    	let t4_value = /*selectedRace*/ ctx[0].tier + "";
    	let t4;
    	let t5;
    	let p1;
    	let t7;
    	let div;
    	let t8;
    	let p2;
    	let strong;
    	let t10;
    	let t11;
    	let p3;
    	let t12;
    	let t13;
    	let mounted;
    	let dispose;
    	let each_value_2 = sortRacesByTier(races);
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2$4(get_each_context_2$4(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*selectedRace*/ ctx[0].characteristics;
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$6(get_each_context_1$6(ctx, each_value_1, i));
    	}

    	let each_value = /*selectedRace*/ ctx[0].attributeMods.filter(func$2);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	let each2_else = null;

    	if (!each_value.length) {
    		each2_else = create_else_block$5(ctx);
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Races";
    			t1 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t2 = space();
    			p0 = element("p");
    			t3 = text("Tier: ");
    			t4 = text(t4_value);
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Characteristics";
    			t7 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t8 = space();
    			p2 = element("p");
    			strong = element("strong");
    			strong.textContent = "Attribute Modifiers:";
    			t10 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (each2_else) {
    				each2_else.c();
    			}

    			t11 = space();
    			p3 = element("p");
    			t12 = text("Cost ");
    			t13 = text(/*usedPCP*/ ctx[1]);
    			add_location(h2, file$d, 53, 0, 1172);
    			if (/*selectedRaceValue*/ ctx[2] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[4].call(select));
    			add_location(select, file$d, 54, 0, 1187);
    			add_location(p0, file$d, 63, 0, 1441);
    			add_location(p1, file$d, 64, 0, 1474);
    			attr_dev(div, "class", "row justify-content-md-center");
    			add_location(div, file$d, 66, 0, 1498);
    			add_location(strong, file$d, 74, 3, 1751);
    			add_location(p2, file$d, 74, 0, 1748);
    			add_location(p3, file$d, 85, 0, 1985);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(select, null);
    			}

    			select_option(select, /*selectedRaceValue*/ ctx[2]);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t3);
    			append_dev(p0, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div, null);
    			}

    			insert_dev(target, t8, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, strong);
    			insert_dev(target, t10, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			if (each2_else) {
    				each2_else.m(target, anchor);
    			}

    			insert_dev(target, t11, anchor);
    			insert_dev(target, p3, anchor);
    			append_dev(p3, t12);
    			append_dev(p3, t13);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[4]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*sortRacesByTier, races*/ 0) {
    				each_value_2 = sortRacesByTier(races);
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$4(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_2[i] = create_each_block_2$4(child_ctx);
    						each_blocks_2[i].c();
    						each_blocks_2[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks_2.length; i += 1) {
    					each_blocks_2[i].d(1);
    				}

    				each_blocks_2.length = each_value_2.length;
    			}

    			if (dirty & /*selectedRaceValue, sortRacesByTier, races*/ 4) {
    				select_option(select, /*selectedRaceValue*/ ctx[2]);
    			}

    			if (t4_value !== (t4_value = /*selectedRace*/ ctx[0].tier + "")) set_data_dev(t4, t4_value);

    			if (dirty & /*selectedRace*/ 1) {
    				each_value_1 = /*selectedRace*/ ctx[0].characteristics;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$6(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_1$6(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_1.length;
    			}

    			if (dirty & /*selectedRace*/ 1) {
    				each_value = /*selectedRace*/ ctx[0].attributeMods.filter(func$2);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t11.parentNode, t11);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;

    				if (!each_value.length && each2_else) {
    					each2_else.p(ctx, dirty);
    				} else if (!each_value.length) {
    					each2_else = create_else_block$5(ctx);
    					each2_else.c();
    					transition_in(each2_else, 1);
    					each2_else.m(t11.parentNode, t11);
    				} else if (each2_else) {
    					group_outros();

    					transition_out(each2_else, 1, 1, () => {
    						each2_else = null;
    					});

    					check_outros();
    				}
    			}

    			set_data_dev(t13, /*usedPCP*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks_2, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t10);
    			destroy_each(each_blocks, detaching);
    			if (each2_else) each2_else.d(detaching);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(p3);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function sortRacesByTier(races) {
    	let maxTier = 0;
    	let groups = [];

    	races.forEach(race => {
    		if (race.tier > maxTier) {
    			maxTier = race.tier;
    		}
    	});

    	for (let n = 0; n < maxTier; n++) {
    		groups[n] = [];

    		races.forEach(race => {
    			if (race.tier == n + 1) {
    				groups[n].push(race);
    			}
    		});
    	}

    	return groups;
    }

    const func$2 = mod => mod.value != 0;

    function instance$d($$self, $$props, $$invalidate) {
    	let selectedRaceValue;
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(5, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Races", slots, []);
    	let { pcpRemaining } = $$props;
    	let { selectedRace } = $$props;
    	const racePCPCosts = [1, 2, 4, 6, 8];

    	function getRaceByName(name) {
    		races.forEach(race => {
    			if (race.name === name) {
    				$$invalidate(0, selectedRace = race);
    			}
    		});

    		if (selectedRace.name) {
    			return selectedRace;
    		} else return races[0];
    	}

    	function getRacePCP(input) {
    		let tier = input.tier;
    		return racePCPCosts[tier - 1];
    	}

    	let { usedPCP } = $$props;
    	const writable_props = ["pcpRemaining", "selectedRace", "usedPCP"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Races> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		selectedRaceValue = select_value(this);
    		$$invalidate(2, selectedRaceValue);
    	}

    	$$self.$$set = $$props => {
    		if ("pcpRemaining" in $$props) $$invalidate(3, pcpRemaining = $$props.pcpRemaining);
    		if ("selectedRace" in $$props) $$invalidate(0, selectedRace = $$props.selectedRace);
    		if ("usedPCP" in $$props) $$invalidate(1, usedPCP = $$props.usedPCP);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		character,
    		races,
    		pcpRemaining,
    		selectedRace,
    		racePCPCosts,
    		getRaceByName,
    		getRacePCP,
    		usedPCP,
    		sortRacesByTier,
    		selectedRaceValue,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("pcpRemaining" in $$props) $$invalidate(3, pcpRemaining = $$props.pcpRemaining);
    		if ("selectedRace" in $$props) $$invalidate(0, selectedRace = $$props.selectedRace);
    		if ("usedPCP" in $$props) $$invalidate(1, usedPCP = $$props.usedPCP);
    		if ("selectedRaceValue" in $$props) $$invalidate(2, selectedRaceValue = $$props.selectedRaceValue);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedRaceValue*/ 4) {
    			$$invalidate(0, selectedRace = getRaceByName(selectedRaceValue));
    		}

    		if ($$self.$$.dirty & /*selectedRace*/ 1) {
    			{
    				set_store_value(character, $character.race = selectedRace.name, $character);
    			}
    		}

    		if ($$self.$$.dirty & /*selectedRace*/ 1) {
    			$$invalidate(1, usedPCP = getRacePCP(selectedRace));
    		}
    	};

    	$$invalidate(2, selectedRaceValue = "");
    	return [selectedRace, usedPCP, selectedRaceValue, pcpRemaining, select_change_handler];
    }

    class Races extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {
    			pcpRemaining: 3,
    			selectedRace: 0,
    			usedPCP: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Races",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pcpRemaining*/ ctx[3] === undefined && !("pcpRemaining" in props)) {
    			console.warn("<Races> was created without expected prop 'pcpRemaining'");
    		}

    		if (/*selectedRace*/ ctx[0] === undefined && !("selectedRace" in props)) {
    			console.warn("<Races> was created without expected prop 'selectedRace'");
    		}

    		if (/*usedPCP*/ ctx[1] === undefined && !("usedPCP" in props)) {
    			console.warn("<Races> was created without expected prop 'usedPCP'");
    		}
    	}

    	get pcpRemaining() {
    		throw new Error("<Races>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pcpRemaining(value) {
    		throw new Error("<Races>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedRace() {
    		throw new Error("<Races>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedRace(value) {
    		throw new Error("<Races>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get usedPCP() {
    		throw new Error("<Races>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set usedPCP(value) {
    		throw new Error("<Races>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\attributes.svelte generated by Svelte v3.37.0 */
    const file$c = "src\\attributes.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_2$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	child_ctx[17] = list;
    	child_ctx[18] = i;
    	return child_ctx;
    }

    // (151:0) <Col>
    function create_default_slot_4$4(ctx) {
    	let p0;
    	let t0_value = /*attribute*/ ctx[12].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let input;
    	let t2;
    	let mounted;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[5].call(input, /*each_value_2*/ ctx[17], /*i*/ ctx[18]);
    	}

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			input = element("input");
    			t2 = space();
    			add_location(p0, file$c, 151, 2, 3919);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "1");
    			attr_dev(input, "max", "8");
    			add_location(input, file$c, 152, 5, 3949);
    			add_location(p1, file$c, 152, 2, 3946);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, input);
    			set_input_value(input, /*attribute*/ ctx[12].value);
    			insert_dev(target, t2, anchor);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", input_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*attributes*/ 4 && t0_value !== (t0_value = /*attribute*/ ctx[12].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*attributes*/ 4 && to_number(input.value) !== /*attribute*/ ctx[12].value) {
    				set_input_value(input, /*attribute*/ ctx[12].value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t2);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$4.name,
    		type: "slot",
    		source: "(151:0) <Col>",
    		ctx
    	});

    	return block;
    }

    // (150:0) {#each attributes as attribute, i}
    function create_each_block_2$3(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_4$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, attributes*/ 524292) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$3.name,
    		type: "each",
    		source: "(150:0) {#each attributes as attribute, i}",
    		ctx
    	});

    	return block;
    }

    // (149:0) <Row>
    function create_default_slot_3$4(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_2 = /*attributes*/ ctx[2];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$3(get_each_context_2$3(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*attributes*/ 4) {
    				each_value_2 = /*attributes*/ ctx[2];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$3(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$4.name,
    		type: "slot",
    		source: "(149:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (159:0) {#if race}
    function create_if_block$5(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, compounds, attributes, race*/ 524302) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(159:0) {#if race}",
    		ctx
    	});

    	return block;
    }

    // (162:0) <Col>
    function create_default_slot_2$5(ctx) {
    	let p0;
    	let t0_value = /*attribute*/ ctx[12].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*attribute*/ ctx[12].value + "";
    	let t2;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = text(":");
    			p1 = element("p");
    			t2 = text(t2_value);
    			add_location(p0, file$c, 162, 0, 4179);
    			add_location(p1, file$c, 162, 24, 4203);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*attributes, race*/ 6 && t0_value !== (t0_value = /*attribute*/ ctx[12].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*attributes, race*/ 6 && t2_value !== (t2_value = /*attribute*/ ctx[12].value + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(p1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$5.name,
    		type: "slot",
    		source: "(162:0) <Col>",
    		ctx
    	});

    	return block;
    }

    // (161:0) {#each getTotalAttributes(attributes, race) as attribute}
    function create_each_block_1$5(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_2$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, attributes, race*/ 524294) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$5.name,
    		type: "each",
    		source: "(161:0) {#each getTotalAttributes(attributes, race) as attribute}",
    		ctx
    	});

    	return block;
    }

    // (167:0) <Col>
    function create_default_slot_1$7(ctx) {
    	let p0;
    	let t0_value = /*attribute*/ ctx[12].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let t2_value = /*attribute*/ ctx[12].value + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = text(":");
    			p1 = element("p");
    			t2 = text(t2_value);
    			t3 = space();
    			add_location(p0, file$c, 167, 0, 4285);
    			add_location(p1, file$c, 167, 24, 4309);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			append_dev(p0, t1);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t2);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*compounds*/ 8 && t0_value !== (t0_value = /*attribute*/ ctx[12].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*compounds*/ 8 && t2_value !== (t2_value = /*attribute*/ ctx[12].value + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$7.name,
    		type: "slot",
    		source: "(167:0) <Col>",
    		ctx
    	});

    	return block;
    }

    // (166:0) {#each compounds as attribute}
    function create_each_block$8(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_1$7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, compounds*/ 524296) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(166:0) {#each compounds as attribute}",
    		ctx
    	});

    	return block;
    }

    // (160:0) <Row>
    function create_default_slot$7(ctx) {
    	let t;
    	let each1_anchor;
    	let current;
    	let each_value_1 = getTotalAttributes(/*attributes*/ ctx[2], /*race*/ ctx[1]);
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1$5(get_each_context_1$5(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	let each_value = /*compounds*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const out_1 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(target, anchor);
    			}

    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*getTotalAttributes, attributes, race*/ 6) {
    				each_value_1 = getTotalAttributes(/*attributes*/ ctx[2], /*race*/ ctx[1]);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$5(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1$5(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(t.parentNode, t);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*compounds*/ 8) {
    				each_value = /*compounds*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$7.name,
    		type: "slot",
    		source: "(160:0) <Row>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let h3;
    	let t1;
    	let row;
    	let t2;
    	let p0;
    	let t3;
    	let t4;
    	let t5;
    	let p1;
    	let t7;
    	let if_block_anchor;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_3$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*race*/ ctx[1] && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Attributes";
    			t1 = space();
    			create_component(row.$$.fragment);
    			t2 = space();
    			p0 = element("p");
    			t3 = text("Used PCP: ");
    			t4 = text(/*usedPCP*/ ctx[0]);
    			t5 = space();
    			p1 = element("p");
    			p1.textContent = "Total Attributes:";
    			t7 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			add_location(h3, file$c, 147, 0, 3846);
    			add_location(p0, file$c, 156, 0, 4040);
    			add_location(p1, file$c, 157, 0, 4068);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row, target, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t3);
    			append_dev(p0, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t7, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const row_changes = {};

    			if (dirty & /*$$scope, attributes*/ 524292) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    			if (!current || dirty & /*usedPCP*/ 1) set_data_dev(t4, /*usedPCP*/ ctx[0]);

    			if (/*race*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*race*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			destroy_component(row, detaching);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t7);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getTotalAttributes(base, race) {
    	let totals = JSON.parse(JSON.stringify(base));

    	if (race.hasOwnProperty("attributeMods")) {
    		race.attributeMods.forEach(mod => {
    			totals.forEach(attribute => {
    				if (mod.name == attribute.name) {
    					attribute.value += mod.value;
    				}
    			});
    		});
    	}

    	totals.forEach(attribute => {
    		if (attribute.value > 13) {
    			attribute.value = 13;
    		}
    	});

    	return totals;
    }

    function getAttrByName(name, input) {
    	let value = 0;

    	input.forEach(attribute => {
    		if (attribute.name === name) {
    			value = attribute.value;
    		}
    	});

    	return value;
    }

    function getADR(input) {
    	return Math.floor((getAttrByName("Agility", input) + getAttrByName("Wit", input)) / 2);
    }

    function getMOB(input) {
    	//racial modifiers
    	return Math.floor((getAttrByName("Strength", input) + getAttrByName("Wit", input) + getAttrByName("Endurance", input)) / 2);
    }

    function getCAR(input) {
    	return Math.floor(getAttrByName("Strength", input) + getAttrByName("Endurance", input));
    }

    function getCHA(input) {
    	return Math.floor((getAttrByName("Willpower", input) + getAttrByName("Wit", input) + getAttrByName("Perception", input)) / 2);
    }

    function getSDB(input) {
    	return getAttrByName("Strength", input) * 2;
    }

    function getTOU(input) {
    	//there are racial modifiers to this
    	return 4;
    }

    function getGrit(input) {
    	return Math.floor(getAttrByName("Willpower", input) / 2);
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let compounds;
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(6, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Attributes", slots, []);
    	let { pcpRemaining } = $$props;
    	let { usedPCP } = $$props;
    	let { race } = $$props;

    	let attributes = [
    		{ name: "Strength", value: 1 },
    		{ name: "Agility", value: 1 },
    		{ name: "Endurance", value: 1 },
    		{ name: "Health", value: 1 },
    		{ name: "Willpower", value: 1 },
    		{ name: "Wit", value: 1 },
    		{ name: "Intelligence", value: 1 },
    		{ name: "Perception", value: 1 },
    		{ name: "Magic", value: 0 }
    	];

    	const attributePCPCosts = [22, 23, 24, 27, 31, 35, 40, 45, 50, 56];
    	const attributePointCosts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16];

    	function getAttributePointsUsed(input) {
    		let sum = 0;

    		input.forEach(attribute => {
    			if (attribute.name == "Magic") {
    				return;
    			}

    			sum += attributePointCosts[attribute.value - 1];
    		});

    		return sum;
    	}

    	function getAttributesPCP(input) {
    		let sum = getAttributePointsUsed(input);

    		if (sum < attributePCPCosts[0]) {
    			return 1;
    		}

    		for (let n = 0; n < attributePCPCosts.length; n++) {
    			if (n < attributePCPCosts.length - 1) {
    				if (sum >= attributePCPCosts[n] && sum < attributePCPCosts[n + 1]) {
    					return n + 1;
    				}
    			} else if (sum == attributePCPCosts[n]) {
    				return n + 1;
    			}
    		}
    	}

    	

    	function getCompounds(totals) {
    		let compound = {};
    		let compounds = [];
    		compound.name = "Adroitness";
    		compound.value = getADR(totals);
    		compounds.push(compound);
    		compound = {};
    		compound.name = "Mobility";
    		compound.value = getMOB(totals);
    		compounds.push(compound);
    		compound = {};
    		compound.name = "Carry";
    		compound.value = getCAR(totals);
    		compounds.push(compound);
    		compound = {};
    		compound.name = "Charisma";
    		compound.value = getCHA(totals);
    		compounds.push(compound);
    		compound = {};
    		compound.name = "Toughness";
    		compound.value = getTOU();
    		compounds.push(compound);
    		compound = {};
    		compound.name = "Strength Damage Bonus";
    		compound.value = getSDB(totals);
    		compounds.push(compound);
    		compound = {};
    		compound.name = "Grit";
    		compound.value = getGrit(totals);
    		compounds.push(compound);
    		return compounds;
    	}

    	const writable_props = ["pcpRemaining", "usedPCP", "race"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Attributes> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler(each_value_2, i) {
    		each_value_2[i].value = to_number(this.value);
    		$$invalidate(2, attributes);
    	}

    	$$self.$$set = $$props => {
    		if ("pcpRemaining" in $$props) $$invalidate(4, pcpRemaining = $$props.pcpRemaining);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    		if ("race" in $$props) $$invalidate(1, race = $$props.race);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		character,
    		pcpRemaining,
    		usedPCP,
    		race,
    		attributes,
    		attributePCPCosts,
    		attributePointCosts,
    		getAttributePointsUsed,
    		getAttributesPCP,
    		getTotalAttributes,
    		getAttrByName,
    		getCompounds,
    		getADR,
    		getMOB,
    		getCAR,
    		getCHA,
    		getSDB,
    		getTOU,
    		getGrit,
    		compounds,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("pcpRemaining" in $$props) $$invalidate(4, pcpRemaining = $$props.pcpRemaining);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    		if ("race" in $$props) $$invalidate(1, race = $$props.race);
    		if ("attributes" in $$props) $$invalidate(2, attributes = $$props.attributes);
    		if ("compounds" in $$props) $$invalidate(3, compounds = $$props.compounds);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*attributes*/ 4) {
    			$$invalidate(0, usedPCP = getAttributesPCP(attributes));
    		}

    		if ($$self.$$.dirty & /*attributes, race*/ 6) {
    			$$invalidate(3, compounds = getCompounds(getTotalAttributes(attributes, race)));
    		}

    		if ($$self.$$.dirty & /*attributes*/ 4) {
    			{
    				set_store_value(character, $character.baseAttributes = attributes, $character);
    			}
    		}
    	};

    	return [usedPCP, race, attributes, compounds, pcpRemaining, input_input_handler];
    }

    class Attributes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { pcpRemaining: 4, usedPCP: 0, race: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Attributes",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pcpRemaining*/ ctx[4] === undefined && !("pcpRemaining" in props)) {
    			console.warn("<Attributes> was created without expected prop 'pcpRemaining'");
    		}

    		if (/*usedPCP*/ ctx[0] === undefined && !("usedPCP" in props)) {
    			console.warn("<Attributes> was created without expected prop 'usedPCP'");
    		}

    		if (/*race*/ ctx[1] === undefined && !("race" in props)) {
    			console.warn("<Attributes> was created without expected prop 'race'");
    		}
    	}

    	get pcpRemaining() {
    		throw new Error("<Attributes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pcpRemaining(value) {
    		throw new Error("<Attributes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get usedPCP() {
    		throw new Error("<Attributes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set usedPCP(value) {
    		throw new Error("<Attributes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get race() {
    		throw new Error("<Attributes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set race(value) {
    		throw new Error("<Attributes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const boonList = [{
      "name": "Allies",
      "cost": [1, 5, 10],
      "description": ["The Allies boon represents a character’s positive relationshipwith a powerful figure, organization, or group. At its lowestlevel, it could simply represent someone important or competent around town. At its highest, it should represent theattention and favor of kings. This boon can be taken multipletimes to gain multiple Allies, and can be gained (or lost) in thecourse of play through player actions.A character can appeal to one of their Allies for aid, butthat is no guarantee that help will come, or that it will besufficient for the task at hand. More often, Allies will be ableto tie up loose ends, or swoop in to save a character’s baconwhen things get too hairy.", " 1: Minor local power (crime boss, mayor, town sheriff).", " 5: Moderate regional power (baron, trade tycoon, colonel).", " 10: Major international power (king, cardinal, the Pope)."]
    }, {
      "name": "Ambidextrous",
      "cost": [3],
      "description": ["Ambidextrous characters are equally capable of using eitherof their hands well, and are not affected negatively by usinga weapon or tool in their off hand. Ambidextrous charactersgain certain benefits when using two weapons, as detailed inthe chapters for maneuvers and proficiencies. In addition, ifa character’s arm is injured and they are forced to use theirweapon in their off hand, an Ambidextrous character suffersno penalties."]
    }, {
      "name": "Animal Affinity",
      "cost": [2, 4, 6],
      "description": ["A character with this ability has an unusual affinity foranimals.", " 2: Gain a +2 bonus to CHA when interacting with animals,and to Riding checks.", " 4: As above, and may select one type of domestic animal.These animals will always cooperate with you, withinreason.", " 6: As above, and you may select one type of wild animal.These animals will never attack you unprovoked, and mayeven come to your aid in certain situations."]
    }, {
      "name": "Beautiful",
      "cost": [3, 6],
      "description": ["You’re pretty. Reallypretty. Characters withthis boon are easy onthe eyes. This boonmay take many forms,and while differentcultures have varyingstandards of beauty, for themost part, this is a universal boon. Beautifulpeople are generally treated better, as they make agood first impression.", " 3: You gain a +2 bonus to CHA when dealing witheveryone, if your beauty is apparent. You gain a +4 bonus toCHA when dealing with characters who find you attractive.", " 6: You cause carriage crashes. You gain a +3 bonus to CHAwhen dealing with everyone, if your beauty is apparent.You gain a +6 bonus to CHA when dealing with characterswho find you attractive. Beauty of this caliber often comeswith unwanted attention."]
    }, {
      "name": "Berserker",
      "cost": [8, 12],
      "description": ["The Berserker, or bearsark, is a man who, in battle, enters a sortof martial trance during which he seems to be consumed withrage, fearless, immunized against pain and injury, and focusedonly on the butchery of his foes. The state is ill-understood,and many legends have sprung up around it. In truth, it isbest described as a state of hyper-adrenalized psychologicalcompartmentalization, and generally only forms in those whohave suffered repeated emotional traumas in battle. In themodern day, these people would probably be institutionalizedor undergoing extreme therapy. In medieval times, they weresimply those warriors men wanted on the same side as thebattlefield as them—but not too close.Berserkers gain the following bonuses in combat: +4 bonusto CP; +1 bonus to initiative tests; defense maneuvers areresolved at +1 TN; increase WIL by 4 for damage and painreduction; and +4 bonus to any WIL tests against fear, morale,or magic.", " 8: Berserkers may not run away from an enemy withoutpassing a WIL test at 4 RS. If a Berserker runs out of enemiesto attack in his vicinity, he must make a WIL test at 3 RSto avoid attacking his own friends or innocents. He mayre-roll this test every round to try and calm himself down.", " 12: The Berserker need make no WIL tests whatsoever, ashe is fully in control of himself, even if he fights like amadman."]
    }, {
      "name": "Bloodthirsty",
      "cost": [4],
      "description": ["Your eagerness to join battle has stripped from you anyform of hesitation or restraint when moving in for the kill.Whenever you take an initiative test brought on by goingaggressive/aggressive (tests forced by maneuvers do NOTcount) you gain +1 dice for that test. There is no limit to thenumber of times this can occur in combat.Any character who faces you in combat will immediatelybecome aware that you have this boon unless you pass aSubterfuge test."]
    }, {
      "name": "Brave",
      "cost": [3],
      "description": ["You’re courageous and firm of heart. Whenever you wouldneed to make a WIL test vs fear, you may choose instead toautomatically pass the test. This does not apply to any feartests involving magic, however you gain +2 dice to your roll."]
    }, {
      "name": "Contacts",
      "cost": [1, 4, 6, 8],
      "description": ["You have access to a network of informants, friends of friends,cousins, and entire flocks of talkative little birds that you cancall upon for information.You can use Contacts to gain insight and intelligence onany subject you please. Usually this requires the expenditureof a few coins (rarely more than 2-3 sp per RS of the roll, seebelow), and may take anywhere from ten minutes to a week.Roll your CHA at the TN decided by your level in this boon,and if you meet the RS, you gain the information you need,with more BS supplying more information. The GM can setthe RS from 1 (effortless) to 8 (world-shatteringly obscure).If there is absolutely no way that information can be gainedthrough Contacts, it should be evident after the first roll.", " 1: TN 7: You know some guys.", " 4: TN 6: You know some guys who know some guys.", " 6: TN 5: You know some guys in every city and service inthe country.", " 8: TN 4: You know everyone."]
    }, {
      "name": "Direction Sense",
      "cost": [3],
      "description": ["You have an infallible sense of direction. Wherever you are,you can figure out which way is north. Your skill borders onthe supernatural, and grants youa +4 to Navigation tests.Estate (10) Character Creation onlyYou own lands, businesses, or other static wealth thatprovides you with a steady stream of income. Taking thisboon grants you an asset worth 2 wealth (see the Assetssection of Chapter 8). This boon can be taken multiple times,either to gain multiple assets (each valued at 2 wealth), or tocombine them into a bigger, badder asset.You cannot acquire assets with a wealth value greater thanthe amount your social class granted you. That is, if you area Lesser Noble, and start the game with 6 wealth, you couldtake Estate a maximum of three times for 6 additional wealth,for a total of 12, but no more."]
    }, {
      "name": "Favor",
      "cost": [1, 3],
      "description": ["Someone owes you a Favor. You may take this boon multipletimes, and for each time you do, you gain an additional Favorthat you can ‘call in’ to get something done. Confer withthe GM to see who could potentially owe your characterone. Once a Favor is called in, the debt is settled. However,if things are still amicable, there’s no reason why anotherexchange of Favors couldn’t be arranged.", " 1: Minor. Youre owed a serious Favor from a regular man,or a trifling Favor from someone of power (‘let me hide inyour house from the Baron’s men,’ or ‘get me off this larcenycharge’).", " 3: Major. You’re owed a serious Favor from a powerful individual (‘vouch for my innocence, your majesty’)."]
    }, {
      "name": "Famous",
      "cost": [2, 4],
      "description": ["People know you. Maybe you killed the Manticore ofMarienburg, or saved a princess, or something. Whateverthe reason, you gain a bonus to CHA when dealing withpeople awed by your star-power. This boon has its drawbacksthough—being recognizable makes it hard to hide, and harderstill to get away with mischief.", " 2: +2 bonus to CHA, -2 to Subterfuge or Performance rollsto avoid recognition.", " 4: +4 bonus to CHA, -4 to Subterfuge or Performance rollsto avoid recognition."]
    }, {
      "name": "Folks Back Home",
      "cost": [3, 6, 8],
      "description": ["You have a family, a clan, a tribe, or some other social groupthat you are part of that cares for you. You are probably awayfrom them right now, but they are there, waiting for yourreturn. The level of this boon determines just how influential and wealthy these folks are, and how much they mightbe able to help in the event that you go to them for aid. Nothaving this boon doesn’t necessarily mean your character isan orphan or without family, just that the family is scattered,disunited, or unlikely to be able to provide cohesive aid.", " 3: Nobody important, but they are there.", " 6: Well-to-do, and somewhat influential.", " 8: Powerful, important people."]
    }, {
      "name": "Follower",
      "cost": [5],
      "description": ["You’ve got a sidekick, a buddy, a comrade, a henchman, or aright-hand-man. Followers can be anything from unusuallyloyal mercenaries, to childhood friends, and spouses whoaren’t about to stand by while your character fights heretics,bandits and shoggoths without them.A Follower is distinguished from Allies in that the Followeris an actual character. Either you, or your GM, can write upthe stats for the Follower (at the GM’s discretion), usually ofa power level the same as or lower than their PC leader. Insome situations, an existing NPC can be drafted as a Follower,at the GM’s discretion.Followers aren’t directly under the player’s control, in thatthey are still technically NPCs under the GM’s purview, butthere’s nothing wrong with a player controlling a Followerwhile his character is injured or tied to an interrogator’s chairsomewhere.If the current PC of the Follower dies, the Follower ceasesto be a Follower. At the GM’s discretion, the Follower may stayof their own volition, leave, or even become a PC under thecontrol of the player whose character died.Some guidelines for this boon: it is not advised to letFollowers take Follower or Contacts. It just makes thingsconfusing. As well as this, don’t let this boon get out ofcontrol, and swell the group to double its original number. Itis acceptable for the GM to limit characters taking this boon,or of obtaining Followers altogether."]
    }, {
      "name": "Good Ears",
      "cost": [3],
      "description": ["You’ve got the ears of a fox. Whenmaking a PER check involving yourauditory senses, you gain a bonus of +2to the roll. Characters cannot have GoodEars at the same time as the Bad Ears bane."]
    }, {
      "name": "Good Eyes",
      "cost": [3],
      "description": ["You’ve got the eyes of a hawk. Whenmaking a PER check involving sight, yougain a bonus of +2 to the roll. Characterscannot have Good Eyes at the same time asthe Bad Eyes bane."]
    }, {
      "name": "Good Nose",
      "cost": [3],
      "description": ["The nose knows. You’ve got anexceptionally good sense of smell.Whenever making a PER check of anysort, you gain a bonus of +1 to theroll. This does not work underwater, or in situations wherean overpowering smell wouldmask everything aroundyou. If you lose your nose,you lose this boon."]
    }, {
      "name": "Hale and Hearty",
      "cost": [2, 4],
      "description": ["You’re really healthy, and you rarely become sick or sufferfrom poorly-healed wounds.", " 2: You reduce the infection chance of injuries you suffer by1. Your HLT for the purposes of resisting poison, diseaseand other ill effects (not infection) is increased by 2.", " 4: You reduce the infection chance of injuries you suffer by2. Your HLT for the purposes of resisting poison, diseaseand other ill effects (not infection) is increased by 4."]
    }, {
      "name": "Impressive Voice",
      "cost": [2],
      "description": ["You’ve got a characteristic tone to your voice that lets youinfluence people in certain ways. This comes in three varieties: powerful, grating, and soothing. You can take this boonup to three times to gain other voice qualities. Powerful: Your voice is strong, commanding, and intimidating. You gain a +2 bonus to Persuasion and Intimidation. Soothing: You have a pleasant voice, that can calm theheart and soothe the soul. You gain a +2 bonus to Orationrolls with the intent to sooth, calm, or convince. You alsogain a +4 bonus to any Performance tests that involve thevoice (song, drama, and so on)."]
    }, {
      "name": "Known for Virtue",
      "cost": [5],
      "description": ["You are known as a paragon of virtue, a protector of theweak, a champion of justice, a practitioner of mercy, or atruly honorable man. Whether this is true is not important.Being Known for Virtue gives you a degree of moral authorityover the virtuous. People will assume that you are workingfor the best, and when dealing with principled individuals,their favorable view of you grants you a +2 bonus to CHA forall social rolls, and these individuals will also be much moreinclined to give you the benefit of the doubt if you are caughtin a sticky situation.If you ever gravely dishonor yourself or otherwise compromise your perceived moral high ground, you may lose thisboon, at the GM’s discretion. For particularly egregious acts,you may even gain the Bad Reputation bane."]
    }, {
      "name": "Languages",
      "cost": [1, 2, 3],
      "description": ["You know how to fluently speak languages other than yournative tongue.", " 1: You know another native language. You may purchasethis boon multiple times during Character Creation, eachtime learning a new language.", " 2: You have a knack for languages. You know another nativelanguage, and you may purchase additional languages afterCharacter Creation for 1 arc point each, assuming you havea month or so to practice.", " 3: You’re a proper polyglot. You know a number of newlanguages equal to your INT+2. In addition, you automatically learn any language you are exposed to for more thana week by spending 1 arc point."]
    }, {
      "name": "Literate",
      "cost": [1],
      "description": ["You know how to write using your own language. If youcan speak another language, and it has the same alphabetor writing system, then you are likely able to understandand write in that language as well. This boon can be takenmultiple times to learn unfamiliar writing systems."]
    }, {
      "name": "Natural Born Killer",
      "cost": [6, 12, 18],
      "description": ["You were born to kill. Maybe you just have an exceptional,intuitive understanding of violence, or maybe you just lackinhibitions that normal people have against striking hard,fast, and first. Either way, your killer instincts give you anedge over other fighters.", " 6: You gain +1 to your CP.", " 12: You gain +2 to your CP.", " 18: You gain +3 to your CP."]
    }, {
      "name": "Natural Leader",
      "cost": [3],
      "description": ["Some people just have a knack for leadership. You’re confidentwhen dealing with other people, and your force of personalitymakes it easy for you to organize and lead groups of people.When making CHA-based rolls to lead others, either in a military setting or for some other purpose, you gain +2 to yourCHA for all social rolls."]
    }, {
      "name": "Rich",
      "cost": [1, 3, 5],
      "description": ["Gold, dinero, cash, bank, the sinews of war, the wealth ofnations! You have an unusual amount of wealth for someoneof your social class. This is cold cash, not assets, and onceyou’ve spent it, it’s gone.", " 1: Extra 10% of your base wealth.", " 3: Extra 50% of your base wealth.", " 5: Extra 100% of your base wealth."]
    }, {
      "name": "Robust",
      "cost": [8],
      "description": ["You are unusually tough, with sturdier bones and denser fleshthan most people. This makes you slightly more resistant toinjury, adding a +1 bonus to your TOU. This boon is mutuallyexclusive with the Frail bane."]
    }, {
      "name": "Tall",
      "cost": [8, 12],
      "description": ["You’re a pretty big guy. For you, this means that you have anadvantage in reach and stature over most people, which isespecially useful in combat. Characters cannot have Tall andalso the Short bane.", " 8: You’re noticeably taller than most other people, arounda head or so. You gain +1 to initiative as you have a slightlybetter vantage over your peers.", " 12: You dwarf your peers, to the point you have to squeezeyourself through normal doorways. You gain +1 to yourreach both with unarmed attacks and melee weapons,along with the +1 initiative of the first level of this boon(for a total of +1 reach and +1 initiative)."]
    }, {
      "name": "True Grit",
      "cost": [2, 4, 6],
      "description": ["Whether by hard experience, early exposure to a grim, violentworld, or some natural strength of character, you have anamazing resistance to fear, pain, and shock. Each level ofTrue Grit awards you an additional starting point of Grit.Characters cannot have True Grit at the same time as theSheltered bane.", " 2: Will of iron: +1 Grit", " 4: Nerves of steel: +2 Grit"]
    }, {
      "name": "Arrow Magnet",
      "cost": [-3],
      "description": ["You’ve got a way with arrows. They just can’t stay away fromyou. In any situation where someone would be targeted atrandom by missiles, you will be targeted first, and anyonemaking missile attacks gain a +1 dice bonus against you."]
    }, {
      "name": "Bad Ears",
      "cost": [-2, -4],
      "description": ["You just don’t have good hearing. Maybe you worked on ahowitzer range, or maybe it’s congenital.A character cannot have the Bad Ears bane at the sametime as the Good Ears boon.", " 2: You suffer a -2 to all PER checks involving hearing.", " 4: You’re stone deaf. If a check requires hearing, you can’troll at all. You can only understand people if you can seetheir mouths, or through sign language."]
    }, {
      "name": "Bad Eyes",
      "cost": [-4, -6],
      "description": ["You don’t see too well. Corrective eyeglasses may be availablein your time period, but if not... well, maybe you shouldn’t bethe one carrying the blunderbuss. Characters cannot have theBad Eyes bane at the same time as the Good Eyes boon.", " 4: You suffer a -2 to PER if not wearing glasses.", " 6: You suffer a -4 to PER if not wearing glasses, and a -2 toPER even if you are."]
    }, {
      "name": "Bad Reputation",
      "cost": [-3, -6, -9],
      "description": ["You aren’t a popular fellow. Perhaps you’re a member of anunsavory group that people generally mistrust, or maybe yourpersonal deeds (real or attributed) have made you a pariah.Either way, folks are less likely to cooperate with you and mayeven try to hurt you if they take particular offense to you! Ofcourse there will often be people who don’t care about yourreputation, and some may even approve!In certain situations, the GM may choose to waive yourpenalty, or even turn it into a bonus. For example, whileintimidating some yokels.", " 3: You’re unpopular. You suffer a -2 to all social rolls madewith people who disapprove of your reputation.", " 6: You’re generally disliked. You suffer a -4 to all social rollsmade with people who disapprove of your reputation.", " 9: You’re nearly universally despised. You suffer a -6 toall social rolls made with people who disapprove of yourreputation.Barren/Sterility (1/3) Cannot be removedYou are incapable of producing offspring. Perhaps it is genetic,or perhaps you are a eunuch… or perhaps you had an unfortunate encounter with a low-flying halberd. This bane is notunique to either gender.", " 1: Barren/Sterile. You’re simply sterile. No children foryou (or no more children. You may still feel sexual urges,depending on the nature of your condition.", " 3: Eunuch. You were made a eunuch before puberty (maleonly). This is a different situation from the above, as thishas a serious effect on the development of young men. Inaddition to all of the obvious effects of the process andthe sterility associated with it, you must also pay 2 additional arc points to level up STR or HLT. However, as a sideeffect, you gain a +2 bonus against all manner of social rollsmade with the intent to deceive, and a +2 bonus againstIntimidation attempts."]
    }, {
      "name": "Bigoted",
      "cost": [-5],
      "description": ["Man, you really hate elves. Or the whole of humankind. OrGenosians, or Dessians. Most people have some prejudices,but you hate the object of your scorn with such intensity thatyou have trouble functioning around them. It might not be tothe point of actively wishing harm on them, to say nothingof wanting to kill them, but every time you encounter oneof these people for the first time, you must make a WIL testat 4 RS to avoid making clear your loathing of them. Otherpeople may disapprove of your attitude, even those not ofthe group you despise. It will also be very difficult for you tobring yourself to help or aid a member of your despised group,possibly requiring another WIL test at the GM’s discretion.Blind (20) Cannot be removedYou’re stone fucking Blind. This brings with it certainproblems. While Blind men have been known to fightbefore, it is by no means easy, and few would recommend it.Blind characters cannot make sight-based PER checks, nor canthey do anything that strictly requires the use of their eyes.However, they do gain a +2 bonus to PER checks involvingsound, touch, and other senses to which they are naturallybetter attuned, due to their lack of sight.In combat, a Blind individual must make a PER checkbefore performing any move. The number of successes onthat check is the maximum number of CP he can dedicate tohis move (this does not include activation costs, which arepaid normally).A character cannot have Blind at the same time as theOne-Eyed bane."]
    }, {
      "name": "Braggart",
      "cost": [-3],
      "description": ["You’ve got a big mouth. You can’t help but boast of yourstrength, intelligence, or achievements, and you also can’tstand the notion of being shown up. Maybe your claims arebaseless... maybe they aren’t. Either way, you get yourself introuble a lot, and you’re incredibly easy to rile up.You suffer a -2 WIL penalty to resist Intimidation rolls, andyou must regularly relate your greatness to anyone who willlisten. You can suppress your boastful urges for a few minuteswhen it’s important by making a WIL test at 3 RS."]
    }, {
      "name": "Brain Damage",
      "cost": [-4, -8],
      "description": ["You’ve suffered an injury that has significantly damaged yourbrain. You suffer from decreased mental faculties, and maybesome neurological failures (tics, partial limb paralysis, etc).You may take or suffer this bane multiple times. When thisbane is received, also lower INT by 1d2 for Minor, and 1d5 forMajor. If this puts you at 0 or below, you are an irrecoverablevegetable, unless you have the arc points required to buy yourINT back to at least 1. If so, you emerge from a coma after aperiod of time determined by the GM. This INT loss is notsuffered if taken at Character Creation.Brain Damage can be bought off for double the cost of thebane (8 for minor, 16 for major). If Brain Damage is boughtoff, the character does not regain the INT loss from the bane,but does recover from the head traumas on the table below.", " 4: Minor. Roll on the head trauma table. The result is theeffect of the bane.", " 8: Major. Roll on the head trauma table and add 2 to yourroll.Table 6.4: Head Trauma TableRoll Effect1 No long-term effectINT loss fades in 1d10 days (concussion)2 No long-term effectINT loss fades in 2d10 days (concussion)3No long-term effectSevere dizziness and loss of coordination for 1d10 days,INT loss fades in 3d10 days (severe concussion)4 Gain Bad Eyes (Minor)5 Gain Bad Ears (Minor)6 Gain Old Wound and Bad Ears (Minor)7 Gain Old Wound and Bad Ears (Major)8 Gain Old Wound and One-Eyed9 Gain Old Wound and Mute10 Gain Old Wound and Lasting Pain (Minor)11Gain Old Wound, Lasting Pain (Minor), and lower INTby an additional 2 due to severe brain damage12 Gain Old Wound, Lasting Pain (Major), and BlindBroken Limb/Appendage (0) Cannot be removedA Broken Limb is a serious injury, but with some time and rest,it’ll be as good as new. Right?Well, theoretically anyway. If a limb is used while broken,it may not heal properly, and repeated injuries to a woundedlimb can permanently cripple it. A broken limb cannot beused for anything (wielding a sword, walking, and so on),until the wound that caused it heals (a treated broken leg canbe walked on with the aid of crutches, but at 1/4th of normalMOB, and no intense movement is possible).You may not choose this bane at Character Creation, and itcannot be bought off. The wound must heal normally.Complete Monster (10)Some people are cruel, petty, or spiteful due to their poorupbringing, the rough environment they were exposed to, oran unpleasant experience in childhood. Their insecuritiesmanifest themselves in antisocial traits developed as copingmechanisms to deal with the pain these situations caused.Not you. You may have excuses, but they’re not legitimate.You are wolf to man. Maybe you’re crazy, or maybe you’re justtoo sane. You view social concessions as an idiotic charade,proof that the people around you are just machines, automatons with no real agency in their own behavior. You’re theonly real person. They’re just puppets made out of meat. Youcan play the game, but your definition of winning and losingis much more practical. You win if you get what you want,you lose if you don’t, and everyone else is just an tool to beused or an obstacle to be overcome in the pursuit of yourdesires. You also have an uncontrollable urge to kick puppiesand steal pies.You gain a +2 bonus to Subterfuge rolls, because of yoursuperficial charm, and this remains as long as the true depthof your soulless evil remains unknown. It is possible to retaina good reputation with this bane, if you’re very clever, butanyone who realizes your true nature sees the depths of yourmonstrosity, and you gain a permanent -4 penalty to socialrolls against them, as well as losing your normal bonus toSubterfuge against them. Characters may glimpse your truenature whenever you fail a Subterfuge or Persuasion rollagainst them (context is everything, GM’s discretion), but aremuch more likely to realize it if they witness you actuallybehave like a Complete Monster.You also do not have a Belief arc, and you cannot gain oneunless this bane is bought off. This bane can be bought off,but only at double its purchasing cost (a total of 20 arc points),and requires some sort of serious soul-searching epiphany.A character cannot have Complete Monster at the sametime as the Honorable and/or Virtuous banes."]
    }, {
      "name": "Craven",
      "cost": [-4, -8],
      "description": ["You’re a coward. There’s a difference between feeling fear,and being incapable of overcoming it. A coward cannot bringhimself to confront any sort of danger, and will often try tohide, avoid, or simply flee from any possible injury or harmto himself. Craven cannot be taken with the Honorable bane.", " 4: You suffer a -2 penalty to CP in any combat situationin which you do not have a decisive and obvious advantage. You must make a WIL test at 4 RS to bring yourself toconfront any sort of danger. If you are injured by violence,you must make a WIL test at 6 RS or panic and try to escape.", " 8: You suffer a -4 penalty to CP in any combat situationin which you do not have a decisive and obvious advantage. You must make a WIL test at 6 RS to bring yourself toconfront any sort of danger. If you are injured by violence,you must make a WIL test at 8 RS or panic and try to escape.Crippled Limb/Appendage (8) Cannot be removedA Crippled Limb is one that has suffered significant damageand has not been allowed to heal properly. As a result, it haslost most or all of its functionality, and is essentially deadweight, or close to it. Someone with a crippled leg is stillbetter off than someone with no leg at all, but not by much.The Crippled Limb can be used, but at severe penalties. Anyskill tests made that require the limb suffer a +4 to their RS.Attack or defense maneuvers made with the limb suffer a +3to their TN. If the Crippled Limb is being used for locomotion(like a leg when walking, or an arm while climbing) MOB isreduced by half.Dead (100) Cannot be removedYou are dead. You may only use the Decompose maneuver."]
    }, {
      "name": "Debt",
      "cost": [-2, -4, -8],
      "description": ["You owe people. The amount is significant, but you have sometime to pay it off before bad things start happening.In many cases, nobody can actually force you to repay yourdebts (particularly if you’re an armed man with few, if any,solid assets and a horse), but moneylenders have long armsand longer memories, and a great incentive to either makeyou pay in gold, or in pounds of flesh, as an example to others.Characters that start with no wealth cannot take this bane.Each level of this bane is determined with boons and banesthat modify wealth and assets.", " 2: Minor. You owe an amount equal to the wealth you haveat the time of Character Creation, not including assets.", " 4: Moderate. You owe an amount equal to half again yourstarting wealth, not including assets.", " 8: Major. You owe an amount equal to twice your startingwealth, and starting assets."]
    }, {
      "name": "Dire Past",
      "cost": [0],
      "description": ["You’ve been through some serious stuff. Maybe you’re asurvivor of a terrible battle, or maybe you’re a veteran of theCrusades. Maybe you spent your childhood as a cabin boy ona witch-hunter’s ship, fighting infidels and blasphemous cultson the islands along the Barbary Coast. Maybe you were bornin the dark, where others merely adopted it.Write or explain a brief back-story for your character tothe GM. He will choose (or design) several banes for you, torepresent the scars and looming shadows of your dark past(you are not awarded B&B points for these banes directly).As you have survived your Dire Past, however, you gain 10additional B&B points to spend on boons. These B&B points doNOT count towards your maximum points from banes.GMs should not be lenient when choosing banes to suita character’s Dire Past. Be vicious. Old Wounds, One-Eyed,Enemies, Bad Reputation... even things like Hothead, Honorable,and Virtuous are appropriate to apply for this bane. The character isn’t just awarded 10 B&B points, that’s 10 points inaddition to what they can earn by taking banes—make themwork for it!"]
    }, {
      "name": "Enemies",
      "cost": [-3, -10, -15],
      "description": ["You have some powerful Enemies who mean to do you seriousharm. They may just want to ruin you and crush your name,or perhaps they want to cut your head off and put it on a pike.Either way, they’re willing to go out of their way—potentiallyFAR out of their way—to do it. The level of this bane indicatesjust how serious an enemy you’ve made. Enemies can eitherbe individuals of significant power, or entire organizationsor countries.", " 3: Single, dangerous individual, small group or minor organization (rival merchant, local guild).", " 10: Single, powerful individual, large group or organization, regional authorities (Sheriff of Nottingham, the CityGuard).", " 15: Incredibly powerful enemies with long arms, continent-spanning organizations (the Holy Roman Emperor,the Church, the Teutonic Order)."]
    }, {
      "name": "Facial Deformity",
      "cost": [-2, -4, -8],
      "description": ["People remember your face, and not in a good way. An injury,disease, or birth defect has marred your looks, and you tendto draw attention from your peers. You may not buy off thisbane, barring some miraculous treatment or magic.", " 2: You have a distinctive (though not particularly disfiguring) mark on your face. You suffer a -2 to checks todisguise yourself or lie about your identity, and people willhave an easy time describing you. The mark is not significant enough to disturb people. Examples include OttoSkorzeny and Ernst Blofeld.4: Your face has suffered serious injury or disfigurement. You suffer a -4 to checks to disguise yourself orlie about your identity, and people will have a very easytime describing you. In addition, you also suffer a -2 tothe first social checks you make with any person, as yourfirst impressions are poor. Intimidation rolls are exemptfrom this penalty, and may (situationally) be enhanced.Examples include Sandor Clegane and Tycho Brahe(without prosthetic).", " 8: Your face is a horrific ruin, and people may have difficultyrealizing that you are real, if they see you without warning.You suffer -6 to checks to disguise yourself or lie aboutyour identity, and people will have an incredibly easy timedescribing you. In addition, you suffer a -4 to the first socialchecks you make with any person, as your first impressions are poor, and continue to suffer -2 afterwards, asyou simply make people uncomfortable (long-time friendsand the particularly understanding might be exempt fromthese penalties). Intimidation rolls are exempt from thispenalty, and may (situationally) be enhanced. Examplesinclude Baldwin IV of Jerusalem and Joe Bonham."]
    }, {
      "name": "Fat",
      "cost": [-5],
      "description": ["You are severely overweight, and it will have a negative effecton your performance in most physical activities, as well asin combat. You suffer a -2 to your END for the purposes ofdetermining fatigue, and a -2 to MOB. On the upside, you gaina +1 to stability rolls. Fat cannot be taken at the same timeas the Skinny bane."]
    }, {
      "name": "Frail",
      "cost": [-8],
      "description": ["You are weaker of construction than most people of your race,and this renders you more vulnerable to injury. Your TOU isreduced by 1 at Character Creation. This bane is mutuallyexclusive with the Robust boon."]
    }, {
      "name": "Hemophilia",
      "cost": [-8],
      "description": ["Hemophilia is a genetic disorder that impairs the body’s abilityto control blood clotting or coagulation, and the character’sbody has trouble stopping bleeding when any vessel is broken.This is an absolutely terrible condition to have.Whenever you suffer any sort of bleed,increase the amount of bleed you gainby 5. The RS for Surgery tests madeto stop the bleeding are alwaysincreased by 2."]
    }, {
      "name": "Hothead",
      "cost": [-3],
      "description": ["“Someone get this hothead outta here!” You get angry easily, andyou’re prone to overreacting to perceived threats or insults.Whenever you feel threatened, insulted, or aggravated bysomebody, or generally frustrated with a situation, you mustmake a WIL check at 5 RS or begin either a serious verbal orphysical confrontation immediately.If you are in a situation in which starting such a confrontation would clearly not solve anything (not even by ventingyour anger by smashing something), or would very obviouslyresult in your own death, the WIL check is reduced to 3 RS."]
    }, {
      "name": "Honorable",
      "cost": [-5],
      "description": ["You’re genuinely honorable. You might not be a nice guy, youmight not be a philanthropist, but you have a real sense ofhonor. Honor can’t be bought, nor can it be awarded. Honor isfought for, acquired, and maintained with diligence. To neverbreak one’s word, freely given, to never violate certain rules,to treat others, and oneself, with respect. You’ve got this, andit is representative of real strength of character.However, those bound by honor can also be dragged downby it. Honorable behavior is not always smart behavior, andthose who break their own codes of honor are lessened by it,as an essential part of themselves dies in the act.Honorable characters gain a +2 bonus to resist Subterfuge,Intimidation, torture, and other means of prying informationfrom them. Additionally, he gains a +1 bonus to all socialchecks made to persuade, reason with, or debate those whoknow the character to be honorable (this could be everyone,if the character is famous, or just those who know him wellor have been impressed with his conduct).However, a character with this bane must always conducthimself in an honorable manner (discuss with your GM what‘honor’ means for your character, establish the principles, andstick to them) or else suffer serious consequences.A character who goes against his own principles loses thisbane, and must pay the next 10 arc points earned as a penalty,as his character works through the crisis of consciencebrought on by the collapse of his worldview. At his discretion,the GM can waive this penalty if the character’s collapse wasnot due to moral weakness so much as extreme circumstance.Honorable can also be purchased again (at the GM’s discretion)after being lost, to represent the character regaining his principles for 2 arc points.A character cannot have the Honorable bane at the sametime as the Complete Monster bane."]
    }, {
      "name": "Lasting Pain",
      "cost": [-4, -8],
      "description": ["You’ve got an injury that not only hasn’t healed properly, butthat causes you chronic or constant pain in the limb. You maylearn to live with the pain, but it is never far from your mind.Choose a target zone (such as hand, thigh, face, belly, andso on), which will be the location of the injury or defect thatcauses the Lasting Pain. If you acquire this bane through awound during play, you do not get to choose the area.", " 4: Minor. It hurts, but not too much. Each day, roll 1d10. Ona 1-8, you suffer 2 pain throughout the day. Any injury tothe area awakens this pain until the injury is fully healed.", " 8: Major. The pain can be crippling. Each day, roll 1d10. Ona 1-9, you suffer 4 pain throughout the day. Any injury tothe area awakens this pain until the injury is fully healed."]
    }, {
      "name": "Mute",
      "cost": [-5, -8],
      "description": ["You can’t talk. Perhaps you’ve suffered a throat injury or hadyour tongue cut out. Perhaps you’ve been that way since birth,or maybe a disease ravaged your vocal chords. Either way, youcannot communicate verbally in a meaningful fashion.", " 5: You cannot form words, but you can cry out, shout, orotherwise make vocal sounds to, say, alert your sleepingfriends that you are surrounded by giant spiders.", " 8: You can neither speak nor make any other vocal sounds,and must communicate entirely by writing or using signlanguage.Oath (2 to 10)You’ve sworn a solemn oath, in good conscience and of yourown accord. An Oath is a vow or obligation that a characterhas made, to himself, to others, or to God. This bane assumesthat the Oath in question was made honestly—simply takingan Oath and then breaking it casually when out of sightdoesn’t count.If you ever break the Oath (setting aside mitigatingcircumstances, for example, breaking a vow of silence towarn a child of danger, or to inform the Pope of the assassindrawing up behind him) you must pay arc points as you earnthem equal to twice the value of the bane, as you struggleemotionally with your failure. You may choose to retain yourOath after these arc points have been paid, or to abandon itand lose this bane at no further cost.Oaths can be worth between 2 and 10 depending on theseverity of the Oath being taken. An Oath of fealty for aknight might be worth 2, since it’s not something that wouldbe hard for him to keep, whereas a vow of silence could beworth more, and a vow of pacifism could be worth as muchas 10, depending on the character’s background and premise.Consult with your GM to decide what an Oath should beworth. Generally, the harder it would be to keep, the moreit should be worth."]
    }, {
      "name": "Old Wound",
      "cost": [-1],
      "description": ["You’ve suffered a severe injury that has never quite healedproperly, and still pains you from time to time, and is particularly sensitive to further injury.Choose a hit location (such as the hand, thigh, face) thatwill be the location of the Old Wound. If you acquire this banethrough a wound, you obviously cannot choose the area. Anyattack that hits this location automatically inflicts stun equalto a level 1 wound to that area, ignoring all reductions, evenif the attack inflicts no wound.If this bane is bought off, its cost to remove it is 5, insteadof the 1 suggested by its cost.One-Eyed (10) Cannot be removedYou’ve lost an eye! Perhaps it was an accident, or throughinjury in combat, or maybe you were born with only one functional eye. Stuff happens. Having one eye can be a disadvantage in combat and in daily life. One-Eyed people can learnto compensate for their lackof depth perception withsimple tricks, howeverit is still difficult forOne-Eyed characters togauge distances.PER tests to spot things and gauge distances suffer a +1 RS.You also suffer a -1 to your CP in melee combat, and a penaltyof -2 to your CP when making ranged attacks.If you buy off this bane, you don’t grow a new eye, butbecome so accustomed to only having one that you no longersuffer the penalties. You cannot remove the bane, howeverthe penalties don’t apply anymore.If somehow you acquire two One-Eyed banes, then youregrettably lose both One-Eyed banes, and gain the Blind bane,unless you have more than two eyes (for example, if you area Goliath spider possessed by the spirit of a dead pirate, or atriclops)At Character Creation, you may take this bane as a 2 FacialDeformity to represent the One-Eyed bane you have ‘boughtoff’ before Character Creation. Do not apply penalties fromOne-Eyed, but other rules still take effect.Characters cannot have One-Eyed at the same time as theBlind bane."]
    }, {
      "name": "Poor",
      "cost": [-4, -6, -8],
      "description": ["You’re unusually poor for your class in society. You lack funds,perhaps because you or your ancestors made poor investments, without falling too far in social status. Either way,it’s likely that you’re still trying to claw your wayback into relative affluence. Maybeit’s even what motivates you.Characters cannot have thePoor bane at the same timeas the Rich boon.", " 4: You start with half (50%)the wealth of a normal characterof your social class and wealth level.You may only take this level of the bane if your character isof wealth level 2 or higher, or with GM’s permission.", " 6: You start with a quarter (25%) the wealth of a normalcharacter of your social class and wealth level. You mayonly take this level of the bane if your character is of wealthlevel 3 or higher, or with GM’s permission.", " 8: You start with no wealth. You may only take this level ofthe bane if your character is of wealth level 4 or higher, orwith GM’s permission.Severed Limb/Appendage (10/15/18) Cannot be removedYou’re missing an arm or a leg. This could be the whole arm orleg, or just the hand or foot, but the loss of the manipulatorat the end is what’s important. The penalty for having lost alimb is serious. If you choose this bane at Character Creation,choose an affected limb, and how much of it is missing. If yousuffer this bane because of a wound, then of course you haveno say in where the limb has been lost.", " 10: The hand or foot is lost.", " 15: The lower half of the limb is lost (from elbow or knee).", " 18: The full limb is lost (from the shoulder or hip).HandYou cannot perform any task that requires both hands, oruse any two-handed weapon. Gripped shields cannot be used(strapped shields can, with minor modification).Lower Arm (from the Elbow)You cannot perform any task that requires both hands, oruse any two-handed weapon. No shields of any kind canbe used. All weapon maneuvers suffer a +1 activation costbecause of your loss of balance. You may pay 5 arc pointsto remove the activation cost (representing your charactergetting used to the missing limb). You can no longer performthe Punch or Elbow maneuvers without a prosthetic. All grappling maneuver TNs are increased by 1.Full Arm (from the Upper Arm to Shoulder)You cannot perform any task that requires both hands, or useany two-handed weapon. No shields can be used. All weaponmaneuvers suffer a +2 activation cost because of your loss ofbalance. You may pay 8 arc points to remove the activationcost (representing your character getting used to the missinglimb). All grappling maneuver TNs are increased by 2.Missing both hands or arms prevents you from using anyheld weapons. It is possible to grapple unless you are missingboth arms to the elbow or more, but penalties are cumulative.Foot (from the Foot or lower Shin)You suffer a -2 penalty to MOB, and must make a stability rollat 2 RS whenever moving faster than a slow limp (a quarterof normal speed) or fall. All stability rolls forced upon you byother sources have their RS increased by 1. You suffer a CPpenalty of 2 in combat in addition to these other penalties,and all Void maneuvers have their TNs increased by 2.Lower Leg (from the upper Shin to Knee)You cannot walk except to possibly hop at a quarter of normalMOB. You must make a stability test every turn you movelike this at 3 RS, or fall and be prone. All stability rolls forcedupon you by other sources have their RS increased by 2. Yousuffer a CP penalty of 4 in combat in addition to these otherpenalties, and all Void maneuvers have a +2 activation cost,and their TNs increased by 2. A crutch can allow you to moveat half the normal MOB without a chance of falling, andreduce the CP penalty to 2, but you cannot run, and a crutchprecludes using a weapon on the lost-leg-side hand, and theuse of 2H weapons. You cannot perform Knee or Kick maneuvers with your lost leg, and may only perform kicks with yourremaining leg (if you have one) while prone, or with a crutchat +1 TN and +1 activation cost.Full Leg (from the Thigh to Hip)You cannot walk except to possibly hop at a quarter of normalMOB. You must make a stability test every turn you movelike this at 4 RS, or fall and be prone. All stability rolls forcedupon you by other sources have their RS increased by 3. Yousuffer a CP penalty of 4 in combat in addition to these otherpenalties, and all Void maneuvers have a +2 activation cost,and their TNs increased by 2. A crutch can allow you to moveat half the normal MOB without a chance of falling, andreduce the CP penalty to 2, but you cannot run, and a crutchprecludes using a weapon on the lost-leg-side hand, and theuse of 2H weapons. You cannot perform Knee or Kick maneuvers with your lost leg, and may only perform kicks with yourremaining leg (if you have one) while prone, or with a crutchat +1 TN and +2 activation cost.If both legs are lost, movement is extremely difficult. MOBis reduced to an effective 1, running is not possible. Combat isunthinkable. You are permanently prone, and cannot performVoid maneuvers.If the remainder of a recently severed limb is used withoutgiving it time to heal, the user immediately gains 4 stun and1 pain.Prosthetics are available, and will mitigate some of the issueswith missing limbs."]
    }, {
      "name": "Sheltered",
      "cost": [-2, -4, -6],
      "description": ["For some reason, you aren’t quite as used to the world as youshould be. You’re less hardened against the harshness of theworld, and things tend to affect you more than your fellows.You start with less Grit than you normally would. You cannotreduce your Grit beyond 0.A character cannot have the Sheltered bane at the sametime as the True Grit boon.", " 2: Softy. -1 Grit.", " 4: Seriously sheltered. -2 Grit.", " 6: You don’t even know what color blood is. -3 Grit."]
    }, {
      "name": "Short",
      "cost": [-8, -15],
      "description": ["You’re much shorter than normal for your race. This negatively affects your reach and your MOB, but you also tireless easily, and you’re a harder target for archers and otherattackers with missiles. A character cannot have the Shortbane at the same time as the Tall boon.", " 8: You’re about 20% shorter than the average person.You suffer -1 to both reach and MOB, but you reduce yourfatigue speed by 1x (to a minimum of 1x) for the purposesof acquiring fatigue points. Missile attacks reduce their CPagainst you by 1.", " 15: You’re about 30% shorter than the average person, andquite possibly have some form of dwarfism. You suffer a-2 to both reach and MOB, but you reduce your fatiguespeed gain by 1x (to a minimum of 1x) for the purposes ofacquiring fatigue points. Missile attacks reduce their CPagainst you by 1. This is not cumulative with the minorversion of Short."]
    }, {
      "name": "Skinny",
      "cost": [-3],
      "description": ["You’re thin as a rail, likely to blow away in a stiff breeze. Yousuffer a -1 to your stability rolls, and your effective CAR fordetermining encumbrance is reduced by 1. However, yourfatigue speed is reduced by 1x (to a minimum of 1x) for thepurposes of acquiring fatigue points.Characters cannot have the Skinny bane at the same timeas the Fat bane."]
    }, {
      "name": "Technologically Impaired",
      "cost": [-5],
      "description": ["You lack a working knowledge of modern technology, andhave great difficulty understanding how all these newfangleddevices work. You may not have any proficiency in a weaponconsidered modern, nor knowledge of or skills pertainingto any sciences that are on the cutting edge. You may haveoutdated or obsolete expertise, though—confer with your GM.If you want to acquire a new proficiency involving amodern weapon, or to acquire skills pertaining to moderntechnology, the first point or rank you buy in any of theseproficiencies or skills costs double the normal amount of arcpoints. As well as this, if you’re trying to acquire a new proficiency in a modern weapon, you must make an INT check atan RS determined by the complexity of the device (a handspanned crossbow being 2 RS, a cranequin-spanned crossbowbeing 4 RS, a wheellock musket being 5 RS, and a Puckle gunbeing 6 RS—the GM has the final say on what the RS forfiguring out a weapon is). Success means that you manageto figure out the weapon sufficiently to take proficiency in it.Failure means you still spend the arc points, but do not gainproficiency in it. However, you may try again, this time witha cumulative -1 RS."]
    }, {
      "name": "Unhappily Married",
      "cost": [-1, -2, -3],
      "description": ["Your significant other doesn’t like you very much, whether ornot the feeling is mutual. They will go to lengths to make yourlife more difficult, and will generally be a pain in the neck.They can be eluded for a short time, but they always catch upto you in the end.", " 1: The spouse only makes a minor fuss, whether treatingguests badly and bringing disgrace to your name, orspreading rumors about you while you’re out adventuring.", " 2: The spouse actively tries to disrupt your life in some way.The gravity of this torment depends on the social class andwealth of the spouse—a disgruntled peasant wife mightintentionally undercook your lunch, but your treacheroushusband the Duke might humiliate you in court.", " 3: The spouse really has it out for you, and they have yourin-laws to back them up. A poorer family might just regularly harangue you or work to make your life miserable.In noble courts, this sort of bitterness results in assassinswith ropes hiding in your bedroom, and having to drinkout of a hip flask at every meal."]
    }, {
      "name": "Virtuous",
      "cost": [-5],
      "description": ["You possess that greatest of weaknesses, the one flaw that hasbeen the bane of more otherwise perfectly competent andambitious heroes than any other: you are a genuinely moral,honest, and righteous person.Perhaps it’s just in your nature, or perhaps you were justraised well. You’ve got a conscience, a desire to help people,and while you may not be a pacifist, you’re no murderer, andyou despise senseless violence, drawing the sword only whennecessary. This isn’t an easy way to live. Historically, paragonsof morality were few and far between, and it has often beensaid that ‘the good die young.’If you ever act in an immoral, unnecessarily cruel or ruthless fashion, you must pay the next 10 arc points you earn, asyou are wracked by your conscience. However, if you immediately act to try and make up for your moral transgression,by making amends with the wronged or through atonementto society or God, this loss is reduced to 5 arc points.A character cannot have the Virtuous bane at the sametime as the Complete Monster bane."]
    }, {
      "name": "Wanted",
      "cost": [-5, -10, -15],
      "description": ["You’re wanted by the law, either in your own country,or others. Believe it or not, even in the medieval era,people often acknowledged the criminals of otherkingdoms. Often, but not always. Whomever you’vecommitted a crime against, they’re willing to go tolengths to retrieve you.", " 5: Alive.", " 10: Dead."]
    }];

    /* src\boonsandbanes\boonsandbanes.svelte generated by Svelte v3.37.0 */
    const file$b = "src\\boonsandbanes\\boonsandbanes.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[8] = list;
    	child_ctx[9] = i;
    	return child_ctx;
    }

    function get_each_context_1$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[10] = list[i];
    	child_ctx[12] = i;
    	return child_ctx;
    }

    // (70:2) {:else}
    function create_else_block$4(ctx) {
    	let p;

    	const block = {
    		c: function create() {
    			p = element("p");
    			p.textContent = "Loading";
    			add_location(p, file$b, 70, 4, 1646);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(70:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (57:57) {#if i < boon.cost.length - 1}
    function create_if_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("/");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(57:57) {#if i < boon.cost.length - 1}",
    		ctx
    	});

    	return block;
    }

    // (57:21) {#each boon.cost as level, i}
    function create_each_block_1$4(ctx) {
    	let t_value = /*level*/ ctx[10] + "";
    	let t;
    	let if_block_anchor;
    	let if_block = /*i*/ ctx[12] < /*boon*/ ctx[7].cost.length - 1 && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			t = text(t_value);
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*boons*/ 2 && t_value !== (t_value = /*level*/ ctx[10] + "")) set_data_dev(t, t_value);

    			if (/*i*/ ctx[12] < /*boon*/ ctx[7].cost.length - 1) {
    				if (if_block) ; else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$4.name,
    		type: "each",
    		source: "(57:21) {#each boon.cost as level, i}",
    		ctx
    	});

    	return block;
    }

    // (59:6) <Col>
    function create_default_slot_2$4(ctx) {
    	let p;
    	let t_value = /*boon*/ ctx[7].description[0] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$b, 59, 8, 1410);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*boons*/ 2 && t_value !== (t_value = /*boon*/ ctx[7].description[0] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$4.name,
    		type: "slot",
    		source: "(59:6) <Col>",
    		ctx
    	});

    	return block;
    }

    // (55:4) <Row>
    function create_default_slot_1$6(ctx) {
    	let div0;
    	let t0_value = /*boon*/ ctx[7].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let col;
    	let t4;
    	let div1;
    	let input;
    	let input_max_value;
    	let t5;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*boon*/ ctx[7].cost;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
    	}

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_2$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[3].call(input, /*each_value*/ ctx[8], /*boon_index*/ ctx[9]);
    	}

    	const block = {
    		c: function create() {
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(" (");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = text(")");
    			t3 = space();
    			create_component(col.$$.fragment);
    			t4 = space();
    			div1 = element("div");
    			input = element("input");
    			t5 = space();
    			attr_dev(div0, "class", "col-sm-2");
    			add_location(div0, file$b, 55, 6, 1252);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "0");
    			attr_dev(input, "max", input_max_value = /*boon*/ ctx[7].cost.length);
    			add_location(input, file$b, 62, 8, 1489);
    			attr_dev(div1, "class", "col-sm-2");
    			add_location(div1, file$b, 61, 6, 1458);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t0);
    			append_dev(div0, t1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div0, t2);
    			insert_dev(target, t3, anchor);
    			mount_component(col, target, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, div1, anchor);
    			append_dev(div1, input);
    			set_input_value(input, /*boon*/ ctx[7].level);
    			insert_dev(target, t5, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(input, "input", input_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*boons*/ 2) && t0_value !== (t0_value = /*boon*/ ctx[7].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*boons*/ 2) {
    				each_value_1 = /*boon*/ ctx[7].cost;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			const col_changes = {};

    			if (dirty & /*$$scope, boons*/ 8194) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);

    			if (!current || dirty & /*boons*/ 2 && input_max_value !== (input_max_value = /*boon*/ ctx[7].cost.length)) {
    				attr_dev(input, "max", input_max_value);
    			}

    			if (dirty & /*boons*/ 2 && to_number(input.value) !== /*boon*/ ctx[7].level) {
    				set_input_value(input, /*boon*/ ctx[7].level);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div0);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(col, detaching);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t5);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$6.name,
    		type: "slot",
    		source: "(55:4) <Row>",
    		ctx
    	});

    	return block;
    }

    // (54:2) {#each boons as boon (boon.name)}
    function create_each_block$7(key_1, ctx) {
    	let first;
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_1$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(row.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const row_changes = {};

    			if (dirty & /*$$scope, boons*/ 8194) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(54:2) {#each boons as boon (boon.name)}",
    		ctx
    	});

    	return block;
    }

    // (53:0) <Row>
    function create_default_slot$6(ctx) {
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_1_anchor;
    	let current;
    	let each_value = /*boons*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*boon*/ ctx[7].name;
    	validate_each_keys(ctx, each_value, get_each_context$7, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$7(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$7(key, child_ctx));
    	}

    	let each_1_else = null;

    	if (!each_value.length) {
    		each_1_else = create_else_block$4(ctx);
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();

    			if (each_1_else) {
    				each_1_else.c();
    			}
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);

    			if (each_1_else) {
    				each_1_else.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*boons*/ 2) {
    				each_value = /*boons*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$7, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$7, each_1_anchor, get_each_context$7);
    				check_outros();

    				if (each_value.length) {
    					if (each_1_else) {
    						each_1_else.d(1);
    						each_1_else = null;
    					}
    				} else if (!each_1_else) {
    					each_1_else = create_else_block$4(ctx);
    					each_1_else.c();
    					each_1_else.m(each_1_anchor.parentNode, each_1_anchor);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d(detaching);
    			}

    			if (detaching) detach_dev(each_1_anchor);
    			if (each_1_else) each_1_else.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$6.name,
    		type: "slot",
    		source: "(53:0) <Row>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let h2;
    	let t1;
    	let p0;
    	let t2;
    	let t3;
    	let t4;
    	let p1;
    	let t5;
    	let t6_value = /*getBoonPoints*/ ctx[2](/*boons*/ ctx[1]) + "";
    	let t6;
    	let t7;
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot$6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Boones and Banes";
    			t1 = space();
    			p0 = element("p");
    			t2 = text("Used PCP: ");
    			t3 = text(/*usedPCP*/ ctx[0]);
    			t4 = space();
    			p1 = element("p");
    			t5 = text("Used BnB Points: ");
    			t6 = text(t6_value);
    			t7 = space();
    			create_component(row.$$.fragment);
    			add_location(h2, file$b, 49, 0, 1094);
    			add_location(p0, file$b, 50, 0, 1120);
    			add_location(p1, file$b, 51, 0, 1147);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t2);
    			append_dev(p0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t5);
    			append_dev(p1, t6);
    			insert_dev(target, t7, anchor);
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*usedPCP*/ 1) set_data_dev(t3, /*usedPCP*/ ctx[0]);
    			if ((!current || dirty & /*boons*/ 2) && t6_value !== (t6_value = /*getBoonPoints*/ ctx[2](/*boons*/ ctx[1]) + "")) set_data_dev(t6, t6_value);
    			const row_changes = {};

    			if (dirty & /*$$scope, boons*/ 8194) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t7);
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(4, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Boonsandbanes", slots, []);
    	const bnbPoints = [-15, -10, -5, 0, 5, 10, 15, 20, 25, 30];
    	let boons = boonList; // { name: , level:}

    	boons.forEach(boon => {
    		boon.level = 0;
    	});

    	function getBoonPoints(input) {
    		if (input.length == 0) {
    			return 0;
    		}

    		let sum = 0;

    		boonList.forEach(boon => {
    			if (boon.level > 0) {
    				sum += boon.cost[boon.level - 1];
    			}
    		});

    		return sum;
    	}

    	function getUsedPCP(input) {
    		let sum = getBoonPoints(input);

    		if (sum < bnbPoints[0]) {
    			return 0;
    		}

    		for (let n = 0; n < bnbPoints.length; n++) {
    			if (n < bnbPoints.length - 1) {
    				if (sum >= bnbPoints[n] && sum < bnbPoints[n + 1]) {
    					return n + 1;
    				}
    			} else if (sum == bnbPoints[n]) {
    				return n + 1;
    			}
    		}
    	}

    	let { usedPCP } = $$props;
    	const writable_props = ["usedPCP"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Boonsandbanes> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler(each_value, boon_index) {
    		each_value[boon_index].level = to_number(this.value);
    		$$invalidate(1, boons);
    	}

    	$$self.$$set = $$props => {
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		boonList,
    		character,
    		bnbPoints,
    		boons,
    		getBoonPoints,
    		getUsedPCP,
    		usedPCP,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("boons" in $$props) $$invalidate(1, boons = $$props.boons);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*boons*/ 2) ;

    		if ($$self.$$.dirty & /*boons*/ 2) {
    			$$invalidate(0, usedPCP = getUsedPCP(boons));
    		}

    		if ($$self.$$.dirty & /*boons*/ 2) {
    			{
    				set_store_value(character, $character.boonsAndBanes = boons.filter(boon => boon.level > 0), $character);
    			}
    		}
    	};

    	return [usedPCP, boons, getBoonPoints, input_input_handler];
    }

    class Boonsandbanes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { usedPCP: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Boonsandbanes",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*usedPCP*/ ctx[0] === undefined && !("usedPCP" in props)) {
    			console.warn("<Boonsandbanes> was created without expected prop 'usedPCP'");
    		}
    	}

    	get usedPCP() {
    		throw new Error("<Boonsandbanes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set usedPCP(value) {
    		throw new Error("<Boonsandbanes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const skillList = ["Athletics",
    "Chymistry",
    "Climbing",
    "Cooking",
    "Crafting",
    "Drill",
    "Engineering",
    "Gathering Information",
    "History",
    "Hunting",
    "Intimidation",
    "Knowledge",
    "Navigation",
    "Observation",
    "Oration",
    "Performance",
    "Persuasion",
    "Profession",
    "Research",
    "Riding",
    "Sailing",
    "Stealth",
    "Strategy",
    "Subterfuge",
    "Surgery",
    "Swimming",
    "Tactics",
    "Thievery"];

    const packetList = [{
        name: 'Academic',
        skills: [
          ['Chymistry', 'Engineering', 'Knowledge (Politics)'], 'Knowledge', 'Knowledge', 'Research'
        ]
      },
      {
        name: 'Athlete',
        skills: ['Athletics', 'Athletics', 'Climbing', 'Swimming']
      },
      {
        name: 'Criminal',
        skills: [
          'Gather Information', 'Intimidation', 'Knowledge (Criminal)', 'Observation'
        ]
      },
      {
        name: 'Domestic',
        skills: ['Cooking', 'Cooking', 'Crafting (Homestead)', 'Crafting (Homestead)']
      },
      {
        name: 'Farmer',
        skills: ['Cooking', 'Crafting (Wood)', 'Profession (Farmer)', 'Profession (Farmer)']
      },
      {
        name: 'Guard',
        skills: ['Intimidate', 'Knowledge (Criminal)', 'Observation', 'Observation']
      },
      {
        name: 'Hunter',
        skills: ['Hunting', 'Hunting', 'Navigation', ['Riding', 'Stealth']]
      },
      {
        name: 'Merchant',
        skills: ['Gathering Information', 'Knowledge (Finance)', 'Persuasion', 'Profession']
      },
      {
        name: 'Nobleman',
        skills: ['Knowledge (Nobility)', 'Knowledge (Politics)', 'Oration', 'Persuasion']
      },
      {
        name: 'Officer',
        skills: ['Drill', 'Navigation', 'Strategy', 'Tactics']
      }, {
        name: 'Politician',
        skills: ['Knowledge (Nobility)', 'Knowledge (Politics)', 'Oration', 'Persuasion']
      }, {
        name: 'Sailor',
        skills: ['Navigation', 'Profession (Sailor)', 'Sailing', 'Sailing']
      }, {
        name: 'Scout',
        skills: [
          ['Athletics', 'Riding'], 'Navigation', 'Observation', 'Stealth'
        ]
      }, {
        name: 'Soldier',
        skills: [
          ['Athletics', 'Riding'], 'Drill', 'Drill', 'Tactics'
        ]
      }, {
        name: 'Surgeon',
        skills: ['Chymistry', 'Profession (Doctor)', 'Surgery', 'Surgery']
      }, {
        name: 'Thief',
        skills: ['Observation', 'Stealth', 'Thievery', 'Thievery']
      }, {
        name: 'Tradesman',
        skills: ['Crafting (Trade)', 'Persuasion', 'Profession (Trade)', 'Profession (Trade)']
      },
    ];

    /*
    {
      name: '',
      skills: [
        ''
      ]
    },
    */

    /* src\skills\skills.svelte generated by Svelte v3.37.0 */
    const file$a = "src\\skills\\skills.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[23] = list;
    	child_ctx[24] = i;
    	return child_ctx;
    }

    function get_each_context_1$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[25] = list[i];
    	child_ctx[26] = list;
    	child_ctx[27] = i;
    	return child_ctx;
    }

    function get_each_context_2$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[29] = i;
    	return child_ctx;
    }

    function get_each_context_3$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[30] = list[i];
    	child_ctx[29] = i;
    	return child_ctx;
    }

    // (275:2) <Col>
    function create_default_slot_8$2(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Used PCP: ");
    			t1 = text(/*usedPCP*/ ctx[0]);
    			add_location(p, file$a, 275, 4, 6787);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*usedPCP*/ 1) set_data_dev(t1, /*usedPCP*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$2.name,
    		type: "slot",
    		source: "(275:2) <Col>",
    		ctx
    	});

    	return block;
    }

    // (278:2) <Col>
    function create_default_slot_7$2(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = /*skillPCPCosts*/ ctx[5][/*usedPCP*/ ctx[0] - 1] + 2 * /*int*/ ctx[3] + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Used Points; ");
    			t1 = text(/*usedPoints*/ ctx[4]);
    			t2 = text(" (");
    			t3 = text(t3_value);
    			t4 = text(")");
    			add_location(p, file$a, 278, 4, 6835);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*usedPoints*/ 16) set_data_dev(t1, /*usedPoints*/ ctx[4]);
    			if (dirty[0] & /*usedPCP, int*/ 9 && t3_value !== (t3_value = /*skillPCPCosts*/ ctx[5][/*usedPCP*/ ctx[0] - 1] + 2 * /*int*/ ctx[3] + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$2.name,
    		type: "slot",
    		source: "(278:2) <Col>",
    		ctx
    	});

    	return block;
    }

    // (274:0) <Row>
    function create_default_slot_6$2(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_8$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	col1 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_7$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty[0] & /*usedPCP*/ 1 | dirty[1] & /*$$scope*/ 2) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty[0] & /*usedPCP, int, usedPoints*/ 25 | dirty[1] & /*$$scope*/ 2) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(col1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$2.name,
    		type: "slot",
    		source: "(274:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (294:8) {:else}
    function create_else_block$3(ctx) {
    	let p;
    	let t_value = /*skill*/ ctx[22] + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$a, 294, 10, 7318);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activePackets*/ 4 && t_value !== (t_value = /*skill*/ ctx[22] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(294:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (288:8) {#if Array.isArray(skill)}
    function create_if_block$3(ctx) {
    	let select;
    	let mounted;
    	let dispose;
    	let each_value_3 = /*skill*/ ctx[22];
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3$1(get_each_context_3$1(ctx, each_value_3, i));
    	}

    	function select_change_handler() {
    		/*select_change_handler*/ ctx[12].call(select, /*each_value_1*/ ctx[26], /*packet_index*/ ctx[27]);
    	}

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (/*packet*/ ctx[25].activeChoice === void 0) add_render_callback(select_change_handler);
    			add_location(select, file$a, 288, 10, 7121);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*packet*/ ctx[25].activeChoice);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", select_change_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*activePackets*/ 4) {
    				each_value_3 = /*skill*/ ctx[22];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3$1(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}

    			if (dirty[0] & /*activePackets*/ 4) {
    				select_option(select, /*packet*/ ctx[25].activeChoice);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(288:8) {#if Array.isArray(skill)}",
    		ctx
    	});

    	return block;
    }

    // (290:12) {#each skill as option, i}
    function create_each_block_3$1(ctx) {
    	let option;
    	let t_value = /*option*/ ctx[30] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*i*/ ctx[29];
    			option.value = option.__value;
    			add_location(option, file$a, 290, 14, 7216);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activePackets*/ 4 && t_value !== (t_value = /*option*/ ctx[30] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3$1.name,
    		type: "each",
    		source: "(290:12) {#each skill as option, i}",
    		ctx
    	});

    	return block;
    }

    // (287:6) {#each packet.skills as skill, i}
    function create_each_block_2$2(ctx) {
    	let show_if;
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (show_if == null || dirty[0] & /*activePackets*/ 4) show_if = !!Array.isArray(/*skill*/ ctx[22]);
    		if (show_if) return create_if_block$3;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx, [-1]);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$2.name,
    		type: "each",
    		source: "(287:6) {#each packet.skills as skill, i}",
    		ctx
    	});

    	return block;
    }

    // (298:6) <Button on:click={addPacket(packet.name, packet.activeChoice)}>
    function create_default_slot_5$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("+");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$3.name,
    		type: "slot",
    		source: "(298:6) <Button on:click={addPacket(packet.name, packet.activeChoice)}>",
    		ctx
    	});

    	return block;
    }

    // (299:6) <Button on:click={removePacket(packet.name)}>
    function create_default_slot_4$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("-");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$3.name,
    		type: "slot",
    		source: "(299:6) <Button on:click={removePacket(packet.name)}>",
    		ctx
    	});

    	return block;
    }

    // (285:4) <Col>
    function create_default_slot_3$3(ctx) {
    	let p;
    	let strong;
    	let t0_value = /*packet*/ ctx[25].name + "";
    	let t0;
    	let t1;
    	let t2;
    	let button0;
    	let t3;
    	let button1;
    	let t4;
    	let current;
    	let each_value_2 = /*packet*/ ctx[25].skills;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$2(get_each_context_2$2(ctx, each_value_2, i));
    	}

    	button0 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_5$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*addPacket*/ ctx[6](/*packet*/ ctx[25].name, /*packet*/ ctx[25].activeChoice))) /*addPacket*/ ctx[6](/*packet*/ ctx[25].name, /*packet*/ ctx[25].activeChoice).apply(this, arguments);
    	});

    	button1 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_4$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", function () {
    		if (is_function(/*removePacket*/ ctx[7](/*packet*/ ctx[25].name))) /*removePacket*/ ctx[7](/*packet*/ ctx[25].name).apply(this, arguments);
    	});

    	const block = {
    		c: function create() {
    			p = element("p");
    			strong = element("strong");
    			t0 = text(t0_value);
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t2 = space();
    			create_component(button0.$$.fragment);
    			t3 = space();
    			create_component(button1.$$.fragment);
    			t4 = space();
    			add_location(strong, file$a, 285, 9, 7001);
    			add_location(p, file$a, 285, 6, 6998);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, strong);
    			append_dev(strong, t0);
    			insert_dev(target, t1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t2, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t4, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if ((!current || dirty[0] & /*activePackets*/ 4) && t0_value !== (t0_value = /*packet*/ ctx[25].name + "")) set_data_dev(t0, t0_value);

    			if (dirty[0] & /*activePackets*/ 4) {
    				each_value_2 = /*packet*/ ctx[25].skills;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t2.parentNode, t2);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 2) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 2) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(285:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (284:2) {#each activePackets as packet}
    function create_each_block_1$3(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty[0] & /*activePackets*/ 4 | dirty[1] & /*$$scope*/ 2) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$3.name,
    		type: "each",
    		source: "(284:2) {#each activePackets as packet}",
    		ctx
    	});

    	return block;
    }

    // (283:0) <Row>
    function create_default_slot_2$3(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*activePackets*/ ctx[2];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*removePacket, activePackets, addPacket*/ 196) {
    				each_value_1 = /*activePackets*/ ctx[2];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(283:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (307:4) <Col>
    function create_default_slot_1$5(ctx) {
    	let p0;
    	let t0_value = /*skill*/ ctx[22].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let input;
    	let input_min_value;
    	let t2;
    	let mounted;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[13].call(input, /*each_value*/ ctx[23], /*skill_index*/ ctx[24]);
    	}

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			input = element("input");
    			t2 = space();
    			add_location(p0, file$a, 307, 6, 7608);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", input_min_value = /*getMinSkillInput*/ ctx[8](/*skill*/ ctx[22].name));
    			attr_dev(input, "max", "8");
    			add_location(input, file$a, 309, 8, 7646);
    			add_location(p1, file$a, 308, 6, 7634);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, input);
    			set_input_value(input, /*skill*/ ctx[22].level);
    			insert_dev(target, t2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", input_input_handler),
    					listen_dev(input, "change", /*updateVars*/ ctx[9], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty[0] & /*activeSkills*/ 2 && t0_value !== (t0_value = /*skill*/ ctx[22].name + "")) set_data_dev(t0, t0_value);

    			if (dirty[0] & /*activeSkills*/ 2 && input_min_value !== (input_min_value = /*getMinSkillInput*/ ctx[8](/*skill*/ ctx[22].name))) {
    				attr_dev(input, "min", input_min_value);
    			}

    			if (dirty[0] & /*activeSkills*/ 2 && to_number(input.value) !== /*skill*/ ctx[22].level) {
    				set_input_value(input, /*skill*/ ctx[22].level);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$5.name,
    		type: "slot",
    		source: "(307:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (306:2) {#each activeSkills as skill}
    function create_each_block$6(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_1$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty[0] & /*activeSkills*/ 2 | dirty[1] & /*$$scope*/ 2) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(306:2) {#each activeSkills as skill}",
    		ctx
    	});

    	return block;
    }

    // (305:0) <Row>
    function create_default_slot$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*activeSkills*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*getMinSkillInput, activeSkills, updateVars*/ 770) {
    				each_value = /*activeSkills*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$5.name,
    		type: "slot",
    		source: "(305:0) <Row>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let row0;
    	let t0;
    	let h30;
    	let t2;
    	let row1;
    	let t3;
    	let hr;
    	let t4;
    	let h31;
    	let t6;
    	let row2;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_6$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row2 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot$5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row0.$$.fragment);
    			t0 = space();
    			h30 = element("h3");
    			h30.textContent = "Packets";
    			t2 = space();
    			create_component(row1.$$.fragment);
    			t3 = space();
    			hr = element("hr");
    			t4 = space();
    			h31 = element("h3");
    			h31.textContent = "Skills";
    			t6 = space();
    			create_component(row2.$$.fragment);
    			add_location(h30, file$a, 281, 0, 6925);
    			add_location(hr, file$a, 302, 0, 7531);
    			add_location(h31, file$a, 303, 0, 7538);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(row0, target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, h30, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(row1, target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, h31, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(row2, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty[0] & /*usedPCP, int, usedPoints*/ 25 | dirty[1] & /*$$scope*/ 2) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty[0] & /*activePackets*/ 4 | dirty[1] & /*$$scope*/ 2) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    			const row2_changes = {};

    			if (dirty[0] & /*activeSkills*/ 2 | dirty[1] & /*$$scope*/ 2) {
    				row2_changes.$$scope = { dirty, ctx };
    			}

    			row2.$set(row2_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(row2.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(row2.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(h30);
    			if (detaching) detach_dev(t2);
    			destroy_component(row1, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(h31);
    			if (detaching) detach_dev(t6);
    			destroy_component(row2, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function addSkillByName(skillName, list) {
    	let nameAndSpec = getSkillAndSpec(skillName);
    	let name = "";
    	let spec = "";

    	if (nameAndSpec) {
    		name = nameAndSpec[0];
    		spec = nameAndSpec[1];
    	} else name = skillName;

    	if (list.filter(skill => skill.name === name).length === 0) {
    		let obj = { name, level: 0, specializations: [] };
    		list.push(obj);
    	}

    	list.filter(skill => skill.name === name).forEach(skill => {
    		skill.level++;

    		if (spec != "" && skill.specializations.indexOf(spec) == -1) {
    			skill.specializations.push(spec);
    		}
    	});

    	return list;
    }

    function getSkillAndSpec(name) {
    	let regex = /^([A-z]+) \(([A-z]+)\)$/;
    	let match = name.match(regex);

    	if (match) {
    		return [match[1], match[2]];
    	} else return undefined;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let int;
    	let usedPoints;
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(14, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Skills", slots, []);
    	const skillPCPCosts = [6, 9, 12, 15, 18, 21, 24, 27, 30, 33];

    	let specializations = [
    		"Homestead",
    		"Criminal",
    		"Nobility",
    		"Politics",
    		"Sailing",
    		"Doctor",
    		"Farmer",
    		"Trade",
    		"Finance",
    		"Wood"
    	];

    	specializations.sort();
    	let activeSkills = [];
    	let activePackets = [];
    	activeSkills = JSON.parse(JSON.stringify(skillList));
    	activePackets = JSON.parse(JSON.stringify(packetList));
    	let packetSkills = [];
    	let { attributes = [] } = $$props;
    	let { usedPCP = 1 } = $$props;

    	activeSkills.forEach((skill, i) => {
    		let obj = {
    			name: skill,
    			level: 0,
    			specializations: []
    		};

    		$$invalidate(1, activeSkills[i] = obj, activeSkills);
    	});

    	activePackets.forEach(packet => {
    		packet.level = 0;
    		let hasChoice = 0;

    		packet.skills.forEach(skill => {
    			if (Array.isArray(skill)) {
    				hasChoice++;
    			}
    		});

    		if (hasChoice != 0) {
    			packet.choices = [];
    			packet.activeChoice = 0;
    		}
    	});

    	function evalPackets() {
    		let list = [];

    		activePackets.forEach(packet => {
    			if (packet.level > 0) {
    				for (let i = 0; i < packet.level; i++) {
    					packet.skills.filter(skill => !Array.isArray(skill)).forEach(packetSkill => {
    						addSkillByName(packetSkill, list);
    					});

    					packet.skills.filter(skill => Array.isArray(skill)).forEach(packetSkills => {
    						for (let n = 0; n < packet.level; n++) {
    							addSkillByName(packetSkills[packet.choices[n]], list);
    						}
    					});
    				}
    			}
    		});

    		$$invalidate(11, packetSkills = list);
    	}

    	function addPacket(packetName, choice) {
    		activePackets.forEach(packet => {
    			if (packet.name == packetName) {
    				if (packet.choices) {
    					packet.choices[packet.level] = choice;
    				}

    				packet.level++;
    			}
    		});

    		updateVars();
    	}

    	function removePacket(packetName, list) {
    		activePackets.forEach(packet => {
    			if (packet.name == packetName && packet.level > 0) {
    				packet.level--;
    			}
    		});

    		decrementInputsPacket(packetName);
    		updateVars();
    	}

    	function getPacketLevelBySkillName(name) {
    		let list = evalPackets(packets);

    		list.forEach(skill => {
    			if (skill.name === name) {
    				return skill.level;
    			}
    		});
    	}

    	function getMinSkillInput(skillName) {
    		let min = 0;

    		packetSkills.filter(skill => skill.name === skillName).forEach(skill => {
    			if (min < skill.level) {
    				min = skill.level;
    			}
    		});

    		return min;
    	}

    	function updateInputs() {
    		activeSkills.forEach(skill => {
    			let minInput = getMinSkillInput(skill.name);

    			if (skill.level < minInput) {
    				skill.level = minInput;
    			}
    		});
    	}

    	function decrementInputsPacket(packetName) {
    		let packet = activePackets.filter(packet => packet.name === packetName)[0];

    		packet.skills.filter(skill => !Array.isArray(skill)).forEach(skill => {
    			if (getSkillAndSpec(skill)) {
    				skill = getSkillAndSpec(skill)[0];
    			}

    			activeSkills.filter(activeSkill => activeSkill.name === skill && activeSkill.level > 0).forEach(activeSkill => {
    				activeSkill.level--;
    			});
    		});

    		packet.skills.filter(skills => Array.isArray(skills)).forEach(skills => {
    			let skill = skills[packet.choices[packet.level - 1]];

    			if (getSkillAndSpec(skill)) {
    				skill = getSkillAndSpec(skill)[0];
    			}

    			activeSkills.filter(activeSkill => activeSkill.name === skill && activeSkill.level > 0).forEach(activeSkill => {
    				activeSkill.level--;
    			});
    		});
    	}

    	function getUsedPCP() {
    		//skillPCPCosts = [6, 9, 12, 15, 18, 21, 24, 27, 30, 33];
    		let points = getPointCost();
    		let intCaps = [];

    		for (let n = 0; n < skillPCPCosts.length; n++) {
    			intCaps[n] = skillPCPCosts[n] + int * 2;
    		}

    		for (let n = 0; n < intCaps.length; n++) {
    			if (points <= intCaps[n]) {
    				return n + 1;
    			}

    			if (n < intCaps.length - 1) {
    				if (points <= intCaps[n + 1] && points > intCaps[n]) {
    					return n + 2;
    				}
    			}
    		}
    	}

    	function getPointCost() {
    		let sum = 0;
    		let list = JSON.parse(JSON.stringify(activeSkills));

    		activePackets.filter(packet => packet.level > 0).forEach(packet => {
    			sum += packet.level * 3;
    		});

    		list.filter(skill => skill.level > 0).forEach(skill => {
    			packetSkills.filter(packetSkill => packetSkill.name === skill.name && packetSkill.level > 0).forEach(packetSkill => {
    				skill.level -= packetSkill.level;
    			});
    		});

    		list.filter(skill => skill.level > 0).forEach(skill => {
    			sum += skill.level;
    		});

    		return sum;
    	}

    	function updateVars() {
    		evalPackets();
    		$$invalidate(1, activeSkills);
    		$$invalidate(2, activePackets);
    		$$invalidate(11, packetSkills);
    		updateInputs();
    		$$invalidate(0, usedPCP = getUsedPCP());
    		$$invalidate(4, usedPoints = getPointCost());
    	}

    	const writable_props = ["attributes", "usedPCP"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Skills> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler(each_value_1, packet_index) {
    		each_value_1[packet_index].activeChoice = select_value(this);
    		$$invalidate(2, activePackets);
    	}

    	function input_input_handler(each_value, skill_index) {
    		each_value[skill_index].level = to_number(this.value);
    		$$invalidate(1, activeSkills);
    	}

    	$$self.$$set = $$props => {
    		if ("attributes" in $$props) $$invalidate(10, attributes = $$props.attributes);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		skillList,
    		packetList,
    		character,
    		skillPCPCosts,
    		specializations,
    		activeSkills,
    		activePackets,
    		packetSkills,
    		attributes,
    		usedPCP,
    		evalPackets,
    		addSkillByName,
    		addPacket,
    		removePacket,
    		getPacketLevelBySkillName,
    		getSkillAndSpec,
    		getMinSkillInput,
    		updateInputs,
    		decrementInputsPacket,
    		getUsedPCP,
    		getPointCost,
    		updateVars,
    		int,
    		usedPoints,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("specializations" in $$props) specializations = $$props.specializations;
    		if ("activeSkills" in $$props) $$invalidate(1, activeSkills = $$props.activeSkills);
    		if ("activePackets" in $$props) $$invalidate(2, activePackets = $$props.activePackets);
    		if ("packetSkills" in $$props) $$invalidate(11, packetSkills = $$props.packetSkills);
    		if ("attributes" in $$props) $$invalidate(10, attributes = $$props.attributes);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    		if ("int" in $$props) $$invalidate(3, int = $$props.int);
    		if ("usedPoints" in $$props) $$invalidate(4, usedPoints = $$props.usedPoints);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*attributes*/ 1024) {
    			$$invalidate(3, int = attributes.length > 0
    			? attributes.filter(attr => attr.name === "Intelligence")[0].value
    			: 1);
    		}

    		if ($$self.$$.dirty[0] & /*activeSkills*/ 2) {
    			$$invalidate(1, activeSkills);
    		}

    		if ($$self.$$.dirty[0] & /*activePackets*/ 4) {
    			$$invalidate(2, activePackets);
    		}

    		if ($$self.$$.dirty[0] & /*packetSkills*/ 2048) {
    			$$invalidate(11, packetSkills);
    		}

    		if ($$self.$$.dirty[0] & /*usedPCP*/ 1) {
    			$$invalidate(0, usedPCP);
    		}

    		if ($$self.$$.dirty[0] & /*activeSkills*/ 2) {
    			{
    				set_store_value(character, $character.skills = activeSkills.filter(skill => skill.level > 0), $character);
    			}
    		}
    	};

    	$$invalidate(4, usedPoints = 0);

    	return [
    		usedPCP,
    		activeSkills,
    		activePackets,
    		int,
    		usedPoints,
    		skillPCPCosts,
    		addPacket,
    		removePacket,
    		getMinSkillInput,
    		updateVars,
    		attributes,
    		packetSkills,
    		select_change_handler,
    		input_input_handler
    	];
    }

    class Skills extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, { attributes: 10, usedPCP: 0 }, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Skills",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get attributes() {
    		throw new Error("<Skills>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set attributes(value) {
    		throw new Error("<Skills>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get usedPCP() {
    		throw new Error("<Skills>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set usedPCP(value) {
    		throw new Error("<Skills>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const wealthGrades = [
      {
        name: 'Slave/Exile',
        wealth: [0, 10, 0],
        asset: 0,
        benefits: {
          pick: 1,
          options: ["Beautiful (2)", "Hale and Hearty (2)", "Languages (2)"]
        },
        pcp: 1
      },
      {
        name: 'Peasant',
        wealth: [5, 0, 0],
        asset: 0,
        benefits: {
          pick: 1,
          options: ["Folks Back Home (3)", "Hale and Hearty (2)"]
        },
        pcp: 2
      },
      {
        name: 'Poor Freeman',
        wealth: [15, 0, 0],
        asset: 0,
        benefits: {
          pick: 1,
          options: ["Folks Back Home (3)", "Hale and Hearty(2)", "Literate (1)"]
        },
        pcp: 3
      },
      {
        name: 'Freeman',
        wealth: [25, 0, 0],
        asset: 1,
        benefits: {
          pick: 2,
          options: ["Folks Back Home (3)", "Hale and Hearty(2)", "Literate (1)"]
        },
        pcp: 4
      },
      {
        name: 'High Freeman',
        wealth: [40, 0, 0],
        asset: 2,
        benefits: {
          pick: 2,
          options: ["Contacts (1)", "Folks Back Home (6)", "Languages (1)", "Literate (1)"]
        },
        pcp: 5
      },
      {
        name: 'Minor Noble',
        wealth: [80, 0, 0],
        asset: 3,
        benefits: {
          pick: 2,
          options: ["Allies (5)", "Contacts (1)", "Famous (2)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (1)", "Literate (1)"]
        },
        pcp: 6
      },
      {
        name: 'Landed Noble',
        wealth: [150, 0, 0],
        asset: 6,
        benefits: {
          pick: 2,
          options: ["Allies (5)", "Contacts (1)", "Famous (3)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (2)", "Literate (2)"]
        },
        pcp: 7
      },
      {
        name: 'High Noble',
        wealth: [300, 0, 0],
        asset: 10,
        benefits: {
          pick: 2,
          options: ["Allies (5)", "Contacts (4)", "Famous (4)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (2)", "Literate (2)"]
        },
        pcp: 8
      },
      {
        name: 'Royalty',
        wealth: [800, 0, 0],
        asset: 15,
        benefits: {
          pick: 2,
          options: ["Allies (10)", "Contacts (4)", "Famous (4)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (2)", "Literate (2)"]
        },
        pcp: 9
      },
      {
        name: 'High Royalty',
        wealth: [1500, 0, 0],
        asset: 20,
        benefits: {
          pick: 2,
          options: ["Allies (10)", "Contacts (6)", "Famous (4)", "Folks Back Home (6)", "Hale and Hearty (2)", "Languages (3)", "Literate (3)"]
        },
        pcp: 10
      },
    ];

    /* src\wealth\wealthboons.svelte generated by Svelte v3.37.0 */
    const file$9 = "src\\wealth\\wealthboons.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[5] = list;
    	child_ctx[6] = i;
    	return child_ctx;
    }

    function get_each_context_1$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (38:6) {:else}
    function create_else_block$2(ctx) {
    	let option;
    	let t_value = /*boonOption*/ ctx[7] + "";
    	let t;
    	let option_value_value;
    	let option_disabled_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*boonOption*/ ctx[7];
    			option.value = option.__value;
    			option.disabled = option_disabled_value = /*hasBeenPicked*/ ctx[2](/*boonOption*/ ctx[7]);
    			add_location(option, file$9, 38, 6, 1144);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedWealth*/ 1 && t_value !== (t_value = /*boonOption*/ ctx[7] + "")) set_data_dev(t, t_value);

    			if (dirty & /*selectedWealth*/ 1 && option_value_value !== (option_value_value = /*boonOption*/ ctx[7])) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}

    			if (dirty & /*selectedWealth*/ 1 && option_disabled_value !== (option_disabled_value = /*hasBeenPicked*/ ctx[2](/*boonOption*/ ctx[7]))) {
    				prop_dev(option, "disabled", option_disabled_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(38:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (36:4) {#if n === i}
    function create_if_block_1$1(ctx) {
    	let option;
    	let t_value = /*boonOption*/ ctx[7] + "";
    	let t;
    	let option_value_value;
    	let option_disabled_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*boonOption*/ ctx[7];
    			option.value = option.__value;
    			option.disabled = option_disabled_value = /*hasBeenPicked*/ ctx[2](/*boonOption*/ ctx[7]);
    			option.selected = true;
    			add_location(option, file$9, 36, 6, 1027);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedWealth*/ 1 && t_value !== (t_value = /*boonOption*/ ctx[7] + "")) set_data_dev(t, t_value);

    			if (dirty & /*selectedWealth*/ 1 && option_value_value !== (option_value_value = /*boonOption*/ ctx[7])) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}

    			if (dirty & /*selectedWealth*/ 1 && option_disabled_value !== (option_disabled_value = /*hasBeenPicked*/ ctx[2](/*boonOption*/ ctx[7]))) {
    				prop_dev(option, "disabled", option_disabled_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(36:4) {#if n === i}",
    		ctx
    	});

    	return block;
    }

    // (35:4) {#each selectedWealth.benefits.options as boonOption, n}
    function create_each_block_1$2(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*n*/ ctx[9] === /*i*/ ctx[6]) return create_if_block_1$1;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$2.name,
    		type: "each",
    		source: "(35:4) {#each selectedWealth.benefits.options as boonOption, n}",
    		ctx
    	});

    	return block;
    }

    // (33:0) <Col>
    function create_default_slot_1$4(ctx) {
    	let select;
    	let mounted;
    	let dispose;
    	let each_value_1 = /*selectedWealth*/ ctx[0].benefits.options;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
    	}

    	function select_change_handler() {
    		/*select_change_handler*/ ctx[3].call(select, /*i*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (/*selectedBoonOptions*/ ctx[1][/*i*/ ctx[6]] === void 0) add_render_callback(select_change_handler);
    			add_location(select, file$9, 33, 2, 894);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selectedBoonOptions*/ ctx[1][/*i*/ ctx[6]]);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", select_change_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*selectedWealth, hasBeenPicked*/ 5) {
    				each_value_1 = /*selectedWealth*/ ctx[0].benefits.options;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*selectedBoonOptions, selectedWealth*/ 3) {
    				select_option(select, /*selectedBoonOptions*/ ctx[1][/*i*/ ctx[6]]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(33:0) <Col>",
    		ctx
    	});

    	return block;
    }

    // (32:0) <Row>
    function create_default_slot$4(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, selectedBoonOptions, selectedWealth*/ 1027) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(32:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (45:2) {#if i < selectedWealth.benefits.pick}
    function create_if_block$2(ctx) {
    	let br;

    	const block = {
    		c: function create() {
    			br = element("br");
    			add_location(br, file$9, 45, 4, 1336);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(45:2) {#if i < selectedWealth.benefits.pick}",
    		ctx
    	});

    	return block;
    }

    // (31:0) {#each new Array(selectedWealth.benefits.pick) as choice, i}
    function create_each_block$5(ctx) {
    	let row;
    	let t;
    	let if_block_anchor;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = /*i*/ ctx[6] < /*selectedWealth*/ ctx[0].benefits.pick && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, selectedBoonOptions, selectedWealth*/ 1027) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);

    			if (/*i*/ ctx[6] < /*selectedWealth*/ ctx[0].benefits.pick) {
    				if (if_block) ; else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(31:0) {#each new Array(selectedWealth.benefits.pick) as choice, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = new Array(/*selectedWealth*/ ctx[0].benefits.pick);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*selectedWealth, selectedBoonOptions, hasBeenPicked*/ 7) {
    				each_value = new Array(/*selectedWealth*/ ctx[0].benefits.pick);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let selectedBoonOptions;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Wealthboons", slots, []);
    	let { selectedWealth } = $$props;

    	function hasBeenPicked(name) {
    		let picked = false;

    		for (let n = 0; n < selectedWealth.benefits.pick; n++) {
    			if (selectedBoonOptions[n] === name) {
    				picked = true;
    			}
    		}

    		return picked;
    	}

    	const writable_props = ["selectedWealth"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Wealthboons> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler(i) {
    		selectedBoonOptions[i] = select_value(this);
    		($$invalidate(1, selectedBoonOptions), $$invalidate(0, selectedWealth));
    		$$invalidate(0, selectedWealth);
    	}

    	$$self.$$set = $$props => {
    		if ("selectedWealth" in $$props) $$invalidate(0, selectedWealth = $$props.selectedWealth);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		selectedWealth,
    		hasBeenPicked,
    		selectedBoonOptions
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectedWealth" in $$props) $$invalidate(0, selectedWealth = $$props.selectedWealth);
    		if ("selectedBoonOptions" in $$props) $$invalidate(1, selectedBoonOptions = $$props.selectedBoonOptions);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedWealth*/ 1) {
    			$$invalidate(0, selectedWealth);
    		}

    		if ($$self.$$.dirty & /*selectedBoonOptions, selectedWealth*/ 3) {
    			{
    				for (let n = 0; n < selectedBoonOptions.length; n++) {
    					if (selectedWealth.benefits.options.indexOf(selectedBoonOptions[n]) === -1) {
    						$$invalidate(1, selectedBoonOptions[n] = selectedWealth.benefits.options[n], selectedBoonOptions);
    					}
    				}

    				if (selectedBoonOptions.length > selectedWealth.benefits.pick) {
    					$$invalidate(1, selectedBoonOptions = selectedBoonOptions.slice(0, selectedWealth.benefits.pick));
    				}
    			}
    		}
    	};

    	$$invalidate(1, selectedBoonOptions = []);
    	return [selectedWealth, selectedBoonOptions, hasBeenPicked, select_change_handler];
    }

    class Wealthboons extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, { selectedWealth: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wealthboons",
    			options,
    			id: create_fragment$9.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*selectedWealth*/ ctx[0] === undefined && !("selectedWealth" in props)) {
    			console.warn("<Wealthboons> was created without expected prop 'selectedWealth'");
    		}
    	}

    	get selectedWealth() {
    		throw new Error("<Wealthboons>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedWealth(value) {
    		throw new Error("<Wealthboons>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\wealth\wealth.svelte generated by Svelte v3.37.0 */
    const file$8 = "src\\wealth\\wealth.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (59:0) {#each wealthGrades as grade, i}
    function create_each_block$4(ctx) {
    	let option;
    	let t_value = /*grade*/ ctx[7].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*i*/ ctx[9];
    			option.value = option.__value;
    			add_location(option, file$8, 59, 0, 1380);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(59:0) {#each wealthGrades as grade, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let h2;
    	let t1;
    	let p0;
    	let t2;
    	let t3;
    	let t4;
    	let select;
    	let t5;
    	let p1;
    	let t6;
    	let t7;
    	let t8;
    	let t9;
    	let t10;
    	let wealthboons;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = wealthGrades;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	wealthboons = new Wealthboons({
    			props: {
    				selectedWealth: /*selectedWealth*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Wealth and Social Class";
    			t1 = space();
    			p0 = element("p");
    			t2 = text("Used PCP: ");
    			t3 = text(/*usedPCP*/ ctx[1]);
    			t4 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t5 = space();
    			p1 = element("p");
    			t6 = text("Currency: ");
    			t7 = text(/*currentWealth*/ ctx[3]);
    			t8 = text(", Wealth Points: ");
    			t9 = text(/*currentWealthPoints*/ ctx[4]);
    			t10 = space();
    			create_component(wealthboons.$$.fragment);
    			add_location(h2, file$8, 55, 0, 1241);
    			add_location(p0, file$8, 56, 0, 1275);
    			if (/*selectedWealthValue*/ ctx[2] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[6].call(select));
    			add_location(select, file$8, 57, 0, 1303);
    			add_location(p1, file$8, 62, 0, 1441);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t2);
    			append_dev(p0, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selectedWealthValue*/ ctx[2]);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t6);
    			append_dev(p1, t7);
    			append_dev(p1, t8);
    			append_dev(p1, t9);
    			insert_dev(target, t10, anchor);
    			mount_component(wealthboons, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*usedPCP*/ 2) set_data_dev(t3, /*usedPCP*/ ctx[1]);

    			if (dirty & /*wealthGrades*/ 0) {
    				each_value = wealthGrades;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*selectedWealthValue*/ 4) {
    				select_option(select, /*selectedWealthValue*/ ctx[2]);
    			}

    			if (!current || dirty & /*currentWealth*/ 8) set_data_dev(t7, /*currentWealth*/ ctx[3]);
    			if (!current || dirty & /*currentWealthPoints*/ 16) set_data_dev(t9, /*currentWealthPoints*/ ctx[4]);
    			const wealthboons_changes = {};
    			if (dirty & /*selectedWealth*/ 1) wealthboons_changes.selectedWealth = /*selectedWealth*/ ctx[0];
    			wealthboons.$set(wealthboons_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wealthboons.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wealthboons.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t10);
    			destroy_component(wealthboons, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function calculateCurrency(Gp, Sp, Cp) {
    	let cp = 0;
    	Cp = Cp == "" ? 0 : Cp;
    	Sp = Sp == "" ? 0 : Sp;
    	Gp = Gp == "" ? 0 : Gp;
    	cp += parseInt(Cp);
    	cp += parseInt(Sp) * 12;
    	cp += parseInt(Gp) * 20 * 12;
    	let gp = Math.floor(cp / 240);
    	cp -= gp * 240;
    	let sp = Math.floor(cp / 12);
    	cp -= sp * 12;
    	return [gp, sp, cp];
    }

    function currencyToString(currency) {
    	let string = "";

    	if (currency[0] > 0) {
    		string += currency[0];
    		string += " Gp";
    	}

    	if (currency[1] > 0) {
    		if (string.length > 0) {
    			string += ", ";
    		}

    		string += currency[1];
    		string += " Sp";
    	}

    	if (currency[2] > 0) {
    		if (string.length > 0) {
    			string += ", ";
    		}

    		string += currency[2];
    		string += " Cp";
    	}

    	return string;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let selectedWealthValue;
    	let currentWealth;
    	let currentWealthPoints;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Wealth", slots, []);
    	let { pcpRemaining } = $$props;
    	let { selectedWealth } = $$props;
    	let { usedPCP = 0 } = $$props;
    	const writable_props = ["pcpRemaining", "selectedWealth", "usedPCP"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Wealth> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		selectedWealthValue = select_value(this);
    		$$invalidate(2, selectedWealthValue);
    	}

    	$$self.$$set = $$props => {
    		if ("pcpRemaining" in $$props) $$invalidate(5, pcpRemaining = $$props.pcpRemaining);
    		if ("selectedWealth" in $$props) $$invalidate(0, selectedWealth = $$props.selectedWealth);
    		if ("usedPCP" in $$props) $$invalidate(1, usedPCP = $$props.usedPCP);
    	};

    	$$self.$capture_state = () => ({
    		wealthGrades,
    		WealthBoons: Wealthboons,
    		pcpRemaining,
    		selectedWealth,
    		usedPCP,
    		calculateCurrency,
    		currencyToString,
    		selectedWealthValue,
    		currentWealth,
    		currentWealthPoints
    	});

    	$$self.$inject_state = $$props => {
    		if ("pcpRemaining" in $$props) $$invalidate(5, pcpRemaining = $$props.pcpRemaining);
    		if ("selectedWealth" in $$props) $$invalidate(0, selectedWealth = $$props.selectedWealth);
    		if ("usedPCP" in $$props) $$invalidate(1, usedPCP = $$props.usedPCP);
    		if ("selectedWealthValue" in $$props) $$invalidate(2, selectedWealthValue = $$props.selectedWealthValue);
    		if ("currentWealth" in $$props) $$invalidate(3, currentWealth = $$props.currentWealth);
    		if ("currentWealthPoints" in $$props) $$invalidate(4, currentWealthPoints = $$props.currentWealthPoints);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedWealthValue*/ 4) {
    			$$invalidate(0, selectedWealth = wealthGrades[selectedWealthValue]);
    		}

    		if ($$self.$$.dirty & /*selectedWealth*/ 1) {
    			$$invalidate(3, currentWealth = currencyToString(selectedWealth.wealth));
    		}

    		if ($$self.$$.dirty & /*selectedWealth*/ 1) {
    			$$invalidate(1, usedPCP = selectedWealth.pcp);
    		}

    		if ($$self.$$.dirty & /*selectedWealth*/ 1) {
    			$$invalidate(4, currentWealthPoints = selectedWealth.asset);
    		}
    	};

    	$$invalidate(2, selectedWealthValue = 0);

    	return [
    		selectedWealth,
    		usedPCP,
    		selectedWealthValue,
    		currentWealth,
    		currentWealthPoints,
    		pcpRemaining,
    		select_change_handler
    	];
    }

    class Wealth extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {
    			pcpRemaining: 5,
    			selectedWealth: 0,
    			usedPCP: 1
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Wealth",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pcpRemaining*/ ctx[5] === undefined && !("pcpRemaining" in props)) {
    			console.warn("<Wealth> was created without expected prop 'pcpRemaining'");
    		}

    		if (/*selectedWealth*/ ctx[0] === undefined && !("selectedWealth" in props)) {
    			console.warn("<Wealth> was created without expected prop 'selectedWealth'");
    		}
    	}

    	get pcpRemaining() {
    		throw new Error("<Wealth>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pcpRemaining(value) {
    		throw new Error("<Wealth>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get selectedWealth() {
    		throw new Error("<Wealth>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedWealth(value) {
    		throw new Error("<Wealth>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get usedPCP() {
    		throw new Error("<Wealth>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set usedPCP(value) {
    		throw new Error("<Wealth>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const talentList = [{
      "name": "GOOD FORM",
      "description": "A long time spent in mindful practice will save you in thebrief time you finally need it.",
      "requirements": "Requirements: Melee proficiency",
      "effect": "Effect: You may pick this talent multiple times. Pick a newmaneuver each time. Pick an advanced maneuver youcan perform that has an activation cost of X+1 or greater.Reduce it by 1, to a minimum of X (remember that superiormaneuvers count as advanced!)."
    }, {
      "name": "SHIELD BREAKER",
      "description": "You have a knack for smashing shields, and have practicedat sundering them to deprive your enemies of their defenses.",
      "requirements": "Requirements: 1H or 2H blunt proficiency",
      "effect": "Effect: You inflict +2 damage when making Hew attacks."
    }, {
      "name": "FORTITUDE",
      "description": "Whether it’s an iron jaw, extreme perseverance, or not muchof a brain to get concussed, you shrug off blows that leavelesser fighters out cold.",
      "requirements": "Requirements: END 5",
      "effect": "Effect: You gain a +2 bonus to KO checks."
    }, {
      "name": "HELMSPLITTER",
      "description": "Just ask Charles Burgundy how much that sallet is worth.",
      "requirements": "Requirements: Melee proficiency, 6 STR, school level 10",
      "effect": "Effect: Whenever you Power Attack with a Swing to the heador neck, you inflict an additional +1 damage per CP spent."
    }, {
      "name": "NIGHT FIGHTER",
      "description": "You think darkness is your ally?",
      "requirements": "Requirements: PER 5",
      "effect": "Effect: Reduce the CP penalties for dark lighting conditionsby -25% (for example, -75% to -50%, or -50% to -25%)."
    }, {
      "name": "IRONWALL",
      "description": "You’re hard to dislodge from your feet. It takes a singular forceto put you on the ground.",
      "requirements": "Requirements: END 5",
      "effect": "Effect: You gain a +2 bonus to stability checks made to avoidfalling over, or being shoved, pushed, or dislodged fromyour position."
    }, {
      "name": "HEAD GUARD",
      "description": "You’ve got a good handle on protecting your head. The head isthe most commonly armored part of the body, and for goodreason: it’s the obvious place to attack, and it’s not far fromarm-level, making it convenient as well.",
      "requirements": "Requirements: Melee proficiency",
      "effect": "Effect: When making a Parrying maneuver to defend againstan attack aimed at your head, face, or neck target zones,you may add 2 dice to the roll. This does not let you Parryif you have no CP remaining."
    }, {
      "name": "WEAPON PRIMACY",
      "children": [{
        "name": "I. The Basics",
        "description": "You have trained long and hard in the use of a specific weapon.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: You may pursue this talent tree multiple times: choosea new weapon each time. Choose a specific weapon of aproficiency in your school (for example, the 1H SwordArming Sword (Late)). When wielding that specificweapon, you gain +1 CP."
      }, {
        "name": "II. The Second Step",
        "description": "You have reached a level of expertise with your chosenweapon few can rival.",
        "requirements": "Requirements: The Basics talent, school level 10",
        "effect": "Effect: Same as The Basics, except the bonus is +2 CP."
      }, {
        "name": "III. The Final Mystery",
        "description": "Welcome to it.",
        "requirements": "Requirements: The Second Step talent, school level 15",
        "effect": "Effect: Same as The Second Step, except the bonus is +3 CP."
      }]
    }, {
      "name": "CALLED SHOT",
      "children": [{
        "name": "I. Accuracy",
        "description": "You tend to get the tip of your weapon where it needs to go.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: When rolling for a hit location with a weapon meleeattack, you may alter your roll up or down by 1. If yourtarget has talents in the Rapid Reaction tree, they usetalents from that tree after you use ones from this tree."
      }, {
        "name": "II. Superior Accuracy",
        "description": "You’re really good at Five Finger Fillet.",
        "requirements": "Requirements: Accuracy talent, AGI 6",
        "effect": "Effect: Before rolling for the hit location with a weaponmelee attack, you may call out a possible hit location. Ifyour modified roll hits that location, your attack gets +1damage. Attacks that automatically hit a particular areawithout a hit location roll may always claim this bonus."
      }, {
        "name": "III. Surgical Precision",
        "description": "You’ve never had to try twice to thread a needle.",
        "requirements": "Requirements: Superior Accuracy talent, AGI 8",
        "effect": "Effect: Same as Accuracy, but you may instead alter it up ordown by up to 2."
      }]
    }, {
      "name": "MOMENTUM",
      "children": [{
        "name": "I. Flourishing Drills",
        "description": "Long hours practicing the basics has given you momentumbehind your strikes.",
        "requirements": "Requirements: Melee proficiency, school level 6",
        "effect": "Effect: If you made a Swing attack last move, declaring a Swingattack instantly refreshes you 1 CP. You may add this CPto your Swing. You can only get this bonus once per move."
      }, {
        "name": "II. Blazing Steel",
        "description": "Like a dervish, you can unleash a flurry of cuts seeminglywithout delay.",
        "requirements": "Requirements: Flourishing Drills talent, school level 12",
        "effect": "Effect: Same as Flourishing Drills, but the refresh is increasedto 2 CP."
      }, {
        "name": "III. The Cross-Cut Art",
        "description": "Wolodyjowski would be proud.",
        "requirements": "Requirements: Blazing Steel talent, school level 15",
        "effect": "Effect: Same as Blazing Steel except the refresh is increasedto 3 CP."
      }]
    }, {
      "name": "SWIFT SWORD",
      "children": [{
        "name": "I. True Time",
        "description": "Hand. Body. Foot. Move in that order or move not at all.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: You gain a +1 bonus to initiative tests when using amelee weapon."
      }, {
        "name": "II. The Geometry of Violence",
        "description": "Speed and violence. Violence and speed.",
        "requirements": "Requirements: True Time talent, AGI 6",
        "effect": "Effect: If you tie on an initiative test, you and your opponentmay pick up a dice and roll off. Whoever rolls higher winsthe initiative test. If it’s a tie, then the test is a tie afterall! If both characters have this talent, it cancels out, andneither gains any benefit from it."
      }, {
        "name": "III. Murderous Speed",
        "description": "Faster than blasphemy.",
        "requirements": "Requirements: The Geometry of Violence talent, school level 12",
        "effect": "Effect: You gain the Murderous Speed ability, exactly like anOhanedin. In the orientation declaration stage of combat,you do not have to declare which orientation you are notthrowing. Additionally, True Time’s bonus raises to +2.If you are already an Ohanedin, True Time’s bonus raisesto +3 instead of +2."
      }]
    }, {
      "name": "RAPID REACTION",
      "children": [{
        "name": "I. Quick Reflexes",
        "description": "You’re pretty good at twitching your body away from the tipof a weapon.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: When struck by a weapon melee attack, you may alterthe hit location roll up or down by 1. If your attacker hastalents in the Called Shot tree, they use talents from thattree before you use ones from this tree."
      }, {
        "name": "II. Lightning Reflexes",
        "description": "You don’t need armor there if you don’t get hit there.",
        "requirements": "Requirements: Quick Reflexes talent, WIT 6",
        "effect": "Effect: Before your opponent rolls for the hit location with aweapon melee attack, you may call out a possible hit location. If the modified roll hits that location, their attack gets-1 damage. Attacks which automatically hit a particular areawithout a hit location roll may always suffer this penalty."
      }, {
        "name": "III. Preternatural Reflexes",
        "description": "You’re putting mongeese out of business. Wait. Mongooses?",
        "requirements": "Requirements: Lightning Reflexes talent, WIT 8",
        "effect": "Effect: Same as Quick Reflexes, but you may instead alter it upor down by up to 2."
      }]
    }, {
      "name": "AKIMBO",
      "children": [{
        "name": "I. Rapid Strike",
        "description": "Shields are for suckers. Double the pleasure, double the pain.",
        "requirements": "Requirements: Melee proficiency, AGI 5",
        "effect": "Effect: When you make a Simultaneous maneuver involvingtwo weapons, add +1 to your main-hand maneuver."
      }, {
        "name": "II. Rapid Rechamber",
        "description": "You’re very skilled at attacking with one weapon whilethe other returns to an ideal position to strike from, andrepeating this over and over to strike fast, hard, and often.",
        "requirements": "Requirements: Rapid Strike talent, AGI 6",
        "effect": "Effect: Same as Rapid Strike, but now you get a +1 to bothmaneuvers."
      }, {
        "name": "III. Twin Lightning",
        "description": "Your kind are often called “river stones,” because you neverstop tumbling.",
        "requirements": "Requirements: Rapid Rechamber talent, AGI 8",
        "effect": "Effect: Whenever you resolve a Simultaneous maneuverinvolving two weapons, you regain 2 CP immediatelyafterwards"
      }]
    }, {
      "name": "COMBAT KICK",
      "children": [{
        "name": "I. Gastrizein",
        "description": "Kicks are an indelible part of a martial arsenal. The contextsof armed combat demand bio-mechanical adjustments, butthe kicks fulfill their purpose just as well.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: Your Thrusting kicks to the belly inflict +2 damage."
      }, {
        "name": "II. Chasse Bas",
        "description": "Kicks are a good method of weakening the opponent’s balanceand mobility.",
        "requirements": "Requirements: Gastrizein talent, school level 8",
        "effect": "Effect: When you Kick an opponent’s legs, you inflict +2stun with a successful hit, regardless of damage inflicted.Increase the stability test RS against being rendered proneby 1."
      }, {
        "name": "III. Spartan Sole",
        "description": "So many people forget about their legs in armed combat—attheir own peril.",
        "requirements": "Requirements: Chasse Bas talent, school level 12",
        "effect": "Effect: Same as Gastrizein, with +4 stun, +2 KO RS, and theymust make a stability check at [BS] RS or be rendered prone."
      }]
    }, {
      "name": "FURIOUS FISTS",
      "children": [{
        "name": "I. Straight Blast",
        "description": "Commonly associated with Wing Chun and certain styles ofboxing, you have mastered a rapid, piston-like punching stylethat can wear down any defense. Combined with a strongcenter and good footwork, this technique can be devastating.",
        "requirements": "Requirements: Pugilism proficiency, AGI 6",
        "effect": "Effect: When making a One-Two Punch with a Straight Punchinto another Straight Punch, you may reduce the activationcost of the maneuver chained from the first by 1."
      }, {
        "name": "II. Flicker Jab",
        "description": "Your jabs are so rapid, and come from such unorthodox angles,that most opponents cannot even perceive them.",
        "requirements": "Requirements: Straight Blast talent, AGI 8",
        "effect": "Effect: If you declare a Straight Punch with fewer than 5 CP,your opponent must make a PER test at 3 RS in order toperform any sort of defense against it. You may not increasethe CP of the Straight Punch once the PER test is made."
      }, {
        "name": "III. North Star",
        "description": "No being is supposed to be able to punch that fast.",
        "requirements": "Requirements: Flicker Jab talent, STR 7, school level 15",
        "effect": "Effect: Same as One-Two Punch, but you also get +1 dice to anyPunch you make with One-Two Punch. You still must payat least 1 dice into X to use the maneuver at all, however."
      }]
    }, {
      "name": "BRAWLER",
      "children": [{
        "name": "I. Dirty Fighting",
        "description": "The only good fight is the one you win.",
        "requirements": "Requirements: Pugilism proficiency",
        "effect": "Effect: Your unarmed attacks that hit the face or groin hitlocations cause +2 stun."
      }, {
        "name": "II. Dirty Trick!",
        "description": "All’s fair in love and violent homicide.",
        "requirements": "Requirements: Dirty Fighting talent, school level 7",
        "effect": "Effect: The first time in a combat you use the Blind Tossmaneuver, its TN is reduced by 1."
      }, {
        "name": "III. Dirty Rotten Cheater",
        "description": "You’ve learned how to hit the softest parts of the body, andrarely aim for anywhere else.",
        "requirements": "Requirements: Dirty Trick! talent,school level 10",
        "effect": "Effect: If you inflict any wound to anopponent with an unarmedattack, you add 1 pain perwound level."
      }]
    }, {
      "name": "FISTICUFFS",
      "children": [{
        "name": "I. Clean Fighting",
        "description": "You are a more measured fighter, preferring to fight at longerranges, peppering opponents with strikes intended to wearthem down, and only striking them when they present anopening.",
        "requirements": "Requirements: Pugilism proficiency, INT 6, school level 5",
        "effect": "Effect: Your Straight Punch and Hook Punch maneuvers maybe made at +1 reach."
      }, {
        "name": "II. Queensbury Rules",
        "description": "The fight’s the thing, you know, most noble endeavor.",
        "requirements": "Requirements: Clean Fighting talent, STR 6, school level 10",
        "effect": "Effect: Your Straight Punch and Hook Punch maneuvers bothinflict +1 damage."
      }, {
        "name": "III. Stiff Upper Lip",
        "description": "Only my pride, lads. Only my pride.",
        "requirements": "Requirements: Queensbury Rules talent, WIL 6, school level 15",
        "effect": "Effect: Once per encounter, you may negate all stun inflictedby a single attack, if the amount inflicted is less than “total.”"
      }]
    }, {
      "name": "KING OF THE MAT",
      "children": [{
        "name": "I. Ground Wrestler",
        "description": "You’re more practiced in grappling on the ground thanstanding. Many fighters fear this kind of fight for how quicklyit can go disastrously wrong, but you revel in it.",
        "requirements": "Requirements: Wrestling proficiency",
        "effect": "Effect: When in a Grapple, and the fight has become a groundfight, you do not suffer the TN penalty for not having initiative, and you add full STR to your SDB instead of half STR."
      }, {
        "name": "II. Iron Grip",
        "description": "We won’t ask where you learned this, but your hands have anatural affinity for necks.",
        "requirements": "Requirements: Ground Wrestler talent, STR 6",
        "effect": "Effect: Your bare hands count as a garrote for the Grapple:Choke maneuver. Additionally, opponents using Grapple:Force to free body parts you have pinned roll at +1 TN."
      }, {
        "name": "III. Electrifying Move",
        "description": "You have a way for ending fights in a dramatic fashion.",
        "requirements": "Requirements: Iron Grip talent, STR 6",
        "effect": "Effect: Once per combat, while in a Grapple, you may declarethis talent when performing a maneuver. You gain 4 bonusCP to use for that maneuver."
      }]
    }, {
      "name": "SOME KINDA JUDO",
      "children": [{
        "name": "I. The Basics of CQB",
        "description": "You really like throwing people. And they told you groundgame was important—pah!",
        "requirements": "Requirements: Wrestling proficiency, school level 5",
        "effect": "Effect: Grapple: Throws you perform inflict +1 damage. If yougo prone with the target after a Grapple: Throw, you mayre-roll the target zone dice."
      }, {
        "name": "II. Sandinista Sunset",
        "description": "The kind of person who gets up after you throw them is thekind of person who deserves to be thrown again.",
        "requirements": "Requirements: The Basics of CQB talent, school level 10",
        "effect": "Effect: When you inflict any wound with Grapple: Throw, youmay spend 2 CP to force the victim to make a KO check atRS equal to the wound level inflicted or be knocked unconscious for 1d10 minutes."
      }, {
        "name": "III. Back Up, Back Down",
        "description": "It gets funnier each time you do it.",
        "requirements": "Requirements: Sandinista Sunset talent, school level 15",
        "effect": "Effect: Same as Sandinista Sunset, but the KO check RS isnow equal to twice the wound level inflicted. Additionally,when you successfully initiate a Grapple against a pronetarget (but not vice versa), you may immediately pick themup so the fight is not a ground fight."
      }]
    }, {
      "name": "POWER DRAW",
      "children": [{
        "name": "I. Practice Every Day",
        "description": "You really know how to bend a bow.",
        "requirements": "Requirements: Missile proficiency, STR 5",
        "effect": "Effect: When you use a bow, it inflicts +1 damage."
      }, {
        "name": "II. Practiced Archer",
        "description": "All the practice was worth it.",
        "requirements": "Requirements: Practice Every Day talent, school level 6, STR 6",
        "effect": "Effect: Same as Practice Every Day, but the damage bonus is +2."
      }, {
        "name": "III. Hysterical Yeoman Laughter",
        "description": "It’s like regular hysterical laughter, but cider sprays out ofyour nose.",
        "requirements": "Requirements: Practiced Archer talent, school level 12, STR 7",
        "effect": "Effect: Same as Practiced Archer, but the damage bonus is +3and you gain 5 range."
      }]
    }, {
      "name": "LIGHTNING ARCHERY",
      "children": [{
        "name": "I. Swift Arm",
        "description": "You’re pretty good at putting arrows in the air fast.",
        "requirements": "Requirements: Bow proficiency",
        "effect": "Effect: The penalty for Rapid Shot is reduced by 1."
      }, {
        "name": "II. Rapid Twang",
        "description": "You have learned special techniques to shoot rapidly.",
        "requirements": "Requirements: Swift Arm talent, school level 10",
        "effect": "Effect: Same as Swift Arm, but the penalty is reduced by 2,and your maximum number of arrows shot by Rapid Shotis increased by 1."
      }, {
        "name": "III. Like a Harp",
        "description": "You can shoot ten arrows before the first hits the ground.",
        "requirements": "Requirements: Rapid Twang talent, school level 15",
        "effect": "Effect: Same as Rapid Twang, but the penalty is reduced by 3,and your maximum number of arrows shot by Rapid Shotis increased by 2."
      }]
    }, {
      "name": "JAVELINEER",
      "children": [{
        "name": "I. Boar Piercer",
        "description": "You can REALLY throw javelins.",
        "requirements": "Requirements: Throwing weapon proficiency",
        "effect": "Effect: Javelins you throw inflict +1 damage."
      }, {
        "name": "II. Bear Piercer",
        "description": "We never go hungry around here.",
        "requirements": "Requirements: Boar Piercer talent, school level 8",
        "effect": "Effect: Same as Boar Piercer, but +2 damage, and +5 range."
      }, {
        "name": "III. Elephant Piercer",
        "description": "The first weapon ever fashioned—and still the best.",
        "requirements": "Requirements: Bear Piercer, school level 12",
        "effect": "Effect: Same as Bear Piercer, but +3 damage and +10 range."
      }]
    }, {
      "name": "KNIFE THROWING",
      "children": [{
        "name": "I. Flick of the Wrist",
        "description": "Well, it’s going to end up in the enemy anyway...",
        "requirements": "Requirements: Throwing weapon proficiency",
        "effect": "Effect: When you throw a knife, chakram, or other smallmissile weapon, it inflicts +1 damage."
      }, {
        "name": "II. Straight Throw",
        "description": "It flies harder this way.",
        "requirements": "Requirements: Flick of the Wrist talent, school level 8",
        "effect": "Effect: If you are within one range increment of the target,you throw knives, daggers, chakrams, or other smallmissile weapons at -1 TN."
      }, {
        "name": "III. More is Better",
        "description": "Why throw one at once, when you could throw two?",
        "requirements": "Requirements: Straight Throw talent, school level 15",
        "effect": "Effect: If you are within one range increment of the target,you may throw two knives or other small missile weapons(rolling full dice for each) at the same target any time youwould throw one."
      }]
    }, {
      "name": "CUTTHROAT",
      "children": [{
        "name": "I. A Loathsome Tactic!",
        "description": "Someone has to do it, you’re an expert at killing people frombehind.",
        "requirements": "Requirements: Dagger proficiency, school level 5",
        "effect": "Effect: If outflanking a target with S-Reach or shorter weapon,your Swings and Thrusts in the first round inflict +2 damage."
      }, {
        "name": "II. No, Not Like That, Idiot",
        "description": "A running man can slit a thousand throats in one night.",
        "requirements": "Requirements: A Loathsome Tactic! talent, school level 10",
        "effect": "Effect: If outflanking a target with an S-Reach or shorterweapon, you refresh [half BS] CP of each of your successfulattacks in the first round."
      }, {
        "name": "III. You Are Like a Little Baby, Watch This",
        "description": "What the hell happened to you as a child?",
        "requirements": "Requirements: No, Not Like That, Idiot talent, school level 15",
        "effect": "Effect: If outflanking a target with an S-Reach or shorterweapon, reduce your attack TN by 2 for the first round."
      }]
    }, {
      "name": "SPEARMASTER",
      "children": [{
        "name": "I. Slowpoke",
        "description": "Getting past the range of a spear is hard. You know how tomake it harder.",
        "requirements": "Requirements: Spear proficiency or polearm proficiency",
        "effect": "Effect: When using a spear or polearm, and your opponentmakes an attack that would change the combat reach fromyour weapon reach or further, to inside your weapon reach,that attack has an additional 1-dice activation cost."
      }, {
        "name": "II. Ordo Dracul",
        "description": "Like ol’ Uncle Vlad, you’ve got a thing for impaling people.",
        "requirements": "Requirements: Slowpoke talent",
        "effect": "Effect: Your Thrusting attacks made with spears inflict +1damage."
      }, {
        "name": "III. Kebab Master",
        "description": "Your capabilities with the spear are compelling proof that Godis a lancer.",
        "requirements": "Requirements: Ordo Dracul talent, school level 15",
        "effect": "Effect: If you inflict a level 3 or higher wound with any sortof Thrusting attack, you regain 2 CP."
      }]
    }, {
      "name": "SOARING BLADE",
      "children": [{
        "name": "I. Like a Discus",
        "description": "Oh, watch it sail!",
        "requirements": "Requirements: Throwing weapon proficiency",
        "effect": "Effect: When throwing a chakram or other disk-like weapon,you add +5 to its range."
      }, {
        "name": "II. It’s All In The Spin",
        "description": "And dad always told me I wasted my childhood skippin’ rocks.",
        "requirements": "Requirements: Like a Discus talent, school level 8",
        "effect": "Effect: When you hit targets in the limbs or neck with a disklike missile weapon, you inflict +2 damage."
      }, {
        "name": "III. Watch This",
        "description": "No seriously, watch me kill two people with this saucer.",
        "requirements": "Requirements: It’s All In The Spin talent, school level 10",
        "effect": "Effect: You may throw a disk-like weapon and have it hit onetarget and bounce into another. If a thrown missile attacksucceeds in hitting one target, and there is another withinone range increment of the first, you may resolve a secondmissile attack on that target at a -8 penalty, as the missilebounces off the first target into the second. Normal damageis inflicted both times."
      }]
    }, {
      "name": "HARNISCHFECHTEN",
      "children": [{
        "name": "I. Grappling at the Sword",
        "description": "Harnischfechten is the art of (heavily) armored fighting. Allarmor has vulnerabilities—grappling and fine point controlare essential to getting at the man beneath the metal!",
        "requirements": "Requirements: Wrestling proficiency, and either 2H swordor 2H blunt proficiency",
        "effect": "Effect: If you are using a two-handed weapon, then duringa Grapple, you may treat your weapon as if it were 1 stageof reach shorter (this combines well with Half-Swording!)."
      }, {
        "name": "II. Prudence",
        "description": "If no blood is drawn then no victory is won. Give not thisvillain his trophy.",
        "requirements": "Requirements: Grappling at the Sword talent",
        "effect": "Effect: If your opponent succeeds with a damaging attack butfails to do enough damage to cause a wound, you may pay2 CP. If you do, the range of combat does not change to theattacker’s reach. Afterwards you may pay a final 1 CP tomove 1 reach closer or further."
      }, {
        "name": "III. And Stab Him Where?",
        "description": "In the ass! Not exactly gentlemanly; armored fights rarely are.",
        "requirements": "Requirements: Prudence talent, school level 10",
        "effect": "Effect: Your Joint Thrusts do full BS damage instead of half BS.If you are at M-range or shorter, you may target the upperback and lower back with Joint Thrusts."
      }]
    }, {
      "name": "HEAVY ARMOR",
      "children": [{
        "name": "I. Eager Minnow",
        "description": "Zealous maintenance and personal modifications make yourarmor’s fit superb.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: You gain a +2 CAR bonus for encumbrance purposes.Additionally, you may raise or lower movable visors at thestart of any move with no cost."
      }, {
        "name": "II. Tireless Lobster",
        "description": "It’s almost like a second skin.",
        "requirements": "Requirements: Eager Minnow talent",
        "effect": "Effect: Same as Eager Minnow, but the bonus is raised to +4CAR. Additionally, wearing armor long-term and sleepingin armor no longer causes you any penalty."
      }, {
        "name": "III. Unstoppable Shark",
        "description": "You are a god of the battlefield treading in heavy soles!",
        "requirements": "Requirements: Tireless Lobster talent, END 6",
        "effect": "Effect: Joint Thrusts made against you have a +2 activation cost.You also get 1 additional automatic success on all stabilityrolls inflicted by opponents in combat."
      }]
    }, {
      "name": "LIGHT ARMOR",
      "children": [{
        "name": "I. Movement Efficiency",
        "description": "The best armor is not getting hit in the first place.",
        "requirements": "Requirements: Melee proficiency, AGI 5",
        "effect": "Effect: If you are unencumbered, your successful Void maneuvers always take initiative."
      }, {
        "name": "II. Roll With It",
        "description": "When you DO get hit, you know how to roll with the blows.",
        "requirements": "Requirements: Movement Efficiency talent, AGI 6",
        "effect": "Effect: If you are unencumbered, not prone, and hit by anattack that would inflict less than a level 5 wound, you mayimmediately go prone to reduce the damage of the attackby 2. Suffer all the usual effects of going prone."
      }, {
        "name": "III. Superior Void",
        "description": "You don’t even remember what it’s like to fear being hit.",
        "requirements": "Requirements: Roll With It talent, AGI 8, school level 15",
        "effect": "Effect: If you unencumbered, your Void maneuvers are madeat -1 TN."
      }]
    }, {
      "name": "SHIELD TACTICS",
      "children": [{
        "name": "I. Quick Feet",
        "description": "Shields can only protect so much, so it’s important to beaware of one’s vulnerabilities.",
        "requirements": "Requirements: Melee proficiency",
        "effect": "Effect: If your shield is high and your opponent attacksyour legs or groin, or if your shield is low and youropponent attacks your head or neck, they must add1 to their maneuver’s activation cost."
      }, {
        "name": "II. The Wall",
        "description": "Oh. Maybe shields can protect everything.",
        "requirements": "Requirements: Quick Feet talent, school Level 8",
        "effect": "Effect: The same as Quick Feet, except that the activation costis increased to 2, and the enemy must also add 1 to theiractivation cost if they attack an area that does not alreadyincur the above cost."
      }, {
        "name": "III. Flicker Stab",
        "description": "Being able to hide your weapon behind your shield gives youan advantage.",
        "requirements": "Requirements: The Wall talent, school level 15",
        "effect": "Effect: If you are using a M-reach weapon or shorter witha shield and make a Thrust attack with 5 CP or less, youropponent must make a PER test at 3 RS to be able todefend. They make this test immediately after your attackdeclaration."
      }]
    }, {
      "name": "SLIPPERY",
      "children": [{
        "name": "I. Tricky Bastard",
        "description": "You’re pretty good at not getting caught.",
        "requirements": "Requirements: school level 5",
        "effect": "Effect: Your MOB is increased by 2 for the purposes of ThreadThe Needle."
      }, {
        "name": "II. You’ll Never Catch Me!",
        "description": "You’re really good at not getting caught.",
        "requirements": "Requirements: Tricky Bastard talent, school level 10",
        "effect": "Effect: Same as Tricky Bastard, but the MOB bonus is +4."
      }, {
        "name": "III. Walking Aneurysm",
        "description": "Enemy officers have to take vacations after facing you.",
        "requirements": "Requirements: You’ll Never CatchMe! talent, school level 15",
        "effect": "Effect: Same as You’llNever Catch Me!, butthe MOB bonus is +6."
      }]
    }, {
      "name": "RADICAL HORSE DEFENSE",
      "children": [{
        "name": "I. Skill in the Saddle",
        "description": "You are skilled at avoiding being killed on horseback.",
        "requirements": "Requirements: Melee proficiency, Riding level 4",
        "effect": "Effect: Melee attacks aimed at you while you are mountedhave a +1 activation cost."
      }, {
        "name": "II. Cossack Drag",
        "description": "You can move around a galloping horse like a rodeo acrobat.",
        "requirements": "Requirements: Skill in the Saddle talent, Riding level 6",
        "effect": "Effect: Voids you make while mounted are at -1 TN."
      }, {
        "name": "III. Born to Ride!",
        "description": "People like you set back agrarianism by millennia.",
        "requirements": "Requirements: Cossack Drag talent, Riding level 8",
        "effect": "Effect: Your Mounted Disengage and Lean now resolve at TN 7."
      }]
    }];


    /*
    {
      name: "",
      description: ``,
      requirements: "",
      effect: ``,
    }
    {
      name: "",
      children: [
      {
      talent goes here
    }
    ]
    }
    */

    /* src\talents\talents.svelte generated by Svelte v3.37.0 */

    const { console: console_1 } = globals;
    const file$7 = "src\\talents\\talents.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	child_ctx[17] = i;
    	return child_ctx;
    }

    function get_each_context_2$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    // (93:0) <Col>
    function create_default_slot_5$2(ctx) {
    	let p;
    	let t0;
    	let t1_value = /*maxTalents*/ ctx[0] - /*usedTalents*/ ctx[3] + "";
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Available Talents: ");
    			t1 = text(t1_value);
    			add_location(p, file$7, 93, 0, 2298);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*maxTalents, usedTalents*/ 9 && t1_value !== (t1_value = /*maxTalents*/ ctx[0] - /*usedTalents*/ ctx[3] + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$2.name,
    		type: "slot",
    		source: "(93:0) <Col>",
    		ctx
    	});

    	return block;
    }

    // (92:0) <Row>
    function create_default_slot_4$2(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_5$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, maxTalents, usedTalents*/ 1048585) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(92:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (99:4) <Col>
    function create_default_slot_3$2(ctx) {
    	let p;
    	let t0_value = /*talent*/ ctx[15].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*talent*/ ctx[15].level + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			t2 = text(t2_value);
    			t3 = space();
    			add_location(p, file$7, 99, 6, 2458);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			insert_dev(target, t3, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeTalents*/ 4 && t0_value !== (t0_value = /*talent*/ ctx[15].name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*activeTalents*/ 4 && t2_value !== (t2_value = /*talent*/ ctx[15].level + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (detaching) detach_dev(t3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(99:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (98:2) {#each activeTalents.filter((talent) => talent.level > 0) as talent}
    function create_each_block_2$1(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, activeTalents*/ 1048580) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2$1.name,
    		type: "each",
    		source: "(98:2) {#each activeTalents.filter((talent) => talent.level > 0) as talent}",
    		ctx
    	});

    	return block;
    }

    // (97:0) <Row>
    function create_default_slot_2$2(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_2 = /*activeTalents*/ ctx[2].filter(func$1);
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*activeTalents*/ 4) {
    				each_value_2 = /*activeTalents*/ ctx[2].filter(func$1);
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(97:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (105:2) {#each talentList as talent, i}
    function create_each_block_1$1(ctx) {
    	let option;
    	let t_value = /*talent*/ ctx[15].name + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*talent*/ ctx[15].name;
    			option.value = option.__value;
    			add_location(option, file$7, 105, 4, 2601);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(105:2) {#each talentList as talent, i}",
    		ctx
    	});

    	return block;
    }

    // (109:0) <Button on:click={addTalent(selectedTalentName)}>
    function create_default_slot_1$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("+");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(109:0) <Button on:click={addTalent(selectedTalentName)}>",
    		ctx
    	});

    	return block;
    }

    // (110:0) <Button on:click={removeTalent(selectedTalentName)}>
    function create_default_slot$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("-");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(110:0) <Button on:click={removeTalent(selectedTalentName)}>",
    		ctx
    	});

    	return block;
    }

    // (119:0) {:else}
    function create_else_block$1(ctx) {
    	let hr;
    	let t0;
    	let p0;
    	let t1_value = /*selectedTalent*/ ctx[4].description + "";
    	let t1;
    	let t2;
    	let p1;
    	let t3_value = /*selectedTalent*/ ctx[4].requirements + "";
    	let t3;
    	let t4;
    	let p2;
    	let t5_value = /*selectedTalent*/ ctx[4].effect + "";
    	let t5;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			t0 = space();
    			p0 = element("p");
    			t1 = text(t1_value);
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			p2 = element("p");
    			t5 = text(t5_value);
    			add_location(hr, file$7, 119, 2, 3057);
    			add_location(p0, file$7, 120, 2, 3066);
    			add_location(p1, file$7, 121, 2, 3104);
    			add_location(p2, file$7, 122, 2, 3143);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedTalent*/ 16 && t1_value !== (t1_value = /*selectedTalent*/ ctx[4].description + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*selectedTalent*/ 16 && t3_value !== (t3_value = /*selectedTalent*/ ctx[4].requirements + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*selectedTalent*/ 16 && t5_value !== (t5_value = /*selectedTalent*/ ctx[4].effect + "")) set_data_dev(t5, t5_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(119:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (111:0) {#if selectedTalent.hasOwnProperty('children')}
    function create_if_block$1(ctx) {
    	let each_1_anchor;
    	let each_value = /*selectedTalent*/ ctx[4].children;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedTalent*/ 16) {
    				each_value = /*selectedTalent*/ ctx[4].children;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(111:0) {#if selectedTalent.hasOwnProperty('children')}",
    		ctx
    	});

    	return block;
    }

    // (112:2) {#each selectedTalent.children as child}
    function create_each_block$3(ctx) {
    	let hr;
    	let t0;
    	let p0;
    	let strong1;
    	let t1_value = /*child*/ ctx[12].name + "";
    	let t1;
    	let strong0;
    	let t2;
    	let p1;
    	let t3_value = /*child*/ ctx[12].description + "";
    	let t3;
    	let t4;
    	let p2;
    	let t5_value = /*child*/ ctx[12].requirements + "";
    	let t5;
    	let t6;
    	let p3;
    	let t7_value = /*child*/ ctx[12].effect + "";
    	let t7;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			t0 = space();
    			p0 = element("p");
    			strong1 = element("strong");
    			t1 = text(t1_value);
    			strong0 = element("strong");
    			t2 = space();
    			p1 = element("p");
    			t3 = text(t3_value);
    			t4 = space();
    			p2 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			p3 = element("p");
    			t7 = text(t7_value);
    			add_location(hr, file$7, 112, 4, 2890);
    			add_location(strong0, file$7, 113, 27, 2924);
    			add_location(strong1, file$7, 113, 7, 2904);
    			add_location(p0, file$7, 113, 4, 2901);
    			add_location(p1, file$7, 114, 4, 2952);
    			add_location(p2, file$7, 115, 4, 2983);
    			add_location(p3, file$7, 116, 4, 3015);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, strong1);
    			append_dev(strong1, t1);
    			append_dev(strong1, strong0);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p3, anchor);
    			append_dev(p3, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedTalent*/ 16 && t1_value !== (t1_value = /*child*/ ctx[12].name + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*selectedTalent*/ 16 && t3_value !== (t3_value = /*child*/ ctx[12].description + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*selectedTalent*/ 16 && t5_value !== (t5_value = /*child*/ ctx[12].requirements + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*selectedTalent*/ 16 && t7_value !== (t7_value = /*child*/ ctx[12].effect + "")) set_data_dev(t7, t7_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(112:2) {#each selectedTalent.children as child}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let h3;
    	let t1;
    	let row0;
    	let t2;
    	let row1;
    	let t3;
    	let select;
    	let t4;
    	let button0;
    	let t5;
    	let button1;
    	let t6;
    	let show_if;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value_1 = talentList;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
    	}

    	button0 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*addTalent*/ ctx[5](/*selectedTalentName*/ ctx[1]))) /*addTalent*/ ctx[5](/*selectedTalentName*/ ctx[1]).apply(this, arguments);
    	});

    	button1 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", function () {
    		if (is_function(/*removeTalent*/ ctx[6](/*selectedTalentName*/ ctx[1]))) /*removeTalent*/ ctx[6](/*selectedTalentName*/ ctx[1]).apply(this, arguments);
    	});

    	function select_block_type(ctx, dirty) {
    		if (show_if == null || dirty & /*selectedTalent*/ 16) show_if = !!/*selectedTalent*/ ctx[4].hasOwnProperty("children");
    		if (show_if) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx, -1);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Talents";
    			t1 = space();
    			create_component(row0.$$.fragment);
    			t2 = space();
    			create_component(row1.$$.fragment);
    			t3 = space();
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			create_component(button0.$$.fragment);
    			t5 = space();
    			create_component(button1.$$.fragment);
    			t6 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			add_location(h3, file$7, 90, 0, 2269);
    			if (/*selectedTalentName*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[7].call(select));
    			add_location(select, file$7, 103, 0, 2522);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(row1, target, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selectedTalentName*/ ctx[1]);
    			insert_dev(target, t4, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t6, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[7]);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			const row0_changes = {};

    			if (dirty & /*$$scope, maxTalents, usedTalents*/ 1048585) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope, activeTalents*/ 1048580) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);

    			if (dirty & /*talentList*/ 0) {
    				each_value_1 = talentList;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*selectedTalentName, talentList*/ 2) {
    				select_option(select, /*selectedTalentName*/ ctx[1]);
    			}

    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);

    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(row1, detaching);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t6);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func$1 = talent => talent.level > 0;

    function instance$7($$self, $$props, $$invalidate) {
    	let selectedTalentName;
    	let selectedTalent;
    	let usedTalents;
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(8, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Talents", slots, []);
    	let { maxTalents } = $$props;
    	let activeTalents = JSON.parse(JSON.stringify(talentList));

    	activeTalents.forEach(talent => {
    		talent.level = 0;
    	});

    	function getTalentByName(name) {
    		let selected = {};

    		activeTalents.forEach(talent => {
    			if (talent.name == name) {
    				selected = talent;
    			}
    		});

    		if (!selected) {
    			selected = activeTalents[0];
    		}

    		return selected;
    	}

    	function addTalent(name) {
    		getTalentByName(name);

    		activeTalents.forEach(talent => {
    			if (talent.name === name) {
    				if (talent.level == 0) {
    					talent.level++;
    				} else if (talent.hasOwnProperty("children")) {
    					if (talent.level < talent.children.length) {
    						talent.level++;
    					}
    				}
    			}
    		});

    		updateVars();
    	}

    	function removeTalent(name) {
    		getTalentByName(name);

    		activeTalents.forEach(talent => {
    			if (talent.name === name && talent.level > 0) {
    				talent.level--;
    			}
    		});

    		updateVars();
    	}

    	function updateVars() {
    		$$invalidate(2, activeTalents);
    		$$invalidate(3, usedTalents = getUsedTalents());

    		if ($character.schools.length > 0) {
    			if (activeTalents.filter(talent => talent.level > 0).length > 0) {
    				let charTalents = [];

    				activeTalents.filter(talent => talent.level > 0).forEach(talent => {
    					let obj = {};
    					obj.name = talent.name;
    					obj.level = talent.level;
    					charTalents.push(obj);
    				});

    				console.log(JSON.stringify(charTalents));
    				set_store_value(character, $character.schools[$character.schools.length - 1].talents = charTalents, $character);
    			} else set_store_value(character, $character.schools[$character.schools.length - 1].talents = [], $character);
    		}
    	}

    	function getUsedTalents() {
    		let sum = 0;

    		activeTalents.filter(talent => talent.level > 0).forEach(talent => {
    			sum += talent.level;
    		});

    		return sum;
    	}

    	const writable_props = ["maxTalents"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Talents> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		selectedTalentName = select_value(this);
    		$$invalidate(1, selectedTalentName);
    	}

    	$$self.$$set = $$props => {
    		if ("maxTalents" in $$props) $$invalidate(0, maxTalents = $$props.maxTalents);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		talentList,
    		character,
    		maxTalents,
    		activeTalents,
    		getTalentByName,
    		addTalent,
    		removeTalent,
    		updateVars,
    		getUsedTalents,
    		usedTalents,
    		$character,
    		selectedTalentName,
    		selectedTalent
    	});

    	$$self.$inject_state = $$props => {
    		if ("maxTalents" in $$props) $$invalidate(0, maxTalents = $$props.maxTalents);
    		if ("activeTalents" in $$props) $$invalidate(2, activeTalents = $$props.activeTalents);
    		if ("usedTalents" in $$props) $$invalidate(3, usedTalents = $$props.usedTalents);
    		if ("selectedTalentName" in $$props) $$invalidate(1, selectedTalentName = $$props.selectedTalentName);
    		if ("selectedTalent" in $$props) $$invalidate(4, selectedTalent = $$props.selectedTalent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*selectedTalentName*/ 2) {
    			$$invalidate(4, selectedTalent = getTalentByName(selectedTalentName));
    		}
    	};

    	$$invalidate(1, selectedTalentName = "GOOD FORM");
    	$$invalidate(3, usedTalents = getUsedTalents());

    	return [
    		maxTalents,
    		selectedTalentName,
    		activeTalents,
    		usedTalents,
    		selectedTalent,
    		addTalent,
    		removeTalent,
    		select_change_handler
    	];
    }

    class Talents extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { maxTalents: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Talents",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*maxTalents*/ ctx[0] === undefined && !("maxTalents" in props)) {
    			console_1.warn("<Talents> was created without expected prop 'maxTalents'");
    		}
    	}

    	get maxTalents() {
    		throw new Error("<Talents>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxTalents(value) {
    		throw new Error("<Talents>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\schools\superiormaneuvers.svelte generated by Svelte v3.37.0 */
    const file$6 = "src\\schools\\superiormaneuvers.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[5] = list;
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (18:0) <Col>
    function create_default_slot_1$2(ctx) {
    	let input;
    	let mounted;
    	let dispose;

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[3].call(input, /*i*/ ctx[6]);
    	}

    	const block = {
    		c: function create() {
    			input = element("input");
    			attr_dev(input, "type", "text");
    			add_location(input, file$6, 18, 2, 410);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*selectedManeuvers*/ ctx[1][/*i*/ ctx[6]]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", input_input_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*selectedManeuvers*/ 2 && input.value !== /*selectedManeuvers*/ ctx[1][/*i*/ ctx[6]]) {
    				set_input_value(input, /*selectedManeuvers*/ ctx[1][/*i*/ ctx[6]]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(18:0) <Col>",
    		ctx
    	});

    	return block;
    }

    // (17:0) <Row>
    function create_default_slot$2(ctx) {
    	let col;
    	let t;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, selectedManeuvers*/ 130) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(17:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (16:0) {#each new Array(maxManeuvers) as choice, i}
    function create_each_block$2(ctx) {
    	let row;
    	let current;

    	row = new Row({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row_changes = {};

    			if (dirty & /*$$scope, selectedManeuvers*/ 130) {
    				row_changes.$$scope = { dirty, ctx };
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(16:0) {#each new Array(maxManeuvers) as choice, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let h3;
    	let t1;
    	let each_1_anchor;
    	let current;
    	let each_value = new Array(/*maxManeuvers*/ ctx[0]);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "Superior Maneuvers";
    			t1 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    			add_location(h3, file$6, 14, 0, 319);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*selectedManeuvers, maxManeuvers*/ 3) {
    				each_value = new Array(/*maxManeuvers*/ ctx[0]);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(2, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Superiormaneuvers", slots, []);
    	let { maxManeuvers } = $$props;
    	let selectedManeuvers = [];
    	const writable_props = ["maxManeuvers"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Superiormaneuvers> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler(i) {
    		selectedManeuvers[i] = this.value;
    		$$invalidate(1, selectedManeuvers);
    	}

    	$$self.$$set = $$props => {
    		if ("maxManeuvers" in $$props) $$invalidate(0, maxManeuvers = $$props.maxManeuvers);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		character,
    		maxManeuvers,
    		selectedManeuvers,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("maxManeuvers" in $$props) $$invalidate(0, maxManeuvers = $$props.maxManeuvers);
    		if ("selectedManeuvers" in $$props) $$invalidate(1, selectedManeuvers = $$props.selectedManeuvers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$character, selectedManeuvers*/ 6) {
    			{
    				if ($character.schools.length > 0) {
    					set_store_value(character, $character.schools[$character.schools.length - 1].superiorManeuvers = selectedManeuvers, $character);
    				}
    			}
    		}
    	};

    	return [maxManeuvers, selectedManeuvers, $character, input_input_handler];
    }

    class Superiormaneuvers extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { maxManeuvers: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Superiormaneuvers",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*maxManeuvers*/ ctx[0] === undefined && !("maxManeuvers" in props)) {
    			console.warn("<Superiormaneuvers> was created without expected prop 'maxManeuvers'");
    		}
    	}

    	get maxManeuvers() {
    		throw new Error("<Superiormaneuvers>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set maxManeuvers(value) {
    		throw new Error("<Superiormaneuvers>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const proficiencyList = [{
        name: "Wrestling",
        type: "MELEE"
      },
      {
        name: "Pugilism",
        type: "MELEE"
      },
      {
        name: "Dagger",
        type: "MELEE"
      },
      {
        name: "1H Sword",
        type: "MELEE"
      },
      {
        name: "2H Sword",
        type: "MELEE"
      },
      {
        name: "1H Blunt",
        type: "MELEE"
      },
      {
        name: "2H Blunt",
        type: "MELEE"
      },
      {
        name: "Spear",
        type: "MELEE"
      },
      {
        name: "Polearm",
        type: "MELEE"
      },
      {
        name: "Bow",
        type: "MISSILE"
      },
      {
        name: "Crossbow",
        type: "MISSILE"
      },
      {
        name: "Firearm",
        type: "MISSILE"
      },
      {
        name: "Throwing",
        type: "MISSILE"
      },
      {
        name: "Sling",
        type: "MISSILE"
      },
      {
        name: "Burdinadin Firearm",
        type: "MISSILE"
      }
    ];

    const baseSchools = [{
        "name": "Scrapper",
        "description": "Self-taught in the school of hard knocks, a Scrapper’s skills are unpolished and rough, but well-practiced. Scrappers tend to know a thing or two about fighting dirty as well.",
        "requirements": "",
        "cost": 0,
        "profNum": 4,
        "bonuses": [{
          "name": "Dirty Trick",
          "description": "Once per opponent (this is not per-fight, once you’ve fought dirty against someone they will remember your tricks) you may make a Melee Throw, Melee Toss, Bite, Kick, Grapple: Eye-Gouge or Grapple: Break Maneuver at -1 TN."
        }]
      },
      {
        "name": "Soldier",
        "description": "Fighting men are trained en-masse to fight with battlefield weapons in gruesome and efficient manners. A Soldier’s training tends to harden their bodies and minds against pain, fatigue and fear alike.",
        "requirements": "",
        "cost": 1,
        "profNum": 10,
        "bonuses": [{
            "name": "Discipline",
            "description": "You gain a +2 bonus to Willpower Tests against Fear."
          },
          {
            "name": "Warrior's Grit",
            "description": "You gain a +2 bonus to starting Grit."
          }
        ]
      },
      {
        "name": "Officer",
        "description": `Officers are trained to inspire their men to hold the line and
carry the charge. The skills an officer must learn in combat
reflect this, and they specialize in fewer fighting styles.`,
        "requirements": "5gp for training and diploma",
        "cost": 3,
        "profNum": 4,
        "bonuses": [{
            "name": "By Example",
            "description": "Gain +2 bonus to CP when Charging"
          },
          [{
              "name": "Protect the Banner",
              "description": `At the Refresh, you gain +2 bonus CP
per additional opponent you face in a melee bout. That is,
if you’re facing two opponents, you only gain +2 for the
additional opponent`
            },
            {
              "name": "Ride to Ruin",
              "description": `You gain an additional +2 CP when mounted.`
            },
          ]
        ]
      },
      {
        "name": "Noble",
        "description": `Noblemen learn in the finest fencing schools and under
private tutors. They are taught techniques that common men
would never learn, and tend to think of themselves (rightfully) as a cut above the rest of the crowd. This attitude, and
their flashy style, can be highly intimidating. However, when
seriously challenged, a noble’s confidence can falter.`,
        "requirements": "15 gp for training, tutelage and catering",
        "cost": 5,
        "profNum": 3,
        "bonuses": [{
            "name": "Superior Instruction",
            "description": `You gain an extra talent at
levels 6, 12, and 18. These are in addition to other talents
gained through leveling up your school.`
          },
          {
            "name": "Confidence",
            "description": `If you have not been injured in this combat yet,
you gain +2 bonus to CP.`
          },
        ]
      },
      {
        "name": "Traditional Fencer",
        "description": `Rigorously trained and disciplined, traditional fencers are
peerless swordsmen (at least in their eyes), and they prefer
to fight in a dignified and structured manner, with few tricks
and fewer treacheries. They specialize in simple, but agonizingly perfected techniques that are difficult to counter`,
        "requirements": "10 gp for training and proper sacrifices",
        "cost": 5,
        "profNum": 4,
        "bonuses": [{
            "name": "Extreme Repetition",
            "description": `When declaring a Universal
Attack or Universal Defense maneuver, which would roll 10
or more dice, one of the dice may be an automatic success
instead of being rolled. `
          },
          {
            "name": "Centered",
            "description": `You gain an automatic success on stability tests of
all sorts, in and out of combat.`
          },
        ]
      },
      {
        "name": "Unorthodox Fencer",
        "description": `Swordsmanship has changed, and unorthodox fencers are
on the bleeding edge of that change. New techniques, new
geometries of combat, and new ideas are all welcome in these
fresh halls. Unorthodox fencers rely on specially designed
techniques to outmaneuver and defeat their opponents. Get
with the times, gramps!`,
        "requirements": "5 gp for training",
        "cost": 5,
        "profNum": 6,
        "bonuses": [{
            "name": "The Meisterhau",
            "description": `Masterstrike’s activation cost is
reduced from X+Y+2 to X+Y.`
          },
          {
            "name": "Treachery",
            "description": `When making a Pommel Strike or End Him Rightly
maneuver, you make the attack at -1 TN.`
          },
        ]
      },
      {
        "name": "Esoteric School",
        "description": `Esoteric school fighters are raised in a very different environment from other fighters. The Esoteric school is more
interested in purity, mysticism and spirituality than it is
in strictly mastering violence. Esoteric schools tend to have
different philosophies, but they are ultimately similar in their
approach to blending their aesthetic beliefs with martial arts.`,
        "requirements": "Belief arc must coincide with the school’s values. Cannot be a Complete Monster.",
        "cost": 8,
        "profNum": 4,
        "bonuses": [{
            "name": "Simplicity",
            "description": `This ability is only active when you are wearing
no individual pieces of armor with a weight value, not
including shields or helmets. Any superior maneuver
employed either by you or your opponent has a +4 activation cost added to it.`
    },[
      {
        "name": "Flowing Water",
        "description": `Your Parry maneuvers are resolved at -1 TN so long
as Simplicity is active`
      },
      {
        "name": "Raging Flame",
        "description": ` Your attack maneuvers which inflict damage or stun are
resolved at -1 TN if Simplicity is active.`
      },
      {
        "name": "Biting Wind",
        "description": `Your Void maneuvers are
resolved at -1 TN if Simplicity is active.`
      },
      {
        "name": "Stoic Earth",
        "description": `Your Block maneuvers are
resolved at -1 TN if Simplicity is active.`
      },
    ]
        ]
      },
    ];

    /*
    {
      "name":"",
      "description": ``,
      "requirements": "",
      "cost": 0,
      "profNum": 0,
      "bonuses": [ {
        "name": "",
        "description": ``
        },
      ]
    }
    */

    const burdSchools = [{
      "name": "Glade Security",
      "description": "Glade security forces are trained for peacekeeping and combat encounters in the claustrophobic and dark environment of an Iron Glade. They are generally experienced in close-quarters fighting utilizing modern Burdinadin firearms, and unarmed martial arts. However, training concerning the use of primitive weaponry is practically never conducted.",
      "requirements": "Must be reasonably eligible to have received Glade security training.",
      "cost": 3,
      "profNum": 5,
      "bonuses": [{
        "name": "Stop Resisting!",
        "description": `Inflict an additional +3 stun to enemies that are Prone.`
      }, [
        {
          "name": "Mostly Peaceful De-Escalation",
          "description": `You may use Burdinadin Firearms to perform the Disarm Maneuver.`
        },
        {
          "name": "Social Worker's Touch",
          "description": `Inflict +1 damage whenever you land a hit to the head.`
        },
      ]
      ]
    },
    {
      "name": "Burdinadin Field Operations",
      "description": `Burdinadin field operatives are trained to make the most of the capabilities of their augmented combat armor, as well as to prevent damage to it.`,
      "requirements": `Must be reasonably eligible to have received training in the use of Burdinadin Combat Armor`,
      "cost": 3,
      "profNum": 3,
      "bonuses": [{
        "name": "Just Like the Simulations",
        "description": `When you tie an opponent's Missile Defense you still deal full damage. All that training really paid off!`
      },
      [{
        "name": "On the Bounce",
        "description": `You just never stop moving. Increase the bonus to Missile Defense from moving or sprinting by +1, and additionally you can perform simple Burdinadin Firearm actions (Reload, clearing a jam, etc) while performing the Move action.`
      },
      {
        "name": "King of the Hill",
        "description": `The opposing team never won a simulated match when you were on top. Increase Missile Defense gained from cover by +1. Additionally if you have moved into cover during your last action, you count as also having performed the Aim action once.`
      },
      ]
      ]
    }
    ];

    /*
    {
      "name":"",
      "description": ``,
      "requirements": "",
      "cost": 0,
      "profNum": 0,
      "bonuses": [ {
        "name": "",
        "description": ``
        },
      ]
    }
    */

    const homebrewSchools = [
      {
        "name": "Monster Hunter",
        "description": ``,
        "requirements": "5 gp for training. Must have reasonable access to a monster hunting organization or experienced monster hunter for training.",
        "cost": 3,
        "profNum": 3,
        "bonuses": [{
            "name": "Unique Training",
            "description": "Gain +2 bonus to CP when fighting Monsters, Spawn, Vampires, and Undead"
          }, [
            {
                "name": "Another Day on the Job",
                "description": `Gain a +4 bonus to WIL against Fear from supernatural or monstrous sources.`
              }, {
                "name": "The Bigger They Are...",
                "description": `Gain a +4 bonus to Climb tests made while Clinging to or Climbing a behemoth.`
              }
          ]
        ]
      },
    ];

    /* src\schools\schools.svelte generated by Svelte v3.37.0 */
    const file$5 = "src\\schools\\schools.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[34] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[34] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[39] = list[i];
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[42] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	child_ctx[47] = i;
    	return child_ctx;
    }

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[45] = list[i];
    	return child_ctx;
    }

    // (264:2) <Col>
    function create_default_slot_12$1(ctx) {
    	let p;
    	let t0;
    	let t1;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Used PCP: ");
    			t1 = text(/*usedPCP*/ ctx[0]);
    			add_location(p, file$5, 264, 4, 6267);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*usedPCP*/ 1) set_data_dev(t1, /*usedPCP*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12$1.name,
    		type: "slot",
    		source: "(264:2) <Col>",
    		ctx
    	});

    	return block;
    }

    // (267:2) <Col>
    function create_default_slot_11$1(ctx) {
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let t3_value = /*pcpToPoints*/ ctx[11][/*usedPCP*/ ctx[0] - 1] + "";
    	let t3;
    	let t4;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text("Used Points: ");
    			t1 = text(/*pointsUsed*/ ctx[7]);
    			t2 = text(" (");
    			t3 = text(t3_value);
    			t4 = text(")");
    			add_location(p, file$5, 267, 4, 6315);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			append_dev(p, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*pointsUsed*/ 128) set_data_dev(t1, /*pointsUsed*/ ctx[7]);
    			if (dirty[0] & /*usedPCP*/ 1 && t3_value !== (t3_value = /*pcpToPoints*/ ctx[11][/*usedPCP*/ ctx[0] - 1] + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11$1.name,
    		type: "slot",
    		source: "(267:2) <Col>",
    		ctx
    	});

    	return block;
    }

    // (263:0) <Row>
    function create_default_slot_10$1(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_12$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	col1 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_11$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty[0] & /*usedPCP*/ 1 | dirty[1] & /*$$scope*/ 524288) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty[0] & /*usedPCP, pointsUsed*/ 129 | dirty[1] & /*$$scope*/ 524288) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(col1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10$1.name,
    		type: "slot",
    		source: "(263:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (277:8) {#if school.choice != ''}
    function create_if_block_1(ctx) {
    	let t0;
    	let t1_value = /*school*/ ctx[45].choice + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			t0 = text("(");
    			t1 = text(t1_value);
    			t2 = text(")");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeSchools*/ 2 && t1_value !== (t1_value = /*school*/ ctx[45].choice + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(277:8) {#if school.choice != ''}",
    		ctx
    	});

    	return block;
    }

    // (273:4) <Col>
    function create_default_slot_9$1(ctx) {
    	let p;
    	let t0_value = /*school*/ ctx[45].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*school*/ ctx[45].level + "";
    	let t2;
    	let t3;
    	let t4;
    	let if_block = /*school*/ ctx[45].choice != "" && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			p = element("p");
    			t0 = text(t0_value);
    			t1 = text(":\n        ");
    			t2 = text(t2_value);
    			t3 = space();
    			if (if_block) if_block.c();
    			t4 = space();
    			add_location(p, file$5, 273, 6, 6486);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    			append_dev(p, t3);
    			if (if_block) if_block.m(p, null);
    			insert_dev(target, t4, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeSchools*/ 2 && t0_value !== (t0_value = /*school*/ ctx[45].name + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*activeSchools*/ 2 && t2_value !== (t2_value = /*school*/ ctx[45].level + "")) set_data_dev(t2, t2_value);

    			if (/*school*/ ctx[45].choice != "") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(p, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9$1.name,
    		type: "slot",
    		source: "(273:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (272:2) {#each activeSchools.filter((school) => school.level > 0) as school}
    function create_each_block_5(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_9$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty[0] & /*activeSchools*/ 2 | dirty[1] & /*$$scope*/ 524288) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(272:2) {#each activeSchools.filter((school) => school.level > 0) as school}",
    		ctx
    	});

    	return block;
    }

    // (271:0) <Row>
    function create_default_slot_8$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_5 = /*activeSchools*/ ctx[1].filter(func);
    	validate_each_argument(each_value_5);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeSchools*/ 2) {
    				each_value_5 = /*activeSchools*/ ctx[1].filter(func);
    				validate_each_argument(each_value_5);
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_5.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_5.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8$1.name,
    		type: "slot",
    		source: "(271:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (285:6) {#each schoolList as school, i}
    function create_each_block_4(ctx) {
    	let option;
    	let t_value = /*school*/ ctx[45].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*school*/ ctx[45].name;
    			option.value = option.__value;
    			add_location(option, file$5, 285, 8, 6736);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*schoolList*/ 64 && t_value !== (t_value = /*school*/ ctx[45].name + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*schoolList*/ 64 && option_value_value !== (option_value_value = /*school*/ ctx[45].name)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(285:6) {#each schoolList as school, i}",
    		ctx
    	});

    	return block;
    }

    // (289:4) <Button on:click={addSchool(selectedSchoolName)}>
    function create_default_slot_7$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("+");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7$1.name,
    		type: "slot",
    		source: "(289:4) <Button on:click={addSchool(selectedSchoolName)}>",
    		ctx
    	});

    	return block;
    }

    // (290:4) <Button on:click={removeSchool(selectedSchoolName)}>
    function create_default_slot_6$1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("-");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6$1.name,
    		type: "slot",
    		source: "(290:4) <Button on:click={removeSchool(selectedSchoolName)}>",
    		ctx
    	});

    	return block;
    }

    // (283:2) <Col>
    function create_default_slot_5$1(ctx) {
    	let select;
    	let t0;
    	let button0;
    	let t1;
    	let button1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_4 = /*schoolList*/ ctx[6];
    	validate_each_argument(each_value_4);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	button0 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_7$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button0.$on("click", function () {
    		if (is_function(/*addSchool*/ ctx[12](/*selectedSchoolName*/ ctx[5]))) /*addSchool*/ ctx[12](/*selectedSchoolName*/ ctx[5]).apply(this, arguments);
    	});

    	button1 = new Button({
    			props: {
    				$$slots: { default: [create_default_slot_6$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1.$on("click", function () {
    		if (is_function(/*removeSchool*/ ctx[13](/*selectedSchoolName*/ ctx[5]))) /*removeSchool*/ ctx[13](/*selectedSchoolName*/ ctx[5]).apply(this, arguments);
    	});

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			create_component(button0.$$.fragment);
    			t1 = space();
    			create_component(button1.$$.fragment);
    			if (/*selectedSchoolName*/ ctx[5] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[17].call(select));
    			add_location(select, file$5, 283, 4, 6649);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selectedSchoolName*/ ctx[5]);
    			insert_dev(target, t0, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button1, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[17]);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty[0] & /*schoolList*/ 64) {
    				each_value_4 = /*schoolList*/ ctx[6];
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_4.length;
    			}

    			if (dirty[0] & /*selectedSchoolName, schoolList*/ 96) {
    				select_option(select, /*selectedSchoolName*/ ctx[5]);
    			}

    			const button0_changes = {};

    			if (dirty[1] & /*$$scope*/ 524288) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty[1] & /*$$scope*/ 524288) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button1, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(283:2) <Col>",
    		ctx
    	});

    	return block;
    }

    // (282:0) <Row>
    function create_default_slot_4$1(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty[0] & /*selectedSchoolName, schoolList*/ 96 | dirty[1] & /*$$scope*/ 524288) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(282:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (308:2) {:else}
    function create_else_block(ctx) {
    	let p;
    	let strong;
    	let t0_value = /*bonus*/ ctx[39].name + "";
    	let t0;
    	let t1;
    	let t2_value = /*bonus*/ ctx[39].description + "";
    	let t2;

    	const block = {
    		c: function create() {
    			p = element("p");
    			strong = element("strong");
    			t0 = text(t0_value);
    			t1 = text(": ");
    			t2 = text(t2_value);
    			add_location(strong, file$5, 308, 7, 7528);
    			add_location(p, file$5, 308, 4, 7525);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, strong);
    			append_dev(strong, t0);
    			append_dev(p, t1);
    			append_dev(p, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*selectedSchool*/ 16 && t0_value !== (t0_value = /*bonus*/ ctx[39].name + "")) set_data_dev(t0, t0_value);
    			if (dirty[0] & /*selectedSchool*/ 16 && t2_value !== (t2_value = /*bonus*/ ctx[39].description + "")) set_data_dev(t2, t2_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(308:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (301:2) {#if Array.isArray(bonus)}
    function create_if_block(ctx) {
    	let select;
    	let t0;
    	let p;
    	let t1_value = /*selectedBonus*/ ctx[10].description + "";
    	let t1;
    	let mounted;
    	let dispose;
    	let each_value_3 = /*bonus*/ ctx[39];
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			p = element("p");
    			t1 = text(t1_value);
    			if (/*selectedBonusName*/ ctx[2] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[18].call(select));
    			add_location(select, file$5, 301, 4, 7300);
    			add_location(p, file$5, 306, 4, 7476);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*selectedBonusName*/ ctx[2]);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, p, anchor);
    			append_dev(p, t1);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler_1*/ ctx[18]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*selectedSchool*/ 16) {
    				each_value_3 = /*bonus*/ ctx[39];
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_3.length;
    			}

    			if (dirty[0] & /*selectedBonusName, selectedSchool*/ 20) {
    				select_option(select, /*selectedBonusName*/ ctx[2]);
    			}

    			if (dirty[0] & /*selectedBonus*/ 1024 && t1_value !== (t1_value = /*selectedBonus*/ ctx[10].description + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(p);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(301:2) {#if Array.isArray(bonus)}",
    		ctx
    	});

    	return block;
    }

    // (303:6) {#each bonus as bonusOption}
    function create_each_block_3(ctx) {
    	let option;
    	let t_value = /*bonusOption*/ ctx[42].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*bonusOption*/ ctx[42].name;
    			option.value = option.__value;
    			add_location(option, file$5, 303, 8, 7383);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*selectedSchool*/ 16 && t_value !== (t_value = /*bonusOption*/ ctx[42].name + "")) set_data_dev(t, t_value);

    			if (dirty[0] & /*selectedSchool*/ 16 && option_value_value !== (option_value_value = /*bonusOption*/ ctx[42].name)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(303:6) {#each bonus as bonusOption}",
    		ctx
    	});

    	return block;
    }

    // (300:0) {#each selectedSchool.bonuses as bonus}
    function create_each_block_2(ctx) {
    	let show_if;
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (show_if == null || dirty[0] & /*selectedSchool*/ 16) show_if = !!Array.isArray(/*bonus*/ ctx[39]);
    		if (show_if) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx, [-1]);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx, dirty)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(300:0) {#each selectedSchool.bonuses as bonus}",
    		ctx
    	});

    	return block;
    }

    // (315:4) <Col>
    function create_default_slot_3$1(ctx) {
    	let p0;
    	let t0_value = /*prof*/ ctx[34].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let input;
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			input = element("input");
    			t2 = space();
    			add_location(p0, file$5, 315, 6, 7701);
    			attr_dev(input, "type", "checkbox");
    			input.__value = /*prof*/ ctx[34].name;
    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[20][0].push(input);
    			add_location(input, file$5, 317, 8, 7738);
    			add_location(p1, file$5, 316, 6, 7726);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, input);
    			input.checked = ~/*activeProficiencies*/ ctx[3].indexOf(input.__value);
    			insert_dev(target, t2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler*/ ctx[19]),
    					listen_dev(input, "change", /*updateVars*/ ctx[14], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeProficiencies*/ 8) {
    				input.checked = ~/*activeProficiencies*/ ctx[3].indexOf(input.__value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			/*$$binding_groups*/ ctx[20][0].splice(/*$$binding_groups*/ ctx[20][0].indexOf(input), 1);
    			if (detaching) detach_dev(t2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(315:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (314:2) {#each proficiencyList.filter((prof) => prof.type == 'MELEE') as prof}
    function create_each_block_1(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty[0] & /*activeProficiencies*/ 8 | dirty[1] & /*$$scope*/ 524288) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(314:2) {#each proficiencyList.filter((prof) => prof.type == 'MELEE') as prof}",
    		ctx
    	});

    	return block;
    }

    // (313:0) <Row>
    function create_default_slot_2$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = proficiencyList.filter(func_1);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeProficiencies, updateVars*/ 16392) {
    				each_value_1 = proficiencyList.filter(func_1);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(313:0) <Row>",
    		ctx
    	});

    	return block;
    }

    // (329:4) <Col>
    function create_default_slot_1$1(ctx) {
    	let p0;
    	let t0_value = /*prof*/ ctx[34].name + "";
    	let t0;
    	let t1;
    	let p1;
    	let input;
    	let t2;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			p0 = element("p");
    			t0 = text(t0_value);
    			t1 = space();
    			p1 = element("p");
    			input = element("input");
    			t2 = space();
    			add_location(p0, file$5, 329, 6, 8014);
    			attr_dev(input, "type", "checkbox");
    			input.__value = /*prof*/ ctx[34].name;
    			input.value = input.__value;
    			/*$$binding_groups*/ ctx[20][0].push(input);
    			add_location(input, file$5, 331, 8, 8051);
    			add_location(p1, file$5, 330, 6, 8039);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, input);
    			input.checked = ~/*activeProficiencies*/ ctx[3].indexOf(input.__value);
    			insert_dev(target, t2, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "change", /*input_change_handler_1*/ ctx[21]),
    					listen_dev(input, "change", /*updateVars*/ ctx[14], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeProficiencies*/ 8) {
    				input.checked = ~/*activeProficiencies*/ ctx[3].indexOf(input.__value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p1);
    			/*$$binding_groups*/ ctx[20][0].splice(/*$$binding_groups*/ ctx[20][0].indexOf(input), 1);
    			if (detaching) detach_dev(t2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(329:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (328:2) {#each proficiencyList.filter((prof) => prof.type == 'MISSILE') as prof}
    function create_each_block$1(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty[0] & /*activeProficiencies*/ 8 | dirty[1] & /*$$scope*/ 524288) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(328:2) {#each proficiencyList.filter((prof) => prof.type == 'MISSILE') as prof}",
    		ctx
    	});

    	return block;
    }

    // (327:0) <Row>
    function create_default_slot$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = proficiencyList.filter(func_2);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*activeProficiencies, updateVars*/ 16392) {
    				each_value = proficiencyList.filter(func_2);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(327:0) <Row>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let h2;
    	let t1;
    	let row0;
    	let t2;
    	let row1;
    	let t3;
    	let row2;
    	let t4;
    	let p0;
    	let t5_value = /*selectedSchool*/ ctx[4].description + "";
    	let t5;
    	let t6;
    	let p1;
    	let strong0;

    	let t8_value = (/*selectedSchool*/ ctx[4].requirements
    	? /*selectedSchool*/ ctx[4].requirements
    	: "None") + "";

    	let t8;
    	let t9;
    	let p2;
    	let strong1;
    	let t11_value = /*selectedSchool*/ ctx[4].cost + "";
    	let t11;
    	let t12;
    	let p3;
    	let strong2;
    	let t14;
    	let t15_value = /*selectedSchool*/ ctx[4].profNum + "";
    	let t15;
    	let t16;
    	let t17;
    	let hr;
    	let t18;
    	let row3;
    	let t19;
    	let row4;
    	let t20;
    	let talents_1;
    	let t21;
    	let superiormaneuvers;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_10$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_8$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row2 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let each_value_2 = /*selectedSchool*/ ctx[4].bonuses;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	row3 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row4 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	talents_1 = new Talents({
    			props: { maxTalents: /*talents*/ ctx[9] },
    			$$inline: true
    		});

    	superiormaneuvers = new Superiormaneuvers({
    			props: {
    				maxManeuvers: /*superiorManeuvers*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Schools and Proficiencies";
    			t1 = space();
    			create_component(row0.$$.fragment);
    			t2 = space();
    			create_component(row1.$$.fragment);
    			t3 = space();
    			create_component(row2.$$.fragment);
    			t4 = space();
    			p0 = element("p");
    			t5 = text(t5_value);
    			t6 = space();
    			p1 = element("p");
    			strong0 = element("strong");
    			strong0.textContent = "Requirements:\n  ";
    			t8 = text(t8_value);
    			t9 = space();
    			p2 = element("p");
    			strong1 = element("strong");
    			strong1.textContent = "Cost: ";
    			t11 = text(t11_value);
    			t12 = space();
    			p3 = element("p");
    			strong2 = element("strong");
    			strong2.textContent = "Proficiencies:";
    			t14 = space();
    			t15 = text(t15_value);
    			t16 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t17 = space();
    			hr = element("hr");
    			t18 = space();
    			create_component(row3.$$.fragment);
    			t19 = space();
    			create_component(row4.$$.fragment);
    			t20 = space();
    			create_component(talents_1.$$.fragment);
    			t21 = space();
    			create_component(superiormaneuvers.$$.fragment);
    			add_location(h2, file$5, 260, 0, 6213);
    			add_location(p0, file$5, 292, 0, 6962);
    			add_location(strong0, file$5, 294, 2, 7004);
    			add_location(p1, file$5, 293, 0, 6998);
    			add_location(strong1, file$5, 297, 3, 7114);
    			add_location(p2, file$5, 297, 0, 7111);
    			add_location(strong2, file$5, 298, 3, 7166);
    			add_location(p3, file$5, 298, 0, 7163);
    			add_location(hr, file$5, 311, 0, 7599);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(row0, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(row1, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(row2, target, anchor);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t5);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, strong0);
    			append_dev(p1, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, strong1);
    			append_dev(p2, t11);
    			insert_dev(target, t12, anchor);
    			insert_dev(target, p3, anchor);
    			append_dev(p3, strong2);
    			append_dev(p3, t14);
    			append_dev(p3, t15);
    			insert_dev(target, t16, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t17, anchor);
    			insert_dev(target, hr, anchor);
    			insert_dev(target, t18, anchor);
    			mount_component(row3, target, anchor);
    			insert_dev(target, t19, anchor);
    			mount_component(row4, target, anchor);
    			insert_dev(target, t20, anchor);
    			mount_component(talents_1, target, anchor);
    			insert_dev(target, t21, anchor);
    			mount_component(superiormaneuvers, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const row0_changes = {};

    			if (dirty[0] & /*usedPCP, pointsUsed*/ 129 | dirty[1] & /*$$scope*/ 524288) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty[0] & /*activeSchools*/ 2 | dirty[1] & /*$$scope*/ 524288) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    			const row2_changes = {};

    			if (dirty[0] & /*selectedSchoolName, schoolList*/ 96 | dirty[1] & /*$$scope*/ 524288) {
    				row2_changes.$$scope = { dirty, ctx };
    			}

    			row2.$set(row2_changes);
    			if ((!current || dirty[0] & /*selectedSchool*/ 16) && t5_value !== (t5_value = /*selectedSchool*/ ctx[4].description + "")) set_data_dev(t5, t5_value);

    			if ((!current || dirty[0] & /*selectedSchool*/ 16) && t8_value !== (t8_value = (/*selectedSchool*/ ctx[4].requirements
    			? /*selectedSchool*/ ctx[4].requirements
    			: "None") + "")) set_data_dev(t8, t8_value);

    			if ((!current || dirty[0] & /*selectedSchool*/ 16) && t11_value !== (t11_value = /*selectedSchool*/ ctx[4].cost + "")) set_data_dev(t11, t11_value);
    			if ((!current || dirty[0] & /*selectedSchool*/ 16) && t15_value !== (t15_value = /*selectedSchool*/ ctx[4].profNum + "")) set_data_dev(t15, t15_value);

    			if (dirty[0] & /*selectedBonus, selectedBonusName, selectedSchool*/ 1044) {
    				each_value_2 = /*selectedSchool*/ ctx[4].bonuses;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(t17.parentNode, t17);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_2.length;
    			}

    			const row3_changes = {};

    			if (dirty[0] & /*activeProficiencies*/ 8 | dirty[1] & /*$$scope*/ 524288) {
    				row3_changes.$$scope = { dirty, ctx };
    			}

    			row3.$set(row3_changes);
    			const row4_changes = {};

    			if (dirty[0] & /*activeProficiencies*/ 8 | dirty[1] & /*$$scope*/ 524288) {
    				row4_changes.$$scope = { dirty, ctx };
    			}

    			row4.$set(row4_changes);
    			const talents_1_changes = {};
    			if (dirty[0] & /*talents*/ 512) talents_1_changes.maxTalents = /*talents*/ ctx[9];
    			talents_1.$set(talents_1_changes);
    			const superiormaneuvers_changes = {};
    			if (dirty[0] & /*superiorManeuvers*/ 256) superiormaneuvers_changes.maxManeuvers = /*superiorManeuvers*/ ctx[8];
    			superiormaneuvers.$set(superiormaneuvers_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(row2.$$.fragment, local);
    			transition_in(row3.$$.fragment, local);
    			transition_in(row4.$$.fragment, local);
    			transition_in(talents_1.$$.fragment, local);
    			transition_in(superiormaneuvers.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(row2.$$.fragment, local);
    			transition_out(row3.$$.fragment, local);
    			transition_out(row4.$$.fragment, local);
    			transition_out(talents_1.$$.fragment, local);
    			transition_out(superiormaneuvers.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			destroy_component(row0, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(row1, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(row2, detaching);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t12);
    			if (detaching) detach_dev(p3);
    			if (detaching) detach_dev(t16);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t17);
    			if (detaching) detach_dev(hr);
    			if (detaching) detach_dev(t18);
    			destroy_component(row3, detaching);
    			if (detaching) detach_dev(t19);
    			destroy_component(row4, detaching);
    			if (detaching) detach_dev(t20);
    			destroy_component(talents_1, detaching);
    			if (detaching) detach_dev(t21);
    			destroy_component(superiormaneuvers, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function getFirstOption(school) {
    	let selected = { name: "", description: "" };

    	school.bonuses.forEach(bonus => {
    		if (Array.isArray(bonus)) {
    			selected = bonus[0];
    		}
    	});

    	return selected;
    }

    const func = school => school.level > 0;
    const func_1 = prof => prof.type == "MELEE";
    const func_2 = prof => prof.type == "MISSILE";

    function instance$5($$self, $$props, $$invalidate) {
    	let isHuman;
    	let selectedSchoolName;
    	let activeProficiencies;
    	let selectedBonusName;
    	let selectedSchool;
    	let selectedBonus;
    	let superiorManeuvers;
    	let talents;
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(16, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Schools", slots, []);
    	const pcpToPoints = [0, 3, 6, 9, 12, 15, 18, 21, 24, 27];
    	const schoolPointCosts = [0, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 6, 6, 6, 6, 8, 10, 10, 20]; //first level of school has a cost built in, no base level cost
    	const talentLevels = [1, 5, 7, 11, 13, 17, 19];
    	const superiorManeuverLevels = [3, 6, 9, 12, 15, 18, 20];
    	let schoolList = [];
    	schoolList = schoolList.concat(baseSchools);
    	schoolList = schoolList.concat(burdSchools);
    	schoolList = schoolList.concat(homebrewSchools);
    	let activeSchools = [];
    	let { race } = $$props;
    	let pointsUsed = 0;
    	let { usedPCP = 0 } = $$props;

    	function getSchoolByName(name) {
    		let selected = {
    			name: "",
    			cost: 0,
    			profNum: 0,
    			bonuses: []
    		};

    		schoolList.forEach(school => {
    			if (school.name == name) {
    				selected = school;
    			}
    		});

    		return selected;
    	}

    	function populateSchools() {
    		$$invalidate(1, activeSchools = JSON.parse(JSON.stringify(schoolList)));

    		activeSchools.forEach(school => {
    			school.level = 0;
    			school.choice = "";
    			school.talents = [];
    			school.superiorManeuvers = [];
    			school.mastery = {};
    			school.proficiencies = [];
    		});

    		return activeSchools;
    	}

    	function addSchool(schoolName) {
    		let wrongSchool = false;

    		activeSchools.filter(school => school.level > 0).forEach(school => {
    			if (school.name != schoolName) {
    				wrongSchool = true;
    			}
    		});

    		if (wrongSchool) {
    			updateVars();
    			return;
    		}

    		activeSchools.forEach(school => {
    			if (school.name === schoolName) {
    				if (school.level === 0) {
    					school.choice = selectedBonusName;
    				}

    				school.level++;
    			}
    		});

    		updateVars();
    	}

    	function removeSchool(schoolName) {
    		activeSchools.forEach(school => {
    			if (school.name === schoolName) {
    				if (school.level > 0) {
    					school.level--;
    				}
    			}
    		});

    		updateVars();
    	}

    	function getUsedPCP() {
    		let sum = getPointsUsed();
    		let pcp = -1;

    		for (let n = 0; n < pcpToPoints.length; n++) {
    			if (n < pcpToPoints.length - 1) {
    				if (sum > pcpToPoints[n] && sum <= pcpToPoints[n + 1]) {
    					pcp = n + 2;
    				}
    			}

    			if (sum == pcpToPoints[n]) {
    				pcp = n + 1;
    			}
    		}

    		return pcp;
    	}

    	function getPointsUsed() {
    		let sum = 0;

    		activeSchools.forEach(school => {
    			if (school.level > 0) {
    				sum += school.cost;
    			}

    			for (let n = 0; n < school.level; n++) {
    				sum += schoolPointCosts[n];
    			}
    		});

    		let highestSchool = activeSchools[0];

    		activeSchools.forEach(school => {
    			if (school.level > highestSchool.level) {
    				highestSchool = school;
    			}
    		});

    		let profs = 0;
    		let profCost = 0;
    		let profTotal = 0;

    		if (!isHuman) {
    			profCost++;
    		}

    		for (let n = 0; n < activeProficiencies.length; n++) {
    			if (profs === highestSchool.profNum) {
    				profCost++;
    			}

    			profs++;
    			profTotal += profCost;
    		}

    		sum += profTotal;
    		return sum;
    	}

    	function getHighestSchoolLevel() {
    		let sum = 0;

    		activeSchools.forEach(school => {
    			if (school.level > sum) {
    				sum = school.level;
    			}
    		});

    		return sum;
    	}

    	function getSuperiorManeuvers(level) {
    		let num = 0;

    		for (let n = 0; n < superiorManeuverLevels.length; n++) {
    			num = level >= superiorManeuverLevels[n] ? num + 1 : num;
    		}

    		return num;
    	}

    	function getTalents() {
    		let level = getHighestSchoolLevel();
    		let talents = 0;

    		for (let n = 0; n < talentLevels.length; n++) {
    			if (level >= talentLevels[n]) {
    				talents++;
    			}
    		}

    		return talents;
    	}

    	function updateVars() {
    		$$invalidate(0, usedPCP = getUsedPCP());
    		$$invalidate(1, activeSchools);
    		$$invalidate(8, superiorManeuvers = getSuperiorManeuvers(getHighestSchoolLevel()));
    		$$invalidate(7, pointsUsed = getPointsUsed());
    		$$invalidate(9, talents = getTalents());
    	}

    	function getSelectedBonusByName(bonusName) {
    		let selected = { name: "", description: "" };

    		selectedSchool.bonuses.forEach(bonus => {
    			if (Array.isArray(bonus)) {
    				bonus.forEach(child => {
    					if (child.name === bonusName) {
    						selected = child;
    					} else {
    						if (bonus.name === bonusName) {
    							selected = bonus;
    						}
    					}
    				});
    			}
    		});

    		return selected;
    	}

    	const writable_props = ["race", "usedPCP"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Schools> was created with unknown prop '${key}'`);
    	});

    	const $$binding_groups = [[]];

    	function select_change_handler() {
    		selectedSchoolName = select_value(this);
    		$$invalidate(5, selectedSchoolName);
    		$$invalidate(6, schoolList);
    	}

    	function select_change_handler_1() {
    		selectedBonusName = select_value(this);
    		$$invalidate(2, selectedBonusName);
    		($$invalidate(4, selectedSchool), $$invalidate(5, selectedSchoolName));
    	}

    	function input_change_handler() {
    		activeProficiencies = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		$$invalidate(3, activeProficiencies);
    	}

    	function input_change_handler_1() {
    		activeProficiencies = get_binding_group_value($$binding_groups[0], this.__value, this.checked);
    		$$invalidate(3, activeProficiencies);
    	}

    	$$self.$$set = $$props => {
    		if ("race" in $$props) $$invalidate(15, race = $$props.race);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		onMount,
    		Talents,
    		SuperiorManeuvers: Superiormaneuvers,
    		proficiencyList,
    		baseSchools,
    		burdSchools,
    		homebrewSchools,
    		character,
    		pcpToPoints,
    		schoolPointCosts,
    		talentLevels,
    		superiorManeuverLevels,
    		schoolList,
    		activeSchools,
    		race,
    		pointsUsed,
    		usedPCP,
    		getSchoolByName,
    		populateSchools,
    		addSchool,
    		removeSchool,
    		getUsedPCP,
    		getPointsUsed,
    		getHighestSchoolLevel,
    		getSuperiorManeuvers,
    		getTalents,
    		updateVars,
    		getSelectedBonusByName,
    		getFirstOption,
    		selectedBonusName,
    		isHuman,
    		activeProficiencies,
    		superiorManeuvers,
    		talents,
    		selectedSchool,
    		selectedSchoolName,
    		selectedBonus,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("schoolList" in $$props) $$invalidate(6, schoolList = $$props.schoolList);
    		if ("activeSchools" in $$props) $$invalidate(1, activeSchools = $$props.activeSchools);
    		if ("race" in $$props) $$invalidate(15, race = $$props.race);
    		if ("pointsUsed" in $$props) $$invalidate(7, pointsUsed = $$props.pointsUsed);
    		if ("usedPCP" in $$props) $$invalidate(0, usedPCP = $$props.usedPCP);
    		if ("selectedBonusName" in $$props) $$invalidate(2, selectedBonusName = $$props.selectedBonusName);
    		if ("isHuman" in $$props) isHuman = $$props.isHuman;
    		if ("activeProficiencies" in $$props) $$invalidate(3, activeProficiencies = $$props.activeProficiencies);
    		if ("superiorManeuvers" in $$props) $$invalidate(8, superiorManeuvers = $$props.superiorManeuvers);
    		if ("talents" in $$props) $$invalidate(9, talents = $$props.talents);
    		if ("selectedSchool" in $$props) $$invalidate(4, selectedSchool = $$props.selectedSchool);
    		if ("selectedSchoolName" in $$props) $$invalidate(5, selectedSchoolName = $$props.selectedSchoolName);
    		if ("selectedBonus" in $$props) $$invalidate(10, selectedBonus = $$props.selectedBonus);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*race*/ 32768) {
    			isHuman = race.name === "Human";
    		}

    		if ($$self.$$.dirty[0] & /*selectedSchoolName*/ 32) {
    			$$invalidate(4, selectedSchool = getSchoolByName(selectedSchoolName));
    		}

    		if ($$self.$$.dirty[0] & /*selectedBonusName, selectedSchool*/ 20) {
    			$$invalidate(10, selectedBonus = selectedBonusName != ""
    			? getSelectedBonusByName(selectedBonusName)
    			: getFirstOption(selectedSchool));
    		}

    		if ($$self.$$.dirty[0] & /*activeSchools, activeProficiencies, $character*/ 65546) {
    			{
    				let charSchools = activeSchools.filter(school => school.level > 0);

    				charSchools.forEach(school => {
    					school.proficiencies = activeProficiencies;
    				});

    				charSchools.forEach(charSchool => {
    					let found = false;

    					$character.schools.forEach(school => {
    						if (charSchool.name === school.name) {
    							found = true;
    							school.level = charSchool.level;
    						}
    					});

    					if (!found) {
    						$character.schools.push(charSchool);
    					}
    				});
    			}
    		}
    	};

    	$$invalidate(5, selectedSchoolName = "Scrapper");
    	$$invalidate(3, activeProficiencies = []);
    	$$invalidate(2, selectedBonusName = "");
    	$$invalidate(1, activeSchools = populateSchools());
    	$$invalidate(3, activeProficiencies = []);
    	$$invalidate(7, pointsUsed = getPointsUsed());
    	$$invalidate(0, usedPCP = getUsedPCP());
    	$$invalidate(8, superiorManeuvers = 0);
    	$$invalidate(9, talents = getTalents());

    	return [
    		usedPCP,
    		activeSchools,
    		selectedBonusName,
    		activeProficiencies,
    		selectedSchool,
    		selectedSchoolName,
    		schoolList,
    		pointsUsed,
    		superiorManeuvers,
    		talents,
    		selectedBonus,
    		pcpToPoints,
    		addSchool,
    		removeSchool,
    		updateVars,
    		race,
    		$character,
    		select_change_handler,
    		select_change_handler_1,
    		input_change_handler,
    		$$binding_groups,
    		input_change_handler_1
    	];
    }

    class Schools extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { race: 15, usedPCP: 0 }, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Schools",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*race*/ ctx[15] === undefined && !("race" in props)) {
    			console.warn("<Schools> was created without expected prop 'race'");
    		}
    	}

    	get race() {
    		throw new Error("<Schools>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set race(value) {
    		throw new Error("<Schools>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get usedPCP() {
    		throw new Error("<Schools>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set usedPCP(value) {
    		throw new Error("<Schools>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\magic\magic.svelte generated by Svelte v3.37.0 */
    const file$4 = "src\\magic\\magic.svelte";

    function create_fragment$4(ctx) {
    	let h2;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let t5;
    	let p2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Magic";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Pyromancy";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "Sorcery";
    			t5 = space();
    			p2 = element("p");
    			p2.textContent = "Thaumaturgy";
    			add_location(h2, file$4, 3, 0, 70);
    			add_location(p0, file$4, 4, 0, 86);
    			add_location(p1, file$4, 5, 0, 104);
    			add_location(p2, file$4, 6, 0, 120);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p2, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Magic", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Magic> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button, Col, Row });
    	return [];
    }

    class Magic extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Magic",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\arcs.svelte generated by Svelte v3.37.0 */
    const file$3 = "src\\arcs.svelte";

    function create_fragment$3(ctx) {
    	let h2;
    	let t1;
    	let p0;
    	let t2;
    	let textarea0;
    	let t3;
    	let p1;
    	let t4;
    	let textarea1;
    	let t5;
    	let p2;
    	let t6;
    	let textarea2;
    	let t7;
    	let p3;
    	let t8;
    	let textarea3;
    	let t9;
    	let p4;
    	let t10;
    	let textarea4;
    	let textarea4_disabled_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Arcs";
    			t1 = space();
    			p0 = element("p");
    			t2 = text("Saga: ");
    			textarea0 = element("textarea");
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Epic: ");
    			textarea1 = element("textarea");
    			t5 = space();
    			p2 = element("p");
    			t6 = text("Belief:  ");
    			textarea2 = element("textarea");
    			t7 = space();
    			p3 = element("p");
    			t8 = text("Glory:  ");
    			textarea3 = element("textarea");
    			t9 = space();
    			p4 = element("p");
    			t10 = text("Flaw: ");
    			textarea4 = element("textarea");
    			add_location(h2, file$3, 28, 0, 401);
    			add_location(textarea0, file$3, 32, 10, 470);
    			add_location(p0, file$3, 32, 0, 460);
    			add_location(textarea1, file$3, 33, 10, 521);
    			add_location(p1, file$3, 33, 0, 511);
    			add_location(textarea2, file$3, 34, 13, 575);
    			add_location(p2, file$3, 34, 0, 562);
    			add_location(textarea3, file$3, 35, 12, 630);
    			add_location(p3, file$3, 35, 0, 618);
    			textarea4.disabled = textarea4_disabled_value = /*$character*/ ctx[1].race != "Human";
    			add_location(textarea4, file$3, 36, 10, 682);
    			add_location(p4, file$3, 36, 0, 672);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t2);
    			append_dev(p0, textarea0);
    			set_input_value(textarea0, /*arcs*/ ctx[0].saga);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t4);
    			append_dev(p1, textarea1);
    			set_input_value(textarea1, /*arcs*/ ctx[0].epic);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t6);
    			append_dev(p2, textarea2);
    			set_input_value(textarea2, /*arcs*/ ctx[0].belief);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, p3, anchor);
    			append_dev(p3, t8);
    			append_dev(p3, textarea3);
    			set_input_value(textarea3, /*arcs*/ ctx[0].glory);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, p4, anchor);
    			append_dev(p4, t10);
    			append_dev(p4, textarea4);
    			set_input_value(textarea4, /*arcs*/ ctx[0].flaw);

    			if (!mounted) {
    				dispose = [
    					listen_dev(textarea0, "input", /*textarea0_input_handler*/ ctx[2]),
    					listen_dev(textarea1, "input", /*textarea1_input_handler*/ ctx[3]),
    					listen_dev(textarea2, "input", /*textarea2_input_handler*/ ctx[4]),
    					listen_dev(textarea3, "input", /*textarea3_input_handler*/ ctx[5]),
    					listen_dev(textarea4, "input", /*textarea4_input_handler*/ ctx[6])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*arcs*/ 1) {
    				set_input_value(textarea0, /*arcs*/ ctx[0].saga);
    			}

    			if (dirty & /*arcs*/ 1) {
    				set_input_value(textarea1, /*arcs*/ ctx[0].epic);
    			}

    			if (dirty & /*arcs*/ 1) {
    				set_input_value(textarea2, /*arcs*/ ctx[0].belief);
    			}

    			if (dirty & /*arcs*/ 1) {
    				set_input_value(textarea3, /*arcs*/ ctx[0].glory);
    			}

    			if (dirty & /*$character*/ 2 && textarea4_disabled_value !== (textarea4_disabled_value = /*$character*/ ctx[1].race != "Human")) {
    				prop_dev(textarea4, "disabled", textarea4_disabled_value);
    			}

    			if (dirty & /*arcs*/ 1) {
    				set_input_value(textarea4, /*arcs*/ ctx[0].flaw);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(p3);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(p4);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(1, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Arcs", slots, []);

    	let arcs = {
    		saga: "",
    		epic: "",
    		glory: "",
    		belief: "",
    		flaw: ""
    	};

    	$character.race;
    	let human;

    	function isHuman() {
    		if ($character.race === "Human") {
    			return true;
    		} else return false;
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Arcs> was created with unknown prop '${key}'`);
    	});

    	function textarea0_input_handler() {
    		arcs.saga = this.value;
    		$$invalidate(0, arcs);
    	}

    	function textarea1_input_handler() {
    		arcs.epic = this.value;
    		$$invalidate(0, arcs);
    	}

    	function textarea2_input_handler() {
    		arcs.belief = this.value;
    		$$invalidate(0, arcs);
    	}

    	function textarea3_input_handler() {
    		arcs.glory = this.value;
    		$$invalidate(0, arcs);
    	}

    	function textarea4_input_handler() {
    		arcs.flaw = this.value;
    		$$invalidate(0, arcs);
    	}

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		character,
    		arcs,
    		human,
    		isHuman,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("arcs" in $$props) $$invalidate(0, arcs = $$props.arcs);
    		if ("human" in $$props) human = $$props.human;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*arcs*/ 1) {
    			{
    				human = isHuman();
    				set_store_value(character, $character.arcs = arcs, $character);
    			}
    		}
    	};

    	return [
    		arcs,
    		$character,
    		textarea0_input_handler,
    		textarea1_input_handler,
    		textarea2_input_handler,
    		textarea3_input_handler,
    		textarea4_input_handler
    	];
    }

    class Arcs extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Arcs",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\bio.svelte generated by Svelte v3.37.0 */
    const file$2 = "src\\bio.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (24:2) {#each genders as gender}
    function create_each_block(ctx) {
    	let option;
    	let t_value = /*gender*/ ctx[11] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*gender*/ ctx[11];
    			option.value = option.__value;
    			add_location(option, file$2, 24, 4, 566);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(24:2) {#each genders as gender}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let h2;
    	let t1;
    	let p0;
    	let t2;
    	let input0;
    	let t3;
    	let p1;
    	let t4;
    	let input1;
    	let t5;
    	let p2;
    	let t6;
    	let input2;
    	let t7;
    	let p3;
    	let t8;
    	let input3;
    	let t9;
    	let p4;
    	let t10;
    	let select;
    	let t11;
    	let p5;
    	let t12;
    	let input4;
    	let mounted;
    	let dispose;
    	let each_value = /*genders*/ ctx[3];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Bio";
    			t1 = space();
    			p0 = element("p");
    			t2 = text("Name: ");
    			input0 = element("input");
    			t3 = space();
    			p1 = element("p");
    			t4 = text("Title: ");
    			input1 = element("input");
    			t5 = space();
    			p2 = element("p");
    			t6 = text("Nickname: ");
    			input2 = element("input");
    			t7 = space();
    			p3 = element("p");
    			t8 = text("Faction/Association: ");
    			input3 = element("input");
    			t9 = space();
    			p4 = element("p");
    			t10 = text("Gender:\r\n");
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t11 = space();
    			p5 = element("p");
    			t12 = text("Left-handed?: ");
    			input4 = element("input");
    			add_location(h2, file$2, 16, 0, 269);
    			add_location(input0, file$2, 17, 9, 292);
    			add_location(p0, file$2, 17, 0, 283);
    			add_location(input1, file$2, 18, 10, 334);
    			add_location(p1, file$2, 18, 0, 324);
    			add_location(input2, file$2, 19, 13, 384);
    			add_location(p2, file$2, 19, 0, 371);
    			add_location(input3, file$2, 20, 24, 448);
    			add_location(p3, file$2, 20, 0, 424);
    			if (/*bio*/ ctx[0].gender === void 0) add_render_callback(() => /*select_change_handler*/ ctx[8].call(select));
    			add_location(select, file$2, 22, 0, 499);
    			add_location(p4, file$2, 21, 0, 487);
    			attr_dev(input4, "type", "checkbox");
    			add_location(input4, file$2, 28, 17, 653);
    			add_location(p5, file$2, 28, 0, 636);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t2);
    			append_dev(p0, input0);
    			set_input_value(input0, /*name*/ ctx[1]);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t4);
    			append_dev(p1, input1);
    			set_input_value(input1, /*bio*/ ctx[0].title);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, p2, anchor);
    			append_dev(p2, t6);
    			append_dev(p2, input2);
    			set_input_value(input2, /*bio*/ ctx[0].nickname);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, p3, anchor);
    			append_dev(p3, t8);
    			append_dev(p3, input3);
    			set_input_value(input3, /*bio*/ ctx[0].faction);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, p4, anchor);
    			append_dev(p4, t10);
    			append_dev(p4, select);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*bio*/ ctx[0].gender);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, p5, anchor);
    			append_dev(p5, t12);
    			append_dev(p5, input4);
    			set_input_value(input4, /*lefthanded*/ ctx[2]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[6]),
    					listen_dev(input3, "input", /*input3_input_handler*/ ctx[7]),
    					listen_dev(select, "change", /*select_change_handler*/ ctx[8]),
    					listen_dev(input4, "change", /*input4_change_handler*/ ctx[9])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*name*/ 2 && input0.value !== /*name*/ ctx[1]) {
    				set_input_value(input0, /*name*/ ctx[1]);
    			}

    			if (dirty & /*bio, genders*/ 9 && input1.value !== /*bio*/ ctx[0].title) {
    				set_input_value(input1, /*bio*/ ctx[0].title);
    			}

    			if (dirty & /*bio, genders*/ 9 && input2.value !== /*bio*/ ctx[0].nickname) {
    				set_input_value(input2, /*bio*/ ctx[0].nickname);
    			}

    			if (dirty & /*bio, genders*/ 9 && input3.value !== /*bio*/ ctx[0].faction) {
    				set_input_value(input3, /*bio*/ ctx[0].faction);
    			}

    			if (dirty & /*genders*/ 8) {
    				each_value = /*genders*/ ctx[3];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*bio, genders*/ 9) {
    				select_option(select, /*bio*/ ctx[0].gender);
    			}

    			if (dirty & /*lefthanded*/ 4) {
    				set_input_value(input4, /*lefthanded*/ ctx[2]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(p2);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(p3);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(p4);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(p5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(10, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Bio", slots, []);
    	let bio = {};
    	let name = "";
    	let lefthanded = false;
    	let genders = ["Male", "Female"];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Bio> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		name = this.value;
    		$$invalidate(1, name);
    	}

    	function input1_input_handler() {
    		bio.title = this.value;
    		$$invalidate(0, bio);
    		$$invalidate(3, genders);
    	}

    	function input2_input_handler() {
    		bio.nickname = this.value;
    		$$invalidate(0, bio);
    		$$invalidate(3, genders);
    	}

    	function input3_input_handler() {
    		bio.faction = this.value;
    		$$invalidate(0, bio);
    		$$invalidate(3, genders);
    	}

    	function select_change_handler() {
    		bio.gender = select_value(this);
    		$$invalidate(0, bio);
    		$$invalidate(3, genders);
    	}

    	function input4_change_handler() {
    		lefthanded = this.value;
    		$$invalidate(2, lefthanded);
    	}

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		character,
    		bio,
    		name,
    		lefthanded,
    		genders,
    		$character
    	});

    	$$self.$inject_state = $$props => {
    		if ("bio" in $$props) $$invalidate(0, bio = $$props.bio);
    		if ("name" in $$props) $$invalidate(1, name = $$props.name);
    		if ("lefthanded" in $$props) $$invalidate(2, lefthanded = $$props.lefthanded);
    		if ("genders" in $$props) $$invalidate(3, genders = $$props.genders);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*name, bio*/ 3) {
    			{
    				set_store_value(character, $character.name = name, $character);
    				set_store_value(character, $character.bio = bio, $character);
    			}
    		}
    	};

    	return [
    		bio,
    		name,
    		lefthanded,
    		genders,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		select_change_handler,
    		input4_change_handler
    	];
    }

    class Bio extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Bio",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\finalize.svelte generated by Svelte v3.37.0 */
    const file$1 = "src\\finalize.svelte";

    function create_fragment$1(ctx) {
    	let p;
    	let t_value = JSON.stringify(/*$character*/ ctx[0]) + "";
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$1, 5, 0, 114);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$character*/ 1 && t_value !== (t_value = JSON.stringify(/*$character*/ ctx[0]) + "")) set_data_dev(t, t_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $character;
    	validate_store(character, "character");
    	component_subscribe($$self, character, $$value => $$invalidate(0, $character = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Finalize", slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Finalize> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Button, Col, Row, character, $character });
    	return [$character];
    }

    class Finalize extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Finalize",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\app.svelte generated by Svelte v3.37.0 */
    const file = "src\\app.svelte";

    // (67:4) <Col>
    function create_default_slot_20(ctx) {
    	let t0;
    	let t1;
    	let t2;
    	let input;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			t0 = text("PCP (");
    			t1 = text(/*pcpRemaining*/ ctx[11]);
    			t2 = text("\n      remaining)\n      ");
    			input = element("input");
    			attr_dev(input, "type", "number");
    			attr_dev(input, "min", "14");
    			attr_dev(input, "max", "30");
    			add_location(input, file, 69, 6, 1537);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, input, anchor);
    			set_input_value(input, /*pcp*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[12]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pcpRemaining*/ 2048) set_data_dev(t1, /*pcpRemaining*/ ctx[11]);

    			if (dirty & /*pcp*/ 1 && to_number(input.value) !== /*pcp*/ ctx[0]) {
    				set_input_value(input, /*pcp*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(input);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_20.name,
    		type: "slot",
    		source: "(67:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (66:2) <Row>
    function create_default_slot_19(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_20] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, pcp, pcpRemaining*/ 8390657) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_19.name,
    		type: "slot",
    		source: "(66:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (75:4) <Col>
    function create_default_slot_18(ctx) {
    	let races;
    	let updating_usedPCP;
    	let updating_selectedRace;
    	let current;

    	function races_usedPCP_binding(value) {
    		/*races_usedPCP_binding*/ ctx[13](value);
    	}

    	function races_selectedRace_binding(value) {
    		/*races_selectedRace_binding*/ ctx[14](value);
    	}

    	let races_props = { pcpRemaining: /*pcpRemaining*/ ctx[11] };

    	if (/*racePCP*/ ctx[1] !== void 0) {
    		races_props.usedPCP = /*racePCP*/ ctx[1];
    	}

    	if (/*selectedRace*/ ctx[8] !== void 0) {
    		races_props.selectedRace = /*selectedRace*/ ctx[8];
    	}

    	races = new Races({ props: races_props, $$inline: true });
    	binding_callbacks.push(() => bind(races, "usedPCP", races_usedPCP_binding));
    	binding_callbacks.push(() => bind(races, "selectedRace", races_selectedRace_binding));

    	const block = {
    		c: function create() {
    			create_component(races.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(races, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const races_changes = {};
    			if (dirty & /*pcpRemaining*/ 2048) races_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*racePCP*/ 2) {
    				updating_usedPCP = true;
    				races_changes.usedPCP = /*racePCP*/ ctx[1];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			if (!updating_selectedRace && dirty & /*selectedRace*/ 256) {
    				updating_selectedRace = true;
    				races_changes.selectedRace = /*selectedRace*/ ctx[8];
    				add_flush_callback(() => updating_selectedRace = false);
    			}

    			races.$set(races_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(races.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(races.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(races, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_18.name,
    		type: "slot",
    		source: "(75:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (74:2) <Row>
    function create_default_slot_17(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_18] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, racePCP, selectedRace*/ 8390914) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_17.name,
    		type: "slot",
    		source: "(74:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (81:4) <Col>
    function create_default_slot_16(ctx) {
    	let attributes_1;
    	let updating_usedPCP;
    	let updating_attributes;
    	let current;

    	function attributes_1_usedPCP_binding(value) {
    		/*attributes_1_usedPCP_binding*/ ctx[15](value);
    	}

    	function attributes_1_attributes_binding(value) {
    		/*attributes_1_attributes_binding*/ ctx[16](value);
    	}

    	let attributes_1_props = {
    		race: /*selectedRace*/ ctx[8],
    		pcpRemaining: /*pcpRemaining*/ ctx[11]
    	};

    	if (/*attributesPCP*/ ctx[2] !== void 0) {
    		attributes_1_props.usedPCP = /*attributesPCP*/ ctx[2];
    	}

    	if (/*attributes*/ ctx[10] !== void 0) {
    		attributes_1_props.attributes = /*attributes*/ ctx[10];
    	}

    	attributes_1 = new Attributes({
    			props: attributes_1_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(attributes_1, "usedPCP", attributes_1_usedPCP_binding));
    	binding_callbacks.push(() => bind(attributes_1, "attributes", attributes_1_attributes_binding));

    	const block = {
    		c: function create() {
    			create_component(attributes_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(attributes_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const attributes_1_changes = {};
    			if (dirty & /*selectedRace*/ 256) attributes_1_changes.race = /*selectedRace*/ ctx[8];
    			if (dirty & /*pcpRemaining*/ 2048) attributes_1_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*attributesPCP*/ 4) {
    				updating_usedPCP = true;
    				attributes_1_changes.usedPCP = /*attributesPCP*/ ctx[2];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			if (!updating_attributes && dirty & /*attributes*/ 1024) {
    				updating_attributes = true;
    				attributes_1_changes.attributes = /*attributes*/ ctx[10];
    				add_flush_callback(() => updating_attributes = false);
    			}

    			attributes_1.$set(attributes_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(attributes_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(attributes_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(attributes_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_16.name,
    		type: "slot",
    		source: "(81:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (80:2) <Row>
    function create_default_slot_15(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_16] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, selectedRace, pcpRemaining, attributesPCP, attributes*/ 8391940) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_15.name,
    		type: "slot",
    		source: "(80:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (91:4) <Col>
    function create_default_slot_14(ctx) {
    	let boonsandbanes;
    	let updating_usedPCP;
    	let current;

    	function boonsandbanes_usedPCP_binding(value) {
    		/*boonsandbanes_usedPCP_binding*/ ctx[17](value);
    	}

    	let boonsandbanes_props = { pcpRemaining: /*pcpRemaining*/ ctx[11] };

    	if (/*bnbPCP*/ ctx[3] !== void 0) {
    		boonsandbanes_props.usedPCP = /*bnbPCP*/ ctx[3];
    	}

    	boonsandbanes = new Boonsandbanes({
    			props: boonsandbanes_props,
    			$$inline: true
    		});

    	binding_callbacks.push(() => bind(boonsandbanes, "usedPCP", boonsandbanes_usedPCP_binding));

    	const block = {
    		c: function create() {
    			create_component(boonsandbanes.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(boonsandbanes, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const boonsandbanes_changes = {};
    			if (dirty & /*pcpRemaining*/ 2048) boonsandbanes_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*bnbPCP*/ 8) {
    				updating_usedPCP = true;
    				boonsandbanes_changes.usedPCP = /*bnbPCP*/ ctx[3];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			boonsandbanes.$set(boonsandbanes_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(boonsandbanes.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(boonsandbanes.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(boonsandbanes, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_14.name,
    		type: "slot",
    		source: "(91:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (90:2) <Row>
    function create_default_slot_13(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_14] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, bnbPCP*/ 8390664) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_13.name,
    		type: "slot",
    		source: "(90:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (97:4) <Col>
    function create_default_slot_12(ctx) {
    	let skills;
    	let updating_usedPCP;
    	let current;

    	function skills_usedPCP_binding(value) {
    		/*skills_usedPCP_binding*/ ctx[18](value);
    	}

    	let skills_props = {
    		attributes: /*attributes*/ ctx[10],
    		pcpRemaining: /*pcpRemaining*/ ctx[11]
    	};

    	if (/*skillsPCP*/ ctx[4] !== void 0) {
    		skills_props.usedPCP = /*skillsPCP*/ ctx[4];
    	}

    	skills = new Skills({ props: skills_props, $$inline: true });
    	binding_callbacks.push(() => bind(skills, "usedPCP", skills_usedPCP_binding));

    	const block = {
    		c: function create() {
    			create_component(skills.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(skills, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const skills_changes = {};
    			if (dirty & /*attributes*/ 1024) skills_changes.attributes = /*attributes*/ ctx[10];
    			if (dirty & /*pcpRemaining*/ 2048) skills_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*skillsPCP*/ 16) {
    				updating_usedPCP = true;
    				skills_changes.usedPCP = /*skillsPCP*/ ctx[4];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			skills.$set(skills_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(skills.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(skills.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(skills, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_12.name,
    		type: "slot",
    		source: "(97:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (96:2) <Row>
    function create_default_slot_11(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_12] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, attributes, pcpRemaining, skillsPCP*/ 8391696) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(96:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (103:4) <Col>
    function create_default_slot_10(ctx) {
    	let wealth;
    	let updating_usedPCP;
    	let updating_selectedWealth;
    	let current;

    	function wealth_usedPCP_binding(value) {
    		/*wealth_usedPCP_binding*/ ctx[19](value);
    	}

    	function wealth_selectedWealth_binding(value) {
    		/*wealth_selectedWealth_binding*/ ctx[20](value);
    	}

    	let wealth_props = { pcpRemaining: /*pcpRemaining*/ ctx[11] };

    	if (/*wealthPCP*/ ctx[5] !== void 0) {
    		wealth_props.usedPCP = /*wealthPCP*/ ctx[5];
    	}

    	if (/*selectedWealth*/ ctx[9] !== void 0) {
    		wealth_props.selectedWealth = /*selectedWealth*/ ctx[9];
    	}

    	wealth = new Wealth({ props: wealth_props, $$inline: true });
    	binding_callbacks.push(() => bind(wealth, "usedPCP", wealth_usedPCP_binding));
    	binding_callbacks.push(() => bind(wealth, "selectedWealth", wealth_selectedWealth_binding));

    	const block = {
    		c: function create() {
    			create_component(wealth.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(wealth, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const wealth_changes = {};
    			if (dirty & /*pcpRemaining*/ 2048) wealth_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*wealthPCP*/ 32) {
    				updating_usedPCP = true;
    				wealth_changes.usedPCP = /*wealthPCP*/ ctx[5];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			if (!updating_selectedWealth && dirty & /*selectedWealth*/ 512) {
    				updating_selectedWealth = true;
    				wealth_changes.selectedWealth = /*selectedWealth*/ ctx[9];
    				add_flush_callback(() => updating_selectedWealth = false);
    			}

    			wealth.$set(wealth_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(wealth.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(wealth.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(wealth, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(103:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (102:2) <Row>
    function create_default_slot_9(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_10] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, wealthPCP, selectedWealth*/ 8391200) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(102:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (109:4) <Col>
    function create_default_slot_8(ctx) {
    	let schools;
    	let updating_usedPCP;
    	let current;

    	function schools_usedPCP_binding(value) {
    		/*schools_usedPCP_binding*/ ctx[21](value);
    	}

    	let schools_props = {
    		race: /*selectedRace*/ ctx[8],
    		pcpRemaining: /*pcpRemaining*/ ctx[11]
    	};

    	if (/*schoolPCP*/ ctx[6] !== void 0) {
    		schools_props.usedPCP = /*schoolPCP*/ ctx[6];
    	}

    	schools = new Schools({ props: schools_props, $$inline: true });
    	binding_callbacks.push(() => bind(schools, "usedPCP", schools_usedPCP_binding));

    	const block = {
    		c: function create() {
    			create_component(schools.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(schools, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const schools_changes = {};
    			if (dirty & /*selectedRace*/ 256) schools_changes.race = /*selectedRace*/ ctx[8];
    			if (dirty & /*pcpRemaining*/ 2048) schools_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*schoolPCP*/ 64) {
    				updating_usedPCP = true;
    				schools_changes.usedPCP = /*schoolPCP*/ ctx[6];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			schools.$set(schools_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(schools.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(schools.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(schools, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(109:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (108:2) <Row>
    function create_default_slot_7(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, selectedRace, pcpRemaining, schoolPCP*/ 8390976) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(108:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (115:4) <Col>
    function create_default_slot_6(ctx) {
    	let magic;
    	let updating_usedPCP;
    	let current;

    	function magic_usedPCP_binding(value) {
    		/*magic_usedPCP_binding*/ ctx[22](value);
    	}

    	let magic_props = { pcpRemaining: /*pcpRemaining*/ ctx[11] };

    	if (/*magicPCP*/ ctx[7] !== void 0) {
    		magic_props.usedPCP = /*magicPCP*/ ctx[7];
    	}

    	magic = new Magic({ props: magic_props, $$inline: true });
    	binding_callbacks.push(() => bind(magic, "usedPCP", magic_usedPCP_binding));

    	const block = {
    		c: function create() {
    			create_component(magic.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(magic, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const magic_changes = {};
    			if (dirty & /*pcpRemaining*/ 2048) magic_changes.pcpRemaining = /*pcpRemaining*/ ctx[11];

    			if (!updating_usedPCP && dirty & /*magicPCP*/ 128) {
    				updating_usedPCP = true;
    				magic_changes.usedPCP = /*magicPCP*/ ctx[7];
    				add_flush_callback(() => updating_usedPCP = false);
    			}

    			magic.$set(magic_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(magic.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(magic.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(magic, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(115:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (114:2) <Row>
    function create_default_slot_5(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, magicPCP*/ 8390784) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(114:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (121:4) <Col>
    function create_default_slot_4(ctx) {
    	let bio;
    	let current;
    	bio = new Bio({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(bio.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(bio, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(bio.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(bio.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(bio, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(121:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (124:4) <Col>
    function create_default_slot_3(ctx) {
    	let arcs;
    	let current;
    	arcs = new Arcs({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(arcs.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(arcs, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(arcs.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(arcs.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(arcs, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(124:4) <Col>",
    		ctx
    	});

    	return block;
    }

    // (120:2) <Row>
    function create_default_slot_2(ctx) {
    	let col0;
    	let t;
    	let col1;
    	let current;

    	col0 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	col1 = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col0.$$.fragment);
    			t = space();
    			create_component(col1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col0, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(col1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col0_changes = {};

    			if (dirty & /*$$scope*/ 8388608) {
    				col0_changes.$$scope = { dirty, ctx };
    			}

    			col0.$set(col0_changes);
    			const col1_changes = {};

    			if (dirty & /*$$scope*/ 8388608) {
    				col1_changes.$$scope = { dirty, ctx };
    			}

    			col1.$set(col1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col0.$$.fragment, local);
    			transition_in(col1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col0.$$.fragment, local);
    			transition_out(col1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col0, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(col1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(120:2) <Row>",
    		ctx
    	});

    	return block;
    }

    // (140:6) <Col>
    function create_default_slot_1(ctx) {
    	let finalize;
    	let current;
    	finalize = new Finalize({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(finalize.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(finalize, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(finalize.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(finalize.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(finalize, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(140:6) <Col>",
    		ctx
    	});

    	return block;
    }

    // (139:4) <Row>
    function create_default_slot(ctx) {
    	let col;
    	let current;

    	col = new Col({
    			props: {
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(col.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(col, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const col_changes = {};

    			if (dirty & /*$$scope*/ 8388608) {
    				col_changes.$$scope = { dirty, ctx };
    			}

    			col.$set(col_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(col.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(col.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(col, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(139:4) <Row>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let link;
    	let t0;
    	let head;
    	let meta0;
    	let t1;
    	let meta1;
    	let t2;
    	let main;
    	let row0;
    	let t3;
    	let hr0;
    	let t4;
    	let row1;
    	let t5;
    	let hr1;
    	let t6;
    	let row2;
    	let t7;
    	let hr2;
    	let t8;
    	let row3;
    	let t9;
    	let hr3;
    	let t10;
    	let row4;
    	let t11;
    	let hr4;
    	let t12;
    	let row5;
    	let t13;
    	let hr5;
    	let t14;
    	let row6;
    	let t15;
    	let hr6;
    	let t16;
    	let row7;
    	let t17;
    	let hr7;
    	let t18;
    	let row8;
    	let t19;
    	let hr8;
    	let t20;
    	let hr9;
    	let t21;
    	let p0;
    	let t22;
    	let t23;
    	let t24;
    	let t25;
    	let t26;
    	let t27;
    	let p1;
    	let t28;
    	let t29;
    	let t30;
    	let p2;
    	let t31;
    	let t32;
    	let t33;
    	let p3;
    	let t34;
    	let t35;
    	let t36;
    	let p4;
    	let t37;
    	let t38;
    	let t39;
    	let p5;
    	let t40;
    	let t41;
    	let t42;
    	let p6;
    	let t43;
    	let t44;
    	let t45;
    	let p7;
    	let t46;
    	let t47;
    	let t48;
    	let hr10;
    	let t49;
    	let row9;
    	let t50;
    	let hr11;
    	let current;

    	row0 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_19] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row1 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_17] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row2 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_15] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row3 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_13] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row4 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_11] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row5 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row6 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row7 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row8 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	row9 = new Row({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			head = element("head");
    			meta0 = element("meta");
    			t1 = space();
    			meta1 = element("meta");
    			t2 = space();
    			main = element("main");
    			create_component(row0.$$.fragment);
    			t3 = space();
    			hr0 = element("hr");
    			t4 = space();
    			create_component(row1.$$.fragment);
    			t5 = space();
    			hr1 = element("hr");
    			t6 = space();
    			create_component(row2.$$.fragment);
    			t7 = space();
    			hr2 = element("hr");
    			t8 = space();
    			create_component(row3.$$.fragment);
    			t9 = space();
    			hr3 = element("hr");
    			t10 = space();
    			create_component(row4.$$.fragment);
    			t11 = space();
    			hr4 = element("hr");
    			t12 = space();
    			create_component(row5.$$.fragment);
    			t13 = space();
    			hr5 = element("hr");
    			t14 = space();
    			create_component(row6.$$.fragment);
    			t15 = space();
    			hr6 = element("hr");
    			t16 = space();
    			create_component(row7.$$.fragment);
    			t17 = space();
    			hr7 = element("hr");
    			t18 = space();
    			create_component(row8.$$.fragment);
    			t19 = space();
    			hr8 = element("hr");
    			t20 = space();
    			hr9 = element("hr");
    			t21 = space();
    			p0 = element("p");
    			t22 = text("PCP: ");
    			t23 = text(/*pcp*/ ctx[0]);
    			t24 = text(" (");
    			t25 = text(/*pcpRemaining*/ ctx[11]);
    			t26 = text(" remaining)");
    			t27 = space();
    			p1 = element("p");
    			t28 = text("Race: ");
    			t29 = text(/*racePCP*/ ctx[1]);
    			t30 = space();
    			p2 = element("p");
    			t31 = text("Attributes: ");
    			t32 = text(/*attributesPCP*/ ctx[2]);
    			t33 = space();
    			p3 = element("p");
    			t34 = text("Boons and Banes: ");
    			t35 = text(/*bnbPCP*/ ctx[3]);
    			t36 = space();
    			p4 = element("p");
    			t37 = text("Skills: ");
    			t38 = text(/*skillsPCP*/ ctx[4]);
    			t39 = space();
    			p5 = element("p");
    			t40 = text("Wealth and Social Class: ");
    			t41 = text(/*wealthPCP*/ ctx[5]);
    			t42 = space();
    			p6 = element("p");
    			t43 = text("Schools: ");
    			t44 = text(/*schoolPCP*/ ctx[6]);
    			t45 = space();
    			p7 = element("p");
    			t46 = text("Magic: ");
    			t47 = text(/*magicPCP*/ ctx[7]);
    			t48 = space();
    			hr10 = element("hr");
    			t49 = space();
    			create_component(row9.$$.fragment);
    			t50 = space();
    			hr11 = element("hr");
    			attr_dev(link, "rel", "stylesheet");
    			attr_dev(link, "href", "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
    			add_location(link, file, 53, 2, 1192);
    			attr_dev(meta0, "charset", "utf-8");
    			add_location(meta0, file, 59, 2, 1331);
    			attr_dev(meta1, "name", "viewport");
    			attr_dev(meta1, "content", "width=device-width, initial-scale=1, shrink-to-fit=no");
    			add_location(meta1, file, 60, 2, 1358);
    			add_location(head, file, 58, 0, 1322);
    			add_location(hr0, file, 72, 2, 1618);
    			add_location(hr1, file, 78, 2, 1737);
    			add_location(hr2, file, 88, 2, 1930);
    			add_location(hr3, file, 94, 2, 2038);
    			add_location(hr4, file, 100, 2, 2155);
    			add_location(hr5, file, 106, 2, 2279);
    			add_location(hr6, file, 112, 2, 2404);
    			add_location(hr7, file, 118, 2, 2506);
    			add_location(hr8, file, 127, 2, 2603);
    			add_location(hr9, file, 128, 2, 2612);
    			add_location(p0, file, 129, 4, 2623);
    			add_location(p1, file, 130, 4, 2672);
    			add_location(p2, file, 131, 4, 2699);
    			add_location(p3, file, 132, 4, 2738);
    			add_location(p4, file, 133, 4, 2775);
    			add_location(p5, file, 134, 4, 2806);
    			add_location(p6, file, 135, 4, 2854);
    			add_location(p7, file, 136, 4, 2886);
    			add_location(hr10, file, 137, 4, 2915);
    			add_location(hr11, file, 143, 4, 2991);
    			attr_dev(main, "class", "svelte-1e9puaw");
    			add_location(main, file, 64, 0, 1463);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, head, anchor);
    			append_dev(head, meta0);
    			append_dev(head, t1);
    			append_dev(head, meta1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(row0, main, null);
    			append_dev(main, t3);
    			append_dev(main, hr0);
    			append_dev(main, t4);
    			mount_component(row1, main, null);
    			append_dev(main, t5);
    			append_dev(main, hr1);
    			append_dev(main, t6);
    			mount_component(row2, main, null);
    			append_dev(main, t7);
    			append_dev(main, hr2);
    			append_dev(main, t8);
    			mount_component(row3, main, null);
    			append_dev(main, t9);
    			append_dev(main, hr3);
    			append_dev(main, t10);
    			mount_component(row4, main, null);
    			append_dev(main, t11);
    			append_dev(main, hr4);
    			append_dev(main, t12);
    			mount_component(row5, main, null);
    			append_dev(main, t13);
    			append_dev(main, hr5);
    			append_dev(main, t14);
    			mount_component(row6, main, null);
    			append_dev(main, t15);
    			append_dev(main, hr6);
    			append_dev(main, t16);
    			mount_component(row7, main, null);
    			append_dev(main, t17);
    			append_dev(main, hr7);
    			append_dev(main, t18);
    			mount_component(row8, main, null);
    			append_dev(main, t19);
    			append_dev(main, hr8);
    			append_dev(main, t20);
    			append_dev(main, hr9);
    			append_dev(main, t21);
    			append_dev(main, p0);
    			append_dev(p0, t22);
    			append_dev(p0, t23);
    			append_dev(p0, t24);
    			append_dev(p0, t25);
    			append_dev(p0, t26);
    			append_dev(main, t27);
    			append_dev(main, p1);
    			append_dev(p1, t28);
    			append_dev(p1, t29);
    			append_dev(main, t30);
    			append_dev(main, p2);
    			append_dev(p2, t31);
    			append_dev(p2, t32);
    			append_dev(main, t33);
    			append_dev(main, p3);
    			append_dev(p3, t34);
    			append_dev(p3, t35);
    			append_dev(main, t36);
    			append_dev(main, p4);
    			append_dev(p4, t37);
    			append_dev(p4, t38);
    			append_dev(main, t39);
    			append_dev(main, p5);
    			append_dev(p5, t40);
    			append_dev(p5, t41);
    			append_dev(main, t42);
    			append_dev(main, p6);
    			append_dev(p6, t43);
    			append_dev(p6, t44);
    			append_dev(main, t45);
    			append_dev(main, p7);
    			append_dev(p7, t46);
    			append_dev(p7, t47);
    			append_dev(main, t48);
    			append_dev(main, hr10);
    			append_dev(main, t49);
    			mount_component(row9, main, null);
    			append_dev(main, t50);
    			append_dev(main, hr11);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const row0_changes = {};

    			if (dirty & /*$$scope, pcp, pcpRemaining*/ 8390657) {
    				row0_changes.$$scope = { dirty, ctx };
    			}

    			row0.$set(row0_changes);
    			const row1_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, racePCP, selectedRace*/ 8390914) {
    				row1_changes.$$scope = { dirty, ctx };
    			}

    			row1.$set(row1_changes);
    			const row2_changes = {};

    			if (dirty & /*$$scope, selectedRace, pcpRemaining, attributesPCP, attributes*/ 8391940) {
    				row2_changes.$$scope = { dirty, ctx };
    			}

    			row2.$set(row2_changes);
    			const row3_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, bnbPCP*/ 8390664) {
    				row3_changes.$$scope = { dirty, ctx };
    			}

    			row3.$set(row3_changes);
    			const row4_changes = {};

    			if (dirty & /*$$scope, attributes, pcpRemaining, skillsPCP*/ 8391696) {
    				row4_changes.$$scope = { dirty, ctx };
    			}

    			row4.$set(row4_changes);
    			const row5_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, wealthPCP, selectedWealth*/ 8391200) {
    				row5_changes.$$scope = { dirty, ctx };
    			}

    			row5.$set(row5_changes);
    			const row6_changes = {};

    			if (dirty & /*$$scope, selectedRace, pcpRemaining, schoolPCP*/ 8390976) {
    				row6_changes.$$scope = { dirty, ctx };
    			}

    			row6.$set(row6_changes);
    			const row7_changes = {};

    			if (dirty & /*$$scope, pcpRemaining, magicPCP*/ 8390784) {
    				row7_changes.$$scope = { dirty, ctx };
    			}

    			row7.$set(row7_changes);
    			const row8_changes = {};

    			if (dirty & /*$$scope*/ 8388608) {
    				row8_changes.$$scope = { dirty, ctx };
    			}

    			row8.$set(row8_changes);
    			if (!current || dirty & /*pcp*/ 1) set_data_dev(t23, /*pcp*/ ctx[0]);
    			if (!current || dirty & /*pcpRemaining*/ 2048) set_data_dev(t25, /*pcpRemaining*/ ctx[11]);
    			if (!current || dirty & /*racePCP*/ 2) set_data_dev(t29, /*racePCP*/ ctx[1]);
    			if (!current || dirty & /*attributesPCP*/ 4) set_data_dev(t32, /*attributesPCP*/ ctx[2]);
    			if (!current || dirty & /*bnbPCP*/ 8) set_data_dev(t35, /*bnbPCP*/ ctx[3]);
    			if (!current || dirty & /*skillsPCP*/ 16) set_data_dev(t38, /*skillsPCP*/ ctx[4]);
    			if (!current || dirty & /*wealthPCP*/ 32) set_data_dev(t41, /*wealthPCP*/ ctx[5]);
    			if (!current || dirty & /*schoolPCP*/ 64) set_data_dev(t44, /*schoolPCP*/ ctx[6]);
    			if (!current || dirty & /*magicPCP*/ 128) set_data_dev(t47, /*magicPCP*/ ctx[7]);
    			const row9_changes = {};

    			if (dirty & /*$$scope*/ 8388608) {
    				row9_changes.$$scope = { dirty, ctx };
    			}

    			row9.$set(row9_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row0.$$.fragment, local);
    			transition_in(row1.$$.fragment, local);
    			transition_in(row2.$$.fragment, local);
    			transition_in(row3.$$.fragment, local);
    			transition_in(row4.$$.fragment, local);
    			transition_in(row5.$$.fragment, local);
    			transition_in(row6.$$.fragment, local);
    			transition_in(row7.$$.fragment, local);
    			transition_in(row8.$$.fragment, local);
    			transition_in(row9.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row0.$$.fragment, local);
    			transition_out(row1.$$.fragment, local);
    			transition_out(row2.$$.fragment, local);
    			transition_out(row3.$$.fragment, local);
    			transition_out(row4.$$.fragment, local);
    			transition_out(row5.$$.fragment, local);
    			transition_out(row6.$$.fragment, local);
    			transition_out(row7.$$.fragment, local);
    			transition_out(row8.$$.fragment, local);
    			transition_out(row9.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(head);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(main);
    			destroy_component(row0);
    			destroy_component(row1);
    			destroy_component(row2);
    			destroy_component(row3);
    			destroy_component(row4);
    			destroy_component(row5);
    			destroy_component(row6);
    			destroy_component(row7);
    			destroy_component(row8);
    			destroy_component(row9);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let pcpRemaining;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let pcp = 18;
    	let racePCP = 1;
    	let attributesPCP = 1;
    	let bnbPCP = 1;
    	let skillsPCP = 1;
    	let wealthPCP = 1;
    	let schoolPCP = 1;
    	let magicPCP = 0;
    	let selectedRace = {};
    	let selectedWealth = {};
    	let attributes = {};
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		pcp = to_number(this.value);
    		$$invalidate(0, pcp);
    	}

    	function races_usedPCP_binding(value) {
    		racePCP = value;
    		$$invalidate(1, racePCP);
    	}

    	function races_selectedRace_binding(value) {
    		selectedRace = value;
    		$$invalidate(8, selectedRace);
    	}

    	function attributes_1_usedPCP_binding(value) {
    		attributesPCP = value;
    		$$invalidate(2, attributesPCP);
    	}

    	function attributes_1_attributes_binding(value) {
    		attributes = value;
    		$$invalidate(10, attributes);
    	}

    	function boonsandbanes_usedPCP_binding(value) {
    		bnbPCP = value;
    		$$invalidate(3, bnbPCP);
    	}

    	function skills_usedPCP_binding(value) {
    		skillsPCP = value;
    		$$invalidate(4, skillsPCP);
    	}

    	function wealth_usedPCP_binding(value) {
    		wealthPCP = value;
    		$$invalidate(5, wealthPCP);
    	}

    	function wealth_selectedWealth_binding(value) {
    		selectedWealth = value;
    		$$invalidate(9, selectedWealth);
    	}

    	function schools_usedPCP_binding(value) {
    		schoolPCP = value;
    		$$invalidate(6, schoolPCP);
    	}

    	function magic_usedPCP_binding(value) {
    		magicPCP = value;
    		$$invalidate(7, magicPCP);
    	}

    	$$self.$capture_state = () => ({
    		Button,
    		Col,
    		Row,
    		Races,
    		Attributes,
    		BoonsAndBanes: Boonsandbanes,
    		Skills,
    		Wealth,
    		Schools,
    		Magic,
    		Arcs,
    		Bio,
    		Finalize,
    		pcp,
    		racePCP,
    		attributesPCP,
    		bnbPCP,
    		skillsPCP,
    		wealthPCP,
    		schoolPCP,
    		magicPCP,
    		selectedRace,
    		selectedWealth,
    		attributes,
    		pcpRemaining
    	});

    	$$self.$inject_state = $$props => {
    		if ("pcp" in $$props) $$invalidate(0, pcp = $$props.pcp);
    		if ("racePCP" in $$props) $$invalidate(1, racePCP = $$props.racePCP);
    		if ("attributesPCP" in $$props) $$invalidate(2, attributesPCP = $$props.attributesPCP);
    		if ("bnbPCP" in $$props) $$invalidate(3, bnbPCP = $$props.bnbPCP);
    		if ("skillsPCP" in $$props) $$invalidate(4, skillsPCP = $$props.skillsPCP);
    		if ("wealthPCP" in $$props) $$invalidate(5, wealthPCP = $$props.wealthPCP);
    		if ("schoolPCP" in $$props) $$invalidate(6, schoolPCP = $$props.schoolPCP);
    		if ("magicPCP" in $$props) $$invalidate(7, magicPCP = $$props.magicPCP);
    		if ("selectedRace" in $$props) $$invalidate(8, selectedRace = $$props.selectedRace);
    		if ("selectedWealth" in $$props) $$invalidate(9, selectedWealth = $$props.selectedWealth);
    		if ("attributes" in $$props) $$invalidate(10, attributes = $$props.attributes);
    		if ("pcpRemaining" in $$props) $$invalidate(11, pcpRemaining = $$props.pcpRemaining);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*pcp, racePCP, attributesPCP, bnbPCP, skillsPCP, wealthPCP, schoolPCP, magicPCP*/ 255) {
    			$$invalidate(11, pcpRemaining = pcp - (racePCP + attributesPCP + bnbPCP + skillsPCP + wealthPCP + schoolPCP + magicPCP));
    		}
    	};

    	return [
    		pcp,
    		racePCP,
    		attributesPCP,
    		bnbPCP,
    		skillsPCP,
    		wealthPCP,
    		schoolPCP,
    		magicPCP,
    		selectedRace,
    		selectedWealth,
    		attributes,
    		pcpRemaining,
    		input_input_handler,
    		races_usedPCP_binding,
    		races_selectedRace_binding,
    		attributes_1_usedPCP_binding,
    		attributes_1_attributes_binding,
    		boonsandbanes_usedPCP_binding,
    		skills_usedPCP_binding,
    		wealth_usedPCP_binding,
    		wealth_selectedWealth_binding,
    		schools_usedPCP_binding,
    		magic_usedPCP_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
