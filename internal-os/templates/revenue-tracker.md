# Client Revenue Tracker - Google Sheet Spec

## Purpose

Track all client revenue, MRR, forecasted ARR, and pipeline for financial visibility and forecasting.

**Create this in Google Sheets:** `Boring Ecom - Revenue Tracker`

---

## Sheet Structure

Create **4 tabs:**
1. **Active Clients** - Current MRR and ARR
2. **Pipeline** - Prospective clients
3. **Revenue Dashboard** - Summary metrics
4. **Churned** - Historical revenue lost

---

## Tab 1: Active Clients

### Columns

| Column | Header | Format | Description |
|--------|--------|--------|-------------|
| A | Client Name | Text | Company name |
| B | Status | Dropdown | Active, At Risk, Churning |
| C | Primary Owner | Dropdown | Emma, Cathy |
| D | Start Date | Date | Contract start |
| E | Contract Length | Number | Months (e.g., 12) |
| F | Renewal Date | Date (formula) | Auto-calculated |
| G | Monthly Retainer | Currency | MRR amount |
| H | Annual Value | Currency (formula) | ARR = MRR × 12 |
| I | Months Active | Number (formula) | Auto-calculated |
| J | LTV to Date | Currency (formula) | Revenue earned so far |
| K | Contract Type | Dropdown | Monthly, 3-month, 6-month, Annual |
| L | Payment Terms | Dropdown | Prepaid, Net 15, Net 30 |
| M | Last Invoice | Date | Last invoice sent |
| N | Invoice Status | Dropdown | Paid, Pending, Overdue |
| O | Notes | Text | Any relevant notes |

### Formulas

**Column F - Renewal Date:**
```
=IF(D2="", "", EDATE(D2, E2))
```

**Column H - Annual Value (ARR):**
```
=IF(G2="", "", G2 * 12)
```

**Column I - Months Active:**
```
=IF(D2="", "", DATEDIF(D2, TODAY(), "M"))
```

**Column J - LTV to Date:**
```
=IF(AND(D2<>"", G2<>""), G2 * I2, "")
```

### Dropdown Options

**Status (Column B):**
- Active
- At Risk
- Churning

**Primary Owner (Column C):**
- Emma
- Cathy

**Contract Type (Column K):**
- Monthly
- 3-month
- 6-month
- Annual

**Payment Terms (Column L):**
- Prepaid
- Net 15
- Net 30

**Invoice Status (Column N):**
- Paid
- Pending
- Overdue

### Conditional Formatting

**Status Column:**
- "Active" → Green fill
- "At Risk" → Yellow fill
- "Churning" → Red fill

**Renewal Date:**
- Within 30 days → Yellow fill
- Within 14 days → Orange fill
- Past due → Red fill

**Invoice Status:**
- "Paid" → Green fill
- "Pending" → Yellow fill
- "Overdue" → Red fill

### Sample Data

| Client Name | Status | Owner | Start Date | Length | Renewal | MRR | ARR | Months | LTV |
|-------------|--------|-------|------------|--------|---------|-----|-----|--------|-----|
| Acme Skincare | Active | Emma | 2024-03-01 | 12 | 2025-03-01 | $2,500 | $30,000 | 10 | $25,000 |
| Best Apparel | Active | Emma | 2024-06-15 | 6 | 2024-12-15 | $3,000 | $36,000 | 7 | $21,000 |
| Cool Supplements | Active | Cathy | 2024-09-01 | 12 | 2025-09-01 | $2,000 | $24,000 | 4 | $8,000 |
| Dapper Goods | At Risk | Emma | 2024-01-01 | 12 | 2025-01-01 | $1,500 | $18,000 | 12 | $18,000 |

---

## Tab 2: Pipeline

Track prospective clients and forecast future revenue.

### Columns

| Column | Header | Format | Description |
|--------|--------|--------|-------------|
| A | Company Name | Text | Prospect name |
| B | Contact Name | Text | Primary contact |
| C | Contact Email | Text | Email |
| D | Source | Dropdown | How they found us |
| E | Stage | Dropdown | Sales stage |
| F | Proposed MRR | Currency | Quoted monthly retainer |
| G | Proposed ARR | Currency (formula) | = MRR × 12 |
| H | Probability | Percentage | Close probability |
| I | Weighted ARR | Currency (formula) | ARR × Probability |
| J | Expected Close | Date | Target close date |
| K | First Contact | Date | When we first talked |
| L | Last Contact | Date | Most recent touch |
| M | Next Action | Text | Next step |
| N | Notes | Text | Context, details |

