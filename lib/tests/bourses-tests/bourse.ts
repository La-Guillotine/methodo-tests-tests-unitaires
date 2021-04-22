export class Etudiant{
    nbDroitsBourseRealises: number;
    bacPlus: number;
    credits: number;
    semestres: number;
    nbDemandesMax: number;
    nbDemandesSupp: number;
    difficulte: boolean;
    parcours: string;
    estStagiaire: boolean;
    estHandicape: boolean;
    estSportif: boolean;

    constructor(
        nbDroits: number,
        bacPlus: number,
        credits: number,
        semestres: number,
        difficulte: boolean,
        parcours: string,
        estStagiaire: boolean,
        estHandicape: boolean,
        estSportif: boolean
        ){
        this.nbDroitsBourseRealises = nbDroits;
        this.bacPlus = bacPlus;
        this.credits = credits;
        this.semestres = semestres;
        this.nbDemandesMax = 7;
        this.nbDemandesSupp = 0;
        this.difficulte = difficulte;
        this.parcours = parcours;
        this.estStagiaire = estStagiaire;
        this.estHandicape = estHandicape;
        this.estSportif = estSportif;
    }
}