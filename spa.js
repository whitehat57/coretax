// SPA untuk Form Input XML Coretax
const app = document.getElementById('app');

let state = {
    step: 'form',
    xml: '',
    goodServiceCount: 0,
    goodServices: []
};

function render() {
    if (state.step === 'form') {
        app.innerHTML = `
        <form id="xmlForm">
            <label>TIN:</label>
            <input type="text" name="TIN" required><br>
            <h3>Tax Invoice</h3>
            <label>Tanggal Faktur:</label>
            <input type="date" name="TaxInvoiceDate" required><br>
            <label>Opsi Faktur:</label>
            <input type="text" name="TaxInvoiceOpt" required><br>
            <label>Kode Transaksi:</label>
            <input type="text" name="TrxCode" required><br>
            <label>Seller IDTKU:</label>
            <input type="text" name="SellerIDTKU" required><br>
            <label>Buyer TIN:</label>
            <input type="text" name="BuyerTin" required><br>
            <label>Buyer Name:</label>
            <input type="text" name="BuyerName" required><br>
            <label>Buyer Address:</label>
            <input type="text" name="BuyerAdress" required><br>
            <label>Buyer Email:</label>
            <input type="email" name="BuyerEmail"><br>
            <h3>Good/Service</h3>
            <div id="goodsContainer">
                ${state.goodServices.map((_, i) => goodServiceForm(i)).join('')}
            </div>
            <button type="button" id="addGoodService">Tambah Good/Service</button><br><br>
            <button type="submit">Generate XML</button>
        </form>
        `;
        document.getElementById('addGoodService').onclick = () => {
            state.goodServices.push({});
            render();
        };
        document.getElementById('xmlForm').onsubmit = handleSubmit;
        // Hapus GoodService
        state.goodServices.forEach((_, i) => {
            const btn = document.getElementById(`removeGoodService${i}`);
            if (btn) btn.onclick = () => {
                state.goodServices.splice(i, 1);
                render();
            };
        });
    } else if (state.step === 'result') {
        app.innerHTML = `
            <h3>Hasil XML:</h3>
            <textarea rows="20" cols="80" readonly>${state.xml}</textarea><br>
            <button onclick="window.location.reload()">Input Baru</button>
        `;
    }
}

function goodServiceForm(i) {
    return `
    <div class="good-service">
        <h4>Good/Service #${i + 1}</h4>
        <label>Opt:</label><input type="text" name="Opt${i}" required><br>
        <label>Code:</label><input type="text" name="Code${i}" required><br>
        <label>Name:</label><input type="text" name="Name${i}" required><br>
        <label>Unit:</label><input type="text" name="Unit${i}" required><br>
        <label>Price:</label><input type="number" name="Price${i}" required><br>
        <label>Qty:</label><input type="number" name="Qty${i}" required><br>
        <label>Total Discount:</label><input type="number" name="TotalDiscount${i}" required><br>
        <label>Tax Base:</label><input type="number" name="TaxBase${i}" required><br>
        <label>Other Tax Base:</label><input type="number" name="OtherTaxBase${i}" required><br>
        <label>VAT Rate:</label><input type="number" name="VATRate${i}" required><br>
        <label>VAT:</label><input type="number" name="VAT${i}" required><br>
        <label>STLG Rate:</label><input type="number" name="STLGRate${i}" required><br>
        <label>STLG:</label><input type="number" name="STLG${i}" required><br>
        <button type="button" id="removeGoodService${i}">Hapus</button>
    </div>
    `;
}

function handleSubmit(e) {
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
    for(let i=0; i<state.goodServices.length; i++) {
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
    xml += `      </ListOfGoodService>\n    </TaxInvoice>\n  </ListOfTaxInvoice>\n</TaxInvoiceBulk>`;
    state.xml = xml;
    state.step = 'result';
    render();
}

render();
