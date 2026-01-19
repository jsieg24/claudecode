/**
 * BORING ECOM REVENUE TRACKER - AUTO SETUP SCRIPT
 *
 * HOW TO USE:
 * 1. Open Google Sheets (sheets.new)
 * 2. Go to Extensions > Apps Script
 * 3. Delete any code in the editor
 * 4. Paste this entire script
 * 5. Click "Run" (play button)
 * 6. Authorize when prompted
 * 7. Return to your spreadsheet - it's ready!
 */

function setupRevenueTracker() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename("Boring Ecom - Revenue Tracker");

  // Create all tabs
  createActiveClientsTab(ss);
  createPipelineTab(ss);
  createDashboardTab(ss);
  createChurnedTab(ss);

  // Delete default Sheet1 if it exists
  const sheet1 = ss.getSheetByName("Sheet1");
  if (sheet1) {
    ss.deleteSheet(sheet1);
  }

  // Set Active Clients as first tab
  const activeSheet = ss.getSheetByName("Active Clients");
  ss.setActiveSheet(activeSheet);
  ss.moveActiveSheet(1);

  SpreadsheetApp.getUi().alert("✅ Revenue Tracker setup complete!");
}

function createActiveClientsTab(ss) {
  let sheet = ss.getSheetByName("Active Clients");
  if (!sheet) {
    sheet = ss.insertSheet("Active Clients");
  }
  sheet.clear();

  // Headers
  const headers = [
    "Client Name", "Status", "Primary Owner", "Start Date", "Contract Length (Months)",
    "Renewal Date", "Monthly Retainer (MRR)", "Annual Value (ARR)", "Months Active",
    "LTV to Date", "Contract Type", "Payment Terms", "Last Invoice", "Invoice Status", "Notes"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#4a86e8").setFontColor("white");
  sheet.setFrozenRows(1);

  // Sample data (15 clients)
  const sampleData = [
    ["Acme Skincare", "Active", "Emma", "2024-03-01", 12, "", 2500, "", "", "", "Annual", "Net 30", "2025-01-01", "Paid", ""],
    ["Best Apparel", "Active", "Emma", "2024-06-15", 6, "", 3000, "", "", "", "6-month", "Net 15", "2025-01-01", "Paid", ""],
    ["Cool Supplements", "Active", "Cathy", "2024-09-01", 12, "", 2000, "", "", "", "Annual", "Prepaid", "2025-01-01", "Paid", ""],
    ["Dapper Goods", "Active", "Emma", "2024-01-01", 12, "", 1500, "", "", "", "Annual", "Net 30", "2025-01-01", "Pending", ""],
    ["Eco Beauty", "Active", "Cathy", "2024-04-01", 12, "", 2500, "", "", "", "Annual", "Net 30", "2025-01-01", "Paid", ""],
    ["Fresh Foods", "Active", "Emma", "2024-07-01", 6, "", 3500, "", "", "", "6-month", "Net 15", "2025-01-01", "Paid", ""],
    ["Glow Cosmetics", "Active", "Cathy", "2024-02-01", 12, "", 2000, "", "", "", "Annual", "Prepaid", "2025-01-01", "Paid", ""],
    ["Healthy Home", "Active", "Emma", "2024-05-01", 12, "", 2500, "", "", "", "Annual", "Net 30", "2025-01-01", "Paid", ""],
    ["Indie Jewelry", "At Risk", "Emma", "2024-08-01", 6, "", 1800, "", "", "", "6-month", "Net 30", "2025-01-01", "Overdue", "Behind on payments"],
    ["Just Pets", "Active", "Cathy", "2024-10-01", 12, "", 2200, "", "", "", "Annual", "Prepaid", "2025-01-01", "Paid", ""],
    ["Keto Kitchen", "Active", "Emma", "2024-03-15", 12, "", 3000, "", "", "", "Annual", "Net 30", "2025-01-01", "Paid", ""],
    ["Luxe Linens", "Active", "Cathy", "2024-06-01", 6, "", 1500, "", "", "", "6-month", "Net 15", "2025-01-01", "Paid", ""],
    ["Modern Men", "Active", "Emma", "2024-09-15", 12, "", 2800, "", "", "", "Annual", "Net 30", "2025-01-01", "Paid", ""],
    ["Natural Nails", "Active", "Cathy", "2024-11-01", 12, "", 2000, "", "", "", "Annual", "Prepaid", "2025-01-01", "Paid", ""],
    ["Outdoor Outfitters", "Churning", "Emma", "2024-04-15", 12, "", 2500, "", "", "", "Annual", "Net 30", "2025-01-01", "Paid", "Gave notice - last month is Feb"]
  ];

  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);

  // Add formulas
  for (let i = 2; i <= sampleData.length + 1; i++) {
    // Renewal Date (Column F)
    sheet.getRange(i, 6).setFormula(`=IF(D${i}="","",EDATE(D${i},E${i}))`);
    // ARR (Column H)
    sheet.getRange(i, 8).setFormula(`=IF(G${i}="","",G${i}*12)`);
    // Months Active (Column I)
    sheet.getRange(i, 9).setFormula(`=IF(D${i}="","",DATEDIF(D${i},TODAY(),"M"))`);
    // LTV to Date (Column J)
    sheet.getRange(i, 10).setFormula(`=IF(AND(G${i}<>"",I${i}<>""),G${i}*I${i},"")`);
  }

  // Data validation for dropdowns
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Active", "At Risk", "Churning"], true).build();
  sheet.getRange("B2:B100").setDataValidation(statusRule);

  const ownerRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Emma", "Cathy"], true).build();
  sheet.getRange("C2:C100").setDataValidation(ownerRule);

  const contractRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Monthly", "3-month", "6-month", "Annual"], true).build();
  sheet.getRange("K2:K100").setDataValidation(contractRule);

  const paymentRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Prepaid", "Net 15", "Net 30"], true).build();
  sheet.getRange("L2:L100").setDataValidation(paymentRule);

  const invoiceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Paid", "Pending", "Overdue"], true).build();
  sheet.getRange("N2:N100").setDataValidation(invoiceRule);

  // Conditional formatting for Status
  const statusRange = sheet.getRange("B2:B100");
  const activeRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Active").setBackground("#b7e1cd").setRanges([statusRange]).build();
  const atRiskRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("At Risk").setBackground("#fce8b2").setRanges([statusRange]).build();
  const churningRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Churning").setBackground("#f4c7c3").setRanges([statusRange]).build();

  // Conditional formatting for Invoice Status
  const invoiceRange = sheet.getRange("N2:N100");
  const paidRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Paid").setBackground("#b7e1cd").setRanges([invoiceRange]).build();
  const pendingRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Pending").setBackground("#fce8b2").setRanges([invoiceRange]).build();
  const overdueRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Overdue").setBackground("#f4c7c3").setRanges([invoiceRange]).build();

  sheet.setConditionalFormatRules([activeRule, atRiskRule, churningRule, paidRule, pendingRule, overdueRule]);

  // Format currency columns
  sheet.getRange("G2:J100").setNumberFormat("$#,##0");

  // Format date columns
  sheet.getRange("D2:D100").setNumberFormat("yyyy-mm-dd");
  sheet.getRange("F2:F100").setNumberFormat("yyyy-mm-dd");
  sheet.getRange("M2:M100").setNumberFormat("yyyy-mm-dd");

  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

function createPipelineTab(ss) {
  let sheet = ss.getSheetByName("Pipeline");
  if (!sheet) {
    sheet = ss.insertSheet("Pipeline");
  }
  sheet.clear();

  // Headers
  const headers = [
    "Company Name", "Contact Name", "Contact Email", "Source", "Stage",
    "Proposed MRR", "Proposed ARR", "Probability", "Weighted ARR",
    "Expected Close", "First Contact", "Last Contact", "Next Action", "Notes"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#6aa84f").setFontColor("white");
  sheet.setFrozenRows(1);

  // Sample data
  const sampleData = [
    ["New Brand Co", "Sarah Miller", "sarah@newbrand.com", "LinkedIn", "Proposal", 2500, "", 0.5, "", "2025-02-15", "2025-01-05", "2025-01-12", "Follow up on proposal", "Met at conference"],
    ["Fresh Ecom", "Mike Thompson", "mike@freshecom.co", "Referral", "Discovery", 3000, "", 0.25, "", "2025-03-01", "2025-01-10", "2025-01-10", "Schedule discovery call", "Referred by Acme"],
    ["Growth Shop", "Lisa Roberts", "lisa@growthshop.com", "Website", "Verbal Commit", 2000, "", 0.9, "", "2025-01-25", "2024-12-15", "2025-01-14", "Send contract", "Ready to sign"],
    ["Wellness Direct", "Tom Chen", "tom@wellnessdirect.com", "Cold Outreach", "Lead", 2500, "", 0.1, "", "2025-04-01", "2025-01-08", "2025-01-08", "Send intro email", "Interested"],
    ["Premium Pets", "Anna Davis", "anna@premiumpets.com", "LinkedIn", "Negotiation", 4000, "", 0.75, "", "2025-02-01", "2024-12-01", "2025-01-13", "Finalize scope", "Adding SMS"]
  ];

  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);

  // Add formulas
  for (let i = 2; i <= sampleData.length + 1; i++) {
    // Proposed ARR (Column G)
    sheet.getRange(i, 7).setFormula(`=IF(F${i}="","",F${i}*12)`);
    // Weighted ARR (Column I)
    sheet.getRange(i, 9).setFormula(`=IF(AND(G${i}<>"",H${i}<>""),G${i}*H${i},"")`);
  }

  // Data validation for dropdowns
  const sourceRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["LinkedIn", "Referral", "Website", "Cold Outreach", "Conference", "Other"], true).build();
  sheet.getRange("D2:D100").setDataValidation(sourceRule);

  const stageRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Lead", "Discovery", "Proposal", "Negotiation", "Verbal Commit", "Closed Won", "Closed Lost"], true).build();
  sheet.getRange("E2:E100").setDataValidation(stageRule);

  // Conditional formatting for Stage
  const stageRange = sheet.getRange("E2:E100");
  const leadRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Lead").setBackground("#efefef").setRanges([stageRange]).build();
  const discoveryRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Discovery").setBackground("#cfe2f3").setRanges([stageRange]).build();
  const proposalRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Proposal").setBackground("#fce8b2").setRanges([stageRange]).build();
  const negotiationRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Negotiation").setBackground("#f9cb9c").setRanges([stageRange]).build();
  const verbalRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Verbal Commit").setBackground("#b7e1cd").setRanges([stageRange]).build();
  const wonRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Closed Won").setBackground("#57bb8a").setRanges([stageRange]).build();
  const lostRule = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Closed Lost").setBackground("#f4c7c3").setRanges([stageRange]).build();

  sheet.setConditionalFormatRules([leadRule, discoveryRule, proposalRule, negotiationRule, verbalRule, wonRule, lostRule]);

  // Format columns
  sheet.getRange("F2:G100").setNumberFormat("$#,##0");
  sheet.getRange("H2:H100").setNumberFormat("0%");
  sheet.getRange("I2:I100").setNumberFormat("$#,##0");
  sheet.getRange("J2:L100").setNumberFormat("yyyy-mm-dd");

  sheet.autoResizeColumns(1, headers.length);
}

