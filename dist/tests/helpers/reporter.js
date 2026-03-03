const customReporter = require('./customReporter.js')

jasmine.getEnv().addReporter(new customReporter())
