const CASE_TYPE_TO_CODE = {
    Ausnahme: 'A',
    Insolvenz: 'I',
    Krise: 'K',
    'VS-Reporting Relevant': 'V',
}

function toDate(v) {
    if (!v) return null
    const d = v instanceof Date ? v : new Date(v) // Edm.Date comes as 'YYYY-MM-DD'
    return Number.isNaN(d.getTime()) ? null : d
}

function err(req, target, message) {
    req.error({ code: 'VALIDATION_ERROR', message, target })
}

function setCaseTypeCode(req) {
    const caseType = req.data.caseTypeID_ID
    const caseTypeCode = CASE_TYPE_TO_CODE[caseType]
    if (caseTypeCode) req.data.caseTypeCode = caseTypeCode
}

function validateProcess(req) {
    const d = req.data

    setCaseTypeCode(req)

    // opening date >= insolvency application
    const openingDate = toDate(d.caseOpenDate)
    const insAppDate = toDate(d.insolvencyApplication)
    if (openingDate && insAppDate && openingDate < insAppDate) {
        err(req, 'caseOpenDate', 'Opening Date must not be earlier than Insolvency application date.')
    }

    const pag = d.PAGBetroffen === true

    switch (d.caseTypeCode) {
        case 'A': {
            const from = toDate(d.erstellungsDatum)
            const to = toDate(d.ablaufsDatum)
            if (!d.vertieftesRating_ID) err(req, 'vertieftesRating_ID', 'Deeper Rating is mandatory.')
            if (!d.erstellungsDatum) err(req, 'erstellungsDatum', 'Date From is mandatory.')
            if (!d.ablaufsDatum) err(req, 'ablaufsDatum', 'Date To is mandatory.')


            if (from && to && to < from) {
                err(req, 'ablaufsDatum', 'Date To must not be earlier than Date From.')
            }
            break
        }

        case 'I': {
            if (pag) {
                // enable the checks you really want:
                if (!d.typeCaseId_ID) err(req, 'typeCaseId_ID', 'Case Type is mandatory.')
                // if (d.liquidityEffect == null) err(req, 'liquidityEffect', 'Liquidity Effect is mandatory.')
                // if (!d.measuresDate) err(req, 'measuresDate', 'Measures Date is mandatory.')
            }
            break
        }

        case 'K': {
            if (pag) {
                if (!d.typeCaseId_ID) err(req, 'typeCaseId_ID', 'Type of Case is mandatory.')
                if (!d.insolvencyApplication) err(req, 'comGERCommunication', 'COM gem. Meldung is mandatory.')
            }
            break
        }

        default:
            break
    }
}

module.exports = { validateProcess }