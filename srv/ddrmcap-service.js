
const cds = require ('@sap/cds');
const { redacted } = require('@sap/cds/lib/utils/cds-utils');
const { Readable, PassThrough } = require("stream");

class DDRMService extends cds.ApplicationService {
init() {

  /**
   * Reflect definitions from the service's CDS model
   */
  const { Process, ProcessType, ProcessStatus } = this.entities


 
  
  /**
   * Fill in primary keys for Process.
   * Note: In contrast to Bookings and BookingSupplements that has to happen
   * upon SAVE, as multiple users could create new Travels concurrently.
   */
 

  /**
   * Fill in defaults for new Bookings when editing Travels.
   */
  this.before ('CREATE', 'Process', async (req) => {
    debugger;
     console.log("=====>>>>BEFORE CREATE PROCESS>>>") ;
     const { Process } = cds.entities;
    const { maxID } = await SELECT.one  `max(processID) as maxID` .from (Process)
    req.data.processID = maxID + 1;
 //   req.data.processStatusID_ID = '20 - Frei zur Einfahrt';  
  })
  
 this.before ('CREATE', 'ProcessSAPDocumentIn.drafts', async (req) => {
    debugger;
     const { ProcessSAPDocumentIn } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN>>>") ;
 
    const { maxID } = await SELECT.one  `max(sapDocumentInID) as maxID` .from (ProcessSAPDocumentIn)
    console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN>>>") ;
    req.data.sapDocumentInID= maxID + 1;

  })

   this.before ('CREATE', 'ProcessSAPDocumentOut.drafts', async (req) => {
    debugger;
     const { ProcessSAPDocumentOut } = cds.entities;
      console.log("=====>>>>BEFORE CREATE PROCESS SAP DOCUMENT IN>>>") ;
 
    const { maxID } = await SELECT.one  `max(sapDocumentOutID) as maxID` .from (ProcessSAPDocumentOut)
    console.log("=====>>>>AFTER QUERY PROCESS SAP DOCUMENT IN>>>") ;
    req.data.sapDocumentOutID= maxID + 1;

  })
  
/**
   * Fill in defaults for new Bookings when editing Travels.
   */
  this.before ('CREATE', 'Process.drafts', async (req) => {
    debugger;
   req.data.processStatusID_ID = '20 - Frei zur Einfahrt';  
  })

  this.on("UPDATE", "Process/mediaFile", async (req, next) => {
      const { MediaFile } = cds.entities;
      const { originalUrl } = req.req;

      if (originalUrl?.includes("content")) {
        const url = originalUrl;
        const imageID = req.params[1];

        const passThrough = new PassThrough();

        // Pipe the incoming stream to the PassThrough
        req.data.content.pipe(passThrough);

        // Collect chunks from the PassThrough
        const chunks = [];
        passThrough.on("data", (chunk) => {
          chunks.push(chunk);
        });

        passThrough.on("end", async () => {
          debugger;
          const content = Buffer.concat(chunks).toString("base64");
          await UPDATE.entity(MediaFile)
            .with({
              content: content,
              url: url,              
            })
            .where({ ID: imageID });
        });
      } else {
        next();
      }
    });
  
  // Add base class's handlers. Handlers registered above go first.
  return super.init()

}}
module.exports = {DDRMService}
