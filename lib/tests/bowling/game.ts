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
        for(let i = 0; i < this.lancers.length; i++){
            if (this.lancers[i] < 10){
                if(this.lancers[i] + this.is_exists(i+1) > 10) throw new Error('2e lancer non conforme');
                else if(this.lancers[i] + this.is_exists(i+1) === 10){
                    manches.push(this.lancers[i] + this.is_exists(i+1) + this.is_exists(i+2));
                    if(manches.length === 10) break;
                }
                else manches.push(this.lancers[i] + this.is_exists(i + 1));

                i = i + 1;
            }
            else{
                manches.push(this.lancers[i] + this.is_exists(i+1) + this.is_exists(i+2));
                if(manches.length === 10) break;
            }
        }
        if(manches.length > 10) throw new Error('trop de lancers')
        manches.forEach( nb => somme += nb);
        return somme;
    }

    is_exists(indice: number): number{
        if( indice < this.lancers.length ) return this.lancers[indice];
        else return 0;
    }
}