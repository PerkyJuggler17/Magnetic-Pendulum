class Complex {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add(other) {
        let result = new Complex(0, 0);
        result.a = this.a + other.a;
        result.b = this.b + other.b;
        return result;
    }

    subtract(other) {
        let result = new Complex(0, 0);
        result.a = this.a - other.a;
        result.b = this.b - other.b;
        return result;
    }

    multiply(other) {
        let result = new Complex(0, 0);
        result.a = this.a*other.a - this.b*other.b;
        result.b = this.a*other.b + this.b*other.a;
        return result;
    }

    divide(other) {
        let result = new Complex(0, 0);
        result.a = (this.a*other.a + this.b*other.b) / (other.a*other.a + other.b*other.b);
        result.b = (this.b*other.a - this.a*other.b) / (other.a*other.a + other.b*other.b);
        return result;
    }

    mag() {
        return sqrt(this.a*this.a + this.b*this.b);
    }
}