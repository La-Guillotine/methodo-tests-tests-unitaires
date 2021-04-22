import { PoolLogic } from "./pool-logic";

export class Pool{
    allume: boolean;
    poolLogic: PoolLogic;

    constructor(poolLogic: PoolLogic){
        this.allume = false;
        this.poolLogic = poolLogic;
    }
    allumer_chauffage(){
        let actualtemp: number = this.poolLogic.get_actual_temp();
        if( average(this.poolLogic.get_last_days_temp()) > 20 && actualtemp > 23){
            this.poolLogic.set_heater(true);
        }
        else{
            this.poolLogic.set_heater(false);
        }
    }

    
}

function average(list: Array<number>): number 
{
    let res: number = 0;
    list.forEach( nb => res += nb);
    return res / list.length;
}