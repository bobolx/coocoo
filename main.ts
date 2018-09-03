enum MotorRotation {
    //% block="正转"
    zheng,
    //% block="反转"
    fan
}

enum MotorDirection {
    //% block="左侧"
    left,
    //% block="右侧"
    right
}

//% weight=70 icon="\uf0e7" color=#1B80C4
namespace CooCoo {
    
    /**
     * 设置电机
     */
    //% blockId="coocoo_motor" block="电机 %direction|方向 %rotation|速度 %speed"
    //% speed.min=0 speed.max=255
    //% weight=108
    export function motorRun(direction: MotorDirection, rotation: MotorRotation, speed: number): void {
        let rota = 1;
        if(rotation == MotorRotation.fan){
            rota = 0;
        }
        if(direction == MotorDirection.left){
            pins.analogWritePin(AnalogPin.P1, speed);
            pins.digitalWritePin(DigitalPin.P8, rota);
        }
        if(direction == MotorDirection.right){
            pins.analogWritePin(AnalogPin.P15, speed);
            pins.digitalWritePin(DigitalPin.P12, rota);
        }
    }

}