function createDashboardTab(ss) {
  let sheet = ss.getSheetByName("Dashboard");
  if (!sheet) {
    sheet = ss.insertSheet("Dashboard");
  }
  sheet.clear();

  // Title
  sheet.getRange("A1").setValue("BORING ECOM REVENUE DASHBOARD");
  sheet.getRange("A1").setFontSize(18).setFontWeight("bold");
  sheet.getRange("A2").setValue("Updated: " + new Date().toLocaleDateString());

  // KPI Section
  sheet.getRange("A4").setValue("KEY METRICS").setFontWeight("bold").setFontSize(12);

  const kpiLabels = [
    ["Total Active MRR", "Total Active ARR", "# Active Clients"],
    ["Average MRR/Client", "Total Pipeline ARR", "Weighted Pipeline"]
  ];

  sheet.getRange("A6:C6").setValues([kpiLabels[0]]);
  sheet.getRange("A6:C6").setFontWeight("bold").setBackground("#e8eaed");

  // MRR Formula
  sheet.getRange("A7").setFormula('=SUMIF(\'Active Clients\'!B:B,"Active",\'Active Clients\'!G:G)');
  // ARR Formula
  sheet.getRange("B7").setFormula('=SUMIF(\'Active Clients\'!B:B,"Active",\'Active Clients\'!H:H)');
  // Client Count
  sheet.getRange("C7").setFormula('=COUNTIF(\'Active Clients\'!B:B,"Active")');

  sheet.getRange("A9:C9").setValues([kpiLabels[1]]);
  sheet.getRange("A9:C9").setFontWeight("bold").setBackground("#e8eaed");

  // Avg MRR
  sheet.getRange("A10").setFormula('=IF(C7=0,0,A7/C7)');
  // Pipeline ARR
  sheet.getRange("B10").setFormula('=SUMIF(Pipeline!E:E,"<>Closed Lost",Pipeline!G:G)-SUMIF(Pipeline!E:E,"Closed Won",Pipeline!G:G)');
  // Weighted Pipeline
  sheet.getRange("C10").setFormula('=SUMIFS(Pipeline!I:I,Pipeline!E:E,"<>Closed Lost",Pipeline!E:E,"<>Closed Won")');

  // Format KPI values
  sheet.getRange("A7:B7").setNumberFormat("$#,##0");
  sheet.getRange("A10:C10").setNumberFormat("$#,##0");
  sheet.getRange("A7:C10").setFontSize(14);

  // At Risk Section
  sheet.getRange("A13").setValue("⚠️ AT RISK & CHURNING REVENUE").setFontWeight("bold").setFontSize(12);
  sheet.getRange("A14").setValue("At Risk MRR:");
  sheet.getRange("B14").setFormula('=SUMIF(\'Active Clients\'!B:B,"At Risk",\'Active Clients\'!G:G)');
  sheet.getRange("A15").setValue("Churning MRR:");
  sheet.getRange("B15").setFormula('=SUMIF(\'Active Clients\'!B:B,"Churning",\'Active Clients\'!G:G)');
  sheet.getRange("B14:B15").setNumberFormat("$#,##0");

  // Renewals Section
  sheet.getRange("A18").setValue("📅 RENEWALS (Next 60 Days)").setFontWeight("bold").setFontSize(12);
  sheet.getRange("A19:C19").setValues([["Client", "Renewal Date", "MRR"]]);
  sheet.getRange("A19:C19").setFontWeight("bold").setBackground("#e8eaed");
  sheet.getRange("A20").setFormula('=IFERROR(FILTER(\'Active Clients\'!A:A,\'Active Clients\'!F:F>=TODAY(),\'Active Clients\'!F:F<=TODAY()+60),"No renewals in next 60 days")');
  sheet.getRange("B20").setFormula('=IFERROR(FILTER(\'Active Clients\'!F:F,\'Active Clients\'!F:F>=TODAY(),\'Active Clients\'!F:F<=TODAY()+60),"")');
  sheet.getRange("C20").setFormula('=IFERROR(FILTER(\'Active Clients\'!G:G,\'Active Clients\'!F:F>=TODAY(),\'Active Clients\'!F:F<=TODAY()+60),"")');

  // Revenue by Owner Section
  sheet.getRange("A28").setValue("👥 MRR BY OWNER").setFontWeight("bold").setFontSize(12);
  sheet.getRange("A29").setValue("Emma:");
  sheet.getRange("B29").setFormula('=SUMIFS(\'Active Clients\'!G:G,\'Active Clients\'!C:C,"Emma",\'Active Clients\'!B:B,"Active")');
  sheet.getRange("A30").setValue("Cathy:");
  sheet.getRange("B30").setFormula('=SUMIFS(\'Active Clients\'!G:G,\'Active Clients\'!C:C,"Cathy",\'Active Clients\'!B:B,"Active")');
  sheet.getRange("B29:B30").setNumberFormat("$#,##0");

  sheet.autoResizeColumns(1, 3);
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 150);
}

