# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).



## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.

## Run the application

**1.  	Running the app locally**

In order to run the app locally, using sqlite:

- Specify sqlite as the database:

**npm add @cap-js/sqlite **

IF YOU JUST INSTALLED THE APP FROM GIT Run:

cds deploy

This will create the database


- **Perform cds watch.**

**.  2	       Running the app as a hybrid**

- **Login to BTP using cf login
- Choose the appropriate space
- Perform cds watch --profile hybrid**



**.  3	 Running the app constraint:**

When running the app locally:

In manifest.json:

 **"dataSources": {
      "mainService": {
        "uri": "/odata/v4/service/ddrm/",
        "type": "OData",
        "settings": {
          "annotations": [],
          "odataVersion": "4.0",
          "localUri": "locakService/metadata.xml"
        }
      }
    },**

The URI must contain the initial /

When uploading the app the URI must be:

**"uri": "odata/v4/service/ddrm/"**,


**4.  	Deploy the app to BTP**

Perform the following:

**- cf login --sso  # to log on to BTP
 - Choose the space
 -cds add hana – use the hana database
-	cds add xsuaa
-	npm install --package-lock-only (For good measure)
-	cds up
- cf push ddrm-srv



**5.  	Deploying the app constraint:**

When deploying:

In manifest.json:

 **"dataSources": {
      "mainService": {
        "uri": "odata/v4/service/ddrm/",
        "type": "OData",
        "settings": {
          "annotations": [],
          "odataVersion": "4.0",
          "localUri": "locakService/metadata.xml"
        }
      }
    },**

 Remove the initial /

6.  	Gitlab

In order to push the developments to Gitlab do:

**-	git init
-	git add .
-	git commit -m "Push LKWMonitor project to GitLab" 
-	git remote add origin https://github.com/aspirac/LKWMonitor.git
-	git push 


