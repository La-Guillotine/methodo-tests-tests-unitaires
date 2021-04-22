import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
import { Etudiant } from './bourse';
chai.use(ChaiPluginAssertType);

describe('Test Bourses', () => {
    it('> 7 droits de bourse', () => {
        let etudiant: Etudiant = new Etudiant(7, 5, 80, 5, false, "footballeur", false, false, false);
        assert.isFalse(isElligible(etudiant));
    });
    it('< Bac+3 && Droits > 5', () => {
        let etudiant: Etudiant = new Etudiant(5, 3, 80, 5, false, "footballeur", false, false, false);
        assert.isFalse(isElligible(etudiant));
    });
    it('3ème droit && - de 60 credits && - de 2 semestres', () => {
        let etudiant: Etudiant = new Etudiant(2, 2, 50, 1, false, "footballeur", false, false, false);
        assert.isFalse(isElligible(etudiant));
    });

    it('4ème ou 5ème droit && - de 120 credits && - de 4 semestres', () => {
        let etudiant: Etudiant = new Etudiant(4, 2, 80, 3, false, "footballeur", false, false, false);
        assert.isFalse(isElligible(etudiant));
    });
    it('Bac + 4 && - de 5 droits utilisés', () => {
        let etudiant: Etudiant = new Etudiant(2, 4, 150, 5, false, "footballeur", false, false, false);
        assert.equal(2, etudiant.nbDroitsBourseRealises);
        assert.isTrue(isElligible(etudiant));
        assert.equal(4, etudiant.nbDroitsBourseRealises);
    });
    it('ajout demande supp pour difficultées', () => {
        let etudiant: Etudiant = new Etudiant(7, 4, 120, 5, true, "footballeur", false, false, false);
        assert.equal(0, etudiant.nbDemandesSupp);
        assert.isTrue(isElligible(etudiant));
        assert.equal(1,etudiant.nbDemandesSupp);
    });
    it('ajout demande supp pour médecine/odontologie/pharmacie', () => {
        let etudiant: Etudiant = new Etudiant(7, 4, 120, 5, false, "odontologie", false, false, false);
        assert.equal(0, etudiant.nbDemandesSupp);
        assert.isTrue(isElligible(etudiant));
        assert.equal(1,etudiant.nbDemandesSupp);
    });
    it('ajout demande supp pour stage intégré', () => {
        let etudiant: Etudiant = new Etudiant(7, 4, 120, 5, false, "footballeur", true, false, false);
        assert.equal(0, etudiant.nbDemandesSupp);
        assert.isTrue(isElligible(etudiant));
        assert.equal(1,etudiant.nbDemandesSupp);
    });
    it('ajout 3 demande supp pour handicap', () => {
        let etudiant: Etudiant = new Etudiant(8, 4, 120, 5, false, "footballeur", false, true, false);
        assert.equal(0, etudiant.nbDemandesSupp);
        assert.isTrue(isElligible(etudiant));
        assert.equal(3,etudiant.nbDemandesSupp);
    });
    it('ajout 3 demande supp pour sportif', () => {
        let etudiant: Etudiant = new Etudiant(9, 4, 120, 5, false, "footballeur", false, false, true);
        assert.equal(0, etudiant.nbDemandesSupp);
        assert.isTrue(isElligible(etudiant));
        assert.equal(3,etudiant.nbDemandesSupp);
    });
    it('ajout full demandes supp', () => {
        let etudiant: Etudiant = new Etudiant(15, 4, 120, 5, true, "médecine", true, true, true);
        assert.equal(0, etudiant.nbDemandesSupp);
        assert.isTrue(isElligible(etudiant));
        assert.equal(9,etudiant.nbDemandesSupp);
    });
    it('etudiant elligible', () => {
        let etudiant: Etudiant = new Etudiant(4, 2, 120, 5, false, "footballeur", false, false, false);
        assert.isTrue(isElligible(etudiant));
    });
})

function isElligible(etudiant: Etudiant): boolean{
    //ajout d'1 demande pour cause de difficulté
    if(etudiant.difficulte === true) etudiant.nbDemandesSupp ++;
    // ajout 1 demande supplémentaire si médecin, odontologue ou pharmacien
    if(["odontologie","pharmacie","médecine"].includes(etudiant.parcours)) etudiant.nbDemandesSupp ++;
    //ajout d'1 demande si estStagiaire intégré à la formation
    if(etudiant.estStagiaire === true) etudiant.nbDemandesSupp ++;
    //ajout de 3 demandes si handicap
    if(etudiant.estHandicape === true) etudiant.nbDemandesSupp +=3;
    //ajout de 3 demandes si sportif de haut niveau
    if(etudiant.estSportif === true) etudiant.nbDemandesSupp +=3;


    if(etudiant.nbDroitsBourseRealises < (etudiant.nbDemandesMax + etudiant.nbDemandesSupp)){
        if(etudiant.bacPlus >= 4){
            if(etudiant.nbDroitsBourseRealises < 5){
                etudiant.nbDroitsBourseRealises = etudiant.nbDemandesMax - 3;
            }
        }
        // Si n'est pas en Bac + 3 -> 5 droits de bourse max
        if(etudiant.bacPlus <= 3 && etudiant.nbDroitsBourseRealises >= 5) return false;
        // Le 3e droit ne peut être accordé que si l'étudiant a validé au moins 60 crédits, 2 semestres ou 1 année
        if(etudiant.nbDroitsBourseRealises === 2 && etudiant.credits < 60 && etudiant.semestres < 2) return false;
        //Le 4e ou le 5e droit ne peuvent être accordés que si l'étudiant a validé au moins de 120 crédits, 4 semestres ou 2 années
        if([3,4].includes(etudiant.nbDroitsBourseRealises) && etudiant.credits < 120 && etudiant.semestres < 4) return false;

        return true;
    }
    return false;
}