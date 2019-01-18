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
        path: 'records.json',
        method: 'POST',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Get Records
            var app = {{app}};
            var records = {{records}}
            kintoneRecord.addRecords(app, records).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'record.json',
        method: 'PUT',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            var app = {{app}};
            var record = {{record}};
            var revision = '{{revision}}';

            // Update Record by ID
            var id = {{id}}
            kintoneRecord.updateRecordById(app, id, record, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Update Record by UpdateKey
            var updateKey = {{updateKey}};
            kintoneRecord.updateRecordByUpdateKey(app, updateKey, record, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'records.json',
        method: 'PUT',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            var app = {{app}};
            var records = {{records}};

            // Update Records
            kintoneRecord.updateRecords(app, records).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'records.json',
        method: 'DELETE',
        transformer:{
            revisionObj: ({ids, revisions}: any): object => {
                let returnData = {}
                ids.forEach((recordID: any, index:number)=>{
                    returnData[recordID] = revisions[index]
                })
                return returnData
            }
        },
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            var app = {{app}};
            var ids = {{ids}};
            var revisions = {{revisions}};

            // Delete Records without Revision
            kintoneRecord.deleteRecords(app, ids).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Delete Records with Revision
            var idsWithRevision = {{revisionObj}};

            kintoneRecord.deleteRecordsWithRevision(app, idsWithRevision).then((rsp) => {
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

            // Get Record Comments
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
    },
    {
        path: 'record/comment.json',
        method: 'POST',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Add Record Comment
            var app = {{app}};
            var id = {{record}};
            var comment = {{comment}};
            kintoneRecord.addComment(app, record, comment).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'record/comment.json',
        method: 'DELETE',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init record instance
            var kintoneRecord = new kintoneJSSDK.Record(connection);

            // Add Record Comment
            var app = {{app}};
            var record = {{record}};
            var comment = {{comment}};
            kintoneRecord.deleteComment(app, record, comment).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'app.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get App
            var appID = {{id}};
            kintoneApp.getApp(appID).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'apps.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get Apps
            var limit = {{limit}};
            var offset = {{offset}};
            kintoneApp.getApps(offset, limit).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get Apps by IDs
            var appIDs = {{ids}};
            kintoneApp.getAppsByIDs(appIDs, offset, limit).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get Apps by Codes
            var codes = {{codes}};
            kintoneApp.getAppsByCodes(codes, offset, limit).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get Apps By Name
            var name = '{{name}}';
            kintoneApp.getAppsByName(name, offset, limit).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get Apps By Space IDs
            var spaceIds = {{spaceIds}};
            kintoneApp.getAppsBySpaceIDs(spaceIds, offset, limit).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app.json',
        method: 'POST',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Add Preview App
            var name = '{{name}}';
            var space = {{space}};
            var thread = {{thread}};
            kintoneApp.addPreviewApp(name, space, thread).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/deploy.json',
        method: 'POST',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Deploy App Settings
            var apps = {{apps}};
            var revert = {{revert}};
            kintoneApp.deployAppSettings(apps, revert).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/deploy.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Deploy App Settings
            var apps = {{apps}};
            kintoneApp.getAppDeployStatus(apps).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'app/form/fields.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get Form Field
            var app = {{app}};
            var lang = {{lang}};
            kintoneApp.getFormFields(app, lang).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get a pre-live (preview) form fields
            var isPreview = true;
            kintoneApp.getFormFields(app, lang, isPreview).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/form/fields.json',
        method: 'POST',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Add Form Field
            var app = {{app}};
            var properties = {{properties}};
            var revistion = {{revision}};
            kintoneApp.addFormFields(app, properties, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/form/fields.json',
        method: 'PUT',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Update Form Field
            var app = {{app}};
            var properties = {{properties}};
            var revistion = {{revision}};
            kintoneApp.updateFormFields(app, properties, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/form/fields.json',
        method: 'DELETE',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Delete Form Field
            var app = {{app}};
            var fields = {{fields}};
            var revistion = {{revision}};
            kintoneApp.deleteFormFields(app, fields, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'app/form/layout.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get Form Layout
            var app = {{app}};
            kintoneApp.getFormLayout(app).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get a preview (pre-live) form layout
            var isPreview = true;
            kintoneApp.getFormLayout(app, isPreview).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/form/layout.json',
        method: 'PUT',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Update Form Layout
            var app = {{app}};
            var layout = {{layout}};
            var revision = '{{revision}}';
            kintoneApp.updateFormLayout(app, layout, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'app/views.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get Views
            var app = {{app}};
            var lang = {{lang}};
            var revision = '{{revision}}';
            kintoneApp.getViews(app, lang).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });

            // Get a pre-live (preview) views
            var isPreview = true;
            kintoneApp.getViews(app, lang, isPreview).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'preview/app/views.json',
        method: 'PUT',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get Views
            var app = {{app}};
            var views = {{views}};
            var revision = '{{revision}}';
            kintoneApp.updateViews(app, views, revision).then((rsp) => {
                console.log(rsp);
            }).catch((err) => {
                // This SDK return err with KintoneAPIExeption
                console.log(err.get());
            });
        `
    },
    {
        path: 'app/settings.json',
        method: 'GET',
        template: `
            {{authTemplate}}    

            // Define connection that included auth
            var kintoneConnection = new kintoneJSSDK.Connection(kintoneAuth);

            // Init app instance
            var kintoneApp = new kintoneJSSDK.App(connection);

            // Get General Setting
            var app = {{app}};
            var lang = {{lang}};
            var isPreview = {{revision}};
            kintoneApp.getGeneralSettings(app, lang, revision).then((rsp) => {
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