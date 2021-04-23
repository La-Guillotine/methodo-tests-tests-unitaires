export class Game{
    lancers: Array<number>;
    constructor(){
        this.lancers = new Array<number>();
    }

    roll(quilles: number): void
    {
        // Si nb quille entre 0 et 10 inclus
        if(quilles > 10 || quilles < 0) throw new Error("Nombre de quilles invalide");
        this.lancers.push(quilles);
    }

    score(): number
    {
        let manches = Array<number>();
        let somme: number = 0;
        // je parcoure mes lancers
        for(let i = 0; i < this.lancers.length; i++){
            // je regarde si j'ai fait un strike ou non
            if (this.lancers[i] < 10){
                // si la somme de mes 2 lancers est supérieure à 10 on renvoit une erreur
                if(this.lancers[i] + this.is_exists(i+1) > 10) throw new Error('2e lancer non conforme');
                // si je fais un SPARE
                else if(this.lancers[i] + this.is_exists(i+1) === 10){
                    // je prend la valeur des deux lancers du SPARE (10) et j'ajoute la valeur du lancer suivant
                    manches.push(this.lancers[i] + this.is_exists(i+1) + this.is_exists(i+2));
                    // si c'est la manche 10 je ne continue pas
                    if(manches.length === 10) break;
                }
                else manches.push(this.lancers[i] + this.is_exists(i + 1));
                // j'incrémente pour ne pas repasser sur le 2e lancer
                i = i + 1;
            }
            // STRIKE
            else{
                // 10 + valeurs des 2 prochains lancers
                manches.push(this.lancers[i] + this.is_exists(i+1) + this.is_exists(i+2));
                if(manches.length === 10) break;
            }
        }
        // si + de 10 manches, je renvoie une erreur
        if(manches.length > 10) throw new Error('trop de lancers')
        //calcul des points (somme de chaque manche)
        manches.forEach( nb => somme += nb);
        return somme;
    }

    //vérifie que le lancer exitse, si oui je renvoie sa valeur sinon je renvoie 0
    is_exists(indice: number): number{
        if( indice < this.lancers.length ) return this.lancers[indice];
        else return 0;
    }
}