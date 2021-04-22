import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
chai.use(ChaiPluginAssertType);
import * as sinon from 'sinon';
import { Pool } from './pool';
import { PoolLogic } from './pool-logic';

describe('Exercice 4', () => {
    it('allumer chauffage', () => {
        let mockLogic = sinon.createStubInstance(PoolLogic);
        // température actuelle de 25°C et moyenne > 20°C
        mockLogic.get_actual_temp.returns(25);
        mockLogic.get_last_days_temp.returns([20,20,20,23,25,21,19]);
       
        let pool: Pool = new Pool(mockLogic);
        // Dès que set_heater est appellée, on allume le chauffage
        mockLogic.set_heater.callsFake(function fakeFn() {
            pool.allume = true;
        });
        pool.allumer_chauffage();
        // je vérifie que le chauffage est allumé
        assert.isTrue(pool.allume);

        sinon.assert.calledOnce(mockLogic.get_actual_temp);
        sinon.assert.calledOnce(mockLogic.get_last_days_temp);
        sinon.assert.calledOnce(mockLogic.set_heater);
        sinon.assert.calledWithExactly(mockLogic.set_heater, true);
    });
    it('éteindre chauffage ( actual temp < 23)', () => {
        let mockLogic = sinon.createStubInstance(PoolLogic);
        // température actuelle < 23°C et moyenne > 20
        mockLogic.get_actual_temp.returns(21);
        mockLogic.get_last_days_temp.returns([20,20,20,23,25,21,19]);

        let pool: Pool = new Pool(mockLogic);
        // Dès que set_heater est appellée, on allume le chauffage
        mockLogic.set_heater.callsFake(function fakeFn() {
            pool.allume = false;
        });
        pool.allumer_chauffage();
        // je vérifie que le chauffage est allumé
        assert.isFalse(pool.allume);

        sinon.assert.calledOnce(mockLogic.get_actual_temp);
        sinon.assert.calledOnce(mockLogic.get_last_days_temp);
        sinon.assert.calledOnce(mockLogic.set_heater);
        sinon.assert.calledWithExactly(mockLogic.set_heater, false);
    });
    it('éteindre chauffage (average temp 7 last days < 20)', () => {
        let mockLogic = sinon.createStubInstance(PoolLogic);
        // température actuelle de 39°C et moyenne < 20°C
        mockLogic.get_actual_temp.returns(39);
        mockLogic.get_last_days_temp.returns([10,10,10,10,10,10,10]);

        let pool: Pool = new Pool(mockLogic);
        // Dès que set_heater est appellée, on allume le chauffage
        mockLogic.set_heater.callsFake(function fakeFn() {
            pool.allume = false;
        });
        pool.allumer_chauffage();
        // je vérifie que le chauffage est allumé
        assert.isFalse(pool.allume);

        sinon.assert.calledOnce(mockLogic.get_actual_temp);
        sinon.assert.calledOnce(mockLogic.get_last_days_temp);
        sinon.assert.calledOnce(mockLogic.set_heater);
        sinon.assert.calledWithExactly(mockLogic.set_heater, false);
    });
});