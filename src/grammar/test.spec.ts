import * as assert from 'assert';
import { describe, it } from "mocha";
import JustfileLexer from './JustfileLexer';
import { getRecipes, parseJustfile } from '.';
import { globSync } from 'glob';
import { readFileSync } from 'fs';
import { basename } from 'path';


describe("Test JustfileLexer", () => {
    it("assignment", () => {
        const lines = [`bcc := "
        hello\t
         world
        "`,
            'abc := "\t"',
            "aa := \"\"\"\nsdasd \n asda\"\"\"",
            "ab := \"\\\r\n\"",
            `x := '''
          foo
          bar
        '''`,
            `y := """
          abc
            wuv
          xyz
        """
`,
        ]
        const justfile = lines.join("\n");

        const tree = parseJustfile(justfile);

        tree.item_list()?.forEach((c) => {
            assert.equal(c.exception, null);
        });

        assert.equal(tree.item_list().length, lines.length);
    })
    it("setting", () => {
        const justfile = `set dotenv-load := true
set allow-duplicate-recipes
`;
        const tree = parseJustfile(justfile);

        tree.item_list().forEach((c) => {
            assert.equal(c.exception, null);
        });
        assert.equal(tree.item_list().length, 2);
    })
    it("commnet", () => {
        const justfile = `# 12aaaa
set dotenv-load := true
`;

        const tree = parseJustfile(justfile);
        tree.item_list().forEach((c) => {
            assert.equal(c.exception, null);
        });
    })
    it("expr", () => {
        const justfile = `shebang := if os() == 'windows' {
'powershell.exe'
} else {
'/usr/bin/env pwsh'
}
`;

        const tree = parseJustfile(justfile);

        tree.item_list()?.forEach((c) => {
            assert.equal(c.exception, null);
        });
    })

    it("should parse", () => {
        const justfile = `bcc := "hello world"

# 125
abc:
    -@echo "hello world"

    @echo "hello world2"

# saaa
def c="a" : abc
    #!/bin/bash
    
    echo "00"
`;

        const tree = parseJustfile(justfile);

        assert.equal(-1, JustfileLexer.EOF);
        assert.equal(tree.exception, null);

        const recipes = getRecipes(tree);
        assert.equal(recipes?.length, 2);
        assert.equal(recipes[0].start.line, 3);
        assert.equal(recipes[1].start.line, 9);

        tree.item_list().forEach((c) => {
            assert.equal(c.exception, null);
            // console.log(justfile.substring(c.start.start, c.stop?.stop)); 
        });
    });

    it("should parse2", () => {
        const justfile = `set dotenv-load := true
set windows-shell := ["pwsh.exe", "-NoLogo", "-Command"]

aa := "aaa"

bbb := """aaa
 0"""

cc := 'aaa "bb"'

default:
    just --version
`;

        const tree = parseJustfile(justfile);
        assert.equal(tree.exception, null);
        const recipes = getRecipes(tree);

        tree.item_list().forEach((c) => {
            assert.equal(c.exception, null);

            // console.log(justfile.substring(c.start.start, c.stop?.stop));            
        });

        assert.equal(recipes?.length, 1);
    });

    describe("Parse just-repo", () => {
        let justfiles = globSync('example/just-repo/*.just',)

        justfiles.forEach((justfilePath, i) => {

            const justfile = readFileSync(justfilePath, 'utf8');

            it(`expamle: ${basename(justfilePath)}`, () => {
                const tree = parseJustfile(justfile);
                tree.item_list().forEach((item) => {
                    assert.equal(item.exception, null);
                });
                assert.equal(tree.exception, null);
            });
        });
    });
});