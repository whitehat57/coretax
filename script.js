let goodServiceCount = 0;

function addGoodService() {
    goodServiceCount++;
    const container = document.getElementById('goodsContainer');
    const div = document.createElement('div');
    div.className = 'good-service';
    div.innerHTML = `
        <h4>Good/Service #${goodServiceCount}</h4>
        <label>Opt:</label><input type="text" name="Opt${goodServiceCount}" required><br>
        <label>Code:</label><input type="text" name="Code${goodServiceCount}" required><br>
        <label>Name:</label><input type="text" name="Name${goodServiceCount}" required><br>
        <label>Unit:</label><input type="text" name="Unit${goodServiceCount}" required><br>
        <label>Price:</label><input type="number" name="Price${goodServiceCount}" required><br>
        <label>Qty:</label><input type="number" name="Qty${goodServiceCount}" required><br>
        <label>Total Discount:</label><input type="number" name="TotalDiscount${goodServiceCount}" required><br>
        <label>Tax Base:</label><input type="number" name="TaxBase${goodServiceCount}" required><br>
        <label>Other Tax Base:</label><input type="number" name="OtherTaxBase${goodServiceCount}" required><br>
        <label>VAT Rate:</label><input type="number" name="VATRate${goodServiceCount}" required><br>
        <label>VAT:</label><input type="number" name="VAT${goodServiceCount}" required><br>
        <label>STLG Rate:</label><input type="number" name="STLGRate${goodServiceCount}" required><br>
        <label>STLG:</label><input type="number" name="STLG${goodServiceCount}" required><br>
        <button type="button" onclick="this.parentElement.remove()">Hapus</button>
    `;
    container.appendChild(div);
}

document.getElementById('xmlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    let xml = `<?xml version="1.0" encoding="utf-8"?>\n`;
    xml += `<TaxInvoiceBulk xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n`;
    xml += `  <TIN>${form.TIN.value}</TIN>\n`;
    xml += `  <ListOfTaxInvoice>\n    <TaxInvoice>\n`;
    xml += `      <TaxInvoiceDate>${form.TaxInvoiceDate.value}</TaxInvoiceDate>\n`;
    xml += `      <TaxInvoiceOpt>${form.TaxInvoiceOpt.value}</TaxInvoiceOpt>\n`;
    xml += `      <TrxCode>${form.TrxCode.value}</TrxCode>\n`;
    xml += `      <AddInfo></AddInfo>\n`;
    xml += `      <CustomDoc></CustomDoc>\n`;
    xml += `      <RefDesc></RefDesc>\n`;
    xml += `      <FacilityStamp></FacilityStamp>\n`;
    xml += `      <SellerIDTKU>${form.SellerIDTKU.value}</SellerIDTKU>\n`;
    xml += `      <BuyerTin>${form.BuyerTin.value}</BuyerTin>\n`;
    xml += `      <BuyerDocument>TIN</BuyerDocument>\n`;
    xml += `      <BuyerCountry>IDN</BuyerCountry>\n`;
    xml += `      <BuyerDocumentNumber>-</BuyerDocumentNumber>\n`;
    xml += `      <BuyerName>${form.BuyerName.value}</BuyerName>\n`;
    xml += `      <BuyerAdress>${form.BuyerAdress.value}</BuyerAdress>\n`;
    xml += `      <BuyerEmail>${form.BuyerEmail.value}</BuyerEmail>\n`;
    xml += `      <BuyerIDTKU>${form.BuyerIDTKU.value}</BuyerIDTKU>\n`;
    xml += `      <ListOfGoodService>\n`;
    for(let i=1; i<=goodServiceCount; i++) {
        if(form[`Opt${i}`]) {
            xml += `        <GoodService>\n`;
            xml += `          <Opt>${form[`Opt${i}`].value}</Opt>\n`;
            xml += `          <Code>${form[`Code${i}`].value}</Code>\n`;
            xml += `          <Name>${form[`Name${i}`].value}</Name>\n`;
            xml += `          <Unit>${form[`Unit${i}`].value}</Unit>\n`;
            xml += `          <Price>${form[`Price${i}`].value}</Price>\n`;
            xml += `          <Qty>${form[`Qty${i}`].value}</Qty>\n`;
            xml += `          <TotalDiscount>${form[`TotalDiscount${i}`].value}</TotalDiscount>\n`;
            xml += `          <TaxBase>${form[`TaxBase${i}`].value}</TaxBase>\n`;
            xml += `          <OtherTaxBase>${form[`OtherTaxBase${i}`].value}</OtherTaxBase>\n`;
            xml += `          <VATRate>${form[`VATRate${i}`].value}</VATRate>\n`;
            xml += `          <VAT>${form[`VAT${i}`].value}</VAT>\n`;
            xml += `          <STLGRate>${form[`STLGRate${i}`].value}</STLGRate>\n`;
            xml += `          <STLG>${form[`STLG${i}`].value}</STLG>\n`;
            xml += `        </GoodService>\n`;
        }
    }
    xml += `      </ListOfGoodService>\n    </TaxInvoice>\n  </ListOfTaxInvoice>\n</TaxInvoiceBulk>`;
    document.getElementById('xmlOutput').value = xml;
});