### Formulas

**Column G - Proposed ARR:**
```
=IF(F2="", "", F2 * 12)
```

**Column I - Weighted ARR:**
```
=IF(AND(G2<>"", H2<>""), G2 * H2, "")
```

### Dropdown Options

**Source (Column D):**
- LinkedIn
- Referral
- Website
- Cold Outreach
- Conference
- Other

**Stage (Column E):**
- Lead (new inquiry)
- Discovery (call scheduled/completed)
- Proposal (sent proposal)
- Negotiation (discussing terms)
- Verbal Commit (waiting on contract)
- Closed Won (move to Active)
- Closed Lost (archive)

### Probability by Stage

| Stage | Typical Probability |
|-------|---------------------|
| Lead | 10% |
| Discovery | 25% |
| Proposal | 50% |
| Negotiation | 75% |
| Verbal Commit | 90% |

### Conditional Formatting

**Stage:**
- Lead → Light gray
- Discovery → Light blue
- Proposal → Yellow
- Negotiation → Orange
- Verbal Commit → Light green
- Closed Won → Green
- Closed Lost → Red

### Sample Data

| Company | Contact | Stage | Proposed MRR | Prob | Weighted ARR | Expected Close |
|---------|---------|-------|--------------|------|--------------|----------------|
| New Brand Co | Sarah M. | Proposal | $2,500 | 50% | $15,000 | Feb 15, 2025 |
| Fresh Ecom | Mike T. | Discovery | $3,000 | 25% | $9,000 | Mar 1, 2025 |
| Growth Shop | Lisa R. | Verbal Commit | $2,000 | 90% | $21,600 | Jan 25, 2025 |

---

## Tab 3: Revenue Dashboard

Summary view with key metrics. Use formulas to pull from other tabs.

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                    BORING ECOM REVENUE DASHBOARD                │
│                         Updated: [Today]                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ ACTIVE MRR  │  │ ACTIVE ARR  │  │  # CLIENTS  │             │
│  │   $XX,XXX   │  │  $XXX,XXX   │  │     XX      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  AVG MRR    │  │ PIPELINE    │  │ WEIGHTED    │             │
│  │   $X,XXX    │  │   $XX,XXX   │  │   $XX,XXX   │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  RENEWALS COMING UP (Next 60 Days)                             │
│  ┌─────────────────────────────────────────────────┐           │
│  │ Client Name          │ Renewal Date │ MRR      │           │
│  │ [Auto-populated]     │ [Date]       │ $X,XXX   │           │
│  └─────────────────────────────────────────────────┘           │
│                                                                 │
│  AT RISK REVENUE                                                │
│  ┌─────────────────────────────────────────────────┐           │
│  │ Total At Risk MRR: $X,XXX                       │           │
│  │ [List of at-risk clients]                       │           │
│  └─────────────────────────────────────────────────┘           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Formulas

**Total Active MRR:**
```
=SUMIF('Active Clients'!B:B, "Active", 'Active Clients'!G:G)
```

**Total Active ARR:**
```
=SUMIF('Active Clients'!B:B, "Active", 'Active Clients'!H:H)
```

**Number of Active Clients:**
```
=COUNTIF('Active Clients'!B:B, "Active")
```

**Average MRR per Client:**
```
=[Total MRR Cell] / [Client Count Cell]
```

**Total Pipeline ARR:**
```
=SUMIF('Pipeline'!E:E, "<>Closed Lost", 'Pipeline'!G:G)
```

**Weighted Pipeline:**
```
=SUM('Pipeline'!I:I)
```

**At Risk MRR:**
```
=SUMIF('Active Clients'!B:B, "At Risk", 'Active Clients'!G:G)
```

**Churning MRR:**
```
=SUMIF('Active Clients'!B:B, "Churning", 'Active Clients'!G:G)
```

### Renewals Query (Next 60 Days)

Use FILTER or QUERY function:
```
=FILTER('Active Clients'!A:H,
        'Active Clients'!F:F >= TODAY(),
        'Active Clients'!F:F <= TODAY()+60)
```

Or with QUERY:
```
=QUERY('Active Clients'!A:H,
       "SELECT A, F, G WHERE F >= date '"&TEXT(TODAY(),"yyyy-mm-dd")&"'
        AND F <= date '"&TEXT(TODAY()+60,"yyyy-mm-dd")&"'
        ORDER BY F")
```

