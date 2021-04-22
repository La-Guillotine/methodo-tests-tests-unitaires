export class LiftLogic {

    getDirection(currentFloor: number, askedFloor: number, calledFloors: Array<number>): number {
        let floorToMoveTo: number = this.getFloor(currentFloor, askedFloor, calledFloors);
        if (floorToMoveTo == null || currentFloor == floorToMoveTo) {
            return 0;
        } else if (floorToMoveTo > currentFloor) {
            return 1;
        }
        return -1;
    }

    getFloor(currentFloor: number, askedFloor: number, calledFloors: Array<number>): number {
        if (askedFloor != null) {
            return askedFloor;
        } else if (calledFloors != null && calledFloors.length > 0) {
            let delta: number = null;
            let result: number = null;

            calledFloors.forEach( floor => {
                let currentDelta: number = Math.abs(currentFloor - floor);
                if (delta == null || delta > currentDelta) {
                    delta = currentDelta;
                    result = floor;
                }
            });
            return result;
        }
        return null;
    }

    shouldStop(currentFloor: number, askedFloor: number, calledFloors: Array<number>): boolean {
        return (askedFloor != null && currentFloor == askedFloor) || calledFloors.includes(currentFloor);
    }

}
