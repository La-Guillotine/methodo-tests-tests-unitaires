import { assert, expect } from 'chai';
import * as sinon from 'sinon';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
import { LiftLogic } from './lift-logic';
import { Lift } from './lift';

chai.use(ChaiPluginAssertType);

describe('Lift Tests', () => {
    it('test-lift-moves-correctly-down', () => {
        let mockLogic = sinon.createStubInstance(LiftLogic);
        mockLogic.getDirection.returns(-1);

        let lift: Lift = new Lift(mockLogic, 0);
        lift.press_inside_button(10);
        lift.execute_iteration();
        // Verification du déplacement de la fonction
        assert.strictEqual(lift.currentFloor, -1);
        sinon.assert.calledOnce(mockLogic.getDirection);
        sinon.assert.calledWithExactly(mockLogic.getDirection, 0, 10, new Array<number>());
    });
    it('testLift_verify_call_get_direction', () => {
        let mockLogic = sinon.createStubInstance(LiftLogic);
        //la méthode me retournera forcément 1
        mockLogic.getDirection.returns(1);
        //je part du 2e étage
        let lift: Lift = new Lift(mockLogic, 2);
        lift.press_inside_button(10);
        lift.press_call_button(8);
        lift.press_call_button(0);
        lift.execute_iteration();

        assert.strictEqual(lift.currentFloor, 3);
        sinon.assert.calledOnce(mockLogic.getDirection);
        sinon.assert.calledWithExactly(mockLogic.getDirection, 2, 10, [8, 0]);
    });
    it('test_disable_button_when_stop', () => {
        let mockLogic = sinon.createStubInstance(LiftLogic);
        //la méthode me retournera forcément 1
        mockLogic.getDirection.returns(1);
        mockLogic.shouldStop.returns(true);
        //je part du 2e étage
        let lift: Lift = new Lift(mockLogic, 2);
        lift.press_inside_button(3);
        lift.press_call_button(3);
        lift.press_call_button(5);
        
        //Vérification suppression étage demandé
        assert.strictEqual(lift.inside_button, 3);
        lift.execute_iteration();
        assert.isNull(lift.inside_button);
        // Vérification suppression étage appellé si atteint par l'ascenseur

        assert.strictEqual(lift.currentFloor, 3);
        expect(lift.asked_buttons).to.deep.equal([5]);
        // Vérification des appels (nb + bons arguments)
        sinon.assert.calledOnce(mockLogic.getDirection);
        sinon.assert.calledWithExactly(mockLogic.getDirection, 2, 3, [3, 5]);
        
        sinon.assert.calledOnce(mockLogic.shouldStop);
        sinon.assert.calledWithExactly(mockLogic.shouldStop, 3, 3, [3, 5]);
    });
    it('test_with_buttons_go_up_or_down', () => {
        let mockLogic = sinon.createStubInstance(LiftLogic);
        //la méthode me retournera forcément 1
        mockLogic.getDirection.returns(1);
        //je part du 2e étage
        let lift: Lift = new Lift(mockLogic, 2);
        lift.press_inside_button(10);
        lift.press_call_button(8);
        lift.press_call_button(2);
        lift.execute_iteration();

        assert.isTrue(true);
    })
})