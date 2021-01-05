export async function syncData() {
    const data = await fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-005?Authorization=CWB-AEB49A4A-884D-4EEC-99B3-D77D231E6896&format=JSON&elementName=&sort=time%27')
    const html = await data.text();
    return html
}