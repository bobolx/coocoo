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

enum ToneHzTable {
    do = 262,
    re = 294,
    mi = 330,
    fa = 349,
    sol = 392,
    la = 440,
    si = 494
}

enum BeatList {
    //% block="八分之一"
    EIGHTH = 50,
    //% block="四分之一"
    QUARTER = 100,
    //% block="二分之一"
    HALF = 200,
    //% block="整拍"
    FULL = 400,
    //% block="双拍""
    DOUBLE = 800
}

// enum Patrol{
//     //% block="左侧"
//     PatrolLeft=13,
//     //% block="右侧"
//     PatrolRight=14
// }

enum Patrol{
    //% block="□□"
    white_white = 1,
    //% block="□■"
    white_black = 2,
    //% block="■□"
    black_white = 3,
    //% block="■■"
    black_black = 4,
}

//% weight=70 icon="\uf0e7" color=#1B80C4
namespace CooCoo {
    /**
     * 设置电机
     */
    //% blockId="coocoo_motor" block="电机 左 速度%leftSpeed| 右 速度%rightSpeed"
    //% leftSpeed.min=-1023 leftSpeed.max=1023
    //% rightSpeed.min=-1023 rightSpeed.max=1023
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
    //% weight=98
    //% blockId="coocoo_stopAll" block="停止所有电机"
    export function motorStopAll(): void {
        //右电机
        pins.analogWritePin(AnalogPin.P1, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        //左电机
        pins.analogWritePin(AnalogPin.P15, 0);
        pins.digitalWritePin(DigitalPin.P12, 0);
    }

    /**
     * 设置蜂鸣器
     */
    //% weight=89
    //% blockId="coocoo_buzz" block="播放音符 %tone| 节拍 %beat"
    export function buzz(tone: ToneHzTable, beat: BeatList): void {

        let buf = pins.createBuffer(4);

        buf[0] = 262&0xff;
        buf[1] =  (262>>8)&0xff;
        buf[2] = 400&0xff;
        buf[3] =  (400>>8)&0xff;

        // pins.analogWritePin(AnalogPin.P0, 1);
        // pins.analogWritePin(AnalogPin.P0, 1);
        // pins.analogWritePin(AnalogPin.P0, 0);

        // pins.analogWritePin(AnalogPin.P0, 1);

        // pins.analogWritePin(AnalogPin.P0, 1);
        // pins.analogWritePin(AnalogPin.P0, 0);
        // pins.analogWritePin(AnalogPin.P0, 0);

        // pins.analogWritePin(AnalogPin.P0, 1);
        // pins.analogWritePin(AnalogPin.P0, 0);
        // pins.analogWritePin(AnalogPin.P0, 0);
        // pins.analogWritePin(AnalogPin.P0, 0);
        // pins.analogWritePin(AnalogPin.P0, 0);

        // pins.analogWritePin(AnalogPin.P0, 1);

        pins.analogWritePin(AnalogPin.P0, 1023);
        //pins.i2cWriteBuffer(0x02, buf);
    }

    //% weight=79
    //% blockId=coocoo_patrol block="巡线传感器 %patrol"
    export function readPatrol(patrol:Patrol):boolean{

        // let p1 = pins.digitalReadPin(DigitalPin.P13);
        // let p2 = pins.digitalReadPin(DigitalPin.P14);

        if(patrol == Patrol.white_white){
            if(pins.digitalReadPin(DigitalPin.P13) == 0 && pins.digitalReadPin(DigitalPin.P14) == 0){
                return true;
            }else{
                return false;
            }
        }

        if(patrol == Patrol.white_black){
            if(pins.digitalReadPin(DigitalPin.P13) == 0 && pins.digitalReadPin(DigitalPin.P14) == 1){
                return true;
            }else{
                return false;
            }
        }

        if(patrol == Patrol.black_white){
            if(pins.digitalReadPin(DigitalPin.P13) == 1 && pins.digitalReadPin(DigitalPin.P14) == 0){
                return true;
            }else{
                return false;
            }
        }

        if(patrol == Patrol.black_black){
            if(pins.digitalReadPin(DigitalPin.P13) == 1 && pins.digitalReadPin(DigitalPin.P14) == 1){
                return true;
            }else{
                return false;
            }
        }
    }

    //% blockId=coocoo_sensor block=" 障碍物距离 cm"
    //% weight=69
    export function sensor(maxCmDistance = 500): number {
        // send pulse
        // pins.setPull(DigitalPin.P2, PinPullMode.PullNone);
        // pins.digitalWritePin(DigitalPin.P2, 0);
        // control.waitMicros(2);
        // pins.digitalWritePin(DigitalPin.P2, 1);
        // control.waitMicros(10);
        // pins.digitalWritePin(DigitalPin.P2, 0);  

        // read pulse
        let d = pins.pulseIn(DigitalPin.P2, PulseValue.High, maxCmDistance * 42);
        console.log("Distance: " + d/42);
        
        basic.pause(50)

        return d / 42;
    }

}