function createChurnedTab(ss) {
  let sheet = ss.getSheetByName("Churned");
  if (!sheet) {
    sheet = ss.insertSheet("Churned");
  }
  sheet.clear();

  // Headers
  const headers = [
    "Client Name", "Start Date", "Churn Date", "Tenure (Months)", "Final MRR",
    "Total LTV", "Churn Reason", "Could We Save?", "Win-back Potential", "Notes"
  ];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#ea4335").setFontColor("white");
  sheet.setFrozenRows(1);

  // Sample data
  const sampleData = [
    ["Example Churned Co", "2023-06-01", "2024-06-01", "", 2000, 24000, "Brought in-house", "No", "Low", "Hired internal team"]
  ];

  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);

  // Tenure formula
  sheet.getRange(2, 4).setFormula('=IF(AND(B2<>"",C2<>""),DATEDIF(B2,C2,"M"),"")');

  // Data validation
  const reasonRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Budget cuts", "Brought in-house", "Switched agencies", "Business closed", "Performance issues", "Relationship issues", "Scope mismatch", "Project completed"], true).build();
  sheet.getRange("G2:G100").setDataValidation(reasonRule);

  const saveRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Yes", "No", "Maybe"], true).build();
  sheet.getRange("H2:H100").setDataValidation(saveRule);

  const winbackRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["High", "Medium", "Low", "None"], true).build();
  sheet.getRange("I2:I100").setDataValidation(winbackRule);

  // Format columns
  sheet.getRange("B2:C100").setNumberFormat("yyyy-mm-dd");
  sheet.getRange("E2:F100").setNumberFormat("$#,##0");

  sheet.autoResizeColumns(1, headers.length);

  // Summary at top
  sheet.insertRowBefore(1);
  sheet.getRange("A1").setValue("Total Churned LTV (All Time):");
  sheet.getRange("B1").setFormula("=SUM(F3:F100)");
  sheet.getRange("B1").setNumberFormat("$#,##0");
  sheet.getRange("A1:B1").setFontWeight("bold");
}
