"use strict";
class CustomReporter {
    constructor() {
        this.suiteMap = {};
        this.suiteStack = [];
        this.currentSuiteId = 0;
    }
    jasmineStarted(result) {
        // Start
    }
    suiteStarted(result) {
        this.currentSuiteId = result.id;
        this.suiteStack.push({ name: result.description, id: result.id });
        // Initialize suite map with the top-level suite
        if (!this.suiteMap[result.description]) {
            this.suiteMap[result.description] = {
                name: result.description,
                specs: []
            };
        }
    }
    specDone(result) {
        // Get the current top-level suite name
        let suiteName = 'Tests';
        if (this.suiteStack.length > 0) {
            suiteName = this.suiteStack[0].name;
        }
        if (!this.suiteMap[suiteName]) {
            this.suiteMap[suiteName] = {
                name: suiteName,
                specs: []
            };
        }
        this.suiteMap[suiteName].specs.push({
            name: result.description,
            status: result.status,
            messages: result.failureMessages
        });
    }
    suiteDone(result) {
        // Remove from stack when suite is done
        this.suiteStack = this.suiteStack.filter((s) => s.id !== result.id);
    }
    jasmineDone(result) {
        console.log('\n');
        Object.keys(this.suiteMap).forEach((suiteName) => {
            const suiteData = this.suiteMap[suiteName];
            const specs = suiteData.specs;
            if (specs.length > 0) {
                console.log(`${suiteData.name} (${specs.length} tests):`);
                console.log('');
                specs.forEach((spec) => {
                    const symbol = spec.status === 'passed' ? '✓' : '✕';
                    const color = spec.status === 'passed' ? '\x1b[32m' : '\x1b[31m'; // Green for pass, Red for fail
                    const reset = '\x1b[0m';
                    console.log(`${color}${symbol} ${spec.name}${reset}`);
                    if (spec.messages && spec.messages.length > 0) {
                        spec.messages.forEach((msg) => {
                            console.log(`  ${msg}`);
                        });
                    }
                });
                console.log('');
            }
        });
    }
}
module.exports = CustomReporter;
