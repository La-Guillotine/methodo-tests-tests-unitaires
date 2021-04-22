import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';

chai.use(ChaiPluginAssertType);

describe('Exercice 2 - Leap years', () => {
    it('leapTestV1 - divisibles par 400', () => {
        assert.isTrue(is_leap_year_v1(2000));
        assert.isFalse(is_leap_year_v1(2017));
    });

    it('LeapTestV2 - divisibles par 100 mais pas par 400', () => {
        // 1900 / 100 = 19 mais 1900 / 400 = 4.75
        assert.isFalse(is_leap_year_v2(1900));
    });

    it('LeapTestV3 - divisibles par 4 mais pas par 100', () => {
        // 2020 / 100 = 20.2 mais 2020 / 4 = 505
        assert.isTrue(is_leap_year_v3(2020));
    });
    it('LeapTestV4 - non divisible par 4', () => {
        // 2017 n'est pas divisible par 4
        assert.isFalse(is_leap_year_v4(2015));
    });

    it('LeapTestV5 - Refacto', () => {
        assert.isTrue(is_leap_year_v5(2000));
        assert.isTrue(is_leap_year_v5(2020));

        assert.isFalse(is_leap_year_v5(2017));
        assert.isFalse(is_leap_year_v5(1900));
        assert.isFalse(is_leap_year_v5(2015));
    });
    
});

function is_leap_year_v1(annee: number): boolean
{
    if(annee % 400 === 0)return true;
    return false;
}

function is_leap_year_v2(annee: number): boolean
{
    if(annee % 400 === 0)return true;
    if(annee % 100 === 0 && annee % 400 !== 0)return false;
    return true;
}

function is_leap_year_v3(annee: number): boolean
{
    if(annee % 400 === 0)return true;
    if(annee % 100 === 0 && annee % 400 !== 0)return false;
    if(annee % 4 === 0 && annee % 100 !== 0) return true;
    return false;
}

function is_leap_year_v4(annee: number): boolean
{
    if(annee % 4 !== 0) return false;
    if(annee % 400 === 0)return true;
    if(annee % 100 === 0 && annee % 400 !== 0)return false;
    if(annee % 4 === 0 && annee % 100 !== 0) return true;

}

function is_leap_year_v5(annee: number): boolean
{
    if(annee % 4 === 0){
        if (annee % 100 !== 0) return true;
        else{
            if(annee % 400 === 0) return true;
        }
    }
    return false;
}
