import { LiftLogic } from "./lift-logic";

export class Lift {
    readonly MIN_FLOOR: number = -2;
    readonly MAX_FLOOR: number = 10;
    logic: LiftLogic;
    currentFloor: number;
    inside_button: number;
    asked_buttons: Array<number>;


    constructor(logic: LiftLogic, starting_floor: number) {
        this.logic = logic;
        this.currentFloor = starting_floor;
        this.inside_button = null;
        this.asked_buttons = new Array<number>();
    }

    // Test only
    run(): void {
        while (true) {
            this.execute_iteration();
        }
    }

    execute_iteration(): void {
        let direction: number = this.logic.getDirection(this.currentFloor, this.inside_button, this.asked_buttons);

        if (this.currentFloor + direction >= this.MIN_FLOOR && this.currentFloor + direction <= this.MAX_FLOOR) {
            this.currentFloor += direction;
            // Si l'ascenseur doit s'arrêter au nouvel étage
            if(this.logic.shouldStop(this.currentFloor, this.inside_button, this.asked_buttons)){
                // Si la personne est arrivée à son étage
                if(this.inside_button === this.currentFloor)this.inside_button = null;
                // Si l'étage d'arrivée est dans les étages appellés (extérieur)
                if(this.asked_buttons.includes(this.currentFloor)){
                    this.asked_buttons = this.asked_buttons.filter(floor => floor !== this.currentFloor);
                }
            }
            console.log("Lift moved_to " + this.currentFloor);
        }
    }

    press_call_button(floor: number): void {
        if (!this.asked_buttons.includes(floor)) {
            this.asked_buttons.push(floor);
        }
    }

    press_inside_button(floor: number) {
        this.inside_button = floor;
    }
}
