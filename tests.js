'use strict'
const expect = chai.expect
const should = chai.should()


describe('chop test', function () {


    it("should work", function () {
        const testData = deepFreeze([1, 3, 5, 7])

        const expected = [{
                toFind: 1,
                result: 0
            },
            {
                toFind: 3,
                result: 1
            },
            {
                toFind: 5,
                result: 2
            },
            {
                toFind: 7,
                result: 3
            },
            {
                toFind: 8,
                result: -1
            }
        ].freeze()


        for (const item of expected) {
            expect(chop(testData, item.toFind)).to.equals(item.result)
        }

    })
})


describe("getStartTime", function () {


    it("getStartTime", function () {
        var schedules = [
            [
                ['09:00', '11:30'],
                ['13:30', '16:00'],
                ['16:00', '17:30'],
                ['17:45', '19:00']
            ],
            [
                ['09:15', '12:00'],
                ['14:00', '16:30'],
                ['17:00', '17:30']
            ],
            [
                ['11:30', '12:15'],
                ['15:00', '16:30'],
                ['17:45', '19:00']
            ]
        ];
        
        getStartTime(schedules,60)
        //Test.assertEquals(getStartTime(schedules, 60), '12:15');
        //Test.assertEquals(getStartTime(schedules, 90), null);

    })

})

describe('sudoku', function () {

    it('sudoku', function () { 
                 expect(sudoku([[5, 3, 4, 6, 7, 8, 9, 1, 2], 
                                [6, 7, 2, 1, 9, 5, 3, 4, 8],
                                [1, 9, 8, 3, 4, 2, 5, 6, 7],
                                [8, 5, 9, 7, 6, 1, 4, 2, 3],
                                [4, 2, 6, 8, 5, 3, 7, 9, 1],
                                [7, 1, 3, 9, 2, 4, 8, 5, 6],
                                [9, 6, 1, 5, 3, 7, 2, 8, 4],
                                [2, 8, 7, 4, 1, 9, 6, 3, 5],
                                [3, 4, 5, 2, 8, 6, 1, 7, 9]])).to.equals(true);
                                
         expect(sudoku([[5, 3, 4, 6, 7, 8, 9, 1, 2], 
                                 [6, 7, 2, 1, 9, 0, 3, 4, 8],
                                 [1, 0, 0, 3, 4, 2, 5, 6, 0],
                                 [8, 5, 9, 7, 6, 1, 0, 2, 0],
                                 [4, 2, 6, 8, 5, 3, 7, 9, 1],
                                 [7, 1, 3, 9, 2, 4, 8, 5, 6],
                                 [9, 0, 1, 5, 3, 7, 2, 1, 4],
                                 [2, 8, 7, 4, 1, 9, 6, 3, 5],
                                 [3, 0, 0, 4, 8, 1, 1, 7, 9]])).to.equals(false);




    })
    
})
 
describe('priority queue tests', function () {


    it('should keep order', function () {
        const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        testData.sort(()=>Math.random()-0.5)

        const queue = new priorityQueue((x,y)=>x>y)
        
        for (const item of testData) { 
            queue.add(item)
        }

        for (let i = 1; i < 10; i++) { 
            expect(queue.pop()).to.equal(i)
        }
        expect(queue.pop()).to.equal(undefined)
        
     })


})
 

describe('dikstra test', function () {


    it('should work', function () { 
        var roads = [
            {from: 0, to: 1, drivingTime: 5},
            {from: 0, to: 2, drivingTime: 10},
            {from: 1, to: 2, drivingTime: 10},
            {from: 1, to: 3, drivingTime: 2},
            {from: 2, to: 3, drivingTime: 2},
            {from: 2, to: 4, drivingTime: 5},
            {from: 3, to: 2, drivingTime: 2},
            {from: 3, to: 4, drivingTime: 10}
        ];

        const res = navigate(5, roads, 0, 4)
        expect(navigate(5, roads, 0, 4)).to.eql([0, 1, 3, 2, 4])
        
    })



 })

