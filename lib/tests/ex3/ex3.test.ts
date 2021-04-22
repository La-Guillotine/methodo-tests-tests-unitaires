import { assert, expect } from 'chai';
const chai = require('chai');
import { ChaiPlugin as ChaiPluginAssertType } from 'chai-asserttype-extra';
chai.use(ChaiPluginAssertType);

describe('Exercice 3', () => {
    describe('a - sauts de lignesautomatiques', () => {
        it('Vérifie la longueur de la ligne < 20', () => {
            let chaine: string = "J’aimerai découper cette ligne:\nCette ligne est beaucoup trop longue alors je souhaite la découper";
            let res: string = saut_ligne(chaine, 20);

            // pour chaque ligne je vérifie que la longueur ne dépasse pas 10 caractères
            res.split('\n').forEach( line => {
                assert.isAtMost(line.length, 20);
            });
        });
        it('Garde les sauts de ligne déjà présents', () => {
            let chaine: string = "J’aimerai découper cette ligne:\nCette ligne est beaucoup trop longue alors je souhaite la découper";
            let res: string = saut_ligne(chaine, 20);

            let chaineRes: string = "J’aimerai découper\ncette ligne:\nCette ligne est\nbeaucoup trop longue\nalors je souhaite la\ndécouper";
            assert.equal(res, chaineRes);
            assert.equal(res.split("\n").length, 6);
        });
    });
});

function saut_ligne(chaine: string, longueur: number): string
{
    let tabMots: Array<string> = chaine.split(' ');
    let tabLignes: Array<string> = [];

    for(let i = 0; i < tabMots.length; i++){
        if(tabMots[i].length > longueur && !tabMots.includes('\n')){
            throw new Error();
        }
        
        let ligneComplete: boolean = false;
        let ligne: string = tabMots[i];
        let j = 1;
        while(ligneComplete == false){
            if( (ligne + ' ' + tabMots[i + j]).length > 20 || tabMots[i].includes('\n')) ligneComplete = true;
            else {

                ligne += ' ' + tabMots[i + j];
                j = j + 1;
            }
        }
        i = i + j - 1;
        tabLignes.push(ligne);
    }
    return tabLignes.join("\n");
}