let authTemplate = {
    passwordAuth:`
            // Define Authentication object
            var kintoneAuth = new kintoneJSSDK.Auth();
            var username = '{{username}}';
            var password = '{{password}}';
            kintoneAuth.setPasswordAuth(username, password);
    `,
    apiTokenAuth:`
            // Define Authentication object
            var apiToken = '{{apiToken}}';
            kintoneAuth.setApiToken(apiToken);
    `,
    basicAuth:`
            // Define Authentication object
            var username = '{{username}}';
            var password = '{{password}}';
            kintoneAuth.setBasicAuth(username, password);
    `
}
let jsTemplate = [
    {
        path: 'record.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Get Records
            var app = {{app}};
            var id = '{{id}}';
            kintoneRecord.getRecord(app, id).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'records.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Get Records
            var app = {{app}};
            var query = '{{query}}';
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
    },
    {
        path: 'record.json',
        method: 'POST',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Get Records
            var app = {{app}};
            var record = {{record}}
            kintoneRecord.addRecord(app, record).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'record/comments.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Get Records
            var app = {{app}};
            var id = {{record}};
            var order = '{{order}}'; // asc or desc
            var offset = {{offset}};
            var limit = {{limit}};
            kintoneRecord.getComments(app, id, order, offset, limit).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    }
]
export {authTemplate}
export default jsTemplate