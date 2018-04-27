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

    it("track its call with one argument", () => {
        expect(dog.setType).toHaveBeenCalledWith('black German Shepherd');
    });

    it("track its call with 2 arguments", () => {
        expect(dog.setType).toHaveBeenCalledWith('white German Shepherd', 'male');
    });

    it("stop all execution on a function", () => {
        expect(gsd).toBeNull();
    });

});

describe("spy, using call through", () => {
    let dog, gsd, fetchedGsd;

    beforeEach(() => {
        dog = {
            setGsd: (value) => {
                gsd = value;
            },
            getGsd: () => {
                return gsd;
            }
        };

        spyOn(dog, 'getGsd').and.callThrough();
        dog.setGsd('sable');
        fetchedGsd = dog.getGsd();
    });

    afterEach(() => {
        dog = null;
        gsd = null;
        fetchedGsd = null;
    });

    it("spy was called", () => {
        expect(dog.getGsd).toHaveBeenCalled();
    });

    it("should not affect other functions", () => {
        expect(gsd).toEqual('sable');
    });

    it("when called returns the requested value", () => {
        expect(fetchedGsd).toEqual('sable');
    });
});


describe("spy, using fakecall", () => {
    let dog, gsd, fetchedGsd, speak;

    beforeEach(() => {
        dog = {
            setGsd: (value) => {
                gsd = value;
            },
            getGsd: () => {
                return gsd;
            },
            bark: () => {
                speak = 'wooof, wooof...';
                return speak;
            }
        };

        spyOn(dog, 'bark').and.returnValue('wooof, wooof...');
        spyOn(dog, 'getGsd').and.callFake(function (arguments, can, be, received) {
            return 'black';
        })
        dog.bark();
        dog.setGsd('sable');
        fetchedGsd = dog.getGsd();
    });

    afterEach(() => {

    });

    it("spy was called", () => {
        expect(dog.bark).toHaveBeenCalled();
    });

    it("should not affect other functions", () => {
        const dogspeak = dog.bark();
        expect(dogspeak).toContain('wooof, wooof...');
    });

    it("gsd to be sable", () => {
        expect(gsd).toEqual('sable');
    });

    it("fetchedGsd call Fake to be black", () => {
        expect(fetchedGsd).not.toEqual('sable');
        expect(fetchedGsd).toEqual('black');
    });
});

describe("This spy is configured to throw an error", () => {
    let cat, color;
    beforeEach(() => {
        cat = {
            setColor: (value) => {
                color = value;
            }
        };
        spyOn(cat, "setColor").and.throwError("bright light");
    });

    it("throw the value", () => {
        expect(() => {
            cat.setColor("black")
        }).toThrowError("bright light");
    });
});

describe("a spy using callThrough and Stub", () => {
    var foo, count = null;
    beforeEach(function () {
        foo = {
            setCount: function (value) {
                count = value;
            }
        };

        spyOn(foo, 'setCount').and.callThrough();
    });

    it("call through and stub in this spec", () => {
        foo.setCount(500);
        expect(count).toEqual(500);

        foo.setCount.and.stub();
        count = null;

        foo.setCount(345);
        expect(count).toBe(null);
    });
});

describe("test a spy calls", () => {
    let foo, count = null;

    beforeEach(() => {
        foo = {
            setCount: (value) => {
                count = value;
            }
        };

        spyOn(foo, 'setCount');
    });

    it("track that setCount is called", () => {
        expect(foo.setCount.calls.any()).toEqual(false);
        foo.setCount(1234);
        expect(foo.setCount.calls.any()).toEqual(true);
    });


})


