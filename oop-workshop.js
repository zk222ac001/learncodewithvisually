'use strict';
(function(root){
const examples={
 single:{nodes:['Device','Sensor'],edges:[[1,0]],positions:[[1,0],[1,1]],output:'7\n42\n',trace:[{code:'Sensor sensor(7);',active:[0,1],output:''},{code:'sensor.id()',active:[0,1],output:'7\n'},{code:'sensor.read()',active:[1],output:'7\n42\n'}],code:`#include <iostream>
class Device {
    int id_;
public:
    explicit Device(int id) : id_(id) {}
    int id() const { return id_; }
};
class Sensor : public Device {
public:
    explicit Sensor(int id) : Device(id) {}
    int read() const { return 42; }
};
int main() {
    Sensor sensor(7);
    std::cout << sensor.id() << '\\n';
    std::cout << sensor.read() << '\\n';
}
`},
 multiple:{nodes:['Sensor','Logger','FieldUnit'],edges:[[2,0],[2,1]],positions:[[0,0],[2,0],[1,1]],output:'reading=21\n',trace:[{code:'FieldUnit unit;',active:[0,1,2],output:''},{code:'read()',active:[0],output:''},{code:'log(read());',active:[1,2],output:'reading=21\n'}],code:`#include <iostream>
class Sensor {
public:
    int read() const { return 21; }
};
class Logger {
public:
    void log(int reading) const {
        std::cout << "reading=" << reading << '\\n';
    }
};
class FieldUnit : public Sensor, public Logger {
public:
    void report() const { log(read()); }
};
int main() {
    FieldUnit unit;
    unit.report();
}
`},
 multilevel:{nodes:['Entity','Device','Camera'],edges:[[1,0],[2,1]],positions:[[1,0],[1,1],[1,2]],output:'7\nframe\n',trace:[{code:'Camera camera(7);',active:[0,1,2],output:''},{code:'camera.id()',active:[0,2],output:'7\n'},{code:'camera.capture()',active:[2],output:'7\nframe\n'}],code:`#include <iostream>
class Entity {
    int id_;
public:
    explicit Entity(int id) : id_(id) {}
    int id() const { return id_; }
};
class Device : public Entity {
public:
    explicit Device(int id) : Entity(id) {}
};
class Camera : public Device {
public:
    explicit Camera(int id) : Device(id) {}
    void capture() const { std::cout << "frame\\n"; }
};
int main() {
    Camera camera(7);
    std::cout << camera.id() << '\\n';
    camera.capture();
}
`},
 hierarchical:{nodes:['Device','Camera','Speaker'],edges:[[1,0],[2,0]],positions:[[1,0],[0,1],[2,1]],output:'2:frame\n3:beep\n',trace:[{code:'Camera camera(2);',active:[0,1],output:''},{code:'Speaker speaker(3);',active:[0,2],output:''},{code:'camera.capture();',active:[1],output:'2:frame\n'},{code:'speaker.play();',active:[2],output:'2:frame\n3:beep\n'}],code:`#include <iostream>
class Device {
    int id_;
public:
    explicit Device(int id) : id_(id) {}
    int id() const { return id_; }
};
class Camera : public Device {
public:
    explicit Camera(int id) : Device(id) {}
    void capture() const { std::cout << id() << ":frame\\n"; }
};
class Speaker : public Device {
public:
    explicit Speaker(int id) : Device(id) {}
    void play() const { std::cout << id() << ":beep\\n"; }
};
int main() {
    Camera camera(2);
    Speaker speaker(3);
    camera.capture();
    speaker.play();
}
`},
 diamond:{nodes:['Unit','Camera','Radio','Rover'],edges:[[1,0],[2,0],[3,1],[3,2]],positions:[[1,0],[0,1],[2,1],[1,2]],output:'9\ntrue\n',trace:[{code:'Rover rover(9);',active:[0,1,2,3],output:''},{code:'rover.id()',active:[0,3],output:'9\n'},{code:'(viaCamera == viaRadio)',active:[0,1,2],output:'9\ntrue\n'}],code:`#include <iostream>
class Unit {
    int id_;
public:
    explicit Unit(int id) : id_(id) {}
    int id() const { return id_; }
};
class Camera : virtual public Unit {
public:
    Camera() : Unit(1) {}
};
class Radio : virtual public Unit {
public:
    Radio() : Unit(2) {}
};
class Rover : public Camera, public Radio {
public:
    // The most-derived class initializes the shared virtual base.
    explicit Rover(int id) : Unit(id), Camera(), Radio() {}
};
int main() {
    Rover rover(9);
    Unit* viaCamera = static_cast<Camera*>(&rover);
    Unit* viaRadio = static_cast<Radio*>(&rover);
    std::cout << rover.id() << '\\n';
    std::cout << std::boolalpha << (viaCamera == viaRadio) << '\\n';
}
`},
 protected:{nodes:['Meter','CalibratedMeter'],edges:[[1,0]],positions:[[1,0],[1,1]],output:'42\n',trace:[{code:'CalibratedMeter meter;',active:[0,1],output:''},{code:'raw() + 2',active:[0,1],output:''},{code:'meter.read()',active:[1],output:'42\n'}],code:`#include <iostream>
class Meter {
    int raw_ = 40; // private: derived code cannot name this field.
protected:
    int raw() const { return raw_; }
public:
    virtual ~Meter() = default;
};
class CalibratedMeter : public Meter {
public:
    int read() const { return raw() + 2; }
};
int main() {
    CalibratedMeter meter;
    std::cout << meter.read() << '\\n';
    // meter.raw();  // Not allowed: raw() is protected.
    // meter.raw_;   // Not allowed: raw_ is private.
}
`},
 overloading:{nodes:['show(int)','show(double)'],edges:[],positions:[[0,0],[2,0]],output:'integer:3\ndecimal:3.5\n',trace:[{code:'show(3);',active:[0],output:'integer:3\n'},{code:'show(3.5);',active:[1],output:'integer:3\ndecimal:3.5\n'}],code:`#include <iostream>
void show(int value) {
    std::cout << "integer:" << value << '\\n';
}
void show(double value) {
    std::cout << "decimal:" << value << '\\n';
}
int main() {
    show(3);   // int argument selects show(int).
    show(3.5); // double argument selects show(double).
}
`},
 overriding:{nodes:['Notifier','Screen','Speaker'],edges:[[1,0],[2,0]],positions:[[1,0],[0,1],[2,1]],output:'screen\nspeaker\n',trace:[{code:'Screen screen;',active:[0,1],output:''},{code:'Speaker speaker;',active:[0,2],output:''},{code:'announce(screen);',active:[0,1],output:'screen\n'},{code:'announce(speaker);',active:[0,2],output:'screen\nspeaker\n'}],code:`#include <iostream>
class Notifier {
public:
    virtual void notify() const = 0;
    virtual ~Notifier() = default;
};
class Screen : public Notifier {
public:
    void notify() const override { std::cout << "screen\\n"; }
};
class Speaker : public Notifier {
public:
    void notify() const override { std::cout << "speaker\\n"; }
};
void announce(const Notifier& target) {
    target.notify(); // Virtual call through the base reference.
}
int main() {
    Screen screen;
    Speaker speaker;
    announce(screen);
    announce(speaker);
}
`}
};
if(typeof module==='object'&&module.exports)module.exports=examples;else root.OOPWorkshop=examples;
})(typeof window==='undefined'?globalThis:window);
