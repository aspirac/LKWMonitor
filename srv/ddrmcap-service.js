const { validateProcess } = require('./handlers/validations')
const axios = require('axios');

class DDRMService extends cds.ApplicationService {
  /** Registering custom event handlers */
  async init() {
    const { Process } = this.entities
    /**
     * Run validations for draft + active changes.
     * For draft flows, also cover draftActivate (activate) and draftPrepare if you use it.
     */

     this.on('setStatus20', Process, async(req) => {
      debugger;
      const ID = req.params[0].ID;
    })

    this.before(['CREATE', 'UPDATE'], Process, validateProcess)
    // Ensure validation also happens when user activates a draft (important!)
    this.before('draftActivate', Process, validateProcess)
   
    await super.init();
  }

}
module.exports = { DDRMService }
