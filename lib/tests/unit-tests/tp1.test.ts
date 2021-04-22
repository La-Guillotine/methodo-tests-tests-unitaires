import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';

chai.use(ChaiPluginAssertType);

describe('Simple Tests', () => {
    describe('. toUpper', () => {
        it('min to MAJ', () => {
            let res = "value".toUpperCase();
            assert.equal("VALUE", res);
        });
        it('upper sans altération', () => {
            assert.equal("VALUE", "VALUE".toUpperCase());
        });
        it("mélange MAJ/Min/Chiffres", () => {
            let str="aBGt68PRtgbdcsj85";
            assert.equal("ABGT68PRTGBDCSJ85", str.toUpperCase());
        });
    })

    describe('. divide', () => {
        it('division normale', () => {
            let nb = 5/2;
            assert.equal(2.5, nb);
        });
        it('division par zero', () => {
            let nb1 = 2, nb2 = 0;
            let err = null
            if(nb2 === 0){
                err = new Error();
            }
            expect(err).to.be.an("error");
        });
        it("division retourne flottant", () => {
            let nb = 4.7 / 2.2;
            expect(nb).to.be.a("number")
            // expect(nb).to.be.a("float")
        });
        it("division retourne décimale finie", () => {
            let nb = 7/2;
            assert.equal(3.5, nb);
        });
        it("division retourne décimale infinie", () => {
            let nb = 7.7/2.2;
            expect(nb).to.be.a("number")
            // expect(nb).to.be.a("float")
        });
    });

    describe('. tri', () => {
        it("tri croissant", () => {
            let tab = [7, 4, 6, 9, 3, 5, 1];
            let res = [1, 3, 4, 5, 6, 7, 9];

            assert.equal(res.length, tab.length);
            expect(tab.sort()).to.include.ordered.members(res);
        });
        it("tri décroissant", () => {
            let tab = [7, 4, 6, 9, 3, 5, 1];
            let res = [9, 7, 6, 5, 4, 3, 1];

            assert.equal(res.length, tab.length);
            expect(tab.sort().reverse()).to.include.ordered.members(res);
        });

        it("liste vide", () => {
            let tab: Array<any> = [];
            let res: Array<number> = [9, 7, 6, 5, 4, 3, 1];

            assert.isEmpty(tab);
            assert.isNotEmpty(res);
        });

        it("valeur autre que liste = erreur", () => {
            let tab = 2;
            let res = [9, 7, 6, 5, 4, 3, 1];

            assert.isNotArray(tab);
            assert.isArray(res);

            //Test pas très pertinent
        });
    });
});