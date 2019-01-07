const db = require('../config/database')

const stringToArray = (str) => {
    return str.slice(1, -1).split(',').filter(el => el != '')
}

exports.approvedProposals = (req, res) => {
    query = `SELECT DISTINCT service.proposal_id, service.services_approved, vote.meeting_date, funding.funding
        FROM service
        INNER JOIN vote ON service.proposal_id=vote.proposal_id
        INNER JOIN funding ON funding.proposal_id=vote.proposal_id
        WHERE vote.meeting_date is not NULL;`
    db.any(query)
        .then(data => {
            console.log(`HIT: /proposals${ req.path }`)
            data.forEach(prop => {
                prop.proposal_id = parseInt(prop.proposal_id)
                prop.services_approved = stringToArray(prop.services_approved)
                prop.meeting_date = prop.meeting_date.toDateString()
                prop.funding = parseInt(prop.funding)
            })
            res.status(200).send(data)
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
}

exports.submittedProposals = (req, res) => {
    query = `SELECT proposal.proposal_id, proposal.new_service_selection,proposal.planned_submission_date
        FROM proposal
        INNER JOIN funding ON proposal.proposal_id = funding.proposal_id;`
    db.any(query)
        .then(data => {
            console.log(`HIT: /proposals${ req.path }`)
            data.forEach(prop => {
                prop.proposal_id = parseInt(prop.proposal_id)
                prop.new_service_selection = stringToArray(prop.new_service_selection)
                if (prop.planned_submission_date) {
                    prop.planned_submission_date = prop.planned_submission_date.toDateString()
                }
                prop.funding = parseInt(prop.funding)
            })
            res.status(200).send(data)
        })
        .catch(error => {
            console.log('ERROR:', error)
        })
}

exports.proposalsNetwork = (req, res) => {
    query = `SELECT DISTINCT
            proposal.proposal_id, "PI".pi_firstname, "PI".pi_lastname,
            proposal.org_name, proposal.tic_ric_assign_v2, proposal.protocol_status, funding.anticipated_budget, funding.funding_duration
        FROM proposal
        INNER JOIN funding ON proposal.proposal_id=funding.proposal_id
        INNER JOIN "PI" ON "PI".pi_lastname=proposal.pi_lastname;`
    db.any(query)
        .then(data => {
            console.log(`HIT: /proposals${ req.path }`)
            data.forEach(prop => {
                prop.proposal_id = parseInt(prop.proposal_id)
                prop.org_name = parseInt(prop.org_name)
                prop.tic_ric_assign_v2 = parseInt(prop.tic_ric_assign_v2)
                prop.protocol_status = parseInt(prop.protocol_status)
            })
            res.status(200).send(data)
        })
        .catch(err => {
            console.log('ERROR:', err)
        })
}