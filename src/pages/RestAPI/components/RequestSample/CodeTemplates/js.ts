let jsTemplate = [
    {
        path: 'records.json',
        method: 'GET',
        template: `
            // Define Authentication object
            var kintoneAuth = new kintoneJSSDK.Auth();
            var username = '{{username}}';
            var password = '{{password}}';
            kintoneAuth.setPasswordAuth(username, password);
        
            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Get Records
            var app = {{app}};
            var query = '{{query}';
            var fields = [
                '{{fields}}'
            ]
            var totalCount = {{totalCount}};
            kintoneRecord.getRecords(app, query, fields, totalCount).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    }
]

export default jsTemplate