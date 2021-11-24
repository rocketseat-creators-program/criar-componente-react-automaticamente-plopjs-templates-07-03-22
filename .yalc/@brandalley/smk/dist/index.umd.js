(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('mobx-state-tree')) :
	typeof define === 'function' && define.amd ? define(['exports', 'mobx-state-tree'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.index = {}, global.mobxStateTree));
})(this, (function (exports, mobxStateTree) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0

	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.

	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    // Metadata Proposal
	    // https://rbuckton.github.io/reflect-metadata/
	    (function (factory) {
	        var root = typeof commonjsGlobal === "object" ? commonjsGlobal :
	            typeof self === "object" ? self :
	                typeof this === "object" ? this :
	                    Function("return this;")();
	        var exporter = makeExporter(Reflect);
	        if (typeof root.Reflect === "undefined") {
	            root.Reflect = Reflect;
	        }
	        else {
	            exporter = makeExporter(root.Reflect, exporter);
	        }
	        factory(exporter);
	        function makeExporter(target, previous) {
	            return function (key, value) {
	                if (typeof target[key] !== "function") {
	                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
	                }
	                if (previous)
	                    previous(key, value);
	            };
	        }
	    })(function (exporter) {
	        var hasOwn = Object.prototype.hasOwnProperty;
	        // feature test for Symbol support
	        var supportsSymbol = typeof Symbol === "function";
	        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
	        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
	        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
	        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
	        var downLevel = !supportsCreate && !supportsProto;
	        var HashMap = {
	            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	            create: supportsCreate
	                ? function () { return MakeDictionary(Object.create(null)); }
	                : supportsProto
	                    ? function () { return MakeDictionary({ __proto__: null }); }
	                    : function () { return MakeDictionary({}); },
	            has: downLevel
	                ? function (map, key) { return hasOwn.call(map, key); }
	                : function (map, key) { return key in map; },
	            get: downLevel
	                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	                : function (map, key) { return map[key]; },
	        };
	        // Load global or shim versions of Map, Set, and WeakMap
	        var functionPrototype = Object.getPrototypeOf(Function);
	        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
	        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
	        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
	        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	        // [[Metadata]] internal slot
	        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
	        var Metadata = new _WeakMap();
	        /**
	         * Applies a set of decorators to a property of a target object.
	         * @param decorators An array of decorators.
	         * @param target The target object.
	         * @param propertyKey (Optional) The property key to decorate.
	         * @param attributes (Optional) The property descriptor for the target key.
	         * @remarks Decorators are applied in reverse order.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     Example = Reflect.decorate(decoratorsArray, Example);
	         *
	         *     // property (on constructor)
	         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     Object.defineProperty(Example, "staticMethod",
	         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	         *
	         *     // method (on prototype)
	         *     Object.defineProperty(Example.prototype, "method",
	         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	         *
	         */
	        function decorate(decorators, target, propertyKey, attributes) {
	            if (!IsUndefined(propertyKey)) {
	                if (!IsArray(decorators))
	                    throw new TypeError();
	                if (!IsObject(target))
	                    throw new TypeError();
	                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
	                    throw new TypeError();
	                if (IsNull(attributes))
	                    attributes = undefined;
	                propertyKey = ToPropertyKey(propertyKey);
	                return DecorateProperty(decorators, target, propertyKey, attributes);
	            }
	            else {
	                if (!IsArray(decorators))
	                    throw new TypeError();
	                if (!IsConstructor(target))
	                    throw new TypeError();
	                return DecorateConstructor(decorators, target);
	            }
	        }
	        exporter("decorate", decorate);
	        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
	        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
	        /**
	         * A default metadata decorator factory that can be used on a class, class member, or parameter.
	         * @param metadataKey The key for the metadata entry.
	         * @param metadataValue The value for the metadata entry.
	         * @returns A decorator function.
	         * @remarks
	         * If `metadataKey` is already defined for the target and target key, the
	         * metadataValue for that key will be overwritten.
	         * @example
	         *
	         *     // constructor
	         *     @Reflect.metadata(key, value)
	         *     class Example {
	         *     }
	         *
	         *     // property (on constructor, TypeScript only)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         static staticProperty;
	         *     }
	         *
	         *     // property (on prototype, TypeScript only)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         property;
	         *     }
	         *
	         *     // method (on constructor)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         static staticMethod() { }
	         *     }
	         *
	         *     // method (on prototype)
	         *     class Example {
	         *         @Reflect.metadata(key, value)
	         *         method() { }
	         *     }
	         *
	         */
	        function metadata(metadataKey, metadataValue) {
	            function decorator(target, propertyKey) {
	                if (!IsObject(target))
	                    throw new TypeError();
	                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
	                    throw new TypeError();
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	            }
	            return decorator;
	        }
	        exporter("metadata", metadata);
	        /**
	         * Define a unique metadata entry on the target.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param metadataValue A value that contains attached metadata.
	         * @param target The target object on which to define metadata.
	         * @param propertyKey (Optional) The property key for the target.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     Reflect.defineMetadata("custom:annotation", options, Example);
	         *
	         *     // property (on constructor)
	         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	         *
	         *     // decorator factory as metadata-producing annotation.
	         *     function MyAnnotation(options): Decorator {
	         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	         *     }
	         *
	         */
	        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
	        }
	        exporter("defineMetadata", defineMetadata);
	        /**
	         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.hasMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function hasMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("hasMetadata", hasMetadata);
	        /**
	         * Gets a value indicating whether the target object has the provided metadata key defined.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function hasOwnMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("hasOwnMetadata", hasOwnMetadata);
	        /**
	         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function getMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("getMetadata", getMetadata);
	        /**
	         * Gets the metadata value for the provided metadata key on the target object.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function getOwnMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
	        }
	        exporter("getOwnMetadata", getOwnMetadata);
	        /**
	         * Gets the metadata keys defined on the target object or its prototype chain.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns An array of unique metadata keys.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getMetadataKeys(Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	         *
	         */
	        function getMetadataKeys(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryMetadataKeys(target, propertyKey);
	        }
	        exporter("getMetadataKeys", getMetadataKeys);
	        /**
	         * Gets the unique metadata keys defined on the target object.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns An array of unique metadata keys.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.getOwnMetadataKeys(Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	         *
	         */
	        function getOwnMetadataKeys(target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            return OrdinaryOwnMetadataKeys(target, propertyKey);
	        }
	        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
	        /**
	         * Deletes the metadata entry from the target object with the provided key.
	         * @param metadataKey A key used to store and retrieve metadata.
	         * @param target The target object on which the metadata is defined.
	         * @param propertyKey (Optional) The property key for the target.
	         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	         * @example
	         *
	         *     class Example {
	         *         // property declarations are not part of ES6, though they are valid in TypeScript:
	         *         // static staticProperty;
	         *         // property;
	         *
	         *         constructor(p) { }
	         *         static staticMethod(p) { }
	         *         method(p) { }
	         *     }
	         *
	         *     // constructor
	         *     result = Reflect.deleteMetadata("custom:annotation", Example);
	         *
	         *     // property (on constructor)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	         *
	         *     // property (on prototype)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	         *
	         *     // method (on constructor)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	         *
	         *     // method (on prototype)
	         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	         *
	         */
	        function deleteMetadata(metadataKey, target, propertyKey) {
	            if (!IsObject(target))
	                throw new TypeError();
	            if (!IsUndefined(propertyKey))
	                propertyKey = ToPropertyKey(propertyKey);
	            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return false;
	            if (!metadataMap.delete(metadataKey))
	                return false;
	            if (metadataMap.size > 0)
	                return true;
	            var targetMetadata = Metadata.get(target);
	            targetMetadata.delete(propertyKey);
	            if (targetMetadata.size > 0)
	                return true;
	            Metadata.delete(target);
	            return true;
	        }
	        exporter("deleteMetadata", deleteMetadata);
	        function DecorateConstructor(decorators, target) {
	            for (var i = decorators.length - 1; i >= 0; --i) {
	                var decorator = decorators[i];
	                var decorated = decorator(target);
	                if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                    if (!IsConstructor(decorated))
	                        throw new TypeError();
	                    target = decorated;
	                }
	            }
	            return target;
	        }
	        function DecorateProperty(decorators, target, propertyKey, descriptor) {
	            for (var i = decorators.length - 1; i >= 0; --i) {
	                var decorator = decorators[i];
	                var decorated = decorator(target, propertyKey, descriptor);
	                if (!IsUndefined(decorated) && !IsNull(decorated)) {
	                    if (!IsObject(decorated))
	                        throw new TypeError();
	                    descriptor = decorated;
	                }
	            }
	            return descriptor;
	        }
	        function GetOrCreateMetadataMap(O, P, Create) {
	            var targetMetadata = Metadata.get(O);
	            if (IsUndefined(targetMetadata)) {
	                if (!Create)
	                    return undefined;
	                targetMetadata = new _Map();
	                Metadata.set(O, targetMetadata);
	            }
	            var metadataMap = targetMetadata.get(P);
	            if (IsUndefined(metadataMap)) {
	                if (!Create)
	                    return undefined;
	                metadataMap = new _Map();
	                targetMetadata.set(P, metadataMap);
	            }
	            return metadataMap;
	        }
	        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
	        function OrdinaryHasMetadata(MetadataKey, O, P) {
	            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	            if (hasOwn)
	                return true;
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (!IsNull(parent))
	                return OrdinaryHasMetadata(MetadataKey, parent, P);
	            return false;
	        }
	        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
	        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return false;
	            return ToBoolean(metadataMap.has(MetadataKey));
	        }
	        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
	        function OrdinaryGetMetadata(MetadataKey, O, P) {
	            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	            if (hasOwn)
	                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (!IsNull(parent))
	                return OrdinaryGetMetadata(MetadataKey, parent, P);
	            return undefined;
	        }
	        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
	        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return undefined;
	            return metadataMap.get(MetadataKey);
	        }
	        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
	        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
	            metadataMap.set(MetadataKey, MetadataValue);
	        }
	        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
	        function OrdinaryMetadataKeys(O, P) {
	            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	            var parent = OrdinaryGetPrototypeOf(O);
	            if (parent === null)
	                return ownKeys;
	            var parentKeys = OrdinaryMetadataKeys(parent, P);
	            if (parentKeys.length <= 0)
	                return ownKeys;
	            if (ownKeys.length <= 0)
	                return parentKeys;
	            var set = new _Set();
	            var keys = [];
	            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
	                var key = ownKeys_1[_i];
	                var hasKey = set.has(key);
	                if (!hasKey) {
	                    set.add(key);
	                    keys.push(key);
	                }
	            }
	            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
	                var key = parentKeys_1[_a];
	                var hasKey = set.has(key);
	                if (!hasKey) {
	                    set.add(key);
	                    keys.push(key);
	                }
	            }
	            return keys;
	        }
	        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
	        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
	        function OrdinaryOwnMetadataKeys(O, P) {
	            var keys = [];
	            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
	            if (IsUndefined(metadataMap))
	                return keys;
	            var keysObj = metadataMap.keys();
	            var iterator = GetIterator(keysObj);
	            var k = 0;
	            while (true) {
	                var next = IteratorStep(iterator);
	                if (!next) {
	                    keys.length = k;
	                    return keys;
	                }
	                var nextValue = IteratorValue(next);
	                try {
	                    keys[k] = nextValue;
	                }
	                catch (e) {
	                    try {
	                        IteratorClose(iterator);
	                    }
	                    finally {
	                        throw e;
	                    }
	                }
	                k++;
	            }
	        }
	        // 6 ECMAScript Data Typ0es and Values
	        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
	        function Type(x) {
	            if (x === null)
	                return 1 /* Null */;
	            switch (typeof x) {
	                case "undefined": return 0 /* Undefined */;
	                case "boolean": return 2 /* Boolean */;
	                case "string": return 3 /* String */;
	                case "symbol": return 4 /* Symbol */;
	                case "number": return 5 /* Number */;
	                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
	                default: return 6 /* Object */;
	            }
	        }
	        // 6.1.1 The Undefined Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
	        function IsUndefined(x) {
	            return x === undefined;
	        }
	        // 6.1.2 The Null Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
	        function IsNull(x) {
	            return x === null;
	        }
	        // 6.1.5 The Symbol Type
	        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
	        function IsSymbol(x) {
	            return typeof x === "symbol";
	        }
	        // 6.1.7 The Object Type
	        // https://tc39.github.io/ecma262/#sec-object-type
	        function IsObject(x) {
	            return typeof x === "object" ? x !== null : typeof x === "function";
	        }
	        // 7.1 Type Conversion
	        // https://tc39.github.io/ecma262/#sec-type-conversion
	        // 7.1.1 ToPrimitive(input [, PreferredType])
	        // https://tc39.github.io/ecma262/#sec-toprimitive
	        function ToPrimitive(input, PreferredType) {
	            switch (Type(input)) {
	                case 0 /* Undefined */: return input;
	                case 1 /* Null */: return input;
	                case 2 /* Boolean */: return input;
	                case 3 /* String */: return input;
	                case 4 /* Symbol */: return input;
	                case 5 /* Number */: return input;
	            }
	            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
	            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
	            if (exoticToPrim !== undefined) {
	                var result = exoticToPrim.call(input, hint);
	                if (IsObject(result))
	                    throw new TypeError();
	                return result;
	            }
	            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
	        }
	        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
	        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
	        function OrdinaryToPrimitive(O, hint) {
	            if (hint === "string") {
	                var toString_1 = O.toString;
	                if (IsCallable(toString_1)) {
	                    var result = toString_1.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	                var valueOf = O.valueOf;
	                if (IsCallable(valueOf)) {
	                    var result = valueOf.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	            }
	            else {
	                var valueOf = O.valueOf;
	                if (IsCallable(valueOf)) {
	                    var result = valueOf.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	                var toString_2 = O.toString;
	                if (IsCallable(toString_2)) {
	                    var result = toString_2.call(O);
	                    if (!IsObject(result))
	                        return result;
	                }
	            }
	            throw new TypeError();
	        }
	        // 7.1.2 ToBoolean(argument)
	        // https://tc39.github.io/ecma262/2016/#sec-toboolean
	        function ToBoolean(argument) {
	            return !!argument;
	        }
	        // 7.1.12 ToString(argument)
	        // https://tc39.github.io/ecma262/#sec-tostring
	        function ToString(argument) {
	            return "" + argument;
	        }
	        // 7.1.14 ToPropertyKey(argument)
	        // https://tc39.github.io/ecma262/#sec-topropertykey
	        function ToPropertyKey(argument) {
	            var key = ToPrimitive(argument, 3 /* String */);
	            if (IsSymbol(key))
	                return key;
	            return ToString(key);
	        }
	        // 7.2 Testing and Comparison Operations
	        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
	        // 7.2.2 IsArray(argument)
	        // https://tc39.github.io/ecma262/#sec-isarray
	        function IsArray(argument) {
	            return Array.isArray
	                ? Array.isArray(argument)
	                : argument instanceof Object
	                    ? argument instanceof Array
	                    : Object.prototype.toString.call(argument) === "[object Array]";
	        }
	        // 7.2.3 IsCallable(argument)
	        // https://tc39.github.io/ecma262/#sec-iscallable
	        function IsCallable(argument) {
	            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
	            return typeof argument === "function";
	        }
	        // 7.2.4 IsConstructor(argument)
	        // https://tc39.github.io/ecma262/#sec-isconstructor
	        function IsConstructor(argument) {
	            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
	            return typeof argument === "function";
	        }
	        // 7.2.7 IsPropertyKey(argument)
	        // https://tc39.github.io/ecma262/#sec-ispropertykey
	        function IsPropertyKey(argument) {
	            switch (Type(argument)) {
	                case 3 /* String */: return true;
	                case 4 /* Symbol */: return true;
	                default: return false;
	            }
	        }
	        // 7.3 Operations on Objects
	        // https://tc39.github.io/ecma262/#sec-operations-on-objects
	        // 7.3.9 GetMethod(V, P)
	        // https://tc39.github.io/ecma262/#sec-getmethod
	        function GetMethod(V, P) {
	            var func = V[P];
	            if (func === undefined || func === null)
	                return undefined;
	            if (!IsCallable(func))
	                throw new TypeError();
	            return func;
	        }
	        // 7.4 Operations on Iterator Objects
	        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
	        function GetIterator(obj) {
	            var method = GetMethod(obj, iteratorSymbol);
	            if (!IsCallable(method))
	                throw new TypeError(); // from Call
	            var iterator = method.call(obj);
	            if (!IsObject(iterator))
	                throw new TypeError();
	            return iterator;
	        }
	        // 7.4.4 IteratorValue(iterResult)
	        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
	        function IteratorValue(iterResult) {
	            return iterResult.value;
	        }
	        // 7.4.5 IteratorStep(iterator)
	        // https://tc39.github.io/ecma262/#sec-iteratorstep
	        function IteratorStep(iterator) {
	            var result = iterator.next();
	            return result.done ? false : result;
	        }
	        // 7.4.6 IteratorClose(iterator, completion)
	        // https://tc39.github.io/ecma262/#sec-iteratorclose
	        function IteratorClose(iterator) {
	            var f = iterator["return"];
	            if (f)
	                f.call(iterator);
	        }
	        // 9.1 Ordinary Object Internal Methods and Internal Slots
	        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
	        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
	        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
	        function OrdinaryGetPrototypeOf(O) {
	            var proto = Object.getPrototypeOf(O);
	            if (typeof O !== "function" || O === functionPrototype)
	                return proto;
	            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	            // Try to determine the superclass constructor. Compatible implementations
	            // must either set __proto__ on a subclass constructor to the superclass constructor,
	            // or ensure each class has a valid `constructor` property on its prototype that
	            // points back to the constructor.
	            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	            // This is the case when in ES6 or when using __proto__ in a compatible browser.
	            if (proto !== functionPrototype)
	                return proto;
	            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	            var prototype = O.prototype;
	            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	            if (prototypeProto == null || prototypeProto === Object.prototype)
	                return proto;
	            // If the constructor was not a function, then we cannot determine the heritage.
	            var constructor = prototypeProto.constructor;
	            if (typeof constructor !== "function")
	                return proto;
	            // If we have some kind of self-reference, then we cannot determine the heritage.
	            if (constructor === O)
	                return proto;
	            // we have a pretty good guess at the heritage.
	            return constructor;
	        }
	        // naive Map shim
	        function CreateMapPolyfill() {
	            var cacheSentinel = {};
	            var arraySentinel = [];
	            var MapIterator = /** @class */ (function () {
	                function MapIterator(keys, values, selector) {
	                    this._index = 0;
	                    this._keys = keys;
	                    this._values = values;
	                    this._selector = selector;
	                }
	                MapIterator.prototype["@@iterator"] = function () { return this; };
	                MapIterator.prototype[iteratorSymbol] = function () { return this; };
	                MapIterator.prototype.next = function () {
	                    var index = this._index;
	                    if (index >= 0 && index < this._keys.length) {
	                        var result = this._selector(this._keys[index], this._values[index]);
	                        if (index + 1 >= this._keys.length) {
	                            this._index = -1;
	                            this._keys = arraySentinel;
	                            this._values = arraySentinel;
	                        }
	                        else {
	                            this._index++;
	                        }
	                        return { value: result, done: false };
	                    }
	                    return { value: undefined, done: true };
	                };
	                MapIterator.prototype.throw = function (error) {
	                    if (this._index >= 0) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    throw error;
	                };
	                MapIterator.prototype.return = function (value) {
	                    if (this._index >= 0) {
	                        this._index = -1;
	                        this._keys = arraySentinel;
	                        this._values = arraySentinel;
	                    }
	                    return { value: value, done: true };
	                };
	                return MapIterator;
	            }());
	            return /** @class */ (function () {
	                function Map() {
	                    this._keys = [];
	                    this._values = [];
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                }
	                Object.defineProperty(Map.prototype, "size", {
	                    get: function () { return this._keys.length; },
	                    enumerable: true,
	                    configurable: true
	                });
	                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	                Map.prototype.get = function (key) {
	                    var index = this._find(key, /*insert*/ false);
	                    return index >= 0 ? this._values[index] : undefined;
	                };
	                Map.prototype.set = function (key, value) {
	                    var index = this._find(key, /*insert*/ true);
	                    this._values[index] = value;
	                    return this;
	                };
	                Map.prototype.delete = function (key) {
	                    var index = this._find(key, /*insert*/ false);
	                    if (index >= 0) {
	                        var size = this._keys.length;
	                        for (var i = index + 1; i < size; i++) {
	                            this._keys[i - 1] = this._keys[i];
	                            this._values[i - 1] = this._values[i];
	                        }
	                        this._keys.length--;
	                        this._values.length--;
	                        if (key === this._cacheKey) {
	                            this._cacheKey = cacheSentinel;
	                            this._cacheIndex = -2;
	                        }
	                        return true;
	                    }
	                    return false;
	                };
	                Map.prototype.clear = function () {
	                    this._keys.length = 0;
	                    this._values.length = 0;
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                };
	                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
	                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
	                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
	                Map.prototype["@@iterator"] = function () { return this.entries(); };
	                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
	                Map.prototype._find = function (key, insert) {
	                    if (this._cacheKey !== key) {
	                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
	                    }
	                    if (this._cacheIndex < 0 && insert) {
	                        this._cacheIndex = this._keys.length;
	                        this._keys.push(key);
	                        this._values.push(undefined);
	                    }
	                    return this._cacheIndex;
	                };
	                return Map;
	            }());
	            function getKey(key, _) {
	                return key;
	            }
	            function getValue(_, value) {
	                return value;
	            }
	            function getEntry(key, value) {
	                return [key, value];
	            }
	        }
	        // naive Set shim
	        function CreateSetPolyfill() {
	            return /** @class */ (function () {
	                function Set() {
	                    this._map = new _Map();
	                }
	                Object.defineProperty(Set.prototype, "size", {
	                    get: function () { return this._map.size; },
	                    enumerable: true,
	                    configurable: true
	                });
	                Set.prototype.has = function (value) { return this._map.has(value); };
	                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	                Set.prototype.delete = function (value) { return this._map.delete(value); };
	                Set.prototype.clear = function () { this._map.clear(); };
	                Set.prototype.keys = function () { return this._map.keys(); };
	                Set.prototype.values = function () { return this._map.values(); };
	                Set.prototype.entries = function () { return this._map.entries(); };
	                Set.prototype["@@iterator"] = function () { return this.keys(); };
	                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
	                return Set;
	            }());
	        }
	        // naive WeakMap shim
	        function CreateWeakMapPolyfill() {
	            var UUID_SIZE = 16;
	            var keys = HashMap.create();
	            var rootKey = CreateUniqueKey();
	            return /** @class */ (function () {
	                function WeakMap() {
	                    this._key = CreateUniqueKey();
	                }
	                WeakMap.prototype.has = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? HashMap.has(table, this._key) : false;
	                };
	                WeakMap.prototype.get = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
	                };
	                WeakMap.prototype.set = function (target, value) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                    table[this._key] = value;
	                    return this;
	                };
	                WeakMap.prototype.delete = function (target) {
	                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                    return table !== undefined ? delete table[this._key] : false;
	                };
	                WeakMap.prototype.clear = function () {
	                    // NOTE: not a real clear, just makes the previous data unreachable
	                    this._key = CreateUniqueKey();
	                };
	                return WeakMap;
	            }());
	            function CreateUniqueKey() {
	                var key;
	                do
	                    key = "@@WeakMap@@" + CreateUUID();
	                while (HashMap.has(keys, key));
	                keys[key] = true;
	                return key;
	            }
	            function GetOrCreateWeakMapTable(target, create) {
	                if (!hasOwn.call(target, rootKey)) {
	                    if (!create)
	                        return undefined;
	                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
	                }
	                return target[rootKey];
	            }
	            function FillRandomBytes(buffer, size) {
	                for (var i = 0; i < size; ++i)
	                    buffer[i] = Math.random() * 0xff | 0;
	                return buffer;
	            }
	            function GenRandomBytes(size) {
	                if (typeof Uint8Array === "function") {
	                    if (typeof crypto !== "undefined")
	                        return crypto.getRandomValues(new Uint8Array(size));
	                    if (typeof msCrypto !== "undefined")
	                        return msCrypto.getRandomValues(new Uint8Array(size));
	                    return FillRandomBytes(new Uint8Array(size), size);
	                }
	                return FillRandomBytes(new Array(size), size);
	            }
	            function CreateUUID() {
	                var data = GenRandomBytes(UUID_SIZE);
	                // mark as random - RFC 4122 § 4.4
	                data[6] = data[6] & 0x4f | 0x40;
	                data[8] = data[8] & 0xbf | 0x80;
	                var result = "";
	                for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                    var byte = data[offset];
	                    if (offset === 4 || offset === 6 || offset === 8)
	                        result += "-";
	                    if (byte < 16)
	                        result += "0";
	                    result += byte.toString(16).toLowerCase();
	                }
	                return result;
	            }
	        }
	        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	        function MakeDictionary(obj) {
	            obj.__ = undefined;
	            delete obj.__;
	            return obj;
	        }
	    });
	})(Reflect || (Reflect = {}));

	const life = 42;

	exports.AvailableLanguages = void 0;
	(function (AvailableLanguages) {
	    AvailableLanguages["en"] = "en";
	    AvailableLanguages["fr"] = "fr";
	})(exports.AvailableLanguages || (exports.AvailableLanguages = {}));

	var i18n = createCommonjsModule(function (module) {
	(function (root, factory) {
	  if (module.exports) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory(root);
	  } else {
	    // Browser globals (root is window)
	    root.I18n = factory(root);
	  }
	}(commonjsGlobal, function(global) {

	  // Use previously defined object if exists in current scope
	  var I18n = global && global.I18n || {};

	  // Just cache the Array#slice function.
	  var slice = Array.prototype.slice;

	  // Apply number padding.
	  var padding = function(number) {
	    return ("0" + number.toString()).substr(-2);
	  };

	  // Improved toFixed number rounding function with support for unprecise floating points
	  // JavaScript's standard toFixed function does not round certain numbers correctly (for example 0.105 with precision 2).
	  var toFixed = function(number, precision) {
	    return decimalAdjust('round', number, -precision).toFixed(precision);
	  };

	  // Is a given variable an object?
	  // Borrowed from Underscore.js
	  var isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object'
	  };

	  var isFunction = function(func) {
	    var type = typeof func;
	    return type === 'function'
	  };

	  // Check if value is different than undefined and null;
	  var isSet = function(value) {
	    return typeof(value) !== 'undefined' && value !== null;
	  };

	  // Is a given value an array?
	  // Borrowed from Underscore.js
	  var isArray = function(val) {
	    if (Array.isArray) {
	      return Array.isArray(val);
	    }
	    return Object.prototype.toString.call(val) === '[object Array]';
	  };

	  var isString = function(val) {
	    return typeof val === 'string' || Object.prototype.toString.call(val) === '[object String]';
	  };

	  var isNumber = function(val) {
	    return typeof val === 'number' || Object.prototype.toString.call(val) === '[object Number]';
	  };

	  var isBoolean = function(val) {
	    return val === true || val === false;
	  };

	  var isNull = function(val) {
	    return val === null;
	  };

	  var decimalAdjust = function(type, value, exp) {
	    // If the exp is undefined or zero...
	    if (typeof exp === 'undefined' || +exp === 0) {
	      return Math[type](value);
	    }
	    value = +value;
	    exp = +exp;
	    // If the value is not a number or the exp is not an integer...
	    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
	      return NaN;
	    }
	    // Shift
	    value = value.toString().split('e');
	    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
	    // Shift back
	    value = value.toString().split('e');
	    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
	  };

	  var lazyEvaluate = function(message, scope) {
	    if (isFunction(message)) {
	      return message(scope);
	    } else {
	      return message;
	    }
	  };

	  var merge = function (dest, obj) {
	    var key, value;
	    for (key in obj) if (obj.hasOwnProperty(key)) {
	      value = obj[key];
	      if (isString(value) || isNumber(value) || isBoolean(value) || isArray(value) || isNull(value)) {
	        dest[key] = value;
	      } else {
	        if (dest[key] == null) dest[key] = {};
	        merge(dest[key], value);
	      }
	    }
	    return dest;
	  };

	  // Set default days/months translations.
	  var DATE = {
	      day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	    , abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	    , month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
	    , abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	    , meridian: ["AM", "PM"]
	  };

	  // Set default number format.
	  var NUMBER_FORMAT = {
	      precision: 3
	    , separator: "."
	    , delimiter: ","
	    , strip_insignificant_zeros: false
	  };

	  // Set default currency format.
	  var CURRENCY_FORMAT = {
	      unit: "$"
	    , precision: 2
	    , format: "%u%n"
	    , sign_first: true
	    , delimiter: ","
	    , separator: "."
	  };

	  // Set default percentage format.
	  var PERCENTAGE_FORMAT = {
	      unit: "%"
	    , precision: 3
	    , format: "%n%u"
	    , separator: "."
	    , delimiter: ""
	  };

	  // Set default size units.
	  var SIZE_UNITS = [null, "kb", "mb", "gb", "tb"];

	  // Other default options
	  var DEFAULT_OPTIONS = {
	    // Set default locale. This locale will be used when fallback is enabled and
	    // the translation doesn't exist in a particular locale.
	      defaultLocale: "en"
	    // Set the current locale to `en`.
	    , locale: "en"
	    // Set the translation key separator.
	    , defaultSeparator: "."
	    // Set the placeholder format. Accepts `{{placeholder}}` and `%{placeholder}`.
	    , placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm
	    // Set if engine should fallback to the default locale when a translation
	    // is missing.
	    , fallbacks: false
	    // Set the default translation object.
	    , translations: {}
	    // Set missing translation behavior. 'message' will display a message
	    // that the translation is missing, 'guess' will try to guess the string
	    , missingBehaviour: 'message'
	    // if you use missingBehaviour with 'message', but want to know that the
	    // string is actually missing for testing purposes, you can prefix the
	    // guessed string by setting the value here. By default, no prefix!
	    , missingTranslationPrefix: ''
	  };

	  // Set default locale. This locale will be used when fallback is enabled and
	  // the translation doesn't exist in a particular locale.
	  I18n.reset = function() {
	    var key;
	    for (key in DEFAULT_OPTIONS) {
	      this[key] = DEFAULT_OPTIONS[key];
	    }
	  };

	  // Much like `reset`, but only assign options if not already assigned
	  I18n.initializeOptions = function() {
	    var key;
	    for (key in DEFAULT_OPTIONS) if (!isSet(this[key])) {
	      this[key] = DEFAULT_OPTIONS[key];
	    }
	  };
	  I18n.initializeOptions();

	  // Return a list of all locales that must be tried before returning the
	  // missing translation message. By default, this will consider the inline option,
	  // current locale and fallback locale.
	  //
	  //     I18n.locales.get("de-DE");
	  //     // ["de-DE", "de", "en"]
	  //
	  // You can define custom rules for any locale. Just make sure you return a array
	  // containing all locales.
	  //
	  //     // Default the Wookie locale to English.
	  //     I18n.locales["wk"] = function(locale) {
	  //       return ["en"];
	  //     };
	  //
	  I18n.locales = {};

	  // Retrieve locales based on inline locale, current locale or default to
	  // I18n's detection.
	  I18n.locales.get = function(locale) {
	    var result = this[locale] || this[I18n.locale] || this["default"];

	    if (isFunction(result)) {
	      result = result(locale);
	    }

	    if (isArray(result) === false) {
	      result = [result];
	    }

	    return result;
	  };

	  // The default locale list.
	  I18n.locales["default"] = function(locale) {
	    var locales = []
	      , list = []
	    ;

	    // Handle the inline locale option that can be provided to
	    // the `I18n.t` options.
	    if (locale) {
	      locales.push(locale);
	    }

	    // Add the current locale to the list.
	    if (!locale && I18n.locale) {
	      locales.push(I18n.locale);
	    }

	    // Add the default locale if fallback strategy is enabled.
	    if (I18n.fallbacks && I18n.defaultLocale) {
	      locales.push(I18n.defaultLocale);
	    }

	    // Locale code format 1:
	    // According to RFC4646 (http://www.ietf.org/rfc/rfc4646.txt)
	    // language codes for Traditional Chinese should be `zh-Hant`
	    //
	    // But due to backward compatibility
	    // We use older version of IETF language tag
	    // @see http://www.w3.org/TR/html401/struct/dirlang.html
	    // @see http://en.wikipedia.org/wiki/IETF_language_tag
	    //
	    // Format: `language-code = primary-code ( "-" subcode )*`
	    //
	    // primary-code uses ISO639-1
	    // @see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
	    // @see http://www.iso.org/iso/home/standards/language_codes.htm
	    //
	    // subcode uses ISO 3166-1 alpha-2
	    // @see http://en.wikipedia.org/wiki/ISO_3166
	    // @see http://www.iso.org/iso/country_codes.htm
	    //
	    // @note
	    //   subcode can be in upper case or lower case
	    //   defining it in upper case is a convention only


	    // Locale code format 2:
	    // Format: `code = primary-code ( "-" region-code )*`
	    // primary-code uses ISO 639-1
	    // script-code uses ISO 15924
	    // region-code uses ISO 3166-1 alpha-2
	    // Example: zh-Hant-TW, en-HK, zh-Hant-CN
	    //
	    // It is similar to RFC4646 (or actually the same),
	    // but seems to be limited to language, script, region

	    // Compute each locale with its country code.
	    // So this will return an array containing
	    // `de-DE` and `de`
	    // or
	    // `zh-hans-tw`, `zh-hans`, `zh`
	    // locales.
	    locales.forEach(function(locale) {
	      var localeParts = locale.split("-");
	      var firstFallback = null;
	      var secondFallback = null;
	      if (localeParts.length === 3) {
	        firstFallback = [
	          localeParts[0],
	          localeParts[1]
	        ].join("-");
	        secondFallback = localeParts[0];
	      }
	      else if (localeParts.length === 2) {
	        firstFallback = localeParts[0];
	      }

	      if (list.indexOf(locale) === -1) {
	        list.push(locale);
	      }

	      if (! I18n.fallbacks) {
	        return;
	      }

	      [
	        firstFallback,
	        secondFallback
	      ].forEach(function(nullableFallbackLocale) {
	        // We don't want null values
	        if (typeof nullableFallbackLocale === "undefined") { return; }
	        if (nullableFallbackLocale === null) { return; }
	        // We don't want duplicate values
	        //
	        // Comparing with `locale` first is faster than
	        // checking whether value's presence in the list
	        if (nullableFallbackLocale === locale) { return; }
	        if (list.indexOf(nullableFallbackLocale) !== -1) { return; }

	        list.push(nullableFallbackLocale);
	      });
	    });

	    // No locales set? English it is.
	    if (!locales.length) {
	      locales.push("en");
	    }

	    return list;
	  };

	  // Hold pluralization rules.
	  I18n.pluralization = {};

	  // Return the pluralizer for a specific locale.
	  // If no specify locale is found, then I18n's default will be used.
	  I18n.pluralization.get = function(locale) {
	    return this[locale] || this[I18n.locale] || this["default"];
	  };

	  // The default pluralizer rule.
	  // It detects the `zero`, `one`, and `other` scopes.
	  I18n.pluralization["default"] = function(count) {
	    switch (count) {
	      case 0: return ["zero", "other"];
	      case 1: return ["one"];
	      default: return ["other"];
	    }
	  };

	  // Return current locale. If no locale has been set, then
	  // the current locale will be the default locale.
	  I18n.currentLocale = function() {
	    return this.locale || this.defaultLocale;
	  };

	  // Check if value is different than undefined and null;
	  I18n.isSet = isSet;

	  // Find and process the translation using the provided scope and options.
	  // This is used internally by some functions and should not be used as an
	  // public API.
	  I18n.lookup = function(scope, options) {
	    options = options || {};

	    var locales = this.locales.get(options.locale).slice()
	      , locale
	      , scopes
	      , fullScope
	      , translations
	    ;

	    fullScope = this.getFullScope(scope, options);

	    while (locales.length) {
	      locale = locales.shift();
	      scopes = fullScope.split(options.separator || this.defaultSeparator);
	      translations = this.translations[locale];

	      if (!translations) {
	        continue;
	      }
	      while (scopes.length) {
	        translations = translations[scopes.shift()];

	        if (translations === undefined || translations === null) {
	          break;
	        }
	      }

	      if (translations !== undefined && translations !== null) {
	        return translations;
	      }
	    }

	    if (isSet(options.defaultValue)) {
	      return lazyEvaluate(options.defaultValue, scope);
	    }
	  };

	  // lookup pluralization rule key into translations
	  I18n.pluralizationLookupWithoutFallback = function(count, locale, translations) {
	    var pluralizer = this.pluralization.get(locale)
	      , pluralizerKeys = pluralizer(count)
	      , pluralizerKey
	      , message;

	    if (isObject(translations)) {
	      while (pluralizerKeys.length) {
	        pluralizerKey = pluralizerKeys.shift();
	        if (isSet(translations[pluralizerKey])) {
	          message = translations[pluralizerKey];
	          break;
	        }
	      }
	    }

	    return message;
	  };

	  // Lookup dedicated to pluralization
	  I18n.pluralizationLookup = function(count, scope, options) {
	    options = options || {};
	    var locales = this.locales.get(options.locale).slice()
	      , locale
	      , scopes
	      , translations
	      , message
	    ;
	    scope = this.getFullScope(scope, options);

	    while (locales.length) {
	      locale = locales.shift();
	      scopes = scope.split(options.separator || this.defaultSeparator);
	      translations = this.translations[locale];

	      if (!translations) {
	        continue;
	      }

	      while (scopes.length) {
	        translations = translations[scopes.shift()];
	        if (!isObject(translations)) {
	          break;
	        }
	        if (scopes.length === 0) {
	          message = this.pluralizationLookupWithoutFallback(count, locale, translations);
	        }
	      }
	      if (typeof message !== "undefined" && message !== null) {
	        break;
	      }
	    }

	    if (typeof message === "undefined" || message === null) {
	      if (isSet(options.defaultValue)) {
	        if (isObject(options.defaultValue)) {
	          message = this.pluralizationLookupWithoutFallback(count, options.locale, options.defaultValue);
	        } else {
	          message = options.defaultValue;
	        }
	        translations = options.defaultValue;
	      }
	    }

	    return { message: message, translations: translations };
	  };

	  // Rails changed the way the meridian is stored.
	  // It started with `date.meridian` returning an array,
	  // then it switched to `time.am` and `time.pm`.
	  // This function abstracts this difference and returns
	  // the correct meridian or the default value when none is provided.
	  I18n.meridian = function() {
	    var time = this.lookup("time");
	    var date = this.lookup("date");

	    if (time && time.am && time.pm) {
	      return [time.am, time.pm];
	    } else if (date && date.meridian) {
	      return date.meridian;
	    } else {
	      return DATE.meridian;
	    }
	  };

	  // Merge serveral hash options, checking if value is set before
	  // overwriting any value. The precedence is from left to right.
	  //
	  //     I18n.prepareOptions({name: "John Doe"}, {name: "Mary Doe", role: "user"});
	  //     #=> {name: "John Doe", role: "user"}
	  //
	  I18n.prepareOptions = function() {
	    var args = slice.call(arguments)
	      , options = {}
	      , subject
	    ;

	    while (args.length) {
	      subject = args.shift();

	      if (typeof(subject) != "object") {
	        continue;
	      }

	      for (var attr in subject) {
	        if (!subject.hasOwnProperty(attr)) {
	          continue;
	        }

	        if (isSet(options[attr])) {
	          continue;
	        }

	        options[attr] = subject[attr];
	      }
	    }

	    return options;
	  };

	  // Generate a list of translation options for default fallbacks.
	  // `defaultValue` is also deleted from options as it is returned as part of
	  // the translationOptions array.
	  I18n.createTranslationOptions = function(scope, options) {
	    var translationOptions = [{scope: scope}];

	    // Defaults should be an array of hashes containing either
	    // fallback scopes or messages
	    if (isSet(options.defaults)) {
	      translationOptions = translationOptions.concat(options.defaults);
	    }

	    // Maintain support for defaultValue. Since it is always a message
	    // insert it in to the translation options as such.
	    if (isSet(options.defaultValue)) {
	      translationOptions.push({ message: options.defaultValue });
	    }

	    return translationOptions;
	  };

	  // Translate the given scope with the provided options.
	  I18n.translate = function(scope, options) {
	    options = options || {};

	    var translationOptions = this.createTranslationOptions(scope, options);

	    var translation;
	    var usedScope = scope;

	    var optionsWithoutDefault = this.prepareOptions(options);
	    delete optionsWithoutDefault.defaultValue;

	    // Iterate through the translation options until a translation
	    // or message is found.
	    var translationFound =
	      translationOptions.some(function(translationOption) {
	        if (isSet(translationOption.scope)) {
	          usedScope = translationOption.scope;
	          translation = this.lookup(usedScope, optionsWithoutDefault);
	        } else if (isSet(translationOption.message)) {
	          translation = lazyEvaluate(translationOption.message, scope);
	        }

	        if (translation !== undefined && translation !== null) {
	          return true;
	        }
	      }, this);

	    if (!translationFound) {
	      return this.missingTranslation(scope, options);
	    }

	    if (typeof(translation) === "string") {
	      translation = this.interpolate(translation, options);
	    } else if (isArray(translation)) {
	      translation = translation.map(function(t) {
	        return (typeof(t) === "string" ? this.interpolate(t, options) : t);
	      }, this);
	    } else if (isObject(translation) && isSet(options.count)) {
	      translation = this.pluralize(options.count, usedScope, options);
	    }

	    return translation;
	  };

	  // This function interpolates the all variables in the given message.
	  I18n.interpolate = function(message, options) {
	    if (message == null) {
	      return message;
	    }

	    options = options || {};
	    var matches = message.match(this.placeholder)
	      , placeholder
	      , value
	      , name
	      , regex
	    ;

	    if (!matches) {
	      return message;
	    }

	    while (matches.length) {
	      placeholder = matches.shift();
	      name = placeholder.replace(this.placeholder, "$1");

	      if (isSet(options[name])) {
	        value = options[name].toString().replace(/\$/gm, "_#$#_");
	      } else if (name in options) {
	        value = this.nullPlaceholder(placeholder, message, options);
	      } else {
	        value = this.missingPlaceholder(placeholder, message, options);
	      }

	      regex = new RegExp(placeholder.replace(/{/gm, "\\{").replace(/}/gm, "\\}"));
	      message = message.replace(regex, value);
	    }

	    return message.replace(/_#\$#_/g, "$");
	  };

	  // Pluralize the given scope using the `count` value.
	  // The pluralized translation may have other placeholders,
	  // which will be retrieved from `options`.
	  I18n.pluralize = function(count, scope, options) {
	    options = this.prepareOptions({count: String(count)}, options);
	    var pluralizer, result;

	    result = this.pluralizationLookup(count, scope, options);
	    if (typeof result.translations === "undefined" || result.translations == null) {
	      return this.missingTranslation(scope, options);
	    }

	    if (typeof result.message !== "undefined" && result.message != null) {
	      return this.interpolate(result.message, options);
	    }
	    else {
	      pluralizer = this.pluralization.get(options.locale);
	      return this.missingTranslation(scope + '.' + pluralizer(count)[0], options);
	    }
	  };

	  // Return a missing translation message for the given parameters.
	  I18n.missingTranslation = function(scope, options) {
	    //guess intended string
	    if(this.missingBehaviour === 'guess'){
	      //get only the last portion of the scope
	      var s = scope.split('.').slice(-1)[0];
	      //replace underscore with space && camelcase with space and lowercase letter
	      return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : '') +
	          s.replace(/_/g,' ').replace(/([a-z])([A-Z])/g,
	          function(match, p1, p2) {return p1 + ' ' + p2.toLowerCase()} );
	    }

	    var localeForTranslation = (options != null && options.locale != null) ? options.locale : this.currentLocale();
	    var fullScope           = this.getFullScope(scope, options);
	    var fullScopeWithLocale = [localeForTranslation, fullScope].join(options.separator || this.defaultSeparator);

	    return '[missing "' + fullScopeWithLocale + '" translation]';
	  };

	  // Return a missing placeholder message for given parameters
	  I18n.missingPlaceholder = function(placeholder, message, options) {
	    return "[missing " + placeholder + " value]";
	  };

	  I18n.nullPlaceholder = function() {
	    return I18n.missingPlaceholder.apply(I18n, arguments);
	  };

	  // Format number using localization rules.
	  // The options will be retrieved from the `number.format` scope.
	  // If this isn't present, then the following options will be used:
	  //
	  // - `precision`: `3`
	  // - `separator`: `"."`
	  // - `delimiter`: `","`
	  // - `strip_insignificant_zeros`: `false`
	  //
	  // You can also override these options by providing the `options` argument.
	  //
	  I18n.toNumber = function(number, options) {
	    options = this.prepareOptions(
	        options
	      , this.lookup("number.format")
	      , NUMBER_FORMAT
	    );

	    var negative = number < 0
	      , string = toFixed(Math.abs(number), options.precision).toString()
	      , parts = string.split(".")
	      , precision
	      , buffer = []
	      , formattedNumber
	      , format = options.format || "%n"
	      , sign = negative ? "-" : ""
	    ;

	    number = parts[0];
	    precision = parts[1];

	    while (number.length > 0) {
	      buffer.unshift(number.substr(Math.max(0, number.length - 3), 3));
	      number = number.substr(0, number.length -3);
	    }

	    formattedNumber = buffer.join(options.delimiter);

	    if (options.strip_insignificant_zeros && precision) {
	      precision = precision.replace(/0+$/, "");
	    }

	    if (options.precision > 0 && precision) {
	      formattedNumber += options.separator + precision;
	    }

	    if (options.sign_first) {
	      format = "%s" + format;
	    }
	    else {
	      format = format.replace("%n", "%s%n");
	    }

	    formattedNumber = format
	      .replace("%u", options.unit)
	      .replace("%n", formattedNumber)
	      .replace("%s", sign)
	    ;

	    return formattedNumber;
	  };

	  // Format currency with localization rules.
	  // The options will be retrieved from the `number.currency.format` and
	  // `number.format` scopes, in that order.
	  //
	  // Any missing option will be retrieved from the `I18n.toNumber` defaults and
	  // the following options:
	  //
	  // - `unit`: `"$"`
	  // - `precision`: `2`
	  // - `format`: `"%u%n"`
	  // - `delimiter`: `","`
	  // - `separator`: `"."`
	  //
	  // You can also override these options by providing the `options` argument.
	  //
	  I18n.toCurrency = function(number, options) {
	    options = this.prepareOptions(
	        options
	      , this.lookup("number.currency.format", options)
	      , this.lookup("number.format", options)
	      , CURRENCY_FORMAT
	    );

	    return this.toNumber(number, options);
	  };

	  // Localize several values.
	  // You can provide the following scopes: `currency`, `number`, or `percentage`.
	  // If you provide a scope that matches the `/^(date|time)/` regular expression
	  // then the `value` will be converted by using the `I18n.toTime` function.
	  //
	  // It will default to the value's `toString` function.
	  //
	  I18n.localize = function(scope, value, options) {
	    options || (options = {});

	    switch (scope) {
	      case "currency":
	        return this.toCurrency(value, options);
	      case "number":
	        scope = this.lookup("number.format", options);
	        return this.toNumber(value, scope);
	      case "percentage":
	        return this.toPercentage(value, options);
	      default:
	        var localizedValue;

	        if (scope.match(/^(date|time)/)) {
	          localizedValue = this.toTime(scope, value, options);
	        } else {
	          localizedValue = value.toString();
	        }

	        return this.interpolate(localizedValue, options);
	    }
	  };

	  // Parse a given `date` string into a JavaScript Date object.
	  // This function is time zone aware.
	  //
	  // The following string formats are recognized:
	  //
	  //    yyyy-mm-dd
	  //    yyyy-mm-dd[ T]hh:mm::ss
	  //    yyyy-mm-dd[ T]hh:mm::ss
	  //    yyyy-mm-dd[ T]hh:mm::ssZ
	  //    yyyy-mm-dd[ T]hh:mm::ss+0000
	  //    yyyy-mm-dd[ T]hh:mm::ss+00:00
	  //    yyyy-mm-dd[ T]hh:mm::ss.123Z
	  //
	  I18n.parseDate = function(date) {
	    var matches, convertedDate, fraction;
	    // A date input of `null` or `undefined` will be returned as-is
	    if (date == null) {
	      return date;
	    }
	    // we have a date, so just return it.
	    if (typeof(date) === "object") {
	      return date;
	    }

	    matches = date.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/);

	    if (matches) {
	      for (var i = 1; i <= 6; i++) {
	        matches[i] = parseInt(matches[i], 10) || 0;
	      }

	      // month starts on 0
	      matches[2] -= 1;

	      fraction = matches[7] ? 1000 * ("0" + matches[7]) : null;

	      if (matches[8]) {
	        convertedDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction));
	      } else {
	        convertedDate = new Date(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6], fraction);
	      }
	    } else if (typeof(date) == "number") {
	      // UNIX timestamp
	      convertedDate = new Date();
	      convertedDate.setTime(date);
	    } else if (date.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/)) {
	      // This format `Wed Jul 20 13:03:39 +0000 2011` is parsed by
	      // webkit/firefox, but not by IE, so we must parse it manually.
	      convertedDate = new Date();
	      convertedDate.setTime(Date.parse([
	        RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5
	      ].join(" ")));
	    } else if (date.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/)) {
	      // a valid javascript format with timezone info
	      convertedDate = new Date();
	      convertedDate.setTime(Date.parse(date));
	    } else {
	      // an arbitrary javascript string
	      convertedDate = new Date();
	      convertedDate.setTime(Date.parse(date));
	    }

	    return convertedDate;
	  };

	  // Formats time according to the directives in the given format string.
	  // The directives begins with a percent (%) character. Any text not listed as a
	  // directive will be passed through to the output string.
	  //
	  // The accepted formats are:
	  //
	  //     %a     - The abbreviated weekday name (Sun)
	  //     %A     - The full weekday name (Sunday)
	  //     %b     - The abbreviated month name (Jan)
	  //     %B     - The full month name (January)
	  //     %c     - The preferred local date and time representation
	  //     %d     - Day of the month (01..31)
	  //     %-d    - Day of the month (1..31)
	  //     %H     - Hour of the day, 24-hour clock (00..23)
	  //     %-H/%k - Hour of the day, 24-hour clock (0..23)
	  //     %I     - Hour of the day, 12-hour clock (01..12)
	  //     %-I/%l - Hour of the day, 12-hour clock (1..12)
	  //     %m     - Month of the year (01..12)
	  //     %-m    - Month of the year (1..12)
	  //     %M     - Minute of the hour (00..59)
	  //     %-M    - Minute of the hour (0..59)
	  //     %p     - Meridian indicator (AM  or  PM)
	  //     %P     - Meridian indicator (am  or  pm)
	  //     %S     - Second of the minute (00..60)
	  //     %-S    - Second of the minute (0..60)
	  //     %w     - Day of the week (Sunday is 0, 0..6)
	  //     %y     - Year without a century (00..99)
	  //     %-y    - Year without a century (0..99)
	  //     %Y     - Year with century
	  //     %z/%Z  - Timezone offset (+0545)
	  //
	  I18n.strftime = function(date, format, options) {
	    var options = this.lookup("date", options)
	      , meridianOptions = I18n.meridian()
	    ;

	    if (!options) {
	      options = {};
	    }

	    options = this.prepareOptions(options, DATE);

	    if (isNaN(date.getTime())) {
	      throw new Error('I18n.strftime() requires a valid date object, but received an invalid date.');
	    }

	    var weekDay = date.getDay()
	      , day = date.getDate()
	      , year = date.getFullYear()
	      , month = date.getMonth() + 1
	      , hour = date.getHours()
	      , hour12 = hour
	      , meridian = hour > 11 ? 1 : 0
	      , secs = date.getSeconds()
	      , mins = date.getMinutes()
	      , offset = date.getTimezoneOffset()
	      , absOffsetHours = Math.floor(Math.abs(offset / 60))
	      , absOffsetMinutes = Math.abs(offset) - (absOffsetHours * 60)
	      , timezoneoffset = (offset > 0 ? "-" : "+") +
	          (absOffsetHours.toString().length < 2 ? "0" + absOffsetHours : absOffsetHours) +
	          (absOffsetMinutes.toString().length < 2 ? "0" + absOffsetMinutes : absOffsetMinutes)
	    ;

	    if (hour12 > 12) {
	      hour12 = hour12 - 12;
	    } else if (hour12 === 0) {
	      hour12 = 12;
	    }

	    format = format.replace("%a", options.abbr_day_names[weekDay]);
	    format = format.replace("%A", options.day_names[weekDay]);
	    format = format.replace("%b", options.abbr_month_names[month]);
	    format = format.replace("%B", options.month_names[month]);
	    format = format.replace("%d", padding(day));
	    format = format.replace("%e", day);
	    format = format.replace("%-d", day);
	    format = format.replace("%H", padding(hour));
	    format = format.replace("%-H", hour);
	    format = format.replace("%k", hour);
	    format = format.replace("%I", padding(hour12));
	    format = format.replace("%-I", hour12);
	    format = format.replace("%l", hour12);
	    format = format.replace("%m", padding(month));
	    format = format.replace("%-m", month);
	    format = format.replace("%M", padding(mins));
	    format = format.replace("%-M", mins);
	    format = format.replace("%p", meridianOptions[meridian]);
	    format = format.replace("%P", meridianOptions[meridian].toLowerCase());
	    format = format.replace("%S", padding(secs));
	    format = format.replace("%-S", secs);
	    format = format.replace("%w", weekDay);
	    format = format.replace("%y", padding(year));
	    format = format.replace("%-y", padding(year).replace(/^0+/, ""));
	    format = format.replace("%Y", year);
	    format = format.replace("%z", timezoneoffset);
	    format = format.replace("%Z", timezoneoffset);

	    return format;
	  };

	  // Convert the given dateString into a formatted date.
	  I18n.toTime = function(scope, dateString, options) {
	    var date = this.parseDate(dateString)
	      , format = this.lookup(scope, options)
	    ;

	    // A date input of `null` or `undefined` will be returned as-is
	    if (date == null) {
	      return date;
	    }

	    var date_string = date.toString();
	    if (date_string.match(/invalid/i)) {
	      return date_string;
	    }

	    if (!format) {
	      return date_string;
	    }

	    return this.strftime(date, format, options);
	  };

	  // Convert a number into a formatted percentage value.
	  I18n.toPercentage = function(number, options) {
	    options = this.prepareOptions(
	        options
	      , this.lookup("number.percentage.format", options)
	      , this.lookup("number.format", options)
	      , PERCENTAGE_FORMAT
	    );

	    return this.toNumber(number, options);
	  };

	  // Convert a number into a readable size representation.
	  I18n.toHumanSize = function(number, options) {
	    var kb = 1024
	      , size = number
	      , iterations = 0
	      , unit
	      , precision
	      , fullScope
	    ;

	    while (size >= kb && iterations < 4) {
	      size = size / kb;
	      iterations += 1;
	    }

	    if (iterations === 0) {
	      fullScope = this.getFullScope("number.human.storage_units.units.byte", options);
	      unit = this.t(fullScope, {count: size});
	      precision = 0;
	    } else {
	      fullScope = this.getFullScope("number.human.storage_units.units." + SIZE_UNITS[iterations], options);
	      unit = this.t(fullScope);
	      precision = (size - Math.floor(size) === 0) ? 0 : 1;
	    }

	    options = this.prepareOptions(
	        options
	      , {unit: unit, precision: precision, format: "%n%u", delimiter: ""}
	    );

	    return this.toNumber(size, options);
	  };

	  I18n.getFullScope = function(scope, options) {
	    options = options || {};

	    // Deal with the scope as an array.
	    if (isArray(scope)) {
	      scope = scope.join(options.separator || this.defaultSeparator);
	    }

	    // Deal with the scope option provided through the second argument.
	    //
	    //    I18n.t('hello', {scope: 'greetings'});
	    //
	    if (options.scope) {
	      scope = [options.scope, scope].join(options.separator || this.defaultSeparator);
	    }

	    return scope;
	  };
	  /**
	   * Merge obj1 with obj2 (shallow merge), without modifying inputs
	   * @param {Object} obj1
	   * @param {Object} obj2
	   * @returns {Object} Merged values of obj1 and obj2
	   *
	   * In order to support ES3, `Object.prototype.hasOwnProperty.call` is used
	   * Idea is from:
	   * https://stackoverflow.com/questions/8157700/object-has-no-hasownproperty-method-i-e-its-undefined-ie8
	   */
	  I18n.extend = function ( obj1, obj2 ) {
	    if (typeof(obj1) === "undefined" && typeof(obj2) === "undefined") {
	      return {};
	    }
	    return merge(obj1, obj2);
	  };

	  // Set aliases, so we can save some typing.
	  I18n.t = I18n.translate.bind(I18n);
	  I18n.l = I18n.localize.bind(I18n);
	  I18n.p = I18n.pluralize.bind(I18n);

	  return I18n;
	}));
	});

	const LanguageStore = mobxStateTree.types
	    .model('LanguageStore', {
	    languages: mobxStateTree.types.frozen(),
	    currentLanguage: mobxStateTree.types.enumeration('Languages', Object.values(exports.AvailableLanguages)),
	    pizza: mobxStateTree.types.maybe(mobxStateTree.types.string),
	})
	    .actions((self) => ({
	    setCurrentLanguage: (languageCode) => {
	        i18n.locale = languageCode;
	        self.currentLanguage = exports.AvailableLanguages[languageCode];
	    },
	    setLanguages: (languesList) => (self.languages = mobxStateTree.cast(languesList)),
	    setPizza: (value) => (self.pizza = value),
	}));

	exports.LanguageStore = LanguageStore;
	exports.life = life;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
