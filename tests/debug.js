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

require('./step_implementation.js');
console.log(funcs);

(async () => {
    await funcs.beforeSuite(); 
    await funcs["<product> has <query> stories"]("RMADFE","BMR");
    await funcs["Go to <product> search page"]("RMADFE");
    //await funcs["Search for <query>"]("BMR");
})();
