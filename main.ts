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
    //% speed.min=0 speed.max=1023
    //% weight=100
    export function motorRun(direction: MotorDirection, rotation: MotorRotation, speed: number): void {
        let rota = 0x0;
        if(rotation == MotorRotation.fan){
            rota = 0x1;
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


    /**
     * 停止单个电机
     */
    //% blockId="coocoo_stop" block="电机 停止 %direction"
    //% weight=99
    export function motorStop(direction: MotorDirection): void {
        if(direction == MotorDirection.left){
            pins.analogWritePin(AnalogPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P8, 0);
        }
        if(direction == MotorDirection.right){
            pins.analogWritePin(AnalogPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P12, 0);
        }
    }


    /**
     * 停止所有电机
     */
    //% weight=10
    //% blockId="coocoo_stopAll" block="停止所有电机"
    export function motorStopAll(): void {
        //左电机
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        //右电机
        pins.analogWritePin(AnalogPin.P15, 0);
        pins.digitalWritePin(DigitalPin.P12, 0);
    }

}


