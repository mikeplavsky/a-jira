import {velocity, prediction_of_sprints, days} from "./release.component";

describe ('Number of done days', () => {

    it ( 'in not yet done release', () => {

        const d = days({
            startDate:"Jun 24, 2019", 
            releaseDate:"Dec 20, 2019"},
            false,
            () => new Date("09 Jul 2019"))
        
        expect(d).toEqual(15);
    });

    it ( 'in done release', () => {

        const d = days({
            startDate:"Jun 24, 2019", 
            releaseDate:"Dec 20, 2019"},
            false,
            () => new Date("21 Dec 2019"))
        
        expect(d).toEqual(179);
    });

    it ( 'in future release', () => {

        const d = days({
            startDate:"Jun 24, 2019", 
            releaseDate:"Dec 20, 2019"},
            false,
            () => new Date("21 Jun 2019"))
        
        expect(d).toEqual(0);
    });

});

describe ('Number of release days', () => {

    it ( 'in already done release', () => {

        const d = days({
            startDate:"Feb 20, 2019", 
            releaseDate:"Jun 24, 2019"},
            true,
            () => new Date("01 Jan 2020"))

        expect(d).toEqual(124);
    });

    it ( 'in not yet done release', () => {

        const d = days({
            startDate:"Jun 24, 2019", 
            releaseDate:"Dec 24, 2019"},
            true,
            () => new Date("01 Aug 2019"))

        expect(d).toEqual(183);
    });

});

describe ( 'Number of left sprints prediction', () => {

    it ( 'should be 0 sprints if there is no velocity', () => {

        const p = prediction_of_sprints({},0);
        expect(p).toEqual(0);

    });

    it ( 'should be the right number of sprints if there is the velocity', () => {

        const p = prediction_of_sprints({
            points: 100,
            done_points: 20},
            10);

        expect(p).toEqual(3);

    });

});

describe ('10 days velocity', () => {

    it ('should be 0 if no days have gone for release', () => {

        const v = velocity({}, 0);
        expect(v).toEqual(0);

    });

    it ('should be right if there are done points', () => {

        const v = velocity({done_points:20}, 10);
        expect(v).toEqual(28);

    });

});