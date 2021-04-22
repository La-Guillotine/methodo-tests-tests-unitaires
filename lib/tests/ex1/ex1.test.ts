import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
chai.use(ChaiPluginAssertType);

describe('Exercice 1', () => {
    it('a - join several string', () => {
        let tabString: Array<string> = ["FC", "Girondins", "de", "Bordeaux"];
        let res: string = joinString( tabString, " ");
        assert.equal("FC Girondins de Bordeaux", res);
    });
    it('b - number list average ', () => {
        let tabNumber: Array<number> = [1, 3, 5, 7, 9];
        assert.equal(5, average(tabNumber));
    });
});

function joinString(tab: Array<string>, separateur: string): string
{
    return tab.join(separateur);
}

function average(list: Array<number>): number 
{
    let res: number = 0;
    list.forEach( nb => res += nb);
    return res / list.length;
}