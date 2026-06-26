export function getOdataUrl(oOdata) {
    debugger;
    let lv_url = window.location.href;
    var partsArray = lv_url.split('ns.ddrmcap');
    return partsArray[0] + 'odata/v4/waage-data/' + oOdata;


}