---

## Tab 4: Churned Clients

Track historical churn for analysis.

### Columns

| Column | Header | Format | Description |
|--------|--------|--------|-------------|
| A | Client Name | Text | Company name |
| B | Start Date | Date | When they started |
| C | Churn Date | Date | When they left |
| D | Tenure (Months) | Number (formula) | How long they stayed |
| E | Final MRR | Currency | MRR at time of churn |
| F | Total LTV | Currency | Total revenue from client |
| G | Churn Reason | Dropdown | Why they left |
| H | Could We Save? | Dropdown | Yes, No, Maybe |
| I | Win-back Potential | Dropdown | High, Medium, Low, None |
| J | Notes | Text | Details |

### Formulas

**Column D - Tenure:**
```
=IF(AND(B2<>"", C2<>""), DATEDIF(B2, C2, "M"), "")
```

### Dropdown Options

**Churn Reason:**
- Budget cuts
- Brought in-house
- Switched agencies
- Business closed/sold
- Performance issues
- Relationship issues
- Scope mismatch
- Project completed

**Could We Save:**
- Yes
- No
- Maybe

**Win-back Potential:**
- High (check in 6 months)
- Medium (check in 12 months)
- Low (unlikely to return)
- None (business closed)

### Summary Metrics

At top of tab, add:
- Total Churned MRR (YTD): `=SUM(E:E)` where churn date is this year
- Average Tenure: `=AVERAGE(D:D)`
- Most Common Churn Reason: Manual or use MODE function with encoding

---

## Setup Instructions

### Step 1: Create the Spreadsheet
1. Go to Google Sheets
2. Create new spreadsheet: "Boring Ecom - Revenue Tracker"
3. Create 4 tabs: Active Clients, Pipeline, Revenue Dashboard, Churned

### Step 2: Set Up Active Clients Tab
1. Add headers in Row 1 (freeze row)
2. Add dropdown data validation for Status, Owner, Contract Type, Payment Terms, Invoice Status
3. Add formulas for Renewal Date, ARR, Months Active, LTV
4. Apply conditional formatting

### Step 3: Set Up Pipeline Tab
1. Add headers in Row 1 (freeze row)
2. Add dropdown data validation for Source, Stage
3. Add formulas for Proposed ARR, Weighted ARR
4. Apply conditional formatting

### Step 4: Set Up Revenue Dashboard
1. Design layout with boxes/cells for each metric
2. Add formulas pulling from other tabs
3. Add renewals query
4. Format for visual clarity

### Step 5: Set Up Churned Tab
1. Add headers in Row 1 (freeze row)
2. Add dropdown data validation
3. Add tenure formula

### Step 6: Add Your Data
1. Enter all 15 current clients in Active Clients
2. Enter any prospects in Pipeline
3. Move any past clients to Churned

---

## Maintenance Routine

### Weekly (Monday)
- Update Invoice Status for any new payments
- Update Pipeline stages
- Check for upcoming renewals

### Monthly (1st of month)
- Review Revenue Dashboard metrics
- Update any MRR changes
- Move Closed Won to Active Clients
- Move Closed Lost to archive
- Review At Risk clients

### Quarterly
- Review churn patterns
- Analyze average tenure
- Update forecasting assumptions

---

## Sharing & Permissions

| Person | Access |
|--------|--------|
| Joe | Owner / Edit |
| Emma | Edit |
| Cathy | View (or Edit if helpful) |

**Note:** Revenue data is sensitive. Keep this sheet internal only.

---

## Quick Reference: Key Metrics to Track

| Metric | Formula | Target |
|--------|---------|--------|
| Total MRR | Sum of active client MRR | Growth month-over-month |
| Total ARR | MRR × 12 | $XXX,XXX goal |
| # of Clients | Count of active clients | 15-20 |
| Avg MRR/Client | Total MRR / # Clients | $2,000-3,000 |
| Churn Rate | Churned MRR / Starting MRR | <5% monthly |
| Net Revenue Retention | (MRR + Expansion - Churn) / Starting MRR | >100% |
| Pipeline Coverage | Weighted Pipeline / MRR Target | 3x |

---

## Related Documents
- [Client Tracker (Operational)](./client-tracker.md)
- [Monthly Reporting SOP](../sops/monthly-reporting.md)
