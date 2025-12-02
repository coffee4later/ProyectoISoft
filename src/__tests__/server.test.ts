describe('NUestro Primer Test', function() {
    it('Debe revisar que 1+1 sea 2', function() {
        const resultado = 1 + 1;
        expect(resultado).toBe(2);
    });

    it('Debe revisar que 1+1 no sea 3', function() {
        const resultado = 1 + 1;
        expect(resultado).not.toBe(3);
    });
});