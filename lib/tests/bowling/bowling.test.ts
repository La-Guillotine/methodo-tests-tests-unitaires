import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
import { Game } from './game';
chai.use(ChaiPluginAssertType);

describe('Bowling game Kata', () => {
    describe('Roll function', () => {
        it('Add one roll to array lancers empty', () => {
            let game: Game = new Game();

            expect(() => game.roll(-2)).to.throw(Error,'Nombre de quilles invalide');
            expect(() => game.roll(17)).to.throw(Error,'Nombre de quilles invalide');
        });
        it('Add one roll to array lancers empty', () => {
            let game: Game = new Game();
            game.roll(5);

            assert.isAtMost(5, 10);
            assert.strictEqual(5, game.lancers[0]);
        });
        it('Add one roll to array lancers not empty', () => {
            let game: Game = new Game();
            game.lancers = [8, 1]
            game.roll(7);

            assert.isAtMost(7, 10);
            assert.strictEqual(game.lancers.length, 3);
            expect(game.lancers).to.deep.equal([8, 1, 7]);

        });
    });
    describe('Score function', () => {
        it('array lancers empty', () => {
            let game: Game = new Game();
            assert.strictEqual(game.score(), 0);
        });

        it('2 lancers > 10', () => {
            let game: Game = new Game();
            game.roll(8);
            game.roll(4);

            assert.strictEqual(game.lancers.length, 2);
            expect(game.lancers).to.deep.equal([8, 4]);
            expect(() => game.score()).to.throw(Error,'2e lancer non conforme');
        });
        it('2 lancers < 10', () => {
            let game: Game = new Game();
            game.roll(8);
            game.roll(1);

            assert.strictEqual(game.score(), 9);
        });
    });

    describe('Spares', () => {
        it('Spare', () => {
            let game: Game = new Game();
            game.roll(7);
            game.roll(3);
            game.roll(5);

            assert.equal(game.score(), 20);
        });
        it('Spare sans lancer derrière', () => {
            let game: Game = new Game();
            game.roll(7);
            game.roll(3);

            assert.equal(game.score(), 10);
        });
        it('2 spares d\'affilés', () => {
            let game: Game = new Game();
            game.roll(7);
            game.roll(3);
            game.roll(2);
            game.roll(8);

            assert.equal(game.score(), 22);
        });
        it('2 spares séparés', () => {
            let game: Game = new Game();
            game.roll(7);
            game.roll(3);
            game.roll(4);
            game.roll(4);
            game.roll(5);
            game.roll(5);

            assert.equal(game.score(), 32);
        });
        it('Spare avec lancer gouttière', () => {
            let game: Game = new Game();
            game.roll(0);
            game.roll(10);
            game.roll(4);
            game.roll(4);

            assert.equal(game.score(), 22);
        });
    });
    describe('Strikes', () => {
        it('Strike seul', () => {
            let game: Game = new Game();
            game.roll(10);

            assert.equal(game.score(), 10);
        });
        it('Strike avec deux lancers gouttières', () => {
            let game: Game = new Game();
            game.roll(10);

            assert.equal(game.score(), 10);
        });
        it('Strike avec bonus', () => {
            let game: Game = new Game();
            game.roll(10);
            game.roll(3);
            game.roll(4);

            assert.equal(game.score(), 24);
        });
        it('2 strikes d\'affilés', () => {
            let game: Game = new Game();
            game.roll(10);
            game.roll(10);
            game.roll(2);
            game.roll(7);

            assert.equal(game.score(), 50);
        });
        it('3 strikes d\'affilés', () => {
            let game: Game = new Game();
            game.roll(10);
            game.roll(10);
            game.roll(10);

            assert.equal(game.score(), 60);
        });
    });
    describe('Strikes and Spares', () => {
        it('Strike puis spare', () => {
            let game: Game = new Game();
            game.roll(10);
            game.roll(5);
            game.roll(5);
            game.roll(7);

            assert.equal(game.score(), 44);
        });
        it('Spare puis Strike', () => {
            let game: Game = new Game();
            game.roll(9);
            game.roll(1);
            game.roll(10);
            game.roll(7);
            game.roll(2);

            assert.equal(game.score(), 48);
        });
    });
    describe('Parties entières', () => {
        it('Trop de manches', () => {
            let game: Game = new Game();
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);
            game.roll(2);game.roll(3);

            expect(() => game.score()).to.throw(Error,'trop de lancers');
        });
        it('Partie entière OK sans règle 10e frame', () => {
            let game: Game = new Game();
            game.roll(9);game.roll(1);//20
            game.roll(10);//19
            game.roll(7);game.roll(2);//9
            game.roll(5);game.roll(1);//6
            game.roll(8);game.roll(2);//20
            game.roll(10);//22
            game.roll(10);//14
            game.roll(2);game.roll(2);//4
            game.roll(5);game.roll(5);//12
            game.roll(2);game.roll(7);//9

            assert.equal(game.score(), 135);
        });
        it('Partie entière OK avec strike 10e frame', () => {
            let game: Game = new Game();
            game.roll(9);game.roll(1);//20
            game.roll(10);//19
            game.roll(7);game.roll(2);//9
            game.roll(5);game.roll(1);//6
            game.roll(8);game.roll(2);//20
            game.roll(10);//22
            game.roll(10);//14
            game.roll(2);game.roll(2);//4
            game.roll(5);game.roll(3);//8
            game.roll(10);game.roll(7);game.roll(2);//19

            assert.equal(game.score(), 141);
        });
        it('Partie entière OK avec spare 10e frame', () => {
            let game: Game = new Game();
            game.roll(9);game.roll(1);//20
            game.roll(10);//19
            game.roll(7);game.roll(2);//9
            game.roll(5);game.roll(1);//6
            game.roll(8);game.roll(2);//20
            game.roll(10);//22
            game.roll(10);//14
            game.roll(2);game.roll(2);//4
            game.roll(5);game.roll(3);//8
            game.roll(3);game.roll(7);game.roll(2);//12

            assert.equal(game.score(), 134);
        });
        it('Partie entière OK avec spare et strike 10e frame', () => {
            let game: Game = new Game();
            game.roll(9);game.roll(1);//20
            game.roll(10);//19
            game.roll(7);game.roll(2);//9
            game.roll(5);game.roll(1);//6
            game.roll(8);game.roll(2);//20
            game.roll(10);//22
            game.roll(10);//14
            game.roll(2);game.roll(2);//4
            game.roll(5);game.roll(3);//8
            game.roll(10);game.roll(5);game.roll(5);//20

            assert.equal(game.score(), 142);
        });
    });
});