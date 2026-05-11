sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"ns/ddrmcap/test/integration/pages/ProcessList",
	"ns/ddrmcap/test/integration/pages/ProcessObjectPage"
], function (JourneyRunner, ProcessList, ProcessObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('ns/ddrmcap') + '/test/flp.html#app-preview',
        pages: {
			onTheProcessList: ProcessList,
			onTheProcessObjectPage: ProcessObjectPage
        },
        async: true
    });

    return runner;
});

