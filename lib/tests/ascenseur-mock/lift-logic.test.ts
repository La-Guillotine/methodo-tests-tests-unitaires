import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
import { LiftLogic } from './lift-logic';

chai.use(ChaiPluginAssertType);

describe('LiftLogic Tests', () => {
    it('test_getFloor_prioritize_null_called_floor', () => {
        assert.isNull(new LiftLogic().getFloor(1, null, null));
    });
    it('test_getFloor_prioritize_empty_list_pressed', () => {
        assert.isNull(new LiftLogic().getFloor(1, null, new Array<number>() ));
    });
    it('test_getFloor_prioritize_called_floor', () => {
        assert.equal(1, new LiftLogic().getFloor(1, 1, [2]));
    });
    it('test_getFloor_prioritize_closest_floor_above', () => {
        assert.equal(2, new LiftLogic().getFloor(0, null, [-3, 2]));
    });
    it('test_getFloor_prioritize_closest_floor_below', () => {
        assert.equal(1, new LiftLogic().getFloor(3, null, [1, 7]));
    });
    it('test_getFloor_prioritize_closest_floor_equal_distance_first_in_list_below', () => {
        assert.equal(1, new LiftLogic().getFloor(1, null, [1, 3]));
    });
    it('test_getFloor_prioritize_closest_floor_equal_distance_first_in_list_above', () => {
        assert.equal(1, new LiftLogic().getFloor(1, null, [3, 1]));
    });
    it('test_getDirection_should_stay', () => {
        assert.equal(0, new LiftLogic().getDirection(1, 1, new Array<number>()));
    });
    it('test_getDirection_should_go_up', () => {
        assert.equal(1, new LiftLogic().getDirection(0, 1, new Array<number>()));
    });
    it('test_should_stop_for_asked_floor', () => {
        assert.isTrue(new LiftLogic().shouldStop(1, 1, new Array<number>()));
    });
    it('test_should_stop_for_called_floors', () => {
        assert.isTrue(new LiftLogic().shouldStop(1, null, [3, 1]));
    });
    it('test_should_stop_for_both', () => {
        assert.isTrue(new LiftLogic().shouldStop(2, 2, [1, 2]));
    });
    it('test_should_not_stop', () => {
        assert.isFalse(new LiftLogic().shouldStop(3, 2, [1, 2]));
    });

});