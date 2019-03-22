const db = require('../config/database')

const stringToBoolean = s => s === '1' ? true : false
const stringToInteger = s => {
    let i = parseInt(s)
    if (isNaN(i)) {
        return 0
    } else {
        return i
    }
}

exports.post = (req, res) => {
    const newMetric = req.body
    
    // Do any necessary data massaging here
   
    // Check if study metrics already exist in database & overwrite - or just add new entry regardless
    db.any('SELECT * FROM "UtahRecommendation" WHERE "ProposalID" = $1', [newMetric.proposalID])
        .then(data => {
            if (data.length === 0) {
                // Define INSERT query
                const query = 'INSERT INTO "UtahRecommendation"("ProposalID", "network",  "tic", "ric", "collaborativeTIC", "collaborativeTIC_roleExplain", "DCCinstitution", "CCCinstitution", "primaryStudyType", "sub_ancillaryStudy", "mainStudy", "hasSubAncillaryStudy", "sub_ancillaryStudyName", "linkedData", "studyDesign",  "randomized",  "randomizationUnit",  "randomizationFeature", "ascertainment", "observations", "pilot_demoStudy", "pilot_or_demo",  "registry",  "EHRdataTransfer", "EHRdataTransfer_option", "consent", "EFIC", "IRBtype",  "regulatoryClassification",  "clinicalTrialsIdentifier",  "dsmb_dmcUsed",  "initialPlannedNumberOfSites",  "enrollmentGoal",  "initialProjectedEnrollmentDuration", "finalPlannedNumberOfSites", "actualEnrollment" ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36)'
                
                const values = [
                    stringToInteger(newMetric.proposalID),
                    newMetric.network,
                    newMetric.tic,
                    newMetric.ric,
                    newMetric.collaborativeTic,
                    newMetric.collaborativeTicDetails,
                    newMetric.dcc,
                    newMetric.ccc,
                    newMetric.primaryStudyType,
                    stringToBoolean(newMetric.hasSuperStudy),
                    newMetric.superStudy,
                    stringToBoolean(newMetric.hasSubStudy),
                    newMetric.subStudy,
                    newMetric.studyDesign,
                    stringToBoolean(newMetric.isRandomized),
                    newMetric.randomizationUnit,
                    JSON.stringify(newMetric.randomizationFeatures),
                    newMetric.ascertainment,
                    stringToBoolean(newMetric.pilotOrDemo),
                    stringToBoolean(newMetric.usesRegistryData),
                    stringToBoolean(newMetric.usesEhrDataTransfer),
                    newMetric.ehrDataTransferType,
                    stringToBoolean(newMetric.isConsentRequired),
                    stringToBoolean(newMetric.efic),
                    newMetric.irbTypes,
                    newMetric.regulatoryClassifications,
                    newMetric.clinicalTrialsGovId,
                    stringToBoolean(newMetric.isDsmbDmcRequired),
                    stringToInteger(newMetric.initialParticipatingSiteNumber),
                    newMetric.enrollmentGoal,
                    stringToInteger(newMetric.initialProjectedEnrollmentDuration),
                    0, // finalPlannedNumberOfSites
                    0 // actualEnrollment
                ]
                
                // Execute query: https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
                    .then(() => console.log("Insert Success!"))
                    .catch(exn => console.log("Exception", exn))
                res.send('Success!')

            } else {
                // Define UPDATE query
                const query = 'UPDATE "UtahRecommendation" SET "network" = $1,  "tic" = $2, "ric" = $3, "collaborativeTIC" = $4, "collaborativeTIC_roleExplain" = $5, "DCCinstitution" = $6, "CCCinstitution" = $7, "primaryStudyType" = $8, "sub_ancillaryStudy" = $9, "mainStudy" = $10, "hasSubAncillaryStudy" = $11, "sub_ancillaryStudyName" = $12, "linkedData" = $13, "studyDesign" = $14,  "randomized" = $15,  "randomizationUnit" = $16,  "randomizationFeature" = $17, "ascertainment" = $18, "observations" = $19, "pilot_demoStudy" = $20, "pilot_or_demo" = $21,  "registry" = $22,  "EHRdataTransfer" = $23, "EHRdataTransfer_option" = $24, "consent" = $25, "EFIC" = $26, "IRBtype" = $27,  "regulatoryClassification" = $28,  "clinicalTrialsIdentifier" = $29,  "dsmb_dmcUsed" = $30,  "initialPlannedNumberOfSites" = $31,  "enrollmentGoal" = $32,  "initialProjectedEnrollmentDuration" = $33, "finalPlannedNumberOfSites" = $34, "actualEnrollment" = $35 WHERE "ProposalID" = $36'
                
                // Define array of values to be passed in the above query
                const values = [
                    newMetric.network,
                    newMetric.tic,
                    newMetric.ric,
                    newMetric.collaborativeTic,
                    newMetric.collaborativeTicDetails,
                    newMetric.dcc,
                    newMetric.ccc,
                    newMetric.primaryStudyType,
                    stringToBoolean(newMetric.hasSuperStudy),
                    newMetric.superStudy,
                    stringToBoolean(newMetric.hasSubStudy),
                    newMetric.subStudy,
                    "", // linkedData
                    newMetric.studyDesign,
                    stringToBoolean(newMetric.isRandomized),
                    newMetric.randomizationUnit,
                    JSON.stringify(newMetric.randomizationFeatures),
                    newMetric.ascertainment,
                    "", // observations
                    stringToBoolean(newMetric.pilotOrDemo),
                    "", // pilot_or_demo
                    stringToBoolean(newMetric.usesRegistryData),
                    stringToBoolean(newMetric.usesEhrDataTransfer),
                    newMetric.ehrDataTransferType,
                    stringToBoolean(newMetric.isConsentRequired),
                    stringToBoolean(newMetric.efic),
                    newMetric.irbTypes,
                    newMetric.regulatoryClassifications,
                    newMetric.clinicalTrialsGovId,
                    stringToBoolean(newMetric.isDsmbDmcRequired),
                    stringToInteger(newMetric.initialParticipatingSiteNumber),
                    newMetric.enrollmentGoal,
                    stringToInteger(newMetric.initialProjectedEnrollmentDuration),
                    0, // finalPlannedNumberOfSites
                    0, // actualEnrollment
                    stringToInteger(newMetric.proposalID)
                ]
                
                // Execute query: https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
                db.none(query, values)
                    .then(() => console.log(`Study metrics update successful! [proposalID: ${ newMetric.proposalID }]`))
                    .catch(exn => console.log("Exception", exn))
                res.send('Success!')

            }
        })
        .catch(error => {
            console.log('Error', error)
        })
}
