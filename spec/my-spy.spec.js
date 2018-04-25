describe("First spy", () => {
    var dog, gsd = null;
    beforeEach(() => {
        dog = {
            setType: (value) => {
                gsd = value;
            }
        };
        spyOn(dog, 'setType');
        dog.setType('black German Shepherd');
        dog.setType('white German Shepherd', 'male');

    });

    it("spy setType was called", () => {
        expect(dog.setType).toHaveBeenCalled();
    });

    it("track all arguments of its calls", () => {
        expect(dog.setType).toHaveBeenCalledWith('black German Shepherd');
        expect(dog.setType).toHaveBeenCalledWith('white German Shepherd', 'male');
    })

});

