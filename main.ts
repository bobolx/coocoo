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
    //% blockId="coocoo_motor" block="电机 左 速度%leftSpeed| 右 速度%rightSpeed"
    //% speed.min=-1023 speed.max=1023
    //% weight=100
    export function motorRun(leftSpeed: number, rightSpeed: number): void {
        let leftRotation = 0x0;
        if(leftSpeed < 0){
            leftRotation = 0x1;
        }

        let rightRotation = 0x0;
        if(rightSpeed < 0){
            rightRotation = 0x1;
        }
        
       //左电机
        pins.analogWritePin(AnalogPin.P15, Math.abs(leftSpeed));
        pins.digitalWritePin(DigitalPin.P12, leftRotation);
        
        //右电机
        pins.analogWritePin(AnalogPin.P1, Math.abs(rightSpeed));
        pins.digitalWritePin(DigitalPin.P8, rightRotation);
        
    }


    /**
     * 停止单个电机
     */
    //% blockId="coocoo_stop" block="电机 停止 %direction"
    //% weight=99
    export function motorStop(direction: MotorDirection): void {
        if(direction == MotorDirection.left){
            pins.analogWritePin(AnalogPin.P15, 0);
            pins.digitalWritePin(DigitalPin.P12, 0);
        }
        if(direction == MotorDirection.right){
            pins.analogWritePin(AnalogPin.P1, 0);
            pins.digitalWritePin(DigitalPin.P8, 0);
        }
    }


    /**
     * 停止所有电机
     */
    //% weight=10
    //% blockId="coocoo_stopAll" block="停止所有电机"
    export function motorStopAll(): void {
        //右电机
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        //左电机
        pins.analogWritePin(AnalogPin.P15, 0);
        pins.digitalWritePin(DigitalPin.P12, 0);
    }

}


