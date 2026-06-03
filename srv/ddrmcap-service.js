
const cds = require ('@sap/cds');
const { redacted } = require('@sap/cds/lib/utils/cds-utils');

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
   // const { to_Travel_TravelUUID } = req.data
    //const { status } = await SELECT `TravelStatus_code as status` .from (Travel.drafts, to_Travel_TravelUUID)
    //if (status === 'X') throw req.reject (400, 'Cannot add new bookings to rejected travels.')
  //  const { maxID } = await SELECT.one `max(ProcessID) as maxID` .from (Booking.drafts) .where ({to_Travel_TravelUUID})
    const { maxID } = await SELECT.one  `max(processID) as maxID` .from (Process)
    req.data.processID = maxID + 1;
    req.data.to_processStatus = '20';  
  })

/**
   * Fill in defaults for new Bookings when editing Travels.
   */
  this.after ('CREATE', 'Process.drafts', async (req) => {
    debugger;
   // const { to_Travel_TravelUUID } = req.data
    //const { status } = await SELECT `TravelStatus_code as status` .from (Travel.drafts, to_Travel_TravelUUID)
    //if (status === 'X') throw req.reject (400, 'Cannot add new bookings to rejected travels.')
  //  const { maxID } = await SELECT.one `max(ProcessID) as maxID` .from (Booking.drafts) .where ({to_Travel_TravelUUID})
  //  const { maxID } = await SELECT.one  `max(processID) as maxID` .from (Process)
   // req.data.processID = 21;
  //  req.data.ProcessStatusID_ID = '20';  
  })

 
  
  // Add base class's handlers. Handlers registered above go first.
  return super.init()

}}
module.exports = {DDRMService}
