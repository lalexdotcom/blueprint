/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require("chai");
const postcss = require("postcss");

const { CssSyntax } = require("../lib/utils/cssSyntax");
const { insertImport } = require("../lib/utils/insertImport");

describe("insertImport", () => {
    it("Inserts an import at the top of the file when no imports are present", () => {
        const root = postcss.parse(`.some-class { width: 10px }`);
        insertImport(CssSyntax.LESS, root, { newline: "\n" }, "some_path");
        expect(root.toString()).to.be.eq(`@import "some_path";

.some-class { width: 10px }`);
    });

    it("Inserts an import below other imports", () => {
        const root = postcss.parse(`
@import "some_path1";
.some-class { width: 10px }`);
        insertImport(CssSyntax.LESS, root, { newline: "\n" }, "some_path2");
        expect(root.toString()).to.be.eq(`
@import "some_path1";
@import "some_path2";
.some-class { width: 10px }`);
    });

    it("Inserts an import below the copyright header if no other imports exist", () => {
        const root = postcss.parse(`
/* copyright 2021 */

.some-class { width: 10px }`);
        insertImport(CssSyntax.LESS, root, { newline: "\n" }, "some_path");
        expect(root.toString()).to.be.eq(`
/* copyright 2021 */

@import "some_path";

.some-class { width: 10px }`);
    });

    it("Inserts an import below a multi-line copyright header if no other imports exist", () => {
        const root = postcss.parse(`
/* copyright 2021
 * and some additional licensing info here
 */

.some-class { width: 10px }`);
        insertImport(CssSyntax.SASS, root, { newline: "\n" }, "some_path");
        expect(root.toString()).to.be.eq(`
/* copyright 2021
 * and some additional licensing info here
 */

@use "some_path";

.some-class { width: 10px }`);
    });

    it("Inserts an import below other imports if the copyright header exists", () => {
        const root = postcss.parse(`
/* copyright 2021 */

@import "some_path1";
@import "some_path2";

.some-class { width: 10px }`);
        insertImport(CssSyntax.LESS, root, { newline: "\n" }, "some_path3");
        expect(root.toString()).to.be.eq(`
/* copyright 2021 */

@import "some_path1";
@import "some_path2";
@import "some_path3";

.some-class { width: 10px }`);
    });

    it("Inserts a sass import below other sass imports if the copyright header exists", () => {
        const root = postcss.parse(`
/* copyright 2021 */

@use "some_path1";
@use "some_path2";

.some-class { width: 10px }`);
        insertImport(CssSyntax.SASS, root, { newline: "\n" }, "some_path3", "foo");
        expect(root.toString()).to.be.eq(`
/* copyright 2021 */

@use "some_path1";
@use "some_path2";
@use "some_path3" as foo;

.some-class { width: 10px }`);
    });

    it("Doesn't treat media queries as imports", () => {
        const root = postcss.parse(`
@media only screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}

.some-class { width: 10px }
    `);
        insertImport(CssSyntax.LESS, root, { newline: "\n" }, "some_path");
        expect(root.toString()).to.be.eq(`@import "some_path";

@media only screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
}

.some-class { width: 10px }
    `);
    });
});
