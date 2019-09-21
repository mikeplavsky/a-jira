process.env.headless_chrome = false;

let funcs = {};

beforeSuite = (f) => {
    funcs.beforeSuite = f;
};
afterSuite = (f) => {
    funcs.afterSuite = f;
};

beforeScenario = (f) => {
    funcs.beforeScenario = f;
};

step = (n,f) => {
    funcs[n]=f;
};

let steps = require('./tests/step_implementation.js');
console.log(funcs);

(async () => {
        
    steps.releases_spec.releases["RMADFE"] = [{name:"RMADFE"}];

    await funcs.beforeSuite(); 
    await funcs["Goto products page"]();
    await funcs["Go to <product> releases page"]("RMADFE");
    await funcs["See <product> releases are there"]("RMADFE");
})();
