import {sorted_impl} from "./epics.component"
import { exportAllDeclaration } from "@babel/types";

describe ('Sorted epics', () => {

    it ( 'sort it by points', () => {
        let epics = {
            a: {points:10}, 
            b: {points:12}, 
            c: {points:15}};

        let keyvalue = sorted_impl(
            Object.entries(epics).map(e => {
                return {key:e[0],value:e[1]};
            }));

        expect(keyvalue[0]).toEqual({
            key:"c", 
            value:{points:15}});

    });

});