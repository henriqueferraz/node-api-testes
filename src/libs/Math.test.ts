import { Math } from "./Math";

describe('Testando a biblioteca Math', () => {

    it('Somar dois numeros corretamente', () => {
        const response = Math.sum(2, 1);
        expect(response).toBe(3);
    });

    it('Diminuir dois numeros corretamente', () => {
        const response = Math.sub(2, 1);
        expect(response).toBe(1);
    });

    it('Multiplicar dois numeros corretamente', () => {
        const response = Math.mut(2, 1);
        expect(response).toBe(2);
    });

    it('Dividir dois numeros corretamente', () => {
        const response = Math.div(2, 2);
        expect(response).toBe(1);

        const response2 = Math.div(3, 0);
        expect(response2).toBeFalsy();
    });
})

