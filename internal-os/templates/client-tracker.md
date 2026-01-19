# Client Tracker Template

## Purpose

The Client Tracker is the **single source of truth** for all 15 clients. Updated weekly, it provides instant visibility into:
- Client health and status
- Recent communication
- Active work
- Blockers and risks

**Location:** `Google Drive > Boring Ecom > Client Tracker`

---

## Spreadsheet Structure

### Tab 1: Client Overview (Main View)

This is your dashboard. All clients at a glance.

| Column | Description | Example |
|--------|-------------|---------|
| **Client Name** | Company name | "Acme Skincare" |
| **Status** | Health indicator | 🟢 / 🟡 / 🔴 |
| **Primary Owner** | Emma or Cathy | "Emma" |
| **Last Touch** | Last client communication date | "Jan 15, 2025" |
| **Days Since Touch** | Auto-calculated | "3 days" |
| **Active Work** | Current focus | "Building winback flow" |
| **Blockers** | What's stuck | "Waiting on brand assets" |
| **Next Action** | Next step | "Send flow for review" |
| **Next Action Owner** | Who owns it | "Cathy" |
| **Next Action Due** | When it's due | "Jan 18" |
| **Monthly Report** | Last report sent | "Dec 2024" |
| **Contract Status** | Active / At Risk / Churning | "Active" |
| **MRR** | Monthly revenue from client | "$2,500" |
| **Notes** | Quick notes | "Key contact is on vacation until 1/20" |

### Conditional Formatting

- **Days Since Touch:**
  - 🟢 Green: 0-7 days
  - 🟡 Yellow: 8-14 days
  - 🔴 Red: 15+ days

- **Next Action Due:**
  - 🟢 Green: Future date
  - 🟡 Yellow: Today
  - 🔴 Red: Overdue

---

### Tab 2: Client Details

Deeper information for each client. One row per client.

| Column | Description |
|--------|-------------|
| **Client Name** | Company name |
| **Website** | URL |
| **Industry** | Skincare, Apparel, Food, etc. |
| **Start Date** | When they became a client |
| **Contract Type** | Retainer / Project / Hourly |
| **Monthly Retainer** | $ amount |
| **Primary Contact** | Name |
| **Primary Email** | Email address |
| **Slack Channel** | #channel name or "Email only" |
| **Klaviyo Account** | Link to their Klaviyo |
| **Shopify Store** | Link to admin |
| **Google Drive Folder** | Link to their folder |
| **ClickUp Project** | Link to project |
| **Report Cadence** | Monthly / Bi-weekly / Quarterly |
| **Report Due Date** | Day of month report is due |
| **QBR Schedule** | When is next QBR |
| **Special Notes** | Anything unique about this client |

---

### Tab 3: Churn Tracker

Track clients who have left for learning.

| Column | Description |
|--------|-------------|
| **Client Name** | Company name |
| **Start Date** | When they started |
| **Churn Date** | When they left |
| **Tenure** | How long they were a client |
| **MRR Lost** | Revenue lost |
| **Churn Reason** | Category (see SOP) |
| **Details** | Longer explanation |
| **Could We Have Saved?** | Yes / No / Maybe |
| **Lessons Learned** | What to do differently |

---

### Tab 4: Revenue Summary

Financial overview (optional, depends on how you track).

| Metric | Value |
|--------|-------|
| Total MRR | $X |
| Total Clients | 15 |
| Average MRR per Client | $X |
| Clients Added (This Month) | X |
| Clients Churned (This Month) | X |
| Net MRR Change | +/- $X |

---

## How to Use

### Daily
- Check for any 🔴 red flags
- Update "Active Work" if you complete something
- Update "Last Touch" when you communicate with a client

### Weekly (Monday)
- Update all clients as part of [Weekly Client Review](../sops/weekly-client-review.md)
- Review status colors
- Update "Next Action" for each client
- Prep summary for team meeting

### Monthly
- Update "Monthly Report" column after sending reports
- Review churn tracker
- Update revenue summary

---

## Google Sheets Setup Instructions

### Create the Spreadsheet

1. Create new Google Sheet: "Boring Ecom - Client Tracker"
2. Create four tabs: Overview, Details, Churn, Revenue
3. Add headers per the columns above
4. Set up conditional formatting (instructions below)

### Conditional Formatting for Status Column

1. Select the Status column
2. Format > Conditional formatting
3. Add rules:
   - If text is "🟢" → Fill green
   - If text is "🟡" → Fill yellow
   - If text is "🔴" → Fill red

### Conditional Formatting for Days Since Touch

1. Select the column
2. Add rules:
   - If value ≤ 7 → Fill light green
   - If value 8-14 → Fill light yellow
   - If value ≥ 15 → Fill light red

### Auto-Calculate Days Since Touch

In the "Days Since Touch" column, use formula:
```
=IF(D2="", "", TODAY()-D2)
```
Where D2 is the "Last Touch" date cell.

---

## Data Entry Guidelines

### Status Definitions

| Status | When to Use |
|--------|-------------|
| 🟢 Green | Everything on track, no issues, happy client |
| 🟡 Yellow | Minor issue, needs attention, slightly behind |
| 🔴 Red | Major issue, escalation needed, at risk |

### Last Touch
- Update whenever you have meaningful communication
- Includes: Email, Slack, call, meeting
- Does NOT include: Automated reports, FYI messages

### Active Work
- Keep it to 1-2 main items
- If nothing active, write "Maintenance / monitoring"
- Be specific: "Building welcome flow" not "Working on emails"

### Blockers
- Be specific: "Waiting on assets from [Name]"
- If no blocker: Leave blank or "None"
- If blocked >5 days, consider escalation

---

## Permissions

| Person | Access |
|--------|--------|
| Joe | Edit |
| Emma | Edit |
| Cathy | Edit |

**Sharing:** Team only. Do not share with clients.

---

## Integration with ClickUp

The client tracker is the **status overview**. ClickUp holds the **detailed tasks**.

- Tracker → High-level visibility
- ClickUp → Task-level management

**Sync point:** The "Active Work" and "Next Action" in the tracker should align with top priority tasks in ClickUp.

---

## Sample Data

| Client | Status | Owner | Last Touch | Days | Active Work | Blocker | Next Action |
|--------|--------|-------|------------|------|-------------|---------|-------------|
| Acme Skincare | 🟢 | Emma | Jan 15 | 2 | Welcome flow live | None | Start abandoned cart |
| Best Apparel | 🟡 | Emma | Jan 8 | 9 | Monthly report | None | Schedule review call |
| Cool Supplements | 🟢 | Cathy | Jan 14 | 3 | Campaign scheduled | None | Pull Feb calendar |
| Dapper Goods | 🔴 | Emma | Dec 28 | 20 | Flow audit | Waiting on access | Escalate to Joe |

---

## Related Documents
- [Weekly Client Review SOP](../sops/weekly-client-review.md)
- [Monthly Reporting SOP](../sops/monthly-reporting.md)
